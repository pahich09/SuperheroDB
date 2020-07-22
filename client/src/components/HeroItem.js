import React from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const HeroItem = ({image, nickname, id}) => {
  return (
    <Col xs={12} sm={6} md={4} className="hero-card">
      <Card>
        <Card.Img variant="top"
                  src={image}/>
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/hero/${id}`}>
              {nickname}
            </Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

HeroItem.propTypes = {
  nickname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
};
HeroItem.defaultProps = {
  id: 1,
  nickname: "Clark",
  image: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png"
}
