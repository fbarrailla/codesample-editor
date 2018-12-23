import { useEffect } from 'react';
import { useStore } from '../state/store';

export default () => {
  const { state } = useStore();
  useEffect(
    () => {
      localStorage.setItem('appState', JSON.stringify(state));
    },
    [state]
  );
};
