import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function PageReducer(state = InitialState.page, action) {
  switch (action.type) {
    case types.SKIP_DIRTY:
      return {skipDirty: action.payload};

    default:
      return state;
  }
}
