/*eslint no-console: */
import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';

const QPX_API_KEY='AIzaSyBwobInPCB7X32m1KsQXojEiohDiy9VSPk'
// const QPX_API_KEY='AIzaSyC2qPNpo8wGPRM3beBbeN9noLLFnrY217k'
// const QPX_API_KEY='AIzaSyB0Ss37a8qoa88v8qhv8JdG2cVE5pxGsFo'
const QPX_API_URL='https://www.googleapis.com/qpxExpress/v1/trips/search'

export function getFlightDate(date) {
  return dateFormat('yyyy-MM-dd', date);
}

export const getFlights = (fromAirport='SKG', toAirport="ATH", date=new Date(), solutions=1) => {
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

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  }

  return fetch(`${QPX_API_URL}?key=${QPX_API_KEY}`, request)
    .then((response) => {
      if (!response.ok) {
        switch(response.status) {
        case 400:
          throw new Error("Invalid inputs, including invalid API key. Do not retry without correcting inputs.")
        case 403:
          throw new Error("Not authorized. If free daily quota is exceeded, sign up for billing or wait until next day. If rate limit is exceeded, send queries more slowly.")
        case 500:
          throw new Error("Internal error. Try reproducing manually, and report a problem if it recurs.")
        case 503:
          throw new Error("Temporary overload. Wait before retrying.")
        default:
          throw new Error(response.statusText)
        }
      }
      return response.json()
    })
    .then((response)=> {
      const filteredResponse = {
        toAirport     : response.trips.data.airport.filter(({city}) => city===toAirport)[0].name,
        fromAirport   : response.trips.data.airport.filter(({city}) => city===fromAirport)[0].name,
        toCity        : response.trips.data.city.filter(({code}) => code===toAirport)[0].name,
        fromCity      : response.trips.data.city.filter(({code}) => code===fromAirport)[0].name,
        carrier       : response.trips.data.carrier[0].name,
        saleTotal     : response.trips.tripOption[0].saleTotal,
        duration      : response.trips.tripOption[0].slice[0].duration,
        arrivalTime   : response.trips.tripOption[0].slice[0].segment[0].leg[0].arrivalTime,
        departureTime : response.trips.tripOption[0].slice[0].segment[0].leg[0].departureTime
      }
      return filteredResponse
    })
}

export default getFlights
