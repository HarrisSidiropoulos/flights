import { combineReducers } from 'redux'
import weatherAndFlights from './weatherAndFlights'
import cityInputs from './cityInputs'

const rootReducer = combineReducers({
  weatherAndFlights,
  cityInputs
});

export default rootReducer
