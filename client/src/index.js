import React from 'react';
import { render } from 'react-dom';
import './polyfills';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

serviceWorker.unregister();
