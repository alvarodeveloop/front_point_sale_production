import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SalePage from 'pages/SalePage'
import SaleSecondPartPage from 'pages/SaleSecondPartPage'
import SaleThirdPartPage from 'pages/SaleThirdPartPage'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import layoutHelpers from 'shared/layouts/helpers'
import {
  resetCart,
  updateProduct,
  setDescription,
  setRecharge,
  setDiscount,
  setRechargeTotal,
  setDiscountTotal,
  changeCartId,
  addCart,
  addProduct,
  addProductNotRegistered,
  removeCart,
  removeProduct,
  setBuyer,
  deleteBuyer,
  resetDiscountRecharge,
  handleResetTotal
} from 'actions/cart'
import 'styles/pages/salePage.css'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'


const SalePageParent = (props) => {

  const [view,setView] = useState(1)
  const [config,setConfig] = useState({})
  const [configStore,setConfigStore] = useState({})

  useEffect(() => {

    fetchConfig()
    layoutHelpers.toggleCollapsed()
    return () => {
      props.resetCart()
      layoutHelpers.toggleCollapsed()
    }
  },[])

  const fetchConfig = () => {
    let promises = [
      axios.get(API_URL+'config_store'),
      axios.get(API_URL+'config_general')
    ]

    Promise.all(promises).then(result => {

      if(result[1].data && result[0].data){
        setConfig(result[1].data)
        setConfigStore(result[0].data)
      }else{
        if(!result[1].data){
          toast.error('Error, debe hacer su configuración general')
          props.history.replace('/config/config_general')
        }else if(!result[0].data){
          toast.error('Error, debe hacer su configuración de la tienda primero')
          props.history.replace('/config/config_store')
        }
      }
    })
  }

  const handleChangeView = viewPage => {
    setView(viewPage)
  }

  const calculateTotalProducts = () => {
    let total = 0
    props.sale.rooms[props.sale.idCartSelected].carts.registered.forEach((v,i) => {
      total+= parseInt(v.cantidad,10)
    })

    props.sale.rooms[props.sale.idCartSelected].carts.not_registered.forEach((v,i) => {
      total+= parseInt(v.cantidad,10)
    })

    return total
  }

  const showIndexCart = () => {
    return (
      <Row>
        <Col sm={6} md={6} lg={6} xs={6}>
          <br/>
          Carrito: {props.sale.idCartSelected + 1}
        </Col>
        <Col sm={6} md={6} lg={6} xs={6}>
          <br/>
          Productos: { calculateTotalProducts() }
        </Col>
      </Row>
    )
  }

  const showProductAndTotal = () => {
    return (
      <React.Fragment>
        <Row className="">
          <Col sm={6} md={6} lg={6} xs={6}>
            Productos: { calculateTotalProducts() }
          </Col>
          <Col sm={6} md={6} lg={6} xs={6}>
            Total: { props.sale.rooms[props.sale.idCartSelected].totales.total }
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={6} md={6} lg={6} xs={6}>
            Carrito: {props.sale.idCartSelected + 1}
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {view == 1 ? (
        <SalePage
          handleChangeView={handleChangeView}
          {...props}
          config={config}
          configStore={configStore}
          addCart={props.addCart}
          addProduct={props.addProduct}
          addProductNotRegistered={props.addProductNotRegistered}
          removeCart={props.removeCart}
          removeProduct={props.removeProduct}
          setBuyer={props.setBuyer}
          deleteBuyer={props.deleteBuyer}
          sale={props.sale}
          showIndexCart={showIndexCart}
          showProductAndTotal={showProductAndTotal}
        />
      ): view == 2 ? (
        <SaleSecondPartPage
          handleChangeView={handleChangeView}
          {...props}
          config={config}
          configStore={configStore}
          setDescription={props.setDescription}
          setRecharge={props.setRecharge}
          setDiscount={props.setDiscount}
          setRechargeTotal={props.setRechargeTotal}
          setDiscountTotal={props.setDiscountTotal}
          changeCartId={props.changeCartId}
          sale={props.sale}
          removeProduct={props.removeProduct}
          resetDiscountRecharge={props.resetDiscountRecharge}
          showIndexCart={showIndexCart}
          handleResetTotal={props.handleResetTotal}
        />
    ): (
      <SaleThirdPartPage
        handleChangeView={handleChangeView}
        {...props}
        config={config}
        configStore={configStore}
        changeCartId={props.changeCartId}
        sale={props.sale}
        removeCart={props.removeCart}
        showIndexCart={showIndexCart}
      />
    )}
    </React.Fragment>
  )
}

function mapDispatchToProps(){
  return {
    resetCart,
    updateProduct,
    setDescription,
    setRecharge,
    setDiscount,
    setRechargeTotal,
    setDiscountTotal,
    changeCartId,
    addCart,
    addProduct,
    addProductNotRegistered,
    removeCart,
    removeProduct,
    deleteBuyer,
    setBuyer,
    resetDiscountRecharge,
    handleResetTotal
  }
}

function mapStateToProps(state){
  return {
    sale: state.sale.sale
  }
}

SalePageParent.propTypes = {
  resetCart: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setRecharge: PropTypes.func.isRequired,
  setDiscount: PropTypes.func.isRequired,
  setRechargeTotal: PropTypes.func.isRequired,
  setDiscountTotal: PropTypes.func.isRequired,
  changeCartId: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  addProductNotRegistered: PropTypes.func.isRequired,
  removeCart: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  setBuyer: PropTypes.func.isRequired,
  daleteBuyer: PropTypes.func.isRequired,
  resetDiscountRecharge: PropTypes.func.isRequired,
  handleResetTotal: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps())(SalePageParent)
