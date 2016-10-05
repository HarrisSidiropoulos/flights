import React from 'react'
import dateFormat from 'date-format'

export const FlightResponse = ({flight})=> (
  <div className="col-md-12">
    <hr />
    <h4>Flight from {flight.fromCity} to {flight.toCity}</h4>
    <strong>Sale Total:</strong>     {flight.saleTotal.replace(/\D+/,'')}€ <br/>
    <strong>From Airport:</strong>   {flight.fromAirport} <br/>
    <strong>To Airport:</strong>     {flight.toAirport} <br/>
    <strong>Carrier:</strong>        {flight.carrier} <br/>
    <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.departureTime))} <br/>
    <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.arrivalTime))} <br/>
    <strong>Flight Number:</strong>  {flight.flightNumber} <br/>
  </div>
)
export default FlightResponse
