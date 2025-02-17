import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import Swal from "sweetalert2";
import { API_CUSTOMER_REGISTER } from "../config/Api";
import { VscAccount } from "react-icons/vsc";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const { setIsLogIn, isLogIn } = useCart();
    const [imageSrc, setImageSrc] = useState(null);

    const initialValues = {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
        P_pinCode: "",
        P_state: "",
        P_city: "",
        P_houseNo: "",
        P_building: "",
        P_roadName: "",
        D_pinCode: "",
        D_state: "",
        D_city: "",
        D_houseNo: "",
        D_building: "",
        D_roadName: "",
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSameAddress, setIsSameAddress] = useState(false);

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
            email,
            password
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
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            isValid = false;
            errors.email = "Email is required.";
        } else if (!emailPattern.test(email)) {
            isValid = false;
            errors.email = "Enter a valid email (e.g., abc@gmail.com).";
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

    const handleCheckboxChange = () => {
        setIsSameAddress((prev) => {
            const newState = !prev;
            if (newState) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    D_pinCode: prevValues.P_pinCode,
                    D_state: prevValues.P_state,
                    D_city: prevValues.P_city,
                    D_houseNo: prevValues.P_houseNo,
                    D_building: prevValues.P_building,
                    D_roadName: prevValues.P_roadName,
                }));
            } else {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    D_pinCode: "",
                    D_state: "",
                    D_city: "",
                    D_houseNo: "",
                    D_building: "",
                    D_roadName: "",
                }));
            }
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            phone: formValues.phone,
            email: formValues.email,
            password: formValues.password,
            P_pinCode: formValues.P_pinCode,
            P_state: formValues.P_state,
            P_city: formValues.P_city,
            P_houseNo: formValues.P_houseNo,
            P_building: formValues.P_building,
            P_roadName: formValues.P_roadName,
            D_pinCode: formValues.D_pinCode,
            D_state: formValues.D_state,
            D_city: formValues.D_city,
            D_houseNo: formValues.D_houseNo,
            D_building: formValues.D_building,
            D_roadName: formValues.D_roadName,
        }

        try {
            const res = await axios({
                method: "POST",
                url: API_CUSTOMER_REGISTER,
                data: payload,
            });

            if (res.data.status) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
                setFormValues(initialValues);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error occurred",
                    showConfirmButton: true,
                })
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error during registration.');
        }
    };

    const handleClick = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            cancelButtonText: "Cancel",
            willClose: (result) => {
                console.log(result, 'oo')

                if (result.dismiss !== Swal.DismissReason.cancel) {
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                openCamera();
            } else if (result.isDenied) {
                uploadPhoto();
            } else {
                console.log('Action canceled');
            }
        });
    };

    return (
        <div className=" pb-20 flex justify-center items-center">
            <div className="border-yellow-400 border-[0.01vw]  rounded-lg shadow-lg w-full max-w-5xl p-6 space-y-2 mt-3">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign <span className="text-yellow-400">Up</span></h1>

                <div className="space-y-3">

                    <div className="signupTop grid grid-cols-12 border-b-[#FFBE59]">
                        <div className="left col-span-10 md:col-span-10">
                            <div className="wrapper grid grid-cols-1 gap-y-5">
                               <div className=" grid grid-cols-4 gap-3">
                               <div>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="first_name"
                                        value={formValues.first_name || ""}
                                        onChange={(event) => handleChange("first_name", event.target.value)}
                                        autoComplete="off"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {!formValues.first_name && errors.first_name}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="last_name"
                                        value={formValues.last_name || ""}
                                        onChange={(event) => handleChange("last_name", event.target.value)}
                                        autoComplete="off"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {!formValues.last_name && errors.last_name}
                                    </div>
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
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {errors.phone}
                                    </div>
                                </div>
                                {/* <div>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
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
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {errors.phone}
                                    </div>
                                </div> */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={formValues.email || ""}
                                        onChange={(event) => handleChange("email", event.target.value)}
                                        autoComplete="off"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {errors.email}
                                    </div>
                                </div>
                                {/* <div>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        name="email"
                                        value={formValues.email || ""}
                                        onChange={(event) => handleChange("email", event.target.value)}
                                        autoComplete="off"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {errors.email}
                                    </div>
                                </div> */}
                               </div>

                                <div className="grid grid-cols-12 gap-x-2">
                                <div className="grid col-span-4 ">
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        name="password"
                                        value={formValues.password || ""}
                                        onChange={(event) => handleChange("password", event.target.value)}
                                        autoComplete="off"
                                        className="w-[100%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                    <div className="text-red-500 text-sm">
                                        {errors.password}
                                    </div>
                                </div>
                                <div className="w-[100%] h-[100%] grid col-span-8 ">
                                    <div className="w-[100%] h-[100%]  flex justify-center items-center">
                                        <span className="bg-yellow-400 rounded-xl w-[100%] h-[0.2vw] inline-block"></span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="right col-span-2 md:col-span-2">
                            <div className=" h-[100%] flex  justify-center items-center">
                                <div className="border-yellow-500 border-[0.01vw] py-1 px-3 flex flex-col items-center justify-center">
                                <VscAccount  className="text-[10vw] md:text-[6vw]" onClick={handleClick} />
                                <p onClick={handleClick} className="text-[2vw] md:text-[0.9vw] text-yellow-400 cursor-pointer">Upload Photo</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Permanent Address</h2>
                    <div className="grid  grid-cols-4 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Pin Code"
                                name="P_pinCode"
                                value={formValues.P_pinCode || ""}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (!/^\d*$/.test(value)) {
                                        return;
                                    }
                                    handleChange("P_pinCode", value);
                                }}
                                autoComplete="off"
                                maxLength={6}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_pinCode && errors.P_pinCode}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="State"
                                name="P_state"
                                value={formValues.P_state || ""}
                                onChange={(event) => handleChange("P_state", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_state && errors.P_state}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="City"
                                name="P_city"
                                value={formValues.P_city || ""}
                                onChange={(event) => handleChange("P_city", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_city && errors.P_city}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="House No"
                                name="P_houseNo"
                                value={formValues.P_houseNo || ""}
                                onChange={(event) => handleChange("P_houseNo", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_houseNo && errors.P_houseNo}
                            </div>
                        </div>
                    </div>

                    <div className="grid border-b-[#FFBE59] border-[0.01vw] pb-2 grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Building Name"
                                name="P_building"
                                value={formValues.P_building || ""}
                                onChange={(event) => handleChange("P_building", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_building && errors.P_building}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Road Name"
                                name="P_roadName"
                                value={formValues.P_roadName || ""}
                                onChange={(event) => handleChange("P_roadName", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.P_roadName && errors.P_roadName}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center  mt-6 mb-2">
                        <h2 className="text-[4vw] md:text-xl font-semibold text-gray-700 ">Delivery Address</h2>
                        <div className="flex gap-2 items-center text-[2vw] md:text-[1vw]">
                            <input
                                type="checkbox"
                                id="sameAsPermanent"
                                checked={isSameAddress}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="sameAsPermanent">
                                Same as <span className="text-yellow-500">Permanent Address</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Pin Code"
                                name="D_pinCode"
                                maxLength={6}
                                value={formValues.D_pinCode || ""}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (!/^\d*$/.test(value)) {
                                        return;
                                    }
                                    handleChange("D_pinCode", value);
                                }}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_pinCode && errors.D_pinCode}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="State"
                                name="D_state"
                                value={formValues.D_state || ""}
                                onChange={(event) => handleChange("D_state", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_state && errors.D_state}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="City"
                                name="D_city"
                                value={formValues.D_city || ""}
                                onChange={(event) => handleChange("D_city", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_city && errors.D_city}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="House No"
                                name="D_houseNo"
                                value={formValues.D_houseNo || ""}
                                onChange={(event) => handleChange("D_houseNo", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_houseNo && errors.D_houseNo}
                            </div>
                        </div>
                    </div>

                    <div className="grid  grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Building Name"
                                name="D_building"
                                value={formValues.D_building || ""}
                                onChange={(event) => handleChange("D_building", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_building && errors.D_building}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Road Name"
                                name="D_roadName"
                                value={formValues.D_roadName || ""}
                                onChange={(event) => handleChange("D_roadName", event.target.value)}
                                autoComplete="off"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                            <div className="text-red-500 text-sm">
                                {!formValues.D_roadName && errors.D_roadName}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 transition-all ease-in-out duration-300 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="">Back to <Link to="/login" className="text-yellow-400 font-medium underline">
                        Sign In
                    </Link></div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;




