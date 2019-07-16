import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput, renderDatePicker as _renderDatePicker, renderRadioGroup, renderCheckbox} from '../../../../validations/FieldRendering';
import {required, datetime, maxLength, postCode} from '../../../../validations/FieldValidations';
import {AmendSearchForm, AmendSearchFormAlternative} from '../AmendSearchForm';
import {get} from 'lodash';
import {FIELD_NAMES, AMEND_TYPES} from '../constants';
import renderInputGroup from '../renderInputGroup';
import {isEmpty as _isEmpty} from 'lodash';


// HOCs
const renderDatePicker = renderInputGroup(_renderDatePicker);


class TrusteeAmendAddressSection extends React.Component {
    constructor(props, context) {
		super(props, context);
    }
    
    static propTypes = {
        alternative: PropTypes.bool
    };

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        addressesFound: PropTypes.array,
        altAddressesFound: PropTypes.array,
        amendType: PropTypes.string,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        multipleAddressChange: PropTypes.bool,
        altMultipleAddressChange: PropTypes.bool,
        formErrors: PropTypes.object
    };

    render(){
        const planHolderIndex = get(this.context, 'planHolderIndex') || 0;
        const {amendType} = this.context;
        const content = get(this.context, 'content.amendAddressSection');
        const planHolderDetails = get(this.context, `plan.planDetail.planHolders[${planHolderIndex}]`);
        const {alternative} = this.props;
        const {addressesFound, altAddressesFound} = this.context;
        const showAddressList = (addressesFound && addressesFound.length > 1) ? true : false;
        const showAltAddressList = (altAddressesFound && altAddressesFound.length > 1) ? true : false;
        const planHoldersList = get(this.context, 'plan.planDetail.planHolders');
        const isMultiPlanholders = (planHoldersList && planHoldersList.length > 1) ? true : false;
        const multipleAddressChange = get(this.context, 'multipleAddressChange');
        const altMultipleAddressChange = get(this.context, 'altMultipleAddressChange');
        const multipleAddressChangeError = get(this.context, `formErrors.address.${FIELD_NAMES.multipleAddressChange}`);
        const altMultipleAddressChangeError = get(this.context, `formErrors.alternativeAddress.${FIELD_NAMES.altMultipleAddressChange}`);
        
        return(           
            <div className='pes-table-area ovf-v'>
                <div className='pes-section-title'>
                    {alternative ? get(content, 'amendAlternativeAddress') : get(content, 'amendAddress')}
                </div>
                <div className='pes-table-list amend-list ovf-v'>
                    <div className='tlbody'>
                        <div className='tlrow'>
                            <div className={((!alternative && showAddressList) || (alternative && showAltAddressList)) ? 'tlcell col-xs-4 amend-address-area' : 'tlcell col-xs-6 amend-address-area'}></div>
                            <div className={((!alternative && showAddressList) || (alternative && showAltAddressList)) ? 'tlcell col-xs-8 bg-inputs-group' : 'tlcell col-xs-6 bg-inputs-group'}>
                                {
                                    alternative
                                    ?
                                    <AmendSearchFormAlternative addressesFound={altAddressesFound} content={content} alternative showAddressList={showAltAddressList} />
                                    :
                                    <AmendSearchForm addressesFound={addressesFound} content={content} showAddressList={showAddressList} />
                                }
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {!alternative && get(planHolderDetails, 'address.addressLine1')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row form-group'>
                                    <div className='col-xs-6 input-label text-capitalize'></div>
                                    <div className='col-xs-6 input-field'>
                                        <Field 
                                            className='pes-input-group'
                                            name={alternative ? FIELD_NAMES.altAddress1 : FIELD_NAMES.address1}
                                            component={renderInput}
                                            normalize={maxLength(40)}
                                            showError
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {!alternative && get(planHolderDetails, 'address.addressLine2')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row form-group'>
                                    <div className='col-xs-6 input-label text-capitalize'></div>
                                    <div className='col-xs-6 input-field'>
                                        <Field 
                                            className='pes-input-group'
                                            name={alternative ? FIELD_NAMES.altAddress2 : FIELD_NAMES.address2}
                                            component={renderInput}
                                            normalize={maxLength(40)}
                                            showError
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {!alternative && get(planHolderDetails, 'address.addressLine3')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row form-group'>
                                    <div className='col-xs-6 input-label text-capitalize'></div>
                                    <div className='col-xs-6 input-field'>
                                        <Field 
                                            className='pes-input-group'
                                            name={alternative ? FIELD_NAMES.altAddress3 : FIELD_NAMES.address3}
                                            component={renderInput}
                                            normalize={maxLength(40)}
                                            showError
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {!alternative && get(planHolderDetails, 'address.addressLine4')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row form-group'>
                                    <div className='col-xs-6 input-label text-capitalize'></div>
                                    <div className='col-xs-6 input-field'>
                                        <Field 
                                            className='pes-input-group'
                                            name={alternative ? FIELD_NAMES.altAddress4 : FIELD_NAMES.address4}
                                            component={renderInput}
                                            normalize={maxLength(40)}
                                            showError
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'>
                                {!alternative && get(planHolderDetails, 'address.postCode')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row form-group'>
                                    <div className='col-xs-6 input-label text-capitalize'></div>
                                    <div className='col-xs-6 input-field'>
                                        <Field 
                                            className='pes-input-group'
                                            name={alternative ? FIELD_NAMES.altPostCode : FIELD_NAMES.postCode}
                                            component={renderInput}
                                            validate={[postCode]}
                                            showError
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6 lh-input'></div>
                            <div className='tlcell col-xs-6'>
                                <Field 
                                    inputLabel={get(content, 'effectiveFrom')}
                                    className='pes-input-group'
                                    name={alternative ? FIELD_NAMES.altAddressEffectiveDate : FIELD_NAMES.addressEffectiveDate}
                                    component={renderDatePicker}
                                    // validate={[datetime]}
                                    placeholder='dd/mm/yyyy'
                                    showError
                                />
                            </div>
                        </div>    

                        {
                            amendType === AMEND_TYPES.planholder && isMultiPlanholders && 
                            <div className='tlrow'>
                                <div className={((alternative && altMultipleAddressChangeError) || (!alternative && multipleAddressChangeError)) ? 'tlcell col-xs-6 lh-input has-error' : 'tlcell col-xs-6 lh-input'}>
                                    <div>
                                        {get(content, 'applyAddressChangesMessage')}
                                        {
                                            alternative &&
                                            altMultipleAddressChangeError &&
                                            <span className='icon-required'></span>
                                        }
                                        {
                                            !alternative &&
                                            multipleAddressChangeError &&
                                            <span className='icon-required'></span>
                                        }
                                    </div>

                                    {
                                        !alternative && 
                                        multipleAddressChange &&
                                        (planHoldersList && planHoldersList.length > 1) &&
                                        <div className='planholderListArea'>
                                            {
                                                planHoldersList.map((item, index) => {
                                                    if(index != planHolderIndex && !_isEmpty(item.name)){
                                                        return(
                                                            <Field 
                                                                key={index}
                                                                className='pes-input-checkbox'
                                                                name={`${FIELD_NAMES.checkButtonValues}[${index}]`}
                                                                component={renderCheckbox}
                                                                label={item.name}
                                                            />
                                                        );
                                                    }
                                                })
                                            }
                                        </div>
                                    }

                                    {
                                        alternative && 
                                        altMultipleAddressChange &&
                                        (planHoldersList && planHoldersList.length > 1) &&
                                        <div className='planholderListArea'>
                                            {
                                                planHoldersList.map((item, index) => {
                                                    if(index != planHolderIndex && !_isEmpty(item.name)){
                                                        return(
                                                            <Field 
                                                                key={index}
                                                                className='pes-input-checkbox'
                                                                name={`${FIELD_NAMES.altCheckButtonValues}[${index}]`}
                                                                component={renderCheckbox}
                                                                label={item.name}
                                                            /> 
                                                        );
                                                    }
                                                })
                                            }
                                    </div>
                                    }
                                </div>
                                <div className='tlcell col-xs-6'>
                                    <Field 
                                        className='pes-radio-group group-inline'
                                        name={alternative ? FIELD_NAMES.altMultipleAddressChange : FIELD_NAMES.multipleAddressChange}
                                        component={renderRadioGroup}
                                        data={[
                                            {value: true, label: 'Yes'},
                                            {value: false, label: 'No'}
                                        ]}
                                        defaultValue={false}
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

export default TrusteeAmendAddressSection;