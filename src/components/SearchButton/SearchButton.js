// import React, { useState } from 'react';
// import { ReactComponent as SearchIcon } from '../../svg/icon_search.svg';
// import InputSearch from '../InputSearch/InputSearch';
// import styled from 'styled-components';

// const SearchButton = () => {
//   const [activate, setActivate] = useState(false);

//   const searchActivate = () => {
//     setActivate(prev => !prev);
//   };

//   return (
//     <SearchButtonWrap>
//       <InputSearch activate={activate} />
//       <button type="button" onClick={searchActivate}>
//         <SearchIcon />
//       </button>
//     </SearchButtonWrap>
//   );
// };

// const SearchButtonWrap = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;

//   button {
//     min-width: 48px;
//     width: 48px;
//     height: 48px;
//     border-radius: 50%;
//     border: 1px transparent solid;
//     svg {
//       fill: ${props => props.theme.grayscaleE};
//       path {
//         stroke: ${props => props.theme.grayscaleE};
//       }
//     }
//     &:hover,
//     &:active {
//       background-color: ${props => props.theme.grayscaleF};
//       svg {
//         fill: ${props => props.theme.grayscaleA};
//         path {
//           stroke: ${props => props.theme.grayscaleA};
//         }
//       }
//     }
//   }
// `;

// export default SearchButton;
