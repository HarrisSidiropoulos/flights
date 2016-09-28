import nock from 'nock'
import getCityWeather, {WEATHER_API_URL, WEATHER_API_KEY, WEATHER_DATE_ERROR} from './getCityWeather'

describe('getCityWeather', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch city weather', () => {
    const expectedValue = require('./getCityWeather.response.json')
    const nock_response = expectedValue

    const startDate = new Date(1475056800000)
    const endDate   = new Date(1475056800000)
    const cnt  = 1
    const city = 'Athens'
    const units = 'metric'

    nock(WEATHER_API_URL)
      .get('')
      .query({q: city, units, cnt, APPID: WEATHER_API_KEY})
      .reply(200, nock_response)

    return getCityWeather(city, startDate, endDate, cnt, units)
      .then((response)=> {
        expect(response).toEqual(expectedValue)
      })
  })
  it('should throw error if date was not found', () => {
    const expectedValue = new Error(WEATHER_DATE_ERROR)
    const nock_response = require('./getCityWeather.response.json')

    const startDate = new Date(1475056800000)
    const endDate   = new Date(1575056800000)
    const cnt  = 1
    const city = 'Athens'
    const units = 'metric'

    nock(WEATHER_API_URL)
      .get('')
      .query({q: city, units, cnt, APPID: WEATHER_API_KEY})
      .reply(200, nock_response)

    return getCityWeather(city, startDate, endDate, cnt, units)
      .catch((error)=> {
        expect(error).toEqual(expectedValue)
      })
  })
})
