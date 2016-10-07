import React, {Component, PropTypes} from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Row, Col} from 'react-flexbox-grid';

import {components as DynamicInputsComponents} from '../../dynamic-inputs'
import RangeDatePicker from './RangeDatePicker'

const {DynamicInputs} = DynamicInputsComponents
const defaultCity = "Thessaloniki"
const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 13);
const buttonStyles = {
  marginTop: 30,
  marginBottom: 30
};

class FlightsForm extends Component {
  constructor() {
    super()
    this.state = {
      fromCity: defaultCity,
      startDate: minDate,
      endDate: minDate,
      maxDate: maxDate,
      minEndDate: maxDate
    }
  }
  onFromCityChange(value) {
    this.setState({
      ...this.state,
      fromCity: value
    })
  }
  onDateRangeChange(value) {
    let {startDate, endDate} = value
    if (startDate.getTime()>endDate.getTime()) {
      endDate = startDate
    }
    this.setState({
      ...this.state,
      startDate,
      endDate
    })
  }
  submitForm(e) {
    e.preventDefault()
    const {startDate, endDate, fromCity} = this.state
    const {loadData, cityInputs} = this.props

    loadData(fromCity, cityInputs.map(({value})=>value), startDate, endDate)
  }
  resetForm(e) {
    e.preventDefault()
    const {resetForm} = this.props
    this.setState({
      fromCity: defaultCity,
      startDate: minDate,
      endDate: minDate
    })

    resetForm()
  }
  render() {
    const {fromCity} = this.state
    return (
      <form>
        <RangeDatePicker
          ref={node => {this.dateRangeInput = node}}
          onChange={(value)=>this.onDateRangeChange(value)}
          {...this.state}
          />
        <Row>
          <Col xs={12}>
            <TextField
              hintText="Hint Text"
              fullWidth={true}
              required
              errorText={fromCity==="" && "This field is required"}
              floatingLabelText="From City"
              onChange={(e,value)=>this.onFromCityChange(value)}
              value={fromCity}
              ref={node => {this.fromCityInput = node}}
              />
          </Col>
        </Row>
        <DynamicInputs
          label="To City"
          />
        <RaisedButton
          label="Reset"
          style={{...buttonStyles, marginRight:20}}
          onClick={(e)=>this.resetForm(e)}
          />
        <RaisedButton
          label="Submit"
          style={{...buttonStyles}}
          onClick={(e)=>this.submitForm(e)}
          />
      </form>
    )
  }
}

FlightsForm.propTypes = {
  resetForm: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  cityInputs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default FlightsForm
