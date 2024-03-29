import './Login.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <div className='body-1'>
        <form className='form-1' action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand-1">
            <img src={Logo} alt="logo" className='img-1' />
            <h1 className='uv-1'>UVCHAT</h1>
          </div>
          <input className='input-1'
            type="text"
            placeholder="Enter Your Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input className='input-1'
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className='button-1' type="submit">Log In</button>
          <span className='span-1'>
            Don't have an account ? <Link className='link-1' to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}

