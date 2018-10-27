import React from 'react'
// import { Redirect, Route, Router } from 'react-router-dom'
import { Route, Router } from 'react-router-dom'
import history from './history'
import Auth from './Components/Auth/AuthComponet'
import App from './/Components/App'
import Home from './Components/HomeComponet'
// import Profile from './Components/ProfileComponet'
import Callback from './Components/Callback/CallbackComponet'
// import GetContact from './Components/GetContactComponet'
// import CreateContact from './Components/CreateContactComponet'


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

        {/* <Route path="/profile" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<Profile auth={auth} {...props} />)
        )} /> */}

        <Route path="/callback" render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />

        {/* <Route path="/getContact" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<GetContact auth={auth} {...props} />)
        )} /> */}

        {/* <Route path="/createContact" render={(props) => (!auth.isAuthenticated() ?
          (<Redirect to="/home" />) : (<CreateContact auth={auth} {...props} />)
        )} /> */}
      </div>
    </Router>
  )
}