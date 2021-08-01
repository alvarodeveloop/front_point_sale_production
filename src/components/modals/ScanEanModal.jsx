import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
} from 'react-bootstrap'
import 'styles/components/modalComponents.scss'
import EanInputScanner from '../EanInputScanner';

const ScanEanModal = (props) => {

  const onChangeEanInputHandler = e => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      if (value) {
        props.catchCode(value);
      }
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <EanInputScanner
            readonly={true}
            onChangeEanInputHandler={onChangeEanInputHandler}
            displaySectionHandler={false}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ScanEanModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  catchCode: PropTypes.func.isRequired
}

export default ScanEanModal
