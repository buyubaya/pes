import React, {PropTypes} from 'react';
import {get} from 'lodash';
import DateFormat from '../../common/DateFormat';
import Currency from '../../common/Currency';

class DepositAccounts extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const depositAccounts = get(this.context, 'plan.planDetail.depositAccounts');

        return(
            <div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.depositAccountName}</div>
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
                            depositAccounts.map((item, index) => 
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-3 cell-fundname'>{item.name}</div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 cell-units'></div>
                                            <div className='col-xs-2 cell-currency'>{item.currency}</div>
                                            <div className='col-xs-2 cell-unitprice'></div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                <Currency>{item.value}</Currency>
                                            </div>
                                            <div className='col-xs-3 text-center cell-valuationdate'>
                                                <DateFormat>{item.valuationDate}</DateFormat>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DepositAccounts;