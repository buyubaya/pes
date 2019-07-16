import React, {PropTypes} from 'react';

const renderInputGroup = Comp => ({inputLabel, ...rest}) => (
    <div className={(rest.meta.error && rest.meta.touched) ? 'row form-group has-error' : 'row form-group'}>
        <div className='col-xs-6 input-label text-capitalize'>
            {inputLabel}
            {
                rest.meta.error && rest.meta.touched && <span className='icon-required'></span>
            }
        </div>
        <div className='col-xs-6 input-field'>
            <Comp {...rest} />
        </div>
    </div>
);

export default renderInputGroup;