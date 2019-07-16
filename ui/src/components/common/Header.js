import React from 'react';
import {Navbar} from 'react-bootstrap';
import LoadingDots from './LoadingDots';
import TransitionUtils from '../../utils/TransitionUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';
import AuthUtils from '../../utils/AuthUtils';

// OKTA
import Auth from '../../okta/Auth';


class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        const environment = EnvironmentUtils.get('environment');
        const headerUrl = environment.headerUrl;
 
        this.state = {
            list: [
                {label: 'Plan Enquiry', path: '/', excludes: [PES.basename + headerUrl.myProfile]},
                {label: 'My Profile', path: PES.basename + headerUrl.myProfile}
            ],
            isSigningOut: false
        };

        this.onClick = this.onClick.bind(this);
        this.signOut = this.signOut.bind(this);
        // OKTA
        this.auth = new Auth({
            ...environment.oktaConfig,
            history: []
        });
    }

    onClick(e, item){
        e.preventDefault();
        TransitionUtils.navigateTo(item.path);
    }

    signOut(){
        this.setState({ isSigningOut: true });
        this.auth.logout('/')
        .then(() => {
            localStorage.removeItem('token');
            AuthUtils.removeUserInfo();
            TransitionUtils.navigateTo('/');
            // this.setState({ isSigningOut: false });
        });
    }

    isLinkActive(link){
        let pathname = (window.location.pathname === '') ? PES.basename : window.location.pathname;
        const reg = new RegExp('^'+ link.path, 'g');
        
        if(link.excludes && link.excludes.length > 0){
            if(reg.test(pathname)){
                for(let i=0, len=link.excludes.length; i<len; i++){
                    const excludesReg = new RegExp('^'+ link.excludes[i], 'g');
                    if(excludesReg.test(pathname)){
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return reg.test(pathname);
        }
    }

    renderMenuItems(listItems){
        return (
            listItems.map((item, index) =>
            <li 
                className = {this.isLinkActive(item) ? 'is-active nav-item' : 'nav-item'}
                key={index}
            >
                <a className='nav-item-link' href={item.path} onClick={e => this.onClick(e, item)}>
                    {item.label}
                </a>
            </li>
            ));
    }

    render() {
        const { isSigningOut } = this.state;
        const environment = EnvironmentUtils.get('environment');
        const headerUrl = environment.headerUrl;
        let userinfo = AuthUtils.getUserInfo();
        const userName = [userinfo.forename, userinfo.surname].join(' ');
        
        return (
            <Navbar className='pes-header-area' bsStyle={null}>
                <div className='logo-area clearfix'>
                    <a href={headerUrl.home}>
                        <img src={require('../../../assets/images/ZurichLogoMobile.png')} alt='Zurich' className='logo-img' />
                    </a>
                </div>
                <div className='hidden-md clearfix'>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <div className='main-menu-area'>
                        <ul className='nav'>
                            {this.renderMenuItems(this.state.list)}
                            <li className='nav-item nav-item-right list-inline'>
                                <div className='nav-item list-inline-item'>{userName}</div>
                                <a href='javascript:;' onClick={this.signOut} className='nav-item-link list-inline-item'>Sign Out</a>
                                {
                                    isSigningOut &&
                                    <LoadingDots interval={100} dots={20} />
                                }
                            </li>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export class MyProfileHeader extends Header {
    constructor(props, context) {
        super(props, context);

        const environment = EnvironmentUtils.get('environment');
        const headerUrl = environment.headerUrl;
        
        this.state = {
            list: [
                {label: 'Plan Enquiry', path: PES.basename, excludes: [PES.basename + headerUrl.myProfile]},
                {label: 'My Profile', path: PES.basename + headerUrl.myProfile}
            ]
        };
    }
};


export class TopHeader extends Header {
    constructor(props, context) {
        super(props, context);

        const environment = EnvironmentUtils.get('environment');
        const headerUrl = environment.headerUrl;
        
        this.state = {
            list: []
        };
    }
};


export default Header;