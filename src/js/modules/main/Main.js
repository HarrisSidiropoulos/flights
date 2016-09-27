import React, {Component} from 'react'

import {OfflineUpdate, offlineProps} from '../offline-update'
import {components as FlightsFormComponents} from '../flights'
const {Flights} = FlightsFormComponents

require('./styles/bootstrap.scss')
require('./styles/styles.scss')

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <OfflineUpdate {...offlineProps()}/>
        <Flights />
      </div>
    )
  }
}

export default Main
