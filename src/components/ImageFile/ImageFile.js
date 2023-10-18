import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input/Input';
import { ReactComponent as UploadIcon } from '../../svg/icon_upload.svg';

const ImageFile = props => {
  const [upLoadedImage, setUpLoadedImage] = useState(null);

  // var
  const { name } = props;

  const handleImageFile = e => {
    const imageFile = e.target.files[0]; // 이미지 파일

    setUpLoadedImage(imageFile.name); // 이미지 url state에 저장
  };

  return (
    <ImageFileWrap>
      <Input
        type="text"
        placeholder="이미지 파일"
        labelFlex="1"
        value={`${upLoadedImage}`}
        {...props}
        readOnly
      />
      <ImageFileLabel>
        <ImageFileInput
          type="file"
          onChange={handleImageFile}
          accept="image/*"
          {...props}
        />
        <UploadIcon />
      </ImageFileLabel>
    </ImageFileWrap>
  );
};

export default ImageFile;

const ImageFileWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const ImageFileLabel = styled.label`
  display: flex;
  width: 50px;
  gap: 8px;
  cursor: pointer;

  svg {
    path {
      stroke: ${props => props.theme.grayscaleE};
    }
  }
`;

const ImageFileInput = styled.input`
  display: none;
`;
