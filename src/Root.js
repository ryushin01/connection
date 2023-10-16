import React, { useState } from 'react';
import Router from './Router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';

const Root = () => {
  function reducer(currentState, action) {
    if (currentState === undefined) {
      return {
        number: 1,
      };
    }
    const newState = { ...currentState };
    if (action.type === 'PLUS') {
      newState.number++;
    }
    return newState;
  }
  const store = createStore(reducer);

  const [isLightTheme, setIsLightTheme] = useState(true);

  const switchTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router />
        <ThemeSwitcher switchTheme={switchTheme} isLightTheme={isLightTheme} />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
