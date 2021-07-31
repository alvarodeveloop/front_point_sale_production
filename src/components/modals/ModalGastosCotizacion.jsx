import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form
} from 'react-bootstrap'

import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import InputField from 'components/input/InputComponent'
import InputFieldRef from 'components/input/InputComponentRef'

const ModalGastosCotizacion = (props) => {

  const [gastoNew, setGastoNew] = useState({
    description: '',
    amount: '',
  })
  const [validateForm, setValidateForm] = useState(false)
  const inputElement = useRef()

  useEffect(() => {
    if (props.isShow) {
      setTimeout(() => {
        inputElement.current.focus()
      }, 300)
    }
  }, [props.isShow])

  const handleHide = () => {
    setGastoNew({
      description: '',
      amount: '',
    })
    setValidateForm(false)
    props.onHide()
  }

  const handleSubmit = () => {

    let gastoSubmit = Object.assign({}, gastoNew)

    if (gastoSubmit.description === "" || gastoSubmit.amount === "") {
      toast.error('Todos los campos son requeridos')
      return false
    }

    props.handleGastoSubmit(gastoSubmit)
    setGastoNew({
      description: '',
      amount: '',
    })
    inputElement.current.focus()
    setValidateForm(false)
    props.onHide()
  }

  const onChange = e => {
    setGastoNew({ ...gastoNew, [e.target.name]: e.target.value })
  }


  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop='static'
    >
      <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Gastos de la Cotización
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate validated={validateForm}>
          <Row>
            <InputFieldRef
              {...props.inputDescription}
              value={gastoNew.description}
              handleChange={onChange}
              cols="col-6"
              messageErrors={[
                "Requerido"
              ]}
              ref={inputElement}
              label="Descripción"
            />
            <InputField
              {...props.inputAmount}
              value={gastoNew.amount}
              handleChange={onChange}
            />
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={12}>
              <Button size="sm" type="button" variant="primary" block={true} onClick={handleSubmit}>
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={handleHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}


ModalGastosCotizacion.propTypes = {
  handleGastoSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired
}

ModalGastosCotizacion.defaultProps = {
  inputDescription: {
    type: 'text',
    required: true,
    name: 'description',
  },
  inputAmount: {
    type: 'number',
    required: true,
    name: 'amount',
    label: 'Monto',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-6 col-lg-6 col-6"
  }
}

export default ModalGastosCotizacion
