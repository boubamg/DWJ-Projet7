import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Signup from './components/User/Connexion/Signup';
import Login from './components/User/Connexion/Login';
import Articles from './components/Articles/Articles';
import Article from './components/Articles/Article'; 
import createArticle from './components/Articles/createArticle';
import updateArticle from './components/Articles/updateArticle'; 


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {
  
  render () {

    return (

      <Fragment>
        <Router>
          <Switch>
            
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/post' component={Articles} />
            <Route exact path='/post/create' component={createArticle} />
            <Route exact path='/post/:id' component={Article} />
            <Route exact path='/post/update/:id' component={updateArticle} />
            
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App;
