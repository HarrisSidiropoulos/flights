import React, {Component,PropTypes} from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {fromPromise} from 'rxjs/observable/fromPromise'
Observable.fromPromise = fromPromise
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/catch'

class AsyncAutocomplete extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource : []
    }
  }
  componentWillMount () {
    this.inputObserver$ =
      new Subject()
        .do((val) => {
          this.refs.autoComplete.setState({
            focusTextField: true
          })
          this.props.onChange(val)
        })
        .debounceTime(250)
        .filter((val) => val.length>2)
        .mergeMap((val) => {
          return Observable.fromPromise(this.props.dataSourceCallback(val))
            .takeWhile(() => this.refs.autoComplete.state.focusTextField)
            .catch(() => Observable.of(this.state.dataSource))
        })

    this.subscription = this.inputObserver$.subscribe((val) => this.handleObserver(val))
  }
  componentWillUnmount () {
    this.subscription.unsubscribe()
  }
  handleObserver (dataSource) {
    this.setState({ dataSource })
  }
  handleNewRequest (value) {
    this.refs.autoComplete.focus()
    this.props.onChange(value)
  }
  handleBlur (e) {
    if (this.refs.autoComplete.state.focusTextField) {
      this.props.onBlur(e.target.value)
    }
  }
  handleMenuKeyDown (e) {
    if (e.keyCode===27) {
      this.refs.autoComplete.focus()
    }
  }
  render () {
    return (
      <AutoComplete {...this.props}
        ref           = "autoComplete"
        onNewRequest  = {(value, index) => this.handleNewRequest(value, index)}
        filter        = {AutoComplete.noFilter}
        dataSource    = {this.state.dataSource}
        onUpdateInput = {(val) => this.inputObserver$.next(val)}
        onBlur        = {(e) => this.handleBlur(e)}
        menuProps     = {{onKeyDown:(e) => this.handleMenuKeyDown(e)}}
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
