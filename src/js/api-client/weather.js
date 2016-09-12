import fetch from 'isomorphic-fetch';

const WEATHER_API_KEY='d19be8b22d9cee2291ebb8577f647fcc'
const WEATHER_API_URL='http://api.openweathermap.org/data/2.5'

export const getCityWeather = (city='London', date=new Date(), cnt=14, units='metric') => {
  return fetch(`${WEATHER_API_URL}/forecast/daily?q=${city}&units=${units}&cnt=${cnt}&APPID=${WEATHER_API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((response)=> {
      const results = response.list.filter(({dt})=> {
        dt = new Date(dt*1000)
        return dt.getDate()===date.getDate() &&
          dt.getMonth()===date.getMonth() &&
          dt.getFullYear()===date.getFullYear()
      })
      if (results.length===0) {
        throw new Error("Could not find date")
      }
      return results[0]
    })
}

export default getCityWeather
