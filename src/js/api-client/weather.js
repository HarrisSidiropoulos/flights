import fetch from 'isomorphic-fetch';

const WEATHER_API_KEY='d19be8b22d9cee2291ebb8577f647fcc'
const WEATHER_API_URL='http://api.openweathermap.org/data/2.5'

export const getCityWeather = (city='London', startDate=new Date(), endDate=new Date(), cnt=14, units='metric') => {
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
        return (dt.getDate()>=startDate.getDate()     && dt.getDate() <= endDate.getDate()) ||
              (dt.getMonth()>=startDate.getMonth()    && dt.getMonth() <= endDate.getMonth) ||
           (dt.getFullYear()>=startDate.getFullYear() && dt.getFullYear() <= endDate.getFullYear)
      })
      response.list = results
      return response
    })
}

export default getCityWeather
