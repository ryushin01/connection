import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    fetch(`http://10.58.52.126:8000/users/kakao/callback?code=${searchParam}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(response => {
        response.json();
        throw new Error('[GET] 소셜 로그인 정보 요청 통신 실패');
      })
      .then(result => {
        console.log(result);
        if (
          result.message === 'SUCCESS' &&
          result.accessToken.isAddress === false
        ) {
          // 로그인 성공 시 토큰 저장
          localStorage.setItem('accessToken', result.accessToken.accessToken);
          localStorage.setItem('seller', result.accessToken.isSeller);
          localStorage.setItem('point', result.accessToken.points);
          navigate('/snssignup');
        } else if (
          result.message === 'SUCCESS' &&
          result.accessToken.isAddress === true
        ) {
          localStorage.setItem('accessToken', result.accessToken.accessToken);
          localStorage.setItem('seller', result.accessToken.isSeller);
          localStorage.setItem('point', result.accessToken.points);
          navigate('/main');
        } else {
          // 로그인 실패 시 로그인 페이지로 이동
          alert('로그인이 실패하였습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSnsCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return <div />;
};

export default Auth;
