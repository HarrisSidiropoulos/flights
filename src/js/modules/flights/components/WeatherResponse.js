import React, {PropTypes} from 'react'

const getDay = (dt)=> {
  const date = new Date(dt*1000)
  const name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]
  return `${name} ${date.getDate()}`
}

export const WeatherResponse = ({weather}) => (
  <div>
    {
      weather.list.map(({weather,temp,dt}, index) => {
        const [{icon,description}] = weather
        return (
          <div key={index} style={{width:110, height:150, float:'left'}}>
            <div className="text-center">
              <img src={`http://openweathermap.org/img/w/${icon}.png`} /><br/>
              <strong>{getDay(dt)}</strong><br/>
              {`(${Math.floor(temp.day)}C)`} <br/>
              {`${description}`}
            </div>
          </div>
        )
      })
    }
  </div>
)

WeatherResponse.propTypes = {
  weather: PropTypes.object.isRequired
}

export default WeatherResponse
