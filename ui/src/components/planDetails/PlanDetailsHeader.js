import React, { PropTypes } from 'react';
import ProductGroups from '../../constants/ProductGroups';
import IconInfo from '../common/IconInfo';
import moment from 'moment';
import PdfStatement from '../common/PdfStatement';
import UrlUtils from '../../utils/UrlUtils';
const ProductInfo = (props) => {
	const {content, plan} = props;
	
	let productName = plan.planDetail.productFullName;
	switch (plan.productGroupType) {
		case ProductGroups.TIP:
			productName = content.header.trusteeProduct;
			break;
		
		case ProductGroups.IPB:
			if(plan.planDetail.productFullName && plan.planDetail.productVariantName){
				productName = plan.planDetail.productFullName + ' - ' + plan.planDetail.productVariantName;
			}
			break;
	}
	return (
		<div className='col-md-9 col-sm-8'>
			<span className='color-grey mr-5'>
				{productName}
			</span>
			<span className='plan-number ml-10'>
				{plan.planDetail.planNumber}
			</span>
		</div>
	);
};

const PlanHolder = (props) => {
	const {content, plan} = props;
	
	let planHolderHeader = '';
	let planHolderName = '';
	switch (plan.productGroupType) {
		case ProductGroups.B34:
		case ProductGroups.GB:
		case ProductGroups.GP:
		case ProductGroups.IPB:
		case ProductGroups.TAI:
		case ProductGroups.GMF:
			if (plan.planDetail.planHolders.length > 1) {
				planHolderHeader = content.header.firstPlanHolder;
			}
			else {
				planHolderHeader = content.header.planHolder;
			}
			planHolderName = plan.planDetail.firstPlanHolderName;
			break;
		case ProductGroups.TIP:
			planHolderHeader = content.header.trustee;
			planHolderName = plan.planDetail.planHolders[0].name;
			break;
	}
	return (
		<div className='col-md-6 col-sm-5 col-xs-6'>
			<span className='color-grey mr-5'>{planHolderHeader}:</span>{planHolderName}
		</div>
	);
};

const PlanStatus = (props) => {
	const {content, plan} = props;

	let planStatusHeader = '';
	let planStatusValue = '';
	switch (plan.productGroupType) {
		case ProductGroups.B34:
		case ProductGroups.GB:
		case ProductGroups.IPB:
			planStatusHeader = content.header.status;
			planStatusValue = plan.planDetail.planStatus;
			break;
		case ProductGroups.GMF:
			planStatusHeader = content.header.startDate;
			planStatusValue = moment(plan.planDetail.planStartDate).format('DD/MM/YYYY');
			break;
		case ProductGroups.GP:
		case ProductGroups.TAI:
		case ProductGroups.TIP:
			let planStartDate = plan.planDetail.planStartDate;
			if (planStartDate.length > 0) {
				planStatusHeader = content.header.startDate;
				
				planStartDate = moment(planStartDate).format('DD/MM/YYYY');
				if (planStatusValue.length > 0) {
					planStatusValue = `${planStartDate} (${plan.planDetail.planStatus})`;
				}
				else {
					planStatusValue = `${planStartDate} (${content.header.inForce})`;
				}
			}
			else if (planStatusValue.length > 0) {
				planStatusHeader = content.header.status;
				planStatusValue = plan.planDetail.planStatus;
			}
			break;
	}
	return (
		<div className='col-sm-3 col-xs-6'>
			<span className='color-grey mr-5'>{planStatusHeader}:</span>{planStatusValue}
		</div>
	);
};

const QuickLink = (props) => {
	const content = props.content;
	const plan = props.plan;
	const IconRetrieve = require('../../../assets/images/retrieve_icon.gif');
	let searchPage = UrlUtils.getActualLink('/');
	return (
		<div className='col-md-3 col-sm-4 col-xs-12'>
			<ul className='list-none tools-list'>
				<li>
					<a href={searchPage} className='has-icon-arrow-right'>
						<span className='mr-5'><img src={IconRetrieve} className='pes-icon icon-retrieve' /></span>
						{content.header.planEntryReturn}
					</a>
				</li>
				<li>
					<PdfStatement plan={plan}>{content.header.planStatement}</PdfStatement>
				</li>
				<li>
					<IconInfo className='has-icon-arrow-right' section='#deathNotification'>
						<span className='ml-5'>{content.header.servicingHelp}</span>
					</IconInfo>
				</li>
			</ul>
		</div>
	);
};

class PlanDetailsHeader extends React.Component {
	static contextTypes = {
		content: PropTypes.object,
		plan: PropTypes.object
	};

	render() {
		const {content, plan} = this.context;

		if (plan.planDetail === undefined) return null;

		return (
			<div className='toolbar-area'>
				<div className='row toolbar-top mx-0'>
					<ProductInfo content={content} plan={plan} />
					<div className='col-md-3 col-sm-4 hidden-xs color-link fs-smaller'>{content.header.quickTools}</div>
				</div>
				<div className='row toolbar-bottom mx-0'>
					<PlanHolder content={content} plan={plan} />
					<PlanStatus content={content} plan={plan} />
					<QuickLink content={content} plan={plan} />
				</div>
			</div>
		);
	}
}

export default PlanDetailsHeader;