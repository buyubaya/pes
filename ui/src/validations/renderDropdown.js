import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';
import {DropdownList} from 'react-widgets';


class Dropdown extends React.Component {
	render(){
		const {data, valueField, textField, defaultValue, onChange, onBlur, placeholder, ...rest} = this.props;

		return(
			<div className='pes-dropdown-inner'>				
				<DropdownList
					data={data}
                    valueField={valueField}
                    textField={textField}
					defaultValue={defaultValue}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={placeholder}
				/>
				<div className='dropdown-hidden-text'>
					{
						data && data.map((item, index) => {
							return <span key={index}>{item.label}<br/></span>;
						})
					}
				</div>
			</div>
		);
	}
}

const renderDropdown = ({input, className, ...rest}) => (
	<Dropdown
		{...input}
		{...rest}
		onBlur={e => false}
		onChange={e => input.onChange(e[rest.valueField])}
	/>
);

renderDropdown.propTypes = {
	...FieldProps,
	disabled: PropTypes.bool
};

export default withInputError(renderDropdown);