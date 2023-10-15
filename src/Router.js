import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerConversionButton from './components/SellerConversionButton/SellerConversionButton';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <SellerConversionButton />
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
