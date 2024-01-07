import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { createCustomer, createSeller } from "./api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  function onSubmit(values) {
    const user = {
      name: values.username,
      password: values.password,
      dob: values.date,
      article: [],
    };
    if (values.userType == "Customer") {
      createCustomer(user)
        .then((response) => {
          navigate(`/login`);
        })
        .catch((error) => console.log(error));
    } else {
      createSeller(user)
        .then((response) => {
          navigate(`/login`);
        })
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let error = {};
    if (values.username.length < 3)
      error.username = "UserName: Enter at least 3 Characters";

    if (values.password.length < 5)
      error.password = "Password: Enter at least 5 Characters";

    if (values.date == "") error.date = "Enter Valid Date";

    if (values.userType == "") error.userType = "Choose userType";

    return error;
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
          date: "",
          userType: "",
          article: "",
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(props) => (
          <Form>
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="userType"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group ">
              <label>UserName</label>
              <Field
                type="text"
                className="form-control"
                name="username"
              ></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Password</label>
              <Field
                type="text"
                className="form-control"
                name="password"
              ></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Date of Birth</label>
              <Field type="date" className="form-control" name="date"></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>UserType</label>
              <div role="group" aria-labelledby="my-radio-group">
                <label className="btn btn-secondary ml-3">
                  <Field type="radio" name="userType" value="Customer" />
                  Customer
                </label>
                <label className="btn btn-secondary ml-3">
                  <Field type="radio" name="userType" value="Seller" />
                  Seller
                </label>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-success">
              {" "}
              Submit{" "}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
