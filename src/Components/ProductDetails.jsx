import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import SimilarProducts from './SimilarProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductGallery from './ProductGallery';

const ProductDetail = () => {
  const location = useLocation();
  const { itemDetails } = location.state || {};
  const { addToCart, cartCount, setCartCount, isWholesale, setIsWholesale } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (itemDetails) {
      setProduct(itemDetails);
    } else {
      console.log("Product not found");
    }
  }, [itemDetails]);




  const handleAddToCart = () => {
    addToCart(product, quantity, isWholesale);
    setCartCount(cartCount + quantity);

    const type = isWholesale ? "Wholesale" : "Retail";
    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const price = isWholesale ? product.wsp : product.rp;

    const cartItem = {
      productId: product.item_id,
      itemId: product.item_cd,
      productName: product.item_name,
      quantity: quantity,
      isWholesale: isWholesale,
      type: type,
      date: date,
      price: price,
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    toast.success(`${product.item_name} added to cart successfully!`, {
      progressStyle: {
        backgroundColor: "#FF6547",
      },
    });
  };

  const togglePriceType = () => {
    setIsWholesale((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };

  useEffect(() => {
    if (product) {
      const price = isWholesale ? product.wsp : product.rp
      setTotalPrice(price * quantity)
    }
  }, [product, quantity, isWholesale]);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (!value || value === '' || isNaN(value) || parseInt(value) < 1) {
      return;
    }
    setQuantity(parseInt(value));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="product-detail p-10 flex flex-col gap-3">
      <div className="productDetailsWrapper w-[100%] flex-col md:flex-row flex">
        <div className="productDetailsLeft h-[100%]  flex flex-col w-[100%] md:w-[50%]">
          <ProductGallery image={itemDetails.item_images[0]}/>
        </div>

        <div className="productDetailsRight p-10 flex flex-col items-center w-[100%] md:w-[50%] gap-2">
          <h2 className="text-center text-[9vw] md:text-[5vw] tracking-tight" style={{ color: `${itemDetails.color}` }}>
            {itemDetails.item_name}
          </h2>

          <div className="product-price-section flex gap-5 rounded-full border-[0.01vw] border-black items-center p-5">
            <button onClick={togglePriceType} className="toggle-price-btn border-r-[0.1vw] pr-7 border-[#FBBF10]">
              <div>
                Switch to
                <span className="bg-[#FBBF10] p-1 text-white rounded-3xl font-semibold md:ml-1 md:mr-1 w-[15vw] md:w-[7vw] inline-block">
                  {isWholesale ? 'Retail' : 'Wholesale'}
                </span>
                <span className="font-semibold">Price</span>
              </div>
            </button>
            <p className="md:text-[1.2vw] flex items-center text-[2vw] gap-2">
              <strong>Price: </strong>
              <span className='flex items-center gap-1'>
                <p className='flex justify-center rounded-3xl font-semibold text-[#00F866]'>{isWholesale ? 'Wholesale' : 'Retail'} :</p>
                &#8377;{isWholesale ? itemDetails.wsp : itemDetails.rp}
              </span>
            </p>

          </div>

          <div className="quantity-section border-[0.01vw] items-center px-5 py-1 border-black flex rounded-full">
            <label htmlFor="quantity" className="mr-5">Quantity:</label>

            <button onClick={handleDecrement}>-</button>

            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input bg-transparent text-center w-12"
            />

            <button onClick={handleIncrement}>+</button>
          </div>

          <div className="total-price mt-3">
            <p>
              <strong>Total Price: </strong><span className='text-[#00F866] font-semibold '>&#8377;{totalPrice}</span>
            </p>
          </div>

          <div className="product-actions flex px-3 bg-yellow-50 border-[#3f3c23] border-[0.01vw] justify-start items-start text-[#020202] rounded-3xl hover:bg-[#FBBF10] transition-all ease-in-out duration-500 hover:text-white hover:font-semibold">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>

          <div className="product-detail-header mt-5 py-3 border-t-[0.1vw] border-[#FBBF10]">
            <div className="product-description text-center text-[1vw]">
              <p><strong className='text-[#FBBF10]'>Description</strong>: {itemDetails.details}</p>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductDetail;
