import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import {HeroContext} from './context';
import {HeroesList} from './pages/HeroesList';
import {HeroDetails} from './pages/HeroDetails';
import {CreateHero} from './pages/CreateHero';
import {ErrorPage} from './pages/ErrorPage';
import {NavBar} from './components/NavBar';
import './styles/index.scss';

const App = () => {
  const {error, setError} = useContext(HeroContext);

  return (
    <Router>
      <NavBar/>
      <Container>
        {
          error
            ?
            <ErrorPage {...{error, setError}}/>
            : (
              <Switch>
                <Route path='/' exact component={HeroesList}/>
                <Route path='/hero/:id' component={HeroDetails}/>
                <Route path='/create' component={CreateHero}/>
                <Route>
                  <ErrorPage/>
                </Route>
              </Switch>)
        }
      </Container>
    </Router>
  );
};

export default App;
