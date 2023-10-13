import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color : ${props => props.theme.grayscaleB};
    color : ${props => props.theme.grayscaleC};
    font-family: "AppleSDGothicNeo", "Noto Sans KR", sans-serif;;
  }
`;

export default GlobalStyle;
