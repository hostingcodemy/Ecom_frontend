import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  const { showConfetti, orderDetails } = useCart()

  const { innerWidth, innerHeight } = window;

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {showConfetti && (
        <Confetti
          width={innerWidth}
          height={innerHeight}
          confettiSource={{
            x: innerWidth / 2 - 1,
            y: innerHeight / 2 - 1,
            w: 2,
            h: 2
          }}
          numberOfPieces={500}
          gravity={0.05}
          colors={['#ff0000', '#00ff00', '#0000ff', '#ffcc00', '#ff66ff']}
          className="absolute top-0 left-0 z-10"
        />
      )}
      <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full animate-fadeInCenter">
        {/* <button
          onClick={handleConfetti}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        >
          Celebrate Payment!
        </button> */}
        <div className="text-center p-8 bg-white shadow-lg rounded-lg w-96 animate-fadeInScale">
          <div className="flex justify-center mb-4 animate-logoDraw">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                className="checkmark-path"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-600 mb-2">{orderDetails.message}</h1>
          <p>Order Id: {orderDetails.orderId}</p>
          <p>Order Number: {orderDetails.orderNumber}</p>
          <p className="text-gray-600 mb-4">Your payment has been processed successfully. Thank you for your purchase!</p>

          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-700"
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInCenter {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes logoDraw {
            0% {
              stroke-dasharray: 0, 30;
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dasharray: 30, 0;
              stroke-dashoffset: 0;
            }
          }

          .animate-fadeInCenter {
            animation: fadeInCenter 1s ease-out forwards;
          }

          .animate-fadeInScale {
            animation: fadeInScale 0.8s ease-out forwards;
          }

          .animate-logoDraw {
            animation: logoDraw 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccessPage;