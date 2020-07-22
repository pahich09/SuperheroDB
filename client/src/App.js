import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import {HeroesList} from './pages/HeroesList';
import {HeroDetails} from './pages/HeroDetails';
import {CreateHero} from './pages/CreateHero';
import {PageNotFound} from './pages/PageNotFound';
import {NavBar} from './components/NavBar';
import './styles/index.scss';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Container>
        <Switch>
          <Route path='/' exact component={HeroesList}/>
          <Route path='/hero/:id' component={HeroDetails}/>
          <Route path='/create' component={CreateHero}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
