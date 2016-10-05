import getAirportCodes from './getAirportCodes'
import getFlight from './getFlight'
import getCityWeather from './getCityWeather'

export const getWeatherAndFlight = (fromAirport, toCity, startDate, endDate) => {
  return getAirportCodes(toCity)
    .then(([{airport, city}]) => {
      return Promise.all([
        getFlight(fromAirport, airport, startDate),
        getFlight(airport, fromAirport, endDate),
        getCityWeather(city, startDate, endDate)
      ])
    })
    .then(([flight, returnFlight, weather])=> {
      return {
        flight,
        returnFlight,
        weather
      }
    })
}
export default getWeatherAndFlight
