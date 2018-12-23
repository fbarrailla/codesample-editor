import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { StoreProvider } from '../state/store';
import Editor from './Editor';
import Preview from './Preview';
import LocalStorage from './LocalStorage';

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const App = () => (
  <>
    <GlobalStyle />
    <StoreProvider>
      <LocalStorage />
      <Wrapper>
        <Editor />
        <Preview />
      </Wrapper>
    </StoreProvider>
  </>
);

export default App;
