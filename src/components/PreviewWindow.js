import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  min-width: 300px;
  max-width: 500px;
  background-color: rgb(38, 50, 56);
  border-radius: 6px;
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.55);
  z-index: 1;
  user-select: none;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  height: 45px;
  align-items: center;
  padding: 0 10px;
`;

const ToolbarIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${p => p.color};
  margin: 5px;
`;

const CodeWrapper = styled.div`
  padding: 0 15px 15px 15px;
  max-height: 70vh;
  overflow: auto;
`;

const PreviewWindow = ({ children }) => (
  <Wrapper>
    <Toolbar>
      <ToolbarIcon color="rgb(252, 96, 92)" />
      <ToolbarIcon color="rgb(253, 188, 64)" />
      <ToolbarIcon color="rgb(52, 200, 74)" />
    </Toolbar>
    <CodeWrapper>{children}</CodeWrapper>
  </Wrapper>
);

export default PreviewWindow;
