import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {heroModel} from '../heroModel';
import {httpHelper} from '../helpers/httpHelper';
import {HeroContext} from '../context';


export const AddHeroForm = ({hero, toggleEditHandler}) => {

  const [files, setFiles] = useState([]);
  const [imageNames, setImageNames] = useState(hero.images || []);
  const [formData, setFormData] = useState(hero);
  const [formLoading, setFormLoading] = useState(false);

  const setFormDataHandler = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const setFilesHandler = e => {
    const files = [...e.target.files];
    setFiles(files);
  };

  const removeImageHandler = image => {
    if (image.name) {
      setFiles(files.filter(f => f.name !== image.name));
    }
    setImageNames(imageNames.filter(el => el !== image));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    const data = new FormData(e.target);
    data.append('imageNames', JSON.stringify(imageNames));

    if (!hero._id) {
      try {
        await httpHelper('/api/add', 'POST', data);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const {data: {message}} = await httpHelper(`/api/${hero._id}`, 'PUT', data);
        console.log(message);
      } catch (e) {
        console.log(e);
      }
    }

    setFormData({});
    setFiles([]);
    toggleEditHandler();
    setFormLoading(false);
  };

  const mapControls = data => data.map(el => {
    const item = el.replace(/_/g, ' ');

    return (
      <Form.Group key={el}>
        <Form.Label htmlFor={el}>{item.toUpperCase()}</Form.Label>
        {el === 'images'
          ?
          <div className="mb-3">
            <Form.File
              id={el}
              name={el}
              label={
                files.length || imageNames.length
                  ? `${files.length + imageNames.length} images added`
                  : 'Choose image'}
              data-browse="Add image"
              custom
              multiple
              onChange={setFilesHandler}
            />
          </div>
          :
          <Form.Control id={el}
                        type="text"
                        name={el}
                        value={formData[el] || ''}
                        onChange={setFormDataHandler}
                        placeholder={`Enter ${item}`}

          />
        }
      </Form.Group>
    );
  });

  return (
    <Form onSubmit={handleSubmit}>
      {mapControls(heroModel)}

      {
        (!!imageNames.length || !!files.length) && (
          <Alert variant="success">
            {[...imageNames, ...files].map((el, i) => (
              <div key={i.toString()}>
                {el.name || el}
                <span
                  className="delete-icon"
                  onClick={() => removeImageHandler(el)}
                >
                &times;
                </span>
              </div>
            ))}
          </Alert>
        )
      }

      <Button variant="success"
              type="submit"
      >
        {formLoading
          ?
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            &nbsp;Loading...
          </>
          : 'Save hero'
        }

      </Button>
    </Form>
  );
};

AddHeroForm.propTypes = {
  hero: PropTypes.object,
  toggleEditHandler: PropTypes.func
};

AddHeroForm.defaultProps = {
  hero: {},
  toggleEditHandler: () => {
  }
};
