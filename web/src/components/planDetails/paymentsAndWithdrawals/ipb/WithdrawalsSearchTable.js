import React from 'react';
import StringUtils from '../../../../utils/StringUtils';

const WithdrawalsSearchTable = props => {
    const {tabContent, data} = props;    
    const withdrawalPaymentPlans = data;
    let renderWithdrawalPayment = tabContent.ipbWithdrawalsNoPaymentInPeriodMsg;

    if (withdrawalPaymentPlans && withdrawalPaymentPlans.length > 0) {
        renderWithdrawalPayment = 
        withdrawalPaymentPlans.map((payment, index) => (
            <div
                key={`payment-${index}`}
                className='tlrow'>
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
        ));
    }

    return (    
        <div className='pes-table-area'>
            <div className='pes-table-list border-none'>
                <div className='tlhead'>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4'>
                            {tabContent.ipbPaymentDate}
                        </div>
                        <div className='tlcell col-xs-2'>
                            {tabContent.ipbCurrencyText}
                        </div>
                        <div className='tlcell col-xs-3 text-right'>
                            {tabContent.ipbAmountText}
                        </div>
                    </div>
                </div>
                <div className='tlbody'>
                    {renderWithdrawalPayment}
                </div>
            </div>
        </div>
    );
};


export default WithdrawalsSearchTable;