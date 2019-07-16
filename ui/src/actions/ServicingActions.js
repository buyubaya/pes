import * as types from './ActionTypes';

export function getFundsSuccess(funds) {
	return {
		type: types.FUNDS_GET_SUCCESS,
		payload: funds
	};
}

export function amendPersonalDetailsSuccess(res) {
	return {
		type: types.AMEND_PERSONAL_DETAILS_SUCCESS,
		payload: res
	};
}
export function searchBankDetailsSucecss(bankInfo) {
  return {
    type: types.BANK_SEARCH_SUCCESS, 
    payload:bankInfo
  };
}

export function getHistoryDetailsSuccess(historyDetails) {
  return {
    type: types.GET_HISTORY_DETAILS_SUCCESS, 
    payload: historyDetails
  };
}