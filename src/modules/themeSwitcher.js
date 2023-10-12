import React from 'react';
import styled from 'styled-components';

const ThemeSwitcher = ({ switchTheme, isLightTheme }) => {
  return (
    <ThemeSwitcherWrap>
      <input
        type="checkbox"
        onClick={switchTheme}
        value={isLightTheme ? 'LIGHT' : 'DARK'}
      />
    </ThemeSwitcherWrap>
  );
};

const ThemeSwitcherWrap = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  input[type='checkbox'] {
    appearance: none;
    width: 40px;
    height: 40px;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    &[value='LIGHT'] {
      background-image: url(/images/ic_dark_theme.png);
    }
    &[value='DARK'] {
      background-image: url(/images/ic_light_theme.png);
    }
  }
`;

export default ThemeSwitcher;
