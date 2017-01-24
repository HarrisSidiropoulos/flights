/*eslint-disable max-len*/
import React, { Component, PropTypes, } from 'react'
import { FieldArray, Field, Fields, reduxForm, SubmissionError, } from 'redux-form'
import { connect, } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import unique from 'array-unique'
import getAirportCodes from '../../../api-client/getAirportCodes'
import { validate, asyncValidate, getToCities, getCities, } from './FormValidation'

import {
  renderAsyncAutocompleteInputs,
  renderRangeDatePicker,
  renderAsyncAutocomplete,
} from './FormHelpers'

const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 13);

const initialValues = {
  startDate: minDate,
  endDate  : minDate,
  fromCity : 'Thessaloniki',
  toCities : ['','',],
  toCity1  : 'Athens',
  toCity2  : 'London',
  toCity3  : '',
  toCity4  : '',
}

const buttonStyles = {
  marginTop: 30,
  marginBottom: 30,
};

const refreshStyles = {
  display: 'inline-block',
  position: 'relative',
}

export const getCitiesFromInput = inputValue => {
  return getAirportCodes(inputValue, 10)
    .then(response =>
      unique(response.map(({ city, }) => (city)))
    )
}

class FlightsForm extends Component {
  submit (values) {
    const { loadData, } = this.props
    if (validate(values).errors) {
      throw new SubmissionError(validate(values).errors)
    }
    const toCities = getToCities(values).map(({ value, }) => value)
    loadData(values.fromCity,toCities,values.startDate,values.endDate)
  }
  reset (event) {
    const { resetForm, cancelRequest, initialize, loading, } = this.props
    event.preventDefault()
    if (loading) {
      cancelRequest()
    } else {
      resetForm()
      initialize(initialValues)
    }
  }
  getSubmitLabel (loading, asyncValidating) {
    if (loading) {
      return 'Loading...'
    } else if (asyncValidating) {
      return 'Validating...'
    } else {
      return 'Submit'
    }
  }
  render () {
    const { invalid, handleSubmit, submitting, loading, asyncValidating, } = this.props
    return (
      <form onSubmit={handleSubmit(values => this.submit(values))}
            onReset={e => this.reset(e)}>
        <Fields names={['startDate','endDate',]} component={renderRangeDatePicker}
          minDate={minDate} maxDate={maxDate} />
        <Field name='fromCity' component={renderAsyncAutocomplete} label='From City'
          dataSourceCallback={getCitiesFromInput}
          maxSearchResults={5} openOnFocus={false}/>
        <FieldArray name='toCities' component={renderAsyncAutocompleteInputs}
          inputName='toCity' inputLabel='To City' removeLabel='Remove City' addLabel='Add City'
          dataSourceCallback={getCitiesFromInput} maxSearchResults={5} openOnFocus={false}/>
        <RaisedButton label={loading ? 'Cancel' : 'Reset'} type='reset'
          style={{ ...buttonStyles, marginRight:20, }} />
        <RaisedButton label={this.getSubmitLabel(loading,asyncValidating)} type='submit'
          disabled={loading || submitting || invalid || (typeof asyncValidating === 'boolean' && asyncValidating) || typeof asyncValidating === 'string'}
          style={buttonStyles} />
        <RefreshIndicator size={35} left={10} top={10}
          status={loading || submitting || asyncValidating ? 'loading' : 'hide'}
          style={refreshStyles} />
      </form>
    )
  }
}

FlightsForm.propTypes = {
  resetForm: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const mapStateToProps = ({ flights, form, }) => {
  return {
    ...flights,
    ...form,
    initialValues,
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'flightForm',
  validate,
  asyncValidate,
  asyncBlurFields: getCities(initialValues).map(({ key, }) => key),
})(FlightsForm))
