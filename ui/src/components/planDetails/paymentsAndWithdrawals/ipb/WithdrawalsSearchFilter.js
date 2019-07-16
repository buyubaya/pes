import React, {PropTypes} from 'react';
import {get} from 'lodash';
import IconInfo from '../../../common/IconInfo';
import WithdrawalsSearchTable from './WithdrawalsSearchTable';
import WithdrawalsSearchFilterForm from './WithdrawalsSearchFilterForm';
import ApiUtils from '../../../../api/ApiUtils';
import ApiEndpoints from '../../../../api/ApiEndpoints';

class WithdrawalsSearchFilter extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            filterData: null,
		};
    }
    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        id: PropTypes.string
    }

    _filterWithdrawals(start, end) {
        const planId = this.context.id;
        const requestData = {
            planId: this.context.id,
            startDate: start,
            endDate: end
        };

        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.FilterWithdrawals}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            this.setState({filterData: res});
        }, (err, res) => {
            //todo: handle error
            alert('error');
        });
    }

    _getFilter(tabContent, ipbData, noPayments) {
        let ipbWithdrawalsSectionTitle = 'Withdrawals taken from the plan';
        let ipbWithdrawalsSectionDesc = 'Details of the last 3 months are listed below - you can search for withdrawals using the search facilities';

        if (tabContent) {
            ipbWithdrawalsSectionTitle = tabContent.ipbWithdrawalsSectionTitle;
            ipbWithdrawalsSectionDesc = tabContent.ipbWithdrawalsSectionDesc;
        }

        const data = ipbData ? ipbData.withdrawalPaymentPlans : null;
        return (
            data && data.length > 0 ?
            <div className='tlrow border-none'>
                <div className='tlcell col-sm-8 col-xs-12 bg-inputs-group mb-10'>
                    <div className='widrawals-search-filter-area'>
                        <p className='mb-5'>
                            <IconInfo className='mr-5' />{ipbWithdrawalsSectionDesc}
                        </p>
                        <div className='form-area withdrawals-search-filter-form-area'>
                            <WithdrawalsSearchFilterForm
                                tabContent={tabContent}
                                onSubmit={values => {
                                    this._filterWithdrawals(values.startDate, values.endDate);}
                                } />
                        </div>
                    </div>
                </div>
            </div> : <div className='tlcell col-sm-8 col-xs-12'>
                <div className='row'>
                    <div className='col-xs-8'>{noPayments}</div>
                </div>
            </div>
        );

    }

    render() {
        const tabContent = get(this.context, 'content.investmentAndWithdrawalsTab');
        const ipbData = get(this.context, 'plan.planDetail.investmentAndWithdrawal') || null;
        const isWithdrawals = (ipbData && ipbData.withdrawal) || false;
        let noPayments = <div className='border-none'>{'No payments have been made from this plan'}</div>;
        const defaultWithdrawals = ipbData ? ipbData.withdrawalPaymentPlans : null;

        if (tabContent) {
            noPayments = (<div className='tlcell col-sm-8 col-xs-12'>
                <div className='row'>
                    <div className='col-xs-8'>{tabContent.ipbWithdrawalsNoPaymentMsg}</div>
                </div>
        </div>);
        }

        const withdrawalPaymentPlans = this.state.filterData? this.state.filterData : defaultWithdrawals;
        
        return (
            <div className='pes-table-list pes-withdrawals-table'>
                <div className='tlrow empty'></div>
                <div className='tlbody'>         
                    <div className='tlcell tlh col-sm-4 col-xs-12 align-top text-bold text-capitalize'>{'Withdrawals taken from the plan'}</div>   
                    {isWithdrawals ? this._getFilter(tabContent, ipbData, tabContent.ipbWithdrawalsNoPaymentMsg) : noPayments}
                    {
                        withdrawalPaymentPlans && withdrawalPaymentPlans.length > 0 && <div className='tlrow'>
                            <div className='tlcell col-sm-8 col-xs-12 col-sm-offset-4 px-0'>
                                <WithdrawalsSearchTable tabContent={tabContent} data={data} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export default WithdrawalsSearchFilter;