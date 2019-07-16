import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';


const renderCheckbox = ({input, label, id, disabled}) => (
	<div className='pes-input-checkbox'>
		<input 
			{...input}
			type='checkbox'
			disabled={disabled}
			id={id ? id : input.name}
			onChange={e => input.onBlur(e)}
			checked={input.value ? true : false}
		/>
		<label htmlFor={id ? id : input.name}>{label}</label>
	</div>
);

renderCheckbox.propTypes = {
	...FieldProps,
	disabled: PropTypes.bool
};

export default withInputError( renderCheckbox);