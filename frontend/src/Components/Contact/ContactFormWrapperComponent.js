import React from 'react';
import PropTypes from 'prop-types';
import { Divider, DialogTitle } from '@material-ui/core';
import { Fragment } from 'react';
import ContactFormContainer from '../../Containers/Contact/ContactFormContainer';

const ContactFormWrapperComponent = ({
  title,
  auth,
  handleClose,
  contactInfo,
  preview,
}) => (
  <Fragment>
    <DialogTitle id="scroll-preview-title">{title}</DialogTitle>
    <Divider />
    {contactInfo ? (
      <ContactFormContainer
        auth={auth}
        handleClose={handleClose}
        contactInfo={contactInfo}
        preview={preview}
      />
    ) : (
      <ContactFormContainer
        auth={auth}
        handleClose={handleClose}
        preview={preview}
      />
    )}
  </Fragment>
)

ContactFormWrapperComponent.propTypes = {
  title: PropTypes.string.isRequired,
  auth: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired,
  contactInfo: PropTypes.shape(),
  preview: PropTypes.bool,
}

ContactFormWrapperComponent.defaultProps = {
  contactInfo: null,
  preview: false,
}

export default ContactFormWrapperComponent;
