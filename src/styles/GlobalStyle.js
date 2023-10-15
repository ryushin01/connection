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
    background-color : ${props => props.theme.grayscaleA};
    color : ${props => props.theme.grayscaleF};
    font-family: "AppleSDGothicNeo", "Noto Sans KR", sans-serif;;
  }

  li {
    list-style: none;
  } 

  a {
    color: initial;
    text-decoration: none;
  }  
  
  button {  
    border: 0;
    background-color: transparent;
    cursor: pointer;
  } 

  main {  
    position: relative
    z-index: 1;
    flex: 1;
    width: 100%;
  }

  #root {  
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
