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
    const qpxResponse = require('./getAirportCodes.response.json')
    const city='Thessaloniki'
    const limit=1

    nock(API_URL, REQUEST_HEADERS.headers)
      .post('')
      .query({term:city, limit})
      .reply(200, qpxResponse)

    return getAirportCodes(city,limit)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
})
