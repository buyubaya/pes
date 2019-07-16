import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

class CheckboxGroup extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			value: props.defaultValue || []
		};
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount(){
		this.props.onChange && this.props.onChange(this.state.value);
	}

	componentWillReceiveProps(props){
		this.setState(state => ({value: props.value}));
	}

	onClick(e){
		let value = [...this.state.value];
		if(value.includes(e.target.value)){
			value = value.filter(x => x !== e.target.value);
		}
		else {
			value.push(e.target.value);
		}
		this.props.onBlur && this.props.onBlur(value);
	}

	render(){
		return(
			<div>
			{
			this.props.data && this.props.data.map((item, index) => 
				<div className='pes-input-checkbox' key={index}>
					<input 
						type='checkbox'
						disabled={this.props.disabledValue&&this.props.disabledValue.includes(item.value)}
						id={this.props.name + '-' + item.value}
						value={item.value}
						checked={this.state.value.includes(item.value)}
						onChange={this.onClick}
					/>
					<label htmlFor={this.props.name + '-' + item.value}>{item.label}</label>
				</div>	
			)
			}
			</div>
		);
	}
};

const renderCheckboxGroup = ({input, showError,...rest}) => (
	<CheckboxGroup
		{...input}
		{...rest}
	/>
);

renderCheckboxGroup.propTypes = {
	...FieldProps,
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	})),
	defaultValue: PropTypes.array,
	disabledValue: PropTypes.array,
	disabled: PropTypes.bool
};

export default withInputError(renderCheckboxGroup);