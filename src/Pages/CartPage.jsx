import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { SlLocationPin } from "react-icons/sl";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  API_ADDRESS_UPDATE,
  API_PLACE_ORDER
}
  from '../config/Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartPage = () => {

  const custId = localStorage.getItem('_id');
  const isLogin = localStorage.getItem('is_login');
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const phoneNumber = localStorage.getItem('phone');
  const emailAddress = localStorage.getItem('email');
  const customerDeliAddress = JSON.parse(localStorage.getItem("customer_details"));

  const [grossAmount, setGrossAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const netProfitDetails = {
    grossAmount: `₹ ${grossAmount}`,
    redemptionAmount: `₹ ${0}`,
    offerAmount: `₹ ${0}`,
    discountAmount: `₹ ${0}`,
    discountPercentage: `₹ ${0}`,
    taxes: `₹ ${0}`
  };

  const cgst = (grossAmount * 9) / 100;
  const sgst = (grossAmount * 9) / 100;
  const totalTax = cgst + sgst;
  const finalAmount = grossAmount + totalTax;

  netProfitDetails.taxes = `₹ ${totalTax.toFixed(2)}`;

  const formattedCustomerAddress = customerDeliAddress
    ? `${customerDeliAddress.D_houseNo}, ${customerDeliAddress.D_building}, ${customerDeliAddress.D_roadName}, ${customerDeliAddress.D_city}, ${customerDeliAddress.D_state} - ${customerDeliAddress.D_pinCode}`
    : null;

  const [addresses, setAddresses] = useState(
    formattedCustomerAddress ? [formattedCustomerAddress] : []
  );

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0] : ""
  );

  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    D_houseNo: "",
    D_building: "",
    D_roadName: "",
    D_city: "",
    D_state: "",
    D_pinCode: "",
  }

  const [formData, setFormData] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      first_name,
      last_name,
      phone,
      email,
      D_houseNo,
      D_building,
      D_roadName,
      D_city,
      D_state,
      D_pinCode,

    } = formData;
    const errors = {};
    let isValid = true;

    if (!first_name) {
      isValid = false;
      errors.first_name = "First name is required.";
    }
    if (!last_name) {
      isValid = false;
      errors.last_name = "Last name is required.";
    }
    if (!phone) {
      isValid = false;
      errors.phone = "Phone is required.";
    }
    if (!email) {
      isValid = false;
      errors.email = "Email is required.";
    }
    if (!D_houseNo) {
      isValid = false;
      errors.D_houseNo = "House no. is required.";
    }
    if (!D_building) {
      isValid = false;
      errors.D_building = "Building no. is required.";
    }
    if (!D_roadName) {
      isValid = false;
      errors.D_roadName = "Road name is required.";
    }
    if (!D_city) {
      isValid = false;
      errors.D_city = "City is required.";
    }
    if (!D_state) {
      isValid = false;
      errors.D_state = "State is required.";
    }
    if (!D_pinCode) {
      isValid = false;
      errors.D_pinCode = "Pin Code is required.";
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
      customer_id: custId,
      D_pinCode: formData.D_pinCode,
      D_state: formData.D_state,
      D_city: formData.D_city,
      D_houseNo: formData.D_houseNo,
      D_building: formData.D_building,
      D_roadName: formData.D_roadName,
    }

    try {
      const res = await axios({
        method: "POST",
        url: API_ADDRESS_UPDATE,
        data: payload,
      });

      if (res.data.status) {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: res.data.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // });

        setFormData(initialValues);
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
    }

  };

  const { setCartItems, cartItems, removeFromCart, updateQuantity, togglePriceType, setCartCount, cartCount, handleConfetti, setOrderDetails } = useCart();

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => {
      const price = item.isWholesale ? item.wsp_price : item.rp_price;
      return total + (price * item.quantity);
    }, 0);

    setGrossAmount(totalAmount);
  }, [cartItems]);

  const navigate = useNavigate()

  const handlePlaceOrder = async () => {
    if (isLogin) {
      const userId = localStorage.getItem('_id');
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));

      const payload = {
        customerId: userId,
        cartItems: cartItems,
      };

      try {
        const res = await axios({
          method: "POST",
          url: API_PLACE_ORDER,
          data: payload,
        });

        if (res.status === 200 && res.data.status) {
          // Swal.fire({
          //   position: "center", 
          //   icon: "success",
          //   title: `${res.data.message}`,
          //   html: `<b>Order ID:</b> ${res.data.orderId}<br><b>Order Number:</b> ${res.data.orderNumber}`,
          //   showConfirmButton: false,
          //   timer: 3000, 
          // });
          setCartCount(0)
          setCartItems([])
          localStorage.removeItem("cartItems")
          setOrderDetails(res.data)
          navigate("/confetti")
          handleConfetti()
          setTimeout(() => {
            navigate("/");
          }, 10000);

        } else {
          console.error(res.data.message);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Order Failed",
            text: "Failed to place the order. Please try again!",
          });
        }
      } catch (error) {
        console.error("API Error:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: "An error occurred while placing the order. Please try again!",
        });
      }
    } else {
      navigate("/signup");
    }
  };

  const [inputs, setInputs] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const calculateTotalPrice = (item) => {
    const price = item.isWholesale ? item.wsp_price : item.rp_price;
    return price * item.quantity;
  };


  const handleRemove = (productId, isWholesale) => {
    removeFromCart(productId, isWholesale);
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = existingCartItems.filter(
      (item) => item.itemId !== productId || item.isWholesale !== isWholesale
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartCount(updatedCartItems.length);
  };

  const handleQuantityChange = (productId, newQuantity, isWholesale) => {
    updateQuantity(productId, newQuantity, isWholesale);
  };

  const handleTogglePrice = (productId) => {
    togglePriceType(productId);
  };

  return (
    <>
      <div className="cart-page relative p-3 flex flex-col gap-2" >
        <div className="wrapperCont w-[100%] h-[100%] flex md:flex-row flex-col justify-between px-5 md:px-28">
          <div className="left w-[100%] md:w-[67%] flex flex-col gap-5">
            <div className="logInuserDetails shadow-xl bg-[#fdfbfbde] w-[100%] h-[10vh] md:h-[30vh] rounded-md p-2">
              <div className="logo flex leading-tight gap-4 justify-start items-center">
                <VscAccount size={25} />
                <div className="heading">
                  <h1 className='font-semibold text-[3vw] md:text-[1.3vw] text-[#FBBF36]'>Account</h1>
                  {isLogin ? (
                    ''
                  ) : (
                    <p className='text-[2vw] md:text-[0.9vw]'>To place your order now. log in to your existing account or sign up.</p>
                  )}
                </div>
              </div>
              {isLogin ? (
                <div className='flex gap-3 mt-5'>
                  <div>
                    {firstName} {lastName}
                  </div>
                  <div className='border-l-[0.2vw] border-yellow-400 pl-3'>
                    {phoneNumber}
                  </div>
                  <div className='border-l-[0.2vw] border-yellow-400 pl-3'>
                    {emailAddress}
                  </div>
                </div>
              ) : (
                <div className="btnsWrapper flex gap-3 pl-10 mt-5">
                  <div className="logInBtn flex items-center flex-col px-5 border-[0.01vw]  border-[#fbbf36] cursor-pointer rounded-full" onClick={() => navigate("/login")}>
                    <p className=' text-[2vw] md:text-[0.75vw]'>Have an account?</p>
                    <h3 className=' text-[2vw] md:text-[0.95vw] font-semibold'>Sign In</h3>
                  </div>
                  <div className="signInBtnPayment flex items-center flex-col px-5 border-[0.001vw] bg-[#FEFCE8] cursor-pointer border-black rounded-full" onClick={() => navigate("/signup")}>
                    <p className=' text-[2vw] md:text-[0.75vw]'>New here?</p>
                    <h3 className=' text-[2vw] md:text-[0.95vw] font-semibold'>Sign Up</h3>
                  </div>
                </div>
              )}
            </div>

            <div className="addressDetails shadow-xl bg-[#fdfbfbde] w-[100%] h-auto md:h-auto flex flex-col gap-3 rounded-md p-2">

              <div className="logo flex justify-start items-center gap-2">
                <SlLocationPin size={20} />
                <h1 className="border-l-[0.1vw] border-orange-600 px-3 font-semibold">Address</h1>
              </div>

              <div className="detailsWrapper px-7 flex flex-col gap-2">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={address}
                        checked={selectedAddress === address}
                        onChange={() => setSelectedAddress(address)}
                      />
                      <p className="details bg-[#FEFCE8] rounded-md p-3 border-b-[0.01vw] border-red-400 text-[1.2vw] md:text-[0.9vw] w-[80%]">
                        <span className="font-bold text-[1.5vw] md:text-[1vw]">Address:</span> {address}
                      </p>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 text-[1.2vw] md:text-[1vw]">No address found.</p>
                )}

                <div
                  className="addNew text-[2vw] md:text-[1vw] p-1 rounded-md bg-yellow-400 w-[20%] flex justify-center items-center h-[100%] cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Add Address
                </div>
              </div>

              {showModal && (
                <div className="modal absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                  <div className="bg-white p-5 rounded-md w-[400px] max-w-[90%] md:w-[400px] shadow-lg overflow-y-auto max-h-[90vh]">
                    <h2 className="text-lg font-semibold mb-3 text-center">Enter Address</h2>

                    <div className="flex flex-col gap-3">
                    <div>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="First name"
                          value={formData.first_name || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.first_name && errors.first_name}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Last name"
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.last_name && errors.last_name}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Mobile number"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.phone && errors.phone}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.email && errors.email}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_houseNo"
                          placeholder="House Number"
                          value={formData.D_houseNo || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_houseNo && errors.D_houseNo}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_building"
                          placeholder="Building Name"
                          value={formData.D_building || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_building && errors.D_building}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_roadName"
                          placeholder="Road Name"
                          value={formData.D_roadName || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_roadName && errors.D_roadName}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_city"
                          placeholder="City"
                          value={formData.D_city || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_city && errors.D_city}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_state"
                          placeholder="State"
                          value={formData.D_state}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_state && errors.D_state}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="D_pinCode"
                          placeholder="Pin Code"
                          value={formData.D_pinCode}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          autoComplete='off'
                          maxLength={6}
                        />
                        <div className="text-red-500 text-sm">
                          {!formData.D_pinCode && errors.D_pinCode}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded w-[45%]">
                        Cancel
                      </button>
                      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded w-[45%]">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="paymentDetails  shadow-2xl bg-[#fdfbfbde]] w-[100%] h-[10vh] md:h-[20vh] flex flex-col gap-3  rounded-md p-2">
              <div className="logo flex justify-start items-center gap-2">
                <IoWalletOutline size={20} />
                <h1 className='border-l-[0.1vw] border-orange-600 px-3 font-semibold'>Payment</h1>
              </div>
              <div className="details px-7">
                <p>Payment details</p>
              </div>
            </div>
          </div>

          <div className="right w-[100%] md:mt-0 mt-5 md:w-[30%] h-[60vh] md:h-[79vh] flex flex-col justify-between gap-2  rounded-md p-1">
            {cartItems.length === 0 ? (
              <p className='ml-2'>Your cart is empty.</p>
            ) : (
              <div className="fixedPartTop w-[100%] h-[90%] md:h-[70%] flex border-[0.1vw] rounded-md p-2 border-zinc-300 shadow-xl flex-col overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item mb-2 w-[100%] shadow-lg  flex border-b-[0.1vw] items-center justify-center px-1 border-orange-600"
                  >
                    <div className="cartleft bg-red-400 w-[20%] flex justify-center items-center h-[7vh]">
                      <div className="cartImgWrapper h-[100%] w-[100%]">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="cart-item-image h-[100%] w-[100%]"
                        />
                      </div>
                    </div>
                    <div className="cartright w-[80%]">
                      <div className="cart-item-details w-[100%] flex justify-between">
                        <div className="textWrapper px-3">
                          <h3 className=" text-[2vw] md:text-[0.8vw] font-semibold">{item.name}</h3>
                          <p className="md:text-[0.7vw] text-[2vw]">
                            <strong></strong>
                            {item.isWholesale
                              ? "Wholesale Price: "
                              : "Retail Price: "}
                            &#8377;
                            {item.isWholesale ? item.wsp_price : item.rp_price}
                          </p>
                          <div className="quantity-controls flex w-[15vw] md:w-[6vw] h-[3vh]  rounded-2xl py-2 cursor-pointer items-center justify-between">
                            <button
                              type="button"
                              className='hover:border-[0.01vw] border-gray-300 transition-all ease-in-out duration-500 px-1 h-4 flex items-center justify-center'
                              onClick={() =>
                                handleQuantityChange(item.item_cd, item.quantity - 1, item.isWholesale)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              className="text-[0.8vw] w-[40%] outline-none"
                              type="text"
                              id="quantity"
                              value={item.quantity}
                              min="1"
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.item_cd,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              type="button"
                              className='hover:border-[0.01vw] border-gray-300 transition-all ease-in-out duration-500 px-1 h-4 flex items-center justify-center'
                              onClick={() =>
                                handleQuantityChange(item.item_cd, item.quantity + 1, item.isWholesale)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleTogglePrice(item.item_cd)}
                          className="toggle-price-btn text-[1.5vw] md:text-[0.9vw]"
                        >
                          <div className="flex flex-row md:flex-col items-center">
                            Switch to{" "}
                            <span className="bg-[#FBBF10] px-1 text-white rounded-3xl font-semibold w-[10vw] md:w-[5vw] inline-block">
                              {item.isWholesale ? "Retail " : "Wholesale "}
                            </span>
                            <span className="font-semibold">Price</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleRemove(item.item_cd, item.isWholesale)}
                          className="remove-item-btn"
                        >
                          <span
                            className="p-1 rounded-md bg-red-600 inline-block"
                            aria-label="remove"
                          >
                            <IoClose className="text-white" size={15} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="billDetails w-[100%] rounded-md border-[0.1vw] border-yellow-500 h-[29%] ">
              <div className="fixedPart w-[100%] rounded-md h-[60%] flex flex-col overflow-y-auto">
                <div className="">
                  <div className="flex justify-between px-3 py-1 items-center">
                    <p className='flex items-center gap-1'><strong>Gross Amount</strong>
                    </p>
                    <p className='text-[#F78C27]'>&#8377;{grossAmount}</p>
                  </div>
                </div>
                <div className="details text-[3vw] md:text-[0.8vw] px-3">
                  <p className='flex justify-between'>Offer Amount <span className='font-bold'>&#8377;{0}</span></p>
                  <p className='flex justify-between redemm'>Redeem Code <input type="text" placeholder='Enter Redeem Code' className='border-[0.01vw] border-black px-2 rounded-xl' /> <span className='font-bold'>&#8377;{0}</span></p>
                </div>
              </div>
              <div className="totalPrice w-[100%] h-[40%] flex-col px-2 text-[1.0vw]  justify-between items-center">
                <div className="w-[100%] flex justify-between mb-1 md:mb-3 px-1 text-[2.5vw] md:text-[1vw]">
                  {/* Net Amount Section */}
                  <p className="flex items-center relative gap-1">
                    <strong className='text-[2vw] md:text-[0.8vw]'>Payable Amount (Inclusive of all Tax)</strong>
                    <span
                      className="info cursor-pointer relative"
                      onMouseEnter={() => setShowPopup(true)}
                      onMouseLeave={() => setShowPopup(false)}
                    >
                      <IoMdInformationCircleOutline size={13} />

                      {showPopup && (
                        <div className="absolute -top-[1300%] left-[170%] transform -translate-x-1/2 mt-2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[250px] bg-white p-3 border border-gray-300 shadow-lg rounded-md text-[1vw] sm:text-[0.9vw] md:text-[0.85vw]">
                          <div className="flex flex-col gap-2">
                            <div className='flex justify-between'><strong className='border-b-[0.1vw] border-yellow-400'>Gross Amount:</strong> {netProfitDetails.grossAmount}</div>
                            <div className='flex justify-between'><strong className='border-b-[0.1vw] border-yellow-400'>Redemption Amount:</strong> {netProfitDetails.redemptionAmount}</div>
                            <div className='flex justify-between'><strong className='border-b-[0.1vw] border-yellow-400'>Offer Amount:</strong> {netProfitDetails.offerAmount}</div>
                            <div className='flex justify-between'><strong className='border-b-[0.1vw] border-yellow-400'>Discount:</strong> {netProfitDetails.discountAmount}</div>
                            <div className='flex justify-between'><strong className='border-b-[0.1vw] border-yellow-400'>Taxes:</strong> {netProfitDetails.taxes}</div>
                          </div>
                        </div>
                      )}
                    </span>
                  </p>

                  {/* Net Amount Display */}
                  <p className="bg-[#FFBF5C] text-white px-1 rounded-3xl font-semibold">₹{finalAmount.toFixed(2)}</p>
                </div>
                <div
                  onClick={handlePlaceOrder}
                  className="orderPlaceBtn bg-yellow-500 px-1 flex items-center justify-center py-1 text-[3vw] md:text-[1vw] md:py-0 rounded-md">
                  <button>Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CartPage;

