import React from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'react-bootstrap';

export const ImageCarousel = ({urlArr}) => {
  return (
    <Carousel className="image-carousel">
      {urlArr.map(url => {
        return (
          <Carousel.Item key={url}>
            <img
              className="d-block w-100"
              src={`http://localhost:5000/${url}`}
              alt="First slide"
            />
          </Carousel.Item>);
      })}
    </Carousel>
  );
};

ImageCarousel.propTypes = {
  urlArr: PropTypes.arrayOf(PropTypes.string)
};

ImageCarousel.defaultProps = {
  urlArr: ['profile.png']
};
