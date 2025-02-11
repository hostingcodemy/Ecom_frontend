import React, { useEffect, useState, useRef } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useCart } from '../Context/CartContext';
import { RiMenu3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useFavorites } from '../Context/FavouriteContext';
import logoImg from "../assets/YELOMYCART.COM.png";
import { MdSettings, MdExitToApp, MdShoppingCart } from 'react-icons/md';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import DispatchPopup from './DespatchPopup';
import {
  API_ALL_ORDERS,
  API_CATEGORIES,
  API_SUB_CATEGORY
}
  from '../config/Api';
import axios from 'axios';

const Nav = () => {
  const [isMoving, setIsMoving] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const isOnFavouritePage = location.pathname === "/favourite";
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const isLogin = localStorage.getItem('is_login');
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const customerId = localStorage.getItem('_id');
  const { cartCount } = useCart();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [isDropdownCatOpen, setIsDropdownCatOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [historyData, setHistryData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios({
      method: "GET",
      url: API_CATEGORIES,
    })
      .then((res) => {
        const result = res?.data?.data;
        if (Array.isArray(result)) {
          setCatData(result.slice(0, 4));
        } else {
          console.error("Expected an array but got:", result);
        }

      }).catch((e) => {
        console.log(e);
      });
  };

  const fetchSubCategories = async (category_id) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${API_SUB_CATEGORY}/${category_id}`,
      });
      const result = res?.data?.data;
      setSubCatData(result);
      return result;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  const fetchOrderHistry = () => {

    const payload = {
      customerId: customerId
    };

    axios({
      method: "POST",
      url: API_ALL_ORDERS,
      data: payload,
    })
      .then((res) => {
        const result = res?.data?.findCustomerOrders;
        setHistryData(result);

      }).catch((e) => {
        console.log(e);
      });
  };


  const handleCategoryClick = (category_id) => {
    setSelectedCategoryId(prevSelectedId => prevSelectedId === category_id ? null : category_id);
    fetchSubCategories(category_id);
    setIsDropdownCatOpen((prevState) => !prevState);
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  const [isPaused, setIsPaused] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleAnimation = () => {
    setIsPaused(prevState => !prevState);
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 6));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < 6 ? prevIndex + 1 : 0));
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("role_id");
    localStorage.removeItem("role_name");
    localStorage.removeItem("is_login");
    localStorage.removeItem("customer_details");

    navigate('/');
  };

  return (
    <div className='NavBar w-[100%] relative'>
      <div className="sideHamburger rounded-xl z-10 w-[50%] h-[80vh] backdrop-blur-2xl p-3 gap-7 flex flex-col absolute top-5 transition-all ease-in-out duration-500" style={{ right: `${!isHamburgerOpen ? "-100%" : "1%"}` }}>

        <div className="hamburgerTop flex items-center justify-between">
          {isLogin ? (
            <div className='relative'>
              <div
                ref={profileRef}
                className='flex items-center justify-center text-[5vw] md:text-[1.7vw] text-yellow-400 gap-2 cursor-pointer'
                onClick={toggleDropdown}
              >
                {firstName} {lastName} <MdAccountCircle />
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className='absolute z-20 -left-2 md:-left-5 mt-2 w-48 bg-white text-black shadow-lg rounded-xl border border-gray-200 p-2 transition-all duration-300 ease-in-out transform scale-95 origin-top-right'
                  style={{
                    transform: isDropdownOpen ? 'scale(1)' : 'scale(2)',
                    opacity: isDropdownOpen ? 1 : 0,
                  }}
                >
                  <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                    <MdAccountCircle />
                    <span>Profile</span>
                  </div>
                  <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                    <MdShoppingCart />
                    <span>My Orders</span>
                  </div>
                  <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                    <MdSettings />
                    <span>Settings</span>
                  </div>
                  <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                    <MdExitToApp />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ul className='flex gap-2'>
              <li className='flex gap-2 border-[0.01vw] border-yellow-400 px-1 rounded-full justify-center items-center' onClick={() => navigate("/login")}>Sign In</li>
              <li className='flex gap-2 border-[0.01vw] border-yellow-400 px-1 rounded-full justify-center items-center bg-yellow-400' onClick={() => navigate("/signup")}>Sign Up</li>
            </ul>
          )}
          <div onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} className="crossIcon flex justify-end">
            <IoClose size={20} />
          </div>
        </div>
        <ul className='flex flex-col gap-2'>
          {catData?.map((category) => (
            <li key={category.category_id}>
              <select name="" id="">
                <option value={category.category_id}>{category.category_name}</option>
              </select>
            </li>
          ))}
          <li className='flex gap-2  text-[#FBBF36]'>Offer</li>
        </ul>
      </div>
      <div className="navRow1 h-[9vh] border-b-2 border-zinc-200 w-[100%] px-4 flex items-center justify-between">
        <div className="navRow1Left md:block hidden w-[37%] relative">
          <ul className='flex cursor-pointer items-center text-[1vw] gap-3 font-normal'>
            {catData?.map((category) => (
              <>
                <li key={category.category_id} className={`${category.category_id === 6 ? 'hidden' : 'inline-block'
                  }`}>
                  <p
                    key={category.category_id}
                    className={`category flex gap-1 items-center ${selectedCategoryId === category.category_id ? 'text-yellow-400' : ''}`}
                    onClick={() => handleCategoryClick(category.category_id)}
                  >
                    {category.category_name}
                    <IoIosArrowDown />
                  </p>
                </li>
              </>
            ))}
            <li className='text-[#FBBF10]'>
              <p value="Sale">Offers</p>
            </li>
          </ul>
        </div>
        <div className={`dropdownMenuCategorywise absolute top-[55%] p-5 cursor-pointer bg-zinc-100 shadow-md rounded-md w-fit z-50 transition-transform duration-500 ease-in-out ${isDropdownCatOpen ? 'scale-100' : 'scale-0'
          }`}
          style={{ transformOrigin: 'top center' }}
        >
          <ul className="flex gap-4 categorycont">
            {subCatData.map((item, index) => (
              <li key={index} className="space-y-2">
                <div className=" font-semibold text-center text-[1vw] text-zinc-700 bg-yellow-400 rounded-xl">{item.sub_category_name}</div>
                <ul className="h space-y-2 border-t-[0.01vw] border-b-[0.2vw] hover:border-t-yellow-400 hover:border-b-yellow-400 border-b-zinc-200 pb-[0.2vw]">
                  <div className='hover:border-b-yellow-400  border-b-[0.01vw] border-b-zinc-200 p-2'>
                    {item.items.map((value, idx) => (
                      <li key={idx} className="hover:border-b-yellow-400 text-[0.8vw] text-center text-zinc-600 hover:text-yellow-400 cursor-pointer flex items-center justify-start mb-2 gap-2">
                        <span className='inline-block h-10 w-10'><img className='h-[100%] w-[100%] rounded-lg' src={value.item_images[0]} alt="" /></span>
                        <span className='text-left'>{value.item_name}</span>
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="navRow1Middle Logo w-[25%] ml-10 flex sm:justify-center justify-start">
          <div className="logocont w-[80%] md:w-[40%]">
            <img
              className='h-[100%] w-[100%] cursor-pointer'
              src={logoImg}
              alt="logo"
              onClick={() => navigate('/')}
            />
          </div>
        </div>
        <div className="navRow1Right  md:block hidden h-[100%] w-[35%]">
          <div className='items-center flex justify-end h-[100%]'>

            <div className="btnWarpper h-[100%] w-[50%] justify-center pl-5 border-l-2 border-zinc-200 flex items-center gap-2 text-[1vw]">
              {isLogin ? (
                <div className='relative'>
                  <div
                    ref={profileRef}
                    className='flex items-center justify-center text-[1.7vw] text-yellow-400 gap-2 cursor-pointer'
                    onClick={toggleDropdown}
                  >
                    {firstName} {lastName} <MdAccountCircle />
                  </div>

                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className='absolute z-20 -left-5 mt-2 w-48 bg-white text-black shadow-lg rounded-xl border border-gray-200 p-2 transition-all duration-300 ease-in-out transform scale-95 origin-top-right'
                      style={{
                        transform: isDropdownOpen ? 'scale(1)' : 'scale(2)',
                        opacity: isDropdownOpen ? 1 : 0,
                      }}
                    >
                      <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                        <MdAccountCircle />
                        <span>Profile</span>
                      </div>
                      <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'
                       onClick={() => {
                          fetchOrderHistry();
                          handleOpenPopup();
                        }}>
                        <MdShoppingCart />
                        <span>My Orders</span>
                      </div>
                      <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'>
                        <MdSettings />
                        <span>Settings</span>
                      </div>
                      <div className='flex items-center gap-3 p-2 hover:bg-[#FACC15] transition-all ease-in-out duration-300 cursor-pointer'   onClick={handleLogout}>
                        <MdExitToApp />
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <div className='loginBtn flex items-center gap-2 h-[3vw] px-5 py-1 cursor-pointer hover:bg-[#FBBF10]'>
                      Sign In
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div className="signBtn border-[0.1vw] border-zinc-950 rounded-3xl px-5 py-1 h-[3vw] cursor-pointer flex justify-center items-center hover:bg-[#FBBF10] transition-all ease-in-out duration-500">
                      Sign Up
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} className="hamburgerMenuLOgo md:hidden border-l-2 h-[100%] pl-5 pt-7 border-zinc-200 block">
          <RiMenu3Line size={25} />
        </div>
      </div>
      <div className="navRow2 bg-[#FEFCE8] h-[8vh] w-[100%] flex justify-between items-center border-b-2  px-10">
        <div className="navRow2Left  md:block hidden w-[25%] ">
          <ul className='socialLinks flex gap-9'>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        {isPaused && (
          <div className="previous absolute left-[32.8%] top-[48%] flex items-center space-x-4 mt-4">
            <FiChevronLeft
              className="w-8 h-8  cursor-pointer text-[#facc15]"
              onClick={goToPrevious}
            />
          </div>
        )}
        <div className="navRow2Middle flex items-center justify-center overflow-x-hidden h-full px-3 md:w-[40%] w-[60%] relative">
          <div
            className={`movinContainer w-[200vw] gap-3 absolute flex justify-center text-[2vw] md:text-[1.1vw] ${isPaused ? 'paused' : ''} cursor-pointer`}
            onClick={toggleAnimation}
          >
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
            <p className="text-zinc-400">{`Stay Tuned, We're coming with a `}<span className='text-orange-400'>huge offer!!!</span></p>
          </div>
        </div>
        {isPaused && (
          <div className="next absolute right-[24.5%] top-[48%] flex items-center space-x-4 mt-4">
            <FiChevronRight
              className="w-8 h-8  cursor-pointer text-[#facc15]"
              onClick={goToNext}
            />
          </div>
        )}

        <div className="navRow2Right flex items-center gap-5">
          <div onClick={() => navigate("/favourite")} className="favouriteContainer relative transition-all ease-in-out duration-500 hover:bg-red-300 bg-red-100 px-1 py-1 rounded-[100%]">
            {isOnFavouritePage ?
              <MdFavorite size={20} color="red" />
              :
              <MdOutlineFavoriteBorder size={20} />
            }
            {favorites.length > 0 && (
              <span className="absolute flex justify-center items-center px-[1.2vw] py-[0.3vw] -top-1 -right-1 text-[2vw] md:text-[0.7vw] md:px-[0.4vw] md:py-[0.1vw] bg-red-500 text-white rounded-full">
                {favorites.length}
              </span>
            )}
          </div>
          <Link to="/cart">
            <div className="cartContainer text-white cursor-pointer rounded-full bg-zinc-950 flex items-center gap-3 px-3 py-1 font-medium">
              <FaShoppingCart size={15} /> {cartCount} <span className='md:block hidden'> item in cart</span>
            </div>
          </Link>
        </div>
      </div>
      {isPopupOpen && <DispatchPopup data={historyData} onClose={handleClosePopup} />}
    </div>
  )
}

export default Nav;