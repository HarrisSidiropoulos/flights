import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';
import memoize from '../memoize'

export const WEATHER_API_KEY='d19be8b22d9cee2291ebb8577f647fcc'
export const WEATHER_API_URL='http://api.openweathermap.org/data/2.5/forecast/daily'
export const WEATHER_DATE_ERROR='Could not find weather date!'

export function getDateAsNumber(date) {
  return parseInt(dateFormat('yyyyMMdd', date), 10);
}

export const getCityWeather = (city='London', startDate=new Date(), endDate=new Date(), cnt=14, units='metric') => {
  return fetch(`${WEATHER_API_URL}?q=${city}&units=${units}&cnt=${cnt}&APPID=${WEATHER_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(response => {
      const filteredWeatherList = response.list.filter(({dt}) => {
        const dtAsNumber = getDateAsNumber(new Date(dt*1000))
        return (dtAsNumber >= getDateAsNumber(startDate) &&
                dtAsNumber <= getDateAsNumber(endDate))
      })
      if (filteredWeatherList.length===0) {
        throw new Error(WEATHER_DATE_ERROR)
      }
      return {
        ...response,
        list: filteredWeatherList
      }
    })
}

export default memoize(getCityWeather, {isPromise:true})
