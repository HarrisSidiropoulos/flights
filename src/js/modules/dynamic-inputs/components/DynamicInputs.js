import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField';
import {Row, Col} from 'react-flexbox-grid';

import {addInput,removeInput,updateInput} from '../actions'
import {NAME} from '../constants'

export class DynamicInputs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {label, inputs, updateInput} = this.props
    // const {label, inputs, addInput, removeInput, updateInput, max, min} = this.props
    return (
      <Row>
      {
        inputs.map(({value, error},index)=> (
          <Col xs={12} sm={Math.floor(12/inputs.length)} key={index}>
            <TextField
              hintText="Hint Text"
              fullWidth={true}
              floatingLabelText={label}
              errorText={value==="" && "This field is required"}
              onChange={(e)=> updateInput(index,e.target.value)}
              value={value}
              />
          </Col>
        ))
      }
      </Row>
    );
  }
}
DynamicInputs.propTypes = {
  inputs: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
}
DynamicInputs.defaultProps = {
  min: 1,
  max: 4
}

export const mapStateToProps = ({[NAME]:inputs}) => {
  return {
    inputs
  }
}
export const mapDispatchToProps = (dispatch) => ({
  addInput: (index, max, length) => {
    if (length<max) {
      dispatch(addInput(index))
    }
  },
  removeInput: (index, min, length) => {
    if (length>min) {
      dispatch(removeInput(index))
    }
  },
  updateInput: (index,value) => {
    dispatch(updateInput(index,value))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(DynamicInputs)
