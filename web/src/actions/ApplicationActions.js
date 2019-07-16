import * as types from './ActionTypes';

/**
 * Add api url from the list
 *
 * @param  {string}		url
 */
export function trackApiCallStarted(url) {
	return {
		type: types.API_CALL_STARTED,
		payload: {url}
	};
}

/**
 * Remove api url from the list
 *
 * @param  {string}		url
 */
export function trackApiCallCompleted(url) {
	return {
		type: types.API_CALL_COMPLETED,
		payload: {url}
	};
}


