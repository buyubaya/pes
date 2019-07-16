import React, {PropTypes} from 'react';
import {get} from 'lodash';
import OutstandingTradeSettlements from './OutstandingTradeSettlements';
import DateFormat from '../../common/DateFormat';
import Currency from '../../common/Currency';

class TransactionAccount extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const transactionAccounts = get(this.context, 'plan.planDetail.transactionAccounts');

        return(
            <div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                    <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.transactionAccounts}</div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-3 cell-units'></div>
                                    <div className='col-xs-2 cell-currency'>{tabContent.currency}</div>
                                    <div className='col-xs-2 cell-unitprice'></div>
                                    <div className='col-xs-2 text-right cell-value'>{tabContent.value}</div>
                                    <div className='col-xs-3 text-center cell-valuationdate'>{tabContent.valuationDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>
                        {
                            transactionAccounts.map((item, index) => 
                            <div className='transaction-item' key={index}>
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-3 cell-fundname'>{item.name}</div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 cell-units'></div>
                                            <div className='col-xs-2 cell-currency'>{item.currency}</div>
                                            <div className='col-xs-2 cell-unitprice'></div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                <Currency prefix=''>{item.value}</Currency>
                                            </div>
                                            <div className='col-xs-3 text-center cell-valuationdate'>
                                                <DateFormat>{item.valuationDate}</DateFormat>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    item.displayWarning &&
                                    <div className='tlrow'>
                                        <div className='tlcell col-xs-12'>
                                            Please note that action is required as the transaction account is low in relation to the current value of the plan
                                        </div>
                                    </div>
                                }
                                {
                                    item.outstandingSettlements &&
                                    <OutstandingTradeSettlements item={item} /> 
                                }                       
                            </div>  
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default TransactionAccount;