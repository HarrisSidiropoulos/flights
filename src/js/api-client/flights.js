/*eslint no-console: */
import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';

// const QPX_API_KEY='AIzaSyBwobInPCB7X32m1KsQXojEiohDiy9VSPk'
const QPX_API_KEY='AIzaSyC2qPNpo8wGPRM3beBbeN9noLLFnrY217k'
const QPX_API_URL='https://www.googleapis.com/qpxExpress/v1/trips/search'

export function getFlightDate(date) {
  return dateFormat('yyyy-MM-dd', date);
}

export const getFlights = (fromAirport='SKG', toAirport="ATH", date=new Date()) => {
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
      "solutions": 1
    }
  }

  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  }

  return fetch(`${QPX_API_URL}?key=${QPX_API_KEY}`, data)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      const data = {
        toAirport: response.trips.data.airport.filter(({city}) => city===toAirport)[0].name,
        fromAirport: response.trips.data.airport.filter(({city}) => city===fromAirport)[0].name,
        toCity: response.trips.data.city.filter(({code}) => code===toAirport)[0].name,
        fromCity: response.trips.data.city.filter(({code}) => code===fromAirport)[0].name,
        carier: response.trips.data.carrier[0].name,
        saleTotal: response.trips.tripOption[0].saleTotal,
        duration: response.trips.tripOption[0].slice[0].duration,
        arrivalTime: response.trips.tripOption[0].slice[0].segment[0].leg[0].arrivalTime,
        departureTime: response.trips.tripOption[0].slice[0].segment[0].leg[0].departureTime
      }
      return data
    })
}

export default getFlights
