import React, {PropTypes} from 'react';

const renderInputGroup = Comp => ({inputLabel, className1, className2, labelPrepend, hideDotRequired, ...rest}) => (
    <div className={(rest.meta.error && rest.meta.touched) ? 'tlrow row has-error' : 'tlrow row'}>
        <div className={className1 ? 'tlcell ' + className1 + ' input-label' : 'tlcell input-label'}>
            {inputLabel}
            {!hideDotRequired && <span className='icon-required'></span>}
            {labelPrepend}
        </div>
        <div className={className2 ? 'tlcell ' + className2 + ' input-field' : 'tlcell input-field'}>
            <Comp {...rest} />
        </div>
    </div>
);

renderInputGroup.propTypes = {
	className1: PropTypes.string,
	className2: PropTypes.string,
    inputLabel: PropTypes.string,
    hideDotRequired: PropTypes.bool,
	meta: PropTypes.object
};

export default renderInputGroup;