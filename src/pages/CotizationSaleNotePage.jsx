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
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'

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

const CotizationSaleNotePage = (props) => {

  const [clients,setClients] = useState([])
  const [clientDetail,setClientDetail] = useState({})
  const [detailProducts, setDetailProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalGastos, setIsShowModalGastos] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)
  const [products,setProducts] = useState([])
  const [gastosDetail,setGastosDetail] = useState([])
  const [openModalClientMail,setOpenModalClientMail] = useState(false)
  const [disableButtons,setDisableButton] = useState(false)
  const [isShowModalContacts,setIsShowModalContacts] = useState(false)
  const [isShowModalSeller,setIsShowModalSeller] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState({
    business_name_transmitter: '',
    rut_transmitter: '',
    address_transmitter: '',
    spin_transmitter: '',
    city_transmitter: '',
    email_transmitter: '',
    phone_transmitter: '',
    comment: '',
    date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type_api: true,
    rut_client: '',
    business_name_client: '',
    address_client: '',
    actividad_economica_client: '',
    city_client: '',
    name_contact: '',
    phone_contact: '',
    email_contact: '',
    name_seller: '',
    phone_seller: '',
    email_seller: '',
    total_with_iva : true , // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
    price_list: "",
    type_effect: true,
    status: 1,
    ref: '',
    days_expiration: '',
    way_of_payment: '',
    discount_global: '',
    date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type_invoicing: 3,
    type : 2,
    comuna_client: '',
    city_client: '',
    spin_client: '',
    actividad_economica_client: '',
    actividad_economica_transmitter: '',
    comuna_transmitter: '',
    address_client_array: [],
    address_transmitter_array : [],
    actividad_economica_transmitter_array: [],
    actividad_economica_client_array: [],
    spin_client_array : [],
    spin_transmitter_array: [],
    type_sale_transmitter_array: [],
    type_sale_transmitter: '',
    type_buy_client_array: [],
    type_buy_client : '',
    facturaId: '',
    token : '',
    searchReceptorDefault : false
  })
  const [displayModals,setDisplayModals] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if(localStorage.getItem('configStore') === "null"){
      toast.error('Debe hacer su configuración de tienda primero')
      setTimeout(function () {
        props.history.replace('/config/config_store')
      }, 1500);
    }else{
      count++
      if(count > 1 && props.id_branch_office !== cotizationData.id_branch_office){
        toast.error('Esta cotización no pertenece a esta sucursal')
        setTimeout(function () {
          props.history.replace('/quotitation/search_quotitation')
        }, 1500);
      }else{
        let config = JSON.parse(localStorage.getItem('configStore'))
        fetchClients()
        fetchProducts()
        fetchDataUpdate()
        setDisplayModals(true)
      }
    }
  },[props.id_branch_office])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () => {
      layoutHelpers.toggleCollapsed()
      count = 0
    }
  },[])


  const clearData = () => {
    setDetailProducts([])
    setGastosDetail([])
    setClientDetail({})

    setCotizationData(oldData => {
      return {
        comment: '',
        date_issue_invoice : moment().tz('America/Santiago').format('YYYY-MM-DD'),
        date_expiration : moment().tz('America/Santiago').format('YYYY-MM-DD'),
      }
    })
    setTimeout(() => {

    },300)
  }

  const fetchDataUpdate = () => {
    axios.get(API_URL+'cotizacion/'+props.match.params.id).then(result => {
      setGastosDetail(result.data.gastos)
      setDetailProducts(result.data.products)

      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          business_name_transmitter: result.data.business_name_transmitter,
          rut_transmitter: result.data.rut_transmitter,
          address_transmitter: result.data.address_transmitter,
          country_transmitter: result.data.country_transmitter,
          email_transmitter: result.data.email_transmitter,
          phone_transmitter: result.data.phone_transmitter,
          actividad_economica_transmitter: result.data.actividad_economica_transmitter,
          city_transmitter : result.data.city_transmitter,
          comment: result.data.comment,
          date_issue_invoice: result.data.date_issue_invoice ? moment(result.data.date_issue_invoice).tz('America/Santiago').format('YYYY-MM-DD') : moment().tz('America/Santiago').format('YYYY-MM-DD'),
          type_api: result.data.type_api,
          rut_client: result.data.rut_client,
          business_name_client: result.data.business_name_client,
          address_client: result.data.address_client,
          actividad_economica_client: result.data.actividad_economica_client,
          city_client : result.data.city_client,
          name_contact: result.data.name_contact,
          phone_contact: result.data.phone_contact,
          email_contact: result.data.email_contact,
          name_seller: result.data.name_seller,
          phone_seller: result.data.phone_seller,
          email_seller: result.data.email_seller,
          total_with_iva : result.data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
          price_list: "",
          status: result.data.status,
          ref: result.data.ref,
          way_of_payment: result.data.way_of_payment ? result.data.way_of_payment : 1,
          discount_global: result.data.discount_global,
          days_expiration: result.data.days_expiration,
          id_branch_office : result.data.id_branch_office,
          comuna_client: result.data.comuna_client,
          city_client: result.data.city_client,
          spin_client: result.data.spin_client,
          comuna_transmitter: result.data.comuna_transmitter,
          type_buy_client: result.data.type_buy_client,
          type_sale_transmitter: result.data.type_sale_transmitter,
        })
      })

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToDashboard = () => {
      props.history.replace('/quotitation/search_quotitation')
  }


  const displayTotalDiscount = () => {
    let total = 0

    detailProducts.forEach((item, i) => {

      let item1 = Object.assign({},item)
      let value = 0
      if(item1.is_neto){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        value  = cotizationData.discount_global ? ((item1.price * cotizationData.discount_global) / 100) : 0
      }else{
        if(cotizationData.total_with_iva){

          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          value = cotizationData.discount_global ?  ((item1.price * cotizationData.discount_global) / 100) : 0
        }else{
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          value = cotizationData.discount_global ? ((item1.price * cotizationData.discount_global) / 100) : 0
        }
      }
      total+= value * item1.quantity
    })
    return total
  }

  const displayTotalProduct = () => {
    let total = 0

    detailProducts.forEach((item, i) => {

      let item1 = Object.assign({},item)

      if(item1.is_neto){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        item1.price = cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * cotizationData.discount_global) / 100) : item1.price
      }else{
        if(cotizationData.total_with_iva){
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * cotizationData.discount_global) / 100) : item1.price
        }else{
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * cotizationData.discount_global) / 100) : item1.price
          item1.price = parseFloat( (item1.price * props.configStore.tax) / 100) + parseFloat(item1.price) // linea para sumar el iva
        }
      }
      total+= parseFloat(item1.price) * item1.quantity
    })
    return total
  }

  const displayTotalIva = () => {
    let total = 0

    detailProducts.forEach((item, i) => {
      let item1 = Object.assign({},item)
      if(!item1.is_neto){
        if(cotizationData.total_with_iva){
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * cotizationData.discount_global) / 100) : item1.price
          total+= parseFloat(((item1.price * props.configStore.tax) / 100))
        }else{
          total+= 0
        }
      }
    })
    return total
  }

  const displayTotalGastos = () => {
    let total = 0
    gastosDetail.forEach((item, i) => {
      total += parseFloat(item.amount)
    });

    return total
  }


  const displayTotalTotal = () => {
    let total_product = displayTotalProduct()
    let total_gastos  = displayTotalGastos()
    let total_iva = 0
    if(cotizationData.total_with_iva){
      total_iva = displayTotalIva()
    }
    return (parseFloat(total_product) + parseFloat(total_iva)) - parseFloat(total_gastos)
  }

  const displayTotalBalance = () => {

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
    e.persist()
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_invoicing"){
      if(e.target.name === "type_invoicing"){
        if(cotizationData.type_invoicing !== true && cotizationData.type_invoicing !== false){
          let val = e.target.value === "false" ? false : true
          await getEmisorReceptorInvoicing(val)
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

    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error('Hay campos en el formulario que le falta por llenar')
      handleModalInvoice()
      return
    }

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: detailProducts,
      gastos: gastosDetail,
      referencias: refCotizacion,
      status: 2
    }

    setDisableButton(true)

    axios.put(API_URL+'cotizacion_facturar/'+props.match.params.id,object_post).then(result => {
      toast.success('Nota de venta realizada con éxito')
      setDisableButton(false)
      handleModalInvoice()
      clearData()
      toast.info('Generando pdf de la cotización, espere por favor...')

      axios.get(API_URL+'cotizacion_print/'+props.match.params.id+'/0').then(result => {
        window.open(API_URL+'documents/cotizacion/files_pdf/'+result.data.name)
        setTimeout( () => {
          goToDashboard()
        }, 1500);
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })

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

  const getEmisorReceptorInvoicing = async type => {
    if(type){
      //let transmitter = await axios.get(API_URL+'get_transmitter_invoice')
      setCotizationData(oldData => {
        return Object.assign({},cotizationData,{
          type_invoicing: type,
          searchReceptorDefault : true
        })
      })

    }else{
      toast.error('En construcción...')
      setTimeout(function () {
        goToDashboard()
      }, 1000);
    }

  }

  return (
    <Styles>
      <Container fluid>
        <Form ref={inputRef} onSubmit={handleSubmit} noValidate validated={validated}>
          <Row>
            <Col sm={8} md={8} lg={8}>
              <h4 className="title_principal">Formulario de notas de ventas</h4>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <InputField
               type='text'
               label={(<h5 style={{color: "rgb(153, 31, 31)"}}>Ref. Nota de Venta</h5>)}
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
                  <b>Tipo de nota de venta</b>
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
          {cotizationData.type_invoicing === true || cotizationData.type_invoicing === false ? (
            <React.Fragment>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Accordion defaultActiveKey="2">
                    <TransmitterInvoiceComponent
                      isType="sale_note"
                      cotizationData={cotizationData}
                      setCotizationData={setCotizationData}
                      onChange={onChange}
                      />
                    <ClientInvoiceComponent
                      isType="sale_note"
                      cotizationData={cotizationData}
                      setCotizationData={setCotizationData}
                      setIsShowModalClient={setIsShowModalClient}
                      handleModalSeller={handleModalSeller}
                      handleModalContacts={handleModalContacts}
                      clients={clients}
                      onChange={onChange}
                      setIsShowModalClient={setIsShowModalClient}
                      handleModalSeller={handleModalSeller}
                      />
                    <RefComponent
                      onChangeTableRef={onChangeTableRef}
                      refCotizacion={refCotizacion}
                      removeProductRef={removeProductRef}
                      addRef={addRef}
                      />
                  </Accordion>
                </Col>
              </Row>
              <br/>
              <Row className="">
                <Col sm={12} md={12} lg={12}>
                  <Row className="">
                    <Col sm={12} md={12} lg={12} xs={12}>
                      <h4 className="title_principal text-center">Tabla de Productos</h4>
                    </Col>
                  </Row>
                  <br/>
                  {/* tabla editable de los productos de las cotizaciones */}
                  <Row>
                    <Col sm={6} md={6} lg={6}>
                      <Row>
                        <Col sm={12} md={12} lg={12} className="text-center">
                          <b>Configuración para los productos</b>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col sm={4} md={4} lg={4}>
                          <Form.Group>
                            <Form.Check
                              name="total_with_iva"
                              type={'radio'}
                              id={`radio-3`}
                              label={`Con Iva`}
                              value={true}
                              checked={cotizationData.total_with_iva}
                              onChange={onChange}
                              />
                          </Form.Group>
                        </Col>
                        <Col sm={4} md={4} lg={4} className="text-right">
                          <Form.Group>
                            <Form.Check
                              name="total_with_iva"
                              type={'radio'}
                              id={`radio-4`}
                              label={`Solo totales`}
                              value={false}
                              checked={!cotizationData.total_with_iva}
                              onChange={onChange}
                              />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                      <Row>
                        <InputField
                          type='select'
                          label='Listado de Productos'
                          name='price_list'
                          required={false}
                          messageErrors={[

                          ]}
                          cols='col-md-12 col-lg-12 col-sm-12'
                          value={cotizationData.price_list}
                          handleChange={onChange}
                          >
                          <option value="">--Seleccione--</option>
                        </InputField>
                      </Row>
                    </Col>
                  </Row>
                  <TableProductsCotization setDetailProducts={setDetailProducts} detailProducts={detailProducts} isShowIva={cotizationData.total_with_iva}/>
                  <Row className="justify-content-center">
                    <Col sm={1} md={1} lg={1}>
                      <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Producto a la Factura</Tooltip>}>
                        <DropdownButton size="sm" variant="danger" id={'dropdown_product'} title={(<FaPlusCircle />)} className="button_product">
                          <Dropdown.Item onClick={() => setIsShowModalProduct(true) }>Agregar Producto desde Inventario</Dropdown.Item>
                          <Dropdown.Item onClick={() => addNewProductIrregular(true)}>Agregar producto irregular con precio neto </Dropdown.Item>
                          <Dropdown.Item onClick={() => addNewProductIrregular(false)}>Agregar producto irregular con iva</Dropdown.Item>
                        </DropdownButton>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* ======================================================= */}
              <hr/>
              <Row className="">
                <Col sm={12} md={12} lg={12} xs={12}>
                  <h4 className="title_principal text-center">Tabla de Gastos</h4>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Table data={gastosDetail} columns={[
                      {
                        Header: 'Descripción',
                        accessor: 'description'
                      },
                      {
                        Header: 'Monto',
                        accessor: 'amount',
                        Cell: props1 => {
                          return showPriceWithDecimals(props.configGeneral,props1.cell.row.original.amount)
                        }
                      },
                      {
                        Header: 'Acciones',
                        Cell: props1 => {
                          const id = props1.cell.row.original.id
                          return(
                            <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props1.cell.row.original) }>Remover</Button>
                          )
                        }
                      }
                    ]} />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={1} md={1} lg={1}>
                    <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Agregar Gastos a la Factura</Tooltip>}>
                      <Button className="button_product_base" size="sm" variant="danger" block={true} onClick={() => setIsShowModalGastos(true)}><FaPlusCircle /></Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <InputField
                    type='date'
                    label='Fecha emisión de la factura'
                    name='date_issue_invoice'
                    required={true}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={cotizationData.date_issue_invoice}
                    handleChange={onChange}
                    />
                  <InputField
                    type='number'
                    label='Dias de Expiración'
                    name='days_expiration'
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={cotizationData.days_expiration}
                    handleChange={onChange}
                    />
                  <InputField
                    type='select'
                    label='Forma de Pago'
                    name='way_of_payment'
                    required={true}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={cotizationData.way_of_payment}
                    handleChange={onChange}
                    >
                    <option value="">--Seleccione--</option>
                    <option value={"Contado"}>Contado</option>
                    <option value={"Crédito"}>Crédito</option>
                    <option value={"Sin Costo"}>Sin Costo</option>
                  </InputField>
                </Row>
                <Row>
                  <InputField
                    type='number'
                    label='Descuento Global'
                    name='discount_global'
                    required={false}
                    messageErrors={[

                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={cotizationData.discount_global}
                    handleChange={onChange}
                    />
                </Row>
                <TableTotalComponent
                  configGeneral={props.configGeneral}
                  displayTotalProduct={displayTotalProduct}
                  displayTotalIva={displayTotalIva}
                  displayTotalGastos={displayTotalGastos}
                  displayTotalDiscount={displayTotalDiscount}
                  displayTotalTotal={displayTotalTotal}
                  cotizationData={cotizationData}
                  isType={"facturacion"}
                  />
                <br/>
                <Row className="justify-content-center">
                  <Col sm={3} md={3} lg={3}>
                    <Button variant="secondary" size="sm" block={true} type="submit">Emitir y Facturar</Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button variant="danger" size="sm" block={true} type="button" onClick={goToDashboard}>Volver a la Tabla</Button>
                  </Col>
                </Row>
              </React.Fragment>
          ) : (
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
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

CotizationSaleNotePage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(CotizationSaleNotePage)