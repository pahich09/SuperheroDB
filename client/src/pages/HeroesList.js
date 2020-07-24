import React, {useCallback, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Row} from 'react-bootstrap';
import {HeroContext} from '../context';
import {HeroItem} from '../components/HeroItem';
import {HeroPagination} from '../components/HeroPagination';
import {Loader} from '../components/Loader';


export const HeroesList = () => {

  const {fetchData, heroes, loading, pages, activePage, setActivePage} = useContext(HeroContext);
  const fetch = useCallback(fetchData, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const mapHeroItem = data => data.map(hero => {
    const {nickname, images, _id} = hero;
    return (
      <HeroItem key={_id} {...{nickname, _id, image: images[0]}}/>
    );
  });

  if (loading) {
    return <Loader/>;
  }

  if (!heroes.length) {
    return (
      <Jumbotron className="text-center">
        <h2 className="mb-3">Superhero not found</h2>
        <Link variant="primary"
              to="/create"
        >
          Add new hero
        </Link>
      </Jumbotron>
    );
  }

  return (
    <>
      <Row className="justify-content-center">
        {!!heroes.length && mapHeroItem(heroes)}
      </Row>
      {
        pages > 1 &&
        <Row className="pagination-wrap">
          <HeroPagination {...{pages, activePage, setActivePage}}/>
        </Row>
      }
    </>
  );
};
