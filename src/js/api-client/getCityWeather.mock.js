import nock from 'nock'
import { WEATHER_API_URL, WEATHER_API_KEY } from './getCityWeather'

const nock_response = require('./getCityWeather.response.json')

export const mockCityWeather = (q = 'Thessaloniki', units = 1, cnt = 14, status = 200, response = nock_response) => {
  nock(WEATHER_API_URL)
    .get('')
    .query({ q, units, cnt, APPID: WEATHER_API_KEY })
    .reply(status, response)
}
