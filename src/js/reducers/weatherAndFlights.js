/*eslint indent: */
import {FETCH_DATA_REQUEST, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from '../actions'
export const INITIAL_STATE = { loading: false, cities: [] }

export default function weatherAndFlights(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        cities: [],
        loading: true
      }
    case FETCH_DATA_FAILURE:
      return {
        loading: false,
        cities: [],
        error: action.error
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
