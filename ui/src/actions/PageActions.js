import * as types from './ActionTypes';
import { change } from 'redux-form';


export function skipDirty(skipDirty) {
  return {
    type: types.SKIP_DIRTY, 
    payload: skipDirty
  };
}

export function resetForm() {
  return {
    type: types.RESET_FORM_SUCCESS, 
    payload: {}
  };
}



