import * as types from './ActionTypes';

export function searchPlansSuccess(plans) {
  return {
    type: types.PLANS_SEARCH_SUCCESS, 
    payload:plans
  };
}

export function addPlanSuccess(plan) {
  return {
    type: types.PLAN_ADD_SUCCESS, 
    payload:plan
  };
}

export function clearPlans()
{
  return {
    type: types.CLEAR_PLANS    
  }; 
}

/* export function clearPlansValues(fields)
{
  return {
    type: types.CLEAR_PLANS_VALUES,
    payload: fields
  };
} */