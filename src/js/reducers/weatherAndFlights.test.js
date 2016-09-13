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
      const payload = [
        {
          "flight":{
            "toAirport":"Athens Eleftherios Venizelos",
            "fromAirport":"Thessaloniki Makedonia",
            "toCity":"Athens",
            "fromCity":"Thessaloniki",
            "carrier":"Aegean Airlines S.A.",
            "saleTotal":"EUR49.30",
            "duration":50,
            "arrivalTime":"2016-09-14T00:45+03:00",
            "departureTime":"2016-09-13T23:55+03:00"
          },
          "weather":{
            "dt":1473760800,
            "temp":{
              "day":27.39,
              "min":23.47,
              "max":27.73,
              "night":23.47,
              "eve":27.03,
              "morn":27.39
            },
            "pressure":1021.8,
            "humidity":73,
            "weather":[
              {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01d"
              }
            ],
            "speed":7.71,
            "deg":11,
            "clouds":0,
            "city":"Athens"
          }
        }
      ]
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
