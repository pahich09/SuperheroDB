import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types'

export const DeleteModal = ({setShowModal, showModal, deleteHandler}) => {

  const handleClose = () => setShowModal(false);

  return(
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete superhero?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

DeleteModal.propTypes = {
  setShowModal: PropTypes.func,
  deleteHandler: PropTypes.func,
  showModal: PropTypes.bool
}
DeleteModal.defaultProps = {
  setShowModal: ()=>{},
  deleteHandler: ()=>{},
  showModal: false
}
