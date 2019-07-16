import ApiUtils from './ApiUtils';
import Q from 'q';
import {amendPersonalDetailsSuccess, getHistoryDetailsSuccess} from '../actions/ServicingActions';
import ApiEndpoints from './ApiEndpoints';
import { GET_HISTORY_SUCCESS } from '../actions/ActionTypes';

export function searchBankDetails(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.BankDetails}/sortCode/${options.sortCode}/account/${options.bankName}`,
            method: 'GET',
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function addRegularWithdrawal(requestData){
    return function () {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.AddRegularWithdrawal}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function addressLookup(options){
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.ServicingAddressLookup}/${options.postCode}?house=${options.houseNamNumber}`,
            method: 'GET',
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function searchAddress(options){
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.ServicingSearchAddress}/${options.id}`,
            method: 'GET',
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function submitRegularWithdrawal(type, requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = '';

        if (type === 'add') {
            endPoint = ApiEndpoints.AddRegularWithdrawal;
        }
        else if (type === 'amend') {
            endPoint = ApiEndpoints.AmendRegularWithdrawal;
        }
        else {
            endPoint = ApiEndpoints.RemoveRegularWithdrawal;
        }

        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        }
        );
        return deferred.promise;
    };
}

export function amendPersonalDetails(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.ServicingAmendPersonalDetails}`,
            method: 'POST',
            requestData : options,
            track: true
        }, (res) => {
            // dispatch(amendPersonalDetailsSuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function amendOrganisationDetails(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.ServicingAmendOrganisationDetails}`,
            method: 'POST',
            requestData : options,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function amendTrusteeDetails(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.ServicingAmendTrusteeDetails}`,
            method: 'POST',
            requestData : options,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}


export function submitDistribution(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.SubmitDistribution;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}

export function submitIncomePayment(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.SubmitImcomePayment;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}

export function submitGmfSurrender(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.GmfServicingSurrender;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}

export function submitB34Surrender(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.B34ServicingSurrender;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}

export function submitTipSurrender(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.TipServicingSurrender;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}

export function searchFunds(options) {
    return function (dispatch) {
        let endPoint = '';
        if(window.location.origin.indexOf('http://localhost')>=0){
            if(!_.isUndefined(options.fundName) && !_.isEmpty(options.fundName)){
                endPoint = `${ApiEndpoints.SearchFund}${options.productType}`;
            }else{
                endPoint = `${ApiEndpoints.SearchFund}${options.productType}`;
            }
        }else{
            if(!_.isUndefined(options.fundName) && !_.isEmpty(options.fundName)){
                endPoint = `${ApiEndpoints.SearchFund}${options.productType}?searchText=${options.fundName}`;
            }else{
                endPoint = `${ApiEndpoints.SearchFund}${options.productType}`;
            }
        }
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: endPoint,
            method: 'GET',
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function submitSwitchFund(formType, requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = formType === 'fromSpecifiedFunds' ? ApiEndpoints.SubmitSpecifiedFunds : ApiEndpoints.SubmitRebalanceFunds;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}
export function submitRedirectContribution(requestData){
    return function () {
        const deferred = Q.defer();
        let endPoint = ApiEndpoints.SubmitRedirectContribution;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
            method: 'POST',
            requestData : requestData,
            track: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        });
        return deferred.promise;
    };
}
export function getHistory(options) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.History}`,
            method: 'GET',
            requestData : options.requestData,
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

export function getHistoryDetails(id) {
    return function (dispatch) {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.HistoryDetails}/${id}`,
            method: 'GET',
            track: true//,
            //handleError: true
        }, (res) => {
            dispatch(getHistoryDetailsSuccess(res));
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}