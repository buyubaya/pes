import React, {PropTypes} from 'react';
import ProductGroups from '../../../constants/ProductGroups';

import {get} from 'lodash';

class TrusteeInformation extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){
        const content = get(this.context, 'content.trusteesTab');
        const productGroup = get(this.context, 'plan.productGroupType');

        let declarationOfTrust = false;
        let isShow = false;

        if(productGroup != undefined){
            if(productGroup.toUpperCase() == ProductGroups.TIP.toUpperCase()) {
                isShow = false;
            }
            else{
                isShow = true;
            }
            return (isShow && declarationOfTrust && <div className='tlrow row'>
                <div className='tlcell'>{content.trusteeInformation}</div>
            </div>);
        }
        else{
            return (<div></div>);
        }
    }
}

export default TrusteeInformation;