import * as types from './ActionTypes';

export function getPlanSuccess(plan) {
  return {
    type: types.PLAN_GET_SUCCESS,
    payload: plan
  };
}

export function getWithdrawalSuccess(plan) {
  return {
    type: types.WITHDRAWAL_GET_SUCCESS,
    payload: plan
  };
}

export function getHistorySuccess(histories) {
  return {
    type: types.GET_HISTORY_SUCCESS, 
    payload:histories
  };
}