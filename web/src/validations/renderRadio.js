import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';
import {toString as _toString} from 'lodash';

class Radio extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.onClick = this.onClick.bind(this);
	}

	componentWillMount(){
		if(!this.props.inputValue){
			this.props.updateDefaultValueOnMounted &&
			this.props.checked && this.props.onChange && this.props.onChange(this.props.value.toString());
		}
	}

	onClick(e){
        let value = e.target.value;
		this.props.onChange && this.props.onChange(value);
	}

	render(){
		return(
			<div className='pes-input-radio'>
                <input
                    name={this.props.name}
                    type='radio'
                    id={this.props.name+'-'+this.props.value}
                    value={this.props.value}
                    onChange={this.onClick}
                    disabled={this.props.disabled}
					checked={this.props.inputValue ? (this.props.value === this.props.inputValue) : this.props.checked}
                />
                <label htmlFor={this.props.name+'-'+this.props.value}>{this.props.label}</label>
            </div>
		);
	}
};

const renderRadio = ({input, fieldValue, label, checked, disabled}) => (
	<Radio
		{...input}
		inputValue={input.value}
        value={fieldValue}
        label={label}
        checked={checked}
		disabled={disabled}
	/>
);

renderRadio.propTypes = {
	...FieldProps,
};

export default withInputError(renderRadio);