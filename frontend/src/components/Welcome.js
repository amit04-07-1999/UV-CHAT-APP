import "./Welcome.css"
import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
  <>
    <div className="body-3" >
      <img className="img-3" src={Robot} alt="" />
      <h1 className="h1-3">
        Welcome, <span className="span-3">{userName}!</span>
      </h1>
      <h3 className="h3-3">Please select a chat to Start messaging.</h3>
     
    </div>
    </>
  );
}