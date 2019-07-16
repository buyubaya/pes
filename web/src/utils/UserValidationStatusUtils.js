import {UserValidationRole} from '../constants/MyProfile';

export default class UserValidationStatusUtils {   

    static isUpgradable(userStatus){
        return _.isEmpty(userStatus) == false && _.isEmpty(userStatus.role) ==false && userStatus.role.toUpperCase() == UserValidationRole.UPGRADABLE.toUpperCase();
    }

    static isValidating(userStatus){
        return _.isEmpty(userStatus) == false && _.isEmpty(userStatus.role) ==false && userStatus.role.toUpperCase() == UserValidationRole.VALIDATING.toUpperCase();
    }

    static isValidated(userStatus){
        return _.isEmpty(userStatus) == false && _.isEmpty(userStatus.role) ==false && userStatus.role.toUpperCase() == UserValidationRole.VALIDATED.toUpperCase();
    }

}
