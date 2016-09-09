import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

// import createLogger from 'redux-logger'
// const logger = createLogger();

const configureStore = (initialState = {})=> {
  const store =  createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
  return store;
};

export default configureStore;
