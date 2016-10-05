import React from 'react'

export const getPrice = (returnFlight,flight) => {
  return Math.floor((returnFlight.saleTotal + flight.saleTotal) * 100)/100
}

export const TotalCostResponse = ({flight, returnFlight}) => (
  <div className="col-md-12">
    <hr />
    <strong>Total Cost:</strong> {getPrice(returnFlight,flight)}€ <br/>
  </div>
)

export default TotalCostResponse
