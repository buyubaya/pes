import React from 'react';
import { PropTypes } from 'react';

import Auth from './Auth';
import EnvironmentUtils from '../utils/EnvironmentUtils';
import AuthUtils from '../utils/AuthUtils';
import TransitionUtils from '../utils/TransitionUtils';
import secureStorage from '../utils/SecureStorage';

import * as MyProfileApi from '../api/MyProfileApi';

const withOktaAuth = (WrappedComponent) => {
  class HOC extends React.Component {

    constructor(props, context){
      super(props, context);

      this.environment = EnvironmentUtils.get('environment');
      this.auth = new Auth(this.environment.oktaConfig);

      this.state = {
        authenticated: null,
        activeSesstion: null,
        userinfo: null,
        isAuthPending: true,
        error: null
      };
  
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthenticationAsync();
    }

    //overwrite isAuthenticated of okta-react
    async isAuthenticated() {
      const containsAuthTokens = /id_token|access_token|code/;

      // If there could be tokens in the url
      if (window.location && window.location.hash && containsAuthTokens.test(window.location.hash)) return null;

      const sessionExists = await this.auth._oktaAuth.session.exists();

      const hasTokens = !!(await this.auth.getAccessToken()) || !!(await this.auth.getIdToken());
       // SSO
      if (sessionExists && !hasTokens) {
        this.auth._oktaAuth.token.getWithRedirect(

          {
            responseType: ['token', 'id_token'],
            scopes: [ 'openid', 'email', 'profile', 'phone', 'groups' ],
            domain: this.environment.oktaDomain
          }
        );
        this.setState({ activeSesstion: true });
        console.log("Session existing - No token found");
      }

      //SLO
      if (hasTokens && !sessionExists) {
        console.log("No session existing - Has token");

        this.auth._oktaAuth.tokenManager.clear();
        PES.history.push('/');
        return false;
      }

      console.log("SessionExists=" + sessionExists  + ";Has token=" + hasTokens);
      return hasTokens;
    }

    checkAuthentication() {
      if (this.state.authenticated === false && !this.state.activeSesstion) {
        console.log("authenticated=false - No session");

        const redirectUrl = PES.history.getCurrentLocation().pathname ? PES.history.getCurrentLocation().pathname : '/';
        this.auth.login(redirectUrl);

        //PROXY LOGIN PAGE
        // const redirectUrl = PES.history.getCurrentLocation().pathname ? PES.history.getCurrentLocation().pathname : '/';
        // const referrerKey = 'prevSecureRouterReferrerPath';
        // localStorage.setItem(referrerKey,redirectUrl);
        // TransitionUtils.navigateTo(this.environment.oktaLoginProxy);
      }
    }

    async checkAuthenticationAsync() {
      this.isAuthenticated().then((authenticated)=>{
        this.setState({ authenticated });
         if (!authenticated){
          this.checkAuthentication();
         }
         else {          
            const userClaims = AuthUtils.getUserInfo();
            if (!userClaims || !userClaims.email) {
              const userId = AuthUtils.getUserId();
              MyProfileApi.getUserInfo({ userId: userId }).then((res) => {
                AuthUtils.setUserInfo(JSON.stringify(res));
                this.setState({userinfo: res });
                this.setState({ isAuthPending: false });
              }); 
            } else {
              this.setState({userinfo: userClaims });
              this.setState({ isAuthPending: false });
            }
          }
      })
      .catch(err => { 
        this.setState({ authenticated: false, error: err.toString()});
        this.setState({ isAuthPending: false });
      });
    }
    
    render() {
      if(this.state.authenticated == false && this.state.error){
        return (<div className='container'>
                  <p className='pes-intro-title color-link'>Plan Enquiry</p>
                  <p className='pes-text-belt'>
                    {this.state.error}
                  </p>
              </div>);
      }

      return (
        <WrappedComponent
          {...this.props}
          userinfo = {this.state.userinfo}
          isAuthPending = {this.state.isAuthPending}
        />
      );
    }
  }
    
  return HOC;
};

export default withOktaAuth;
