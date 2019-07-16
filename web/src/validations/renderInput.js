import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';

// class TextInput extends React.Component {
// 	constructor(props, context){
// 		super(props, context);
		
// 		this.state = {
// 			value: props.defaultValue || ''
// 		};
		
// 		this.onChange = this.onChange.bind(this);
// 		this.onBlur = this.onBlur.bind(this);
// 	}	

// 	componentDidMount(){
// 		if(this.props.defaultValue){
// 			this.props.onChange && this.props.onChange(this.props.defaultValue);
// 		}
// 	}

// 	componentWillReceiveProps(props){
// 		this.setState({value: props.value});
// 	}

// 	onChange(e){
// 		this.props.onChange && this.props.onChange(e.target.value);
// 	}

// 	onBlur(e){
// 		this.props.onBlur && this.props.onBlur(e.target.value);
// 	}

// 	render(){
// 		return(
// 			<input
// 				className='form-control' 
// 				value={this.state.value}
// 				onChange={this.onChange}
// 				onBlur={this.onBlur}
// 			/>
// 		);
// 	}
// }

const renderInput = ({input, meta, showError, showWarn, ...rest}) => (
	<input
		{...input}
		{...rest}
		className='form-control'
	/>
);

renderInput.propTypes = {
	...FieldProps
};

export default withInputError(renderInput);