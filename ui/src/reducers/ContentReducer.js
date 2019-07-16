// Packages
import _ from 'lodash';

import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function ContentReducer(state = InitialState.content, action) {
  switch (action.type) {
    case types.CONTENT_UPDATED: 
    {
      const stateClone = _.cloneDeep(state);
      stateClone[action.payload.key] =_.assign({}, state[action.payload.key], action.payload.content[action.payload.key]);
      return stateClone; 
    }

    case types.CONTENT_API_CALLED:
    {
      const stateClone = _.cloneDeep(state);
      stateClone.contentApiCalledList = _.uniq([...state.contentApiCalledList, action.payload.componentName]);
      return stateClone;
    }
      

    default:
      return state;
  }
}