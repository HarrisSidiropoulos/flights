import { combineEpics, } from 'redux-observable';
import { Flights, } from '../modules';

export default combineEpics(
  Flights.epic
);
