import React from 'react'
import {Col} from 'react-flexbox-grid';

export const getPrice = (returnFlight,flight) => {
  return Math.floor((returnFlight.saleTotal + flight.saleTotal) * 100)/100
}

export const TotalCostResponse = ({flight, returnFlight}) => (
  <Col xs={12}>
    <hr />
    <strong>Total Cost:</strong> {getPrice(returnFlight,flight)}€ <br/>
  </Col>
)

export default TotalCostResponse
