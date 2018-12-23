import * as types from './actionTypes';

const CODE_PLACEHOLDER = `// Type code here`;

const persistedState = localStorage.getItem('appState');

const initialState = persistedState
  ? JSON.parse(persistedState)
  : {
      code: CODE_PLACEHOLDER,
      language: 'javascript',
      background: 'rgb(158, 173, 175)',
      customBackground: '#808080',
    };

export const code = (
  state = initialState.code || CODE_PLACEHOLDER,
  action = {}
) => {
  switch (action.type) {
    case types.EDIT_CODE:
      return action.payload;
    default:
      return state;
  }
};

export const language = (state = initialState.language, action = {}) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

export const background = (state = initialState.background, action = {}) => {
  switch (action.type) {
    case types.SET_BACKGROUND:
      return action.payload;
    default:
      return state;
  }
};

export const customBackground = (
  state = initialState.customBackground,
  action = {}
) => {
  switch (action.type) {
    case types.SET_CUSTOM_BACKGROUND:
      return action.payload;
    default:
      return state;
  }
};
