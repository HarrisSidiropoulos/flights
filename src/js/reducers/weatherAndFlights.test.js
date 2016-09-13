import weatherAndFlights, {INITIAL_STATE} from './weatherAndFlights'
import {RESET_DATA, FETCH_DATA_REQUEST, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from '../actions'

describe('weatherAndFlights reducer', () => {
  describe(`action ${RESET_DATA}`, () => {
    it('should reset state', () => {
      expect(weatherAndFlights(INITIAL_STATE, {type: RESET_DATA})).toEqual(INITIAL_STATE)
    })
  })
  describe(`action ${FETCH_DATA_REQUEST}`, () => {
    it('should change state loading variable to true', () => {
      expect(weatherAndFlights(INITIAL_STATE, {type: FETCH_DATA_REQUEST}).loading).toBe(true)
    })
  })
  describe(`action ${FETCH_DATA_FAILURE}`, () => {
    it('should change state loading variable to false', () => {
      const action = {type: FETCH_DATA_FAILURE}
      expect(weatherAndFlights(INITIAL_STATE, action).loading).toBe(false)
    })
    it('should change state error message', () => {
      const action = {type: FETCH_DATA_FAILURE, error: "test"}
      expect(weatherAndFlights(INITIAL_STATE, action).error).toBe("test")
    })
  })
  describe(`action ${FETCH_DATA_SUCCESS}`, () => {
    it('should change state loading variable to false', () => {
      const action = {type: FETCH_DATA_SUCCESS}
      expect(weatherAndFlights(INITIAL_STATE, action).loading).toBe(false)
    })
    it('should change state cities', () => {
      const payload = ['Thessaloniki']
      const action = {type: FETCH_DATA_SUCCESS, payload}
      expect(weatherAndFlights(INITIAL_STATE, action).cities).toEqual(payload)
    })
  })
  describe(`no action`, () => {
    it('should return previous state', () => {
      expect(weatherAndFlights(INITIAL_STATE, {type: ""})).toEqual(INITIAL_STATE)
    })
  })
})
