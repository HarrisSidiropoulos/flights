/*eslint no-console: */
/*eslint indent: */
import getWeatherAndFlights from '../api-client/getWeatherAndFlights'

export const RESET_DATA = 'RESET';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const resetData = () => ({ type: RESET_DATA })
export const requestData = () => ({ type: FETCH_DATA_REQUEST })
export const requestError = (e) => ({ type: FETCH_DATA_FAILURE, error: e })
export const receiveData = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  }
}

export const loadData = (fromCity, toCities, date) => {
  return dispatch => {
    dispatch(requestData());
    return getWeatherAndFlights(fromCity, toCities, date)
      .then(response => dispatch(receiveData(response)))
      .catch(e => {
        return dispatch(requestError(e.toString()))
      })
  }
}
