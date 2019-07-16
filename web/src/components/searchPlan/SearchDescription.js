import React from 'react';
import ProductGroups from '../../constants/ProductGroups';

const displaySIPPMessage = function(plans) {
    let isdisplaySIPMessage = false;
    for(let i = 0; i < plans.plans.length; i++) {
        let plan = plans.plans[i];
        if(plan.productGroup != undefined){
            if(plan.productGroup.toUpperCase() != ProductGroups.SIP) {
                if(plan.productGroup.toUpperCase() == ProductGroups.TAI){
                    isdisplaySIPMessage = true;
                }
            }
        }
    }
    if(isdisplaySIPMessage){
        return <p>To obtain wider SIPP Asset valuations and plan details, please enter the SIPP policy number with a prefix of ZP/ZU</p>;
    }
};

const SearchDescription = (plans) => (
    <div className='pes-search-description-area'>
        <p>Here are the valuation details for the plans you requested. Please click on 'Details' for more information about each specific plan.</p>
        <p>Please click on 'Plan statement' to view/print a statement for each planholder.</p>
        <p>Current values are based on the prices at the close of business on the date(s) shown on the summary screen and plan statement.</p>
        {displaySIPPMessage(plans)}
    </div>
);

export default SearchDescription;