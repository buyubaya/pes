import React, { PropTypes } from 'react';
import { get } from 'lodash';
import Currency from '../../common/Currency';
import LinkAuthority from '../../common/LinkAuthority';

import StringUtils from '../../../utils/StringUtils';
import ServicingUrls from '../../../constants/ServicingUrls';
import SecurityUtils from '../../../utils/SecurityUtils';

class GmfIaTab extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){
        const content = get(this.context, 'content.investmentAndWithdrawalsTab');
        const planDetail = get(this.context, 'plan.planDetail');
        let isServicingRole = SecurityUtils.isServicingRole();
        const clientAuthorised = get(this.context, 'plan.clientAuthorised');

        const planNumber = get(this.context, 'plan.planDetail.planNumber');    

        let redirectRegularContributionUrl = StringUtils.format(ServicingUrls.redirectContribution, planNumber);
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let incomePaymentUrl = StringUtils.format(ServicingUrls.incomePayment ,planNumber);
        
        return (
            <div className='pes-investment-mf'>
                <div className='pes-table-area'>
                    <div className='pes-table-list'>
                        { 
                        planDetail.totalContribution ?
                        (<div className='tlbody'>
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{content.mfTotalPayments}</div>
                                <div className='tlcell col-xs-8'>
                                    <Currency>{planDetail.totalContribution}</Currency>
                                </div>
                            </div>
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{content.mfTotalWithdrawals}</div>
                                <div className='tlcell col-xs-8'>
                                    <Currency>{planDetail.totalWithdrawals}</Currency>
                                </div>
                            </div>
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{content.mfiaCurrentAmountInvested}</div>
                                <div className='tlcell col-xs-8'>
                                    <Currency>{planDetail.currentAmountInvested}</Currency>
                                </div>
                            </div>
                        </div>) : (
                            <div className='tlbody'>
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-11'>{content.mfisaNoTax}</div>
                            </div>
                        </div>)
                        }
                    </div>
                </div>

                <p className='pes-text-belt'>{(clientAuthorised && content.mfLinksTitleHasAuthorize) || content.mfLinksTitle}</p>
                <div className='pes-table-area'>
                    <div className='pes-table-list'>
                        <div className='tlbody'>
                            <div className='tlrow row'>
                            {
                                isServicingRole &&
                                <div className='tlcell col-xs-12' key={0}>
                                    <LinkAuthority 
                                        link={redirectRegularContributionUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.mfRedirectRegularContribution}
                                    </LinkAuthority>
                                </div>
                            }
                            </div>
                            <div className='tlrow row'>
                            {
                                isServicingRole &&
                                <div className='tlcell col-xs-12' key={0}>
                                    <LinkAuthority 
                                        link={regularWithdrawalUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.mfRegularWithdrawal}
                                    </LinkAuthority>
                                </div>
                            }
                            </div>
                            <div className='tlrow row'>
                            {
                                isServicingRole &&
                                <div className='tlcell col-xs-12' key={0}>
                                    <LinkAuthority 
                                        link={incomePaymentUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.mfIncomePayments}
                                    </LinkAuthority>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GmfIaTab;