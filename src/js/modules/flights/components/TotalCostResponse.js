import React from 'react'

export const TotalCostResponse = ({flight, returnFlight}) => (
  <div className="col-md-12">
    <hr />
    <strong>Total Cost:</strong> {returnFlight.saleTotal + flight.saleTotal}€ <br/>
  </div>
)

export default TotalCostResponse
