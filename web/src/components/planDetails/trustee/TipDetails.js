import React, {PropTypes} from 'react';

import {UserGroups} from '../../../constants/UserGroups';
import ProductGroups from '../../../constants/ProductGroups';

import AmendTrusteeContactDetails from './AmendTrusteeContactDetails';
import CorrespondenceAddress from './CorrespondenceAddress';

import {get} from 'lodash';

class TipDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const content = get(this.context, 'content.trusteesTab');
        const planHolder = get(this.context, 'plan.planDetail.planHolders');
        const productGroup = get(this.context, 'plan.productGroupType');

        const declarationOfTrust = false;

        return ((productGroup != undefined && productGroup.toUpperCase() == ProductGroups.TIP.toUpperCase()) && 
            planHolder != undefined && planHolder.length > 0 && declarationOfTrust == false ? <div>
            {
                planHolder.slice(0,1).map((item, index) => {
                    return (<div key={index}>
                                <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize text-bold'>{content.trusteeName}</div>
                                <div className='tlcell col-xs-4 text-bold'><span>{item.name}</span></div>
                                <AmendTrusteeContactDetails />
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

export default TipDetails;