import React, {PropTypes} from 'react';
import {Field, FormSection, reduxForm, formValueSelector} from 'redux-form';
import {renderInput, renderRadioGroup, renderNumberPicker, renderMultiSelect, renderCheckbox} from '../../../validations/FieldRendering';
import propTypes from 'redux-form/lib/propTypes';
export const required = value => value ? undefined : "Please supply or check missing or invalid details below and then click 'Submit'.";
class IncomePaymentsSection extends React.Component {
    render(){
        const {incomeOption, paymentType} = this.context;

        return(
            <div className='pes-income-payment-section'>
                <p className='pes-page-title'>Income Payments</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12 input-label no-capitalize text-bold'>
                                Income is currently being taken from the plan
                            </div>
                        </div>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-4 input-label'>
                                Select income option
                            </div>
                            <div className='tlcell col-xs-8 input-field'>
                                <Field
                                    name='incomeOption'
                                    data={[
                                        {value: 'TAKE_INCOME_PAYMENTS', label: 'Take Income Payments'},
                                        {value: 'AMEND_BANK_DETAILS_FOR_INCOME_PAYMENTS', label: 'Amend Bank Details for Income Payments'},
                                        {value: 'REINVEST_INCOME', label: 'Reinvest Income'}
                                    ]}
                                    defaultValue={incomeOption}
                                    className='pes-radio-group group-inline'
                                    component={renderRadioGroup}
                                    validate={[required]}
                                    showError={true}
                                />
                            </div>
                        </div>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-12 lh-input'>
                                This request applies only if a customer has invested in income funds.
                            </div>
                        </div>

                        {
                            incomeOption &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-12 lh-input'>
                                    {
                                        incomeOption !== 'REINVEST_INCOME'
                                        ?
                                        'These will be paid to you on 10 March, 10 June, 10 September and 10 December each year provided income has been generated.'
                                        :
                                        'Any income distributions generated will be re-invested'
                                    }
                                </div>
                            </div>
                        }

                        {
                            incomeOption &&
                            incomeOption !== 'REINVEST_INCOME' &&
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4 input-label'>
                                    Select payment type
                                </div>
                                <div className='tlcell col-xs-8 input-field'>
                                    <Field
                                        name='paymentType'
                                        data={[
                                            {value: 'BACS', label: 'Bank Transfer'},
                                            {value: 'CHEQUE', label: 'Cheque'}
                                        ]}
                                        className='pes-radio-group group-inline'
                                        defaultValue={paymentType}
                                        component={renderRadioGroup}
                                        validate={[required]}
                                        showError={true}
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
IncomePaymentsSection.contextTypes = {
    incomeOption: PropTypes.string
};
export default IncomePaymentsSection;