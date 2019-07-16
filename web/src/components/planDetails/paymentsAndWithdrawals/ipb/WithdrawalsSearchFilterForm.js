import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {renderDatePicker} from '../../../../validations/FieldRendering';
import {datetime} from '../../../../validations/FieldValidations';
import Button from '../../../common/Button';


const WithdrawalsSearchFilterForm = props => {
    const {handleSubmit, pristine, valid, reset, submitting, allValues, change, tabContent} = props;

    return (
        <form className='clearfix' onSubmit={handleSubmit}>
            <div className='field-area'>
                <div className='form-group mb-5'>
                    <span className='pes-input-label'>{tabContent.ipbStartDate}</span>
                    <Field
                        name='startDate'
                        component={renderDatePicker}
                        placeholder='dd/mm/yyyy'
                        className='pes-input-group'
                        showError
                        validate={[datetime]}
                    />
                </div>
                <div className='form-group mb-5'>
                    <span className='pes-input-label'>{tabContent.ipbEndDate}</span>
                    <Field
                        name='endDate'
                        component={renderDatePicker}
                        placeholder='dd/mm/yyyy'
                        className='pes-input-group'
                        showError
                        validate={[datetime]}
                    />
                </div>
            </div>
            <div className='btn-area'>
                <Button 
                    className='pes-btn pes-btn-default' 
                    label='Search' 
                />
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'withdrawalsSearchFilter'
})(WithdrawalsSearchFilterForm);