import * as SessionStorage from './SessionStorage';
import AuthUtils from './AuthUtils';
import {UserGroups} from '../constants/UserGroups';
import {UserRole} from '../constants/MyProfile';

export default class SecurityUtils {
    static isServicingRole(){
        let userInfo = AuthUtils.getUserInfo();
        return userInfo.userGroups ? (userInfo.userGroups.indexOf(UserGroups.SERVICING) != -1) : false;
    }

    static isAdviserRole(userInfo){
        return _.isEmpty(userInfo) == false && _.isEmpty(userInfo.role) ==false && userInfo.role.toUpperCase() == UserRole.ADVISER.toUpperCase();
    }

    static isPARole(userInfo){
        return _.isEmpty(userInfo) == false && _.isEmpty(userInfo.role) ==false && userInfo.role.toUpperCase() == UserRole.PA.toUpperCase();
    }

    static isStaffRole(userInfo){
        return _.isEmpty(userInfo) == false && _.isEmpty(userInfo.role) ==false && userInfo.role.toUpperCase() == UserRole.STAFF.toUpperCase();
    }

}