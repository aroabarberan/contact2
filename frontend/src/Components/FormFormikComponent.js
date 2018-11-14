import React from 'react';
import { Formik, Form, Field } from 'formik';
import { QUERY } from "../querys";

class FromFormik extends React.Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ name: '', phone: '', avatar: null, favourite: 0 }}
          onSubmit={(values, actions) => {

            console.log('values', JSON.stringify(values))
            console.log('actions', JSON.stringify(actions))

            const sub = this.props.auth.userProfile.sub;
            const token = this.props.auth.getAccessToken();
            const avatar = values.avatar;

            fetch(QUERY.contact, {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({ avatar }),
            })
              .then(res => res.json())
              .then(console.log)
              .catch(console.log);
          }}
          // handleChange ={(evt) => {
          //   this.setState({ [evt.currentTarget.name]: evt.currentTarget.files[0] });
          // }}
          render={({ values, handleChange }) => (
            <Form>
              {console.log(values)}
              <Field name="avatar" type="file" value={values.name || ''} />
              < Field type="text" name="name" value={values.name || ''} />
              <Field type="text" name="phone" value={values.phone || ''} />
              <button type="submit">Save</button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default FromFormik;

