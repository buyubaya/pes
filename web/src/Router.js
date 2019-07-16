import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import _ from 'lodash';

import App from './components/App';
import ExistingBusinessPage from './pages/ExistingBusinessPage';
// import NotFound from './pages/NotFound';
// import HelpPage from './pages/HelpPage';
// import ErrorPage from './pages/ErrorPage';
import MyProfilePage from './pages/MyProfilePage';
import SearchPage from './pages/SearchPage';
import PlanDetailsPage from './pages/PlanDetailsPage';

import ServicingPage from './pages/servicing/ServicingPage';
import ServicingHistoryDetailsPage from './pages/servicing/ServicingHistoryDetailsPage';
import ServicingIncomePaymentPage from './pages/servicing/ServicingIncomePaymentPage';
import ServicingRegularWithdrawalPage from './pages/servicing/ServicingRegularWithdrawalPage';
import ServicingAmendPage from './pages/servicing/ServicingAmendPage';
import ServicingSwitchFundPage from './pages/servicing/ServicingSwitchFundPage';
import ServicingSurrenderPage from './pages/servicing/ServicingSurrenderPage';
import ServicingRedirectContributionPage from './pages/servicing/ServicingRedirectContributionPage';
import ServicingDistributionPage from './pages/servicing/ServicingDistributionPage';
import ImplicitCallback from './okta/ImplicitCallback';
import LogOut from './okta/LogOut';
import EnvironmentUtils from './utils/EnvironmentUtils';

class AppRouter extends React.Component {
	
	static propTypes = {
		history: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	};

	componentWillMount() {
		_.assign(PES, {
			history: this.props.history,
			dispatch: this.props.store.dispatch,
			store: this.props.store
		});
	}

	render() {
		const _shouldScrollToTop = () => {
			window.scrollTo(0, 0);
		};
		
		const environment = EnvironmentUtils.get('environment');

		return (
			<Router
				history={this.props.history}>
				<Route path='/' component={App}>
					<Route component={ExistingBusinessPage}>
						<IndexRoute component={SearchPage} />
						<Route path='/' component={SearchPage} />
						<Route path='/plan-details/:id' component={PlanDetailsPage} />

						<Route path='/servicing' component={ServicingPage} >
							<Route path='/servicing/history-details/:id/:historyId' component={ServicingHistoryDetailsPage} />
							<Route path='/servicing/income-payment/:id' component={ServicingIncomePaymentPage} />
							<Route path='/servicing/regular-withdrawal/:id' component={ServicingRegularWithdrawalPage} />
							<Route path='/servicing/amend/:amendType/:id(/:planHolderIndex)' component={ServicingAmendPage} />
							<Route path='/servicing/switch-fund/:id' component={ServicingSwitchFundPage} />
							<Route path='/servicing/surrender/:id' component={ServicingSurrenderPage} />
							<Route path='/servicing/redirect-contribution/:id' component={ServicingRedirectContributionPage} />
							<Route path='/servicing/distribution/:id' component={ServicingDistributionPage} />
						</Route>
					</Route>

					<Route path='/profile' component={MyProfilePage} />
					{/* <Route path='/not-found' component={NotFound} /> */}
					<Route path='/not-found' component={ () => {window.location = environment.errorPages.pes404; return null;}} />
					{/* <Route path='/error' component={ErrorPage} /> */}
				</Route>
				<Route path='/implicit/callback' component={ImplicitCallback} />
				<Route path='/log-out' component={LogOut} />
				{/* <Route path='/help-page(/tip)' component={HelpPage} /> */}
				<Redirect from='*' to='/not-found'/>
			</Router>
		);
	};
}


export default AppRouter;