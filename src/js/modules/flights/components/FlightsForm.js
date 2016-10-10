import React, {Component, PropTypes} from 'react'
import {FieldArray, Field, Fields, reduxForm, SubmissionError} from 'redux-form'
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {renderInputs, renderRangeDatePicker, renderTextField} from './FormHelpers'

const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 13);

const initialValues = {
  startDate: minDate,
  endDate: minDate,
  fromCity: 'Thessaloniki',
  toCities: ['',''],
  toCity1: 'Athens',
  toCity2: 'London',
  toCity3: 'Bilbao',
  toCity4: 'Paris'
}

const buttonStyles = {
  marginTop: 30,
  marginBottom: 30
};

const refreshStyles = {
  display: 'inline-block',
  position: 'relative'
}

const validate = values => {
  const errors = {}
  for (const key in values) {
    if (values[key]==="") {
      errors[key] = `Field is required`
    }
  }
  return errors
}

class FlightsForm extends Component {
  submit(values) {
    const {loadData} = this.props
    if (validate(values).errors) {
      throw new SubmissionError({ startDate: 'User does not exist', _error: 'Login failed!' })
    }
    const toCities = values.toCities.map((val,index)=>values[`toCity${index+1}`])
    loadData(values.fromCity,toCities,values.startDate,values.endDate)
  }
  render() {
    const {invalid, handleSubmit, submitting, loading} = this.props
    return (
      <form onSubmit={handleSubmit((values)=> this.submit(values))}>
        <Fields names={["startDate","endDate"]} component={renderRangeDatePicker}
          minDate={minDate} maxDate={maxDate} />
        <Field name="fromCity" component={renderTextField} label="From City" />
        <FieldArray name="toCities" component={renderInputs}/>
        <RaisedButton
          label="Reset"
          style={{...buttonStyles, marginRight:20}}
          type="reset"
          />
        <RaisedButton
          label="Submit"
          type="submit"
          disabled={loading || submitting || invalid}
          style={{...buttonStyles, display: (loading || submitting?"none":"inline-block")}}
          />
        <RefreshIndicator
          size={35}
          left={10}
          top={10}
          status={loading || submitting?"loading":"hide"}
          style={refreshStyles}
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

export const mapStateToProps = ({ flights, form } ) => {
  return {
    ...flights,
    ...form,
    initialValues
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'flightForm',
  validate
})(FlightsForm))
