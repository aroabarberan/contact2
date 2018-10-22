import { createStore, combineReducers, applyMiddleware } from 'redux'
import immutable from "redux-immutable-state-invariant"
import { composeWithDevTools } from "redux-devtools-extension"
import { logger } from "redux-logger"
import contacts from './Reducers/ContactReducer'
import profile from './Reducers/ProfileReducer'



export default createStore(
  combineReducers({ 
    contacts,
    profile
  }),
  composeWithDevTools(applyMiddleware(logger, immutable()))
)