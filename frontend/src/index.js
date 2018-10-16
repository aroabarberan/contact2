import React from 'react'
import ReactDOM from 'react-dom'
import { makeMainRoutes } from './routes'

import { Provider } from "react-redux"
import store from "./store"

import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import { deepOrange, brown } from '@material-ui/core/colors'

const routes = makeMainRoutes()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
      contrastText: '#fff',
    },
    secondary: {
      main: brown[700],
      contrastText: '#fff',
    },
  },
})


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      {routes}
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'))