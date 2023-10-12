import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';

const Router = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const switchTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ThemeSwitcher switchTheme={switchTheme} isLightTheme={isLightTheme} />
    </ThemeProvider>
  );
};
export default Router;
