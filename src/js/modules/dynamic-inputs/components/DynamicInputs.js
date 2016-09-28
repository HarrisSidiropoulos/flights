import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import Button from 'react-bootstrap/lib/Button'

import {addInput,removeInput,updateInput} from '../actions'
import {NAME} from '../constants'

export class DynamicInputs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {label, inputs, addInput, removeInput, updateInput, max, min} = this.props
    return (
      <div className="row">
      {
        inputs.map(({value, error},index)=> (
          <FormGroup key={index} className={`col-md-${Math.floor(12/inputs.length)}`}>
            <ControlLabel>{label}:</ControlLabel>
            <InputGroup>
              <InputGroup.Button>
                <Button onClick={()=> removeInput(index, min, inputs.length)}
                  className={index<min && inputs.length===1 && 'disabled'}>-</Button>
              </InputGroup.Button>
              <FormControl type="text"
                required
                onChange={(e)=> updateInput(index,e.target.value)}
                value={value} />
              <InputGroup.Button>
                <Button onClick={()=> addInput(index, max, inputs.length)}
                  className={index>=max-1 && 'disabled'}>+</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        ))
      }
      </div>
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
