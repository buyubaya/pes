import React, { PropTypes } from 'react';
import {isEmpty as _isEmpty,get} from 'lodash';

import Address from '../../components/common/Address';
import DateFormat from '../../components/common/DateFormat';
import LinkAuthority from '../../components/common/LinkAuthority';
import {UserGroups} from '../../constants/UserGroups';
import * as SessionStorage from '../../utils/SessionStorage';
import StringUtils from '../../utils/StringUtils';
import SecurityUtils from '../../utils/SecurityUtils';
import ServicingUrls from '../../constants/ServicingUrls';
import ProductGroups from '../../constants/ProductGroups';

class PlanholdersTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    showPersonalDetailsServicingLink(planHolder, index, isPersonalDetails){
        const productGroup = get(this.context, 'plan.productGroupType');
          
        if(!isPersonalDetails)
            return false;

        if(productGroup == ProductGroups.IPB)
            return false;

        if(index > 0 && (_.isEmpty(planHolder.sex) && _.isEmpty(planHolder.dateofBirth) && _.isEmpty(planHolder.niNumber)))
            return false;

        return true;
    }

    
    displayPlanHolderRow(planHolder, index) {
        const tabContent = get(this.context, 'content.planHoldersTab');
        const productGroup = get(this.context, 'plan.productGroupType');
        const isServicingRole = SecurityUtils.isServicingRole();
        const planID = get(this.context, 'plan.planDetail.planNumber');
        const clientTypeOrganisation = get(this.context, 'plan.clientTypeOrganisation');
        const clientTypePersonal = get(this.context, 'plan.clientTypePersonal');

        // Always allow To amend Personal/Org servicing
        let clientAuthorised = true;
                  
        let isPersonalDetails =  clientTypePersonal || get(this.context, 'plan.clientTypeTrustee');
        let isShowAmendUrl = (clientTypePersonal || clientTypeOrganisation);        
        let amendOrganisationDetailUrl = StringUtils.format(ServicingUrls.amendOrganisation, planID);
              
        return (
            <div className='tlbody' key={index}>
                { 
                    (!_isEmpty(planHolder.name) || !_isEmpty(planHolder.organisationName)) &&
                    <div className='tlrow row'>                   
                        <div className='tlcell col-xs-4 text-capitalize'>{isPersonalDetails ? tabContent.planHolder : tabContent.organisationName}</div>
                        <div className='tlcell col-xs-4'>
                            {
                                !_isEmpty(planHolder.name) ? planHolder.name : planHolder.organisationName                    
                            }
                        </div>
                        {
                            (isShowAmendUrl && isServicingRole) &&
                            <div className='tlcell col-xs-4'>  
                            {
                                this.showPersonalDetailsServicingLink(planHolder, index, isPersonalDetails) &&
                                <LinkAuthority 
                                    link={StringUtils.format(ServicingUrls.amendPlanholder, planID, index)} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {tabContent.amendPersonalDetails}
                                </LinkAuthority>
                            }                             
                            {
                                (!isPersonalDetails && productGroup != ProductGroups.IPB) &&
                                <LinkAuthority 
                                    link={amendOrganisationDetailUrl} 
                                    authority={clientAuthorised}
                                    btnClassName='has-icon-arrow-right'
                                    modalClassName='pes-modal pes-authority-modal'>
                                    {tabContent.amendOrganisationDetails}
                                </LinkAuthority>
                            }                                            
                            </div>
                        }
                    
                    </div>
                }
                
                {
                    planHolder.sex && 
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-4'>{tabContent.sex}</div>
                        <div className='tlcell col-xs-4'>{planHolder.sex ? planHolder.sex : ''}</div>
                    </div>
                }
                {
                    planHolder.dateofBirth && 
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-4 text-capitalize'>{tabContent.dateofbirth}</div>
                        <div className='tlcell col-xs-4'><DateFormat>{planHolder.dateofBirth}</DateFormat></div>
                    </div>
                }              
                {planHolder.niNumber &&
                     <div className='tlrow row'>
                        <div className='tlcell col-xs-4 text-capitalize'>{tabContent.niNumber}</div>
                        <div className='tlcell col-xs-4'>{planHolder.niNumber}</div>
                    </div> 
                }           
                {                     
                    planHolder.address && <Address address={planHolder.address} label='Correspondence Address' />   
                }  
                {planHolder.countryOfResidence &&
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-4 text-capitalize'>{tabContent.countryOfResidence}</div>
                        <div className='tlcell col-xs-4'>{planHolder.countryOfResidence}</div>
                    </div> 
                }                    
                {planHolder.telephoneNumber &&
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-4 text-capitalize'>{tabContent.contactTelephoneNumber}</div>
                        <div className='tlcell col-xs-4'>{planHolder.telephoneNumber}</div>
                    </div> 
                }                 
                <div className='tlrow empty' />
            </div> 
        );
    }

    render(){       
        const planHolders = get(this.context, 'plan.planDetail.planHolders');
       
        return(
            <div className='pes-table-area'>
                <div className='pes-table-list'>
                        {                            
                            (planHolders) ? 
                                planHolders.map((planHolder, index) =>{
                                    return this.displayPlanHolderRow(planHolder, index);
                                })  : null                   
                        }                      
                </div>
            </div>
        );
    }
}

export default PlanholdersTab;