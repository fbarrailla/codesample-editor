import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';

///registerLanguage('js', js);
registerLanguage('jsx', jsx);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
