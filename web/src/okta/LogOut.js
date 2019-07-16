import React, { Component } from 'react';
import Auth from './Auth';
import EnvironmentUtils from '../utils/EnvironmentUtils';
import AuthUtils from '../utils/AuthUtils';
import LoadingDots from '../components/common/LoadingDots';

export default class LogOut extends Component {
  constructor(props) {
    super(props);

    const environment = EnvironmentUtils.get('environment');
    this.auth = new Auth({
      ...environment.oktaConfig,
      history: []
    });
  }

componentDidMount() {
  this.auth.logout(PES.basename)
  .then(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentTab');
    sessionStorage.removeItem('SearchFormSession');
    AuthUtils.removeUserInfo();
    PES.history.push('/');
  });
}

render() {
  return (<LoadingDots interval={100} dots={20} />);
  }
};
