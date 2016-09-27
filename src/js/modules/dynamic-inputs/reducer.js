import {RESET_CITIES, ADD_CITY, REMOVE_CITY, UPDATE_CITY} from './actionTypes'
export const INITIAL_STATE = [{value:"Athens", error:""}]

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESET_CITIES:
    return INITIAL_STATE
  case ADD_CITY:
    return [
      ...state.slice(0, action.index+1),
      { value:"", error:"" },
      ...state.slice(action.index+1)
    ]
  case REMOVE_CITY:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index+1)
    ]
  case UPDATE_CITY:
    return [
      ...state.slice(0, action.index),
      { value:action.value, error:"" },
      ...state.slice(action.index+1)
    ]
  default:
    return state
  }
}
