import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';
import {loadLocalValue, saveLocalValue, SESSION_STORAGE} from '../local-storage'

// export const QPX_API_KEY='AIzaSyBwobInPCB7X32m1KsQXojEiohDiy9VSPk'
export const QPX_API_KEY='AIzaSyC2qPNpo8wGPRM3beBbeN9noLLFnrY217k'
// export const QPX_API_KEY='AIzaSyB0Ss37a8qoa88v8qhv8JdG2cVE5pxGsFo'
export const QPX_API_URL='https://www.googleapis.com/qpxExpress/v1/trips/search'

export const ERROR_400="Invalid inputs, including invalid API key. Do not retry without correcting inputs."
export const ERROR_403="Not authorized. If free daily quota is exceeded, sign up for billing or wait until next day. If rate limit is exceeded, send queries more slowly."
export const ERROR_500="Internal error. Try reproducing manually, and report a problem if it recurs."
export const ERROR_503="Temporary overload. Wait before retrying."
export const ERROR_NO_FLIGHTS="Could not find flights for airport"

export function getFlightDate(date) {
  return dateFormat('yyyy-MM-dd', date);
}
export const getFlightsHeaders = (fromAirport='SKG', toAirport="ATH", date=new Date(), solutions=1) => {
  const requestBody = {
    "request": {
      "slice": [
        {
          "origin": fromAirport,
          "destination": toAirport,
          "date": getFlightDate(date)
        }
      ],
      "passengers": {
        "adultCount": 1
      },
      "solutions": solutions
    }
  }

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  }
}
export function getLocalStorageKey(fromAirport='SKG', toAirport="ATH", date=new Date(), solutions=1) {
  return `flight-${fromAirport}-${toAirport}-${dateFormat('yyyyMMdd', date)}-${solutions}`
}
export const getFlights = (fromAirport='SKG', toAirport="ATH", date=new Date(), solutions=1) => {
  const localStorageKey = getLocalStorageKey(fromAirport,toAirport,date,solutions)
  const localFlight = loadLocalValue(localStorageKey, SESSION_STORAGE)
  if (localFlight) {
    return localFlight
  }
  const headers = getFlightsHeaders(fromAirport, toAirport, date, solutions)
  return fetch(`${QPX_API_URL}?key=${QPX_API_KEY}`, headers)
    .then((response) => {
      if (!response.ok) {
        switch(response.status) {
        case 400:
          throw new Error(ERROR_400)
        case 403:
          throw new Error(ERROR_403)
        case 500:
          throw new Error(ERROR_500)
        case 503:
          throw new Error(ERROR_503)
        default:
          throw new Error(response.statusText)
        }
      }
      return response.json()
    })
    .then((response)=> {
      if (!response.trips.data.airport) {
        throw new Error(`${ERROR_NO_FLIGHTS} ${fromAirport}`)
      }
      const filteredResponse =
        response.trips.tripOption.map(({saleTotal,slice})=> {
          return {
            toAirport     : response.trips.data.airport.filter(({city}) => city===toAirport)[0].name,
            fromAirport   : response.trips.data.airport.filter(({city}) => city===fromAirport)[0].name,
            toCity        : response.trips.data.city.filter(({code}) => code===toAirport)[0].name,
            fromCity      : response.trips.data.city.filter(({code}) => code===fromAirport)[0].name,
            saleTotal     : parseFloat(saleTotal.replace(/\D+/,'')),
            carrier       : response.trips.data.carrier.filter(({code}) => code===slice[0].segment[0].flight.carrier)[0].name,
            duration      : slice[0].duration,
            arrivalTime   : slice[0].segment[0].leg[0].arrivalTime,
            departureTime : slice[0].segment[0].leg[0].departureTime,
            flightNumber  : slice[0].segment[0].flight.carrier + slice[0].segment[0].flight.number
          }
        })

      saveLocalValue(localStorageKey, filteredResponse, SESSION_STORAGE)
      return filteredResponse
    })
}

export default getFlights
