import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {AddHeroForm} from '../components/AddHeroForm';

export const CreateHero = () => {
  return (
    <>
      <Row>
        <Col>
          <h2 className="create-title">Add new superhero</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{span: 8, offset: 2}}>
          <AddHeroForm/>
        </Col>
      </Row>
    </>
  );
};
