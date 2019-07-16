import React, {PropTypes} from 'react';
import ProductGroups from '../../../constants/ProductGroups';

import {get} from 'lodash';

class TrusteeWritteninTrust extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){
        const content = get(this.context, 'content.trusteesTab');
        const trustee = get(this.context, 'plan.planDetail.trustee');
        const productGroup = get(this.context, 'plan.productGroupType');

        let declarationOfTrust = false;
        let isShow = false;
        let isEmpty = false;
        
        if(productGroup != undefined){
            if(productGroup.toUpperCase() == ProductGroups.TIP.toUpperCase()) {
                isShow = false;
                isEmpty = false;
            }
            else {
                isShow = true;
                if(trustee == undefined) {
                    isEmpty = true;
                }
                else if(trustee.length == 0) {
                    isEmpty = true;
                }
                else {
                    isEmpty = false;
                }               
            }
            return (isShow && declarationOfTrust == false && isEmpty && <div className='tlrow row'>
                <div className='tlcell'>{content.trusteeWrittenInTrust}</div>
            </div>);
        }
        else{
            return (<div></div>);
        }
    }
}

export default TrusteeWritteninTrust;