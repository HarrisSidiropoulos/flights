import getCityWeather from './weather'

describe('getCityWeather', () => {
  it('returns something', () => {
    return getCityWeather()
      .then(response => {
        expect(response).toBeDefined()
      });
  })
})
