import dateFormat from 'date-format'
import fetch from 'isomorphic-fetch';

const WEATHER_API_KEY='d19be8b22d9cee2291ebb8577f647fcc'
const WEATHER_API_URL='http://api.openweathermap.org/data/2.5'

export function getWeatherDate(date) {
  return parseInt(dateFormat('yyyyMMdd', date), 10);
}

export const getCityWeather = (city='London', startDate=new Date(), endDate=new Date(), cnt=14, units='metric') => {
  return fetch(`${WEATHER_API_URL}/forecast/daily?q=${city}&units=${units}&cnt=${cnt}&APPID=${WEATHER_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      const filteredWeatherList = response.list.filter(({dt})=> {
        dt = getWeatherDate(new Date(dt*1000))
        return (dt >= getWeatherDate(startDate) &&
                dt <= getWeatherDate(endDate))
      })
      if (filteredWeatherList.length===0) {
        throw new Error("Could not find weather date!")
      }
      return {
        ...response,
        list: filteredWeatherList
      }
    })
}

export default getCityWeather
