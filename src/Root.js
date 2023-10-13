import React, { useState } from 'react';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';

const Root = () => {
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

export default Root;
