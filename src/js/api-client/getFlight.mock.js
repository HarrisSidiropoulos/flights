import nock from 'nock'
import {QPX_API_URL, QPX_API_KEY, getFlightHeaders} from './getFlight'

const nock_response = require('./getFlight.response.json')

export const mockFlight = (fromAirport='Thessaloniki', toAirport=1, date=new Date(1475056800000), solutions=1, status=200, response=nock_response)=> {
  nock(QPX_API_URL, getFlightHeaders(fromAirport, toAirport, date, solutions))
    .post('')
    .query({key: QPX_API_KEY})
    .reply(status, response)
}
