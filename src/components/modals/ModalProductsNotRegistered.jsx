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
import {FaPlusCircle} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'

const ModalProductsNotRegistered = (props) => {

  const [dataProduct, setDataProduct] = useState({
    name_product: '',price:'', observation:'', is_neto : false
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
    if(e.target.name === "is_neto"){
      let val = e.target.value === "true" ? true : false
      setDataProduct({...dataProduct, [e.target.name] : val})
    }else{
      setDataProduct({...dataProduct, [e.target.name] : e.target.value})
    }
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
            <Col sm={6} md={6} lg={6}>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <b>Afecto a Iva</b>
                </Col>
              </Row>
              <br/>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4} className="text-center">
                  <Form.Group>
                    <Form.Check type="radio"
                      custom
                      id={'is_neto_check1'}
                      name="is_neto"
                      label={'Si'}
                      value={false}
                      checked={!dataProduct.is_neto}
                      onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col sm={4} md={4} lg={4} className="text-center">
                  <Form.Group>
                    <Form.Check type="radio"
                      custom
                      id={'is_neto_check2'}
                      name="is_neto"
                      label={'No'}
                      value={true}
                      checked={dataProduct.is_neto}
                      onChange={onChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={4} md={4} lg={4}>
              <Button block={true} size="sm" type="submit" variant="danger">Agregar <FaPlusCircle /></Button>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Button block={true} size="sm" onClick={handleOnHide} variant="secondary">Cerrar</Button>
            </Col>
          </Row>
        </Modal.Body>
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
