import { combineReducers } from 'redux'
import weatherAndFlights from './weatherAndFlights'
import cities from './cities'

const rootReducer = combineReducers({
  weatherAndFlights,
  cities
});

export default rootReducer
