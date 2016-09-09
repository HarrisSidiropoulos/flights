import React from 'react'
import { Provider } from 'react-redux'
import Main from './components'

const Root = ({store})=> (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default Root
