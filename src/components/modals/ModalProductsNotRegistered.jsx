import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'

import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'

const ModalProductsNotRegistered = (props) => {

  const [dataProduct, setDataProduct] = useState({
    name_product: '',price:'', observation:''
  })
  const [validate, setValidate] = useState(false)

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
    props.handleAddProduct(Object.assign({},dataProduct))
    setDataProduct({name_product: '',price:'', observation:''})

  }

  const onChange = e => {
    setDataProduct({...dataProduct, [e.target.name] : e.target.value})
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
          Agregar al Carrito Producto no Registrado
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validate}>
        <Modal.Body>
          <Row>
            <InputField
              {...props.inputName}
              value={dataProduct.name_product}
              handleChange={onChange}
            />
            <InputField
              {...props.inputPrice}
              value={dataProduct.price}
              handleChange={onChange}
            />
          </Row>
          <Row>
            <InputField
              {...props.inputObservation}
              value={dataProduct.observation}
              handleChange={onChange}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" type="submit" variant="secondary">Agregar</Button>
          <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalProductsNotRegistered.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
}

ModalProductsNotRegistered.defaultProps = {

  inputName: {
    type: 'text',
    required: false,
    name: 'name_product',
    label : 'Nombre Producto',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      
    ],
  },
  inputPrice: {
    type: 'number',
    required: true,
    name: 'price',
    step: 'any',
    label : 'Precio',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputObservation: {
    type: 'textarea',
    required: false,
    name: 'observation',
    label : 'Observación',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    rows: 3,
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default ModalProductsNotRegistered
