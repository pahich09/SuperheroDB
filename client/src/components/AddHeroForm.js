import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {heroModel} from '../heroModel';
import {httpHelper} from '../helpers/httpHelper';
import {FormImages} from './FormImages';
import {HeroContext} from '../context';


export const AddHeroForm = ({hero, toggleEditHandler}) => {

  const {setActivePage} = useContext(HeroContext);
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [imageNames, setImageNames] = useState(hero.images || []);
  const [formData, setFormData] = useState(hero);
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const setFormDataHandler = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setFormMessage(null);
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
        const {data: {message}} = await httpHelper('/api/add', 'POST', data);
        setFormMessage({success: message});
        setActivePage(1);
        setTimeout(() => {
          history.push('/');
        }, 1000);
      } catch (e) {
        console.log(e.message);
        setFormMessage({error: e.message});
      }
    } else {
      try {
        const {data: {message}} = await httpHelper(`/api/${hero._id}`, 'PUT', data);
        setFormMessage({success: message});
        setTimeout(toggleEditHandler, 1000);
      } catch (e) {
        console.log(e.message);
        setFormMessage({error: e.message});
      }
    }
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
                        required
                        as={el === 'nickname' || el === 'real_name' ? 'input' : 'textarea'}
          />
        }
      </Form.Group>
    );
  });

  return (
    <Form onSubmit={handleSubmit}>

      {formMessage &&
      <Alert variant={formMessage.error ? 'danger' : 'success'}>
        {formMessage.error || formMessage.success}
      </Alert>}

      {mapControls(heroModel)}

      {
        (!!imageNames.length || !!files.length)
        && <FormImages {...{imageNames, files, removeImageHandler}}/>
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
