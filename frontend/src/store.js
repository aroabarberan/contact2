import { createStore, combineReducers, applyMiddleware } from 'redux';
import immutable from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import contacts from './Reducers/contactReducer';
import groups from './Reducers/groupReducer';


export default createStore(
  combineReducers({ 
    contacts,
    groups,
  }),
  composeWithDevTools(applyMiddleware(logger, immutable()))
)