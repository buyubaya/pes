import ApiUtils from './ApiUtils';
import Q from 'q';
import ApiEndpoints from './ApiEndpoints';
import StringUtils from '../utils/StringUtils';
import {getMyProfileSuccess} from '../actions/MyProfileActions';


export function getMyProfile(options) {
    return function (dispatch)
    {
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.UserInfo}${options.userId}`,
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

export function getUserInfo(options) {
    const deferred = Q.defer();
    ApiUtils.makeAjaxRequest({
        url: `${ApiEndpoints.UserInfo}${options.userId}`,
        method: 'GET',
        track: false
    }, (res) => {
        //console.log('update userInfo to Store', res);
        deferred.resolve(res);
    }, (err, res) => {
        deferred.reject(err, res);
    });
    return deferred.promise;
}

export function getAgencyCodes(options){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.AgencyCodes}?userId=${options.userId}`,
            method: 'GET',            
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function addAgencyCode(requestData){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.AgencyCodes}`,
            method: 'POST',
            requestData : requestData,
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function saveAgencyCode(options){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.AgencyCodes}?userId=${options.userId}&agencyCode=${options.agencyCode}`,
            method: 'PUT',
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function deleteAgencyCode(userId, requestData){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.AgencyCodes}?userId=${userId}`,
            method: 'DELETE',
            requestData : requestData,
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function getDelegations(options){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.Delegations}?userId=${options.userId}&role=${options.role}`,
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

export function addDelegation(requestData){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.Delegations}`,
            method: 'POST',
            requestData : requestData,
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function deleteDelegation(requestData){
    return function(dispatch){
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${ApiEndpoints.Delegations}`,
            method: 'DELETE',
            requestData : requestData,
            track: true//,
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function makeUpgradeAccessRequest(requestData){
    return function(dispatch){
        const deferred = Q.defer();
        const endPoint = ApiEndpoints.MyProfileUpgradeAccess;
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
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

export function makeValidationCodeRequest(userId, validationCode){
    return function(dispatch){
        const deferred = Q.defer();
        const endPoint = StringUtils.format(ApiEndpoints.MyProfileValidationCode, userId, validationCode);
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,
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

export function updateUserProfile(options){
    return function(dispatch){
        const deferred = Q.defer();
        const endPoint = StringUtils.format(ApiEndpoints.UpdateUserInfo, options.userId);        
        ApiUtils.makeAjaxRequest({
            url: `${endPoint}`,  
            method: 'PUT',
            requestData : options.requestData,
            track: true
            //handleError: true
        }, (res) => {
            deferred.resolve(res);
        }, (err, res) => {
            deferred.reject(err, res);
        },
        dispatch);
        return deferred.promise;
    };
}

export function getUserValidationStatus(userId) {
    return function (dispatch)
    {
        const endPointUrl = StringUtils.format(ApiEndpoints.UserValidationStatus, userId);
        const deferred = Q.defer();
        ApiUtils.makeAjaxRequest({
            url: `${endPointUrl}`,
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