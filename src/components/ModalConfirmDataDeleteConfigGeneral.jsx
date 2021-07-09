import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button
} from 'react-bootstrap'

import 'styles/components/modalComponents.scss'


const ModalConfirmDataDeleteConfigGeneral = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          ¿Esta seguro que desea eliminar los registros?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Escoja los datos que desea eliminar</h4>

      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="success" onClick={props.onHide}>Aceptar</Button>
        <Button size="sm" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalConfirmDataDeleteConfigGeneral.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ModalConfirmDataDeleteConfigGeneral
