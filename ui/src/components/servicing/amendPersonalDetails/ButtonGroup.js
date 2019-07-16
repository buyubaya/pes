import React, {PropTypes} from 'react';
import CancelChangeButton from '../../common/CancelChangeButton';
import SubmitChangeButton from './SubmitChangeButton';

const ButtonGroup = ({
    className, 
    onCancel, 
    onSubmit, 
    showCancel, 
    showSubmit, 
    onConfirmSubmit, 
    reduxFormHandleSubmit, 
    submitForm, 
    onSubmitPristine, 
    modalCancelTitle, 
    modalSubmitTitle,
    planId,
    servicingType
}) => (
    <div className='pes-table-list'>
        <div className='tlrow empty pes-text-belt'></div>
        <div className={className}>
            <div>
                {
                    showCancel &&
                    <CancelChangeButton
                        onClick={onCancel}
                        modalCancelTitle={modalCancelTitle}
                        planId={planId}
                    /> 
                }            
                {
                    showSubmit &&
                    <SubmitChangeButton 
                        onClick={onSubmit}
                        onSubmitPristine={onSubmitPristine}
                        onSubmitModal={onConfirmSubmit}
                        reduxFormHandleSubmit={reduxFormHandleSubmit}
                        submitForm={submitForm}
                        modalSubmitTitle={modalSubmitTitle}
                        servicingType={servicingType}
                    />
                }
            </div>
        </div> 
    </div>
);

ButtonGroup.propTypes = {
    className: PropTypes.string, 
    onCancel: PropTypes.func, 
    onSubmit: PropTypes.func, 
    showCancel: PropTypes.bool, 
    showSubmit: PropTypes.bool,
    onSubmitPristine: PropTypes.func,
    onConfirmSubmit: PropTypes.func,
    reduxFormHandleSubmit: PropTypes.func,
    submitForm: PropTypes.func
};

ButtonGroup.defaultProps = {
    showCancel: true, 
    showSubmit: true
};

export default ButtonGroup;