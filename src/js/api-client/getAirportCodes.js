import fetch from 'isomorphic-fetch';
import memoize from '../memoize'

export const APC_AUTH='c3dc5fb1e4'
export const API_URL='https://www.air-port-codes.com/api/v1/multi'
export const REQUEST_HEADERS = {
  method: "POST",
  headers: {
    "APC-Auth": APC_AUTH
  }
}
export const getAirportCodes = (city='Thessaloniki', limit=1) => {
  return fetch(`${API_URL}?term=${city.trim()}&limit=${limit}`, REQUEST_HEADERS)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response) => {
      if (!response.statusCode) return response
      if (response.statusCode!==200) {
        throw new Error(response.message)
      }
      const normResponse = response.airports.map(({iata,city}) => {
        return {
          airport: iata,
          city
        }
      })
      return normResponse
    })
}
const memoizeOptions = {
  isPromise:true,
  useLocalStorage:true,
  localStorageKey:'getAirportCodes'
}

export default memoize(getAirportCodes, memoizeOptions)
