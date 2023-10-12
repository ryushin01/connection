import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const switchTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router />
      <ThemeSwitcher switchTheme={switchTheme} isLightTheme={isLightTheme} />
    </ThemeProvider>
  );
};
