import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function PlanReducer(state = InitialState.searchPlan, action) {
  switch (action.type) {
    case types.PLANS_SEARCH_SUCCESS:
      return {plans: action.payload};

    case types.PLAN_ADD_SUCCESS:      
      return {plans:_.uniq([...state.plans, action.payload])};

    case types.CLEAR_PLANS:
      return {plans: []};

    default:
      return state;
  }
}
