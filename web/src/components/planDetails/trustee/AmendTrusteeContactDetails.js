import React, {PropTypes} from 'react';

import ProductGroups from '../../../constants/ProductGroups';
import LinkAuthority from '../../common/LinkAuthority';

import StringUtils from '../../../utils/StringUtils';
import ServicingUrls from '../../../constants/ServicingUrls';
import SecurityUtils from '../../../utils/SecurityUtils';

import {get} from 'lodash';

class AmendTrusteeContactDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        let isUserBelongServicing = SecurityUtils.isServicingRole();
        const content = get(this.context, 'content.trusteesTab');
        const productGroup = get(this.context, 'plan.productGroupType');
        let clientAuthorised = get(this.context, 'plan.clientAuthorised');        
        let isTrusteeClient = get(this.context, 'plan.clientTypeTrustee');

        let validTipProduct = get(this.context, 'plan.validTipProduct');

        const planNumber = get(this.context, 'plan.planDetail.planNumber');   
        let amendTrusteeContactDetailUrl = StringUtils.format(ServicingUrls.amendTrustee, planNumber);

        if(productGroup == ProductGroups.TIP){
            //getTrusteeContactDetails ???
            return (<div className='tlcell col-xs-4 text-capitalize text-bold'>
                <a href={amendTrusteeContactDetailUrl} className='has-icon-arrow-right text-capitalize'>
                    {content.amendTrusteeContactDetails}
                </a>
            </div>);
        }
        else if(productGroup == ProductGroups.GMF){                
            //navigate to serviceTrusteeDetails ???
            return (isTrusteeClient && isUserBelongServicing ? <div className='tlcell col-xs-4'>
                <a href={amendTrusteeContactDetailUrl} className='has-icon-arrow-right text-capitalize'>
                    {content.amendTrusteeContactDetails}
                </a>
            </div> : <div></div>);
        }
        else if(productGroup == ProductGroups.TAI){            
            //getTrusteeContactDetails ???
            //Not use anymore any place
            return (validTipProduct ? <div className='tlcell col-xs-4 text-capitalize'>
                        <LinkAuthority 
                            link={amendTrusteeContactDetailUrl} 
                            authority={clientAuthorised}
                            btnClassName='has-icon-arrow-right'
                            modalClassName='pes-modal pes-authority-modal'>
                            {content.amendTrusteeContactDetails}
                        </LinkAuthority>
                    </div> : <div></div>);
        }
        else{
            return(<div></div>);
        }
    }
}

export default AmendTrusteeContactDetails;