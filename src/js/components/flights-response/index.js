import React, {PropTypes} from 'react'
import dateFormat from 'date-format'

import Panel from 'react-bootstrap/lib/Panel'

const FlightsResponse = ({cities}) => {
  return (
    <div>
      {
        cities.map(({flight, weather}, index)=> {
          return (
            <Panel key={index} header={`Weather & flights from ${flight.fromCity} to ${flight.toCity} `} className="">
              {
                weather && <Panel>
                  <strong>{flight.toCity} weather:</strong> {weather.weather[0].description} <br/>
                  <strong>Temperature:</strong>  {Math.floor(weather.temp.day)}C <br/>
                </Panel>
              }
              <Panel>
                <strong>Sale Total:</strong>     {flight.saleTotal} <br/>
                <strong>From Airport:</strong>   {flight.fromAirport} <br/>
                <strong>To Airport:</strong>     {flight.toAirport} <br/>
                <strong>Carrier:</strong>        {flight.carrier} <br/>
                <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.departureTime))} <br/>
                <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.arrivalTime))} <br/>
              </Panel>
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
