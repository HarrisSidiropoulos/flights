import React, {Component,PropTypes} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import Rx, {Observable} from 'rxjs'

class AsyncAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : []
    }
  }
  componentWillMount() {
    this.inputObserver$ =
      new Rx.Subject()
        .debounceTime(250)
        .filter((val)=>val.length>2)
        .mergeMap((inputValue)=>{
          return Observable.fromPromise(this.props.dataSourceCallback(inputValue))
            .takeWhile(()=>this.refs.autoComplete.state.focusTextField)
            .catch(()=> Observable.of(this.state.dataSource))
        })

    this.subscription = this.inputObserver$.subscribe((val)=>this.handleObserver(val))
  }
  componentWillUnmount() {
    this.subscription.unsubscribe()
  }
  handleObserver(dataSource) {
    this.setState({ dataSource })
  }
  handleUpdateInput(inputValue) {
    this.refs.autoComplete.setState({
      ...this.refs.autoComplete.state,
      focusTextField: true
    })
    this.inputObserver$.next(inputValue)
    this.props.onChange(inputValue)
  }
  handleNewRequest(value) {
    this.refs.autoComplete.focus()
    this.props.onChange(value)
  }
  handleBlur(e) {
    if (this.refs.autoComplete.state.focusTextField) {
      this.props.onBlur(e.target.value)
    }
  }
  handleMenuKeyDown(e) {
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
        menuProps     = {{onKeyDown:(e)=>this.handleMenuKeyDown(e)}}
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
