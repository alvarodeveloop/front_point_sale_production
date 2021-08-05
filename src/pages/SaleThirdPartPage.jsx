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
  Form,
  Modal
} from 'react-bootstrap'
import { showPriceWithDecimals, formatNumber } from 'utils/functions'
import ModalPaymentMultiple from 'components/modals/ModalPaymentMultiple'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import { FaUser, FaPencilAlt } from 'react-icons/fa'
import LoadingComponent from 'components/LoadingComponent'

let status = 1

const SaleThirdPartPage = (props) => {

  const [displayLoading, setDisplayLoading] = useState(false)
  const [payment, setPayment] = useState({
    payment: 0,
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
    type_delivery: true,
    address1_dispatch: '',
    address2_dispatch: '',
    phone_dispatch: '',
    note_dispatch: '',
    type_address: 3
  })

  const [displayAddress, setDisplayAddress] = useState(false)
  const [isOpenMultiple, setIsOpenMultiple] = useState(false)
  const [isReadOnlyPayment, setIsReadOnlyPayment] = useState(false)
  const [readFields, setReadFields] = useState(false)
  const [validatedDispatch, setValidatedDispatch] = useState(false)
  const [isOpenModalDispatch, setIsOpenModalDispatch] = useState(false)

  const handleHideModal = () => {
    setIsOpenMultiple(false)
  }

  const handleFinishPayment = statusCart => {

    status = statusCart

    if (!payment.type_delivery) {
      handleOnHideModalDispatch()
    } else {
      if (!payment.type) {
        toast.error('Debe escoger un método de pago')
        return
      }

      let total_to_pay = parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
      let paymentTotal = Math.ceil(parseFloat(payment.payment.toString().replace(/[^0-9]/g, "")));

      if (paymentTotal < total_to_pay && status === 1) {
        toast.error('El monto pagado es inferior al total por pagar')
      } else {
        let cartSale = Object.assign({}, props.sale.rooms[props.sale.idCartSelected], {
          payment,
          status,
        })

        setDisplayLoading(true)
        axios.post(API_URL + 'sale', cartSale).then(async result => {

          if (status === 2) {
            toast.success('Proceso completado, espere mientras se genera el documento de factura')
            let invoice_response = await axios.get(API_URL + 'invoice_print_by_sale/' + result.data.id)
            setDisplayLoading(false)
            window.open(API_URL + 'documents/sales/files_pdf/' + invoice_response.data.name)
            setTimeout(function () {
              returnToBegginig()
            }, 1000);
          } else {
            if (cartSale.payment.voucher) {
              toast.success('Proceso completado, espere mientras se genera el documento de factura')
              await Promise.all(result.data.map(async (v, i) => {
                let invoice_response = await axios.get(API_URL + 'invoice_print/' + v.id + "/3/2")
                window.open(API_URL + 'documents/sale_note/files_pdf/' + invoice_response.data.name)
              }))
            } else {
              toast.success('Proceso completado, espere mientras se genera el documento de factura')
              result.data.forEach((v, i) => {
                window.open(
                  process.env.REACT_APP_API_FACTURACION + v.url,
                  "_blank"
                );
              })
            }
            setDisplayLoading(false)
            setTimeout(function () {
              returnToBegginig()
            }, 1000);
          }

        }).catch(err => {
          setDisplayLoading(false)
          props.tokenExpired(err)
        })
      }
    }
  }

  const returnToBegginig = () => {
    clearForm()
    props.removeCart()
    setTimeout(() => {
      props.handleChangeView(1)
    }, 1000)
  }

  const handlePaymentMultiple = data => {
    setPayment(props1 => {
      props1.multiple_payment = {
        efectivo: data.efectivo ? data.efectivo : 0,
        tarjeta: data.tarjeta ? data.tarjeta : 0,
        sumup: data.sumup ? data.sumup : 0,
        cheque: data.cheque ? data.cheque : 0,
        otros: data.otros ? data.otros : 0,
        status: true
      }

      props1.payment = parseFloat(props1.multiple_payment.efectivo) +
        parseFloat(props1.multiple_payment.tarjeta) +
        parseFloat(props1.multiple_payment.sumup) +
        parseFloat(props1.multiple_payment.cheque) +
        parseFloat(props1.multiple_payment.otros)

      let turnet_temporal = props1.payment - parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
      if (turnet_temporal < 0) {
        props1.turned = 0
      } else {
        props1.turned = turnet_temporal
      }
      return props1
    })

    setIsOpenMultiple(false)
  }


  const onChange = e => {
    if (e.target.id === "voucherCheckbox") {
      setPayment({ ...payment, 'voucher': e.target.checked })
    } else if (e.target.name === "type_delivery") {
      let val = e.target.value === "true" ? true : false
      setPayment({ ...payment, [e.target.name]: val })
    } else {
      setPayment({ ...payment, [e.target.name]: e.target.value })
    }
  }

  const onKeyUp = e => {
    let total = parseFloat(e.target.value) - parseFloat(props.sale.rooms[props.sale.idCartSelected].totales.total)
    if (total > 0) {
      setPayment({ ...payment, turned: [2, 3, 4].includes(payment.type) ? 0 : total })
    } else {
      setPayment({ ...payment, turned: 0 })
    }
  }

  const setTypePayment = typePayment => {

    let turned = Object.assign({}, payment).turned
    let payment = Object.assign({}, payment).payment

    if (typePayment === 6) {
      setIsOpenMultiple(true)
      setIsReadOnlyPayment(true)
      payment = 0
    } else {
      if ([2, 3, 4].includes(typePayment)) {
        turned = 0
        payment = showPriceWithDecimals(props.config, Object.assign({}, props.sale.rooms[props.sale.idCartSelected].totales).total);
        setIsReadOnlyPayment(true)
      } else {
        payment = 0
        setIsReadOnlyPayment(false)
      }
    }

    setPayment(oldData => {
      let object = Object.assign({}, oldData, {
        payment, turned, payment, type: typePayment, multiple_payment: {
          efectivo: 0,
          tarjeta: 0,
          sumup: 0,
          cheque: 0,
          otros: 0,
          status: false
        }
      })
      return object
    })
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
      address1_dispatch: '',
      address2_dispatch: '',
      phone_dispatch: '',
      note_dispatch: '',
      type_address: 3
    })

    status = 1
  }

  const handleAddressDispatch = typeAddress => {
    let type = parseInt(typeAddress, 10)
    if (type === 1) {
      if (Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0) {
        let address = props.sale.rooms[props.sale.idCartSelected].client.address
        let phone = props.sale.rooms[props.sale.idCartSelected].client.phone
        setPayment({ ...payment, address1_dispatch: address, address2_dispatch: '', phone_dispatch: phone, type_address: type })
        setDisplayAddress(false)
      } else {
        toast.error('No hay cliente seleccionado para este pedido')
      }
    } else if (type === 2) {
      if (Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0) {
        let address = props.sale.rooms[props.sale.idCartSelected].client.address
        let phone = props.sale.rooms[props.sale.idCartSelected].client.phone
        setPayment({ ...payment, address1_dispatch: address, phone_dispatch: phone, type_address: type })
        setDisplayAddress(true)
        setReadFields(true)
      } else {
        toast.error('No hay cliente seleccionado para este pedido')
      }
    } else {
      setPayment({ ...payment, address1_dispatch: '', address2_dispatch: '', phone_dispatch: '', type_address: type })
      setDisplayAddress(false)
      setReadFields(false)
    }
  }

  const onSubmitDispatch = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedDispatch(true);
      return
    }

    let cartSale = Object.assign({}, props.sale.rooms[props.sale.idCartSelected], {
      payment,
      status,
    })
    setDisplayLoading(true)
    axios.post(API_URL + 'sale_by_dispatch', cartSale).then(result => {
      toast.success('Proceso Completado')
      clearForm()
      props.removeCart()
      setDisplayLoading(false)
      setTimeout(() => {
        props.handleChangeView(1)
      }, 1500)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleOnHideModalDispatch = () => {
    setIsOpenModalDispatch(!isOpenModalDispatch)
  }

  return (
    <Container fluid='true'>
      <Row className="justify-content-around justify-content-md-start" style={{ borderRadius: '15px', boxShadow: '10px 5px 5px lightgray' }}>
        <Col sm={4} md={4} lg={4} xs={6}>
          <Button size="sm" size="sm" onClick={() => props.handleChangeView(2)}>Volver a la Sección 2</Button>
        </Col>
        <Col sm={4} md={4} lg={4} xs={6}>
          <h3 className="text-center font-title">Pago del Carrito N° {props.sale.idCartSelected + 1}</h3>
        </Col>
      </Row>
      <br /><br />
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Row className="justify-content-center">
          <Col sm={4} md={4} lg={4} xs={5} style={{ borderRadius: '15px', boxShadow: '5px 5px 5px lightgray' }}>
            <h4 className="text-center">Métodos de Pago</h4>
            <br />
            <Row className="mb-2 mb-md-4 justify-content-center">
              <Col sm={10} md={6} lg={6} xs={10} className="mb-2 mb-md-0">
                <Button size="sm" onClick={() => setTypePayment(1)} variant={payment.type === 1 ? 'secondary' : 'dark'} block="true">Efectivo</Button>
              </Col>
              <Col sm={10} md={6} lg={6} xs={10}>
                <Button size="sm" onClick={() => setTypePayment(2)} variant={payment.type === 2 ? 'secondary' : 'dark'} block="true">Tarjeta Debito</Button>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={10} md={6} lg={6} xs={10}>
                <Button size="sm" onClick={() => setTypePayment(3)} variant={payment.type === 3 ? 'secondary' : 'dark'} block="true">Tarjeta Crédito</Button>
              </Col>
              {/*<Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" onClick={() => setTypePayment(4)} variant={payment.type === 4 ? 'secondary' : 'dark'} block="true">Cheque</Button>
              </Col>*/}
            </Row>
            {/*
            <br/><br/>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" onClick={() => setTypePayment(5)} variant={payment.type === 5 ? 'secondary' : 'dark'} block="true">Otros</Button>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" onClick={() => setTypePayment(6)} variant={payment.type === 6 ? 'secondary' : 'dark'} block="true">Pago multiple</Button>
              </Col>
            </Row>*/}
            <br></br>
            <hr />
            <Row>
              <Col sm={12} md={6} lg={6}>
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
              <Col sm={12} md={6} lg={6}>
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
              <Col sm={12} md={6} lg={6}>
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
            <Button size="sm" variant="danger" className="text-white" block="true" onClick={() => handleFinishPayment(1)} style={{ color: 'black' }}>Finalizar</Button>
            <br />
          </Col>
          { /* separacion de los botones y el monto */}
          <Col sm={7} md={7} lg={7} xs={7} style={{ borderRadius: '15px', boxShadow: '10px 5px 5px lightgray' }}>
            <br />
            <Row>
              <Col sm={6} md={4} lg={4} xs={6} className="text-center">
                <h4>Sub Total:</h4>
                <Badge variant="primary" style={{ fontSize: '18px' }}>{props.config.simbolo_moneda}{showPriceWithDecimals(props.config, props.sale.rooms[props.sale.idCartSelected].totales.neto)} </Badge>
              </Col>
              <Col sm={6} md={4} lg={4} xs={6} className="text-center">
                <h4>Tax:</h4>
                <Badge variant="primary" style={{ fontSize: '18px' }}>{props.config.simbolo_moneda}{showPriceWithDecimals(props.config, props.sale.rooms[props.sale.idCartSelected].totales.tax)}</Badge>
              </Col>
              <Col sm={6} md={4} lg={4} xs={6} className="text-center mt-2 mt-md-0">
                <h4>Total:</h4>
                <Badge variant="primary" style={{ fontSize: '18px' }}>{props.config.simbolo_moneda}{showPriceWithDecimals(props.config, props.sale.rooms[props.sale.idCartSelected].totales.total)}</Badge>
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
                value={showPriceWithDecimals(props.config, payment.turned)}
              />
            </Row>
            <Row className="justify-content-center">
              <Col sm={10} md={6} lg={6} xs={12}>
                <Button size="sm" block="true" variant="primary" type="button" onClick={() => handleFinishPayment(2)} >Guardar Pedido</Button>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col sm={10} md={6} lg={6} xs={12} className="text-center">
                <DropdownButton size="sm" id={'cart_button_quantity'} title="Opciones del Carrito" block="true" variant="primary" className="dropdown_block" drop={'up'}>
                  <Dropdown.Item onClick={() => props.handleChangeView(2)}>Volver a la Sección 2</Dropdown.Item>
                  {props.sale.rooms.map((v, i) => (
                    <Dropdown.Item onClick={() => props.changeCartId(i)} key={i}>Carrito N° {i + 1}</Dropdown.Item>
                  ))}
                </DropdownButton>
                {props.showIndexCart()}
                <br /><br />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <ModalPaymentMultiple
        isShow={isOpenMultiple}
        onHide={handleHideModal}
        handlePaymentMultiple={handlePaymentMultiple}
      />
      <Modal
        show={isOpenModalDispatch}
        onHide={handleOnHideModalDispatch}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Adjuntar Dirección para el Depacho del Carrito N° {props.sale.idCartSelected + 1}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmitDispatch} noValidate validated={validatedDispatch}>
          {displayLoading ? (
            <LoadingComponent />
          ) : (
            <Modal.Body>
              <Row style={{ borderRadius: '15px', boxShadow: '10px 5px 5px lightgray', paddingTop: '20px', paddingBottom: '20px' }}>
                <Col sm={12} md={12} lg={12}>
                  <Row>
                    <Col sm={4} md={4} lg={4} xs={6}>
                      <Button variant="dark" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(1)}>Usar Datos del Cliente <FaUser /></Button>
                    </Col>
                    <Col sm={4} md={4} lg={4} xs={6}>
                      <Button variant="dark" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(2)}>Usar datos del cliente pero con otra dirección <FaUser /></Button>
                    </Col>
                    <Col sm={4} md={4} lg={4} xs={6} className="mt-2 mt-md-0">
                      <Button variant="dark" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(3)}>Ingresar Datos <FaPencilAlt /></Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <InputField
                      type="text"
                      name="address1_dispatch"
                      required={true}
                      label="Dirección"
                      value={payment.address1_dispatch}
                      handleChange={onChange}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols="col-sm-4 col-md-4 col-sm-4"
                      readonly={readFields}
                    />
                    <InputField
                      type="number"
                      name="phone_dispatch"
                      required={true}
                      label="Teléfono"
                      value={payment.phone_dispatch}
                      handleChange={onChange}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols="col-sm-4 col-md-4 col-sm-4"
                      readonly={readFields}
                    />
                    <InputField
                      type="text"
                      name="note_dispatch"
                      required={true}
                      label="Nota"
                      value={payment.note_dispatch}
                      handleChange={onChange}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols="col-sm-4 col-md-4 col-sm-4"
                    />
                  </Row>
                  {!displayAddress ? '' : (
                    <Row>
                      <InputField
                        type="text"
                        name="address2_dispatch"
                        required={true}
                        label="Dirección2"
                        value={payment.address2_dispatch}
                        handleChange={onChange}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols="col-sm-4 col-md-4 col-sm-4"
                      />
                    </Row>
                  )}
                  <br />
                </Col>
              </Row>
              <br />
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4} xs={6}>
                  <Button variant="danger" size="sm" type="submit" block={true}>Enviar para Guardar</Button>
                </Col>
                <Col sm={4} md={4} lg={4} xs={6}>
                  <Button variant="secondary" size="sm" onClick={handleOnHideModalDispatch} block={true} type="button">Cerrar</Button>
                </Col>
              </Row>
            </Modal.Body>
          )}
        </Form>
      </Modal>
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
    type: 'text',
    required: true,
    name: 'payment',
    label: '',
    placeholder: 'Cantidad Recibida',
    cols: "col-sm-10 col-md-6 col-lg-6 col-6",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputTurned: {
    type: 'text',
    required: true,
    name: 'turned',
    label: '',
    placeholder: 'Vuelto',
    cols: "col-sm-10 col-md-6 col-lg-6 col-6",
    readonly: true,
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default SaleThirdPartPage
