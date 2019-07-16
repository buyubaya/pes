import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import Button from './Button';
import {TopHeader} from './Header';
import Footer from './Footer';
import UrlUtils from '../../utils/UrlUtils';
import _ from 'lodash';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

/******************** LINK AUTHORITY ********************/
class LinkAuthority extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    static propTypes = {
        link: PropTypes.string,
        btnClassName: PropTypes.string,
        modalClassName: PropTypes.string,
        authority: PropTypes.bool
    }

    handleClick(e){
        const {onClick, authority} = this.props;

        if(!authority){
            e.preventDefault();
            this.showModal && this.showModal();  
            onClick && onClick();
        }
    };

    showModal(){
        this.setState({show: true});
    }

    hideModal(){
        this.setState({show: false});
    }

    render(){
        const {children, btnClassName, modalClassName} = this.props;
        let {link} = this.props;
        
        let environment = EnvironmentUtils.get('environment');
        let pdfUrl = environment.financialAdvisorAuthorityFormUrl;

        link = UrlUtils.getActualLink(link);
        return(
            <span>
                <a href={link} className={btnClassName} onClick={this.handleClick}>{children}</a>
                <Modal 
                    className={modalClassName ? ('pes-modal ' + modalClassName) : 'pes-modal'} 
                    show={this.state.show}
                    onHide={this.hideModal}
                > 
                    <div className='pes-modal'>
                        <span className='icon-close' onClick={this.hideModal}></span>
                        <div className='modal-title text-capitalize'>
                            Client Authority Required
                        </div>
                        <div className='modal-body'>
                            <p>To enable you to perform this task you must first obtain your client's authority.</p>
                            <p>Attached is the appropriate Financial Adviser Authority Form which you will need to complete and have signed by your client.</p>
                            <p>Once completed, please return to the address on the form.</p>
                        </div>
                        <div className='modal-footer'>
                            <div className='row'>
                                <div className='pull-left'>
                                    <a href={pdfUrl} className='text-underline'><img src={require('../../../assets/images/icon_pdf.png')} className='pes-icon icon-pdf mr-5' />Financial Advisor Authority Form</a>
                                </div>
                                <div className='pull-right'>
                                    <Button className='pes-btn pes-btn-default' label='Close' onClick={this.hideModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </span> 
        );
    }
}

export default LinkAuthority;