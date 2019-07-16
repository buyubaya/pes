import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput} from '../../../validations/FieldRendering';
import {get} from 'lodash';
import {AMEND_TYPES} from './constants';

import PlanholderApplyAllChangesSection from './planholder/PlanholderApplyAllChangesSection';
import OrganisationApplyAllChangesSection from './organisation/OrganisationApplyAllChangesSection';

class ApplyAllChangesSection extends React.Component {
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
            return <OrganisationApplyAllChangesSection />;
        }
        
        return <PlanholderApplyAllChangesSection />;
    }
} 

export default ApplyAllChangesSection;