import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
const ModalDelete=(props)=> {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user {props.dataModal.username} ?</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={props.confirmDeleteUser}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDelete;