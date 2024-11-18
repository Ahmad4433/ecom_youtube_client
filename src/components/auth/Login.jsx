import React from "react";
import "./auth.css";
import { Formik, Form } from "formik";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
const Login = () => {
  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim().required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  const submitHandler = () => {};

  return (
    <div className="auth_main">
      <div className="auth_header">
        <span>Welcome Back</span>
        <span>Login to continue</span>
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          handleBlur,
          touched,
          handleChange,
          errors,
          values,
          setFieldValue,
        }) => (
          <Form>
            <div className="auth_container">
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                name="email"
                label="Email"
                size="small"
                type="email"
                fullWidth
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                name="password"
                label="Password"
                size="small"
                fullWidth
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Login
              </Button>
              <div className="auth_options">
                <Link to="/register">create a new account?</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
