import nock from 'nock'
import getAirportCodes, {API_URL, REQUEST_HEADERS} from './getAirportCodes'

describe('getAirportCodes', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch Airport code', () => {
    const expectedValue = {
      "airport":"SKG",
      "city":"Thessaloniki"
    }
    const nock_response = require('./getAirportCodes.response.json')

    const city='Thessaloniki'
    const limit=1

    nock(API_URL, REQUEST_HEADERS)
      .post('')
      .query({term:city, limit})
      .reply(200, nock_response)

    return getAirportCodes(city,limit)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
  it('should throw error if city was not found', () => {
    const expectedValue = new Error("No results found for search term.")
    const nock_response = require('./getAirportCodes.response.error.json')

    const city='blabla'
    const limit=1

    nock(API_URL, REQUEST_HEADERS)
      .post('')
      .query({term:city, limit})
      .reply(200, nock_response)

    return getAirportCodes(city,limit)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw service error', () => {
    const city='Thessaloniki'
    const limit=1
    nock(API_URL, REQUEST_HEADERS)
      .post('')
      .query({term:city, limit})
      .replyWithError({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    return getAirportCodes(city,limit)
      .catch((error)=> {
        expect(error).toThrow()
      })
  })
})
