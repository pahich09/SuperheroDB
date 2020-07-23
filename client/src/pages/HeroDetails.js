import React, {useEffect, useState} from 'react';
import {Button, Col, Image, ListGroup, Row} from 'react-bootstrap';
import {AddHeroForm} from '../components/AddHeroForm';
import {heroModel} from '../heroModel';


export const HeroDetails = () => {

  const [editMode, setEditMode] = useState(false);

  const toggleEditHandler = () => {
    setEditMode(!editMode);
  };


  const [hero, setHero] = useState([]);

//
  useEffect(() => {

    fetch('/api').then(res => res.json()).then(res => {
      setHero(res[0]);
    });
  }, []);
//


  const mapHeroInfo = data => data.map(el => {
    if (el === 'images') {
      return null;
    }
    return (
      <ListGroup.Item className="hero-info"
                      key={el}
      >
        <span className="hero-info__title">
          {el.replace(/_/g, ' ')}
        </span>
        <span className="hero-info__description">
          {hero[el]}
        </span>
      </ListGroup.Item>
    );
  });


  if (editMode) {
    return (<Row>
      <Col md={{span: 8, offset: 2}}>
        <AddHeroForm {...{toggleEditHandler, hero}}/>
      </Col>
    </Row>);
  }

  return (
    <Row>
      <Col xs={12} sm={6} md={4} className="hero-image">
        <Image
          src={`http://localhost:5000/${hero.images && hero.images[0]}`}
          thumbnail
          className='mb-2'
        />
        <Button
          variant="outline-secondary"
          className="hero-edit"
          onClick={toggleEditHandler}
        >
          Edit profile
        </Button>
      </Col>
      <Col xs={12} sm={6} md={8}>
        <ListGroup variant="flush">
          {mapHeroInfo(heroModel)}
        </ListGroup>
      </Col>
    </Row>
  );
};
