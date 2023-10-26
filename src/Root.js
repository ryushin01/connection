import React, { useState } from 'react';
import Router from './Router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeSwitcher from './modules/themeSwitcher';
import GlobalStyle from './styles/GlobalStyle';

const Root = () => {
  // [Redux] 초기값을 빈 배열로 설정합니다. 여러 객체가 들어가야 하므로 배열 타입이 적절합니다.
  let initialValue = [];

  // [Redux] reducer 함수는 변화를 일으키는 함수로 상태(state)와 상태 변화를 위한 액션(action) 파라미터를 받습니다. 그리고 상태와 액션을 참조하여 새로운 상태를 반환합니다.
  function reducer(state = initialValue, action) {
    // 아래 두 콘솔은 풀어서 직접 확인하시는 것을 추천합니다.
    // console.log(action);
    // console.log(action.payload);

    // [Redux] initialValue는 불변성(Immutability)을 가져야 하므로, 이것을 복사할 변수가 필요합니다. 여기서는 직관적으로 copyValue라 하겠습니다. spread operator로 초기 상태값을 가져옵니다.
    let copyValue = [...state];

    // [Redux] 액션(action)을 등록하고, type을 적습니다. type은 대문자로 적는 것이 컨벤션이라고 합니다.
    if (action.type === 'ADD') {
      // [Redux] ADD 액션이 실행되면 copyValue에 payload를 push합니다. payload 안에는 여러 데이터를 담을 수 있습니다.
      copyValue.push(action.payload);
      return copyValue;
    } else if (action.type === 'UPDATE') {
      copyValue.push(action.payload);
      return copyValue;
    }
  }

  // [Redux] 전역 상태 관리 도구인 Redux에서 실제 상태가 저장되는 공간인 store를 생성합니다. 이제는 store에서 데이터를 꺼내 사용할 수 있게 되었습니다.
  const store = createStore(reducer);

  const isLogin = !!localStorage.getItem('accessToken');
  const isKakao = !!localStorage.getItem('isKakao');
  const isSeller = !!localStorage.getItem('isSeller');
  const points = localStorage.getItem('points');
  const cartCount = localStorage.getItem('cartCount');

  const [isLightTheme, setIsLightTheme] = useState(true);
  const switchTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    // [Redux] 전역 상태이므로 최상위 Provider에 주입합니다.
    <Provider store={store}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router
          isLogin={isLogin}
          isKakao={isKakao}
          isSeller={isSeller}
          points={points}
          cartCount={cartCount}
        />
        {isLogin && (
          <ThemeSwitcher
            switchTheme={switchTheme}
            isLightTheme={isLightTheme}
          />
        )}
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
