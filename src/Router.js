import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SkipNavigation from './components/SkipNavigation/SkipNavigation';
import SellerConversionBanner from './components/SellerConversionBanner/SellerConversionBanner';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton/TopButton';
import Main from './pages/Main/Main';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Auth from './pages/Login/Auth/Auth';
import ScrollToTop from './components/ScrollTop/ScrollToTop';
import SnsSignUp from './pages/SignUp/SnsSignUp';
import SellerSignUp from './pages/SignUp/SellerSignUp';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Payment from './pages/Payment/Payment';
import Gateway from './pages/Gateway/Gateway';

const Router = () => {
  // 유저 정보에서 추출하여 적용하기
  const isLogin = true;
  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLogin && (
        <>
          <SkipNavigation />
          <SellerConversionBanner />
          <Header />
        </>
      )}
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* 셀러 유무 분기해서 라우팅 처리 필요 */}
        <Route path="/products/category/:id" element={<List />} />
        <Route path="/products/seller/:id" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/snssignup" element={<SnsSignUp />} />
        <Route path="/sellersignup" element={<SellerSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      {isLogin && (
        <>
          <Footer />
          <TopButton />
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
