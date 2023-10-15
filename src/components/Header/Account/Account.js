import React from 'react';
import AccountListItem from './AccountListItem/AccountListItem';
import styled, { css } from 'styled-components';

const ACCOUNT_MENU_LIST = [
  { id: 1, text: '로그인', path: '/login' },
  { id: 2, text: '회원가입', path: '/signup' },
  { id: 3, text: '어드민', path: '/admin' },
];

const isLogin = true;

const logout = () => {
  console.log('로그아웃');
};

const Account = () => {
  return (
    <AccountList>
      {isLogin && (
        <li>
          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </li>
      )}
      {ACCOUNT_MENU_LIST.map(item => {
        return (
          <AccountListItem key={item.id} text={item.text} path={item.path} />
        );
      })}
    </AccountList>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountList = styled.ul`
  ${FlexCenter};
  gap: 4vw;

  a,
  button {
    font-size: 16px;
    color: ${props => props.theme.grayscaleA};
  }
`;

export default Account;
