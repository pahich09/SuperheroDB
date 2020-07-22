import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HeroesList} from './pages/HeroesList';
import {HeroesItem} from './pages/HeroItem';
import {CreateHero} from './pages/CreateHero';
import {PageNotFound} from './pages/PageNotFound';
import {NavBar} from './components/NavBar';
import './styles/index.scss';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={HeroesList}/>
        <Route path='/hero/:id' component={HeroesItem}/>
        <Route path='/create' component={CreateHero}/>
        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
