import React from 'react'
import dateFormat from 'date-format'
import {Col} from 'react-flexbox-grid';

const formatDate = (date) => {
  return dateFormat('MM-dd-yyyy hh:mm', new Date(date))
}

export const FlightResponse = ({flight})=> (
  <Col xs={12}>
    <hr />
    <h4>Flight from {flight.fromCity} to {flight.toCity}</h4>
    <div>
      <strong>Sale Total:</strong>
      <span>{flight.saleTotal}€</span>
    </div>
    <div>
      <strong>From Airport:</strong>
      <span>{flight.fromAirport}</span>
    </div>
    <div>
      <strong>To Airport:</strong>
      <span>{flight.toAirport}</span>
    </div>
    <div>
      <strong>Carrier:</strong>
      <span>{flight.carrier}</span>
    </div>
    <div>
      <strong>Departure Time:</strong>
      <span>{formatDate(flight.departureTime)}</span>
    </div>
    <div>
      <strong>Arrival Time:</strong>
      <span>{formatDate(flight.arrivalTime)}</span>
    </div>
    <div>
      <strong>Flight Number:</strong>
      <span>{flight.flightNumber}</span>
    </div>
  </Col>
)
export default FlightResponse
