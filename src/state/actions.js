import * as types from './actionTypes';

export const editCode = code => ({ type: types.EDIT_CODE, payload: code });

export const setLanguage = language => ({
  type: types.SET_LANGUAGE,
  payload: language,
});

export const setBackground = bg => ({
  type: types.SET_BACKGROUND,
  payload: bg,
});

export const setCustomBackground = bg => ({
  type: types.SET_CUSTOM_BACKGROUND,
  payload: bg,
});
