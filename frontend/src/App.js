import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from './components/navbar'
import Signup from './components/User/Connexion/Signup';
import Login from './components/User/Connexion/Login';
import Profile from './components/User/Profile'
import Articles from './components/Articles/Articles';
import Article from './components/Articles/Article'; 
import updateArticle from './components/Articles/updateArticle'; 
import updateProfile from './components/User/updateProfile';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import createComment from './components/Comments/createComment';


class App extends Component {
  
  render () {

    return (

      <Fragment>
        <Router>
          
          {localStorage.getItem("token") ? <Navbar /> : null}
          

          <Switch>
            
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/profile' component={Profile} />

            <Route exact path='/post' component={Articles} />
            {/* <Route exact path='/post/:id' component={Article} /> */}
            <Route exact path='/post/update/:id' component={updateArticle} />

            
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App;
