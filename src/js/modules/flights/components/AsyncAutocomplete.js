import React, {Component,PropTypes} from 'react'
import AutoComplete from 'material-ui/AutoComplete'

class AsyncAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : []
    }
  }
  handleUpdateInput(inputValue) {
    const {onChange, dataSourceCallback} = this.props
    if (!this.refs.autoComplete.state.focusTextField) return
    onChange(inputValue)
    const dataSourcePromise = dataSourceCallback(inputValue)
    if (dataSourcePromise.then) {
      dataSourcePromise.then((dataSource)=> {
        if (this.refs.autoComplete.state.focusTextField) {
          this.setState({ dataSource })
        }
      })
      .catch(()=>(false))
    } else {
      throw new Error("You must return a promise from dataSourceCallback")
    }
  }
  handleNewRequest(value) {
    const {onChange} = this.props
    this.refs.autoComplete.focus()
    onChange(value)
  }
  handleBlur(e) {
    if (this.refs.autoComplete.state.focusTextField) {
      this.props.onBlur(e.target.value)
    }
  }
  handleKeyDown(e) {
    if (e.keyCode===27) {
      this.refs.autoComplete.focus()
    }
  }
  render() {
    return (
      <AutoComplete {...this.props}
        ref           = "autoComplete"
        onNewRequest  = {(value, index)=>this.handleNewRequest(value, index)}
        filter        = {AutoComplete.noFilter}
        dataSource    = {this.state.dataSource}
        onUpdateInput = {(val)=> this.handleUpdateInput(val)}
        onBlur        = {(e)=>this.handleBlur(e)}
        menuProps     = {{onKeyDown:(e)=>this.handleKeyDown(e)}}
        />
    )
  }
}

AsyncAutocomplete.propTypes = {
  dataSourceCallback : PropTypes.func.isRequired,
  onChange           : PropTypes.func,
  onBlur             : PropTypes.func
}

export default AsyncAutocomplete
