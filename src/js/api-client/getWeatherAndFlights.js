/*eslint no-console: */
/*eslint indent: */
import getAirportCodes from './airportCodes'
import getFlights from './flights'
import getCityWeather from './weather'

export const getWeatherAndFlights = (fromCity, toCities, startDate, endDate) => {
  return getAirportCodes(fromCity)
    .then(({airport}) => {
      return Promise.all(
        toCities.map((toCity)=> {
          return getWeatherAndFlight(airport, toCity, startDate, endDate)
        })
      )
    })
    .then(values => {
      return values
    })
}

export const getWeatherAndFlight = (fromAirport, toCity, startDate, endDate) => {
  return getAirportCodes(toCity)
    .then(({airport, city}) => {
      return Promise.all([
        getFlights(fromAirport, airport, startDate),
        getFlights(airport, fromAirport, endDate),
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
export default getWeatherAndFlights
