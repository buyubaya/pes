import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

class DatePicker extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			value: props.defaultValue,
			error: 'Invalid value'
		};
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentWillMount(){
		this.props.onChange && this.props.onChange(this.props.defaultValue);
	}

	componentWillReceiveProps(props){
		this.setState({value: props.value});
	}

	onKeyPress(e){
		const reg = /[0-9]/;
		const keyCode = e.which || e.keyCode;

		if(!reg.test(e.key) && keyCode !== 47){
			e.preventDefault();
		}
	}

	render(){
		return(
			<input 
				type='text'
				{...this.props}
				className='form-control'
				onKeyPress={this.onKeyPress}
				onChange={this.props.onChange}
			/>
		);
	}
};

const renderDatePicker = ({input, placeholder, disabled}) => (
	<DatePicker 
		{...input}
		placeholder={placeholder}
		disabled={disabled}
	/>
);

renderDatePicker.propTypes = {
	...FieldProps,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool
};

export default withInputError(renderDatePicker);