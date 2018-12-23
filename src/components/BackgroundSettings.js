import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';
import { ChromePicker } from 'react-color';
import { useStore } from '../state/store';
import useFileInput from '../hooks/useFileInput';
import { setBgImage } from '../state/db';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: flex-end;
  margin: 10px;
`;

const Button = styled.button`
  border: 0;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: inherit;
  border-radius: 3px;
  outline: none;

  + button {
    margin-left: 10px;
  }
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

const CustomBgSettings = () => {
  const colorPickerWrapperRef = useRef();
  const { select, dispatch } = useStore();
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

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

  if (!select.isCustomBackground()) {
    return null;
  }

  const customBackground = select.getCustomBackground();

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
      <Button onClick={() => uploadFile()}>Image</Button>
    </Wrapper>
  );
};

export default CustomBgSettings;
