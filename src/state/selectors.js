import { createSelector } from 'reselect';

const getBackground = state => state.background;
export const getCustomBackground = state => state.customBackground;

export const isCustomBackground = createSelector(
  getBackground,
  bg => bg === 'custom'
);

export const getBackgroundColor = createSelector(
  getBackground,
  isCustomBackground,
  getCustomBackground,
  (bg, isCustom, customBg) => {
    if (isCustom) {
      if (/^-img/.test(customBg)) {
        return 'transparent';
      }
      return customBg;
    }
    return bg;
  }
);

export const isBackgroundImage = createSelector(
  isCustomBackground,
  getCustomBackground,
  (isCustom, customBg) => isCustom && /^img-/.test(customBg)
);
