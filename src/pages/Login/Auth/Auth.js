import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/// var
const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get('code');

  const getSnsCode = () => {
    fetch(`http://10.58.52.246:8000/users/kakao/callback?code=${searchParam}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(res => res.json())

      .then(res => {
        if (res.message === 'SUCCESS') {
          // 로그인 성공 시 토큰 저장
          localStorage.setItem('access_token', res.accessToken.accessToken);
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
