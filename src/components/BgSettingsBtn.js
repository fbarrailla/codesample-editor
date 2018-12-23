import styled from 'styled-components';

export default styled.button`
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
