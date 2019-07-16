import React, {PropTypes} from 'react';

import ProductGroups from '../../../../constants/ProductGroups';

import LinkAuthority from '../../../common/LinkAuthority';

import StringUtils from '../../../../utils/StringUtils';
import ServicingUrls from '../../../../constants/ServicingUrls';
import TabIDs from '../../../../constants/PlanDetailTabs';

import {get} from 'lodash';
import SecurityUtils from '../../../../utils/SecurityUtils';
import UrlUtils from '../../../../utils/UrlUtils';
class Bond34 extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){ 
        const content = get(this.context, 'content.servicingTab');
        let clientAuthorised = get(this.context, 'plan.clientAuthorised');
        let isServicingRole = SecurityUtils.isServicingRole();
        const productGroup = get(this.context, 'plan.productGroupType');

        if(productGroup == undefined){
            return (<div></div>);
        }

        const planNumber = get(this.context, 'plan.planDetail.planNumber');        
        
        let planholderUrl = StringUtils.format(ServicingUrls.planDetails, planNumber, '#' + TabIDs.planholder);
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let distributionUrl = StringUtils.format(ServicingUrls.distribution, planNumber);
        let surrenderUrl = StringUtils.format(ServicingUrls.surrender, planNumber);
        let switchFundUrl = StringUtils.format(ServicingUrls.switchFund, planNumber);
        let servicingUrl = ServicingUrls.servicing;
        planholderUrl = UrlUtils.getActualLink(planholderUrl);
        return (isServicingRole ? productGroup.toUpperCase() == ProductGroups.B34.toUpperCase() && 
        <div>
            <p className='pes-text-belt'>{content.servicingfunctions}</p>
            <div className='pes-table-list mb-20'>
                <div className='tlbody'>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            <a href={planholderUrl} className='has-icon-arrow-right text-capitalize'>{content.amendPersonalDetails}</a>
                        </div>
                    </div>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            <LinkAuthority 
                                link={distributionUrl} 
                                authority={clientAuthorised}
                                btnClassName='has-icon-arrow-right text-capitalize'
                                modalClassName='pes-modal pes-authority-modal'>
                                {content.changeDistribution}
                            </LinkAuthority>
                        </div>
                    </div>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            <LinkAuthority 
                                link={regularWithdrawalUrl} 
                                authority={clientAuthorised}
                                btnClassName='has-icon-arrow-right text-capitalize'
                                modalClassName='pes-modal pes-authority-modal'>
                                {content.regularWithdrawals}
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
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12'>
                            <LinkAuthority 
                                link={switchFundUrl} 
                                authority={clientAuthorised}
                                btnClassName='has-icon-arrow-right text-capitalize'
                                modalClassName='pes-modal pes-authority-modal'>
                                {content.switchFunds}
                            </LinkAuthority>
                        </div>
                    </div>
                </div>
            </div>
        </div> : productGroup.toUpperCase() == ProductGroups.B34.toUpperCase() && 
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

export default Bond34;