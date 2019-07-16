import React, { PropTypes } from 'react';

import TrusteeInformation from './trustee/TrusteeInformation';
import PlanHolderDetails from './trustee/PlanHolderDetails';
import GmfDetails from './trustee/GmfDetails';
import IpbDetails from './trustee/IpbDetails';
import TipDetails from './trustee/TipDetails';
import TrusteeWritteninTrust from './trustee/TrusteeWritteninTrust';

class TrusteesTab extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        return (<div className='pes-table-area'>
            <div className='pes-table-list'>
                <div className='tlbody'>
                    <TrusteeInformation />
                    {/* Bond 34, Generic Bond, Generic Pension */}
                    <PlanHolderDetails />
                    {/* Generic Mutual Fund */}
                    <GmfDetails />
                    {/* IPB */}
                    <IpbDetails />
                    {/* TIP */}
                    <TipDetails />
                    <TrusteeWritteninTrust />
                </div>
            </div>
        </div>);
    }
}

export default TrusteesTab;