import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

class MultiSelect extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: props.defaultValue || []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.props.onChange && this.props.onChange(this.state.value);
	}

	componentWillReceiveProps(props){
		this.setState({value: props.value});
	}

	handleChange(e){
		const value = [].slice.call(e.target.selectedOptions).map(e => e.value);
		this.props.onChange && this.props.onChange(value);
	}

	render(){
		const {defaultValue, disabledValue, data, ...rest} = this.props;

		return(
			<select multiple className='form-control'
				{...rest}
				value={this.state.value}
				onChange={this.handleChange}
			>
				{
				data && data.map((item, index) => {
					if(disabledValue){
						return (!disabledValue.includes(item.value) &&
						<option value={item.value} key={index}>{item.label}</option>);
					}else {
						return (<option value={item.value} key={index}>{item.label}</option>);
					}
				})
				}
			</select>
		);
	}
};

const renderMultiSelect = ({ input, data, defaultValue, disabledValue, disabled, showError }) => (
	<MultiSelect
		{...input}
		data={data}
		defaultValue={defaultValue}
		disabledValue={disabledValue}
	/>
);

renderMultiSelect.propTypes = {
	...FieldProps,
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	})),
	defaultValue: PropTypes.array,
	disabledValue: PropTypes.array,
	disabled: PropTypes.bool
};

export default withInputError(renderMultiSelect);