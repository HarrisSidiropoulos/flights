import React, { Component, } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, } from 'react-flexbox-grid';

import { OfflineUpdate, offlineProps, } from '../offline-update';
import { components as FlightsFormComponents, } from '../flights';
const { Flights, } = FlightsFormComponents;

injectTapEventPlugin();

require('./styles/styles.scss');

export class Main extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <Grid>
          <OfflineUpdate {...offlineProps()}/>
          <Flights />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default Main;
