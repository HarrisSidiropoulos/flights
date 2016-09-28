import {
  RESET_INPUTS,
  ADD_INPUT,
  REMOVE_INPUT,
  UPDATE_INPUT
} from './actionTypes'

export const resetInputs  = () => ({ type: RESET_INPUTS })
export const addInput      = (index) => ({ type: ADD_INPUT, index })
export const removeInput   = (index) => ({ type: REMOVE_INPUT, index })
export const updateInput   = (index, value) => ({ type: UPDATE_INPUT, index, value })
