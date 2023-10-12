import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const switchTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ThemeSwitcher switchTheme={switchTheme} isLightTheme={isLightTheme} />
    </ThemeProvider>
  );
};

export default App;
