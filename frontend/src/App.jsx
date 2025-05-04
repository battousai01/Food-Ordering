import React from 'react'
import Navbar from './components/navbar/navbar';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout';
import Order from './pages/Order/orders';
import Footer from './components/Footer/Footer';
import {Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
        <Footer />
    </div>
  );
};

export default App;