import React from 'react';
import ReactDOM from 'react-dom';

import {HeroState} from './context/state';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <HeroState>
      <App/>
    </HeroState>
  </React.StrictMode>,
  document.getElementById('root')
);

