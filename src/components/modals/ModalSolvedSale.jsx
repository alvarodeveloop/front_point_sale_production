import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'
import { showPriceWithDecimals } from 'utils/functions'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import InputField from 'components/input/InputComponent'
import axios from 'axios'

const ModalSolvedSale = ({dataToPay, ...props}) => {

  const [payment, setPayment] = useState({
    payment: '',
    turned: '',
    type: 1,
    multiple_payment: {
      efectivo: 0,
      tarjeta: 0,
      sumup: 0,
      cheque: 0,
      otros: 0,
      status: false
    },
    voucher: false,
  })

  const [isOpenMultiple,setIsOpenMultiple] = useState(false)
  const [isReadOnlyPayment,setIsReadOnlyPayment] = useState(false)

  const handleOnHide = () => {
    props.onHide()
  }

  const setTypePayment = typePayment => {

    let turned = Object.assign({},payment).turned
    let paymentValue = Object.assign({},payment).payment

    if(typePayment === 6){
      setIsOpenMultiple(true)
      setIsReadOnlyPayment(true)
    }else{
      if([2,3,4].includes(typePayment)){
        turned = 0
        paymentValue = dataToPay.total
      }
      setIsReadOnlyPayment(false)
    }

    setPayment({...payment, turned, payment: paymentValue, type: typePayment, multiple_payment: {
      efectivo: 0,
      tarjeta: 0,
      sumup: 0,
      cheque: 0,
      otros: 0,
      status: false
    }})
  }


  const onChangeMultiple = e => {
    let newPaymentMultiple = Object.assign({},payment.multiple_payment)
    newPaymentMultiple[e.target.name] = e.target.value
    setPayment({...payment, multiple_payment : newPaymentMultiple})

  }

  const handleFinishPayment = () => {

    if(!payment.type){
      toast.error('Debe escoger un método de pago')
      return
    }

    if(!payment.payment){
      toast.error('Debe ingresar un monto a pagar')
      return
    }

    let total_to_pay = parseFloat(dataToPay.total)
    let paymentTotal = parseFloat(payment.payment)
    if(paymentTotal < total_to_pay){
      toast.error('El monto pagado es inferior al total por pagar')
    }else{
      let cartSale = Object.assign({},dataToPay,{
        payment
      })
      let route = props.isDispatch ? 'sale_dispatch_payment' : 'sale_fiao'
      axios.post(API_URL+route,cartSale).then(result => {

        toast.success('Proceso Completado')
        props.onHide()

      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err)
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const handlePaymentMultiple = () => {

    let total = parseFloat( payment.multiple_payment.efectivo ) +
                    parseFloat( payment.multiple_payment.tarjeta ) +
                    parseFloat( payment.multiple_payment.sumup ) +
                    parseFloat( payment.multiple_payment.cheque ) +
                    parseFloat( payment.multiple_payment.otros )

    let turnet_temporal =  total - dataToPay.total

    if(turnet_temporal < 0 ){
      turnet_temporal = 0
    }

    setPayment({...payment, turned: turnet_temporal, payment: total})
    setIsOpenMultiple(false)
  }


  const onChange = e => {
    if(e.target.id === "voucherCheckbox"){
      setPayment({...payment, 'voucher' : e.target.checked})
    }else if(e.target.name === "type_delivery"){
      let val = e.target.value === "true" ? true : false
      setPayment({...payment, [e.target.name] : val})
    }else{
      setPayment({...payment, [e.target.name] : e.target.value})
    }
  }

  const onKeyUp = e => {
    let total = parseFloat(e.target.value) - parseFloat(dataToPay.total)
    if(total > 0){
      setPayment({...payment, turned: [2,3,4].includes(payment.type) ? 0 : total})
    }else{
      setPayment({...payment, turned: 0})
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
          Cancelar Factura
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isOpenMultiple ? (
          <React.Fragment>
            <div className="containerDiv" style={{ marginLeft: '-8px'}}>
              <Col sm={12} md={12} lg={12} xs={12}>
                <h4 className="text-center">Factura N° {dataToPay.ref}</h4>
                <Row>
                  <Col sm={4} md={4} lg={4} xs={12} className="text-center">
                    <h4>Sub Total: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,dataToPay.sub_total) } </Badge></h4>
                  </Col>
                  <Col sm={4} md={4} lg={4} xs={12} className="text-center">
                    <h4>Tax: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,dataToPay.tax) }</Badge></h4>
                  </Col>
                  <Col sm={4} md={4} lg={4} xs={12} className="text-center">
                    <h4>Total: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,dataToPay.total) }</Badge></h4>
                  </Col>
                </Row>
              </Col>
            </div>
            <div className="containerDiv" style={{ marginLeft: '-8px'}}>
              <Row className="justify-content-center">
                <InputField
                  {...props.inputPayment}
                  handleChange={onChange}
                  value={payment.payment}
                  handleKeyUp={onKeyUp}
                  readonly={isReadOnlyPayment}
                  />
              </Row>
              <Row className="justify-content-center">
                <InputField
                  {...props.inputTurned}
                  handleChange={onChange}
                  value={payment.turned}
                  />
              </Row>
            </div>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Form.Group>
                  <Form.Check type="checkbox"
                    custom
                    id={'voucherCheckbox'}
                    label={'Venta sin Boleta'}
                    value={payment.voucher}
                    checked={payment.voucher}
                    onChange={onChange} />
                </Form.Group>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <b>Metodo de Pago: </b>{payment.type === 1 ? (
                    <Badge variant="danger" className="font-badge">Efectivo</Badge>
                  ) : payment.type === 2 ? (
                    <Badge variant="danger" className="font-badge">Débito</Badge>
                  ) : (
                    <Badge variant="danger" className="font-badge">Crédito</Badge>
                  )}
              </Col>
            </Row>
            <Row className="containerDiv justify-content-center" style={{ marginLeft: '-8px'}}>
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(1)} variant="dark" block="true">Efectivo</Button>
              </Col>
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(2)} variant="dark" block="true">Tarjeta Debito</Button>
              </Col>
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(3)} variant="dark" block="true">Tarjeta Crédito</Button>
              </Col>
              <br/><br/>
              {/*
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(4)} variant="dark" block="true">Cheque</Button>
              </Col>
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(5)} variant="dark" block="true">Otros</Button>
              </Col>
              <Col sm={4} md={4} lg={4} xs={12}>
                <Button size="sm" onClick={() => setTypePayment(6)} variant="dark" block="true">Pago multiple</Button>
              </Col>
              <div className="clearfix"></div>
              */}
              <br/><br/>
              <Col sm={6} md={6} lg={6} xs={12}>
                <Button size="sm" variant="secondary" block="true" onClick={handleFinishPayment}>Finalizar</Button>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="containerDiv">
            <Col sm={12} md={12} lg={12} xs={12}>
              <Row>
                <InputField
                  {...props.inputEfectivo}
                  value={payment.multiple_payment.efectivo}
                  handleChange={onChangeMultiple}
                />
                <InputField
                  {...props.inputTarjeta}
                  value={payment.multiple_payment.tarjeta}
                  handleChange={onChangeMultiple}
                />
              </Row>
              <Row>
                <InputField
                  {...props.inputSumup}
                  value={payment.multiple_payment.sumup}
                  handleChange={onChangeMultiple}
                />
                <InputField
                  {...props.inputCheque}
                  value={payment.multiple_payment.cheque}
                  handleChange={onChangeMultiple}
                />
              </Row>
              <Row>
                <InputField
                  {...props.inputOtros}
                  value={payment.multiple_payment.otros}
                  handleChange={onChangeMultiple}
                />
              </Row>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" variant="secondary" block={true} onClick={handlePaymentMultiple}>Procesar</Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" variant="danger" block={true} onClick={()=> setIsOpenMultiple(false)}>Mostrar Sección de Pagos</Button>
                </Col>
              </Row>
            </Col>
          </div>
          </React.Fragment>
        )}

      </Modal.Body>
      <Modal.Footer>
          <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalSolvedSale.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  configStore: PropTypes.object.isRequired,
  isDispatch: PropTypes.bool,
}

ModalSolvedSale.defaultProps = {
  inputPayment: {
    type: 'number',
    required: true,
    name: 'payment',
    label : '',
    placeholder: 'Cantidad Recibida',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputTurned: {
    type: 'number',
    required: true,
    name: 'turned',
    label : '',
    placeholder: 'Vuelto',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    step: 'any',
    readonly: true,
    messageErrors: [
      'Requerido*'
    ],
  },
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
  }
}


export default ModalSolvedSale
