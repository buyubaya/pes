import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import {get as _get} from 'lodash';
import ServicingTypes from '../../../constants/ServicingTypes';
import PayeeDetailsHistory from './PayeeDetailsHistory';


class IncomePaymentHistory extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };
    _getIncomePaymentOptionType=(servicingActionName)=>{
        let _value = '';
        switch(servicingActionName){
            case ServicingTypes.INCOME_PAYMENT:
            case ServicingTypes.ADD_INCOME_PAYMENT:
                _value ='TAKE_INCOME_PAYMENTS';
                break;
            case ServicingTypes.AMEND_INCOME_PAYMENT_ACCROSS:
            case ServicingTypes.AMEND_INCOME_PAYMENT_SPECIFIC:
                _value = 'AMEND_BANK_DETAILS_FOR_INCOME_PAYMENTS';
                break;
            case ServicingTypes.REINVEST_INCOME:
            case ServicingTypes.STOP_INCOME_PAYMENT:
                _value = 'REINVEST_INCOME';
                break;
        }
        return _value;
    }
    render(){
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.incomePayment`);
        const servicingActionName = _get(this.context, 'historyDetails.servicingActionName');
        //let incomePaymentOptionType = this._getIncomePaymentOptionType(servicingActionName);
        let details = JSON.parse(this.context.historyDetails.details);
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div>
                    <div className='pes-page-title text-capitalize'>
                        {_get(content, 'incomePayments')}
                    </div>
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'incomePaymentOption')}
                            </div>
                            <div className='tlcell col-xs-8'>{details.distributionChangeType}</div>
                        </div>
                    </div>
                </div>
                {servicingActionName !== ServicingTypes.REINVEST_INCOME && <PayeeDetailsHistory/>}
                
            </div> 
        );
    }
}


export default IncomePaymentHistory;