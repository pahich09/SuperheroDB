import React from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'react-bootstrap';

export const ImageCarousel = ({urlArr}) => {
  const urlList = urlArr.length ? urlArr : ['profile.png'];
  return (
    <Carousel className="image-carousel">
      {urlList.map(url => {
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
  urlArr: []
};
