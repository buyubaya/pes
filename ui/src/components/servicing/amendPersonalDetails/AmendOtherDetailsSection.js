import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput as _renderInput, renderDropdown as _renderDropdown, renderRadioGroup} from '../../../validations/FieldRendering';
import {niNumber} from '../../../validations/FieldValidations';
import {get} from 'lodash';
import {FIELD_NAMES} from './constants';
import renderInputGroup from './renderInputGroup';


// HOCs
const renderInput = renderInputGroup(_renderInput);
const renderDropdown = renderInputGroup(_renderDropdown);


class AmendOtherDetailsSection extends React.Component {
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
        const content = get(this.context, 'content.amendOtherDetailsSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);

        let isMultiPlanholders = get(this.context, 'plan.planDetail.planHolders');
        isMultiPlanholders = (isMultiPlanholders && isMultiPlanholders.length > 1) ? true : false;

        let showDetails = true;

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title'>{content.amendOtherDetails}</div>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {
                                    showDetails &&
                                    <div className='row'>
                                        <div className='col-xs-6 lh-input'>
                                            {content.sex}
                                        </div>
                                        <div className='col-xs-6 lh-input'>
                                            {planHolderDetails.sex}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'newSex')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.sex}
                                    component={renderDropdown}
                                    data={get(content, 'newSexData')}
                                    valueField='value'
                                    textField='label'
                                    placeholder={get(content, 'newSexPlaceholder')}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {
                                    showDetails &&
                                    <div className='row'>
                                        <div className='col-xs-6 lh-input'>
                                            {content.employmentStatus}
                                        </div>
                                        <div className='col-xs-6 lh-input'>
                                            {planHolderDetails.employmentStatus}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'newEmploymentStatus')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.employmentStatus}
                                    component={renderDropdown}
                                    data={get(content, 'newEmploymentStatusData')}
                                    valueField='value'
                                    textField='label'
                                    placeholder={get(content, 'newEmploymentStatusPlaceholder')}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {
                                    showDetails &&
                                    <div className='row'>
                                        <div className='col-xs-6 lh-input'>
                                            {content.occupation}
                                        </div>
                                        <div className='col-xs-6 lh-input'>
                                            {planHolderDetails.occupation}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'newOccupation')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.occupation}
                                    component={renderInput}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {
                                    showDetails &&
                                    <div className='row'>
                                        <div className='col-xs-6 lh-input'>
                                            {content.nationalInsuranceNumber}
                                        </div>
                                        <div className='col-xs-6 lh-input'>
                                            {planHolderDetails.niNumber}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'newNationalInsuranceNumber')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.niNumber}
                                    component={renderInput}
                                    validate={[niNumber]}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {
                                    showDetails &&
                                    <div className='row'>
                                        <div className='col-xs-6 lh-input'>
                                            {content.nationality}
                                        </div>
                                        <div className='col-xs-6 lh-input'>
                                            {planHolderDetails.nationality}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'newNationality')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.nationality}
                                    component={renderDropdown}
                                    data={content.nationalityData}
                                    valueField='value'
                                    textField='label'
                                    placeholder={content.nationalityPlaceholder}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {get(content, 'ukResidency')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    className='pes-radio-group group-inline'
                                    name={FIELD_NAMES.ukResidency}
                                    component={renderRadioGroup}
                                    data={[
                                        {value: true, label: 'Yes'},
                                        {value: false, label: 'No'}
                                    ]}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {get(content, 'ordinarilyResident')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'ordinarilyResident')}
                                    className='pes-radio-group group-inline'
                                    name={FIELD_NAMES.ordinarilyResident}
                                    component={renderRadioGroup}
                                    data={[
                                        {value: true, label: 'Yes'},
                                        {value: false, label: 'No'}
                                    ]}
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

export default AmendOtherDetailsSection;