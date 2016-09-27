import {Observable} from 'rxjs'

import {getWeatherAndFlights} from '../../api-client'
import {RESET_DATA, FETCH_DATA_REQUEST} from './actionTypes'
import {receiveData, requestError} from './actions'

const epic = action$ => {
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
export default epic
