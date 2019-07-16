import React, {PropTypes} from 'react';
import Button from './Button';
import {Modal} from 'react-bootstrap';
import {TopHeader} from './Header';
import Footer from './Footer';
import _, {get} from 'lodash';

class SubmitButton extends React.Component {
    constructor(){
        super();

        this.state = {
            show: false
        };
    }

    static propTypes = {
        form: PropTypes.string,
        isFormValid: PropTypes.bool,
        modalClassName: PropTypes.string,
        onSubmit: PropTypes.func,
        //fundSwitch: PropTypes.bool
        servicingType: PropTypes.string
    }

    static contextTypes = {
        content: PropTypes.object
    };

    static defaultProps = {
        isFormValid: false
    };

    onClick(){ 
        this.showModal();
    }

    showModal(){
        if(this.props.isFormValid){
            this.setState({show: true});
        }
    }

    hideModal(){
        this.setState({show: false});
    }

    submitModal(){
        this.hideModal();
        this.props.onSubmit();
    }

    render(){
        const content = get(this.context, 'content');
        //const switchFund = get(this.props, 'switchFund');
        const servicingType = get(this.props, 'servicingType');
        return(
            <span>
                <Button 
                    type='submit'
                    className='pes-btn pes-btn-default'
                    label='Submit' 
                    onClick={::this.onClick}
                />
                <Modal 
                    className={this.props.modalClassName ? ('pes-modal pes-authority-modal' + this.props.modalClassName) : 'pes-modal pes-authority-modal'} 
                    show={this.state.show}
                    onHide={::this.hideModal}
                > 
                    <div className='pes-modal'>
                        {/* <div className='pes-text-belt text-capitalize'>{content && content.ModalSubmitConfirmationTitle || 'Plan Enquiry'}</div> */}
                        <span className='icon-close' onClick={::this.hideModal}></span>
                        <div className='modal-title'>
                            {this.props.modalSubmitTitle|| 'Plan Enquiry'}
                        </div>
                        <div className='modal-body'>
                            {
                                servicingType=='contribution'&&
                                <div>
                                    <p className='mt-10'>Thank you for submitting the servicing request. This will be processed in line with the rules set out in the terms and conditions for this product. All changes made will be confirmed in writing to your client.</p>
                                    <p className='mt-10'>If distribution income is currently being taken then you should consider whether any changes are required as a result of this request.</p>
                                    <p>Please press Confirm to continue or Back to return to the input screen.</p>
                                </div>
                            }
                            {
                                servicingType=='income-payment'&&
                                <div>
                                    <p className='mt-10'>Thank you for submitting the servicing request. The updated details will be reflected on this system as soon as possible. All changes will be confirmed in writing to your client.</p>
                                    <p>Please press Confirm to continue or Back to return to the input screen.</p>
                                </div>
                            }
                            {
                                servicingType=='switch-fund' &&
                                <div>
                                    <p className='mt-10'>Thank you for submitting the servicing request. This will be processed in line with the rules set out in the terms and conditions for this product. All changes made will be confirmed in writing to your client. If withdrawals or distribution income are currently being taken then you should consider whether any changes are required as a result of this request.</p>
                                    <p>Please press Confirm to continue or Back to return to the input screen.</p>
                                </div>
                            }
                            {
                                servicingType=='switch-fund-rebalance' &&                                   
                                <div>
                                    <p className='mt-10'>Thank you for submitting the servicing request. This will be processed in line with the rules set out in the terms and conditions for this product. All changes made will be confirmed in writing to your client.If withdrawals or distribution income are currently being taken then you should consider whether any changes are required as a result of this request.</p>
                                    <p>Please press Confirm to continue or Back to return to the input screen.</p>
                                </div>   
                            }
                            {
                                (_.isUndefined(servicingType) || _.isEmpty(servicingType)) &&
                                <div>
                                    <p className='mt-10'>Thank you for submitting the servicing request. The updated details will be reflected on this system as soon as possible. All changes will be confirmed in writing to your client.</p>
                                    <p>Please press Confirm to continue or Back to return to the input screen.</p>
                                </div>
                            }                                                              
                        </div>
                        <div className='modal-footer'>
                            <Button label='Back' className='pes-btn pes-btn-default' onClick={::this.hideModal} />
                            <Button label='Confirm' className='pes-btn pes-btn-default ml-10' onClick={::this.submitModal} />
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default SubmitButton;