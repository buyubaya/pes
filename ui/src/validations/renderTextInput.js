import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

class TextInput extends React.Component {
	constructor(props, context){
		super(props, context);
		
		this.state = {
			value: props.defaultValue || ''
		};
		
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}	

	componentWillMount(){
		if(!this.props.value){
			this.props.defaultValue && this.props.onChange && this.props.onChange(this.props.defaultValue);
		}
		else {
			this.setState({value: this.props.value});
		}
	}

	componentWillReceiveProps(props){
		this.setState({value: props.value});
	}

	onChange(e){
		this.props.onChange && this.props.onChange(e.target.value);
	}

	onBlur(e){
		this.props.onBlur && this.props.onBlur(e.target.value);
	}

	render(){
		if(this.props.adaptiveWidth){
			return(
				<div className='w-adaptive d-inline-block'>
					<div className='hidden-text'>{this.state.value}</div>
					<input
						type={this.props.type}
						className='form-control' 
						value={this.state.value}
						onChange={this.onChange}
						onBlur={this.onBlur}
						disabled={this.props.disabled}
					/>
				</div>
			);
		}
		else {
			return(
				<input
					type={this.props.type}
					className='form-control' 
					value={this.state.value}
					onChange={this.onChange}
					onBlur={this.onBlur}
					disabled={this.props.disabled}
				/>
			);
		}
	}
}

const renderTextInput = ({input, meta, showError, disabled, className, adaptiveWidth, ...rest}) => (
	<TextInput
		{...input}
		{...rest}
		disabled={disabled}
		className={className}
		adaptiveWidth={adaptiveWidth}
	/>
);

renderTextInput.propTypes = {
	...FieldProps
};

export default withInputError(renderTextInput);