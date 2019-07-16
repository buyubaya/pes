import React, {PropTypes} from 'react';
import ProductGroups from '../../../constants/ProductGroups';

import {get} from 'lodash';

import AmendTrusteeContactDetails from './AmendTrusteeContactDetails';
import CorrespondenceAddress from './CorrespondenceAddress';

class GmfDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const content = get(this.context, 'content.trusteesTab');
        const trustee = get(this.context, 'plan.planDetail.trustee');
        const productGroup = get(this.context, 'plan.productGroupType');

        const declarationOfTrust = false;

        return ((productGroup == ProductGroups.GMF) && trustee && declarationOfTrust == false ? <div>
            {
                trustee.map((item, index) => {
                    return (<div key={index}>
                                <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{content.trusteeName}</div>
                                <div className='tlcell col-xs-4'><span>{item.name}</span></div>
                                {index == 0 && <AmendTrusteeContactDetails />}
                            </div>
                            {item.address && <CorrespondenceAddress item={item.address} />}
                            <div className='tlrow empty'></div>
                        </div>
                    );
                })
            }
        </div> : <div></div>);
    }
}

export default GmfDetails;