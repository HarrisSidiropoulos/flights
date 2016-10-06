import React, {Component} from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {OfflineUpdate, offlineProps} from '../offline-update'
import {components as FlightsFormComponents} from '../flights'
const {Flights} = FlightsFormComponents

injectTapEventPlugin()

require('./styles/styles.scss')

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <OfflineUpdate {...offlineProps()}/>
          <Flights />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
