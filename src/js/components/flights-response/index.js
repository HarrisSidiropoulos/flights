import React, {PropTypes} from 'react'
import dateFormat from 'date-format'

import Panel from 'react-bootstrap/lib/Panel'

const FlightsResponse = ({cities}) => {
  return (
    <div>
      {
        cities.map(({flight, weather}, index)=> {
          let title = ""
          if (flight) {
            title = `${flight.toCity} Weather & flights from ${flight.fromCity} to ${flight.toCity} `
          } else {
            title = `${weather.city} Weather`
          }
          return (
            <Panel key={index} header={title} className="">
              {
                weather && <div>
                  <strong>{weather.city} weather:</strong> {weather.weather[0].description} <br/>
                  <strong>Temperature:</strong>  {Math.floor(weather.temp.day)}C <br/>
                </div>
              }
              {
                flight && <div>
                  <hr />
                  <strong>Sale Total:</strong>     {flight.saleTotal} <br/>
                  <strong>From Airport:</strong>   {flight.fromAirport} <br/>
                  <strong>To Airport:</strong>     {flight.toAirport} <br/>
                  <strong>Carrier:</strong>        {flight.carrier} <br/>
                  <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.departureTime))} <br/>
                  <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.arrivalTime))} <br/>
                </div>
              }
            </Panel>
          )
        })
      }
    </div>
  )
}

FlightsResponse.propTypes = {
  cities: PropTypes.array.isRequired
}

export default FlightsResponse
