import React, {PropTypes} from 'react';
import HtmlUtils from '../utils/HtmlUtils';
const withInputError = (Comp) => props => {
	return (
	<div className={props.className ? (props.className + (props.showError && props.meta.touched && props.meta.error ? ' has-error' : '')) : (props.showError && props.meta.touched && props.meta.error ? ' has-error' : '')}>
		<div className='form-control-group'>
			<Comp {...props} />
		</div>
		{
			props.showError && props.meta.touched && props.meta.error && 
			<div className='help-block'>{HtmlUtils.htmlToReact(props.meta.error)}</div>
		}
		{
			props.showWarn && props.meta.touched && props.meta.warning && 
			<div className='help-block'>{HtmlUtils.htmlToReact(props.meta.warning)}</div>
		}
	</div>
	);
};

withInputError.propTypes = {
	className: PropTypes.string,
	showError: PropTypes.bool,
	showWarn: PropTypes.bool
};

withInputError.defaultProps = {
	showError: true,
	showWarn: true
};

export {withInputError};