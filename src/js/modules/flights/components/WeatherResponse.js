import React from 'react'

const getDay = (dt)=> {
  const date = new Date(dt*1000)
  const name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]
  return `${name} ${date.getDate()}`
}

export const WeatherResponse = ({weather}) => (
  <div>
    {
      weather.list.map((w, index) => {
        return (
          <div key={index} style={{width:110, height:150, float:'left'}}>
            <div className="text-center">
              <img src={`http://openweathermap.org/img/w/${w.weather[0].icon}.png`} /><br/>
              <strong>{getDay(w.dt)}</strong><br/>
              {`(${Math.floor(w.temp.day)}C)`} <br/>
              {`${w.weather[0].description}`}
            </div>
          </div>
        )
      })
    }
  </div>
)

export default WeatherResponse
