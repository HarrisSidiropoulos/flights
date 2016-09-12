import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import dateFormat from 'date-format'

import Form from 'react-bootstrap/lib/Form'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'

import DynamicInputs from './dynamicInputs'

const defaultDate = dateFormat('yyyy-MM-dd', new Date())
const defaultCity = "Thessaloniki"
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 13);

class FlightsForm extends Component {
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
    ReactDOM.findDOMNode(this.dateInput).value = defaultDate
    ReactDOM.findDOMNode(this.fromCityInput).value = defaultCity
    resetForm()
  }
  render() {
    const {loading} = this.props
    return (
      <Form onSubmit={(e)=>this.submitForm(e)} className={loading && 'loading'}>
        <FormGroup>
          <ControlLabel>Date:</ControlLabel>
          <FormControl type="date" ref={node => {this.dateInput = node}}
            required
            defaultValue={defaultDate}
            min={dateFormat('yyyy-MM-dd', new Date())}
            max={dateFormat('yyyy-MM-dd', maxDate)} />
        </FormGroup>
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
          <Button type="reset" onClick={(e)=>this.resetForm(e)}>Reset</Button>
          <Button type="submit" bsStyle="primary" className={loading && 'disabled'}>Submit</Button>
        </ButtonToolbar>
      </Form>
    )
  }
}

export default FlightsForm
