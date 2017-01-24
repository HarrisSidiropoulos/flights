import React, { Component, PropTypes, } from 'react';
import { connect, } from 'react-redux';

import { red500, } from 'material-ui/styles/colors';

import FlightsForm from './FlightsForm';
import FlightsResponse from './FlightsResponse';

import { resetData, requestData, cancelRequest, } from '../actions';
import { NAME as FLIGHTS_NAME, } from '../constants';

require('./styles.scss');

class Flights extends Component {
  render () {
    const { cities, error, } = this.props;
    return (
      <div>
        <FlightsForm {...this.props} />
        <br/>
        { error && <div style={{ color: red500, }}>{error}</div> }
        <FlightsResponse cities={cities} />
      </div>
    );
  }
}

Flights.propTypes = {
  cities: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ [FLIGHTS_NAME]:flights, }) => {
  return {
    ...flights,
  };
};
export const mapDispatchToProps = dispatch => ({
  loadData: (fromCity, toCities, startDate, endDate) =>
    dispatch(requestData(fromCity, toCities, startDate, endDate)),
  resetForm: () => {
    dispatch(resetData());
  },
  cancelRequest: () => {
    dispatch(cancelRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
