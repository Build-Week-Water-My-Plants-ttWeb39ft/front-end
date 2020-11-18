import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .required("*Username is required")
        .min(2, "*Name must be at least 2 characters"),
    password: yup
        .string()
        .required("*Password is required")
        .min(8, "*Password must be at least 8 characters")
});