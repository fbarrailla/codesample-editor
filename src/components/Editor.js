import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStore } from '../state/store';
import Title from './Title';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  background-color: rgb(38, 50, 56);
  padding: 20px;
`;

const EditorTitle = styled(Title)`
  color: rgb(157, 173, 175);
`;

const CodeInput = styled.textarea`
  margin-top: 20px;
  background-color: rgba(26, 35, 39);
  flex: 1;
  color: white;
  font-family: 'Fira Mono', monospace;
  font-size: 16px;
  border: none;
  resize: none;
  outline: none;
  padding: 30px 20px;
`;

const Editor = () => {
  const { state, dispatch } = useStore();

  const inputRef = useRef();

  // Component did mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCodeChange = e => dispatch.editCode(e.target.value);

  return (
    <Wrapper>
      <EditorTitle>Editor</EditorTitle>
      <CodeInput
        value={state.code}
        onChange={handleCodeChange}
        ref={inputRef}
        spellCheck={false}
      />
    </Wrapper>
  );
};

export default Editor;
