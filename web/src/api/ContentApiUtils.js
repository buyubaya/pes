// Packages
import _ from 'lodash';
import Q from 'q';

// Utils
import ApiUtils from './ApiUtils';

export default class ContentApiUtils {
	static updateStoreContent(resourceName) {
		let resourceUrl = window.location.origin + '/resources/' + resourceName + '.json';

		const appState = PES.store.getState().content;
	
		if (_.includes(appState.contentApiCalledList, resourceName)) {
			return;
		}

		ApiUtils.makeAjaxRequest({
			url: resourceUrl,
			method: 'GET',
			track: false
		}, (res) => {
			if (res) {
				const ContentActions = require('../actions/ContentActions');

				// Track this api call
				PES.dispatch(ContentActions.trackContentApi(resourceName));

				// Store the content
				PES.dispatch(ContentActions.updateContentWithKey(resourceName,res));
			}
		});
	}

	static getEnvironment() {
		let configUrl = window.location.origin + '/config/web.json';

		const deferred = Q.defer();

		ApiUtils.makeAjaxRequest({
			url: configUrl,
			method: 'GET',
			track: false
		}, (res) => {
			deferred.resolve(res);
		}, (err, res) => {
			deferred.reject(err, res);
		});

		return deferred.promise;
	}
}
