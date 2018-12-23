import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';
import { ChromePicker } from 'react-color';
import { useStore } from '../state/store';
import useFileInput from '../hooks/useFileInput';
import { setBgImage } from '../state/db';
import BgImagePicker from './BgImagePicker';
import Button from './BgSettingsBtn';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: flex-end;
  margin: 10px;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
`;

const ImagePickerWrapper = styled.div``;

const CustomBgSettings = () => {
  const colorPickerWrapperRef = useRef();
  const imagePickerWrapperRef = useRef();
  const { select, dispatch } = useStore();
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);

  const handleFileUpload = fileContent => {
    const id = +new Date();
    setBgImage(id, fileContent).then(() =>
      dispatch.setCustomBackground(`img-${id}`)
    );
  };

  const uploadFile = useFileInput(handleFileUpload);

  useOnClickOutside(colorPickerWrapperRef, () => {
    setColorPickerVisible(false);
  });

  useOnClickOutside(imagePickerWrapperRef, () => {
    setImagePickerVisible(false);
  });

  if (!select.isCustomBackground()) {
    return null;
  }

  const customBackground = select.getCustomBackground();

  if (isImagePickerVisible) {
    return (
      <ImagePickerWrapper ref={imagePickerWrapperRef}>
        <BgImagePicker
          uploadFile={uploadFile}
          close={() => setImagePickerVisible(false)}
        />
      </ImagePickerWrapper>
    );
  }
  if (isColorPickerVisible) {
    return (
      <ColorPickerWrapper ref={colorPickerWrapperRef}>
        <ChromePicker
          color={/^#/.test(customBackground) && customBackground}
          onChangeComplete={color => dispatch.setCustomBackground(color.hex)}
        />
      </ColorPickerWrapper>
    );
  }
  return (
    <Wrapper>
      <Button onClick={() => setColorPickerVisible(true)}>Color</Button>
      <Button onClick={() => setImagePickerVisible(true)}>Image</Button>
    </Wrapper>
  );
};

export default CustomBgSettings;
