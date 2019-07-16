import React, {PropTypes} from 'react';
import Button from '../common/Button';
import {Modal} from 'react-bootstrap';
import _, {get} from 'lodash';

class CurtisBankDialog extends React.Component {
    constructor(){
        super();

        this.state = {
            show: false
        };
    }

    static propTypes = {
        show: PropTypes.bool,
        isStaff: PropTypes.bool,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    static contextTypes = {
        content: PropTypes.object
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.show!==this.props.show){
          this.setState({show: nextProps.show });
        }
    }

    showModal(){
        this.setState({show: true});
    }

    hideModal(){
        this.setState({show: false});
        this.props.onClose();
    }

    submitModal(){
        this.hideModal();
        this.props.onSubmit();
    }   

    onClose(){
        this.hideModal();        
    }  

    render(){
        // <Modal 
        //     className={'pes-modal pes-authority-modal'} 
        //     show={this.state.show}
        //     onHide={::this.hideModal}> 
        //     <div className='pes-modal'>
        //         <span className='icon-close' onClick={::this.onClose}></span>
        //         <div className='modal-title'>
        //             {'Disclaimer'}
        //         </div>
        //         <div className='modal-body'>
        //             <div>
        //                 <p className='mt-10'>By Continuing, you will be leaving the Zurich Intermediary Website.  The contents of the website you are about to visit is not controlled by Zurich.  Zurich is not responsible for, and does not endorse, the content external websites</p>                                        
        //             </div>
        //         </div>
        //         <div className='modal-footer'>
        //             <Button label='Cancel' className='pes-btn pes-btn-default' onClick={::this.onClose} />
        //             <Button label='Ok' className='pes-btn pes-btn-default ml-10' onClick={::this.submitModal} />                                
        //         </div>
        //     </div>
        // </Modal>
        return(
            <span>
                {!this.props.isStaff && 
                <Modal 
                    className={'pes-modal pes-authority-modal'} 
                    show={this.state.show}
                    onHide={::this.hideModal}> 
                    <div className='pes-modal'>
                        <span className='icon-close' onClick={::this.onClose}></span>
                        <div className='modal-title'>
                        {'Information'}
                        </div>                            
                        <div className='modal-body'>
                            <div>
                                <p className='mt-10'>The Single sign on facility to the Curtis Banks portal is currently unavailable.
                                <br/>
                                Please sign into the Curtis Banks Portal using your usual credentials to view the details for this plan.
                                </p>                                        
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <Button label='Ok' className='pes-btn pes-btn-default ml-10' onClick={::this.onClose} />
                        </div>
                    </div>
                </Modal>}
                {this.props.isStaff && 
                <Modal 
                    className={'pes-modal pes-authority-modal'} 
                    show={this.state.show}
                    onHide={::this.hideModal}> 
                      <div className='pes-modal'>
                        <span className='icon-close' onClick={::this.onClose}></span>
                        <div className='modal-title'>
                          {'Plan Enquiry'}
                        </div>                            
                        <div className='modal-body'>
                            <div>
                                <p className='mt-10'>Staff users are not allowed to access this application</p>                                        
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <Button label='Ok' className='pes-btn pes-btn-default ml-10' onClick={::this.onClose} />
                        </div>
                    </div>
                </Modal>}
            </span>
        );
    }
}

export default CurtisBankDialog;