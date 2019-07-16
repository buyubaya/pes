import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../common/Currency';
import DateFormat from '../../common/DateFormat';

class TradingCashAccount extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const tradingCashTransactions = get(this.context, 'plan.planDetail.tradingCashTransactions');
        const discretionaryAssetMgr = get(this.context, 'plan.planDetail.discretionaryAssetMgr');

        return(
            tradingCashTransactions &&
            tradingCashTransactions.length > 0 &&
            (<div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.tradingCashAccountName}</div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-2 cell-units'></div>
                                    <div className='col-xs-2 cell-currency'>{tabContent.currency}</div>
                                    <div className='col-xs-2 cell-unitprice'></div>
                                    <div className='col-xs-2 cell-value'>{tabContent.value}</div>
                                    <div className='col-xs-2 cell-valuationdate'>{tabContent.valuationDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='tlbody'>
                    {
                        tradingCashTransactions.map((item, index) => 
                            <div className='tlrow' key={index}>
                                <div className='tlcell col-xs-3'>
                                    {discretionaryAssetMgr + item.name}
                                </div>
                                <div className='tlcell col-xs-9'>
                                    <div className='row list-of-5'>
                                        <div className='col-xs-2'></div>
                                        <div className='col-xs-2 cell-currency'>{item.currency}</div>
                                        <div className='col-xs-2'></div>
                                        <div className='col-xs-2'>
                                            <Currency>{item.value}</Currency>
                                        </div>
                                        <div className='col-xs-2'>
                                            <DateFormat>{item.valuationDate}</DateFormat>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </div> 
                </div>
            </div>)
        );
    }
}

export default TradingCashAccount;