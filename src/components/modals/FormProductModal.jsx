import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
} from 'react-bootstrap'
import 'styles/components/modalComponents.scss'
import FormProductSale from 'components/FormProductSale'

const FormProductModal = (props) => {

  const handleSubmitProduct = () => {
    props.handleSubmitProduct()
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de Productos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProductSale {...props} handleSubmitProduct={handleSubmitProduct} />
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

FormProductModal.propTypes = {
  handleSubmitProduct: PropTypes.func.isRequired
}

export default FormProductModal
