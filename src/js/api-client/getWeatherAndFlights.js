/*eslint no-console: */
/*eslint indent: */
import getAirportCodes from './airportCodes'
import getFlights from './flights'
import getCityWeather from './weather'

export const getWeatherAndFlights = (fromCity, toCities, date) => {
  return getAirportCodes(fromCity)
    .then((fromAirport) => {
      return Promise.all(
        toCities.map((toCity)=> {
          return getWeatherAndFlight(fromAirport, toCity, date)
        })
      )
    })
    .then(values => {
      return values
    })
}

export const getWeatherAndFlight = (fromAirport, toCity, date) => {
  return getAirportCodes(toCity)
    .then((toAirport) => {
      return getFlights(fromAirport,toAirport, date)
    })
    .then((flight)=> {
      return getCityWeather(flight.toCity, date)
        .then((weather)=> {
          return {
            flight,
            weather
          }
        })
    })
}
export default getWeatherAndFlights
