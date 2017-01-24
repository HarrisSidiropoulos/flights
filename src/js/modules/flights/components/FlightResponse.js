import React from 'react'
import dateFormat from 'date-format'
import { Col, } from 'react-flexbox-grid';

const formatDate = date => {
  return dateFormat('dd-MM-yyyy hh:mm', new Date(date))
}

export const FlightResponse = ({ flight, }) => (
  <Col xs={12} className="flight-response">
    <hr />
    <h4>Flight from {flight.fromCity} to {flight.toCity}</h4>
    <table>
      <tbody>
        <tr>
          <td width="105">Sale Total:</td>
          <td>{flight.saleTotal}€</td>
        </tr>
        <tr>
          <td>From Airport:</td>
          <td>{flight.fromAirport}</td>
        </tr>
        <tr>
          <td>To Airport:</td>
          <td>{flight.toAirport}</td>
        </tr>
        <tr>
          <td>Carrier:</td>
          <td>{flight.carrier}</td>
        </tr>
        <tr>
          <td>Departure Time:</td>
          <td>{formatDate(flight.departureTime)}</td>
        </tr>
        <tr>
          <td>Arrival Time:</td>
          <td>{formatDate(flight.arrivalTime)}</td>
        </tr>
        <tr>
          <td>Flight Number:</td>
          <td>{flight.flightNumber}</td>
        </tr>
      </tbody>
    </table>
  </Col>
)
export default FlightResponse
