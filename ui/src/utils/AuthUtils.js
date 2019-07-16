import {UserGroups} from '../constants/UserGroups';
import * as MyProfileApi from '../api/MyProfileApi';
import * as MyProfileActions from '../actions/MyProfileActions';
import secureStorage from './SecureStorage';

export default class AuthUtils {
	static getUserId() {
		const tokens = localStorage.getItem('okta-token-storage');
		const jsonToken = tokens ? JSON.parse(tokens) : null;
		return jsonToken && jsonToken.idToken ? jsonToken.idToken.claims.preferred_username : null;
	}

	static getUserGroups() {
		const userInfo = AuthUtils.getUserInfo();
		return userInfo? userInfo.userGroups: [];		
	}

	static getUserInfo() {
		let userinfo = secureStorage.getItem('userinfo');
        return userinfo ? JSON.parse(userinfo) : {};
	}

	static setUserInfo(data) {
		return secureStorage.setItem('userinfo', data);
	}

	static removeUserInfo() {
		return secureStorage.removeItem('userinfo');
	}

	static hasPermissionOnExistingBussinessTab() {
		const userGroups = AuthUtils.getUserGroups();
        return (userGroups.indexOf(UserGroups.ENQUIRY) >= 0 || userGroups.indexOf(UserGroups.STAFF) >= 0);
	}

	static isStaff() {
		const userGroups = AuthUtils.getUserGroups();
        return userGroups? (userGroups.indexOf(UserGroups.STAFF) >= 0) : false;
	}

	static getUserInfoType(userinfo) {
		return JSON.stringify({
			agentCode: userinfo.agentCode,
			userID: AuthUtils.getUserId(),
			advisorName: userinfo.forename + userinfo.surname,
			emailAddress: userinfo.email,
			postCode: userinfo.alternatePostCode ? userinfo.alternatePostCode : userinfo.firmPostcode,
			fsaNumber: userinfo.fsaNumber,
			contactNumber: userinfo.contactNumber,
			agentFirm: userinfo.firmName,
			staffUser: AuthUtils.isStaff()
		});
	}

	static updateUserInfo(dispatch) {
		const userId = this.getUserId();

		return MyProfileApi.getUserInfo({ userId })
		.then(res => {
			console.log('update user info', res);
			dispatch(MyProfileActions.getMyProfileSuccess(res));
			AuthUtils.setUserInfo(JSON.stringify(res));
			return Promise.resolve(res);
		});
	}
}
