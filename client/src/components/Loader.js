import React from 'react';
import {Spinner} from 'react-bootstrap';

export const Loader = () => {
  return (
    <div className="loader-wrap">
      <Spinner animation="border" variant="warning"/>
    </div>
  );
};
