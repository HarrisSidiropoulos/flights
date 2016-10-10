import React from 'react'
import {Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

export const renderDatePicker = ({ col, input, label, minDate, maxDate, meta: { touched, error } }) => {
  return (
    <Col {...col}>
      <DatePicker
        hintText={label}
        floatingLabelText={label}
        fullWidth={true}
        errorText={touched && error}
        minDate={minDate}
        maxDate={maxDate}
        value={ input.value instanceof Date ? input.value : minDate}
        onChange={(event, value) => input.onChange(value)}
        />
    </Col>
  )
}

export const renderRangeDatePicker = ({startDate, endDate, maxDate, minDate}) => {
  const onChange = (value) => {
    startDate.input.onChange(value)
    if (value.getTime()>endDate.input.value.getTime()) {
      endDate.input.onChange(value)
    }
  }
  return (
    <Row>
      <Col xs={12} sm={6}>
        <DatePicker
          hintText="Start Date"
          floatingLabelText="Start Date"
          fullWidth={true}
          minDate={minDate}
          maxDate={maxDate}
          value={startDate.input.value}
          onChange={(event, value) => onChange(value)}
          />
      </Col>
      <Col xs={12} sm={6}>
        <DatePicker
          hintText="End Date"
          floatingLabelText="End Date"
          fullWidth={true}
          minDate={startDate.input.value}
          maxDate={maxDate}
          value={endDate.input.value}
          onChange={(event, value) => endDate.input.onChange(value)}
          />
      </Col>
    </Row>
  )
}

export const renderTextField = ({ col, input, label, meta: { touched, error }, ...custom }) => {
  return (
    <Col {...col}>
      <TextField hintText={label}
        floatingLabelText={label}
        fullWidth={true}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </Col>
  )
}
