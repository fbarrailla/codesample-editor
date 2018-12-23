import { useEffect } from 'react';
import { useStore } from '../state/store';

const LocalStorage = () => {
  const { state } = useStore();
  useEffect(
    () => {
      localStorage.setItem('appState', JSON.stringify(state));
    },
    [state]
  );
  return null;
};

export default LocalStorage;
