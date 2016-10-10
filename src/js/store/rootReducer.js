import {combineReducers} from 'redux'
import {DynamicInputs, Flights} from '../modules'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  [DynamicInputs.constants.NAME]: DynamicInputs.reducer,
  [Flights.constants.NAME]      : Flights.reducer,
  form                          : formReducer
})
