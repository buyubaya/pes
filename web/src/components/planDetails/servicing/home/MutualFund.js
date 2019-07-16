import React, {PropTypes} from 'react';

import ProductGroups from '../../../../constants/ProductGroups';
import EnvironmentUtils from '../../../../utils/EnvironmentUtils';

import LinkAuthority from '../../../common/LinkAuthority';

import StringUtils from '../../../../utils/StringUtils';
import ServicingUrls from '../../../../constants/ServicingUrls';
import TabIDs from '../../../../constants/PlanDetailTabs';

import {get} from 'lodash';
import SecurityUtils from '../../../../utils/SecurityUtils';
import UrlUtils from '../../../../utils/UrlUtils';
class MutualFund extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){ 
        const content = get(this.context, 'content.servicingTab');
        const productGroup = get(this.context, 'plan.productGroupType');
        const productVariantName = get(this.context, 'plan.planDetail.productVariantName');
        let clientAuthorised = get(this.context, 'plan.clientAuthorised');
        let isServicingRole = SecurityUtils.isServicingRole();
        
        let clientTypeOrganisation = get(this.context, 'plan.clientTypeOrganisation');
        let clientTypePersonal = get(this.context, 'plan.clientTypePersonal');
        let clientTypeTrustee = get(this.context, 'plan.clientTypeTrustee');

        if(productGroup == undefined){
            return (<div></div>);
        }

        const planNumber = get(this.context, 'plan.planDetail.planNumber');        
        
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let amendOrganisationDetailUrl = StringUtils.format(ServicingUrls.amendOrganisation, planNumber);
        let planholderUrl = StringUtils.format(ServicingUrls.planDetails, planNumber, '#' + TabIDs.planholder);
        // let amendPlanHolderDetail = StringUtils.format(ServicingUrls.amendPlanholder, planNumber);
        let amendTrusteeContactDetailUrl = StringUtils.format(ServicingUrls.amendTrustee, planNumber);
        let incomePaymentUrl = StringUtils.format(ServicingUrls.incomePayment ,planNumber);
        let surrenderUrl = StringUtils.format(ServicingUrls.surrender, planNumber);
        let switchFundUrl = StringUtils.format(ServicingUrls.switchFund, planNumber);
        let redirectRegularContributionUrl = StringUtils.format(ServicingUrls.redirectContribution, planNumber);
        let servicingUrl = ServicingUrls.servicing;

        let environment = EnvironmentUtils.get('environment');
        let pdf = environment.directDebitFormPDF;
        amendOrganisationDetailUrl = UrlUtils.getActualLink(amendOrganisationDetailUrl);
        planholderUrl = UrlUtils.getActualLink(planholderUrl);
        amendTrusteeContactDetailUrl = UrlUtils.getActualLink(amendTrusteeContactDetailUrl);
        return (isServicingRole ? productGroup.toUpperCase() == ProductGroups.GMF.toUpperCase() &&
            <div>
                <p className='pes-text-belt'>{content.servicingfunctions}</p>
                <div className='pes-table-list mb-20'>
                    <div className='tlbody'>
                        {
                            clientTypeOrganisation == true && 
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12'>
                                    <a href={amendOrganisationDetailUrl} className='has-icon-arrow-right text-capitalize'>{content.amendOrganisationDetails}</a>
                                </div>
                            </div>  
                        }
                        {
                            clientTypeOrganisation == false && clientTypePersonal == true && 
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12'>
                                    <a href={planholderUrl} className='has-icon-arrow-right text-capitalize'>{content.amendPlanHolderDetails}</a>
                                    {/* <a href={amendPlanHolderDetail} className='has-icon-arrow-right text-capitalize'>{content.amendPlanHolderDetails}</a> */}
                                </div>
                            </div>
                        }
                        {
                            clientTypeOrganisation == false && clientTypeTrustee == true && 
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12'>
                                    <a href={amendTrusteeContactDetailUrl} className='has-icon-arrow-right text-capitalize'>{content.mfAmendTrusteeContactDetails}</a>
                                </div>
                            </div>
                        }
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12'>
                                <LinkAuthority 
                                    link={incomePaymentUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {content.incomePayments}
                                </LinkAuthority>
                            </div>
                        </div>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12'>
                                <a href={pdf} target='_blank' type='application/pdf' name='Direct Debit Form'  title='Direct Debit Form' className='has-icon-arrow-right text-capitalize'>{content.printDirectDebitForm}</a>
                            </div>
                        </div>

                        {productVariantName != undefined && productVariantName.toUpperCase() != 'CASH ISA' && productVariantName.toUpperCase() != 'TESSA ONLY ISA' &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12'>
                                    <LinkAuthority 
                                        link={redirectRegularContributionUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right text-capitalize'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.redirectRegularContribution}
                                    </LinkAuthority>
                                </div>
                            </div>
                        }

                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12'>
                                <LinkAuthority 
                                    link={regularWithdrawalUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right text-capitalize'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {content.regularWithdrawal}
                                </LinkAuthority>
                            </div>
                        </div>

                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12'>
                                <LinkAuthority 
                                    link={surrenderUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right text-capitalize'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {content.surrender}
                                </LinkAuthority>
                            </div>
                        </div>
                        
                        {productVariantName != undefined && productVariantName.toUpperCase() != 'CASH ISA' && productVariantName.toUpperCase() != 'TESSA ONLY ISA' &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12'>
                                    <LinkAuthority 
                                        link={switchFundUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right text-capitalize'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.switchFund}
                                    </LinkAuthority>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div> : productGroup.toUpperCase() == ProductGroups.GMF.toUpperCase() &&
            <div className='pes-table-list'>
                <div className='tlbody'>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            Please upgrade for <a href={servicingUrl}>Servicing</a>.
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default MutualFund;