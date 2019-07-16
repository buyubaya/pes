// Packages
import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function ApplicationReducer(state = InitialState.app, action) {
  switch (action.type) {
		case types.API_CALL_STARTED:
			return {
				urlList: _.uniq([...state.urlList, action.payload.url])
			};
		case types.API_CALL_COMPLETED:
			const previousStateClone = _.cloneDeep(state.urlList);

			_.remove(previousStateClone, (url) => {
				return url === action.payload.url;
			});

			return {
				urlList: previousStateClone
			};

			default:
				return state;
  }
}