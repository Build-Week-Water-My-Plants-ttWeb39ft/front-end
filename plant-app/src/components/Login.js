import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const initialLoginFormValues = {
    username: "",
    password: ""
};

const initialLoginFormErrors = {
    username: "",
    password: ""
};

const initialPlantLovers = [];
const initialDisabledBtn = true;

function Login() {

    const [ plantLovers, setPlantLovers ] = useState(initialPlantLovers);
    const [ plantFormValues, setPlantFormValues ] = useState(initialLoginFormValues);
    const [ loginFormErrors, setLoginFormErrors ] = useState(initialLoginFormErrors);
    const [ disabledLoginBtn, setDisabledLoginBtn ] = useState(initialDisabledBtn);



    return (
        <>
            <header>
                <nav>
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Reviews</a>
                    <a href="">Contact</a>
                </nav>
            </header>
            <h1>Welcome Back! <br/>Your Plants Miss you</h1>            
            <div>
                <h3>Login</h3>
                <input 
                    // onChange={onChange}
                    name="username"
                    // value={value}
                    type="text"
                    placeholder="Your Username"
                />
                <br/>
                <input
                    // onChange={onChange}
                    name="password"
                    // value={value}
                    type="text"
                    placeholder="Your Password"
                />
            </div>
            <button>Login</button>
            <br/>
            <a href="">New User? Sign Up Here!</a>
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
