import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Image, ListGroup, Row} from 'react-bootstrap';
import {useParams, useHistory} from 'react-router-dom';
import {AddHeroForm} from '../components/AddHeroForm';
import {heroModel} from '../heroModel';
import {httpHelper} from '../helpers/httpHelper';
import {HeroContext} from '../context';
import {Loader} from '../components/Loader';


export const HeroDetails = () => {

    const {toggleLoading, loading} = useContext(HeroContext);
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
        console.log(e);
      }
    };


    useEffect(() => {
      async function fetch() {
        toggleLoading(true);
        const {data} = await httpHelper(`/api/hero/${id}`);
        setHero(data);
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
          <Col xs={12} sm={6} md={4} className="hero-image">
            <Image
              src={`http://localhost:5000/${hero.images && hero.images[0]}`}
              thumbnail
              className='mb-2'
            />
          </Col>
          <Col xs={12} sm={6} md={8}>
            <ListGroup variant="flush">
              {mapHeroInfo(heroModel)}
            </ListGroup>
            <Button
              variant="outline-secondary"
              className="hero-edit"
              onClick={toggleEditHandler}
            >
              Edit profile
            </Button>
            <Button
              variant="outline-danger"
              className="ml-3"
              onClick={deleteHandler}
            >
              Delete profile
            </Button>
          </Col>
        </Row>

      </>
    );
  }
