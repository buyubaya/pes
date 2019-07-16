import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function MyProfileReducer(state = InitialState.myProfile, action) {
  switch (action.type) {
    case types.GET_MY_PROFILE_SUCCESS:
    {
      const stateClone = _.cloneDeep(state);
      stateClone.userInfo =_.assign({}, state.userInfo, action.payload);
      return stateClone; 
    }
    case types.AGENCY_CODE_QUERY_SUCCESS:
    {
      const stateClone = _.cloneDeep(state);
      _.set(stateClone, 'agencyCodes', action.payload.agencyCodes);
      //stateClone.agencyCodes =_.assign([], state.agencyCodes, action.payload.agencyCodes);
      return stateClone; 
    }
    case types.DELEGATION_QUERY_SUCCESS:
    {
      const stateClone = _.cloneDeep(state);
      stateClone.delegations =_.assign({}, state.delegations, action.payload);
      return stateClone; 
    }
    case types.GET_USER_VALIDATION_STATUS_SUCCESS:
    {
      const stateClone = _.cloneDeep(state);
      stateClone.userStatus =_.assign({}, state.userStatus, action.payload);
      return stateClone; 
    }
    case types.UPDATE_UPGRADE_ACCESS_CLICKED_COUNT:
    {
      const stateClone = _.cloneDeep(state);
      stateClone.tabUpgradeAccessClickedCount++;
      return stateClone; 
    }
    default:
      return state;
  }
}
