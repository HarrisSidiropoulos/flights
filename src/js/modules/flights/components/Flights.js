import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Panel from 'react-bootstrap/lib/Panel'

import FlightsForm from './FlightsForm'
import FlightsResponse from './FlightsResponse'

import {resetData, requestData} from '../actions'
import {NAME as FLIGHTS_NAME} from '../constants'

require('./styles.scss')

class Flights extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {cities, error} = this.props
    return (
      <div>
        <FlightsForm {...this.props} />
        <br/>
        { error && <Panel header="Error" bsStyle="danger">{error}</Panel> }
        <FlightsResponse cities={cities} />
      </div>
    )
  }
}

Flights.propTypes = {
  cities: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export const mapStateToProps = ({ [FLIGHTS_NAME]:flights } ) => {
  return {
    ...flights
  }
};
export const mapDispatchToProps = (dispatch) => ({
  loadData: (fromCity, toCities, startDate, endDate) =>
    dispatch(requestData(fromCity, toCities, startDate, endDate)),
  resetForm: () => {
    dispatch(resetData())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Flights)
