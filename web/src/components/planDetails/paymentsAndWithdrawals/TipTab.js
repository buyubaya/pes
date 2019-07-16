import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../common/Currency';
import LinkAuthority from '../../common/LinkAuthority';
import ServicingUrls from '../../../constants/ServicingUrls';
import StringUtils from '../../../utils/StringUtils';

class TipTab extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const planId = get(this.context, 'plan.planDetail.planNumber');
        const tabContent = get(this.context, 'content.investmentAndWithdrawalsTab');
        const currentContributions = get(this.context, 'plan.planDetail.currentContributions') || [];
        const clientAuthorised = get(this.context, 'plan.clientAuthorisation');
        const totalAmount = currentContributions.reduce((acc, item) => acc += item.amount, 0);
        const productType = get(this.context, 'plan.productType');
        const validTipProduct = productType != 'Z00001' && productType != 'Z00002';

        
        return(
            <div className='pes-table-area'>  
                {
                    currentContributions && 
                    currentContributions.length > 0 &&
                    totalAmount > 0 &&
                    (<div className='pes-table-list'>
                        <div className='tlhead'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3'>{tabContent.tipPayments}</div>
                                <div className='tlcell col-xs-9'>
                                    <div className='row'>
                                        <div className='col-xs-3'>{tabContent.tipAmount}</div>
                                        <div className='col-xs-3'>{tabContent.tipFrequency}</div>
                                        <div className='col-xs-3'>{tabContent.tipPayer}</div>
                                        <div className='col-xs-3'>{tabContent.tipIndexation}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div className='tlbody'>
                            {
                                currentContributions.map((item, index) => (
                                    (item.amount > 0) &&
                                    <div className='tlrow' key={index}>
                                        <div className='tlcell col-xs-3'>{item.paymentType}</div>
                                        <div className='tlcell col-xs-9'>
                                            <div className='row'>
                                                <div className='col-xs-3'>{item.amount}</div>
                                                <div className='col-xs-3'>{item.frequency}</div>
                                                <div className='col-xs-3'>{item.payer}</div>
                                                <div className='col-xs-3'>{item.indexation}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>)
                }

                <div className='pes-table-list'>
                    <div className='tlrow empty'></div>

                    <div className='pes-text-belt'>
                        <div className='row'>
                            <div className='col-xs-4'>{tabContent.tipRegularWithdrawals}</div>
                            <div className='col-xs-4'></div>
                            <div className='col-xs-4'>
                                {
                                    validTipProduct &&
                                    <LinkAuthority 
                                        link={StringUtils.format(ServicingUrls.regularWithdrawal, planId)}
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-authority-modal'>
                                        {tabContent.tipRegularWithdrawals}
                                    </LinkAuthority>
                                    // <a className='has-icon-arrow-right color-normal icon-color-link'>{tabContent.tipRegularWithdrawals}</a>
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className='py-5 px-10'>{tabContent.tipRegularWithdrawalsMessage}</div>
                </div>
            </div>    
        );
    }
}

export default TipTab;