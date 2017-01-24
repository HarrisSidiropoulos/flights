import React from 'react';
import { Col, } from 'react-flexbox-grid';

export const getPrice = (returnFlight,flight) => {
  return Math.floor((returnFlight.saleTotal + flight.saleTotal) * 100) / 100;
};

export const TotalCostResponse = ({ flight, returnFlight, }) => (
  <Col xs={12} className="flight-response">
    <hr />
    <table>
      <tbody>
        <tr>
          <td width="105">Total Cost:</td>
          <td>{getPrice(returnFlight,flight)}€</td>
        </tr>
      </tbody>
    </table>
  </Col>
);

export default TotalCostResponse;
