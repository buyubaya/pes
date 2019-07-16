import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput as _renderInput, renderDatePicker as _renderDatePicker, renderDropdown as _renderDropdown} from '../../../validations/FieldRendering';
import {required, datetime, maxLength} from '../../../validations/FieldValidations';
import {get} from 'lodash';
import {FIELD_NAMES} from './constants';
import renderInputGroup from './renderInputGroup';
import StringUtils from '../../../utils/StringUtils';


// HOCs
const renderInput = renderInputGroup(_renderInput);
const renderDatePicker = renderInputGroup(_renderDatePicker);
const renderDropdown = renderInputGroup(_renderDropdown);


class AmendDateOfBirthSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    render(){
        const planHolderIndex = get(this.context, 'planHolderIndex') || 0;
        const content = get(this.context, 'content.amendDateOfBirthSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title'>{content.amendDateOfBirth}</div>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {StringUtils.formattedDate(get(planHolderDetails, 'dateofBirth'))}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'correctDateOfBirth')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.correctDateOfBirth}
                                    component={renderDatePicker}
                                    // validate={[datetime]}
                                    placeholder='dd/mm/yyyy'
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
                                    name={FIELD_NAMES.dobTypeOfEvidenceSeen}
                                    component={renderDropdown}
                                    data={content.typeOfEvidenceData}
                                    valueField='value'
                                    textField='label'
                                    placeholder={content.typeOfEvidencePlaceholder}
                                    showError
                                />
                            </div>
                        </div>


                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'otherEvidenceType')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.dobOtherEvidenceType}
                                    component={renderInput}
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

export default AmendDateOfBirthSection;