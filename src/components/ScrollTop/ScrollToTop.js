import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = props => {
  const { pathname } = useLocation(); // 현재 경로를 가져온다.

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
  }, [pathname]); // pathname이 변경될 때마다 useEffect 실행

  return <div />;
};

export default ScrollToTop;
