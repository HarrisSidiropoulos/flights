import fetch from 'isomorphic-fetch';
import {loadLocalValue, saveLocalValue} from '../local-storage'

export const APC_AUTH='1c6ac43d70'
export const API_URL='https://www.air-port-codes.com/api/v1/multi'
export const REQUEST_HEADERS = {
  method: "POST",
  headers: {
    "APC-Auth": APC_AUTH
  }
}
export function getLocalStorageKey(city='London', limit=1) {
  return `airport-codes-${city}-${limit}`
}
export const normalizeResponse = (response) => {
  if (!response.statusCode) return response
  if (response.statusCode!==200) {
    throw new Error(response.message)
  }
  const normResponse = response.airports.map(({iata,city})=> {
    return {
      airport: iata,
      city
    }
  })
  return normResponse
}
const getAirportCodes = (city='Thessaloniki', limit=1) => {
  const localStorageKey = getLocalStorageKey(city,limit)
  const airportCodesFromLocalStorage = loadLocalValue(localStorageKey)
  if (airportCodesFromLocalStorage) {
    return airportCodesFromLocalStorage.then(normalizeResponse)
  }
  return fetch(`${API_URL}?term=${city.trim()}&limit=${limit}`, REQUEST_HEADERS)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      saveLocalValue(localStorageKey, response)
      return response
    })
    .then(normalizeResponse)
}

export default getAirportCodes
