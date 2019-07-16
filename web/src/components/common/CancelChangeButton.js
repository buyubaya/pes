import React, {PropTypes} from 'react';
import Button from './Button';
import {Modal} from 'react-bootstrap';
import {TopHeader} from './Header';
import Footer from './Footer';
import * as LocalStorage from '../../utils/LocalStorage';
import TransitionUtils from '../../utils/TransitionUtils';
import UrlUtils from '../../utils/UrlUtils';
import {get as _get} from 'lodash';

class CancelChangeButton extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        };

        this.onClick = this.onClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
    }

    static propTypes = {
        onClick: PropTypes.func,
        modalClassName: PropTypes.string
    };

    static contextTypes = {
        plan: PropTypes.object,
        router: PropTypes.object
    };

    onClick(){        
        this.showModal();
    }

    showModal(){
        this.setState({show: true});
    }

    hideModal(){
        this.setState({show: false});
    }

    submitModal(){
        this.hideModal();
        let planID = this.props.planId || _get(this.context, 'plan.planDetail.planNumber');
        if(!planID){
            planID = location.pathname.split('/').pop();
        }
        if(planID){
            let currentTab = LocalStorage.get('currentTab') || '';
            const link = UrlUtils.getActualLink(`/plan-details/${planID}#${currentTab}`);
            TransitionUtils.navigateTo(link);
        }
    }

    render(){
        return(
            <span>
                <Button 
                    type='button'
                    className='pes-btn pes-btn-default' 
                    label='Cancel' 
                    onClick={this.onClick}
                />
                <Modal 
                    className={this.props.modalClassName ? ('pes-modal pes-authority-modal' + this.props.modalClassName) : 'pes-modal pes-authority-modal'} 
                    show={this.state.show} 
                    onHide={this.hideModal}
                > 
                    <div className='pes-modal'>
                        <span className='icon-close' onClick={this.hideModal}></span>
                        <div className='modal-title text-capitalize'>
                            {this.props.modalCancelTitle || 'Plan Enquiry'}
                        </div>
                        <div className='modal-body'>
                            <div>
                                <p>If you cancel this request you will lose all your pending changes.</p>
                                <p>Are you sure you want to cancel?</p>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <Button label='No' className='pes-btn pes-btn-default' onClick={this.hideModal} />
                            <Button label='Yes' className='pes-btn pes-btn-default ml-10' onClick={this.submitModal} />
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default CancelChangeButton;