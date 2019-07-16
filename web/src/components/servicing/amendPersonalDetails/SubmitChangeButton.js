import React, {PropTypes} from 'react';
import Button from '../../common/Button';
import {Modal} from 'react-bootstrap';
import {TopHeader} from '../../common/Header';
import Footer from '../../common/Footer';
import {isEqual as _isEqual} from 'lodash';

class SubmitChangeButton extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            showSubmitConfirmation: false,
            showSubmitNotification: false,
            submitData: null
        };

        this.onClick = this.onClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
    }

    static propTypes = {
        modalClassName: PropTypes.string,
        onClick: PropTypes.func,
        onSubmitPristine: PropTypes.func,
        onSubmitModal: PropTypes.func,
        reduxFormHandleSubmit: PropTypes.func,
        submitForm: PropTypes.func
    };

    onClick(values, dispatch, props){  
        this.props.onClick && this.props.onClick(this);

        if(props.dirty){
            const submitData = this.props.submitForm && this.props.submitForm(values, dispatch, props);
            submitData && this.setState({showSubmitConfirmation: true, submitData});    
        }
        else {
            this.props.onSubmitPristine && this.props.onSubmitPristine(this);
        }
    }

    submitModal(values, dispatch, props){
        this.setState({showSubmitConfirmation: false});
        if(this.props.onSubmitModal && this.state.submitData){
            return this.props.onSubmitModal(this.state.submitData);
        }
    }

    hideModal(){
        this.setState({showSubmitConfirmation: false, showSubmitNotification: false});
    }

    _renderSubmitConfirmation(){
        const {reduxFormHandleSubmit, amendOrganisation, servicingType} = this.props;
        
        return(
            <Modal 
                className={this.props.modalClassName ? ('pes-modal pes-authority-modal' + this.props.modalClassName) : 'pes-modal pes-authority-modal'} 
                show={this.state.showSubmitConfirmation}
                onHide={this.hideModal}
            > 
                <div className='pes-modal'>
                    <span className='icon-close' onClick={this.hideModal}></span>
                    <div className='modal-title text-capitalize'>
                        {this.props.modalSubmitTitle || 'Plan Enquiry'}
                    </div>
                    <div className='modal-body'>
                        {
                            !servicingType &&
                            <div>
                                <p>Thank you for submitting the updated personal details. The updated details will be reflected on this system as soon as possible.</p>
                                <p>Please press Confirm to continue or Back to return to the input screen.</p>
                            </div>
                        }
                        {
                            servicingType === 'amend' &&
                            <div>
                                <p>Thank you for submitting the updated personal details. The updated details will be reflected on this system as soon as possible.</p>
                                <p>Please press Confirm to continue or Back to return to the input screen.</p>
                            </div>
                        }
                        {
                            servicingType === 'amendOrganisation' &&
                            <div>
                                <p>Thank you for submitting the servicing request. The updated details will be reflected on this system as soon as possible. All changes will be confirmed in writing to your client.</p>
                                <p>Please press Confirm to continue or Back to return to the input screen.</p>
                            </div>
                        }
                        {
                            servicingType === 'surrender' &&
                            <div>
                                <p>Thank you for submitting the servicing request. This will be processed in line with the rules set out in the terms and conditions for this product. Please note that fluctuations in fund prices may affect the value we are able to pay. All changes made will be confirmed in writing to your client.</p>
                                <p>Please press Confirm to continue or Back to return to the input screen.</p>
                            </div>
                        }
                        {
                            servicingType === 'partialSurrender' &&
                            <div>
                                <p>Thank you for submitting the servicing request. This will be processed in line with the rules set out in the terms and conditions for this product. Please note that fluctuations in fund prices may affect the value we are able to pay. All changes made will be confirmed in writing to your client.</p>
                                <p>If withdrawals or distribution income are currently being taken then you should consider whether any changes are required as a result of this request.</p>
                                <p>Please press Confirm to continue or Back to return to the input screen.</p>
                            </div>
                        }
                    </div>
                    <div className='modal-footer'>
                        <Button label='Back' className='pes-btn pes-btn-default' onClick={this.hideModal} />
                        <Button label='Confirm' className='pes-btn pes-btn-default ml-10' onClick={reduxFormHandleSubmit(this.submitModal)} />
                    </div>
                </div>
            </Modal>
        );
    }

    _renderSubmitNotification(){
        return(
            <Modal 
                className={this.props.modalClassName ? ('pes-modal pes-authority-modal' + this.props.modalClassName) : 'pes-modal pes-authority-modal'} 
                show={this.state.showSubmitNotification}
                onHide={this.hideModal}
            > 
                <div>
                    <TopHeader />
                    <div className='pes-table-list'>
                        <div className='pes-text-belt tlrow empty'></div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12 pt-10'>
                                <p>No changes have been made, please amend or 'cancel'.</p>
                            </div>
                        </div>
                        <div className='tlrow empty pes-text-belt'></div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12 text-right'>
                                <Button label='Close' className='pes-btn pes-btn-default' onClick={this.hideModal} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    render(){
        const {reduxFormHandleSubmit} = this.props;

        return(
            <span>
                <Button 
                    type='button'
                    className='pes-btn pes-btn-default' 
                    label='Submit' 
                    onClick={reduxFormHandleSubmit(this.onClick)}
                />
                
                {this._renderSubmitConfirmation()}
                
                {this._renderSubmitNotification()}
            </span>
        );
    }
}

export default SubmitChangeButton;