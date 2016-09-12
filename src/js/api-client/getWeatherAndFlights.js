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
      console.log(values)
      return values
    })
}

export const getWeatherAndFlight = (fromAirport, toCity, date) => {
  return getAirportCodes(toCity)
    .then((toAirport) => {
      return Promise.all([
        getFlights(fromAirport,toAirport, date),
        getCityWeather(toCity, date)
      ])
    })
    .then(values => {
      return values
    })
}
export default getWeatherAndFlights