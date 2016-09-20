/*eslint no-console: */
/*eslint indent: */
import getWeatherAndFlights from '../api-client/getWeatherAndFlights'
import {Observable} from 'rxjs'

export const RESET_DATA = 'RESET';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const resetData    = ()      => ({ type: RESET_DATA })
export const requestError = e       => ({ type: FETCH_DATA_FAILURE, error: e })
export const receiveData  = payload => ({ type: FETCH_DATA_SUCCESS, payload })
export const requestData  = (fromCity, toCities, startDate, endDate) => ({
  type: FETCH_DATA_REQUEST,
  payload: {fromCity, toCities, startDate, endDate}
})

export const loadDataEpic = action$ => {
  return action$.ofType(FETCH_DATA_REQUEST)
    .mergeMap(action => {
      const {fromCity, toCities, startDate, endDate} = action.payload
      return Observable.fromPromise(
          getWeatherAndFlights(fromCity, toCities, startDate, endDate)
        )
        .map((data) => receiveData(data))
        .takeUntil(action$.ofType(RESET_DATA))
        .catch(error => Observable.of(requestError(error.toString())))
      }
    );
  }
