import React, {PropTypes} from 'react';

import ProductGroups from '../../../../constants/ProductGroups';
import LinkAuthority from '../../../common/LinkAuthority';

import StringUtils from '../../../../utils/StringUtils';
import ServicingUrls from '../../../../constants/ServicingUrls';

import {get} from 'lodash';
import SecurityUtils from '../../../../utils/SecurityUtils';
import UrlUtils from '../../../../utils/UrlUtils';
class Tip extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){ 
        const content = get(this.context, 'content.servicingTab');
        let clientAuthorised = get(this.context, 'plan.clientAuthorisation');
        let isServicingRole = SecurityUtils.isServicingRole();
        let validTipProduct = get(this.context, 'plan.validTipProduct');
        const productGroup = get(this.context, 'plan.productGroupType');
        const productType = get(this.context, 'plan.productType');

        if(productGroup == undefined){
            return (<div></div>);
        }

        const planNumber = get(this.context, 'plan.planDetail.planNumber');        
        
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let amendTrusteeContactDetailUrl = StringUtils.format(ServicingUrls.amendTrustee, planNumber);
        let surrenderUrl = StringUtils.format(ServicingUrls.surrender, planNumber);
        let switchFundUrl = StringUtils.format(ServicingUrls.switchFund ,planNumber);

        validTipProduct = true;
        amendTrusteeContactDetailUrl = UrlUtils.getActualLink(amendTrusteeContactDetailUrl);
        return (productGroup.toUpperCase() == ProductGroups.TIP.toUpperCase() && validTipProduct == true &&
            <div>
                <p className='pes-text-belt'>{content.servicingfunctions}</p>
                <div className='pes-table-list mb-20'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12'>
                                <a href={amendTrusteeContactDetailUrl} className='has-icon-arrow-right text-capitalize'>{content.amendTrusteeContactDetails}</a>
                            </div>
                        </div>

                        {
                            productType != 'Z00001' && productType != 'Z00002' &&
                            <div>
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
                                        {
                                            clientAuthorised
                                            ?
                                            <LinkAuthority 
                                                link={switchFundUrl} 
                                                authority={clientAuthorised}
                                                btnClassName='has-icon-arrow-right text-capitalize'
                                                modalClassName='pes-modal pes-authority-modal'>
                                                {content.switchZPFunds}
                                            </LinkAuthority>
                                            :
                                            <LinkAuthority 
                                                link={surrenderUrl} 
                                                authority={clientAuthorised}
                                                btnClassName='has-icon-arrow-right text-capitalize'
                                                modalClassName='pes-modal pes-authority-modal'>
                                                {content.surrenders}
                                            </LinkAuthority>
                                        }
                                    </div>
                                </div>
                                <div className='tlrow row'>
                                    <div className='tlcell col-xs-12'>
                                        {
                                            clientAuthorised
                                            ?
                                            <LinkAuthority 
                                                link={surrenderUrl} 
                                                authority={clientAuthorised}
                                                btnClassName='has-icon-arrow-right text-capitalize'
                                                modalClassName='pes-modal pes-authority-modal'>
                                                {content.surrenders}
                                            </LinkAuthority>
                                            :
                                            <LinkAuthority 
                                                link={switchFundUrl} 
                                                authority={clientAuthorised}
                                                btnClassName='has-icon-arrow-right text-capitalize'
                                                modalClassName='pes-modal pes-authority-modal'>
                                                {content.switchFunds}
                                            </LinkAuthority>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>);
    }
}

export default Tip;