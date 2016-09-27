import {
  RESET_CITIES,
  ADD_CITY,
  REMOVE_CITY,
  UPDATE_CITY
} from './actionTypes'

export const resetCities  = () => ({ type: RESET_CITIES })
export const addCity      = (index) => ({ type: ADD_CITY, index })
export const removeCity   = (index) => ({ type: REMOVE_CITY, index })
export const updateCity   = (index, value) => ({ type: UPDATE_CITY, index, value })
