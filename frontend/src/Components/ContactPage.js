import React, { Fragment } from 'react';
import ContactContainer from '../Containers/Contact/ContactContainer'

export default (props) => (
  <Fragment>
    <AppComponent {...props} />
    <ContactContainer {...props} />
  </Fragment>
)