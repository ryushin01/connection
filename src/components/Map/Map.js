import React, { useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션(위도, 경도)
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <MapWrap>
      <div id="map" style={{ width: '100%', height: '40vw' }} />
    </MapWrap>
  );
};

const MapWrap = styled.div`
  width: 100%;
  height: 40vw;
  margin-top: 4vw;
  border: 1px red solid;
`;

export default Map;
