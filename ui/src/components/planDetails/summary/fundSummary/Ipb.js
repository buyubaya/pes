import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../../common/Currency';
import DateFormat from '../../../common/DateFormat';

class IpbFundSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const funds = get(this.context, 'plan.planDetail.funds');

        return(
            funds
            ?
            (<div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.funds}</div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-units'>{tabContent.units}</div>
                                    <div className='col-xs-2 cell-currency'>{tabContent.currency}</div>
                                    <div className='col-xs-2 text-right cell-unitprice'>{tabContent.unitPrice}</div>
                                    <div className='col-xs-2 text-right cell-value'>{tabContent.value}</div>
                                    <div className='col-xs-3 text-center cell-valuationdate'>{tabContent.valuationDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>
                        {
                            funds.map((item, index) => (
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-3 cell-fundname'>
                                        {item.name}
                                    </div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 text-right cell-units'>
                                                {Number(item.noOfUnits).toFixed(4)}
                                            </div>
                                            <div className='col-xs-2 cell-currency'>
                                                {item.currency}
                                            </div>
                                            <div className='col-xs-2 text-right cell-unitprice'>
                                                <Currency prefix='' digits={4}>{item.unitPrice}</Currency>
                                            </div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                <Currency prefix=''>{item.value}</Currency>
                                            </div>
                                            <div className='col-xs-3 text-center cell-valuationdate'>
                                                <DateFormat>{item.valuationDate}</DateFormat>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>)
            :
            null
        );
    }
} 

export default IpbFundSummary;