import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Connexion/Signup';
import Login from './components/Connexion/Login';
import allArticles from './components/Articles/allArticles';
import createArticle from './components/Articles/createArticle'; 
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/post' component={allArticles} />
      <Route exact path='/post/create' component={createArticle} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
