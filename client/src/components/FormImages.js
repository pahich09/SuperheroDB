import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';

export const FormImages = ({imageNames, files, removeImageHandler}) => {
  return (
    <Alert variant="success">
      {[...imageNames, ...files].map((el, i) => (
        <div key={i.toString()}
             className="d-flex">
          {!el.name
            ?
            <div className="img-preview">
              <img src={`http://localhost:5000/${el}`}
                   alt={el}
              />
            </div>
            :
            <span className="text-warning">
                    New image
                  </span>
          }
          <div className="ml-3">
            {el.name || el}
            <span
              className="delete-icon"
              onClick={() => removeImageHandler(el)}
            >
                &times;
                </span>
          </div>
        </div>
      ))}
    </Alert>
  );
};

FormImages.propTypes = {
  imageNames: PropTypes.arrayOf(PropTypes.string),
  files: PropTypes.array,
  removeImageHandler: PropTypes.func
};

FormImages.defaultProps = {
  imageNames: [],
  files: [],
  removeImageHandler: () => {
  }
};
