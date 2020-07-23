import React, {useState} from 'react';
import {Button, Col, Image, ListGroup, Row} from 'react-bootstrap';

const propshero = {
  nickname: 'Superman',
  real_name: 'Clark Kent',
  origin_description: 'he was born Kal-El on the planet Krypton, before being' +
    ' rocketed to',

  superpowers: `solar energy absorption and healing factor, solar flare and heat vision,
    solar invulnerability, flight…`,
  catch_phrase: `“ Look, up in the sky, it's a bird, it's a plane, it's Superman!”
Images: a set of images of the superhero`,
  image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png'
};

export const HeroDetails = () => {

  const [editMode, setEditMode] = useState(false);

  const hero = Object.entries(propshero);

  const toggleEditHandler = () => {
    setEditMode(!editMode);
  };

  const mapHeroInfo = data => data.map(el => {
    if (el[0] === 'image' || el[0] === 'id') {
      return null;
    }
    return (
      <ListGroup.Item className="hero-info"
                      key={el[0]}
      >
        <span className="hero-info__title">
          {el[0].replace(/_/g, ' ')}
        </span>
        <span className="hero-info__description">
          {el[1]}
        </span>
      </ListGroup.Item>
    );
  });

  if (editMode) {
    return (<Row>
      <Button variant="outline-success"
              onClick={toggleEditHandler}
      >Save</Button>
    </Row>);
  }
  return (
    <Row>
      <Col xs={12} sm={6} md={4} className="hero-image">
        <Image
          src={propshero.image}
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
          {mapHeroInfo(hero)}
        </ListGroup>
      </Col>
    </Row>
  );
};
