import {createStore, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

// import createLogger from 'redux-logger'
// const logger = createLogger();

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
