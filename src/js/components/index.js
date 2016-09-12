import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'

import dateFormat from 'date-format'
import Form from 'react-bootstrap/lib/Form'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import Panel from 'react-bootstrap/lib/Panel'

import DynamicInputs from './dynamicInputs'
import OfflineUpdate from './offline-update'
import offlineProps from './offline-update/offline-props'

import {loadData, resetData} from '../actions'
import {resetCities} from '../actions/cities'

require('./styles/bootstrap.scss')
require('./styles/styles.scss')

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  submitForm(e) {
    e.preventDefault()
    const {loadData, inputCities} = this.props
    const date = new Date(ReactDOM.findDOMNode(this.dateInput).value)
    const fromCity = ReactDOM.findDOMNode(this.fromCityInput).value;
    loadData(fromCity, inputCities.map(({value})=>value), date)
  }
  resetForm(e) {
    e.preventDefault()
    const {resetForm} = this.props
    resetForm()
  }
  render() {
    const {loading, cities, error, resetForm} = this.props
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    return (
      <div className="container">
        <OfflineUpdate {...offlineProps()}/>
        <Form onSubmit={(e)=>this.submitForm(e)} className={loading && 'loading'}>
          <FormGroup>
            <ControlLabel>Date:</ControlLabel>
            <FormControl type="date" ref={node => {this.dateInput = node}}
              required
              defaultValue={dateFormat('yyyy-MM-dd', new Date())}
              min={dateFormat('yyyy-MM-dd', new Date())}
              max={dateFormat('yyyy-MM-dd', maxDate)} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>From city:</ControlLabel>
            <FormControl
              type="text"
              required
              ref={node => {this.fromCityInput = node}}
              defaultValue="Thessaloniki" />
          </FormGroup>
          <DynamicInputs
            max={4}
            label="To city"
            ref={node => {this.toCityInputs = node}}
            />
          <ButtonToolbar>
            <Button type="reset" onClick={(e)=>this.resetForm(e)}>Reset</Button>
            <Button type="submit" bsStyle="primary" className={loading && 'disabled'}>Submit</Button>
          </ButtonToolbar>
        </Form>
        <br/>
        {
          error && <Panel header="Error" bsStyle="danger">
            <Panel>{error}</Panel>
          </Panel>
        }
        {
          cities.map(({flight, weather}, index)=> {
            return (
              <Panel key={index} header={`Weather & flights for ${flight.toCity}`} className="">
                <Panel>
                  <strong>{flight.toCity} weather:</strong> {weather.weather[0].description} <br/>
                  <strong>Temperature:</strong>  {Math.floor(weather.temp.day)}C <br/>
                </Panel>
                <Panel>
                  <strong>Sale Total:</strong>     {flight.saleTotal} <br/>
                  <strong>From Airport:</strong>   {flight.fromAirport} <br/>
                  <strong>To Airport:</strong>     {flight.toAirport} <br/>
                  <strong>Carier:</strong>         {flight.carier} <br/>
                  <strong>Departure Time:</strong> {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.departureTime))} <br/>
                  <strong>Arrival Time:</strong>   {dateFormat('MM-dd-yyyy hh:mm', new Date(flight.arrivalTime))} <br/>
                </Panel>
              </Panel>
            )
          })
        }
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
