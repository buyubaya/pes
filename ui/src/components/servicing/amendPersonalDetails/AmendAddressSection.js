import React, {PropTypes} from 'react';
import {get} from 'lodash';
import TrusteeAmendAddressSection from './trustee/TrusteeAmendAddressSection';
import {AMEND_TYPES} from './constants';


class AmendAddressSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        amendType: PropTypes.string.isRequired
    };

    render(){
        return <TrusteeAmendAddressSection />;
    }
}

export default AmendAddressSection;