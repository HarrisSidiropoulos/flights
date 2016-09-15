import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom';

import dateFormat from 'date-format'
import Form from 'react-bootstrap/lib/Form'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'

import DynamicInputs from './dynamic-inputs'

require('./styles.scss')

const defaultDate = dateFormat('yyyy-MM-dd', new Date())
const defaultCity = "Thessaloniki"
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 13);

class FlightsForm extends Component {
  submitForm(e) {
    e.preventDefault()
    const {loadData, cityInputs} = this.props
    const startDate = new Date(ReactDOM.findDOMNode(this.startDateInput).value)
    const endDate = new Date(ReactDOM.findDOMNode(this.endDateInput).value)
    const fromCity = ReactDOM.findDOMNode(this.fromCityInput).value;
    loadData(fromCity, cityInputs.map(({value})=>value), startDate, endDate)
  }
  resetForm(e) {
    e.preventDefault()
    const {resetForm} = this.props
    ReactDOM.findDOMNode(this.dateInput).value = defaultDate
    ReactDOM.findDOMNode(this.fromCityInput).value = defaultCity
    resetForm()
  }
  render() {
    const {loading} = this.props
    return (
      <Form onSubmit={(e)=>this.submitForm(e)}
            onReset={(e)=>this.resetForm(e)}
            className={loading && 'loading'}>
        <div className="row">
          <FormGroup className="col-md-6">
            <ControlLabel>Start Date:</ControlLabel>
            <FormControl type="date" ref={node => {this.startDateInput = node}}
              required
              defaultValue={defaultDate}
              min={dateFormat('yyyy-MM-dd', new Date())}
              max={dateFormat('yyyy-MM-dd', maxDate)} />
          </FormGroup>
          <FormGroup className="col-md-6">
            <ControlLabel>End Date:</ControlLabel>
            <FormControl type="date" ref={node => {this.endDateInput = node}}
              required
              defaultValue={defaultDate}
              min={dateFormat('yyyy-MM-dd', new Date())}
              max={dateFormat('yyyy-MM-dd', maxDate)} />
          </FormGroup>
        </div>
        <FormGroup>
          <ControlLabel>From city:</ControlLabel>
          <FormControl
            type="text"
            required
            ref={node => {this.fromCityInput = node}}
            defaultValue={defaultCity} />
        </FormGroup>
        <DynamicInputs
          label="To city"
          ref={node => {this.toCityInputs = node}}
          />
        <ButtonToolbar>
          <Button type="reset">Reset</Button>
          <Button type="submit" bsStyle="primary"
              className={loading && 'progress-bar-striped disabled'}>
            <span>Submit</span>
          </Button>
        </ButtonToolbar>
      </Form>
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
