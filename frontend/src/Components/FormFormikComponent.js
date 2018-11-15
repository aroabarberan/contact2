import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { QUERY } from "../querys";

const handleSubmit = (props) => (values, actions) => {
  console.log('values', JSON.stringify(values))
  console.log('actions', JSON.stringify(actions))

  const sub = props.auth.userProfile.sub;
  const token = props.auth.getAccessToken();
  const formData = new FormData();
  formData.append('avatar', values.avatar)

  fetch(QUERY.contact, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: formData,
  })
    // .then(res => res.json())
    .then(res => res.text())
    .then(console.log)
    .catch(console.log);
}

class FromFormik extends React.Component {
  handleFile = (setFieldValue) => (evt) => {
    setFieldValue("avatar", evt.currentTarget.files[0]);
  }
  render() {
    return (
      <div>
        <Formik
          initialValues={{ name: '', phone: '', avatar: null, favourite: 0 }}
          onSubmit={handleSubmit(this.props)}
          render={({ values, setFieldValue }) => (
            <Form>
              {console.log(values)}
              <input type='file' name='avatar' onChange={this.handleFile(setFieldValue)} />
              <Field type="text" name="name" value={values.name} />
              <Field type="text" name="phone" value={values.phone} />
              <button type="submit">Save</button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default FromFormik;

