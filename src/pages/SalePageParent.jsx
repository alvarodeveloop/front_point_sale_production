import React, { useState, useEffect, useRef } from 'react'
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
  Col,
  Image,
  Badge,
  Button,
  Form
} from 'react-bootstrap'
import InputFieldRef from 'components/input/InputComponentRef'
import { MdSend } from 'react-icons/md'
import {FaPlusCircle} from 'react-icons/fa'
import { showPriceWithDecimals } from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent';

let count = 0
const SalePageParent = (props) => {

  const [view,setView] = useState(1)
  const [config,setConfig] = useState({})
  const [configStore,setConfigStore] = useState({})
  const [showCashRegister, setShowCashRegister] = useState(true)
  const [showCashRegisterForm, setShowCashRegisterForm] = useState(false)
  const [cashRegisters, setCashRegisters] = useState([])
  const [cashRegisterUser,setCashRegisterUser] = useState({
    id_cash_register : '',
    nro_caja: 0,
    amount_cash_default: 0
  })
  const [validated,setValidated] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    count++
    if(count > 1){
      localStorage.removeItem('cash_register')
      props.resetCart()
      fetchConfig()
    }
  },[props.id_branch_office])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    if(props.configGeneral.is_syncronized){
      fetchConfig() 
    }else{
      toast.error("Debe sincronizar su cuenta en la configuración general para utilizar este módulo")
      setTimeout(() => {
        props.history.replace("/config/config_general"); 
      },4000)
    }
    return () => {
      props.resetCart()
      layoutHelpers.toggleCollapsed()
      count = 0
    }
  },[])

  const fetchConfig = () => {
    if(!displayLoading){
      setDisplayLoading(true);
    }
    let promises = [
      axios.get(API_URL+'config_store'),
      axios.get(API_URL+'config_general'),
      axios.get(API_URL+'cash_register_by_user')
    ];

    Promise.all(promises).then(result => {

      if(result[1].data && result[0].data){
        setConfig(result[1].data)
        setConfigStore(result[0].data)
        if(promises.length > 2){
          if(result[2].data.cashOpen){
            setShowCashRegister(false)  
          }else if(result[2].data.cash_user){
            setCashRegisterUser({
              id_cash_register : result[2].data.cash_user.id,
              amount_cash_default : result[2].data.cash_user.amount_cash_default,
              nro_caja: result[2].data.cash_user.nro_caja,
            })
            setShowCashRegister(true)
            setShowCashRegisterForm(true)
            setTimeout( () => {
              inputRef.current.focus()
            }, 300);
          }else{
            setCashRegisters(result[2].data.cash_free)
            setShowCashRegister(true)
          }
        }else{
          setShowCashRegister(false)
        }
        setDisplayLoading(false);
      }else{
        if(!result[1].data){
          toast.error('Error la empresa no ha hecho la configuración general')
          setTimeout(function () {
            props.history.replace('/config/config_general')
          }, 2000);
        }else if(!result[0].data){
          toast.error('Error, debe hacer su configuración de la tienda primero')
          setTimeout(function () {
            props.history.replace('/config/config_store')
          }, 2000);
        }
      }
    }).catch(err => {
      setDisplayLoading(false);
      props.tokenExpired(err);
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
            Total: { showPriceWithDecimals(props.configGeneral,props.sale.rooms[props.sale.idCartSelected].totales.total) }
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

  const handleChoiceCashRegister = cashData => {
    setCashRegisterUser({
      id_cash_register: cashData.id,
      amount_cash_default: cashData.amount_cash_default ? cashData.amount_cash_default : 0,
      nro_caja: cashData.nro_caja,

    })
    setShowCashRegisterForm(true)
    setTimeout(function () {
      inputRef.current.focus()
    }, 300);
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return false
    }

    let data = Object.assign({},cashRegisterUser,{
      state : true
    })

    axios.post(API_URL+'cash_register_open_close',data).then(result => {
      toast.success('Caja Abierta')
      setShowCashRegister(false)
      setShowCashRegisterForm(false)
      setCashRegisterUser({
        id_cash_register: 0,
        amount_cash_default: 0,
        nro_caja: 0
      })


    }).catch(err => {
      props.tokenExpired(err)
    })
  }

  const onChange = e => {
    setCashRegisterUser({
      ...cashRegisterUser,
      [e.target.name] : e.target.value
    })
  }
  const goToCashRegister = () => {
    props.history.replace('/cashRegister')
  }

  if(displayLoading){
    return (<LoadingComponent />)
  }
  
  return (
    <React.Fragment>
      {showCashRegister ? (
        <Container>
          {showCashRegisterForm ? (
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <h4 className="title_principal">Establezca el saldo inicial de la Caja</h4>
                  </Col>
                </Row>
                <hr/>
                <Row className="justify-content-center">
                  <Col sm={6} md={6} lg={6} className="text-center">
                    <h5 style={{color: 'rgb(180, 55, 33)'}}>CAJA N° {cashRegisterUser.nro_caja}</h5>
                    <Image src={require('../assets/img/caja_registradora.jpg')} style={{width: '50%'}}/>
                    <br/>
                    <Form onSubmit={onSubmit} noValidate validated={validated}>
                      <Row>
                        <InputFieldRef
                          ref={inputRef}
                         step="any"
                         type='number'
                         label='Establezca el Monto Inicial'
                         name='amount_cash_default'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-12 col-lg-12 col-sm-12'
                         value={cashRegisterUser.amount_cash_default}
                         handleChange={onChange}
                         />
                      </Row>
                      <Row>
                        <Col sm={12} md={12} lg={12}>
                          <Button variant="danger" block={true} size="sm" type="submit">Abrir Caja <MdSend/></Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12}>
                    <h4 className="title_principal">Escoja la Caja con la que trabajará</h4>
                  </Col>
                </Row>
                <hr/>
                <Row className="justify-content-center">
                  { cashRegisters.length > 0 ? (
                    <React.Fragment>
                      {cashRegisters.map((v,i) => (
                        <Col sm={3} lg={3} md={3} className="text-center" key={i}>
                          <h5 style={{color: 'rgb(180, 55, 33)'}}>CAJA N° {v.nro_caja}</h5>
                          <Image src={require('../assets/img/caja_registradora.jpg')} style={{width: '100%'}}/>
                          Estado : {v.status ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
                          <br/><br/>
                          <Button variant="primary" block={true} size="sm" onClick={() => handleChoiceCashRegister(v)}>Seleccionar Caja</Button>
                        </Col>
                      ))}
                    </React.Fragment>
                  ) : (
                    <Col sm={6} md={6} lg={6} className="text-center">
                      <Image src={require('../assets/img/denied.png')} style={{width: '30%'}}/>
                      <br/>
                      <h4 className="">No posee cajas registradoras asociadas</h4>
                      <Button variant="success" type="button" block={true} size="sm" onClick={goToCashRegister}>Agregar Caja Registradora <FaPlusCircle /></Button>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      ) : (
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
    sale: state.sale.sale,
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
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
  deleteBuyer: PropTypes.func.isRequired,
  resetDiscountRecharge: PropTypes.func.isRequired,
  handleResetTotal: PropTypes.func.isRequired,
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,mapDispatchToProps())(SalePageParent)
