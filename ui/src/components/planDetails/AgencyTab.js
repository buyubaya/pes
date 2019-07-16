import React, { PropTypes } from 'react';
import {get} from 'lodash';
import Address from '../../components/common/Address';
import ProductGroups from '../../constants/ProductGroups';

class AgencyTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    displayAgency(agency, tabContent){
        const productGroup = get(this.context, 'plan.productGroupType');

        return(
            agency &&
            <div className='tlbody'>                        
                        {agency.agencyNumber &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{tabContent.agencyNumber}</div>
                                <div className='tlcell col-xs-4'>{agency.agencyNumber}</div>
                            </div>
                        }
                        {agency.fsaNumber &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{tabContent.fcaAuthorisationNumber}</div>
                                <div className='tlcell col-xs-4'>{agency.fsaNumber}</div>
                            </div>
                        }        
                        {agency.firmName &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{tabContent.firmName}</div>
                                <div className='tlcell col-xs-8'>{agency.firmName}</div>
                            </div>
                        }     
                        {(agency.postCode && productGroup != ProductGroups.IPB) &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{tabContent.postCode}</div>
                                <div className='tlcell col-xs-4'>{agency.postCode}</div>
                            </div>
                        }
                        {                            
                            agency.address && <Address address={agency.address} label='Firm Address' />                     
                        }        
                        
                        {agency.telephoneNumber &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{tabContent.telephoneNumber}</div>
                                <div className='tlcell col-xs-4'>{agency.telephoneNumber}</div>
                            </div>
                        }                            
                        {agency.mobile &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{tabContent.mobile}</div>
                                <div className='tlcell col-xs-4'>{agency.mobile}</div>
                            </div>    
                        }
                        {agency.email && 
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{tabContent.email}</div>
                                <div className='tlcell col-xs-4'>{agency.email}</div>
                            </div>
                        }                            
            </div> 
        );
    }
    
    render(){
        const agency = get(this.context, 'plan.planDetail.agency');
        const tabContent = get(this.context, 'content.agencyTab');
        return(               
            <div className='pes-table-area'>
                <div className='pes-table-list'>                   
                    {
                        this.displayAgency(agency, tabContent)
                    }     
                </div>
            </div>
        );
    }   
}

export default AgencyTab;