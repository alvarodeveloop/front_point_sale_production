import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/input/InputComponent'
import {
  Row,
  Col,
  Button,
  Container,
  DropdownButton,
  Dropdown,
  Badge,
  Form
} from 'react-bootstrap'
import { showPriceWithDecimals } from 'utils/functions'
import ModalPaymentMultiple from 'components/modals/ModalPaymentMultiple'
import ModalFactura from 'components/modals/ModalFactura'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const SaleThirdPartPage = (props) => {

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
    type_delivery: true
  })

  const [lastSale,setLastSale] = useState({})

  const [isOpenMultiple, setIsOpenMultiple] = useState(false)
  const [isOpenInvoice, setIsOpenInvoice] = useState(false)
  const [isReadOnlyPayment, setIsReadOnlyPayment] = useState(false)
  const [showButtonInvoice,setShowButtonInvoice] = useState(false)

  const handleHideModal = () => {
    setIsOpenMultiple(false)
  }

  const handleFinishPayment = status => {

    if(!payment.type){
      toast.error('Debe escoger un método de pago')
      return
    }

    let total_to_pay = parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
    let paymentTotal = parseFloat(payment.payment)
    if(paymentTotal < total_to_pay){
      toast.error('El monto pagado es inferior al total por pagar')
    }else{
      let cartSale = Object.assign({},props.sale.rooms[props.sale.idCartSelected],{
        payment,
        status
      })

      axios.post(API_URL+'sale',cartSale).then(result => {

        toast.success('Proceso Completado')
        if(status === 2){
          clearForm()
          props.removeCart()
          setTimeout(() => {
            props.handleChangeView(1)
          },1000)
        }else{
          clearForm()
          setLastSale(result.data)
          setIsOpenInvoice(true)
        }

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

  const handlePaymentMultiple = data => {
    setPayment(props1 => {
      props1.multiple_payment = {
        efectivo: data.efectivo,
        tarjeta: data.tarjeta,
        sumup: data.sumup,
        cheque: data.cheque,
        otros: data.otros,
        status: true
      }

      props1.payment = parseFloat( data.efectivo ) +
                      parseFloat( data.tarjeta ) +
                      parseFloat( data.sumup ) +
                      parseFloat( data.cheque ) +
                      parseFloat( data.otros )

      let turnet_temporal =  props1.payment - parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
      if(turnet_temporal < 0 ){
        props1.turned = 0
      }else{
        props1.turned   = turnet_temporal
      }
      return props1
    })

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
    let total = parseFloat(e.target.value) - parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
    if(total > 0){
      setPayment({...payment, turned: [2,3,4].includes(payment.type) ? 0 : total})
    }else{
      setPayment({...payment, turned: 0})
    }
  }

  const setTypePayment = typePayment => {

    let turned = Object.assign({},payment).turned
    let payment = Object.assign({},payment).payment

    if(typePayment === 6){
      setIsOpenMultiple(true)
      setIsReadOnlyPayment(true)
      payment = 0
    }else{
      if([2,3,4].includes(typePayment)){
        turned = 0
        payment = Object.assign({},props.sale.rooms[props.sale.idCartSelected].totales).total
        setIsReadOnlyPayment(true)
      }else{
        payment = 0
        setIsReadOnlyPayment(false)
      }
    }

    setPayment({...payment, turned, payment, type: typePayment, multiple_payment: {
      efectivo: 0,
      tarjeta: 0,
      sumup: 0,
      cheque: 0,
      otros: 0,
      status: false
    }})
  }

  const handleHideModalFactura = () => {
    setIsOpenInvoice(false)
    props.removeCart()
    setTimeout(() => {
      props.handleChangeView(1)
    },1000)
  }

  const clearForm = () => {
    setPayment({
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
    })
  }

  return (
    <Container fluid='true'>
      <Row style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
        <Col sm={4} md={4} lg={4} xs={4}>
          <Button size="sm" size="sm" onClick={() => props.handleChangeView(2)}>Volver a la Sección 2</Button>
        </Col>
        <Col sm={4} md={4} lg={4} xs={4}>
          <h3 className="text-center font-title">Pago del Carrito N° {props.sale.idCartSelected + 1}</h3>
        </Col>
      </Row>
      <br/><br/>
      <Row>
        <Col sm={4} md={4} lg={4} style={{borderRadius:'15px',boxShadow:'5px 5px 5px lightgray'}}>
          <br/><br/>
          <Row>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(1)} variant={payment.type === 1 ? 'secondary' : 'dark'} block="true">Efectivo</Button>
            </Col>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(2)} variant={payment.type === 2 ? 'secondary' : 'dark'} block="true">Tarjeta</Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(3)} variant={payment.type === 3 ? 'secondary' : 'dark'} block="true">Sumup</Button>
            </Col>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(4)} variant={payment.type === 4 ? 'secondary' : 'dark'} block="true">Cheque</Button>
            </Col>
          </Row>
          <br/><br/>
          <Row>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(5)} variant={payment.type === 5 ? 'secondary' : 'dark'} block="true">Otros</Button>
            </Col>
            <Col sm={6} md={6} lg={6} xs={6}>
              <Button size="sm" onClick={() => setTypePayment(6)} variant={payment.type === 6 ? 'secondary' : 'dark'} block="true">Pago multiple</Button>
            </Col>
          </Row>
          <br></br>
          <hr/>
          <Row>
            <Col sm={6} md={6} lg={6}>
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
          </Row>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Check type="radio"
                  custom
                  id={'typeDelivery1'}
                  name="type_delivery"
                  label={'Entrega Inmediata'}
                  value={true}
                  checked={payment.type_delivery}
                  onChange={onChange} />
              </Form.Group>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Check type="radio"
                  custom
                  id={'typeDelivery2'}
                  name="type_delivery"
                  label={'Guardar en Despacho'}
                  value={false}
                  checked={!payment.type_delivery}
                  onChange={onChange} />
              </Form.Group>
            </Col>
          </Row>
          <Button size="sm" variant="danger" className="text-white" block="true" onClick={() => handleFinishPayment(1) } style={{color:'black'}}>Finalizar</Button>
          <br/>
        </Col>
        { /* separacion de los botones y el monto */}
        <Col sm={7} md={7} lg={7} xs={7}  style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
          <br/>
          <Row>
            <Col sm={4} md={4} lg={4} xs={12} className="text-center">
              <h4>Sub Total: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.neto) } </Badge></h4>
            </Col>
            <Col sm={4} md={4} lg={4} xs={12} className="text-center">
              <h4>Tax: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.tax) }</Badge></h4>
            </Col>
            <Col sm={4} md={4} lg={4} xs={12} className="text-center">
              <h4>Total: <Badge variant="primary" style={{fontSize: '18px'}}>{ showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.total) }</Badge></h4>
            </Col>
          </Row>
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
          <Row className="justify-content-center">
            <Col sm={6} md={6} lg={6} xs={12}>
              <Button size="sm" block="true" variant="primary" type="button" onClick={ () => handleFinishPayment(2) } >Guardar Pedido</Button>
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col sm={6} md={6} lg={6} xs={12}>
              <DropdownButton size="sm" id={'cart_button_quantity'} title="Opciones del Carrito"  block="true" variant="primary" className="dropdown_block" drop={'up'}>
                <Dropdown.Item onClick={() => props.handleChangeView(2)}>Volver a la Sección 2</Dropdown.Item>
                {props.sale.rooms.map((v,i) => (
                  <Dropdown.Item onClick={ () => props.changeCartId(i) } key={i}>Carrito N° { i + 1 }</Dropdown.Item>
                ))}
              </DropdownButton>
              { props.showIndexCart() }
              <br/><br/>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalPaymentMultiple
        isShow={isOpenMultiple}
        onHide={handleHideModal}
        handlePaymentMultiple={handlePaymentMultiple}
        />
      <ModalFactura
        isShow={isOpenInvoice}
        onHide={handleHideModalFactura}
        lastSale={lastSale}
        configStore={props.configStore}
        config={props.config}
        sale={props.sale.rooms[props.sale.idCartSelected]}
        />
    </Container>
  )
}

SaleThirdPartPage.propTypes = {
    config: PropTypes.object.isRequired,
    configStore: PropTypes.object.isRequired,
    changeCartId: PropTypes.func.isRequired,
    sale: PropTypes.object.isRequired,
    removeCart: PropTypes.func.isRequired,
    showIndexCart: PropTypes.func.isRequired
}

SaleThirdPartPage.defaultProps = {
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
}

export default SaleThirdPartPage
