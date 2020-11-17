import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const initialLoginFormValues = {
    // text inputs
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
            <h1>Welcome Back!</h1>            
            <div>
                <h3>Login</h3>
                <input 
                    // onChange={onChange}
                    name="username"
                    // value={value}
                    type="text"
                    placeholder="Your Username"
                />
                <input
                    // onChange={onChange}
                    name="password"
                    // value={value}
                    type="text"
                    placeholder="Your Password"
                />
            </div>
            <button>Login</button>
            <a href="">New User? Sign Up Here!</a>
        </>
    )
}

export default Login;
