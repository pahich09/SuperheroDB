import React from 'react';
import {Row} from 'react-bootstrap';
import {HeroItem} from '../components/HeroItem';
import {HeroPagination} from '../components/HeroPagination';

export const HeroesList = () => {
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
