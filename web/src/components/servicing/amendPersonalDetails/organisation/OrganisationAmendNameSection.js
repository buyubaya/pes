import React, {PropTypes} from 'react';
import {Field, change} from 'redux-form';
import {renderInput as _renderInput, renderDropdown as _renderDropdown} from '../../../../validations/FieldRendering';
import {maxLength} from '../../../../validations/FieldValidations';
import {get} from 'lodash';
import {FIELD_NAMES, ERROR_MESSAGES} from '../constants';
import renderInputGroup from '../renderInputGroup';
import withDisabledOnWarning from '../withDisabledOnWarning';


// HOCs
const renderInput = renderInputGroup(_renderInput);
const renderDropdown = renderInputGroup(_renderDropdown);
const renderOtherTitle = withDisabledOnWarning(renderInput);
const renderEvidenceType = withDisabledOnWarning(renderInput);


class OrganisationAmendNameSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        changeFieldValue: PropTypes.func
    };

    render(){
        const planHolderIndex = get(this.context, 'planHolderIndex') || 0;
        const content = get(this.context, 'content.amendNameSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);
        const planNumber = get(this.context, 'plan.planDetail.planNumber');
        const organisationName = get(planHolderDetails, 'name');
        const organisationNumber = get(planHolderDetails, 'organisationNumber');
        const changeFieldValue = get(this.context, 'changeFieldValue');

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12 input-label text-capitalize'>
                                <span className='mr-20'>{content.planNumber}</span>
                                <span>{planNumber}</span>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 input-label text-capitalize text-bold'>
                                {content.amendName}
                            </div>
                            <div className='tlcell col-xs-6 input-label text-capitalize text-bold'>
                                <div className='col-xs-6 col-xs-offset-6 text-update'>{content.updates}</div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'title')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.title}
                                    component={renderDropdown}
                                    data={content.titleData}
                                    valueField='value'
                                    textField='label'
                                    placeholder={content.titlePlaceholder}
                                    onChange={(e, value) => {
                                        if(value !== 'other'){
                                            changeFieldValue(`name.${FIELD_NAMES.otherTitle}`, '');
                                        }
                                    }}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>     
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'otherTitle')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.otherTitle}
                                    component={renderOtherTitle}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div> 
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'forenames')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.forenames}
                                    component={renderInput}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div> 
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'surname')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.surname}
                                    component={renderInput}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow empty'></div>
                        
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 input-label text-capitalize'>
                                        {content.organisationName}
                                    </div>
                                    <div className='col-xs-6 lh-input'>
                                        {organisationName}
                                    </div>
                                </div>
                            </div> 
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'organisationName')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.organisationName}
                                    component={renderInput}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 input-label text-capitalize'>
                                        {content.organisationNumber}
                                    </div>
                                    <div className='col-xs-6 lh-input'>
                                        {organisationNumber}
                                    </div>
                                </div>
                            </div> 
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'organisationNumber')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.organisationNumber}
                                    component={renderInput}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div> 
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'typeOfEvidenceSeen')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.nameTypeOfEvidenceSeen}
                                    component={renderEvidenceType}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default OrganisationAmendNameSection;