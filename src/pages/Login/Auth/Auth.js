import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    searchParams.get('code');

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
          // 로그인 성공 시 토큰 저장 후 메인 페이지로 이동
          localStorage.setItem('access_token', res.access_token);
          navigate('/');
        } else {
          // 로그인 실패 시 로그인 페이지로 이동
          alert('로그인이 실패하였습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        }
      });
  }, [searchParams]);
  return <div />;
};

export default Auth;
