/*eslint no-console: */
/*eslint indent: */
import getAirportCodes from './airportCodes'
import getFlights from './flights'
import getCityWeather from './weather'

export const getWeatherAndFlights = (fromCity, toCities, date) => {
  return getAirportCodes(fromCity)
    .then(({airport}) => {
      return Promise.all(
        toCities.map((toCity)=> {
          return getWeatherAndFlight(airport, toCity, date)
        })
      )
    })
    .then(values => {
      return values
    })
}

export const getWeatherAndFlight = (fromAirport, toCity, date) => {
  return getAirportCodes(toCity)
    .then(({airport, city}) => {
      return Promise.all([
        getFlights(fromAirport, airport, date),
        getCityWeather(city, date)
      ])
    })
    .then((values)=> {
      return {
        flight: values[0],
        weather: values[1]
      }
    })
}
export default getWeatherAndFlights
