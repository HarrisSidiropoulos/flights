import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid';

import DatePicker from 'material-ui/DatePicker';

const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 1000);

export class RangeDatePicker extends Component {
  render () {
    const { startDate, minDate, maxDate, onChange } = this.props
    let { endDate } = this.props
    if (startDate.getTime() > endDate.getTime()) {
      endDate = startDate
    }
    return (
      <Row>
        <Col xs={12} sm={6}>
          <DatePicker
            onChange={(e, date) => onChange({ startDate:date,endDate })}
            hintText='Hint Text'
            autoOk
            fullWidth={true}
            floatingLabelText='Start Date'
            errorText={!startDate && 'This field is required'}
            minDate={minDate}
            maxDate={maxDate}
            value={startDate}
            />
        </Col>
        <Col xs={12} sm={6}>
          <DatePicker
          onChange={(e, date) => onChange({ startDate,endDate:date })}
            hintText='Hint Text'
            autoOk
            fullWidth={true}
            floatingLabelText='End Date'
            errorText={!endDate && 'This field is required'}
            minDate={startDate}
            maxDate={maxDate}
            value={endDate}
            />
        </Col>
      </Row>
    )
  }
}

RangeDatePicker.propTypes = {
  onChange:  PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate:   PropTypes.instanceOf(Date),
  minDate:   PropTypes.instanceOf(Date),
  maxDate:   PropTypes.instanceOf(Date)
}

RangeDatePicker.defaultProps = {
  startDate: minDate,
  endDate:   minDate,
  minDate,
  maxDate
}

export default RangeDatePicker
