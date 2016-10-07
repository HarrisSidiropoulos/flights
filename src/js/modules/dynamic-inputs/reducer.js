import {RESET_INPUTS, ADD_INPUT, REMOVE_INPUT, UPDATE_INPUT} from './actionTypes'
export const INITIAL_STATE = [{value:"Athens", error:""}, {value:"London", error:""}]

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESET_INPUTS:
    return [
      ...INITIAL_STATE
    ]
  case ADD_INPUT:
    return [
      ...state.slice(0, action.index+1),
      { value:"", error:"" },
      ...state.slice(action.index+1)
    ]
  case REMOVE_INPUT:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index+1)
    ]
  case UPDATE_INPUT:
    return [
      ...state.slice(0, action.index),
      { value:action.value, error:"" },
      ...state.slice(action.index+1)
    ]
  default:
    return state
  }
}
