import React, { useState } from "react";
import "./auth.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import httpAction from "../../utils/httpAction";
import toast from "react-hot-toast";
import useProvideHooks from "../../hooks/useProvideHooks";
import apis from "../../utils/apis";
const Register = () => {
  const { loading, setLoading, dispatch } = useProvideHooks();

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string().trim().required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().registerUser,
      method: "POST",
      body: { ...values },
    };
    setLoading(true);
    const result = await dispatch(httpAction(data));
    setLoading(false);
    if (result?.status) {
      toast.success(result?.message);
    }
  };

  return (
    <div className="auth_main">
      <div className="auth_header">
        <span>Welcome</span>
        <span>Create new account</span>
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
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                label="Name"
                type="text"
                size="small"
                name="name"
                fullWidth
              />
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
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                {loading ? "Loading..." : "    Register"}
              </Button>
              <div className="auth_options">
                <Link to="/login">allready have an account?</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
