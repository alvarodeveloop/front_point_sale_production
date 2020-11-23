import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Accordion,
  Card,
  Form
} from 'react-bootstrap'
import { API_URL, FRONT_URL } from 'utils/constants'
import { FaTrash, FaSearch,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers, FaBook } from 'react-icons/fa'
import Table from 'components/Table'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import FormClientModal from 'components/modals/FormClientModal'
import ModalCotizacionProduct from 'components/modals/ModalCotizacionProduct'
import ModalGastosCotizacion from 'components/modals/ModalGastosCotizacion'
import { showPriceWithDecimals } from 'utils/functions'
import * as moment from 'moment-timezone'
import InputField from 'components/input/InputComponent'
import { connect } from 'react-redux'
import { ColumnsCotization, GastosCotizacion } from 'utils/columns/cotization'
import ModalClientCotizacion from 'components/modals/ModalClientCotizacion'
import ModalContacts from 'components/modals/ModalContacts'
import ModalSeller from 'components/modals/ModalSeller'
import styled from 'styled-components'
import layoutHelpers from 'shared/layouts/helpers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TableProductsCotization from 'components/TableProductsCotization'
import ModalInvoiceCotization from 'components/modals/ModalInvoiceCotization'
import {formatRut} from 'utils/functions'
import {OBJECT_COTIZATION} from 'utils/constants'
import InvoiceExcentasComponent from 'components/invoice/InvoiceExcentasComponent'
import InvoiceAfectaComponent from 'components/invoice/InvoiceAfectaComponent'

let DetailCotizacion = null

const Styles = styled.div`

  .divContainerFlex{
    display: flex;
    flex-direction:row;
  }

  .inputFlex{
    flex-grow:2;
    border:none;
  }

  .inputFlex:focus {
    outline: none;
  }

  .tr_cabecera{
    background-color: rgb(218,236,242);
  }

  .button_product > button{
    height: 55px;
    border-radius: 100%;
    box-shadow: 3px 3px rgb(219, 222, 215);
    width: 55px;
    padding: 5px;
  }

  .button_product_base{
    height: 55px;
    border-radius: 100%;
    box-shadow: 3px 3px rgb(219, 222, 215);
    width: 55px;
    padding: 5px;
  }

  .div_overflow{
    max-height: 400px;
    overflow-y: auto;
  }
`
let count = 0
const InvoiceCreatePage = (props) => {

  const [clients,setClients] = useState([])
  const [clientDetail,setClientDetail] = useState({})
  const [detailProducts, setDetailProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalGastos, setIsShowModalGastos] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)
  const [products,setProducts] = useState([])
  const [resetValueClient,setResetValueClient] = useState(false)
  const [gastosDetail,setGastosDetail] = useState([])
  const [openModalClientMail,setOpenModalClientMail] = useState(false)
  const [disableButtons,setDisableButton] = useState(false)
  const [isShowModalContacts,setIsShowModalContacts] = useState(false)
  const [isShowModalSeller,setIsShowModalSeller] = useState(false)
  const [rutFacturacionClientSearch, setRutFacturacionClientSearch] = useState('')
  const [validated, setValidated] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(
    Object.assign({},OBJECT_COTIZATION,{
      date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      type: 1,
      searchReceptorDefault : false,
      type_invoicing : 3
    }))
  const [displayModals,setDisplayModals] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [displayReturnButton, setDisplayReturnButton] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if(localStorage.getItem('configStore') === "null"){
      toast.error('Debe hacer su configuración de tienda primero')
      setTimeout(function () {
        props.history.replace('/config/config_store')
      }, 1500);
    }else{
      fetchClients()
      fetchProducts()
      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          business_name_transmitter: props.configStore ? props.configStore.name_store : '',
          rut_transmitter: props.configStore ? props.configStore.rut : '',
          address_transmitter: props.configStore ? props.configStore.address : '',
          country_transmitter: props.configStore ? props.configStore.pais.nombre : '',
          email_transmitter: props.configStore ? props.configStore.email : '',
          phone_transmitter: props.configStore ? props.configStore.phone : '',
          actividad_economica_transmitter: props.configStore ? props.configGeneral.actividad_economica : '',
          comuna_transmitter: props.configStore ? props.configStore.comuna : '',
          city_transmitter: props.configStore ? props.configStore.city : '',
        })
      })
      setDisplayModals(true)
    }
  },[props.id_branch_office])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () => {
      layoutHelpers.toggleCollapsed()
      count = 0
    }
  },[])

  const goToDashboard = () => {
      props.history.replace('/invoice/invoice_search')
  }

  const fetchClients = () => {
    axios.get(API_URL+'client').then(result => {
      setClients(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const fetchProducts = () => {
    axios.get(API_URL+'product').then(result => {
      setProducts(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const onChange = async e => {
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_invoicing"){

      if(e.target.name === "type_invoicing"){
        if(cotizationData.type_invoicing !== true && cotizationData.type_invoicing !== false){
          let val = e.target.value === "false" ? false : true
          setCotizationData({...cotizationData, type_invoicing : val})
        }else{
          toast.error('Error ya inicio una factura previamente')
        }
      }else{
        let val = e.target.value === "false" ? false : true
        setCotizationData({...cotizationData, [e.target.name] : val})
      }

    }else if(e.target.name === "rut_transmitter" || e.target.name === "rut_client"){
      setCotizationData({...cotizationData, [e.target.name] : formatRut(e.target.value)})
    }else{
      setCotizationData({...cotizationData, [e.target.name] : e.target.value})
    }
  }

  const handleGastoSubmit = data => {
    // funcion para manejar el submit de los gastos y agglos a la tabla de gastos
    setGastosDetail([...gastosDetail,data])
  }
  const handleHideModalClient = () => {
    setIsShowModalClient(false)
    fetchClients()
  }

  const handleHideModalProduct = () => {
    setIsShowModalProduct(false)
  }

  const handleModalContacts = () => {
    setIsShowModalContacts(!isShowModalContacts)
  }

  const handleModalSeller = () => {
    setIsShowModalSeller(!isShowModalSeller)
  }

  const handleSelectProduct = product => {
    // metodo para manejar la escogencia del producto en la modal de productos para el detalle de la cotizacion
    if(!product.quantity) product.quantity = 1
    if(!product.category){
      product.category = ""
      if(Array.isArray(product.categories)){
        product.categories.forEach((item, i) => {
          product.category+= item.name_category
        });
      }
    }
    product.id_product = product.id
    product.discount_stock = true
    setDetailProducts([...detailProducts, product])
    setIsShowModalProduct(false)
  }

  const removeItemDetail = data => {
    setDetailProducts(detail => {
      return detail.filter(v => v.name_product !== data.name_product)
    })
  }

  const removeGastoDetail = data => {
    setGastosDetail(gastos =>{
     return gastos.filter(v => v.description !== data.description)
    })
  }

  const handleSelectContact = dataContact => {
    setCotizationData(oldData => {
      return Object.assign({},oldData,{
        name_contact : dataContact.name,
        phone_contact : dataContact.phone,
        email_contact : dataContact.email
      })
    })
    setIsShowModalContacts(false)
  }

  const handleSelectSeller = dataSeller => {
    setCotizationData(oldData => {
      return Object.assign({},oldData,{
        name_seller : dataSeller.name,
        phone_seller : dataSeller.phone,
        email_seller : dataSeller.email
      })
    })
    setIsShowModalSeller(false)
  }

  const addNewProductIrregular = type => {
    setDetailProducts([...detailProducts, {
      category: '',
      name_product: '',
      description: '',
      quantity: '',
      price: '',
      discount: '',
      method_sale: '',
      total: '',
      is_neto: type,
      discount_stock: false
    }])
  }

  const onChangeTableRef = (e,i) => {
    e.persist()
    setRefCotizacion( oldData => {
      let newData = [...oldData]
      newData[i][e.target.name] = e.target.value
      return newData
    })
  }

  const removeProductRef = i => {
    let array_copy = [...refCotizacion]
    array_copy.splice(i,1)
    setRefCotizacion(array_copy)
  }

  const handleSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      toast.error('Revise los campos del formulario que hay errores en los requisitos pedidos')
      return
    }

    if(detailProducts.length < 1){
      toast.error('Debe tener al menos un producto para la facturación')
      return false
    }

    handleModalInvoice()
  }

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice)
  }

  const handleSubmitInvoice = () => {

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: detailProducts,
      gastos: gastosDetail,
      referencias: refCotizacion,
      status: 2
    }

    setDisableButton(true)

    axios.post(API_URL+'invoice',object_post).then(result => {
      toast.success('Factura realizada con éxito')

      setTimeout( () => {
        goToDashboard()
      }, 1500);

    }).catch(err => {
      setDisableButton(false)
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })

  }

  const addRef = () => {
    setRefCotizacion([...refCotizacion,{
      ind: 'ind',
      type_document: 'Hoja Entrada de Servicio',
      ref_cotizacion: cotizationData.ref,
      date_ref: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      reason_ref: 'Cotización',
      type_code: '',
      id_invoice: ''
    }])
  }

  return (
    <Styles>
      <Container fluid>
        <Form ref={inputRef} onSubmit={handleSubmit} noValidate validated={validated}>
          <Row>
            <Col sm={8} md={8} lg={8}>
              <h4 className="title_principal">Formulario de Facturaciónes</h4>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <InputField
               type='text'
               label={(<h5 style={{color: "rgb(153, 31, 31)"}}>Ref.Facturación</h5>)}
               name='id_cotizacion'
               required={true}
               messageErrors={[

               ]}
               cols='col-md-12 col-lg-12 col-sm-12'
               readonly={true}
               value={cotizationData.ref}
               handleChange={() => {}}
              />
            </Col>
          </Row>
          <hr/>
          <Row className="justify-content-center">
            <Col sm={4} md={4} lg={4}>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <b>Tipo de Factura</b>
                </Col>
              </Row>
               <Row>
                 <Col sm={6} md={6} lg={6}>
                   <Form.Group>
                     <Form.Check
                       name="type_invoicing"
                       type={'radio'}
                       id={`radio-5`}
                       label={`Afecta`}
                       value={true}
                       checked={cotizationData.type_invoicing === true}
                       required={true}
                       onChange={onChange}
                       />
                   </Form.Group>
                 </Col>
                 <Col sm={6} md={6} lg={6} className="text-right">
                   <Form.Group>
                     <Form.Check
                       name="type_invoicing"
                       type={'radio'}
                       id={`radio-6`}
                       label={`Excento`}
                       value={false}
                       required={true}
                       checked={cotizationData.type_invoicing === false}
                       onChange={onChange}
                       />
                   </Form.Group>
                 </Col>
               </Row>
            </Col>
          </Row>
          {cotizationData.type_invoicing === true ? (
            <InvoiceAfectaComponent
              setCotizationData={setCotizationData}
              cotizationData={cotizationData}
              configGeneral={props.configGeneral}
              configStore={props.configStore}
              gastosDetail={gastosDetail}
              detailProducts={detailProducts}
              setDetailProducts={setDetailProducts}
              setGastosDetail={setGastosDetail}
              setIsShowModalGastos={setIsShowModalGastos}
              setIsShowModalProduct={setIsShowModalProduct}
              addNewProductIrregular={addNewProductIrregular}
              onChange={onChange}
              setIsShowModalClient={setIsShowModalClient}
              handleModalSeller={handleModalSeller}
              handleModalContacts={handleModalContacts}
              clients={clients}
              onChangeTableRef={onChangeTableRef}
              refCotizacion={refCotizacion}
              removeProductRef={removeProductRef}
              addRef={addRef}
            />
          ) : cotizationData.type_invoicing === false ? (
            <InvoiceExcentasComponent
              setCotizationData={setCotizationData}
              cotizationData={cotizationData}
              configGeneral={props.configGeneral}
              configStore={props.configStore}
              gastosDetail={gastosDetail}
              detailProducts={detailProducts}
              setDetailProducts={setDetailProducts}
              setGastosDetail={setGastosDetail}
              setIsShowModalGastos={setIsShowModalGastos}
              setIsShowModalProduct={setIsShowModalProduct}
              addNewProductIrregular={addNewProductIrregular}
              onChange={onChange}
              setIsShowModalClient={setIsShowModalClient}
              handleModalSeller={handleModalSeller}
              handleModalContacts={handleModalContacts}
              clients={clients}
              onChangeTableRef={onChangeTableRef}
              refCotizacion={refCotizacion}
              removeProductRef={removeProductRef}
              addRef={addRef}
            />
          ) : (
            <Row className="justify-content-center">
              <Col sm={3} md={3} lg={3}>
                <Button variant="secondary" size="sm" block={true} type="button" onClick={goToDashboard}>Volver a la Tabla</Button>
              </Col>
            </Row>
          )}

          {displayModals ? (
            <React.Fragment>
              <FormClientModal
                isShow={isShowModalClient}
                onHide={handleHideModalClient}
                />
              <ModalCotizacionProduct
                isShow={isShowModalProduct}
                onHide={handleHideModalProduct}
                products={products}
                handleSelectProduct={handleSelectProduct}
                handleSelectProductNotRegistered={() => {}}
                />
              <ModalGastosCotizacion
                isShow={isShowModalGastos}
                onHide={() => setIsShowModalGastos(false)}
                handleGastoSubmit={handleGastoSubmit}
                />
              <ModalContacts
                isShow={isShowModalContacts}
                onHide={handleModalContacts}
                handleSelectContact={handleSelectContact}
                />
              <ModalSeller
                isShow={isShowModalSeller}
                onHide={handleModalSeller}
                handleSelectContact={handleSelectSeller}
              />
              <ModalInvoiceCotization
                isShow={isOpenModalInvoice}
                onHide={handleModalInvoice}
                handleSubmit={handleSubmitInvoice}
                setDetailProducts={setDetailProducts}
                products={detailProducts}
                disableButtons={disableButtons}
              />
            </React.Fragment>
          ) : ''}
        </Form>
      </Container>
    </Styles>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    configStore: state.configs.configStore,
    configGeneral: state.configs.config
  }
}

InvoiceCreatePage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(InvoiceCreatePage)
