import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import Home from './Home/Home';
import App from './App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
