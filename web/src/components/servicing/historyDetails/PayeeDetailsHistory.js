import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';

import {get as _get} from 'lodash';
import StringUtils from '../../../utils/StringUtils';
import ServicingTypes from '../../../constants/ServicingTypes';

class PayeeDetailsHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };
    _getStringAccountNumber(value){
        return "*".repeat(value.length - 4) + value.substr(value.length - 4);
    }
    render() {
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.payeeDetails`);
        let details = JSON.parse(this.context.historyDetails.details);
        const withdrawalsPaidToNonApplicant = details.regularWithdrawalDetailsType && details.regularWithdrawalDetailsType.payeeDetailsType === 'true';
        let bankInfo = details.bankDetails || details.bankAccountType;
        let paymentType = details.paymentType || this.props.paymentType;
        const productGroup = details.planInfoType.productGroup;
        const isGMF = productGroup === 'GMF';
        const isTIP = productGroup === 'TIP';
        
        let planholder = (!_.isUndefined(details.paymentToOthers) && details.paymentToOthers) ? _get(content, 'notPlanholderText') : _get(content, 'planholderText');
        const servicingType = _get(this.context.historyDetails, 'servicingActionName');
        console.log(withdrawalsPaidToNonApplicant);
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div className='pes-section-title text-capitalize'>
                    {!(paymentType === 'RWH') && _get(content, 'payeeDetails')}
                </div>
                {
                    (paymentType === 'BACS' || paymentType === 'RWH') &&
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'accountHolderName')}
                            </div>
                            <div className='tlcell col-xs-8'>{bankInfo.accountHolderName}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'bankBuildingSocietyName')}
                            </div>
                            <div className='tlcell col-xs-8'>{bankInfo.bankNameType}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'branchName')}
                            </div>
                            <div className='tlcell col-xs-8'>{bankInfo.branchNameType}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'sortCode')}
                            </div>
                            <div className='tlcell col-xs-8'>{StringUtils.sortCodeFormat(bankInfo.sortCodeType)}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'accountNumber')}
                            </div>
                            <div className='tlcell col-xs-8'>{this._getStringAccountNumber(bankInfo.accountNumberType)}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'buildingSocietyRollNumber')}
                            </div>
                            <div className='tlcell col-xs-8'>{bankInfo.buildingSocietyRollNumber}</div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4'>
                                {!isTIP && (paymentType === 'RWH' && isGMF) && (withdrawalsPaidToNonApplicant ?  _get(content, 'notPlanholderText'):_get(content, 'planholderText'))}
                                {!isTIP && (paymentType === 'BACS' || (paymentType === 'RWH' && !isGMF && productGroup != 'B34')) && planholder}
                                {!isTIP && (paymentType === 'RWH' && !isGMF && productGroup == 'B34') && (withdrawalsPaidToNonApplicant ?  _get(content, 'notPlanholderText'):_get(content, 'planholderText'))}
                                {
                                    isTIP &&
                                    _get(content, 'trusteeText')
                                }
                            </div>
                            {/* {(paymentType === 'BACS' || (paymentType === 'RWH' && !isGMF)) &&
                            <div className='tlcell col-xs-8'>{details.paymentToOthers === false ? 'No' : 'Yes'}</div>
                            } */}
                        </div>
                    </div>
                }

                {
                    paymentType === 'CHEQUE' &&
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'accountHolderName')}
                            </div>
                            <div className='tlcell col-xs-8'>{details.payeeName}</div>
                        </div>  
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12'>
                                { 
                                    !isTIP &&
                                    (
                                        (servicingType === ServicingTypes.ADD_REGULAR_WITHDRAWAL || servicingType === ServicingTypes.AMEND_REGULAR_WITHDRAWAL)
                                    )
                                    &&(
                                        withdrawalsPaidToNonApplicant  ? _get(content, 'notPlanholderText'): _get(content, 'planholderText')
                                    )
                                }
                                {
                                    !isTIP &&
                                    (
                                        !(servicingType === ServicingTypes.ADD_REGULAR_WITHDRAWAL || servicingType === ServicingTypes.AMEND_REGULAR_WITHDRAWAL)
                                    )
                                    &&planholder
                                }
                                {
                                    isTIP &&
                                    _get(content, 'trusteeText')
                                }
                            </div>
                            {/* <div className='tlcell col-xs-8'>{details.paymentToOthers==false? 'No' : 'Yes'}</div> */}
                        </div>
                    </div>
                }

            </div> 
        );
    }
}


export default PayeeDetailsHistory;