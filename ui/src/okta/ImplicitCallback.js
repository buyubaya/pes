/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { Component } from 'react';
import Auth from './Auth';
import EnvironmentUtils from '../utils/EnvironmentUtils';
import LoadingDots from '../components/common/LoadingDots';
import TransitionUtils from '../utils/TransitionUtils';
import AuthUtils from '../utils/AuthUtils';

export default class ImplicitCallback extends Component {
  constructor(props) {
    super(props);

    this.environment = EnvironmentUtils.get('environment');
    this.auth = new Auth(this.environment.oktaConfig);

    this.state = {
      authenticated: null,
      error: null,
      oktaConfig: this.environment.oktaConfig
    };
  }

componentDidMount() {
    var url = window.location.href;
    var hashIndex = url.indexOf('#');
    if(hashIndex < 0){
      console.log("No hash");
      TransitionUtils.navigateTo('/');
    }else{
      this.auth.handleAuthentication()
      .then(() => {
        this.auth.getAccessToken().then((accessToken)=>{
          localStorage.setItem('token', accessToken);
          AuthUtils.removeUserInfo();
          this.setState({ authenticated: true });
          const referrerKey = 'prevSecureRouterReferrerPath';
          const location = localStorage.getItem(referrerKey) || "/";
          localStorage.removeItem(referrerKey);
          PES.history.push(location);
        });
      })
      .catch(err => { 
        this.setState({ authenticated: false, error: err.toString() });
        console.error(err.toString());
        TransitionUtils.navigateTo(this.environment.errorPages.pes500);
      });

    }    
  }

  render() {
    return (<LoadingDots interval={100} dots={20} />);

  //   if (this.state.authenticated === null) {
  //     return (<LoadingDots interval={100} dots={20} />);
  //   }

  //   return (<div className='container'>
  //     <p className='pes-intro-title color-link'>Plan Enquiry</p>
  //     <p className='pes-text-belt'>
  //       {this.state.error}
  //     </p>
  // </div>);
  }
};
