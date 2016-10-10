import React, {Component, PropTypes} from 'react'
import {FieldArray, Field, Fields, reduxForm} from 'redux-form'
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

class FlightsForm extends Component {
  render() {
    const {loading} = this.props
    return (
      <form>
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
          style={{...buttonStyles, display: (loading?"none":"inline-block")}}
          />
        <RefreshIndicator
          size={35}
          left={10}
          top={10}
          status={loading?"loading":"hide"}
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
  form: 'flightForm'
})(FlightsForm))
