import getAirportCodes from './getAirportCodes'
import getFlights from './getFlights'
import getCityWeather from './getCityWeather'

export const getWeatherAndFlight = (fromAirport, toCity, startDate, endDate) => {
  return getAirportCodes(toCity)
    .then(([{ airport, city, },]) => {
      return Promise.all([
        getFlights(fromAirport, airport, startDate),
        getFlights(airport, fromAirport, endDate),
        getCityWeather(city, startDate, endDate),
      ])
    })
    .then(([flights, returnFlights, weather,]) => {
      return {
        flights,
        returnFlights,
        weather,
      }
    })
}
export default getWeatherAndFlight
