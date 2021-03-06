import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import 'styles/components/modalComponents.scss'
import QuaggaScanner from 'components/QuaggaScanner'

const ScanEanModal = (props) => {

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
        <div style={{ width: '100%', paddingLeft: '25%' }}>
          <QuaggaScanner catchCode={props.catchCode} />
        </div>
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
