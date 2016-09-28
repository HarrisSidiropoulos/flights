/*eslint no-console: */
import fetch from 'isomorphic-fetch';

export const APC_AUTH='1c6ac43d70'
export const API_URL='https://www.air-port-codes.com/api/v1/multi'
export const request = {
  method: "POST",
  headers: {
    "APC-Auth": APC_AUTH
  }
}
const getAirportCodes = (city='Thessaloniki', limit=1) => {
  return fetch(`${API_URL}?term=${city.trim()}&limit=${limit}`, request)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      if (response.statusCode!==200) {
        throw new Error(response.message)
      }
      return {
        airport: response.airports[0].iata,
        city: response.airports[0].city
      }
    })
}

export default getAirportCodes
