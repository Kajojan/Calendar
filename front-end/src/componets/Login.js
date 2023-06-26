import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Add } from "../features/UserSlice";
import "../scss/loginPage.scss";

import { upload } from "../features/CalSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user_id);

  const check = async (email, password) => {
    const response = await axios
      .post(`http://localhost:31201/api/cal/1`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const { user_id, name, lastname, email, password, callendars } =
          res.data[0];
        dispatch(
          Add({ user_id, name, lastname, email, password, check: true })
        );
        dispatch(upload(callendars));
        return res.data[0];
      });
    return response;
  };

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required(),
      password: Yup.string().required("This field is required"),
    }),
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const data = await check(values.email, values.password);
        // checkCookie()
        navigate(`/mainpage`);
      } catch (error) {
        alert("wrong emaial or password");
      }
    },
  });
  return (
    <form className="Login" onSubmit={formik.handleSubmit}>
      <h1>Welcome to Calendar</h1>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder={"Email Address"}
      />
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}{" "}
      <input
        id="password"
        type="password"
        name="password"
        onBlur={Formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder={"Password"}
      />
      {formik.errors.password && formik.touched.password ? (
        <div>{formik.errors.password}</div>
      ) : null}{" "}
      <button type="submit">Login</button>
      <Link to="/singup"> Sign Up</Link>
    </form>
  );
}

export default Login;
