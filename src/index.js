import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import App from './components/App';
import { StoreProvider } from './state/store';

///registerLanguage('js', js);
registerLanguage('jsx', jsx);

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
