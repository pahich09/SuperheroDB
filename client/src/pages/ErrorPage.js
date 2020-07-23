import React from 'react';
import PropTypes from 'prop-types';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const ErrorPage = ({error, setError}) => {

  return (
    <Jumbotron className="error-page">
      <h1>{error === '404' ? 'Page not found' : 'Something went wrong!'}</h1>
      <p>
        {error}
      </p>
      <Link variant="primary"
            to="/"
            onClick={() => setError(null)}
      >
        Home page
      </Link>
    </Jumbotron>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.string,
  setError: PropTypes.func
};

ErrorPage.defaultProps = {
  error: '404',
  setError: () => {
  }
};
