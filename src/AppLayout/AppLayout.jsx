import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

const AppLayout = () => {
  const location = useLocation(); 

  const shouldHideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <Nav />
      <main className="h-[100%] w-[100%]">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}.
    </>
  );
};

export default AppLayout;
