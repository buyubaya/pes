import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput, renderDropdown} from '../../../validations/FieldRendering';
import {get} from 'lodash';

import PlanholderAmendNameSection from './planholder/PlanholderAmendNameSection';
import OrganisationAmendNameSection from './organisation/OrganisationAmendNameSection';

import {AMEND_TYPES} from './constants';


class AmendNameSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        amendType: PropTypes.string.isRequired
    };

    render(){
        const {amendType} = this.context;

        if(amendType === AMEND_TYPES.organisation){
            return <OrganisationAmendNameSection />;
        }

        return <PlanholderAmendNameSection />;
    }
}

export default AmendNameSection;