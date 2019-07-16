import React, {PropTypes} from 'react';
import {get} from 'lodash';
import IconInfo from '../../../common/IconInfo';
import StringUtils from '../../../../utils/StringUtils';


class Payments extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    _getPayments(tabContent, ipbData) {
        const paymentPlans = ipbData ? ipbData.paymentPlans : null;
        let ipbPaymentSectionTitle = 'Payments into the plan';
        let ipbPaymentTooltip = 'Payments show new monies paid into the plan (i.e. new business / top ups).This does not include payments in respect of distributions / rebates, which are posted to the client&#146;s transaction account.';
        let ipbReceiptDateText = 'Receipt date';
        let ipbCurrencyText = 'Currency';
        let ipbAmountText = 'Amount';


        if (tabContent) {
            ipbPaymentSectionTitle = tabContent.ipbPaymentSectionTitle;
            ipbPaymentTooltip = tabContent.ipbPaymentTooltip;
            ipbReceiptDateText = tabContent.ipbReceiptDateText;
            ipbCurrencyText = tabContent.ipbCurrencyText;
            ipbAmountText = tabContent.ipbAmountText;
        }
        
        return (
            paymentPlans && paymentPlans.length > 0 && <div className='pes-table-list pes-withdrawals-table'>
                <div className='tlrow empty'></div>
                <div className='tlbody'>
                    <div className='tlrow'>
                        <div className='tlcell tlh col-sm-4 col-xs-12 align-top text-bold text-capitalize'>{ipbPaymentSectionTitle}</div>
                        <div className='tlcell col-sm-8 col-xs-12 px-0 pt-0'>
                            <div className='pes-table-area'>
                                <div className='pes-table-list border-none'>
                                    <div className='tlhead'>
                                        <div className='tlrow'>
                                            <div className='tlcell col-xs-4'>
                                                <IconInfo className='mr-5' tooltip={ipbPaymentTooltip} />{ipbReceiptDateText}
                                            </div>
                                            <div className='tlcell col-xs-2'>
                                                {ipbCurrencyText}
                                            </div>
                                            <div className='tlcell col-xs-3 text-right'>
                                                {ipbAmountText}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tlbody'>
                                    {
                                        paymentPlans && paymentPlans.length > 0 &&
                                        paymentPlans.map((payment, index) => (
                                            <div className='tlrow' key={index}>
                                                <div className='tlcell col-xs-4'>
                                                    {StringUtils.formattedDate(payment.receiptDate)}
                                                </div>
                                                <div className='tlcell col-xs-2'>
                                                    {payment.currency}
                                                </div>
                                                <div className='tlcell col-xs-3 text-right'>
                                                    {StringUtils.convertToCurrency(payment.amount, false).total}
                                                </div>
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _getRegularWithdrawals(tabContent, ipbData) {
        let rwDescription = 'There are no regular withdrawals currently being taken from this plan';
        let withdrawalInformation = 'Regular withdrawals information';

        if (tabContent) {
            rwDescription = tabContent.ipbRWINoTakenMsg;
            withdrawalInformation = tabContent.withdrawalInformation;

            if (ipbData && ipbData.regularWithdrawal) {
                if (ipbData.withdrawalFlag) {
                    rwDescription = StringUtils.format(tabContent.ipbRWITakenMsg, ipbData.withdrawalCurrency, ipbData.withdrawalAmount, ipbData.withdrawalFrequency, StringUtils.formattedDate(ipbData.withdrawalStartDate));
                }
                else {
                    rwDescription = StringUtils.format(tabContent.ipbRWITakingMsg, ipbData.withdrawalCurrency, ipbData.withdrawalAmount, ipbData.withdrawalFrequency, StringUtils.formattedDate(ipbData.withdrawalStartDate));
                }
            } 
        }
        return (
            <div className='pes-table-list pes-withdrawals-table'>
                <div className='tlbody'>
                    <div className='tlrow empty'></div>
                    <div className='tlrow'>
                        <div className='tlcell tlh col-sm-4 col-xs-12 align-top mt-5 text-bold text-capitalize'>{withdrawalInformation}</div>
                        <div className='tlcell col-sm-8 col-xs-12'>
                            <div className='row'>
                                <div className='col-xs-8'>
                                    {rwDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const tabContent = get(this.context, 'content.investmentAndWithdrawalsTab');
        const ipbData = get(this.context, 'plan.planDetail.investmentAndWithdrawal');

        return (
        <div>
            {this._getPayments(tabContent, ipbData)}
            {this._getRegularWithdrawals(tabContent, ipbData)}
        </div>
        );
    }
}


export default Payments;