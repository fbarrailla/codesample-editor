import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from './Image';
import { getBgImages, getBgImage, deleteBgImage } from '../state/db';
import { useStore } from '../state/store';
import BgSettingsBtn from './BgSettingsBtn';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  left: 10px;
  right: 10px;
  top: 10px;
`;

const ImgWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  position: relative;
`;

const Button = styled(BgSettingsBtn)`
  background-color: rgba(0, 0, 0, 0.8);
  width: 30px;
  height: 30px;
  font-size: 18px;
  margin-left: 6px;
`;

const RemoveButton = styled(BgSettingsBtn)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const BgImagePicker = ({ uploadFile, close }) => {
  const { state, dispatch, select } = useStore();
  const [images, setImages] = useState([]);

  const selectedId = select.isBackgroundImage()
    ? +state.customBackground.substring(4)
    : null;

  useEffect(() => {
    getBgImages().then(images => {
      if (images && images.length) {
        setImages(images);
      }
    });
  }, []);

  useEffect(
    () => {
      if (select.isBackgroundImage()) {
        const id = +state.customBackground.substring(4);
        if (!images.find(img => img.id === id)) {
          getBgImage(id).then(data => {
            setImages([...images, { id, data }]);
          });
        }
      }
    },
    [state.customBackground]
  );

  const handleDelete = () => {
    const id = +state.customBackground.substring(4);
    deleteBgImage(id).then(() => {
      const nextImages = images.filter(img => img.id !== id);
      setImages(nextImages);
      if (nextImages.length) {
        dispatch.setCustomBackground(`img-${nextImages[0].id}`);
      } else {
        dispatch.setCustomBackground('transparent');
        close();
      }
    });
  };

  return (
    <>
      <Wrapper>
        {images.map(image => (
          <ImgWrapper
            key={image.id}
            onClick={() => {
              if (selectedId !== image.id) {
                dispatch.setCustomBackground(`img-${image.id}`);
              }
            }}
            style={{
              borderColor:
                selectedId === image.id ? 'rgba(26,35,39)' : 'transparent',
            }}
          >
            <Image width={30} height={30} data={image.data} />
          </ImgWrapper>
        ))}
        <Button onClick={uploadFile}>+</Button>
      </Wrapper>
      {select.isBackgroundImage() && (
        <RemoveButton onClick={() => handleDelete()}>Delete Image</RemoveButton>
      )}
    </>
  );
};

export default BgImagePicker;
