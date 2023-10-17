import React from 'react';
import AccountListItem from './AccountListItem/AccountListItem';
import styled, { css } from 'styled-components';

const ACCOUNT_MENU_LIST = [
  { id: 1, text: '로그인', path: '/login' },
  { id: 2, text: '회원가입', path: '/signup' },
  { id: 3, text: '어드민', path: '/admin' },
];

const isLogin = true;

const postKakaoLogout = () => {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    alert('로그인이 되어있지 않습니다.');
    return;
  } else {
    localStorage.removeItem('access_token');
    alert('로그아웃 되었습니다.');
    window.location.reload();
  }

  // fetch(`http://10.58.52.246:8000/`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     Authorization: `Bearer ${access_token}`,
  //   },
  // })
  //   .then(response => response.json())
  //   .then(result => {
  //     if (result.message === 'SUCCESS') {
  //       localStorage.removeItem('access_token');
  //       alert('로그아웃 되었습니다.');
  //       window.location.reload();
  //     } else {
  //       alert('로그아웃에 실패하였습니다.');
  //     }
  //   });
};

const logout = () => {
  postKakaoLogout();
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
    color: ${props => props.theme.grayscaleF};
  }
`;

export default Account;
