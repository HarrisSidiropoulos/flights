import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import Button from 'react-bootstrap/lib/Button'

import {addCity,removeCity,updateCity} from '../actions'
import {NAME} from '../constants'

export class DynamicInputs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {label, inputs, addCity, removeCity,updateCity, max, min} = this.props
    return (
      <div className="row">
      {
        inputs.map(({value, error},index)=> (
          <FormGroup key={index} className={`col-md-${Math.floor(12/inputs.length)}`}>
            <ControlLabel>{label}:</ControlLabel>
            <InputGroup>
              <InputGroup.Button>
                <Button onClick={()=> removeCity(index)} className={index<min && inputs.length===1 && 'disabled'}>-</Button>
              </InputGroup.Button>
              <FormControl type="text"
                required
                onChange={(e)=> updateCity(index,e.target.value)}
                value={value} />
              <InputGroup.Button>
                <Button onClick={()=> addCity(index)} className={index>=max-1 && 'disabled'}>+</Button>
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
  addCity: (index) => dispatch(addCity(index)),
  removeCity: (index) => dispatch(removeCity(index)),
  updateCity: (index,value) => dispatch(updateCity(index,value))
})
export default connect(mapStateToProps, mapDispatchToProps)(DynamicInputs)
