import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SkipNavigation from './components/SkipNavigation/SkipNavigation';
import SellerConversionBanner from './components/SellerConversionBanner/SellerConversionBanner';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton/TopButton';
import Main from './pages/Main/Main';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Auth from './pages/Login/Auth/Auth';
import ScrollToTop from './components/ScrollTop/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <SkipNavigation />
      {/* 셀러 유무 체크 후 노출 여부 결정 */}
      <SellerConversionBanner />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 셀러 목록 페이지 추가? 또는 셀러 유무 확인 boolean으로 구분? */}
        <Route path="/products/category/:id" element={<List />} />
        <Route path="/products/seller/:id" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
      <TopButton />
    </BrowserRouter>
  );
};

export default Router;
