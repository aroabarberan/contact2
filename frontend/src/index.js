import React from 'react'
import ReactDOM from 'react-dom'
import { makeMainRoutes } from './routes'

import { Provider } from "react-redux"
import store from "./store"

import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import { deepOrange, blue } from '@material-ui/core/colors'

const routes = makeMainRoutes()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: '#fff',
    },
    secondary: {
      main: deepOrange[500],
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

theme.overrides = {
  MuiOutlinedInput: {
    input: {
      [theme.breakpoints.down('sm')]: {
        padding: '12px 14px',
      }
    },
  },
  MuiInputLabel: {
    outlined: {
      [theme.breakpoints.down('sm')]: {
        transform: 'translate(14px, 14px) scale(1)',
      }
    },
  },
  MuiFormControl: {
    fullWidth: {
      marginTop: 8,
      marginBottom: 0
    },
  },
}

// if (process.env.NODE_ENV === 'development') console.log(theme)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      {routes}
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'))
