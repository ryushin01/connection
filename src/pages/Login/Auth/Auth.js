import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getSnsCode = () => {
    fetch(`http://10.58.52.73:8000/oauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        code: `${searchParams.get('code')}`,
      },
    })
      .then(res => res.json())

      .then(res => {
        if (res.message === 'SUCCESS') {
          // 로그인 성공 시 토큰 저장
          localStorage.setItem('access_token', res.access_token);

          // access_token이 localStorage에 제대로 담겼는지 확인
          const isAccessToken = localStorage.getItem('access_token');

          if (isAccessToken) {
            getAddressCheck();
          }
        } else {
          // 로그인 실패 시 로그인 페이지로 이동
          alert('로그인이 실패하였습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        }
      });
  };

  const getAddressCheck = () => {
    fetch('http://10.58.52.73:8000/API', {
      // 소셜로그인 성공 시 API를 다시 GET하여 회원정보 확인
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_token'), // 해당 유저의 토큰을 헤더에 담아서 보냄
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.address === 'true') {
          navigate('/');
        } else {
          navigate('/signup');
        }
      });
  };

  useEffect(() => {
    searchParams.get('code');

    getSnsCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return <div />;
};

export default Auth;
