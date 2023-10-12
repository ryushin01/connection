import React from 'react';

const ThemeSwitcher = ({ switchTheme, isLightTheme }) => {
  return (
    <input
      type="checkbox"
      onClick={switchTheme}
      value={isLightTheme ? 'LIGHT' : 'DARK'}
    />
  );
};

export default ThemeSwitcher;
