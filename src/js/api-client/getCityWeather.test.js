import nock from 'nock'
import getCityWeather, { WEATHER_DATE_ERROR } from './getCityWeather'
import { mockCityWeather } from './getCityWeather.mock'

const startDate = new Date(1475056800000)
const endDate   = new Date(1475056800000)
const cnt  = 1
const city = 'Athens'
const units = 'metric'

describe('getCityWeather', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch city weather', () => {
    const expectedValue = require('./getCityWeather.response.json')
    mockCityWeather(city,units,cnt)

    return getCityWeather(city, startDate, endDate, cnt, units)
      .then(response => {
        expect(response).toEqual(expectedValue)
      })
  })
  it('should throw error if date was not found', () => {
    const expectedValue = new Error(WEATHER_DATE_ERROR)
    const startDate = new Date(1575056800000)
    const endDate   = new Date(1575056800000)
    mockCityWeather(city,units,cnt)

    return getCityWeather(city, startDate, endDate, cnt, units)
      .catch(error => {
        expect(error).toEqual(expectedValue)
      })
  })
  it('should throw any error', () => {
    const expectedValue = new Error('Gateway Timeout')
    mockCityWeather(city,units,cnt,504)

    return getCityWeather(city, startDate, endDate, cnt, units)
      .catch(error => {
        expect(error).toEqual(expectedValue)
      })
  })
})
