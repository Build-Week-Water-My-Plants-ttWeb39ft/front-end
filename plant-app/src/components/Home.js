import React from "react";
import { Link } from "react-router-dom";
import "./Styles/homeStyles.css";

function Home() {
  return (
    <>
      <div className="main">
        <h1>THE Plant App</h1>
        <button type="button">
          <Link to="/Login">Login</Link>
        </button>
        <button type="button">
          <Link to="/Signup">Sign up!</Link>
        </button>
      </div>
    </>
  );
}

export default Home;
