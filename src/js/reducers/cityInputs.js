/*eslint indent: */
import {RESET_CITIES, ADD_CITY, REMOVE_CITY, UPDATE_CITY} from '../actions/cityInputs'

export const INITIAL_STATE = {
  cities:[{value:"Athens", error:""}],
  min:1,
  max:4
}

export default function cityInputs(state = INITIAL_STATE, action) {
  const {max, min, cities} = state
  switch (action.type) {
    case RESET_CITIES:
      return {
        ...INITIAL_STATE
      }
    case ADD_CITY: {
      if (cities.length<max) {
        return {
          ...state,
          cities: [
            ...cities.slice(0, action.index+1),
            { value:"", error:"" },
            ...cities.slice(action.index+1)
          ]
        }
      }
      return { ...state }
    }
    case REMOVE_CITY: {
      if (cities.length!==min) {
        return {
          ...state,
          cities: [
            ...cities.slice(0, action.index),
            ...cities.slice(action.index+1)
          ]
        }
      }
      return { ...state }
    }
    case UPDATE_CITY: {
      return {
        ...state,
        cities: [
          ...cities.slice(0, action.index),
          { value:action.value, error:"" },
          ...cities.slice(action.index+1)
        ]
      }
    }
    default:
      return { ...state }
  }
}
