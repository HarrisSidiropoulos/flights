import cityInputs, {INITIAL_STATE} from './cityInputs'
import {RESET_CITIES, ADD_CITY, REMOVE_CITY, UPDATE_CITY} from '../actions/cityInputs'

describe('cityInputs reducer', () => {
  describe(`action ${RESET_CITIES}`, () => {
    it('should reset state', () => {
      expect(cityInputs(INITIAL_STATE, {type: RESET_CITIES})).toEqual(INITIAL_STATE)
    })
  })
  describe(`action ${ADD_CITY}`, () => {
    it('should add city', () => {
      const expectedState = {...INITIAL_STATE, cities: INITIAL_STATE.cities.slice()}
      expectedState.cities.push({value:"", error:""})
      expect(cityInputs(INITIAL_STATE, {type: ADD_CITY, index: 1})).toEqual(expectedState)
    })
  })
  describe(`action ${REMOVE_CITY}`, () => {
    it('should remove city', () => {
      const initialState = {...INITIAL_STATE, cities: INITIAL_STATE.cities.slice()}
      initialState.cities.push({value:"", error:""})
      expect(cityInputs(initialState, {type: REMOVE_CITY, index: 1})).toEqual(INITIAL_STATE)
    })
  })
  describe(`action ${UPDATE_CITY}`, () => {
    it('should update city', () => {
      const value = "Thessaloniki"
      const expectedState = {...INITIAL_STATE, cities: INITIAL_STATE.cities.slice()}
      expectedState.cities[0].value = value
      expect(cityInputs(INITIAL_STATE, {type: UPDATE_CITY, index: 0, value})).toEqual(expectedState)
    })
  })
  describe(`no action`, () => {
    it('should return previous state', () => {
      expect(cityInputs(INITIAL_STATE, {type: ""})).toEqual(INITIAL_STATE)
    })
  })
})
