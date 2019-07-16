import React, { PropTypes } from 'react';
import _ from 'lodash';

// OKTA
import Auth from '../okta/Auth';

// UTILS
import EnvironmentUtils from '../utils/EnvironmentUtils';
import TransitionUtils from '../utils/TransitionUtils';
import AuthUtils from '../utils/AuthUtils';


const withInactivity = Comp => {
    return class WrappedComponent extends React.Component {
        constructor(props, context){
            super(props, context);
    
            const environment = EnvironmentUtils.get('environment');
            
            this.state = {
                signOutTime: environment.sessionTimeOut || 1200000
            };
    
            this.events = [
                'load',
                'mousemove',
                'mousedown',
                'mousewheel',
                'click',
                'scroll',
                'keypress'
            ];
    
            this.resetTimeout = this.resetTimeout.bind(this);
            this.setTimeout = _.debounce(this.setTimeout.bind(this), 500);
            this.signOut = this.signOut.bind(this);
            // OKTA
            this.auth = new Auth({
                ...environment.oktaConfig,
                history: []
            });
        }
    
        componentDidMount(){
            const { signOutTime } = this.state;
            for (let i in this.events) {
                window.addEventListener(this.events[i], this.resetTimeout);
            }
            this.signOutTimer = setTimeout(this.signOut, signOutTime);
        }

        componentWillUnmount(){
            for (let i in this.events) {
                window.removeEventListener(this.events[i], this.resetTimeout);
            }
        }
    
        signOut(){
            for (let i in this.events) {
                window.removeEventListener(this.events[i], this.resetTimeout);
            }
    
            // LOG OUT
            this.auth.logout('/')
            .then(() => {
                localStorage.removeItem('token');
                AuthUtils.removeUserInfo();
                TransitionUtils.navigateTo('/');
            });
        }
    
        resetTimeout(){
            if(this.signOutTimer){
                clearTimeout(this.signOutTimer);
            }
            this.setTimeout();
        }
    
        setTimeout(){
            const { signOutTime } = this.state;
            this.signOutTimer = setTimeout(this.signOut, signOutTime);
        }
    
        render(){
            return(
                <Comp {...this.props} />
            );
        }
    } 
};


export default withInactivity;
