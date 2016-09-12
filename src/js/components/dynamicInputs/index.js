import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {addCity,removeCity,updateCity} from '../../actions/cities'

import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import Button from 'react-bootstrap/lib/Button'

export class DynamicInputs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {label, cities, addCity, removeCity,updateCity, max, min} = this.props
    return (
      <div>
      {
        cities.map(({value, error},index)=> (
          <FormGroup key={index}>
            <ControlLabel>{label}:</ControlLabel>
            <InputGroup>
              <InputGroup.Button>
                <Button onClick={()=> removeCity(index)} className={index<min && cities.length===1 && 'disabled'}>-</Button>
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
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
}
DynamicInputs.defaultProps = {
  min: 1,
  max: 4
}

export const mapStateToProps = ({cities}) => {
  return cities
}
export const mapDispatchToProps = (dispatch) => ({
  addCity: (index) => dispatch(addCity(index)),
  removeCity: (index) => dispatch(removeCity(index)),
  updateCity: (index,value) => dispatch(updateCity(index,value))
})
export default connect(mapStateToProps, mapDispatchToProps)(DynamicInputs)
