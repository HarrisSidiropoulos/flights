import React, {PropTypes} from 'react'

import Panel from 'react-bootstrap/lib/Panel'
import FlightResponse from './FlightResponse'
import WeatherResponse from './WeatherResponse'
import TotalCostResponse from './TotalCostResponse'


const FlightsResponse = ({cities}) => {
  return (
    <div className="row">
      {
        cities.map(({flights, returnFlights, weather}, index)=> {
          const [flight] = flights
          const [returnFlight] = returnFlights
          const title = flight ? `${flight.toCity}` : `${weather.city.name}`
          return (
            <div key={index} className={`col-md-${Math.floor(12/cities.length)}`}>
              <Panel header={title}>
                <div className="row">
                  { <WeatherResponse weather={weather} />}
                </div>
                <div className="row">
                  { flight && <FlightResponse flight={flight}/> }
                  { returnFlight && <FlightResponse flight={returnFlight}/> }
                  { flight && returnFlight && <TotalCostResponse flight={flight} returnFlight={returnFlight} /> }
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
