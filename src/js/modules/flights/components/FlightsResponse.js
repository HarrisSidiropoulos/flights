import React, { PropTypes, } from 'react';

import FlightResponse from './FlightResponse';
import WeatherResponse from './WeatherResponse';
import TotalCostResponse from './TotalCostResponse';

import { Row, Col, } from 'react-flexbox-grid';

import { Card, CardText, CardHeader, } from 'material-ui/Card';

const FlightsResponse = ({ cities, }) => {
  return (
    <Row>
      {
        cities.map(({ flights, returnFlights, weather, }, index) => {
          const [flight,] = flights;
          const [returnFlight,] = returnFlights;
          const title = flight ? `${flight.toCity}` : `${weather.city.name}`;
          return (
            <Col key={index} xs={12} sm={Math.floor(12 / cities.length)}>
              <Card initiallyExpanded={true} showExpandableButton={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                  <Row>
                    { <WeatherResponse weather={weather} />}
                  </Row>
                  <Row>
                    { flight && <FlightResponse flight={flight}/> }
                  </Row>
                  <Row>
                    { returnFlight && <FlightResponse flight={returnFlight}/> }
                  </Row>
                  <Row>
                    {
                      flight && returnFlight && 
                        <TotalCostResponse flight={flight} returnFlight={returnFlight} />
                    }
                  </Row>
                </CardText>
              </Card>
            </Col>
          );
        })
      }
    </Row>
  );
};

FlightsResponse.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default FlightsResponse;
