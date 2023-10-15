import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerConversionButton from './components/SellerConversionButton/SellerConversionButton';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Auth from './pages/Login/Auth/Auth';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
      <SellerConversionButton />
    </BrowserRouter>
  );
};

export default Router;
