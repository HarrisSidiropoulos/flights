import {Observable} from 'rxjs/Observable'
import {fromPromise} from 'rxjs/observable/fromPromise'
import {of} from 'rxjs/observable/of'
Observable.fromPromise = fromPromise
Observable.of = of
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/catch'

import {getWeatherAndFlights} from '../../api-client'
import {RESET_DATA, CANCEL_REQUEST, FETCH_DATA_REQUEST} from './actionTypes'
import {receiveData, requestError} from './actions'

const epic = action$ => {
  return action$.ofType(FETCH_DATA_REQUEST)
    .mergeMap(action => {
      const {fromCity, toCities, startDate, endDate} = action.payload
      return Observable.fromPromise(
          getWeatherAndFlights(fromCity, toCities, startDate, endDate)
        )
        .map(data => receiveData(data))
        .takeUntil(action$.ofType(RESET_DATA))
        .takeUntil(action$.ofType(CANCEL_REQUEST))
        .catch(error => Observable.of(requestError(error.toString())))
    }
  );
}
export default epic
