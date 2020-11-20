import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "./validation/LoginFormSchema.js";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

// Styled Components Start //

const StyledForm = styled.form`
  margin: 5% 20%;
`;

// Styled Components End //

function Login() {
  const { push } = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const validateLogin = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((res) => {
        setError({
          ...error,
          [name]: "",
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [name]: err.errors[0],
        });
      });
  };

  const textFieldChange = (name, value) => {
    validateLogin(name, value);
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const onChange = (evt) => {
    textFieldChange(evt.target.name, evt.target.value);
  };

  // const onSubmit = (evt) => {
  //     evt.preventDefault();
  //     console.log("working")
  //     const user = {
  //         username: loginInfo.username,
  //         password: loginInfo.password
  //     }
  //     setLoginInfo({
  //         username: "",
  //         password: ""
  //     })
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://water-my-plants-tt39.herokuapp.com/login",
        `grant_type=password&username=${loginInfo.username}&password=${loginInfo.password}`,
        {
          headers: {
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.access_token);
        push("/My-plants");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    schema.isValid(loginInfo).then((res) => {
      setDisabled(!res);
    });
  }, [loginInfo]);

  return (
    <>
      {/* Header */}
      <header>
        <h1>Cool Plant App</h1>
      </header>

      {/* Form with Inputs */}
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <StyledForm style={props} onSubmit={onSubmit}>
            <div className="fieldsContainer">
              <label>
                <h2>LOGIN</h2>
                <h3>Username: </h3>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={loginInfo.username}
                placeholder="Your Username"
                onChange={onChange}
              />
              <br />
              <label>
                <h3>Password: </h3>
              </label>
              <input
                onChange={onChange}
                name="password"
                value={loginInfo.password}
                type="password"
                password="password"
                placeholder="Your Password"
              />
            </div>
            <br />
            <button className="loginBtn" disabled={disabled}>
              Login
            </button>
            <br />

            {/* New User Button */}
            <Link to="/Signup">
              <button className="newAccountBtn">Create New Account</button>
            </Link>
          </StyledForm>
        )}
      </Spring>

      {/* Error Messages */}
      <p>{error.username}</p>
      <p>{error.password}</p>

      {/* Footer */}
      <footer>
        <p className="footerFontColor">Cool Plant App &#169; 2020</p>
      </footer>
    </>
  );
}

export default Login;
