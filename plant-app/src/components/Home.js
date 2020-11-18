import React from "react";
import { Link } from "react-router-dom";
import "./Styles/homeStyles.css";

function Home() {
  return (
    <>
      <div className="main">
        <h1>THE Plant App</h1>
        <Link to="/Login">
          <button type="button">
            Login
          </button>
        </Link>
        <Link to="/Signup">
          <button type="button">
            Sign up!
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
