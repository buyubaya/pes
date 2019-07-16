import React, { PropTypes } from 'react';
import IconInfo from '../common/IconInfo';
import {get} from 'lodash';
import ProductGroups from '../../constants/ProductGroups';
import ContentApiUtils from '../../api/ContentApiUtils';
import * as ContentTypes from '../../constants/ContentTypes';
import moment from 'moment';
import StringUtils from '../../utils/StringUtils';
import {UserRole} from '../../constants/MyProfile';


const PlanHolder = ({content, plan}) => {	
	let planHolderHeader = '';
	let planHolderName = '';
	switch (plan && plan.productGroupType){
		case ProductGroups.B34:
		case ProductGroups.GB:
		case ProductGroups.GP:
		case ProductGroups.TAI:
		case ProductGroups.IPB:
		case ProductGroups.GMF:
			if (plan.planDetail.planHolders.length > 1) {
				planHolderHeader = get(content, 'header.firstPlanHolder');
			}
			else {
				planHolderHeader = get(content, 'header.planHolder');
			}
			planHolderName = get(plan, 'planDetail.firstPlanHolderName');
			break;
		case ProductGroups.TIP:
			planHolderHeader = get(content, 'header.trustee');
			planHolderName = get(plan, 'planDetail.planHolders[0].name');
			break;
	}
	return (
		<div className='col-md-6 col-sm-5 col-xs-6'>
			<span className='color-grey mr-5'>{planHolderHeader}:</span>{planHolderName}
		</div>
	);
};


const PlanStatus = ({content, plan}) => {
	let planStatusHeader = '';
	let planStatusValue = '';
	switch (plan && plan.productGroupType) {
		case ProductGroups.B34:
		case ProductGroups.GB:
		case ProductGroups.IPB:
			planStatusHeader = get(content, 'header.status');
			planStatusValue = get(plan, 'planDetail.planStatus');
			break;
		case ProductGroups.GMF:
			planStatusHeader = get(content, 'header.startDate');
			planStatusValue = moment(get(plan, 'planDetail.planStartDate')).format('DD/MM/YYYY');
			break;
		case ProductGroups.GP:
		case ProductGroups.TAI:
		case ProductGroups.TIP:
			let planStartDate = get(plan, 'planDetail.planStartDate');
			if (planStartDate && planStartDate.length > 0) {
				planStatusHeader = get(content, 'header.startDate');
				
				planStartDate = moment(planStartDate).format('DD/MM/YYYY');
				if (planStatusValue.length > 0) {
					planStatusValue = `${planStartDate} (${get(plan, 'planDetail.planStatus')})`;
				}
				else {
					planStatusValue = `${planStartDate} (${get(content, 'header.inForce')})`;
				}
			}
			else if (planStatusValue.length > 0) {
				planStatusHeader = get(content, 'header.status');
				planStatusValue = get(plan, 'planDetail.planStatus');
			}
			break;
	}
	return (
		<div className='col-sm-3 col-xs-6'>
			<span className='color-grey mr-5'>{planStatusHeader}:</span>{planStatusValue}
		</div>
	);
};


class ServicingHeader extends React.Component {
	constructor(props, context){
		super(props, context);
	}

	static propTypes = {
		planDetailsContent: PropTypes.object,
		plan: PropTypes.object,
		userinfo: PropTypes.object
	};

	componentWillMount(){
		ContentApiUtils.updateStoreContent(ContentTypes.PLAN_DETAILS);
	}

	_getAgentCode(){
		const {userinfo} = this.props;
		const role = get(userinfo, 'role');
		let agentCode = get(userinfo, 'agentCode');
		
		if(!agentCode){
			if(role === UserRole.STAFF){
				agentCode = 'STAFF';	
			}
			if(role === UserRole.PA){
				agentCode = 'PA';	
			}
			else {
				agentCode = 'Adviser';	
			}
		}

		return agentCode;
	}

	render(){
		const {planDetailsContent, plan} = this.props;
		let agentCode = this._getAgentCode();

		return (
			<div className='toolbar-area'>
				<div className='row toolbar-top mx-0'>
					<div className='col-md-9 col-sm-8'>
						<span className='color-grey mr-5'>
							{(get(plan,'productGroupType') === ProductGroups.TIP && get(planDetailsContent, 'header.trusteeProduct')) || get(plan,'planDetail.productFullName')}
						</span>
						<span className='plan-number ml-10'>
							{get(plan,'planDetail.planNumber')}
						</span>
					</div>
					<div className='col-md-3 col-sm-4 hidden-xs'>{get(planDetailsContent, 'header.agent')}: {agentCode}</div>
				</div>
				<div className='row toolbar-bottom mx-0'>

					<PlanHolder content={planDetailsContent} plan={plan} />

					<PlanStatus content={planDetailsContent} plan={plan} />

					<div className='col-md-3 col-sm-4 col-xs-12'>
						<ul className='list-none tools-list'>
							<li>
								{get(planDetailsContent, 'header.date')}: {moment.utc(get(plan, 'planDetail.valuationDate')).format('DD/MM/YYYY')}
							</li>
							<li>
								{get(planDetailsContent, 'header.time')}: {moment.utc(get(plan, 'planDetail.valuationDate')).format('hh:mm:ss A')}
							</li>
							<li>
								<IconInfo className='has-icon-arrow-right' section='#deathNotification'>
									<span className='ml-5'>{get(planDetailsContent, 'header.servicingHelp')}</span>
								</IconInfo>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ServicingHeader;