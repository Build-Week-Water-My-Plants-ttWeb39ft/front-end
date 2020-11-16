import React, { useState, useEffect } from "react";
import * as yup from "yup";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  //
  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Username needs to be at least 6 characters"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup
      .string()
      .required("Email is required")
      .min(7, "Phone Number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required"),
    terms: yup.boolean().oneOf([true], "You must give away your data"),
  });
  //
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };
  return (
    <>
      <h1>Sign up!</h1>

      <form>
        <label>
          Username{" "}
          <input
            onChange={change}
            name="username"
            type="text"
            placeholder="Your Username"
          />
          <div style={{ color: "red" }}>{errors.username}</div>
        </label>
        <br></br>
        <label>
          Your First Name{" "}
          <input
            onChange={change}
            name="firstName"
            type="text"
            placeholder="Your First Name"
          />
        </label>
        <div style={{ color: "red" }}>{errors.firstName}</div>
        <br></br>
        <label>
          Your Last Name{" "}
          <input
            onChange={change}
            name="lastName"
            type="text"
            placeholder="Your Last Name"
          />
        </label>
        <div style={{ color: "red" }}>{errors.lastName}</div>
        <br></br>
        <label>
          Your Email{" "}
          <input
            onChange={change}
            name="email"
            type="email"
            placeholder="Your Email"
          />
        </label>
        <div style={{ color: "red" }}>{errors.email}</div>
        <br></br>
        <label>
          Your Phone Number{" "}
          <input
            onChange={change}
            name="phone"
            type="text"
            placeholder="Your Phone number"
          />
        </label>
        <div style={{ color: "red" }}>{errors.phone}</div>
        <br></br>
        <label>
          Password{" "}
          <input
            onChange={change}
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>

        <div style={{ color: "red" }}>{errors.password}</div>
        <br></br>

        <label>
          Terms and Conditions
          <input onChange={change} name="terms" type="checkbox" />
        </label>
        <div style={{ color: "red" }}>{errors.terms}</div>
        <br></br>
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
