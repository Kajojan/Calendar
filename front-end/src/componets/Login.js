import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Add } from "../features/UserSlice";
import { action } from "../features/CalSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const check = async (email, password) => {
    const response = await axios
      .post(`http://localhost:4000/api/cal/login`, {
        email: email,
        password: password,
      })
      const data =  response;
      return data
    
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

    onSubmit:  async (values) => {
      try{
      const data = await check(values.email, values.password)
      navigate('/mianpage')
      }catch(error){
        console.log("wrong data")
      }
        
      }
    
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}{" "}
      <label htmlFor="Password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        onBlur={Formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password ? (
        <div>{formik.errors.password}</div>
      ) : null}{" "}
      <button type="submit">Submit</button>
      <Link to="/singup"> Sing Up</Link>
    </form>
  );
}

export default Login;
