import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';


const AppLayout = () => {
  return (
    <>
      <Nav />
      <main className='h-[100%] w-[100%]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AppLayout;
