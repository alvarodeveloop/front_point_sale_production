import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  Badge,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import CardProductSale from 'components/CardProductSale'
import ModalDescriptionSaleProduct from 'components/modals/ModalDescriptionSaleProduct'
import ModalRechargeProduct from 'components/modals/ModalRechargeProduct'
import ModalDiscountProduct from 'components/modals/ModalDiscountProduct'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { FaPlusCircle,FaShoppingCart} from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const SaleSecondPartPage = (props) => {

  const [isRegisteredUpdate, setIsRegisteredUpdate] = useState(false)
  const [isActiveRechargeTotal, setIsActiveRechargeTotal] = useState(false)
  const [isActiveDiscountTotal, setIsActiveDiscountTotal] = useState(false)
  const [openModalDescription, setOpenModalDescription] = useState(false)
  const [openModalRecharge, setOpenModalRecharge] = useState(false)
  const [openModalDiscount, setOpenModalDiscount] = useState(false)
  const [openModalDiscountTotal, setOpenModalDiscountTotal] = useState(false)
  const [openModalRechargeTotal, setOpenModalRechargeTotal] = useState(false)
  const [productDescription, setProductDescription] = useState({})
  const [valueRechargeTotal, setValueRechargeTotal] = useState('')
  const [valueDiscountTotal, setValueDiscountTotal] = useState('')
  const [isDispatch, setIsDispatch] = useState(false)
  const [validated, setValidated] = useState(false)
  const [readFields, setReadFields] = useState(true)
  const [dataForm, setDataForm] = useState({
    address1_dispatch: '',
    address2_dispatch: '',
    phone_dispatch: '',
    note_dispatch: '',
    type_address: 3
  })

  const [displayAddress,setDisplayAddress] = useState(false)

  const catchDescriptionProduct = description => {
    setOpenModalDescription(!openModalDescription)
    props.setDescription({
      id_product:  Object.assign({},productDescription).id,
      description: description,
      typeProduct: Object.assign({},{},{isRegister: isRegisteredUpdate}).isRegister
    })
  }

  const handleAdvaceToPayment = () => {
      props.handleChangeView(3)
  }

  const handleChangeDiscountRechargeTotal = e => {
    if(e.target.dataset.type === "recharge"){
      setValueRechargeTotal(e.target.value)
    }else{
      setValueDiscountTotal(e.target.value)
    }
  }

  const handleDiscountProduct = discount => {
    props.setDiscount({
      discount,
      product: Object.assign({},productDescription),
      isRegistered: Object.assign({},{},{isRegister: isRegisteredUpdate}).isRegister,
      configStore: props.configStore,
    })
    setOpenModalDiscount(!openModalDiscount)
  }

  const handleModalDescription = product => {
    let isRegistered = product.inventary ? 'registered' : 'not_registered'
    setProductDescription(product)
    setOpenModalDescription(!openModalDescription)
    setIsRegisteredUpdate(isRegistered)
  }


  const handleModalDiscount = (product,isRegistered) => {
    let registerBoolean = isRegistered ? 'registered' : 'not_registered'
    setProductDescription(product)
    setOpenModalDiscount(!openModalDiscount)
    setIsRegisteredUpdate(registerBoolean)
  }

  const handleModalRechage = (product,isRegistered) => {
    let registerBoolean = isRegistered ? 'registered' : 'not_registered'
    setProductDescription(product)
    setOpenModalRecharge(!openModalRecharge)
    setIsRegisteredUpdate(registerBoolean)
  }

  const handleRechargeTotal = data => {

    props.setRechargeTotal({
      recharge: data,
      configStore: props.configStore
    })

    setOpenModalRechargeTotal(!openModalRechargeTotal)

  }

  const handleDiscountTotal = data => {

    props.setDiscountTotal({
      discount: data,
      configStore: props.configStore
    })

    setOpenModalDiscountTotal(!openModalDiscountTotal)
  }

  const handleRechargeProduct = discount => {
      props.setRecharge({
        discount,
        product: Object.assign({},productDescription),
        isRegistered: Object.assign({},{},{isRegister: isRegisteredUpdate}).isRegister,
        configStore: props.configStore,
      })

      setOpenModalRecharge(!openModalRecharge)
  }

  const handleResetTotal = () => {
    props.handleResetTotal({
      configStore: props.configStore
    })
    setOpenModalRechargeTotal(false)
    setOpenModalDiscountTotal(false)
  }

  const resetDiscountOrRecharge = data => {

    props.resetDiscountRecharge({
      product: Object.assign({},data.product),
      configStore: props.configStore,
      typeRegister: data.isRegistered
    })
    setOpenModalRecharge(false)
    setOpenModalDiscount(false)
  }

  const showDiscountTotal = type => {
    if(type === "discount"){

      switch (props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.type) {
        case 'resta':
          return (
            <React.Fragment>
              <Badge variant="danger">
                {props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.amount}
              </Badge>
              <br/>
              <span>
                { props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? 'porcentaje' : 'fijo' }
              </span>
            </React.Fragment>

          )
        break;
        default:
          return 0
      }

    }else if( type === "recharge"){
      switch (props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.type) {
        case 'suma':
          return (
            <React.Fragment>
              <Badge variant="danger">
                {props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.amount}
              </Badge>
              <br/>
              <span>
                { props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? 'porcentaje' : 'fijo' }
              </span>
            </React.Fragment>
          )
        break;
        default:
          return 0
      }
    }
  }

  const onChange = e => {
    setDataForm({...dataForm, [e.target.name] : e.target.value})
  }

  const onSubmitDispatch = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},dataForm)

    let cartSale = Object.assign({},props.sale.rooms[props.sale.idCartSelected],{
      payment : {},
      status: 4,
      dispatch: data
    })

    axios.post(API_URL+'sale_by_dispatch',cartSale).then(result => {

      toast.success('Despacho Guardado')
      clearForm()
      props.removeCart()
      setTimeout(() => {
        props.handleChangeView(1)
      },1000)

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleAddressDispatch = typeAddress => {
    let type = parseInt(typeAddress,10)
    if(type === 1){
      if(Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0){
        let address = props.sale.rooms[props.sale.idCartSelected].client.address
        let phone = props.sale.rooms[props.sale.idCartSelected].client.phone
        setDataForm({...dataForm, address1_dispatch: address, address2_dispatch: '', phone_dispatch: phone, type_address : type})
        setDisplayAddress(false)
      }else{
        toast.error('No hay cliente seleccionado para este pedido')
      }
    }else if(type === 2){
      if(Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0){
        let address = props.sale.rooms[props.sale.idCartSelected].client.address
        let phone = props.sale.rooms[props.sale.idCartSelected].client.phone
        setDataForm({...dataForm, address1_dispatch: address, phone_dispatch: phone, type_address : type})
        setDisplayAddress(true)
        setReadFields(true)
      }else{
        toast.error('No hay cliente seleccionado para este pedido')
      }
    }else{
      setDataForm({...dataForm, address1_dispatch: '',address2_dispatch: '', phone_dispatch: '', type_address : type})
      setDisplayAddress(false)
      setReadFields(false)
    }
  }

  const clearForm = () => {
    setDataForm({
      address1_dispatch: '',
      address2_dispatch: '',
      phone_dispatch: '',
      note_dispatch: '',
      type_address: 3
    })
  }

  return (

    <Container fluid='true'>
      {!isDispatch ? (
        <React.Fragment>
          <Row style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
            <Col sm={4} md={4} lg={4} xs={4}>
              <Button size="sm" size="sm" onClick={() => props.handleChangeView(1)}>Volver a la Sección 1</Button>
            </Col>
            <Col sm={4} md={4} lg={4} xs={4}>
              <h3 className="text-center font-title">Carrito N° {props.sale.idCartSelected + 1}</h3>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={4} md={4} lg={4} xs={4}  style={{borderRadius:'15px',boxShadow:'5px 5px 5px lightgray'}}>
              { props.showIndexCart() }
              <hr/>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <h4 className="font-title">Neto: {props.sale.rooms[props.sale.idCartSelected].totales.neto}</h4>
                  <h4 className="font-title">Tax: {props.sale.rooms[props.sale.idCartSelected].totales.tax}</h4>
                  <h4 className="font-title">Total: {props.sale.rooms[props.sale.idCartSelected].totales.total}</h4>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <Button size="sm" variant="secondary"  type="button" block="true" onClick={() => setOpenModalDiscountTotal(true) }>+&nbsp;Descuento del&nbsp;<FaShoppingCart/></Button>
                  <br/>
                  { showDiscountTotal('discount') }
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Button size="sm" size="sm" variant="secondary"  type="button" block="true" onClick={() => setOpenModalRechargeTotal(true) }>+&nbsp;Recargo del&nbsp;<FaShoppingCart/></Button>
                  <br/>
                  { showDiscountTotal('recharge') }
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <DropdownButton size="sm" id={'cart_button_quantity'} title="Opciones del Carrito"  block="true" variant="primary" className="dropdown_block" drop={'up'}>
                    <Dropdown.Item onClick={() => props.handleChangeView(1)}>Volver a la Sección 1</Dropdown.Item>
                    {props.sale.rooms.map((v,i) => (
                      <Dropdown.Item onClick={ () => props.changeCartId(i) } key={i}>Carrito N° { i + 1 }</Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Button size="sm" variant="secondary" block={true} onClick={() => setIsDispatch(true)} type="button">Con Despacho</Button>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Button size="sm" className="text-white" size="sm" block="true" variant="danger" onClick={ () => props.handleChangeView(3) } style={{color:'black'}}>Avanzar al Pago</Button>
                </Col>
              </Row>
            </Col>
            <Col sm={8} md={8} lg={8} xs={8}  style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <h3 className="font-title text-center">Productos</h3>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} style={{overflow:'auto' , height:'500px', maxHeight:'500px'}}>
                  {props.sale.rooms[props.sale.idCartSelected].carts.registered.map((registeredProduct,indexRegisteredProduct) => {
                    return(
                      <CardProductSale
                        product={registeredProduct}
                        key={indexRegisteredProduct}
                        isRegistered={true}
                        handleModalDescription={handleModalDescription}
                        handleModalRecharge={handleModalRechage}
                        handleModalDiscount={handleModalDiscount}
                        configStore={props.configStore}
                        config={props.config}
                        removeProduct={props.removeProduct}
                        />)

                      })}

                      { props.sale.rooms[props.sale.idCartSelected].carts.not_registered.map((notRegisteredProduct, indexNotRegisteredProduct) => (

                        <CardProductSale product={notRegisteredProduct}
                          key={indexNotRegisteredProduct}
                          isRegistered={false}
                          handleModalDescription={handleModalDescription}
                          handleModalRecharge={handleModalRechage}
                          handleModalDiscount={handleModalDiscount}
                          configStore={props.configStore}
                          config={props.config}
                          removeProduct={props.removeProduct}
                          />
                      ))}
                    </Col>
                  </Row>
                </Col>
            </Row>
          </React.Fragment>
      ) : (
        <React.Fragment>
          <Row style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray', paddingRight: '10px', paddingLeft: '10px'}}>
            <Col sm={4} md={4} lg={4} xs={4}>
              <Button size="sm" variant="primary" onClick={() => props.handleChangeView(1)}>Volver a la Sección 1</Button>
            </Col>
            <Col sm={4} md={4} lg={4} xs={4}>
              <h3 className="text-center font-title">Carrito N° {props.sale.idCartSelected + 1}</h3>
            </Col>
            <Col sm={4} md={4} lg={4} xs={4} className="text-right">
              <Button size="sm" variant="primary" onClick={() => setIsDispatch(false)}>Detalles del carrito</Button>
            </Col>
          </Row>
          <Row style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray', paddingTop: '20px', paddingBottom: '20px'}}>
            <Col sm={12} md={12} lg={12}>
              <Row>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="danger" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(1)}>Usar Datos del Cliente</Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="danger" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(2)}>Usar datos del cliente pero con otra dirección</Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="danger" block={true} type="button" size="sm" onClick={() => handleAddressDispatch(3)}>Ingresar Datos</Button>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Form onSubmit={onSubmitDispatch} noValidate validated={validated}>
                    <Row>
                      <InputField
                        type="text"
                        name="address1_dispatch"
                        required={true}
                        label="Dirección"
                        value={dataForm.address1_dispatch}
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
                        value={dataForm.phone_dispatch}
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
                        value={dataForm.note_dispatch}
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
                          value={dataForm.address2_dispatch}
                          handleChange={onChange}
                          messageErrors={[
                            'Requerido*'
                          ]}
                          cols="col-sm-4 col-md-4 col-sm-4"
                          />
                      </Row>
                    )}
                    <br/>
                    <Row className="justify-content-center">
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="primary" block={true} type="submit" size="sm">Guardar Despacho</Button>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="secondary" block={true} type="button" size="sm" onClick={() => setIsDispatch(false)}>Ver detalle del Carrito</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      )}

    <ModalDescriptionSaleProduct
      isShow={openModalDescription}
      onHide={() => setOpenModalDescription(!openModalDescription)}
      returnDescriptionValue={catchDescriptionProduct}
      product={productDescription}
    />
    <ModalDiscountProduct
      isShow={openModalDiscount}
      onHide={() => setOpenModalDiscount(!openModalDiscount) }
      handleDiscountProduct={handleDiscountProduct}
      product={productDescription}
      handleResetRechargeDiscount={resetDiscountOrRecharge}
    />
    <ModalRechargeProduct
      isShow={openModalRecharge}
      onHide={() => setOpenModalRecharge(!openModalRecharge) }
      handleRechargeProduct={handleRechargeProduct}
      product={productDescription}
      handleResetRechargeDiscount={resetDiscountOrRecharge}
    />
    {
      /*
        Estas 2 modales son del recargo y descuento del total, solo q reeutilice el componente
      */
    }
    <ModalRechargeProduct
      isShow={openModalRechargeTotal}
      onHide={() => setOpenModalRechargeTotal(!openModalRechargeTotal) }
      handleRechargeProduct={handleRechargeTotal}
      titleTotal="Agregar Recarga al Total"
      totales={props.sale.rooms[props.sale.idCartSelected].totales}
      handleResetTotal={handleResetTotal}
    />
    <ModalDiscountProduct
      isShow={openModalDiscountTotal}
      onHide={() => setOpenModalDiscountTotal(!openModalDiscountTotal) }
      handleDiscountProduct={handleDiscountTotal}
      titleTotal="Agregar Descuento al Total"
      totales={props.sale.rooms[props.sale.idCartSelected].totales}
      handleResetTotal={handleResetTotal}
    />
    </Container>
  )
}


SaleSecondPartPage.propTypes = {
  sale: PropTypes.object.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setRecharge: PropTypes.func.isRequired,
  setDiscount: PropTypes.func.isRequired,
  configStore: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  setRechargeTotal: PropTypes.func.isRequired,
  setDiscountTotal: PropTypes.func.isRequired,
  changeCartId: PropTypes.func.isRequired,
  showIndexCart: PropTypes.func.isRequired,
  resetDiscountRecharge: PropTypes.func.isRequired,
  handleResetTotal: PropTypes.func.isRequired,
}

export default SaleSecondPartPage
