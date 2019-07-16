import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../../common/Currency';

// FUNDS PROPTYPES
const _propTypes = {
    funds: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        noOfUnits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        currency: PropTypes.string,
        unitPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        valuationDate: PropTypes.string
    }))
};

// FUNDS TABLE LIST BODY
const FundsTLBody = ({funds}) => (
    (funds && funds.length > 0)
    ?
    (
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
                                    {Number(item.noOfUnits).toFixed(2)}
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
    )
    :
    null
);
FundsTLBody.propTypes =  _propTypes;

class PensionFundSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const nonProtectedFunds = get(this.context, 'plan.planDetail.nonProtectedFunds');
        const protectedFunds = get(this.context, 'plan.planDetail.protectedFunds');

        return(
            ((nonProtectedFunds && nonProtectedFunds.length > 0) ||
            (protectedFunds && protectedFunds.length > 0)) 
            ?
            (
                ((nonProtectedFunds && nonProtectedFunds.length === 0) || (protectedFunds && protectedFunds.length === 0))
                ?
                <div className='pes-table-area'>
                    <div className='pes-table-list pes-summary-table'>
                        <div className='tlhead'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 cell-fundname'>
                                    {tabContent.funds}
                                </div>
                                <div className='tlcell col-xs-9 cell-funddetails'>
                                    <div className='row'>
                                        <div className='col-xs-3 text-right cell-units'>
                                            {tabContent.units}
                                        </div>
                                        <div className='col-xs-2 text-right cell-unitprice'>
                                            {tabContent.unitPrice}
                                        </div>
                                        <div className='col-xs-2 text-right cell-value'>
                                            {tabContent.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FundsTLBody funds={nonProtectedFunds} />
                        <FundsTLBody funds={protectedFunds} />
                    </div>
                </div>
                :
                <div className='pes-table-area'>
                    {
                        nonProtectedFunds &&
                        <div className='pes-table-list pes-summary-table'>
                            <div className='tlhead'>
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-3 cell-fundname'>
                                        {tabContent.nonProtectedRights}
                                    </div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 text-right cell-units'>
                                                {tabContent.units}
                                            </div>
                                            <div className='col-xs-2 text-right cell-unitprice'>
                                                {tabContent.unitPrice}
                                            </div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                {tabContent.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <FundsTLBody funds={nonProtectedFunds} />
                        </div>
                    } 
                    {
                        protectedFunds &&
                        <div className='pes-table-list pes-summary-table'>
                            <div className='tlhead'>
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-3 cell-fundname'>
                                        {tabContent.formerProtectedRights}
                                    </div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 text-right cell-units'>
                                                {tabContent.units}
                                            </div>
                                            <div className='col-xs-2 text-right cell-unitprice'>
                                                {tabContent.unitPrice}
                                            </div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                {tabContent.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <FundsTLBody funds={protectedFunds} />
                        </div>
                    }
                </div>
            )
            :
            null
        );
    }
}

export default PensionFundSummary;