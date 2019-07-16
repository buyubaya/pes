import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createHistory, useBasename } from 'history';
import Router from './Router.js';

import configureStore from './store/configureStore';
import ContentApiUtils from './api/ContentApiUtils';
import EnvironmentUtils from './utils/EnvironmentUtils';
//import * as SessionStorage from './utils/SessionStorage';
import config from '../config/config';

//store the environment
window.PES = {basename: config.basename};

const store = configureStore();

const history = useBasename(createHistory)({
	basename: config.basename
});

ContentApiUtils.getEnvironment()
		.then((environment) => {
			EnvironmentUtils.set('environment', environment);
					
			//render the app
			const site = (
				<Provider store={store}>
					<Router history={history} store={store} />
				</Provider>
			);

			ReactDOM.render(site, document.getElementById('app'));
		})
		.catch((err) => {
			console.log(err); // eslint-disable-line no-console
		});
	




