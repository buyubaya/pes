import superagent from 'superagent';
import _ from 'lodash';

import * as noCache from 'superagent-no-cache';

import TransitionUtils from '../utils/TransitionUtils';
import AuthUtils from '../utils/AuthUtils';
import EnvironmentUtils from '../utils/EnvironmentUtils';
import * as ApplicationActions from '../actions/ApplicationActions';
import { debug } from 'util';

export default class ApiUtils {

	/**
	 * Common utility function to send ajax requests
	 *
	 * @method		makeAjaxRequest
	 * @param		{object}    options
	 * @param		{Function}  onSuccess
	 * @param		{Function}  onFail
	 */
	static makeAjaxRequest(options, onSuccess, onFail, dispatch ) {
		options = _.defaults(
			options,
			{
				track: false,
				accept: 'application/json',
				contentType: 'application/json'
			});

		let environment = EnvironmentUtils.get('environment');

		// prefix the URL with the environment base URL if it is not already an absolute URL
		if (!!environment && !_.startsWith(options.url, 'http')) {
			options.url = `${environment.apiBaseUrl}${options.url}`;
		}

		const request = superagent(options.method, options.url);

		request.set('Accept', options.accept);
		request.set('Content-Type', options.contentType);
	

		//with token
		const token = localStorage.getItem('token');
		if(token){
			request.set('Authorization', 'Bearer ' + token );
		}

		//add in user claims
		const userinfo = AuthUtils.getUserInfo();
		if(userinfo.email){
			request.set('UserInfoType', AuthUtils.getUserInfoType(userinfo));
		}

		// This is required to ensure that the session cookie is sent to the APIs
		request.withCredentials();

		if (options.requestData) {			
			request.send(options.requestData);
		}

		if (options.requestQuery) {			
			request.query(options.requestQuery);
		}

		if (options.track && dispatch) {
			dispatch(ApplicationActions.trackApiCallStarted(options.url));
		}

		if(options.method.toLowerCase() == 'get')
		{			
			request.use(noCache.default)
				.end((err, res) => {
				if (options.track && dispatch) {
					dispatch(ApplicationActions.trackApiCallCompleted(options.url));
				}
	
				if (err) {
					if (options.handleError && onFail) {
						onFail(err, res);
					} else {
						ApiUtils.handleGeneralErrors(options, err, res, {onSuccess, onFail});
					}
	
					return;
				}
				this._onSuccess(onSuccess, res, options.isRaw);
			});
		}
		else{
			request.end((err, res) => {
				if (options.track && dispatch) {
					dispatch(ApplicationActions.trackApiCallCompleted(options.url));
				}
	
				if (err) {
					if (options.handleError && onFail) {
						onFail(err, res);
					} else {
						ApiUtils.handleGeneralErrors(options, err, res, {onSuccess, onFail});
					}
	
					return;
				}
				this._onSuccess(onSuccess, res, options.isRaw);
			});
		}

		return request;
	}

	static handleGeneralErrors(options, err, res, callbacks) {
		const {onSuccess, onFail} = callbacks;
		let environment = EnvironmentUtils.get('environment');

		if (res && (res.status == 200 || res.status == 302)) { //eslint-disable-line no-lonely-if
			this._onSuccess(onSuccess, res);			
		}
		else
		{
			console.error('Unhandled ApiUtils error!', err.message, err); //eslint-disable-line no-console
			TransitionUtils.navigateTo(environment.errorPages.pes500);	
		}
	}

	static _onSuccess(onSuccess, res, isRaw = false) {
		if (!onSuccess) {
			return;
		}

		if (_.isEmpty(res)) {
			onSuccess();
			return;
		}

		let response = res;

		if (!_.isEmpty(res.body)) {
			response = res.body;
		}

		if (!_.isEmpty(res.text)) {
			if(!isRaw){
				response = JSON.parse(res.text);
			}
		}

		onSuccess(response, res.status);
	}

	static isIE() {
		const ua = navigator.userAgent;
		/* MSIE used to detect old browsers and Trident used to newer ones*/
		const is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;		
		return is_ie; 
	  }

}
