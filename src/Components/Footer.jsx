import React from 'react'
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <div className=' h-[60vh] md:h-[50vh] w-[100%] border-t-2 border-zinc-200'>
      <div className="row1 h-[90%] grid sm:grid-cols-12 grid-cols-2 sm:border-b-0 border-b-[0.1vw] border-zinc-200">

          <div className="col border-r-2 sm:col-span-3 border-zinc-200 p-5 flex flex-col gap-5">
            <div className="logo h-[2vw]">
              <img className='h-[100%]' src="src/assets/YELOMYCART.COM.png" alt="" />
            </div>
            <div className="icons flex gap-3">
              <a href="https://www.youtube.com/channel/UCey2YWYKtTbavW0upkFk6-A"><FaYoutube className='text-red-500' size={20} /></a>
              <a href=""><FaFacebookF className='text-blue-400' size={20} /></a>
              <a href=""><FaInstagram className='' size={20} /></a>
            </div>
          </div>
          <div className="col border-r-2 sm:col-span-3 border-zinc-200 p-5">
            <ul className='gap-1 flex flex-col'>
              {["ABOUT", "Contact Us", "About us", "Careers", "Our Stories", "Corporate Information"].map((item, index) => {
                return <li className='text-gray-400' style={{ color: `${index === 0 ? "black" : ""}`, fontWeight: `${index === 0 ? "700" : ""}`, marginBottom: `${index === 0 ? "1vw" : ""}` }} key={index}>{item}</li>
              })}
            </ul>
          </div>
          <div className="col border-r-2 sm:col-span-3 border-zinc-200 p-5">
            <ul className='flex flex-col gap-1'>
              {["HELP", "Payment", "Shipping", "Cancellation & Returns", "FAQ"].map((item, index) => {
                return <li className='text-gray-400' style={{ color: `${index === 0 ? "black" : ""}`, fontWeight: `${index === 0 ? "700" : ""}`, marginBottom: `${index === 0 ? "1vw" : ""}` }} key={index}>{item}</li>
              })}
            </ul>
          </div>
          <div className="col border-r-2 sm:col-span-3 border-zinc-200 p-5">
            <ul className='flex flex-col gap-1'>
              {["CONSUMER POLICY", "Cancellation & Return", "Terms of Use", "Security", "Privacy", "Sitemap", "Grievance Redressal", "EPR Compliance"].map((item, index) => {
                return <li className='text-gray-400' style={{ color: `${index === 0 ? "black" : ""}`, fontWeight: `${index === 0 ? "700" : ""}`, marginBottom: `${index === 0 ? "1vw" : ""}` }} key={index}>{item}</li>
              })}
            </ul>
          </div>
        </div>

      <div className="row2 w-[100%] flex items-center justify-center h-[10%] bg-yellow-300">
        <p>@2025 YELOMYCART</p>
      </div>
    </div>
  )
}

export default Footer
