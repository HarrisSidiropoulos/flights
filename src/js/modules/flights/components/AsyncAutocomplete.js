import React, {Component,PropTypes} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import getAirportCodes from '../../../api-client/getAirportCodes'
import unique from 'array-unique'

class AsyncAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : ['Athens','Thessaloniki','London','Paris','Berlin','Bilbao']
    }
  }
  onUpdateInput(inputValue) {
    const {onChange} = this.props
    if (inputValue.length<3 || !this.refs.item.state.focusTextField) return
    onChange(inputValue)
    getAirportCodes(inputValue, 10)
      .then((response)=> {
        if (!this.refs.item.state.focusTextField) return false
        this.setState({
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
  onBlur(e) {
    if (this.refs.item.state.focusTextField) {
      this.props.onBlur(e.target.value)
    }
  }
  render() {
    const {dataSource} = this.state
    return (
      <AutoComplete {...this.props}
        ref              = "item"
        maxSearchResults = {5}
        onNewRequest     = {(value, index)=>this.onNewRequest(value, index)}
        filter           = {AutoComplete.noFilter}
        openOnFocus      = {false}
        dataSource       = {dataSource}
        onUpdateInput    = {(val)=> this.onUpdateInput(val)}
        onBlur           = {(e)=>this.onBlur(e)}
        />
    )
  }
}

AsyncAutocomplete.propTypes = {
  onChange: PropTypes.func
}

export default AsyncAutocomplete
