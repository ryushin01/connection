import Lottie from 'lottie-react';
import loading from '../../lottie/loading.json';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrap>
      <Lottie animationData={loading} />
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
`;

export default Loading;
