import React, {Component} from 'react'
import {connect} from 'react-redux'

import Panel from 'react-bootstrap/lib/Panel'

import OfflineUpdate from './offline-update'
import offlineProps from './offline-update/offline-props'
import FlightsResponse from './flights-response'
import FlightsForm from './flights-form'

import {loadData, resetData} from '../actions'
import {resetCities} from '../actions/cities'

require('./styles/bootstrap.scss')
require('./styles/styles.scss')

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {cities, error} = this.props
    return (
      <div className="container">
        <OfflineUpdate {...offlineProps()}/>
        <FlightsForm {...this.props} />
        <br/>
        { error && <Panel header="Error" bsStyle="danger">{error}</Panel> }
        <FlightsResponse cities={cities} />
      </div>
    )
  }
}

export const mapStateToProps = ({ weatherAndFlights, cities } ) => {
  return {
    ...weatherAndFlights,
    inputCities: cities.cities
  }
};
export const mapDispatchToProps = (dispatch) => ({
  loadData: (fromCity, toCities, date) => dispatch(loadData(fromCity, toCities, date)),
  resetForm: () => {
    dispatch(resetData())
    dispatch(resetCities())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
