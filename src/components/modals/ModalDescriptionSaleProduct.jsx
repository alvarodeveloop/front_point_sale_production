import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/input/InputComponent'
import {
  Modal,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

const ModalDescriptionSaleProduct = (props) => {

  const [validate, setValidate] = useState(false)
  const [description, setDescription] = useState('')


  const handleOnHide = () => {
    props.onHide()
  }

  const handleSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    props.returnDescriptionValue(description)
    setDescription('')
  }

  const onChange = e => {
    setDescription(e.target.value)
  }

  return (
    <Modal
      show={props.isShow}
      onHide={handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Descripción de venta para el Producto {props.product.name_product}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validate}>
        <Modal.Body>
          <Row className="justify-content-center">
            <InputField
              {...props.inputDescription}
              value={description}
              handleChange={onChange}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" type="submit">Guardar</Button>
          <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalDescriptionSaleProduct.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

ModalDescriptionSaleProduct.defaultProps ={
  inputDescription: {
    type: 'textarea',
    required: true,
    name: 'description',
    label : 'Descripción de Venta',
    rows: 4,
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-9 col-md-9 col-lg-9 col-xs-9"
  },
}


export default ModalDescriptionSaleProduct
