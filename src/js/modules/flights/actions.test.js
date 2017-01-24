import {
  RESET_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_REQUEST,
} from './actionTypes';
import {
  resetData,
  requestError,
  receiveData,
  requestData,
} from './actions';

describe('flights actions', () => {
  it('should create an action to reset all data', () => {
    const expectedAction = {
      type: RESET_DATA,
    };
    expect(resetData()).toEqual(expectedAction);
  });
  it('should create an action to all data errors', () => {
    const error = 'error';
    const expectedAction = {
      type: FETCH_DATA_FAILURE,
      error,
    };
    expect(requestError(error)).toEqual(expectedAction);
  });
  it('should create an action when receive data', () => {
    const payload = 'payload';
    const expectedAction = {
      type: FETCH_DATA_SUCCESS,
      payload,
    };
    expect(receiveData(payload)).toEqual(expectedAction);
  });
  it('should create an action to request data', () => {
    const fromCity = 'Thessaloniki';
    const toCities = ['Athens',];
    const startDate = new Date();
    const endDate = new Date();
    const expectedAction = {
      type: FETCH_DATA_REQUEST,
      payload: {
        fromCity, toCities, startDate, endDate,
      },
    };
    expect(requestData(fromCity, toCities, startDate, endDate)).toEqual(expectedAction);
  });
});
