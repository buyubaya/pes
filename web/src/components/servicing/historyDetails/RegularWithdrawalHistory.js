import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import Button from '../../common/Button';
import {get as _get} from 'lodash';
import PayeeDetailsHistory from './PayeeDetailsHistory';
import RegularWithdrawalUtils from '../../../pages/servicing/RegularWithdrawalUtils';
import StringUtils from '../../../utils/StringUtils';
import ProductGroups from '../../../constants/ProductGroups';

class RegularWithdrawalHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };

    _getRemoveRW(content, historyDetails) {
        const details = JSON.parse(historyDetails.details);
        const isB34 = details.planInfoType.productGroup === ProductGroups.B34;
        return (
            <div className='pes-table-list'>
            {!isB34 && 
                [<div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'regularWithdrawal')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {historyDetails.servicingActionName}
                    </div>
                </div>,
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'planNumber')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.planInfoType.planID}
                    </div>
                </div>,
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'planHolderNumber')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.planInfoType.planHolderName}
                    </div>
                </div>,
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'advisorName')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.userInfoType.advisorName}
                    </div>
                </div>,
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'agentCode')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.userInfoType.agentCode}
                    </div>
                </div>,
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'authorisationNumber')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.userInfoType.fsaNumber}
                    </div>
                </div>]
            }
            {isB34 && (
                <div className='tlrow'>
                    <div className='tlcell col-xs-12'>
                        Regular Withdrawls removed.
                    </div>
                </div>
            )}
            </div>
        );
    }

    _getAddAmendRW(content, historyDetails) {
        const details = JSON.parse(historyDetails.details);
        const isGMF = details.planInfoType.productGroup === 'GMF';
        const isTIP = details.planInfoType.productGroup === 'TIP';
        const isAmountEachYear = details.regularWithdrawalDetailsType.typeOfWithdrawal === 'AMOUNT_EACH_YEAR';
        const isPercentage = !isAmountEachYear && isGMF;
        const typeOfWithdrawalText = details.regularWithdrawalDetailsType.typeOfWithdrawal === 'AMOUNT_EACH_YEAR' ? 'Amount each year' : 'Percentage each year of the plan value';
        const withdrawalIncreasePercentage = details.regularWithdrawalDetailsType.increaseBasis === 'PERCENTAGE';
        let withdrawalIncreaseText = '';
        let frequencyOfWithdrawalText = '';
        let firstMonthOfPaymentText = '';
        let amountEachPayment = '';
        let regularWithdrawalActionName = '';

        switch (historyDetails.servicingActionName) {
            case 'ADD_REGULAR_WITHDRAWAL':
                regularWithdrawalActionName = 'Add Regular Withdrawal';
                break;
            case 'AMEND_REGULAR_WITHDRAWAL':
                regularWithdrawalActionName = 'Amend Regular Withdrawal';
                break;
            case 'REMOVE_REGULAR_WITHDRAWAL':
                regularWithdrawalActionName = 'Remove Regular Withdrawal';
                break;
            default:
                break;
        }
        switch (details.regularWithdrawalDetailsType.increaseBasis) {
            case 'PERCENTAGE':
                withdrawalIncreaseText = 'Percentage';
                break;
            case 'NO_INCREASE':
                withdrawalIncreaseText = 'No increase';
                break;
            case 'INLINE_WITH_AEI':
                withdrawalIncreaseText = 'Inline with AEI';
                break;
            case 'INLINE_WITH_RPI':
                withdrawalIncreaseText = 'Inline with RPI';
                break;
            default:
                break;
        }

        switch (details.regularWithdrawalDetailsType.frequencyOfWithdrawal) {
            case 'EVERY_MONTH':
                frequencyOfWithdrawalText = 'Every month';
                break;
            case 'EVERY_3_MONTHS':
                frequencyOfWithdrawalText = 'Every 3 months';
                break;
            case 'EVERY_4_MONTHS':
                frequencyOfWithdrawalText = 'Every 4 months';
                break;
            case 'EVERY_6_MONTHS':
                frequencyOfWithdrawalText = 'Every 6 months';
                break;
            case 'ONCE_A_YEAR':
                frequencyOfWithdrawalText = 'Once a year';
                break;
            default:
                break;
        }
        switch (details.regularWithdrawalDetailsType.firstMonthOfPayment) {
            case 'JANUARY':
                firstMonthOfPaymentText = 'January';
                break;
            case 'FEBRUARY':
                firstMonthOfPaymentText = 'Febuary';
                break;
            case 'MARCH':
                firstMonthOfPaymentText = 'March';
                break;
            case 'APRIL':
                firstMonthOfPaymentText = 'April';
                break;
            case 'MAY':
                firstMonthOfPaymentText = 'May';
                break;
            case 'JUNE':
                firstMonthOfPaymentText = 'June';
                break;
            case 'JULY':
                firstMonthOfPaymentText = 'July';
                break;
            case 'AUGUST':
                firstMonthOfPaymentText = 'August';
                break;
            case 'SEPTEMBER':
                firstMonthOfPaymentText = 'September';
                break;
            case 'OCTOBER':
                firstMonthOfPaymentText = 'October';
                break;
            case 'NOVEMBER':
                firstMonthOfPaymentText = 'November';
                break;
            case 'DECEMBER':
                firstMonthOfPaymentText = 'December';
                break;
            default:
                break;
        }

        if (isGMF) {
            amountEachPayment = StringUtils.convertToCurrency(details.regularWithdrawalDetailsType.amountEachPayment).total;
        }
        else {
            const template = _get(content, 'amountEachPaymentB34');

            amountEachPayment = StringUtils.format(template, details.regularWithdrawalDetailsType.amountEachPayment, details.regularWithdrawalDetailsType.percentageFundValue);
        }
        return (
            <div className='pes-table-list'>
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'regularWithdrawal')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {isGMF ? historyDetails.servicingActionName : regularWithdrawalActionName}
                    </div>
                </div>
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'typeOfWithdrawal')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {typeOfWithdrawalText}
                    </div>
                </div>
                {isAmountEachYear &&
                <div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4 text-capitalize'>
                            {_get(content, 'amountPercentageEachYear')}
                        </div>
                        <div className='tlcell col-xs-8'>
                            {amountEachPayment}
                        </div>
                    </div>
                    {isGMF &&
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'percentageEachYear')}
                            </div>
                            <div className='tlcell col-xs-8'>
                                {details.regularWithdrawalDetailsType.percentageFundValue}
                            </div>
                        </div>
                    }
                    {
                        !isTIP &&
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'withdrawalIncrease')}
                            </div>
                            <div className='tlcell col-xs-8'>
                                {withdrawalIncreaseText}
                            </div>
                        </div>
                    }
                    {withdrawalIncreasePercentage &&
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4 text-capitalize'>
                            {_get(content, 'annualPercentageIncrease')}
                        </div>
                        <div className='tlcell col-xs-8'>
                            {details.regularWithdrawalDetailsType.increasePercentage}
                        </div>
                    </div>
                    }
                </div>
                }
                {!isAmountEachYear && isGMF &&
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'percentageEachYear')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.regularWithdrawalDetailsType.percentageFundValue}
                    </div>
                </div>
                }
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'frequencyOfRegularWithdrawal')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {frequencyOfWithdrawalText}
                    </div>
                </div>
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {isGMF ? _get(content, 'firstPayment') : _get(content, 'startDate')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {isGMF ? firstMonthOfPaymentText : details.regularWithdrawalDetailsType.startDate}
                    </div>
                </div>
                {!isAmountEachYear && !isGMF &&
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'percentageEachYear')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {details.regularWithdrawalDetailsType.percentageFundValue}
                    </div>
                </div>
                }
                {!isGMF && isPercentage && details.regularWithdrawalType !== 'FROM_SPECIFIC_FUNDS' &&
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'regularWithdrawalType')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {_get(content, 'regularWithdrawalTypePAAF')}
                    </div>
                </div>
                }
                {details.regularWithdrawalType === 'FROM_SPECIFIC_FUNDS' &&
                    this._getFunds(content, details.regularWithdrawalDetailsType.fundSpecificWithdrawalType, isPercentage, isGMF)
                }

                {isGMF && isAmountEachYear && details.regularWithdrawalType !== 'FROM_SPECIFIC_FUNDS' &&
                <div className='tlrow'>
                    <div className='tlcell col-xs-4 text-capitalize'>
                        {_get(content, 'totalAmount')}
                    </div>
                    <div className='tlcell col-xs-8'>
                        {amountEachPayment}
                    </div>
                </div>
                }
            </div>
        );
    }

    _getFunds(content, funds, isPercentage, isGMF) {
        let totalWithdrawal = RegularWithdrawalUtils.sumArrayValues(funds, 'withdrawal');
        const totalFunds = RegularWithdrawalUtils.sumArrayValues(funds, 'currentValue');

        if (isPercentage) {
            funds.map((fund) => {
                fund.withdrawalEx = ((fund.withdrawal * fund.currentValue) / 100).toFixed(2);
                return fund;
            });

            totalWithdrawal = RegularWithdrawalUtils.sumArrayValues(funds, 'withdrawalEx');
        }

        let totalWithdrawalPercentage = ((totalWithdrawal / totalFunds) * 100).toFixed(1);

        return (
            <div className='pes-table-area'>
                <div className='pes-table-lsit'>
                    <div className='tlhead'>
                        {!isGMF &&
                        <div className='note-content'>
                            {_get(content, 'fromSpecificFundsNote')}
                        </div>
                        }
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'fundName')}
                            </div>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'currentValue')}
                            </div>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {isPercentage ? _get(content, 'withdrawalAmountPer') : _get(content, 'withdrawalAmount')}
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>
                        {funds.map((fund, index) => {
                            return (
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-4'>
                                        {fund.currentFundName}
                                    </div>
                                    <div className='tlcell col-xs-4'>
                                        {fund.currentValue}
                                    </div>
                                    <div className='tlcell col-xs-4'>
                                        {fund.withdrawal}
                                    </div>
                                </div>
                            );
                        })}
                        {isGMF && !isPercentage &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-4'>
                                    {_get(content, 'totalAmount')}
                                </div>
                                <div className='tlcell col-xs-4'>
                                </div>
                                <div className='tlcell col-xs-4'>
                                    {StringUtils.convertToCurrency(totalWithdrawal).total}
                                </div>
                            </div>
                        }
                        {isGMF &&
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4'>
                                {_get(content, 'totalWithdrawalPercentage')}
                            </div>
                            <div className='tlcell col-xs-4'>
                            </div>
                            <div className='tlcell col-xs-4'>
                                {totalWithdrawalPercentage}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    render(){
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.regularWithdrawal`);
        const paymentType = 'RWH';
        const historyDetails = this.context.historyDetails || null;

        if (historyDetails === null) {
            return null;
        }

        const isRemoveRW = historyDetails.servicingActionName === 'REMOVE_REGULAR_WITHDRAWAL';
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div>
                    <div className='pes-page-title text-capitalize'>
                        {_get(content, 'regularWithdrawalTitle')}
                    </div>
                    {isRemoveRW && this._getRemoveRW(content, historyDetails)}
                    {!isRemoveRW && this._getAddAmendRW(content, historyDetails)}
                </div>
                {!isRemoveRW &&
                <PayeeDetailsHistory paymentType={paymentType} hidePayeeDetailsTitle />
                }
            </div> 
        );
    }
}


export default RegularWithdrawalHistory;