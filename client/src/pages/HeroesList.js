import React, {useContext} from 'react';
import {Row} from 'react-bootstrap';
import {HeroItem} from '../components/HeroItem';
import {HeroPagination} from '../components/HeroPagination';
import {HeroContext} from '../context/context';

export const HeroesList = () => {
  const state = useContext(HeroContext);
  console.log(state);
  return (
    <>
      <Row>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
        <HeroItem/>
      </Row>
      <Row className="pagination-wrap">
        <HeroPagination/>
      </Row>
    </>
  );
};
