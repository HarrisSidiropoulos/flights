/*eslint indent: */
import {RESET_CITIES, ADD_CITY, REMOVE_CITY, UPDATE_CITY} from '../actions/cities'
export const INITIAL_STATE = {
  cities:[{value:"Athens", error:""}],
  min:1,
  max:4
}

export default function cities(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_CITIES:
      return {
        ...INITIAL_STATE
      }
    case ADD_CITY: {
      let {max, cities} = state
      cities = cities.slice()
      if (cities.length!==max) {
        cities.splice(action.index+1, 0, {value:"", error:""})
        return {
          ...state,
          cities
        }
      }
      return {
        ...state
      }
    }
    case REMOVE_CITY: {
      let {min, cities} = state
      cities = cities.slice()
      if (cities.length!==min) {
        cities.splice(action.index, 1)
        return {
          ...state,
          cities
        }
      }
      return {
        ...state
      }
    }
    case UPDATE_CITY: {
      const cities = state.cities.slice()
      cities[action.index] = {value:action.value, error:""}
      return {
        ...state,
        cities
      }
    }
    default:
      return {
        ...state
      }
  }
}
