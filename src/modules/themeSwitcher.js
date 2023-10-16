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
  left: -50px;
  bottom: -50px;
  z-index: 1;
  width: 100px;
  height: 100px;
  border-top: 50px transparent solid;
  border-right: 50px transparent solid;
  border-bottom: 50px transparent solid;
  border-left: 50px ${props => props.theme.grayscaleF} solid;
  transform: rotate(135deg);
  opacity: 0.9;

  input[type='checkbox'] {
    position: relative;
    top: -15px;
    left: -45px;
    transform: rotate(-140deg);
    appearance: none;
    width: 32px;
    height: 32px;
    cursor: pointer;
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
