import React, {PropTypes} from 'react'

import dateFormat from 'date-format'
import Panel from 'react-bootstrap/lib/Panel'

const getDay = (dt)=> {
  const date = new Date(dt*1000)
  const name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]
  return `${name} ${date.getDate()}`
}

const FlightsResponse = ({cities}) => {
  return (
    <div className="row">
      {
        cities.map(({flight, returnFlight, weather}, index)=> {
          const title = flight ? `${flight.toCity}` : `${weather.city.name}`
          return (
            <div key={index} className={`col-md-${Math.floor(12/cities.length)}`}>
              <Panel header={title}>
                <div className="row">
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
                <div className="row">
                  {
                    flight && <div className="col-md-12">
                      <hr />
                      <h4>Flight from {flight.fromCity} to {flight.toCity}</h4>
                      <strong>Sale Total:</strong>     {flight.saleTotal.replace(/\D+/,'')}€ <br/>
                      <strong>From Airport:</strong>   {flight.fromAirport} <br/>
                      <strong>To Airport:</strong>     {flight.toAirport} <br/>
                      <strong>Carrier:</strong>        {flight.carrier} <br/>
                      <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.departureTime))} <br/>
                      <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.arrivalTime))} <br/>
                    </div>
                  }
                  {
                    returnFlight && <div className="col-md-12">
                      <hr />
                      <h4>Flight from {flight.toCity} to {flight.fromCity}</h4>
                      <strong>Sale Total:</strong>     {returnFlight.saleTotal.replace(/\D+/,'')}€ <br/>
                      <strong>From Airport:</strong>   {returnFlight.fromAirport} <br/>
                      <strong>To Airport:</strong>     {returnFlight.toAirport} <br/>
                      <strong>Carrier:</strong>        {returnFlight.carrier} <br/>
                      <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(returnFlight.departureTime))} <br/>
                      <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(returnFlight.arrivalTime))} <br/>
                    </div>
                  }
                  {
                    flight && returnFlight && <div className="col-md-12">
                      <hr />
                      <strong>Total Cost:</strong> {parseInt(returnFlight.saleTotal.replace(/\D+/,'')) + parseInt(flight.saleTotal.replace(/\D+/,''))}€ <br/>
                    </div>
                  }
                </div>
              </Panel>
            </div>
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
