import React from 'react'
import {Col} from 'react-flexbox-grid';

export const getPrice = (returnFlight,flight) => {
  return Math.floor((returnFlight.saleTotal + flight.saleTotal) * 100)/100
}

export const TotalCostResponse = ({flight, returnFlight}) => (
  <Col xs={12} className="flight-response">
    <hr />
    <div>
      <strong>Total Cost:</strong>
      <span>{getPrice(returnFlight,flight)}€</span>
    </div>
  </Col>
)

export default TotalCostResponse
