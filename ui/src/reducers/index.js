import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApplicationReducer from './ApplicationReducer';
import PlanReducer from './PlanReducer';
import ContentReducer from './ContentReducer';
import PageReducer from './PageReducer';
import PlanDetailsReducer from './PlanDetailsReducer';
import ServicingReducer from './ServicingReducer';
import MyProfileReducer from './MyProfileReducer';

import * as types from '../actions/ActionTypes';


const rootReducer = combineReducers({
  form: formReducer.plugin({
    searchPlan: (state, action) => { 
      switch(action.type) {
        case types.RESET_FORM_SUCCESS:
        {          
          
          return {
                  ...state,
                  values: {
                      planNumber01: undefined,
                      planNumber02: undefined,
                      planNumber03: undefined,
                      planNumber04: undefined,
                      planNumber05: undefined
                  }
                };
        }
        default:
          return state;
      }
    }
  }),
  app: ApplicationReducer,
  content: ContentReducer,
  searchPlan: PlanReducer,
  page: PageReducer,
  plan: PlanDetailsReducer,
  servicing: ServicingReducer,
  myProfile: MyProfileReducer  
});

export default rootReducer;
