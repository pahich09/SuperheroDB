import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, ListGroup, Row} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import {AddHeroForm} from '../components/AddHeroForm';
import {heroModel} from '../heroModel';
import {httpHelper} from '../helpers/httpHelper';
import {HeroContext} from '../context';
import {Loader} from '../components/Loader';
import {ImageCarousel} from '../components/ImageCarousel';


export const HeroDetails = () => {

  const {toggleLoading, loading, setError} = useContext(HeroContext);
  const history = useHistory();
  const {id} = useParams();
  const [hero, setHero] = useState({});
  const [editMode, setEditMode] = useState(false);

  const toggleEditHandler = () => {
    setEditMode(!editMode);
  };

  const deleteHandler = async () => {
    try {
      await httpHelper(`/api/${id}`, 'DELETE');
      history.push('/');
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };


  useEffect(() => {
    async function fetch() {
      try {
        toggleLoading(true);
        const {data} = await httpHelper(`/api/hero/${id}`);
        setHero(data);

      } catch (e) {
        console.log(e.message);
        setError(e.message);
      }
      toggleLoading(false);
    }

    fetch();
  }, [id, editMode]);


  const mapHeroInfo = data => data.map(el => {
      if (el === 'images') {
        return null;
      }
      return (
        <ListGroup.Item className="hero-info"
                        key={el}
        >
              <span className="hero-info__title">
                  {el.replace(/_/g, ' ')}
              </span>
          <span className="hero-info__description">
                {hero[el]}
              </span>
        </ListGroup.Item>
      );
    }
  );


  if (editMode) {
    return (<Row>
      <Col md={{span: 8, offset: 2}}>
        <AddHeroForm {...{toggleEditHandler, hero}}/>
      </Col>
    </Row>);
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Row>
        <Col xs={12} sm={6} md={5} className="hero-image">
          <ImageCarousel urlArr={hero.images}/>
        </Col>
        <Col xs={12} sm={6} md={7}>
          <ListGroup variant="flush">
            {mapHeroInfo(heroModel)}
          </ListGroup>
          <Row className="mt-4">
            <Col>
              <Button
                variant="outline-secondary"
                className="hero-edit"
                onClick={toggleEditHandler}
              >
                Edit profile
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="outline-danger"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
