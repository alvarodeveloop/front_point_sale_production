import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/input/InputComponent'
import {
  Modal,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

const ModalDiscountProduct = (props) => {

  const [validate, setValidate] = useState(false)
  const [totalCalculado,setTotalCalculado] = useState(0)
  const [discount, setDiscount] = useState({
    type: 'fijo',
    amount: ''
  })

  const inputRechargeRef = useRef()

  useEffect(() => {
    if(props.isShow){
      inputRechargeRef.current.focus()
    }
  },[props.isShow])

  useEffect(() => {
    return () => {
      setDiscount({
        type: 'fijo',
        amount: ''
      })
    }
  },[])

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

    props.handleDiscountProduct(Object.assign({},discount))
    setDiscount({
      type:'fijo',
      amount: ''
    })
  }

  const onChange = e => {
    setDiscount( { ...discount, [e.target.name] : e.target.value } )
    if(props.product && e.target.name === "amount"){
      if(discount.type !== "fijo"){
        let total = parseFloat(props.product.price) * parseFloat(props.product.cantidad)
        let resTotal = ((total * discount.amount) / 100) * parseFloat(props.product.cantidad)
        total = total - resTotal
        total = total ? total : 0
        setTotalCalculado(total)
      }else{
        let total = parseFloat(props.product.price) * parseFloat(props.product.cantidad)
        let resTotal = parseFloat(e.target.value) * parseFloat(props.product.cantidad)
        total = total - resTotal
        total = total ? total : 0
        setTotalCalculado(total)
      }
    }else if(!props.product && e.target.name === "amount"){

      if(discount.type !== "fijo"){
        let total = (parseFloat(props.totales.total_backup) * parseFloat(e.target.value)) / 100
        total = parseFloat(props.totales.total_backup) - total
        total = total ? total : 0
        setTotalCalculado(total)
      }else{
        let total = (parseFloat(props.totales.total_backup) - parseFloat(e.target.value))
        total = total ? total : 0
        setTotalCalculado(total)
      }

    }
  }

  const handleResetRechargeDiscount = () => {
    props.handleResetRechargeDiscount({
      product: props.product,
      isRegistered: props.product.is_neto ? 'registered' : 'not_registered'
    })
  }

  const handleResetTotal = () => {
    props.handleResetTotal()
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
          Agregar Descuento al Producto
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validate}>
        <Modal.Body>
          <Row className="justify-content-center">
            <InputField
              {...props.inputType}
              value={discount.type}
              handleChange={onChange}
            >
              <option value=''>--Seleccione--</option>
              <option value='fijo'>Fijo</option>
              <option value='percentaje'>Porcentaje</option>
            </InputField>
            <Col sm={6} md={6} lg={6} xs={12}>
              <label className="form-control-label">Monto</label>
              <input
                className="form-control"
                ref={inputRechargeRef}
                value={discount.amount}
                onChange={onChange}
                {...props.inputDiscount}
                />
              <Form.Control.Feedback type="invalid">
                <span className="error-input">Requerido*</span>
              </Form.Control.Feedback>
            </Col>
          </Row>
          {props.product ? (
            <Row>
              <Col sm={6} md={6} lg={6}>
                <Form.Control
                  type={'number'}
                  name={'total_calculado'}
                  value={totalCalculado}
                  readOnly={true}
                  className={'form-control'}
                  step={'any'}
                  />
              </Col>
              <Col sm={6} md={6} lg={6}>
                <br/>
                <Button size="sm" variant="secondary" onClick={handleResetRechargeDiscount}>Reestablecer Precio Base</Button>
              </Col>
            </Row>
          ): (
            <Row>
              <Col sm={6} md={6} lg={6}>
                <Form.Control
                  type={'number'}
                  name={'total_calculado'}
                  value={totalCalculado}
                  readOnly={true}
                  className={'form-control'}
                  step={'any'}
                  />
              </Col>
              <Col sm={6} md={6} lg={6}>
                <br/>
                <Button size="sm" variant="secondary" onClick={handleResetTotal}>Reestablecer Precio Base</Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" type="submit">Enviar</Button>
          <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalDiscountProduct.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleDiscountProduct: PropTypes.func.isRequired,
  product: PropTypes.object,
  handleResetTotal: PropTypes.func,
}

ModalDiscountProduct.defaultProps ={
  inputType: {
    type: 'select',
    required: true,
    name: 'type',
    label : 'Tipo de Descuento',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputDiscount: {
    type: 'number',
    required: true,
    name: 'amount',
    label : 'Monto Descuento',
    step: 'any',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
}


export default ModalDiscountProduct
