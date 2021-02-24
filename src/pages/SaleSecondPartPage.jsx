import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import CardProductSale from 'components/CardProductSale'
import ModalDescriptionSaleProduct from 'components/modals/ModalDescriptionSaleProduct'
import ModalRechargeProduct from 'components/modals/ModalRechargeProduct'
import ModalDiscountProduct from 'components/modals/ModalDiscountProduct'
import { FaShoppingCart } from 'react-icons/fa'
import { showPriceWithDecimals } from 'utils/functions'

const SaleSecondPartPage = (props) => {

  const [isRegisteredUpdate, setIsRegisteredUpdate] = useState(false)
  const [openModalDescription, setOpenModalDescription] = useState(false)
  const [openModalRecharge, setOpenModalRecharge] = useState(false)
  const [openModalDiscount, setOpenModalDiscount] = useState(false)
  const [openModalDiscountTotal, setOpenModalDiscountTotal] = useState(false)
  const [openModalRechargeTotal, setOpenModalRechargeTotal] = useState(false)
  const [productDescription, setProductDescription] = useState({})
  const [valueRechargeTotal, setValueRechargeTotal] = useState('')
  const [valueDiscountTotal, setValueDiscountTotal] = useState('')

  const catchDescriptionProduct = description => {
    setOpenModalDescription(!openModalDescription)
    props.setDescription({
      id_product:  Object.assign({},productDescription).id,
      description: description,
      typeProduct: Object.assign({},{},{isRegister: isRegisteredUpdate}).isRegister
    })
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
            <div style={{widh: "100%"}} className="text-center">
              <Badge variant="danger" className="font-badge">
                {props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? "%" : props.config.simbolo_moneda}{props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.amount}
              </Badge>
              <br/>
              
              <span style={{fontWeight: "bold"}}>
                Tipo : { props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? 'porcentaje' : 'fijo' }
              </span>
            </div>

          )
        break;
        default:
          return 0
      }

    }else if( type === "recharge"){
      switch (props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.type) {
        case 'suma':
          return (
            <div style={{widh: "100%"}} className="text-center">
              <Badge variant="danger" className="font-badge">
              {props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? "%" : props.config.simbolo_moneda}{props.config.simbolo_moneda+props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.amount}
              </Badge>
              <br/>
              <span style={{fontWeight: "bold"}}>
                tipo : { props.sale.rooms[props.sale.idCartSelected].total_recharge_discount.percentajeFixed === "percentaje" ? 'porcentaje' : 'fijo' }
              </span>
            </div>
          )
        break;
        default:
          return 0
      }
    }
  }

  return (

    <Container fluid='true'>
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
                  <h4 className="font-title">Neto: { props.config.simbolo_moneda }{showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.neto)}</h4>
                  <h4 className="font-title">Tax: { props.config.simbolo_moneda }{showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.tax)}</h4>
                  <h4 className="font-title">Total: { props.config.simbolo_moneda }{showPriceWithDecimals(props.config,props.sale.rooms[props.sale.idCartSelected].totales.total)}</h4>
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
