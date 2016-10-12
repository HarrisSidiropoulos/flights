import React, {Component,PropTypes} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import getAirportCodes from '../../../api-client/getAirportCodes'
import unique from 'array-unique'

class AsyncAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : ['Athens','Thessaloniki','London','Paris','Berlin','Bilbao'],
      inputValue : ''
    }
  }
  hasTextFieldFocus() {
    return document.activeElement === this.refs.item.refs.searchTextField.input
  }
  onUpdateInput(inputValue) {
    const {onChange} = this.props
    this.setState({
      ...this.state,
      inputValue
    })
    if (inputValue.length<3 || !this.hasTextFieldFocus()) return
    onChange(inputValue)
    getAirportCodes(inputValue, 10)
      .then((response)=> {
        if (!this.hasTextFieldFocus()) return false
        this.setState({
          ...this.state,
          dataSource:
            unique(response.map(({city})=>(city)))
        })
      })
  }
  onNewRequest(value) {
    const {onChange} = this.props
    this.refs.item.focus()
    onChange(value)
  }
  render() {
    const {dataSource} = this.state
    return (
      <AutoComplete {...this.props}
        ref              = "item"
        onNewRequest     = {(value, index)=>this.onNewRequest(value, index)}
        filter           = {AutoComplete.noFilter}
        openOnFocus      = {true}
        dataSource       = {dataSource}
        onUpdateInput    = {(val)=> this.onUpdateInput(val)}
        />
    )
  }
}

AsyncAutocomplete.propTypes = {
  onChange: PropTypes.func
}

export default AsyncAutocomplete
