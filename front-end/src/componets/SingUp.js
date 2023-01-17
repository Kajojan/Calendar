import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Add, postData , error} from "../features/UserSlice";
import { v4 as uuidv4 } from "uuid";

function SingUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user.check)
  const errorMsg = useSelector((state)=> state.user.error)


  // function setCookie(cname, cvalue, exdays) {
  //     const d = new Date();
  //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
  //     let expires = "expires="+ d.toUTCString();
  //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  //   }

  useEffect(()=>{
    if(user==true){
      formik.handleReset()
      navigate('/mainpage')
    }
  },[user,error])

  const formik = useFormik({
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("This field is required"),
      ConPassword: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),

    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      ConPassword: "",
    },
    onSubmit: (values) => {
      const user_id = uuidv4();
      dispatch(
        postData({
          user_id: user_id,
          name: values.firstName,
          lastname: values.lastName,
          email: values.email,
          password: values.password,
        })
      );

      // setCookie("username", values.lastName, 30)

      
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName && formik.touched.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}{" "}
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName && formik.touched.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}{" "}
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
      <label htmlFor="conPassword">Confirm Password</label>
      <input
        id="ConPassword"
        type="password"
        name="ConPassword"
        onBlur={Formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.ConPassword}
      />
      {formik.errors.ConPassword && formik.touched.ConPassword ? (
        <div>{formik.errors.ConPassword}</div>
      ) : null}{" "}
      <button type="submit">Submit</button>
      {!user ? <a>{errorMsg}</a> :<a></a>}
    </form>
  );
}

export default SingUp;
