import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { useStore } from '../state/store';

const BackgroundSelect = styled(Select)`
  width: 120px;
`;

const LanguageSelect = styled(Select)`
  width: 130px;
`;

const Label = styled.label`
  margin: 0 7px 0 10px;
  font-size: 15px;
`;

const backgrounds = [
  { label: 'Grey', value: 'rgb(158, 173, 175)' },
  { label: 'White', value: 'rgb(255, 255, 255)' },
  { label: 'Pink', value: 'rgb(253, 168, 196)' },
  { label: 'Custom', value: 'custom' },
];

const languages = SyntaxHighlighter.supportedLanguages.map(l => ({
  label: l,
  value: l,
}));

const Settings = () => {
  const { state, dispatch } = useStore();
  const selectedLanguage = {
    label: state.language,
    value: state.language,
  };
  const selectedBackground = backgrounds.find(
    background => background.value === state.background
  );
  return (
    <>
      <Label htmlFor="background">Background</Label>
      <BackgroundSelect
        id="background"
        value={selectedBackground}
        onChange={option => dispatch.setBackground(option.value)}
        options={backgrounds}
      />
      <Label htmlFor="language">Language</Label>
      <LanguageSelect
        id="language"
        value={selectedLanguage}
        onChange={option => dispatch.setLanguage(option.value)}
        options={languages}
      />
    </>
  );
};

export default Settings;
