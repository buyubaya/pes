import React, { PropTypes } from 'react';
import CancelChangeButton from '../common/CancelChangeButton';
import SubmitButton from '../common/SubmitButton';

const ButtonGroup = ({
    className, 
    onCancel, 
    onSubmit, 
    showCancel, 
    showSubmit, 
    isFormValid, 
    modalCancelTitle, 
    modalSubmitTitle,
    servicingType
}) => (
    <div className={className}>    
        {
            showCancel &&
            <CancelChangeButton
                form='searchFilterForm'
                onClick={onCancel} 
                modalCancelTitle={modalCancelTitle}
            /> 
        }            
        {
            showSubmit &&
            <SubmitButton 
                label='Submit' 
                onSubmit={onSubmit} 
                isFormValid={isFormValid} 
                modalSubmitTitle={modalSubmitTitle}
                servicingType={servicingType}
            />
        }
    </div>
);

ButtonGroup.propTypes = {
    className: PropTypes.string, 
    onCancel: PropTypes.func, 
    onSubmit: PropTypes.func, 
    showCancel: PropTypes.bool, 
    showSubmit: PropTypes.bool,
    isFormValid: PropTypes.bool
};

ButtonGroup.defaultProps = {
    showCancel: true, 
    showSubmit: true,
    isFormValid: false
};

export default ButtonGroup;