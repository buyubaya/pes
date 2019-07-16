import React, {PropTypes} from 'react';
import {get} from 'lodash';
import * as ContentTypes from '../../../constants/ContentTypes';
import ProductGroups from '../../../constants/ProductGroups';

import IpbFundSummary from './fundSummary/Ipb';
import Bond34FundSummary from './fundSummary/B34';
import PensionFundSummary from './fundSummary/Gp';
import GbFundSummary from './fundSummary/Gb';
import GmfFundSummary from './fundSummary/Gmf';
import TipFundSummary from './fundSummary/Tip';

// FUND SUMMARY
class FundSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const productGroupType = get(this.context, 'plan.productGroupType');

        return(
            <div className='funds-summary-area'>
                {
                    productGroupType === ProductGroups.IPB &&
                    <IpbFundSummary />
                }
                {
                    productGroupType === ProductGroups.B34 &&
                    <Bond34FundSummary />
                }
                {
                    (productGroupType === ProductGroups.GP || productGroupType === ProductGroups.TAI) &&
                    <PensionFundSummary />
                }
                {
                    productGroupType === ProductGroups.GB &&
                    <GbFundSummary />
                }
                {
                    productGroupType === ProductGroups.GMF &&
                    <GmfFundSummary />
                }
                {
                    (productGroupType === ProductGroups.TIP || productGroupType === ProductGroups.TIP_01) &&
                    <TipFundSummary />
                }
            </div>
        );
    }
}

export default FundSummary;