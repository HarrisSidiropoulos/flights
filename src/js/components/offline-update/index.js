/* eslint no-console: 0 */
import React, {Component, PropTypes} from 'react'
require('./styles.scss')

class OfflineUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      message: "Quiz has been updated.",
      hidden: true
    }
    if (props.NODE_ENV!=='production') { //eslint-disable-line
      return;
    }
    const {install} = props
    install({
      onInstalled: ()=> this.onInstalled(),
      onUpdating: ()=> this.onUpdating(),
      onUpdateReady: ()=> this.onUpdateReady(),
      onUpdateFailed: ()=> this.onUpdateFailed(),
      onUpdated: ()=> this.onUpdated(),
      onReload: ()=> this.reload(),
      onDismiss: ()=> this.dismiss()
    })
  }
  onInstalled() {
    console.log("onInstalled")
  }
  onUpdating() {
    console.log("onUpdating")
    this.setState({
      ...this.state,
      status: 'updating',
      message: 'updating...',
      hidden: false
    })
  }
  onUpdateReady() {
    const {applyUpdate} = this.props
    console.log("onUpdateReady")
    applyUpdate()
    this.setState({
      ...this.state,
      status: 'update-ready',
      hidden: false
    })
  }
  onUpdateFailed() {
    console.log("onUpdateFailed")
    this.setState({
      ...this.state,
      message: "Quiz has not been updated.",
      status: 'update-failed',
      hidden: false
    })
  }
  onUpdated() {
    this.setState({
      ...this.state,
      status: 'updated',
      message: "Quiz has been updated.",
      hidden: false
    })
  }
  reload() {
    window.location.reload()
  }
  dismiss() {
    this.setState({
      ...this.state,
      hidden: true
    })
  }
  renderActions() {
    const {status} = this.state;
    if (status==='updating') {
      return '';
    }
    return (
      <span>
        <a href="javascript:" onClick={()=> this.reload()}>Reload</a>
        <span> page to apply update or </span>
        <a href="javascript:" onClick={()=> this.dismiss()}>dismiss</a>
        <span> notification.</span>
      </span>
    )
  }
  render() {
    const {hidden, message} = this.state;
    return (
      <div className={`offline-update${hidden?' hidden':''}`}>
        <div className="container">
          <span>{message} </span>
          {this.renderActions()}
        </div>
      </div>
    )
  }
}

OfflineUpdate.propTypes = {
  NODE_ENV: PropTypes.string.isRequired,
  install: PropTypes.func.isRequired,
  applyUpdate: PropTypes.func.isRequired
}

OfflineUpdate.defaultProps = {
  NODE_ENV: 'development'
}

export default OfflineUpdate
