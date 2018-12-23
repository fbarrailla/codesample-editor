import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism';
import Canvas2Image from '../libs/canvas2image';
import Title from './Title';
import Settings from './Settings';
import BgSettings from './BgSettings';
import PreviewWindow from './PreviewWindow';
import { useStore } from '../state/store';
import useBoundingRect from '../hooks/useBoundingRect';
import { getBgImage } from '../state/db';
import Image from './Image';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  padding: 20px;
  background-color: white;
`;

const PreviewTitle = styled(Title)`
  flex: 1;
`;

const CaptureButton = styled.button`
  border: 1px solid hsl(0, 0%, 70%);
  background: white;
  padding: 10px;
  height: 38px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 10;
`;

const PreviewZone = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  background-size: cover;

  // Syntax highlighter overrides
  pre {
    background-color: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    span {
      text-shadow: none !important;
    }
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

const BgSettingsWrapper = styled.div`
  z-index: 2;
`;

const takeCapture = previewZone => {
  const ignoreElements = el => el.classList.contains('bg-settings');
  html2canvas(previewZone, { ignoreElements, logging: false }).then(canvas => {
    const { width, height } = previewZone.getBoundingClientRect();
    Canvas2Image.saveAsPNG(
      canvas,
      `code-${+new Date()}.png`,
      width * 2,
      height * 2
    );
  });
};

const Preview = () => {
  const { state, select } = useStore();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const previewRef = useRef();
  const { width: previewWidth, height: previewHeight } = useBoundingRect(
    previewRef
  );

  useEffect(
    () => {
      if (select.isBackgroundImage()) {
        getBgImage(+state.customBackground.substring(4)).then(data =>
          setBackgroundImage(data)
        );
      } else {
        setBackgroundImage(null);
      }
    },
    [state.background, state.customBackground]
  );

  return (
    <Wrapper>
      <TitleWrapper>
        <PreviewTitle>Preview</PreviewTitle>
        <Settings />
        <CaptureButton
          title="capture"
          onClick={() => takeCapture(previewRef.current)}
        >
          <span role="img" aria-label="Capture icon">
            📸
          </span>
        </CaptureButton>
      </TitleWrapper>
      <PreviewZone
        ref={previewRef}
        style={{
          background: select.isBackgroundImage()
            ? 'transparent'
            : select.getBackgroundColor(),
        }}
      >
        <BgSettingsWrapper className="bg-settings">
          <BgSettings />
        </BgSettingsWrapper>
        <PreviewWindow>
          <SyntaxHighlighter
            language={state.language}
            style={tomorrow}
            wrapLines={false}
          >
            {state.code}
          </SyntaxHighlighter>
        </PreviewWindow>
        {backgroundImage && (
          <BackgroundImage>
            <Image
              data={backgroundImage}
              width={previewWidth}
              height={previewHeight}
            />
          </BackgroundImage>
        )}
      </PreviewZone>
    </Wrapper>
  );
};

export default Preview;
