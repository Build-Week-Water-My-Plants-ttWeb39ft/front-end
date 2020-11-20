import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Plant-App-Logo_100x100.png";
import "./Styles/homeStyles.css";

function Home() {
  return (
    <>
      <div className="main">
        <nav className="navbar">
          <img src={logo} className="logo" alt="logo" />
        </nav>

        <div className="furtherDown">
          <h1>The Plant App</h1>
          <Link to="/Login">
            <button type="button">Login</button>
          </Link>
          <br></br>
          <Link to="/Signup">
            <button type="button">Sign up!</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
