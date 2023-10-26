import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    // .email()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Enter email correctly"
    )
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
    //   "enter password correctly"
    // )
    .trim(),
});
const Login = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [loginusers,setLoginusers]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/users/createuser").then((res)=>{
      setLoginusers(res.data.data);
    });
  },[]);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = (data) => {
    
    const userln = loginusers.find(
      (abc) => abc.email === data.email && abc.password === data.password
    );
   console.log(userln);
    
    if (!userln) {
      toast.error("Login details does not match",{autoClose:1000});
    //   navigate(`/Currentuser`);
    } else {
      toast.success(`login successfully!`, { autoClose: 1000 });
      navigate(`/Dashboard/${userln._id}`);
    } 
    resetField("email");
    resetField("password");
  };

  return (
    <div className="logincon">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ textAlign: "start", height: "500px" }}
      >
        <div
          className="card"
          style={{
            width: "500px",
            height: "auto",
            margin: "auto",
            backgroundColor: "Lavender",
          }}
        >
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="formhook">
              <h3 style={{ color: "indigo", textAlign: "center" }}>Login</h3>
              <label htmlFor="email" style={{ color: "indigo" }}>
                Gmail:
              </label>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="email"
                 
                  autoFocus
                  {...register("email")}
                />
                <p>{errors.email?.message}</p>
              </div>
              <lable htmlFor="password" style={{ color: "indigo" }}>
                Password:
              </lable>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <p>{errors.password?.message}</p>
              </div>

              <button
                className="button"
                type="submit"
                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "indigo",
                  border: "none",
                  padding: "10px",
                  margin: "2px",
                }}
              >
                {" "}
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
