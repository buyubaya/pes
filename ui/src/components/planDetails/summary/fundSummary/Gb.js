import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../../common/Currency';

class GbFundSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const funds = get(this.context, `plan.planDetail.funds`);

        return(
            (funds && funds.length > 0)
            ?
            (<div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.fund}</div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-units'>{tabContent.units}</div>
                                    <div className='col-xs-2 text-right cell-unitprice'>{tabContent.unitPrice}</div>
                                    <div className='col-xs-2 text-right cell-value'>{tabContent.value}</div>
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
                                                {Number(item.noOfUnits).toFixed(3)}
                                            </div>
                                            <div className='col-xs-2 text-right cell-unitprice'>
                                                <Currency digits={3}>{item.unitPrice}</Currency>
                                            </div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                <Currency>{item.value}</Currency>
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

export default GbFundSummary;