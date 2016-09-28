import nock from 'nock'
import getCityWeather, {WEATHER_API_URL, WEATHER_API_KEY} from './getCityWeather'

const expectedValue = {
  "city":{
    "id":264371,
    "name":"Athens",
    "coord":{
      "lon":23.716221,
      "lat":37.97945
    },
    "country":"GR",
    "population":0
  },
  "cod":"200",
  "message":0.0215,
  "cnt":14,
  "list":[
    {
      "dt":1475056800,
      "temp":{
        "day":23.38,
        "min":20.79,
        "max":23.74,
        "night":20.79,
        "eve":23.06,
        "morn":23.38
      },
      "pressure":1033.63,
      "humidity":79,
      "weather":[
        {
          "id":800,
          "main":"Clear",
          "description":"clear sky",
          "icon":"01d"
        }
      ],
      "speed":9.61,
      "deg":28,
      "clouds":0
    }
  ]
}

describe('getCityWeather', ()=> {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetch city weather', () => {
    const startDate = new Date(1475056800000)
    const endDate   = new Date(1475056800000)
    const cnt  = 1
    const city = 'Athens'
    const units = 'metric'
    
    nock(`${WEATHER_API_URL}`)
      .get('')
      .query({q: city, units: units, cnt: cnt, APPID: WEATHER_API_KEY})
      .reply(200, expectedValue)

    return getCityWeather(city, startDate, endDate, cnt, units).then((response)=> {
      expect(response).toEqual(expectedValue)
    })
  })
})
