import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput as _renderInput, renderDatePicker as _renderDatePicker} from '../../../validations/FieldRendering';
import {required, datetime, maxLength} from '../../../validations/FieldValidations';
import {get} from 'lodash';
import {FIELD_NAMES, AMEND_TYPES} from './constants';
import renderInputGroup from './renderInputGroup';


// HOCs
const renderInput = renderInputGroup(_renderInput);
const renderDatePicker = renderInputGroup(_renderDatePicker);


class AmendContactDetailsSection extends React.Component {
    constructor(props, context) {
		super(props, context);
	}

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        amendType: PropTypes.string,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    render(){
        const planHolderIndex = get(this.context, 'planHolderIndex') || 0;
        const content = get(this.context, 'content.amendContactDetailsSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);
        const {amendType} = this.context;

        return(
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title'>{content.amendContactDetails}</div>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'daytimeTelephoneNumber')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.daytimeTelephoneNumber}
                                    component={renderInput}
                                    normalize={maxLength(15)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'eveningtimeTelephoneNumber')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.eveningtimeTelephoneNumber}
                                    component={renderInput}
                                    normalize={maxLength(15)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'mobileTelephoneNumber')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.mobileTelephoneNumber}
                                    component={renderInput}
                                    normalize={maxLength(15)}
                                    showError
                                />
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'emailAddress')}
                                    className='pes-input-group'
                                    name={FIELD_NAMES.emailAddress}
                                    component={renderInput}
                                    showError
                                />
                            </div>
                        </div>

                        {
                            amendType !== AMEND_TYPES.trustee &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div>
                                <div className='tlcell col-xs-6'>
                                    <Field 
                                        inputLabel={get(content, 'effectiveFrom')}
                                        className='pes-input-group'
                                        name={FIELD_NAMES.contactDetailsEffectiveDate}
                                        component={renderDatePicker}
                                        placeholder='dd/mm/yyyy'
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

export default AmendContactDetailsSection;