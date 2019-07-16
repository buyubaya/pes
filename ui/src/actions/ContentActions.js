import * as types from './ActionTypes';
import _ from 'lodash';

export function updateContent(content) {
	// If content is empty do nothing
	if (_.isEmpty(content)) {
		return {};
	}

	// If content comes back with more than one key do nothing
	if (Object.keys(content).length !== 1) {
		return {};
	}

	// Key can be assumed to be the only property of content
	const key = Object.keys(content)[0];

	return {
		type: types.CONTENT_UPDATED,
		payload: {key, content}
	};
}

export function updateContentWithKey(key, content) {
	if (_.isEmpty(content)) {
		return null;
	}

	return {
		type: types.CONTENT_UPDATED,
		payload: {key,
			content: {
				[key]: content
			}
		}
	};
}

export function trackContentApi(content) {
	return {
		type: types.CONTENT_API_CALLED,
		payload: {componentName: content}
	};
}
