import reactDom from 'react-dom';

const Portal = ({ children }) => {
  // 3. index.html에 생성한 id 값이 modal인 엘리먼트를 선택자로 지정합니다.
  const el = document.getElementById('modal');

  // 4. createPortal 메서드로 DOM 계층 최상위에 렌더링 준비를 마칩니다. (다음 주석은 NavListItem.js에서 계속됩니다.)
  return reactDom.createPortal(children, el);
};

export default Portal;
