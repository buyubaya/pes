// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

// SCSS
import '../../assets/stylesheets/index.scss';

// COMPONENTS
import LoadingDots from './common/LoadingDots';

// ROUTER CONFIG
import {withRouterConfig} from './RouterConfig';

// INACTIVITY
import withInactivity  from './withInactivity';

//Okta
import withOktaAuth  from '../okta/withOktaAuth';

class App extends React.Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		app: PropTypes.object,
		userinfo: PropTypes.object,
		isAuthPending: PropTypes.bool
	}

	render() {
		const isApiRequestPending = _.get(this.props.app, 'urlList.length') > 0;
		return (
			<div>
				{(isApiRequestPending || this.props.isAuthPending) && <LoadingDots interval={100} dots={20} />}
				<div>
					{
						this.props.isAuthPending==false 
						&& React.cloneElement(this.props.children, {userinfo: this.props.userinfo})
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		app: state.app
	};
}


export default compose(
	withOktaAuth,
	connect(mapStateToProps),
	withRouterConfig,
	withInactivity
)(App);
