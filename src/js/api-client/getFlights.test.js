import nock from 'nock'
import getFlights, {getFlightsHeaders, QPX_API_URL, QPX_API_KEY} from './getFlights'

describe('getFlights', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch flights', () => {
    const expectedValue = {
      "toAirport":"Athens Eleftherios Venizelos",
      "fromAirport":"Thessaloniki Makedonia",
      "toCity":"Athens",
      "fromCity":"Thessaloniki",
      "carrier":"Aegean Airlines S.A.",
      "saleTotal":"EUR60.30",
      "duration":50,
      "arrivalTime":"2016-09-29T00:45+03:00",
      "departureTime":"2016-09-28T23:55+03:00"
    }
    const qpxResponse = require('./getFlights.response.json')
    const fromAirport='SKG'
    const toAirport="ATH"
    const date=new Date(1475056800000)
    const solutions=1

    nock(QPX_API_URL, getFlightsHeaders(fromAirport, toAirport, date, solutions))
      .post('')
      .query({key: QPX_API_KEY})
      .reply(200, qpxResponse)

    return getFlights(fromAirport, toAirport, date, solutions)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
})
