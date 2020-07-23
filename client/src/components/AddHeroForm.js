import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {heroModel} from '../heroModel';


export const AddHeroForm = () => {

  const [files, setFiles] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);

//temporary
    fetch('/api/add', {
      method: 'POST',
      body: data,
    });
  };

  const mapControls = data => data.map(el => {
    let item = el.replace(/_/g, ' ');

    return (
      <Form.Group key={el}>
        <Form.Label htmlFor={el}>{item.toUpperCase()}</Form.Label>
        {el === 'images'
          ?
          <div className="mb-3">
            <Form.File
              id={el}
              name={el}
              label={files.length ? [...files].map(el => el.name + '; ') : 'Choose' +
                ' image'}
              data-browse="Add image"
              custom
              multiple
              onChange={e => setFiles(e.target.files)}
            />
          </div>
          :
          <Form.Control id={el}
                        type="text"
                        name={el}
                        placeholder={`Enter ${item}`}

          />
        }
      </Form.Group>
    );
  });

  return (
    <Form onSubmit={handleSubmit}>
      {mapControls(heroModel)}
      <Button variant="success" type="submit">
        Save hero
      </Button>
    </Form>
  );
};
