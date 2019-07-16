import React, { PropTypes } from 'react';
import {get} from 'lodash';

import LinkAuthority from '../../common/LinkAuthority';
import Currency from '../../common/Currency';

import StringUtils from '../../../utils/StringUtils';
import ServicingUrls from '../../../constants/ServicingUrls';
import SecurityUtils from '../../../utils/SecurityUtils';

class GmfIsaTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    displayNoTax = function(tabContent){
        return (
            <div className='pes-table-area'>
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-11'>{tabContent.mfisaNoTax}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    displayTaxYear = function(tabContent, investmentAndWithdrawls){
        return (investmentAndWithdrawls && investmentAndWithdrawls.length > 0  && <div className='pes-table-list pes-summary-table'>
            <div className='tlhead'>
                <div className='tlrow'>
                    <div className='tlcell col-xs-3'>{tabContent.mfisaTaxYear}</div>
                    <div className='tlcell col-xs-9'>
                        <div className='row'>
                            <div className='col-xs-3 text-right cell-totalpayment'>{tabContent.mfTotalPayments}</div>
                            <div className='col-xs-3 text-right cell-totalwithdrawals'>{tabContent.mfTotalWithdrawals}</div>                               
                        </div>
                    </div>
                </div>
            </div>
            <div className='tlbody'>
                {      
                    investmentAndWithdrawls.map((item, index) =>
                    (
                        <div className='tlrow' key={index}>
                                <div className='tlcell col-xs-3'>
                                    {item.taxYear}
                                </div>
                                <div className='tlcell col-xs-9'>
                                    <div className='row'>
                                        <div className='col-xs-3 text-right cell-contribution'>                                                                
                                            <Currency digits={2}>{item.contribution}</Currency>
                                        </div>
                                        <div className='col-xs-3 text-right cell-withdrawals'>                                                                
                                            <Currency digits={2}>{item.withdrawals}</Currency>
                                        </div>                                              
                                    </div>
                                </div>
                            </div>
                        )
                    )                                    
                }
                </div>
        </div>);
    }

    displayTaxPreviousYear = function(tabContent, previousInvestmentAndWithdrawls, totalContribution, totalwithdrawals, currentAmountInvested){
        return (previousInvestmentAndWithdrawls && /*previousInvestmentAndWithdrawls.length > 0  &&*/
            <div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3'>
                                {tabContent.mfisaPreviousTaxYears}
                            </div>
                            <div className='tlcell col-xs-9'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-totalpayment'>{tabContent.mfTotalPayments}</div>
                                    <div className='col-xs-3 text-right cell-totalwithdrawals'>{tabContent.mfTotalWithdrawals}</div>                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>                                    
                        <div className='tlrow'>                                                
                            <div className='tlcell col-xs-3'>
                                {previousInvestmentAndWithdrawls.taxYear}                                                    
                            </div>                                                                                            
                            <div className='tlcell col-xs-9'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-contribution'>                                                            
                                        <Currency digits={2}>{previousInvestmentAndWithdrawls.contribution}</Currency>
                                    </div>
                                    <div className='col-xs-3 text-right cell-withdrawals'>                                                            
                                        <Currency digits={2}>{previousInvestmentAndWithdrawls.withdrawals}</Currency>
                                    </div>                 
                                </div>
                            </div>
                        </div>
                        <div className='tlrow empty' />  
                        <div className='tlrow'>                                                
                            <div className='tlcell col-xs-3'>
                                {tabContent.mfisaTotals}
                            </div>                                                                                            
                            <div className='tlcell col-xs-9'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-contribution'>
                                        <Currency digits={2}>{totalContribution}</Currency>
                                    </div>
                                    <div className='col-xs-3 text-right cell-withdrawals'>                                                            
                                        <Currency digits={2}>{totalwithdrawals}</Currency>
                                    </div>                 
                                </div>
                            </div>
                        </div>
                        <div className='tlrow empty' />     
                        <div className='tlrow'>                                                
                            <div className='tlcell col-xs-3'>
                                {tabContent.mfisaCurrentAmountInvested}
                            </div>                                                                                            
                            <div className='tlcell col-xs-9'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-contribution'>
                                        <Currency digits={2}>{currentAmountInvested}</Currency>
                                    </div>
                                    <div className='col-xs-3 text-right cell-withdrawals'>
                                    </div>                 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>);
    }

    displayServicingFunction = function(tabContent, clientAuthorised, isServicingRole, redirectRegularContributionUrl, regularWithdrawalUrl, incomePaymentUrl){
        return (<div>
            <p className='pes-text-belt'>
                {
                    clientAuthorised ?
                    tabContent.mfLinksTitle : tabContent.mfLinksTitleHasAuthorize
                }
            </p>
    
            <div className='pes-table-list'>
                <div className='tlbody'>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            {isServicingRole && 
                                <LinkAuthority 
                                    link={redirectRegularContributionUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {tabContent.mfRedirectRegularContribution}
                                </LinkAuthority>
                            }
                        </div>
                    </div>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            {isServicingRole && 
                                <LinkAuthority 
                                    link={regularWithdrawalUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {tabContent.mfRegularWithdrawal}
                                </LinkAuthority>
                            }
                        </div>
                    </div>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            {isServicingRole && 
                                <LinkAuthority 
                                    link={incomePaymentUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {tabContent.mfIncomePayments}
                                </LinkAuthority>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
        
    render(){        
        const tabContent = get(this.context, 'content.investmentAndWithdrawalsTab');
        const totalContribution = get(this.context, 'plan.planDetail.totalContribution');
        let investmentAndWithdrawls = get(this.context, 'plan.planDetail.investmentAndWithdrawls');
        //investmentAndWithdrawls = undefined;
        let previousInvestmentAndWithdrawls = get(this.context, 'plan.planDetail.previousInvestmentAndWithdrawls');
        //previousInvestmentAndWithdrawls = undefined;
        const clientAuthorised = get(this.context, 'plan.clientAuthorised');
        let isServicingRole = SecurityUtils.isServicingRole();
        let totalwithdrawals = get(this.context, 'plan.planDetail.totalWithdrawals');
        let currentAmountInvested = get(this.context, 'plan.planDetail.currentAmountInvested');
        
        const planNumber = get(this.context, 'plan.planDetail.planNumber');

        let redirectRegularContributionUrl = StringUtils.format(ServicingUrls.redirectContribution, planNumber);
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let incomePaymentUrl = StringUtils.format(ServicingUrls.incomePayment, planNumber);

        return(<div className='pes-table-area'>
                    <div className='pes-table-list'>                   
                        <div className='pes-table-area'>
                            {this.displayTaxYear(tabContent, investmentAndWithdrawls)}
                            {this.displayTaxPreviousYear(tabContent, previousInvestmentAndWithdrawls, totalContribution, totalwithdrawals, currentAmountInvested)}
                            {
                                (investmentAndWithdrawls == undefined || (investmentAndWithdrawls && investmentAndWithdrawls.length == 0)) && 
                                (previousInvestmentAndWithdrawls == undefined || (previousInvestmentAndWithdrawls && previousInvestmentAndWithdrawls.length == 0)) && 
                                this.displayNoTax(tabContent)
                            }
                            {this.displayServicingFunction(tabContent, clientAuthorised, isServicingRole, redirectRegularContributionUrl, regularWithdrawalUrl, incomePaymentUrl)}
                        </div>
                    </div>
                </div>       
        );
    }   
}

export default GmfIsaTab;