import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

import simpleNumberLocalizer from 'react-widgets-simple-number';
simpleNumberLocalizer();
import {NumberPicker} from 'react-widgets';

const renderNumberPicker = ({input, showError, formatType, ...rest}) => (
	<NumberPicker 
		{...input}
		{...rest}
		onKeyPress={e => {
			let reg = /[0-9\.]/;
			!reg.test(e.key) && e.preventDefault();
		}}
		format={formatType}
		value={isNaN(Number(input.value)) ? null : Number(input.value)}
	/>
);

renderNumberPicker.propTypes = {
	...FieldProps,
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	})),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool
};

export default withInputError(renderNumberPicker);