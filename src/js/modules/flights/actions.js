import {
  RESET_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_REQUEST
} from './actionTypes'

export const resetData    = ()      => ({ type: RESET_DATA })
export const requestError = e       => ({ type: FETCH_DATA_FAILURE, error: e })
export const receiveData  = payload => ({ type: FETCH_DATA_SUCCESS, payload })
export const requestData  = (fromCity, toCities, startDate, endDate) => ({
  type: FETCH_DATA_REQUEST,
  payload: {fromCity, toCities, startDate, endDate}
})
