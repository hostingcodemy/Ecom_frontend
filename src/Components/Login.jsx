import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import { API_AUTHENTICATE } from "../config/Api";
import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import { LuEye,LuEyeClosed } from "react-icons/lu";


const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const initialValues = {
        phone: "",
        password: "",
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const {
            phone,
            password,

        } = formValues;
        const errors = {};
        let isValid = true;


        if (!phone) {
            isValid = false;
            errors.phone = "Mobile No is required.";
        } else if (phone.length < 10) {
            isValid = false;
            errors.phone = "Mobile No must be at least 10 digits.";
        } else if (phone.length > 15) {
            isValid = false;
            errors.phone = "Mobile No cannot exceed 15 digits.";
        }
        // Password Validation (At least 8 chars, 1 number, 1 '@')
        const passwordPattern = /^(?=.*[0-9])(?=.*[@]).{8,}$/;
        if (!password) {
            isValid = false;
            errors.password = "Password is required.";
        } else if (!passwordPattern.test(password)) {
            isValid = false;
            errors.password = "Password must be at least 8 characters long, contain a number, and include '@'.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            phone: formValues.phone,
            password: formValues.password,
        }

        try {
            const res = await axios({
                method: "POST",
                url: API_AUTHENTICATE,
                data: payload,
            });

            localStorage.setItem("_id", res.data.data._id)
            localStorage.setItem("first_name", res.data.data.first_name)
            localStorage.setItem("last_name", res.data.data.last_name)
            localStorage.setItem("phone", res.data.data.phone)
            localStorage.setItem("email", res.data.data.email)
            localStorage.setItem("token", res.data.data.token)
            localStorage.setItem("token_expiry", res.data.data.token_expiry)
            localStorage.setItem("role_id", res.data.data.role_id)
            localStorage.setItem("role_name", res.data.data.role_name)
            localStorage.setItem("is_login", res.data.data.is_login)
            localStorage.setItem("customer_details", JSON.stringify(res.data.data.customer_details));

            navigate("/")
            setFormValues(initialValues);

        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    return (
        <div className="m-10  md:m-0 h-[85vh] flex justify-center items-center   pb-24 md:pb-6">
            <div style={{ boxShadow: "#d7d9db 3px 3px 3px 3px" }} className=" relative backdrop-blur-2xl border-[0.01vw] border-orange-300 bg-slate-50 rounded-lg w-80 max-w-md p-8 space-y-3">
                <div className="signinTop bg-white absolute -top-[15%] left-[40%]">
                    <MdAccountCircle className="text-yellow-400 z-[1]" size={80} />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        name="phone"
                        value={formValues.phone || ""}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!/^\d*$/.test(value)) {
                                return;
                            }
                            handleChange("phone", value);
                        }}
                        autoComplete="off"
                        minLength={10}
                        maxLength={15}
                        className="w-full p-4 border bg-slate-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="text-red-500 text-sm">
                        {errors.phone}
                    </div>
                </div>
                <div className="relative">
                    <input
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="Password"
                        name="password"
                        value={formValues.password || ""}
                        onChange={(event) => handleChange("password", event.target.value)}
                        autoComplete="off"
                        className="w-full p-4 border bg-slate-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {passwordVisible ? (
                             <LuEye  className="text-gray-500" />
                           
                        ) : (
                            <LuEyeClosed className="text-gray-500" />
                        )}
                    </span>
                    <div className="text-red-500 text-sm">
                        {errors.password}
                    </div>
                </div>
                <p className="text-[2.5vw] md:text-[0.9vw] text-right cursor-pointer text-red-500">Forgot Password ?</p>
                <div className="mt-4 flex flex-col gap-1">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 transition-all ease-in-out duration-300 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </div>

                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-yellow-400 font-medium underline">
                        Sign Up
                    </Link>
                </p>


            </div>
        </div>
    );

};

export default LoginPage;

