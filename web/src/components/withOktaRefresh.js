import React, { PropTypes } from 'react';
import _ from 'lodash';

// OKTA
import Auth from '../okta/Auth';

// UTILS
import EnvironmentUtils from '../utils/EnvironmentUtils';
import TransitionUtils from '../utils/TransitionUtils';
import AuthUtils from '../utils/AuthUtils';


const withOktaRefresh = Comp => {
    return class WrappedComponent extends React.Component {
        constructor(props, context){
            super(props, context);
    
            const environment = EnvironmentUtils.get('environment');
            
            this.state = {
                oktaRefreshTime: environment.oktaRefreshTime || 1200000
            };

            this.refreshOktaSession = this.refreshOktaSession.bind(this);
    
            // OKTA
            this.auth = new Auth({
                ...environment.oktaConfig,
                history: []
            });
        }

        componentDidMount(){
            const { oktaRefreshTime } = this.state;
            this.refreshTimer = setTimeout(this.refreshOktaSession, oktaRefreshTime);
        }

        componentWillUnMount(){
            if(this.refreshTimer){
                clearTimeout(this.refreshTimer);
            }
        }

        async refreshOktaSession(){
            const { oktaRefreshTime } = this.state;

            try {
                await this.auth._oktaAuth.session.refresh();
                this.refreshTimer = setTimeout(this.refreshOktaSession, oktaRefreshTime);
            }
            catch(err) {
                console.warn('REFRESH ERROR', err);
                AuthUtils.signOut(this.auth);
            }
        }

        render(){
            return(
                <Comp {...this.props} />
            );
        }
    }
};


export default withOktaRefresh;