import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput as _renderInput, renderDropdown as _renderDropdown} from '../../../../validations/FieldRendering';
import {maxLength} from '../../../../validations/FieldValidations';
import {get} from 'lodash';
import {FIELD_NAMES, AMEND_TYPES} from '../constants';
import renderInputGroup from '../renderInputGroup';
import withDisabledOnWarning from '../withDisabledOnWarning';


// HOCs
const renderInput = renderInputGroup(_renderInput);
const renderDropdown = renderInputGroup(_renderDropdown);
const renderOtherTitle = withDisabledOnWarning(renderInput);


class PlanholderAmendNameSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        amendType: PropTypes.string,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        changeFieldValue: PropTypes.func
    };

    render(){
        const planHolderIndex = get(this.context, 'planHolderIndex') || 0;
        const content = get(this.context, 'content.amendNameSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);
        const {amendType} = this.context;
        const changeFieldValue = get(this.context, 'changeFieldValue');
        const isTrustee = amendType === AMEND_TYPES.trustee;

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title mt-0'>{content.amendName}</div>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>{get(planHolderDetails, 'name')}</div>
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
                                        if(isTrustee && value !== 'other'){
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
                                    component={isTrustee ? renderOtherTitle : renderInput}
                                    normalize={maxLength(30)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'></div> 
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
                            <div className='tlcell col-xs-6 lh-input'></div> 
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

                        {
                            amendType !== AMEND_TYPES.trustee &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6 lh-input'></div> 
                                <div className='tlcell col-xs-6'>
                                    <Field 
                                        inputLabel={get(content, 'typeOfEvidenceSeen')}
                                        className='pes-input-group'
                                        name={FIELD_NAMES.nameTypeOfEvidenceSeen}
                                        component={renderDropdown}
                                        data={content.typeOfEvidenceData}
                                        valueField='value'
                                        textField='label'
                                        placeholder={content.typeOfEvidencePlaceholder}
                                        showError
                                    />
                                </div>
                            </div>
                        }
                        
                        {
                            amendType !== AMEND_TYPES.trustee &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div> 
                                <div className='tlcell col-xs-6'>
                                    <Field 
                                        inputLabel={get(content, 'otherEvidenceType')}
                                        className='pes-input-group'
                                        name={FIELD_NAMES.nameOtherEvidenceType}
                                        component={renderInput}
                                        normalize={maxLength(30)}
                                        showError
                                    />
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default PlanholderAmendNameSection;