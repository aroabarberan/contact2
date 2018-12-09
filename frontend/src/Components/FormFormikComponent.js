import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { QUERIES } from "../querys";

const handleSubmit = (props) => (values, actions) => {

  console.log(values)

  // fetch(QUERIES.contact, {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + props.auth.getAccessToken(),
  //   },
  //   // body: formData,
  // })
  //   .then(res => res.json())
  //   .then(console.log)
  //   .catch(console.log);
}

class FromFormik extends React.Component {
  render() {
    return (
      <div>
        {/* <Formik
          initialValues={{ name: '', phone: '', lastName: '', favourite: 0 }}
          onSubmit={handleSubmit(this.props)}
          render={({ values }) => (
            <Form>
              <Field type="text" name="lastName" value={values.lastName} />
              <Field type="text" name="name" value={values.name} />
              <Field type="text" name="phone" value={values.phone} />
              <button type="submit">Save</button>

              <FieldArray
                name="phones"
                render={arrayHelpers => (
                  <div>
                    {values.phones.map((friend, index) => (
                      <div key={index}>
                        <Field name={`phones[${index}]name`} />
                        <Field name={`phones.${index}.age`} /> // both these conventions do
                        the same
            <button type="button" onClick={() => arrayHelpers.remove(index)}>
                          -
            </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ name: '', age: '' })}
                    >
                      +
        </button>
                  </div>
                )}
              />
            </Form>
          )}
        /> */}



<Formik
      initialValues={{ phones: [''] }}
      onSubmit={values =>
        console.log(values)
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        // }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="phones"
            render={arrayHelpers => (
              <div>
                {values.phones && values.phones.length > 0 ? (
                  values.phones.map((friend, index) => (
                    <div key={index}>
                      <Field name={`phones.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : ( ''
                  // <button type="button" onClick={() => arrayHelpers.push('')}>
                  //   {/* show this when user has removed all phones from the list */}
                  //   Add a Phone
                  // </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />

      </div>
    );
  }
}

export default FromFormik;

