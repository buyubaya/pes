import React, {PropTypes} from 'react';
import ProductGroups from '../../../constants/ProductGroups';

import {get} from 'lodash';

import AmendTrusteeContactDetails from './AmendTrusteeContactDetails';
import CorrespondenceAddress from './CorrespondenceAddress';

class IpbDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const content = get(this.context, 'content.trusteesTab');
        const trustee = get(this.context, 'plan.planDetail.trustee');
        const productGroup = get(this.context, 'plan.productGroupType');

        const declarationOfTrust = false;

        return ((productGroup == ProductGroups.IPB) && trustee != undefined && declarationOfTrust == false ? <div>
            <div>
                {
                    trustee.type && <div className='tlrow row'>
                        <div className='tlcell col-xs-4 text-capitalize'>{content.trusteeType}</div>
                        <div className='tlcell col-xs-4'><span>{trustee.type}</span></div>
                        <AmendTrusteeContactDetails />
                    </div>
                }
            </div>
            {
                trustee.trustees.map((item, index) => {
                    return (<div key={index}>
                            {
                                item.name && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4 text-capitalize'>{content.trusteeName}</div>
                                    <div className='tlcell col-xs-4'>{item.name}</div>
                                </div>
                            }
                            {
                                item.organizationName && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4 text-capitalize'>{content.organizationName}</div>
                                    <div className='tlcell col-xs-4'>{item.organizationName}</div>
                                </div>
                            }
                            {
                                item.contactName && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4 text-capitalize'>{content.contactName}</div>
                                    <div className='tlcell col-xs-4'>{item.contactName}</div>
                                </div>
                            }
                            {
                                item.address && item.address.addressLine1 && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4 text-capitalize'>{content.correspondenceAddress}</div>
                                    <div className='tlcell col-xs-4'>{item.address.addressLine1}</div>
                                </div>
                            }
                            {
                                item.address && item.address.addressLine2 && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'></div>
                                    <div className='tlcell col-xs-4'>{item.address.addressLine2}</div>
                                </div>
                            }
                            {
                                item.address && item.address.addressLine3 && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'></div>
                                    <div className='tlcell col-xs-4'>{item.address.addressLine3}</div>
                                </div>
                            }
                            {
                                item.address && item.address.addressLine4 && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'></div>
                                    <div className='tlcell col-xs-4'>{item.address.addressLine4}</div>
                                </div>
                            }
                            {
                                item.address && item.address.postCode && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'></div>
                                    <div className='tlcell col-xs-4'>{item.address.postCode}</div>
                                </div>
                            }
                            {
                                item.address && item.address.country && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'></div>
                                    <div className='tlcell col-xs-4'>{item.address.country}</div>
                                </div>
                            }
                            {
                                item.telephoneNumber && <div className='tlrow row'>
                                    <div className='tlcell col-xs-4'>{content.telephoneNumber}</div>
                                    <div className='tlcell col-xs-4'>{item.telephoneNumber}</div>
                                </div>
                            }
                            <div className='tlrow empty'></div>
                        </div>
                    );
                })
            }
        </div> : <div></div>);
    }
}

export default IpbDetails;