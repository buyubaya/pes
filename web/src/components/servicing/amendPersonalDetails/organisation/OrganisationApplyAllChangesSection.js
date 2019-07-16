import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput} from '../../../../validations/FieldRendering';
import {get} from 'lodash';

class OrganisationApplyAllChangesSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    };

    render(){
        const content = get(this.context, 'content.applyAllChangesSection');

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title'>{content.applyAllChangesToTheFollowingPlans}</div>
                <div className='pes-table-list amend-list ovf-v apply-all-changes-area amend-organisation'>
                    <div className='tlbody'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 align-top text-area'>
                                {content.applyAllChangesMessage}
                            </div>
                            <div className='tlcell col-xs-6 inputs-area px-0'>
                                <div className='row mx-0'>
                                    {
                                        Array(5).fill(null).map((item, index) =>
                                            <div className='col-xs-6 input-field' key={index}>
                                                <Field 
                                                    className='pes-input-group'
                                                    name={`planNumber[${index}]`}
                                                    component={renderInput}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default OrganisationApplyAllChangesSection;