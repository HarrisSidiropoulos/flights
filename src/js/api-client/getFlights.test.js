import nock from 'nock'
import {mockFlights} from './getFlights.mock'
import {
  getFlights,
  ERROR_400,
  ERROR_403,
  ERROR_500,
  ERROR_503
} from './getFlights'

const fromAirport='SKG'
const toAirport="ATH"
const date=new Date(1475056800000)
const solutions=1

describe('getFlights', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch flights', () => {
    const expectedValue = [{
      "toAirport":"Athens Eleftherios Venizelos",
      "fromAirport":"Thessaloniki Makedonia",
      "toCity":"Athens",
      "fromCity":"Thessaloniki",
      "carrier":"Aegean Airlines S.A.",
      "saleTotal":60.30,
      "duration":50,
      "arrivalTime":"2016-09-29T00:45+03:00",
      "departureTime":"2016-09-28T23:55+03:00",
      "flightNumber":"A3511"
    }]
    mockFlights(fromAirport, toAirport, date, solutions)

    return getFlights(fromAirport, toAirport, date, solutions)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
  it('should throw error on bad request', () => {
    const expectedValue = new Error(ERROR_400)
    mockFlights(fromAirport, toAirport, date, solutions, 400)

    return getFlights(fromAirport, toAirport, date, solutions)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw error when not authorized', () => {
    const expectedValue = new Error(ERROR_403)
    mockFlights(fromAirport, toAirport, date, solutions, 403)

    return getFlights(fromAirport, toAirport, date, solutions)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw error when service has Internal error', () => {
    const expectedValue = new Error(ERROR_500)
    mockFlights(fromAirport, toAirport, date, solutions, 500)

    return getFlights(fromAirport, toAirport, date, solutions)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw error when service is temporary overloaded', () => {
    const expectedValue = new Error(ERROR_503)
    mockFlights(fromAirport, toAirport, date, solutions, 503)

    return getFlights(fromAirport, toAirport, date, solutions)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw any error', () => {
    const expectedValue = new Error('Gateway Timeout')
    mockFlights(fromAirport, toAirport, date, solutions, 504)

    return getFlights(fromAirport, toAirport, date, solutions)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
})
