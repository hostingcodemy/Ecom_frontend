
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage';
import ProductDetail from './Components/ProductDetails';
import CartPage from './Pages/CartPage';
import { CartProvider } from './Context/CartContext';
import AppLayout from './AppLayout/AppLayout';
import Home from './Pages/Home';
import Sidebar from './Components/Sidebar';
import LoginPage from './Components/Login';
import SignUpPage from './Components/Signup';
import { UserProvider } from './Context/userContext';
import { FavoritesProvider } from './Context/FavouriteContext';
import FavouritePage from './Pages/FavouritePage';
import ConfettiPage from './Pages/OrderSuccesfullPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sidebar",
        element: <Sidebar />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "/product/:itemCdId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/favourite",
        element: <FavouritePage />,
      },
      {
        path: "/confetti",
        element: <ConfettiPage />,
      },
    ],
  },
]);

const App = () => {

  return (
    <FavoritesProvider>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </FavoritesProvider>
  );
};

export default App;







