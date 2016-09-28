import {combineReducers} from 'redux'
import {DynamicInputs, Flights} from '../modules'

export default combineReducers({
  [DynamicInputs.constants.NAME]: DynamicInputs.reducer,
  [Flights.constants.NAME]      : Flights.reducer
})
