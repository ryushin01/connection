import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../../config';

/**
 * Auth.js logics
 * @property {function} getSnsCode = 카카오 소셜 로그인을 위한 코드를 받아오는 함수
 *
 */
const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get('code');

  const getSnsCode = () => {
    fetch(`${API.KAKAO}?code=${searchParam}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (
          result.message === 'SUCCESS' &&
          result.accessToken.isAddress === false
        ) {
          // 로그인 성공 시 토큰 저장
          localStorage.setItem('accessToken', result.accessToken.accessToken);
          localStorage.setItem('isKakao', result.accessToken.isKakao);
          localStorage.setItem('isSeller', result.accessToken.isSeller);
          localStorage.setItem('points', result.accessToken.points);
          navigate('/snssignup');
        } else if (
          result.message === 'SUCCESS' &&
          result.accessToken.isAddress === true
        ) {
          localStorage.setItem('accessToken', result.accessToken.accessToken);
          localStorage.setItem('isKakao', result.accessToken.isKakao);
          localStorage.setItem('isSeller', result.accessToken.isSeller);
          localStorage.setItem('points', result.accessToken.points);
          navigate('/main');
          window.location.reload();
        } else {
          // 로그인 실패 시 로그인 페이지로 이동
          alert('로그인이 실패하였습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    getSnsCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return <div />;
};

export default Auth;
