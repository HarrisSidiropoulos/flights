import {
  RESET_DATA,
  CANCEL_REQUEST,
  FETCH_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from './actionTypes'

export const INITIAL_STATE = { loading: false, cities: [], error: false, }

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESET_DATA:
    return {
      ...INITIAL_STATE,
    }
  case CANCEL_REQUEST: {
    return {
      ...state,
      loading: false,
    }
  }
  case FETCH_DATA_REQUEST:
    return {
      ...state,
      cities: [],
      error: false,
      loading: true,
    }
  case FETCH_DATA_FAILURE:
    return {
      loading: false,
      cities: [],
      error: action.error,
    }
  case FETCH_DATA_SUCCESS:
    return {
      ...state,
      error: false,
      loading: false,
      cities: action.payload,
    }
  default:
    return {
      ...state,
    }
  }
}
