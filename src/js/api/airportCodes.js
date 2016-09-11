/*eslint no-console: */

import fetch from 'isomorphic-fetch';

const APC_AUTH='1c6ac43d70'
const API_URL='https://www.air-port-codes.com/api/v1/multi'

const getAirportCodes = (city='Thessaloniki', limit=1) => {
  const data = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "APC-Auth": APC_AUTH
    }
  }
  return fetch(`${API_URL}?term=${city}&limit=${limit}`, data)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      return response.airports[0].iata
    })
}

export default getAirportCodes
