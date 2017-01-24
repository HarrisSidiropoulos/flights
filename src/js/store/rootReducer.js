import { combineReducers } from 'redux'
import { Flights } from '../modules'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  [Flights.constants.NAME]      : Flights.reducer,
  form                          : formReducer
})
