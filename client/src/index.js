import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './About';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route exact path="/" component={App}/>
      <Route exact path="/Home" component={Home}/>
      <Route exact path="/About" component={About} />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

