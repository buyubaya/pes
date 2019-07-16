import ApiUtils from './ApiUtils';
import Q from 'q';
import { getPlanSuccess, getWithdrawalSuccess, getHistorySuccess } from '../actions/PlanDetailsActions';
import ApiEndpoints from './ApiEndpoints';

export function getPlans(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.SearchPlan}`,
            method: 'POST',
            requestData : options.requestData,
            track: true//,
            //handleError: true
        }, (res) => {
            dispatch(getPlanSuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function getPlan(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.PlanDetails}${options.planId}`,
            method: 'GET',
            track: true
        }, (res) => {
            dispatch(getPlanSuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function filterWithdrawal(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.FilterWithdrawals}`,
            method: 'POST',
            requestData : options,
            track: true
        }, (res) => {
            dispatch(getWithdrawalSuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function getHistory(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.History}/${options.planId}`,
            method: 'GET',
            track: true//,
            //handleError: true
        }, (res) => {
            dispatch(getHistorySuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}