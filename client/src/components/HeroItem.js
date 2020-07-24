import React from 'react';
import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const HeroItem = ({image, nickname, _id}) => {

  return (
    <Col xs={12} sm={6} md={4} className="hero-card">
      <Card>
        <Card.Img variant="top"
                  src={`http://localhost:5000/${image}`}/>
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/hero/${_id}`}
                  className="text-warning"
            >
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
  _id: PropTypes.any.isRequired,
};
HeroItem.defaultProps = {
  image: 'profile.png'
};
