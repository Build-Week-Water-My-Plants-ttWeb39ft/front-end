import React from "react";
import { Link } from "react-router-dom";
import "./Styles/homeStyles.css";

function Home() {
  return (
    <>
      <div className="main">
        <div className="logo"></div>
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
      {/* <div>
        <h2>Real reviews</h2>
        <p>I would use this!</p>
      </div> */}
      {/* Footer */}

      {/* Footer */}
      <footer>
        <p className="footerFontColor">Cool Plant App &#169; 2020</p>
      </footer>
    </>
  );
}

export default Home;
