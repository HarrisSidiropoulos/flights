import React, {Component} from 'react'
import {connect} from 'react-redux'
import OfflineUpdate from './offline-update'
import offlineProps from './offline-update/offline-props'

require('./styles.scss')

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <OfflineUpdate {...offlineProps()}/>
      </div>
    )
  }
}

export const mapStateToProps = ({ weather } ) => weather;

export default connect(mapStateToProps)(Main)
