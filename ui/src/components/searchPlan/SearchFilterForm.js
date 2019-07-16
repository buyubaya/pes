import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '../common/Button';
import { renderInput } from '../../validations/FieldRendering';

const SearchFilterForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                className='pes-input-group'
                name='planNumber01'
                type='text'
                component={renderInput}
            />
            <Button
                type='button'
                className='pes-btn pes-btn-default pull-left'
                label='Clear'
                onClick={reset}
                disabled={pristine || submitting}
            />
            <Button
                type='submit'
                className='pes-btn pes-btn-default pull-right'
                label='Submit'
                disabled={pristine || submitting}
            />
        </form>
    );
};

export default reduxForm({
    form: 'searchFilterForm'
})(SearchFilterForm);
