import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import {loadDataEpic} from '../actions'
import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable'

// import createLogger from 'redux-logger'
// const logger = createLogger();

const rootEpic = combineEpics(loadDataEpic)
const epicMiddleware = createEpicMiddleware(rootEpic)

const configureStore = (initialState = {})=> {
  const store =  createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware)
  );
  return store;
};

export default configureStore;
