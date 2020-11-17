import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as yup from "yup";
import schema from "./validation/LoginFormSchema.js";

function Login() {

    const [ loginInfo, setLoginInfo ] = useState({
        username: "",
        password: ""
    });

    const [ disabled, setDisabled ] = useState(false);

    const [ error, setError ] = useState({
        username: "",
        password: ""
    });

    const validateLogin = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then((res) => {
                setError({
                    ...error,
                    [name]: ""
                })
            })
            .catch((err) => {
                setError({
                    ...error,
                    [name]: err.errors[0]
                })
            })
    };

    const textFieldChange = (name, value) => {
        validateLogin(name, value)
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    };

    const onChange = (evt) => {
        textFieldChange(evt.target.name, evt.target.value)
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log("working")
        const user = {
            username: loginInfo.username,
            password: loginInfo.password
        }
        setLoginInfo({
            username: "",
            password: ""
        })
    };

    useEffect(() => {
        schema.isValid(loginInfo)
            .then((res) => {
                setDisabled(!res)
            })
    }, [loginInfo]);

    return (
        <>
            {/* Header */}        
            <header>
                <nav>
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Reviews</a>
                    <a href="">Contact</a>
                </nav>
            </header>

            {/* Form */}
            <form onSubmit={onSubmit}>
                <label>
                    <h1>Welcome Back! <br/>Your Plants Miss you</h1>           
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
                <br/>
                <label>       
                    <h3>Password: </h3>
                </label>
                <input
                    onChange={onChange}
                    name="password"
                    value={loginInfo.password}
                    type="text"
                    password="password"
                    placeholder="Your Password"
                />
                <br/>                
                <button disabled={disabled}>Login</button>
            </form>

            {/* Error Messages */}
            <p>{error.username}</p>
            <p>{error.password}</p>

            {/* New User Link */}
            <a href="">New User? Sign Up Here!</a>

            {/* Footer */}
            <footer>
                <nav>
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Reviews</a>
                    <a href="">Contact</a>
                </nav>
            </footer>
        </>
    )
}

export default Login;
