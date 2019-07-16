import * as types from './ActionTypes';

export function getMyProfileSuccess(userInfo) {
  return {
    type: types.GET_MY_PROFILE_SUCCESS,
    payload: userInfo
  };
}

export function getAgencyCodeSuccess(agencyCodes) {
  return {
    type: types.AGENCY_CODE_QUERY_SUCCESS,
    payload: agencyCodes
  };
}

export function getDelegationSuccess(delegations) {
  return {
    type: types.DELEGATION_QUERY_SUCCESS,
    payload: delegations
  };
}

export function getUserValidationSuccess(userValidation) {
  return {
    type: types.GET_USER_VALIDATION_SUCCESS, 
    payload: userValidation
  };
}

export function getUserValidationStatusSuccess(userStatus) {
  return {
    type: types.GET_USER_VALIDATION_STATUS_SUCCESS, 
    payload: userStatus
  };
}

export function updateUpgradeAccessTabClickedCount() {
  return {
    type: types.UPDATE_UPGRADE_ACCESS_CLICKED_COUNT, 
    payload: true
  };
}

// export function updateMyProfileFailure(error) {
//   return {
//     type: types.UPDATE_MY_PROFILE_FAILURE, 
//     payload: error
//   };
// }