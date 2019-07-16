import React from 'react';

const withDisabledOnWarning = Comp => props => {
    let disabled = true;
    if(!props.meta.warning){
        disabled = false;
    }
    
    return(
        <Comp {...props} disabled={disabled} />
    );
};

export default withDisabledOnWarning;