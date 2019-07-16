import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PlanActions from '../actions/PlanDetailsActions';
import * as PlanApi from '../api/PlanApi';

import ContentApiUtils from '../api/ContentApiUtils';
import * as LocalStorage from '../utils/LocalStorage';
import * as SessionStorage from '../utils/SessionStorage';
import UrlUtils from '../utils/UrlUtils';
import SecurityUtils from '../utils/SecurityUtils';

import * as ContentTypes from '../constants/ContentTypes';
import ProductGroups from '../constants/ProductGroups';
import {UserGroups} from '../constants/UserGroups';

import Tab from '../components/planDetails/Tab';
import PlanDetailsHeader from '../components/planDetails/PlanDetailsHeader';
import {PlanDetailsTabs} from '../components/planDetails/PlanDetailsTabsData';
import {TabIDs} from '../constants/PlanDetailTabs';
import {get} from 'lodash';


class PlanDetailsPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			tabsData: null
		};
	}

	static propTypes = {
		content: PropTypes.object,
		plan: PropTypes.object,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		userinfo: PropTypes.object
	};

	static childContextTypes = {
        content: PropTypes.object,
		plan: PropTypes.object,
		id: PropTypes.string,
		userinfo: PropTypes.object
    }

    getChildContext(){
        return {
			content: this.props.content && this.props.content[ContentTypes.PLAN_DETAILS],
			plan: this.props.plan,
			id: this.props.routeParams.id,
			userinfo: this.props.userinfo
		};
	}

	componentWillMount() {
		let planId = this.props.routeParams.id;		
		this.props.api.getPlan({planId: planId}).then(() => {
			if (this.context.plan.productGroupType === ProductGroups.IPB) {
				this._filterWithdrawal(null, null);
			}
		});

		this.props.api.getHistory({planId: planId});
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	_checkPermission(){
		const productGroup = get(this.props, 'plan.productGroupType');
		const productType = get(this.props, 'plan.productType');
		const userGroups = get(this.props, 'userinfo.userGroups');
		
		if(
			productGroup === ProductGroups.TAI && 
			userGroups.includes(UserGroups.STAFF) &&
			['Z00009', 'Z00010', 'Z00011', 'Z00012', 'Z00013'].includes(productType)
		){
			return false;
		}

		return true;
	}

	_filterWithdrawal(start, end) {
		const planId = this.props.routeParams.id;

		this.props.api.filterWithdrawal({
            planId: planId,
            startDate: start,
            endDate: end
        });
	}

	render() {
		//const content = get(this.props, `content.${ContentTypes.PLAN_DETAILS}`);
		const productGroup = get(this.props, 'plan.productGroupType');
		const productType = get(this.props, 'plan.productType');
		const schemeTab = get(this.props, 'plan.planDetail.schemeTab');
		const isServicingRole = SecurityUtils.isServicingRole();

		let tabsData = PlanDetailsTabs.setProductGroup(productGroup, productType);

		// CHECK PRODUCT GROUP AND SERVICING ROLE TO HIDE TAB
		if((productGroup !== ProductGroups.GP && productGroup !== ProductGroups.TAI) || !schemeTab){
			tabsData = tabsData.hideTab(TabIDs.scheme);
		}

		if(productGroup === ProductGroups.TIP){
			tabsData = tabsData.hideTab(TabIDs.planholder);
		}

		if(productGroup === ProductGroups.IPB || !isServicingRole){
			tabsData = tabsData.hideTab(TabIDs.servicing);
		}

		tabsData = tabsData.getData();

		const defaultTab = (location.hash && location.hash.slice(1)) || TabIDs.summary;
		LocalStorage.set('currentTab', defaultTab);

		const isValidPermission = this._checkPermission();

		if(!isValidPermission){
			return(
				<div className='container'>
					<div className='bg-grey mt-50 p-10'>
						<p>Staff users are not allowed to access this application</p>
						<div className='text-right'>
							<a href={UrlUtils.getActualLink('/')} className='pes-btn pes-btn-default'>Ok</a>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='container'>
				<div className='row'>
					<div className='col-xs-12'>
						<PlanDetailsHeader />
					</div>
				</div>
				<div className='row'>
					<div className='col-xs-12'>
						<Tab 
							tabsData={tabsData}
							defaultTab={defaultTab}
							dynamicTab
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		content: state.content,
		plan: state.plan
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(PlanApi, dispatch),
		actions: bindActionCreators(PlanActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlanDetailsPage);
