// import React from 'react';
// import Input from '../Input/Input';
// import Button from '../Button/Button';
// import styled, { css } from 'styled-components';

// const InputSearch = ({ ...props }) => {
//   return (
//     <SearchWrap {...props}>
//       <form>
//         <fieldset>
//           <legend>검색어 입력 폼</legend>
//           <Input
//             type="search"
//             name="search"
//             placeholder="검색어를 입력해 주세요."
//             size="medium"
//           />
//           <Button content="검색" size="medium" shape="solid" color="primary" />
//         </fieldset>
//       </form>
//     </SearchWrap>
//   );
// };

// const FlexCenter = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SearchWrap = styled.div`
//   overflow: hidden;
//   width: 0;
//   height: 100%;
//   margin-right: 24px;
//   transition: width 0.25s linear;
//   font-size: 0;

//   fieldset {
//     ${FlexCenter};
//   }

//   legend {
//     position: absolute;
//     z-index: -1;
//     font-size: 1px;
//     color: transparent;
//   }

//   label {
//     flex: 1;
//   }

//   input {
//     padding: 0 12px;
//     border: 0;
//     border-bottom: 1px ${props => props.theme.grayscaleF} solid;
//   }

//   button {
//     display: none;
//     width: 20%;
//     margin-left: 8px;
//   }

//   ${props => {
//     if (props.activate === true) {
//       return `
//         width: 100%;
//       `;
//     }
//   }}
// `;

// export default InputSearch;
