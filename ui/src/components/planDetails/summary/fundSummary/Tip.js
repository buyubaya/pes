import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../../common/Currency';
import LinkAuthority from '../../../common/LinkAuthority';
import ServicingUrls from '../../../../constants/ServicingUrls';
import StringUtils from '../../../../utils/StringUtils';

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
                                    {Number(item.noOfUnits).toFixed(3)}
                                </div>
                                <div className='col-xs-2 text-right cell-unitprice'>
                                    <Currency digits={4}>{item.unitPrice}</Currency>
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
        const planId = get(this.context, 'plan.planDetail.planNumber');
        const tabContent = get(this.context, 'content.summaryTab');
        const nonProtectedFunds = get(this.context, 'plan.planDetail.nonProtectedFunds');
        const protectedFunds = get(this.context, 'plan.planDetail.protectedFunds');
        const clientAuthorised = get(this.context, 'plan.clientAuthorisation');
        const productType = get(this.context, 'plan.productType');
        const validTipProduct = productType != 'Z00001' && productType != 'Z00002';


        return(
            <div className='pes-table-area'>
                {
                    protectedFunds && 
                    protectedFunds.length > 0 &&
                    (<div className='pes-table-list pes-summary-table'>
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
                                        {
                                            validTipProduct &&
                                            [
                                                <div className='col-xs-2 text-normal cell-switchfund' key={0}>
                                                    <LinkAuthority 
                                                        link={StringUtils.format(ServicingUrls.switchFund, planId)}
                                                        label={tabContent.switchFund} 
                                                        authority={clientAuthorised} 
                                                        modalClassName='pes-modal pes-authority-modal'
                                                    />
                                                </div>
                                                ,
                                                <div className='col-xs-3 text-normal cell-surrender' key={1}>
                                                    <LinkAuthority 
                                                        link={StringUtils.format(ServicingUrls.surrender, planId)}
                                                        label={tabContent.surrenderFullPartial} 
                                                        authority={clientAuthorised} 
                                                        modalClassName='pes-modal pes-authority-modal'
                                                    />
                                                </div>
                                            ]
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FundsTLBody funds={protectedFunds} />
                    </div>)
                }
                {
                    nonProtectedFunds && 
                    nonProtectedFunds.length > 0 &&
                    (<div className='pes-table-list pes-summary-table'>
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
                                        {
                                            validTipProduct &&
                                            [
                                                <div className='col-xs-2 text-center cell-switchfund' key={0}>
                                                    <LinkAuthority 
                                                        link={StringUtils.format(ServicingUrls.switchFund, planId)}
                                                        authority={clientAuthorised}
                                                        btnClassName='has-icon-arrow-right'
                                                        modalClassName='pes-modal pes-authority-modal'>
                                                        {tabContent.switchFunds}
                                                    </LinkAuthority>
                                                </div>
                                                ,
                                                <div className='col-xs-3 text-center cell-surrender' key={1}>
                                                    <LinkAuthority 
                                                        link={StringUtils.format(ServicingUrls.surrender, planId)}
                                                        authority={clientAuthorised}
                                                        btnClassName='has-icon-arrow-right'
                                                        modalClassName='pes-modal pes-authority-modal'>
                                                        {tabContent.surrenders}
                                                    </LinkAuthority>
                                                </div>
                                            ]
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FundsTLBody funds={nonProtectedFunds} />
                    </div>)
                }
            </div>
        );
    }
}

export default PensionFundSummary;