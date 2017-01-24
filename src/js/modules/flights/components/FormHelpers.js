import React from 'react';
import { Field, } from 'redux-form';
import { Row, Col, } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

import AsyncAutocomplete from './AsyncAutocomplete';

export const renderDatePicker = (
  { col, input, label, minDate, maxDate, meta: { touched, error, }, }
) => {
  return (
    <Col {...col}>
      <DatePicker
        hintText={label}
        floatingLabelText={label}
        fullWidth={true}
        errorText={touched && error}
        minDate={minDate}
        maxDate={maxDate}
        value={input.value instanceof Date && input.value}
        onChange={(event, value) => input.onChange(value)}
        />
    </Col>
  );
};

export const renderRangeDatePicker = ({ startDate, endDate, maxDate, minDate, }) => {
  const onChange = value => {
    startDate.input.onChange(value);
    if (value.getTime() > endDate.input.value.getTime()) {
      endDate.input.onChange(value);
    }
  };
  return (
    <Row>
      <Col xs={12} sm={6}>
        <DatePicker
          hintText='Start Date'
          floatingLabelText='Start Date'
          fullWidth={true}
          minDate={minDate}
          maxDate={maxDate}
          errorText={startDate.touched && startDate.error}
          value={startDate.input.value}
          onChange={(event, value) => onChange(value)}
          />
      </Col>
      <Col xs={12} sm={6}>
        <DatePicker
          hintText='End Date'
          floatingLabelText='End Date'
          fullWidth={true}
          minDate={startDate.input.value}
          maxDate={maxDate}
          errorText={endDate.touched && endDate.error}
          value={endDate.input.value}
          onChange={(event, value) => endDate.input.onChange(value)}
          />
      </Col>
    </Row>
  );
};

export const renderAsyncAutocompleteInputs = (
  { fields, meta, inputName, inputLabel, min = 1, max = 4, ...custom, }
) => {
  const renderRemoveButton = () => {
    if (fields.length > min) {
      return <FlatButton label={custom.removeLabel || 'Remove'} onClick={() => fields.pop()}/>;
    } else {
      return <div/>;
    }
  };
  const renderAddButton = () => {
    if (fields.length < max) {
      return <FlatButton label={custom.addLabel || 'Add'} onClick={() => fields.push({})}/>;
    } else {
      return <div/>;
    }
  };
  return (
    <Row {...meta}>
      {
        fields.map((name, index) => {
          return (
            <Col xs={12} sm={Math.max(12 / fields.length, 3)} key={index}>
              <Field {...custom}
                name={`${inputName || 'Field'}${index + 1}`}
                component={renderAsyncAutocomplete}
                label={`${inputLabel || 'Field'} #${index + 1}`}/>
            </Col>
          );
        })
      }
      {renderRemoveButton()}
      {renderAddButton()}
    </Row>
  );
};

export const renderTextField = ({ input, label, meta: { touched, error, }, ...custom, }) => {
  return (
    <TextField hintText={label}
      floatingLabelText={label}
      fullWidth={true}
      errorText={touched && error}
      {...input}
      {...custom}
      value={typeof input.value === 'string' ? input.value : ''}
    />
  );
};

export const renderAsyncAutocomplete = (
  { input, label, meta: { touched, error, }, ...custom, }
) => {
  return (
    <AsyncAutocomplete hintText={label}
      floatingLabelText={label}
      fullWidth={true}
      errorText={touched && error}
      {...input}
      {...custom}
      searchText={input.value}
    />
  );
};
