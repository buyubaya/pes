import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function ServicingReducer(state = InitialState.servicing, action) {
	switch (action.type) {
		case types.BANK_SEARCH_SUCCESS:
			return {bankInfo: action.payload};
		case types.GET_HISTORY_SUCCESS:
			return {history: action.payload};
			case types.GET_HISTORY_DETAILS_SUCCESS:
			return {historyDetails: action.payload};
		default:
			return state;
	}
}
