import nock from 'nock'
import {API_URL, REQUEST_HEADERS} from './getAirportCodes'

const nock_response = require('./getAirportCodes.response.json')

export const mockAirportCodes = (term = 'Thessaloniki', limit = 1, status = 200, response = nock_response) => {
  nock(API_URL, REQUEST_HEADERS)
    .post('')
    .query({term, limit})
    .reply(status, response)
}
