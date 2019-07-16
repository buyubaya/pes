import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as PlanDetailsActions from '../../actions/PlanDetailsActions';
import * as PlanApi from '../../api/PlanApi';

import * as ServicingActions from '../../actions/ServicingActions';
import * as ServicingApi from '../../api/ServicingApi';

import ContentApiUtils from '../../api/ContentApiUtils';
import TransitionUtils from '../../utils/TransitionUtils';

import * as ContentTypes from '../../constants/ContentTypes';
import ServicingTypes from '../../constants/ServicingTypes';

import {get as _get} from 'lodash';

import UrlUtils from '../../utils/UrlUtils';
// COMPONENTS
import AmendHistory from '../../components/servicing/historyDetails/AmendHistory';
import RegularWithdrawalHistory from '../../components/servicing/historyDetails/RegularWithdrawalHistory';
import IncomePaymentHistory from '../../components/servicing/historyDetails/IncomePaymentHistory';
import DistributionHistory from '../../components/servicing/historyDetails/DistributionHistory';
import SurrenderHistory from '../../components/servicing/historyDetails/SurrenderHistory';
import SwitchFundHistory from '../../components/servicing/historyDetails/SwitchFundHistory';
import RedirectContributionHistory from '../../components/servicing/historyDetails/RedirectContributionHistory';


class ServicingHistoryDetailsPage extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

	static propTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
		historyDetails: PropTypes.object,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	};

	static childContextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
		historyDetails: PropTypes.object
    }

    getChildContext(){
        return {
            content: this.props.content,
            plan: this.props.plan,
			historyDetails: this.props.historyDetails
		};
    }

	componentDidMount() {
        let historyId = this.props.params.historyId;
        if(historyId){
            this.props.api.getHistoryDetails(historyId);
        }
    }

    render(){
        const servicingType = _get(this.props, 'historyDetails.servicingActionName');
        let planId = _get(this.props, 'params.id');
        let backLink = UrlUtils.getActualLink(`/plan-details/${planId}#servicing-history`);
        return(
            <div className='pes-bg-grey'>
                {
                    (
                        servicingType === ServicingTypes.AMEND_PERSONAL_DETAILS ||
                        servicingType === ServicingTypes.AMEND_TRUSTEE_DETAILS ||
                        servicingType === ServicingTypes.AMEND_ORGANISATION_DETAILS
                    ) &&
                    <AmendHistory />
                }
                {
                    (
                        servicingType === ServicingTypes.ADD_REGULAR_WITHDRAWAL ||
                        servicingType === ServicingTypes.AMEND_REGULAR_WITHDRAWAL ||
                        servicingType === ServicingTypes.REMOVE_REGULAR_WITHDRAWAL
                    ) &&
                    <RegularWithdrawalHistory />
                }
                {
                    (
                        servicingType === ServicingTypes.INCOME_PAYMENT ||
                        servicingType === ServicingTypes.ADD_INCOME_PAYMENT ||
                        servicingType === ServicingTypes.AMEND_INCOME_PAYMENT_ACCROSS ||
                        servicingType === ServicingTypes.AMEND_INCOME_PAYMENT_SPECIFIC ||
                        servicingType === ServicingTypes.REINVEST_INCOME ||
                        servicingType === ServicingTypes.STOP_INCOME_PAYMENT
                    ) &&
                    <IncomePaymentHistory />
                }
                {
                    (
                        servicingType === ServicingTypes.CHANGE_DISTRIBUTION ||
                        servicingType === ServicingTypes.AMEND_DISTRIBUTION_PAYMENT ||
                        servicingType === ServicingTypes.STOP_DISTRIBUTION
                    ) &&
                    <DistributionHistory />
                }
                {
                    (
                        servicingType === ServicingTypes.SURRENDER ||
                        servicingType === ServicingTypes.PARTIAL_SURRENDER_ACROSS_ALL ||
                        servicingType === ServicingTypes.PARTIAL_SURRENDER_SPECIFIC_FUNDS
                    ) &&
                    <SurrenderHistory />
                }
                {
                    (
                        servicingType === ServicingTypes.SWITCH_FUND ||
                        servicingType === ServicingTypes.REBALANCE_FUND
                    ) &&
                    <SwitchFundHistory />
                }
                {
                    servicingType === ServicingTypes.REDIRECT_CONTRIBUTION &&
                    <RedirectContributionHistory />
                }

                <div className='pes-table-list'>
                    <div className='tlrow empty pes-bg-grey-dark'></div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12 text-right'>
                            <a href={backLink} className='pes-btn pes-btn-default text-center'>Back</a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
	return {
        content: state.content,
        plan: state.plan,
		historyDetails: _get(state, 'servicing.historyDetails')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators({...ServicingApi, ...PlanApi}, dispatch),
		actions: bindActionCreators({...ServicingActions, ...PlanDetailsActions}, dispatch)
	};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServicingHistoryDetailsPage);