import {resetInputs,addInput,removeInput,updateInput} from './actions'
import {RESET_INPUTS,ADD_INPUT,REMOVE_INPUT,UPDATE_INPUT} from './actionTypes'

describe('dynamicInputs actions', ()=> {
  it('should create an action to reset all input fields', () => {
    const expectedAction = {
      type: RESET_INPUTS
    }
    expect(resetInputs()).toEqual(expectedAction)
  })
  it('should create an action to add an input field', () => {
    const index = 1
    const expectedAction = {
      type: ADD_INPUT,
      index
    }
    expect(addInput(index)).toEqual(expectedAction)
  })
  it('should create an action to remove an input field', () => {
    const index = 1
    const expectedAction = {
      type: REMOVE_INPUT,
      index
    }
    expect(removeInput(index)).toEqual(expectedAction)
  })
  it('should create an action to update an input field value', () => {
    const index = 1
    const value = "test"
    const expectedAction = {
      type: UPDATE_INPUT,
      index,
      value
    }
    expect(updateInput(index,value)).toEqual(expectedAction)
  })
})
