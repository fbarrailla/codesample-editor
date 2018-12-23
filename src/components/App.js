import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Editor from './Editor';
import Preview from './Preview';
import useLocalStorage from '../hooks/useLocalStorage';

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

const App = () => {
  useLocalStorage();
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Editor />
        <Preview />
      </Wrapper>
    </>
  );
};

export default App;
