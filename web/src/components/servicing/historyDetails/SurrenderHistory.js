import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import {get as _get, every as _every} from 'lodash';
import StringUtils from '../../../utils/StringUtils';
import {OPTIONS_DATA} from '../surrender/constants';
import ProductGroups from '../../../constants/ProductGroups';


class SurrenderHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };

    _renderFullSurrender(details, content){
        if(details){
            const {paymentType} = details;

            return(
                <div>
                    <div className='pes-page-title text-capitalize'>
                        {_get(content, 'fullSurrender')}
                    </div>
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12'>
                                {
                                    paymentType === OPTIONS_DATA.paymentType.bankTransfer.value &&
                                    _get(content, 'paymentBankTransfer')
                                }
                                {
                                    paymentType === OPTIONS_DATA.paymentType.cheque.value &&
                                    _get(content, 'paymentCheque')
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    _renderPartialSurrender(details, content){
        if(details){
            const {
                surrenderTypeFunds: partialSurrenderType, 
                paymentType, 
                surrenderDetails: {
                    surrenderTotalAmount: totalSurrenderAmount,
                    fundInvestmentsList
                }
            } = details;

            const noChangeInSpecificAmount = _every(fundInvestmentsList, item => item.amountSurrendered <= 0);
            const isAcrossAll = (partialSurrenderType === OPTIONS_DATA.partialSurrenderType.acrossAllFund.value);
            const isFromSpecific = (partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value);

            return(
                <div>
    
                    <div className='pes-page-title text-capitalize'>
                        {
                            isAcrossAll &&
                            _get(content, 'partialSurenderProportionally')
                        }
                        {
                            isFromSpecific &&
                            _get(content, 'partialSurenderSpecific')
                        }
                    </div>
    
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12'>
                                {
                                    paymentType === OPTIONS_DATA.paymentType.bankTransfer.value &&
                                    _get(content, 'paymentBankTransfer')
                                }
                                {
                                    paymentType === OPTIONS_DATA.paymentType.cheque.value &&
                                    _get(content, 'paymentCheque')
                                }
                            </div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-5'>
                                {_get(content, 'totalSurrenderAmount')}
                            </div>
                            <div className='tlcell col-xs-7'>
                                {StringUtils.convertToCurrency(totalSurrenderAmount, false).total}
                            </div>
                        </div>
                    </div>
                    {
                        !noChangeInSpecificAmount &&
                        isFromSpecific &&
                        (
                            <div className='pes-table-list'>        
                                <div className='tlhead'>
                                    <div className='tlrow text-capitalize'>
                                        <div className='tlcell col-xs-5'>
                                            {_get(content, 'fundName')}
                                        </div>
                                        <div className='tlcell col-xs-4'>
                                            {_get(content, 'surrenderAmount')}
                                        </div>
                                    </div>
                                </div>
                                <div className='tlbody'>
                                    {
                                        fundInvestmentsList && fundInvestmentsList.map((item, index) =>
                                            item.amountSurrendered > 0 
                                            ?
                                            <div className='tlrow' key={index}>
                                                <div className='tlcell col-xs-5'>
                                                    {item.fundName}
                                                </div>
                                                <div className='tlcell col-xs-4'>
                                                    {StringUtils.convertToCurrency(item.amountSurrendered, false).total}
                                                </div>
                                            </div>
                                            :
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        }

        return null;
    }

    _renderPayeeDetailsHistory(details, content){
        if(details){
            const { 
                paymentType, 
                bankDetails: {
                    accountHolderName,
                    bankNameType,
                    branchNameType,
                    sortCodeType,
                    accountNumberType,
                    buildingSocietyRollNumber,
                    payeeName,
                    paymentToOthers
                }
            } = details;
            const productGroup = _get(details, 'planInfoType.productGroup');


            return(
                <div className='pes-servicing-history-details-page pes-bg-grey'>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'payeeDetails')}
                    </div>

                    {
                        paymentType === OPTIONS_DATA.paymentType.bankTransfer.value &&
                        <div className='pes-table-list'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'accountHolderName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {accountHolderName}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'bankBuildingSocietyName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {bankNameType}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'branchName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {branchNameType}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'sortCode')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {this._formatSortCode(sortCodeType)}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'accountNumber')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {this._formatAccountNumber(accountNumberType)}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'buildingSocietyRollNumber')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {buildingSocietyRollNumber}
                                </div>
                            </div>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-12'>
                                    {
                                        productGroup === ProductGroups.TIP
                                        ?
                                        _get(content, 'trusteeText')
                                        :
                                        (
                                            !paymentToOthers ? _get(content, 'planholderText') : _get(content, 'notPlanholderText')
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {
                        paymentType === OPTIONS_DATA.paymentType.cheque.value &&
                        <div className='pes-table-list'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-5 text-capitalize'>
                                    {_get(content, 'accountHolderName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {payeeName}
                                </div>
                            </div>  
                            <div className='tlrow'>
                                <div className='tlcell col-xs-12'>
                                    {
                                        productGroup === ProductGroups.TIP
                                        ?
                                        _get(content, 'trusteeText')
                                        :
                                        (
                                            !paymentToOthers ? _get(content, 'planholderText') : _get(content, 'notPlanholderText')
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }

                </div> 
            );
        }
    }

    _formatAccountNumber(value){
        let x = value.slice(0, -4);
        x = x.split('').map(item => '*').join('');
        const y = value.slice(-4);

        return x + y;
    }

    _formatSortCode(value){
        return value.replace(/^(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3');
    }

    render(){
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.surrender`);
        const payeeDetailsContent = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.payeeDetails`);
        let details = _get(this.context, 'historyDetails.details');
        details = details && JSON.parse(details);
        const surrenderType = _get(details, 'surrenderType');

        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>

                {   
                    (surrenderType === OPTIONS_DATA.surrenderType.fullSurrender.value) &&
                    this._renderFullSurrender(details, content)
                }

                {   
                    (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
                    this._renderPartialSurrender(details, content)
                }

                {
                    this._renderPayeeDetailsHistory(details, payeeDetailsContent)
                }
            </div> 
        );
    }
}


export default SurrenderHistory;