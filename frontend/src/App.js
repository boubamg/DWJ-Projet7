import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Signup from './components/User/Connexion/Signup';
import Login from './components/User/Connexion/Login';
import Articles from './components/Articles/Articles';
import Article from './components/Articles/Article'; 
import createArticle from './components/Articles/createArticle';
import updateArticle from './components/Articles/updateArticle'; 


import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class App extends Component {
  
  render () {

    return (

      <Fragment>
        <Router>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/post">Navbar</a>

              { localStorage.getItem('token') ?
               <ul className="navbar-nav">
                <li><Link to={'/post'} className="nav-link">Accueil</Link></li>
                <li><Link to={'/post/create'} className="nav-link">Poster</Link></li>
                <li><Link onClick={() => {localStorage.clear()}} to={'/'} className="nav-link">Déconnexion</Link></li>
                {/* dropdown for profile createArticle logout */}
              </ul>
             :
              <ul className="navbar-nav">
                <li><Link to={'/'} className="nav-link"> Se connecter </Link></li>
                <li><Link to={'/signup'} className="nav-link">S'inscrire</Link></li>
              </ul> }    

          </nav>

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
