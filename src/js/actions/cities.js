export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const UPDATE_CITY = 'UPDATE_CITY';

export const addCity = (index) => ({ type: ADD_CITY, index })
export const removeCity = (index) => ({ type: REMOVE_CITY, index })
export const updateCity = (index, value) => ({ type: UPDATE_CITY, index, value })
