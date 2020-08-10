import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
  Col,
  Form
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import 'styles/components/modalComponents.css'
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'

const ModalPaymentMultiple = (props) => {

  const [paymentMultiple, setPaymentMultiple] = useState({
    efectivo: 0,
    tarjeta: 0,
    sumup: 0,
    cheque: 0,
    otros: 0
  })

  const onChange = e => {
    setPaymentMultiple({...paymentMultiple, [e.target.name] : e.target.value ? e.target.value : 0})
  }

  const handleSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    let validate = false

    Object.keys(paymentMultiple).forEach(v => {
      if(paymentMultiple[v] > 0){
        validate = true
      }
    })

    if(!validate){
      toast.error('Debe llenar al menos un método de pago')
    }else{

      props.handlePaymentMultiple(paymentMultiple)
    }
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Historial del Producto {props.name_product}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <InputField
              {...props.inputEfectivo}
              value={paymentMultiple.efectivo}
              handleChange={onChange}
            />
            <InputField
              {...props.inputTarjeta}
              value={paymentMultiple.tarjeta}
              handleChange={onChange}
            />
          </Row>
          <Row>
            <InputField
              {...props.inputSumup}
              value={paymentMultiple.sumup}
              handleChange={onChange}
            />
            <InputField
              {...props.inputCheque}
              value={paymentMultiple.cheque}
              handleChange={onChange}
            />
          </Row>
          <Row>
            <InputField
              {...props.inputOtros}
              value={paymentMultiple.otros}
              handleChange={onChange}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" type="submit" variant="secondary">Finalizar</Button>
          <Button size="sm" onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )

}

ModalPaymentMultiple.defaultProps = {
  inputEfectivo: {
    type: 'number',
    required: false,
    name: 'efectivo',
    label : 'Efectivo',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [

    ],
  },
  inputTarjeta: {
    type: 'number',
    required: false,
    name: 'tarjeta',
    label : 'Tarjeta',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [

    ],
  },
  inputSumup: {
    type: 'number',
    required: false,
    name: 'sumup',
    label : 'Sumup',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [

    ],
  },
  inputCheque: {
    type: 'number',
    required: false,
    name: 'cheque',
    label : 'Cheque',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [

    ],
  },
  inputOtros: {
    type: 'number',
    required: false,
    name: 'otros',
    label : 'Otros',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [

    ],
  },
}

export default ModalPaymentMultiple
