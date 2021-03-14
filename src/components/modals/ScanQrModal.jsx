import React from 'react'
import PropTypes from 'prop-types'
import{
  Modal,
  Button
} from 'react-bootstrap'
import 'styles/components/modalComponents.css'
import QrCodeComponent from 'components/QrCodeComponent'

const ScanQrModal = (props) => {

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Scanner Qr Code de Productos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <QrCodeComponent catchQrCode={props.catchQrCode} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
    </Modal>
  )
}

ScanQrModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  catchQrCode: PropTypes.func.isRequired
}

export default ScanQrModal
