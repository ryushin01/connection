import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as AdminIcon } from '../../../svg/icon_admin.svg';
import { ReactComponent as LogoutIcon } from '../../../svg/icon_logout.svg';
import styled, { css } from 'styled-components';

// const isLogin = localStorage.getItem('accessToken');

const RestApiKey = process.env.REACT_APP_RestApiKey;
const RedirectUri = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/logout?client_id=${RestApiKey}&logout_redirect_uri=${RedirectUri}`;

const Account = () => {
  const navigate = useNavigate();

  const postKakaoLogout = () => {
    const accessToken = !!localStorage.getItem('accessToken');
    const isKakao = localStorage.getItem('isKakao');

    if (!accessToken) {
      alert('로그인이 되어있지 않습니다.');
      return;
    } else if (accessToken && !isKakao) {
      localStorage.clear();
      alert('로그아웃 되었습니다.');
      navigate('/');
      window.location.reload();
    } else if (accessToken && isKakao) {
      localStorage.clear();
      alert('로그아웃 되었습니다.');
      window.location.href = kakaoURL;
    }
  };

  const logout = () => {
    postKakaoLogout();
  };

  return (
    <AccountList>
      <>
        <li>
          <Link to="/">
            <AdminIcon />
            관리자
          </Link>
        </li>
        {/* )} */}
        <li>
          <button type="button" onClick={logout}>
            <LogoutIcon />
            로그아웃
          </button>
        </li>
      </>
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
    ${FlexCenter};
    gap: 4px;
    font-size: 16px;
    color: ${props => props.theme.grayscaleF};
  }
`;

export default Account;
