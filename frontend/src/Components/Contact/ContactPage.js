import React, { Fragment } from 'react';
import ContactContainer from '../Containers/Contact/ContactContainer'
import AppComponent from "../AppComponent";


export default (props) => (
  <Fragment>
    <AppComponent {...props} />
    <ContactContainer {...props} />
  </Fragment>
)
