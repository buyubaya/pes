import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';
import {isUndefined as _isUndefined, isNull as _isNull, toString as _toString} from 'lodash';

class RadioGroup extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: _toString(props.defaultValue)
		};
		this.onClick = this.onClick.bind(this);
	}

	componentWillMount(){
		if(!this.props.value && this.props.value !== false){
			!_isUndefined(this.props.defaultValue) &&
			!_isNull(this.props.defaultValue) &&
			this.props.onChange && this.props.onChange(this.props.defaultValue);
		}
		else {
			this.setState({value: this.props.value});
		}
	}

	componentWillReceiveProps(props){
		this.setState({value: props.value});
	}

	onClick(e){
		let value = e.target.checked ? e.target.value : '';
		value = (value === 'true') ? true : value;
		value = (value === 'false') ? false : value;
		
		this.props.onChange && this.props.onChange(e);
		this.props.onBlur && this.props.onBlur(value);
	}

	render() {
		return (
			<div>
				{
					this.props.data && this.props.data.map((item, index) =>
						<div className='pes-input-radio' key={index}>
							<input
								name={this.props.name}
								type='radio'
								id={this.props.name + '-' + item.value}
								value={item.value}
								checked={this.state.value === item.value? 'checked' : false}
								onChange={this.onClick}
								disabled={this.props.disabledValue && this.props.disabledValue.includes(item.value)}
							/>
							<label htmlFor={this.props.name + '-' + item.value}>{item.label}</label>
						</div>
					)
				}
			</div>
		);
	}
};

const renderRadioGroup = ({input, data, defaultValue, disabledValue, disabled}) => (
	<RadioGroup
		{...input}
		data={data}
		defaultValue={defaultValue}
		disabledValue={disabledValue}
		disabled={disabled}
	/>
);

renderRadioGroup.propTypes = {
	...FieldProps,
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired
	})),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	disabledValue: PropTypes.array,
	disabled: PropTypes.bool
};

export default withInputError(renderRadioGroup);