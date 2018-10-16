import React from 'react'
import { Redirect, Route, Router } from 'react-router-dom'
import history from './history'
import Auth from './Components/Auth/Auth'
import App from './App'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import Callback from './Components/Callback/Callback'
import GetContact from './Components/GetContact/GetContact'
import CreateContact from './Components/CreateContact/CreateContact'


const auth = new Auth()

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />

        <Route path="/profile" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<Profile auth={auth} {...props} />)
        )} />

        <Route path="/callback" render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />

        <Route path="/getContact" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<GetContact auth={auth} {...props} />)
        )} />

        <Route path="/createContact" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<CreateContact auth={auth} {...props} />)
        )} />
      </div>
    </Router>
  )
}