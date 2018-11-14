import { createStore, combineReducers, applyMiddleware } from 'redux';
import immutable from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import profile from './Reducers/ProfileReducer';
import contacts from './Reducers/ContactReducer';
import groups from './Reducers/GroupReducer';



export default createStore(
  combineReducers({ 
    profile,
    contacts,
    groups,
  }),
  composeWithDevTools(applyMiddleware(logger, immutable()))
)