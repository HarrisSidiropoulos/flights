import nock from 'nock'
import getAirportCodes from './getAirportCodes'
import {mockAirportCodes} from './getAirportCode.mock'

const limit = 1

describe('getAirportCodes', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch Airport code', () => {
    const city = "Thessaloniki"
    const expectedValue = {
      "airport":"SKG",
      city
    }
    mockAirportCodes(city, limit)

    return getAirportCodes(city,limit)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
  it('should throw error if city was not found', () => {
    const expectedValue = new Error("No results found for search term.")
    const city='blabla'
    const nock_response = require('./getAirportCodes.response.error.json')

    mockAirportCodes(city, limit, 200, nock_response)

    return getAirportCodes(city,limit)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw any error', () => {
    const expectedValue = new Error('Gateway Timeout')
    const city='Thessaloniki'

    mockAirportCodes(city, limit, 504)

    return getAirportCodes(city,limit)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
})
