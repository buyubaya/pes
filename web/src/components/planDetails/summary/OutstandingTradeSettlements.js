import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../common/Currency';

class OutstandingTradeSettlements extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const {item} = this.props;

        return(
            item && item.outstandingSettlements &&
            (
            <div className='outstanding-settlements-area'>
                <div className='tlrow'>
                    <div className='tlcell col-xs-12 pes-text-belt'>{tabContent.outstandingSettlements}</div>
                </div>
                {          
                    item.outstandingSettlements.map((item, index) => (
                        <div className='tlrow' key={index}>
                            <div className='tlcell col-xs-3 cell-fundname'>
                                {item.description}
                            </div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-3 cell-units'></div>
                                    <div className='col-xs-2 cell-currency'>
                                        {item.currency}
                                    </div>
                                    <div className='col-xs-2 cell-unitprice'></div>
                                    <div className='col-xs-2 text-right cell-value'>
                                        <Currency prefix=''>{item.value}</Currency>
                                    </div>
                                    <div className='col-xs-3 text-center cell-valuationdate'></div>
                                </div>
                            </div>
                        </div>
                    ))
                } 
                {
                    item && item.availBalVal &&
                    <div className='tlrow'>
                        <div className='tlcell col-xs-3 cell-fundname'>
                            {tabContent.availableBalance}
                        </div>
                        <div className='tlcell col-xs-9 cell-funddetails'>
                            <div className='row'>
                                <div className='col-xs-3 cell-units'></div>
                                <div className='col-xs-2 cell-currency'>
                                    {item.currency}
                                </div>
                                <div className='col-xs-2 cell-unitprice'></div>
                                <div className='col-xs-2 text-right cell-value'>
                                    {item.availBalVal}
                                </div>
                                <div className='col-xs-3 cell-valuationdate'></div>
                            </div>
                        </div>
                    </div> 
                }
            </div> 
            )
        );
    }
}

export default OutstandingTradeSettlements;