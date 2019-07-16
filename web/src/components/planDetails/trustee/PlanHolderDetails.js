import React, {PropTypes} from 'react';
import ProductGroups from '../../../constants/ProductGroups';

import {get} from 'lodash';

import CorrespondenceAddress from './CorrespondenceAddress';

class PlanHolderDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const content = get(this.context, 'content.trusteesTab');
        const trustee = get(this.context, 'plan.planDetail.trustee');
        const planHolder = get(this.context, 'plan.planDetail.planHolders');
        const productGroup = get(this.context, 'plan.productGroupType');

        const declarationOfTrust = false;

        return ((productGroup == ProductGroups.B34 || 
            productGroup == ProductGroups.GB || 
            productGroup == ProductGroups.GP ||
            productGroup == ProductGroups.TAI) && trustee != undefined && trustee.length > 0 && declarationOfTrust == false ? <div>
            {
                planHolder.map((item, index) => {
                    return (<div key={index}>
                                <div className='tlrow row'>
                                <div className='tlcell col-xs-4 text-capitalize'>{content.trusteeName}</div>
                                <div className='tlcell col-xs-4'><span>{item.name}</span></div>
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

export default PlanHolderDetails;