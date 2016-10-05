import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';
import {loadLocalValue, saveLocalValue, SESSION_STORAGE} from '../local-storage'

export const WEATHER_API_KEY='d19be8b22d9cee2291ebb8577f647fcc'
export const WEATHER_API_URL='http://api.openweathermap.org/data/2.5/forecast/daily'
export const WEATHER_DATE_ERROR="Could not find weather date!"

export function getDateAsNumber(date) {
  return parseInt(dateFormat('yyyyMMdd', date), 10);
}
export function getLocalStorageKey(city='London', startDate=new Date(), endDate=new Date(), cnt=14, units='metric') {
  return `city-weather-${city}-${dateFormat('yyyyMMdd', startDate)}-${dateFormat('yyyyMMdd', endDate)}-${cnt}-${units}`
}
export const getCityWeather = (city='London', startDate=new Date(), endDate=new Date(), cnt=14, units='metric') => {
  const localStorageKey = getLocalStorageKey(city,startDate,endDate,cnt,units)
  const cityWeatherFromLocalStorage = loadLocalValue(localStorageKey, SESSION_STORAGE)
  if (cityWeatherFromLocalStorage) {
    return cityWeatherFromLocalStorage
  }
  return fetch(`${WEATHER_API_URL}?q=${city}&units=${units}&cnt=${cnt}&APPID=${WEATHER_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      const filteredWeatherList = response.list.filter(({dt})=> {
        dt = getDateAsNumber(new Date(dt*1000))
        return (dt >= getDateAsNumber(startDate) &&
                dt <= getDateAsNumber(endDate))
      })
      if (filteredWeatherList.length===0) {
        throw new Error(WEATHER_DATE_ERROR)
      }
      const normResponse = {
        ...response,
        list: filteredWeatherList
      }
      saveLocalValue(localStorageKey, normResponse, SESSION_STORAGE)
      return normResponse
    })
}

export default getCityWeather
