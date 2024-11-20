import React, { useState } from "react";
import "./auth.css";
import { Formik, Form } from "formik";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import httpAction from "../../utils/httpAction";
import apis from "../../utils/apis";
import useProvideHooks from "../../hooks/useProvideHooks";
import toast from "react-hot-toast";
import { authActions } from "../../store/auth-slice";
const Login = () => {
  const { dispatch, loading, navigate, setLoading } = useProvideHooks();

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim().required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  const submitHandler = async (values) => {
    const data = {
      url: apis().loginUser,
      method: "POST",
      body: { ...values },
    };
    setLoading(true);
    const result = await dispatch(httpAction(data));
    setLoading(false);
    if (result?.status) {
      toast.success(result?.message);

      dispatch(
        authActions.setAuth({
          isAuth: true,
          userId: result?.user?.userId,
          email: result?.user?.email,
          role: result?.user?.role,
        })
      );
    }
  };

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
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                {loading ? "wait..." : "login"}
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
