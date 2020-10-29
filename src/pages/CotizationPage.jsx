import React, { useState, useEffect, useMemo } from 'react'
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
import { FaSearch,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
import Table from 'components/Table'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import FormClientModal from 'components/modals/FormClientModal'
import ModalCotizacionProduct from 'components/modals/ModalCotizacionProduct'
import ModalGastosCotizacion from 'components/modals/ModalGastosCotizacion'
import { showPriceWithDecimals } from 'utils/functions'
import * as moment from 'moment-timezone'
import InputField from 'components/input/InputComponent'

import { ColumnsCotization, GastosCotizacion } from 'utils/columns/cotization'
import ModalClientCotizacion from 'components/modals/ModalClientCotizacion'
import ModalContacts from 'components/modals/ModalContacts'
import ModalSeller from 'components/modals/ModalSeller'
import styled from 'styled-components'
import layoutHelpers from 'shared/layouts/helpers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TableProductsCotization from 'components/TableProductsCotization'
import { connect } from 'react-redux'

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
    width: 100%;
    padding: 5px;
  }

  .div_overflow{
    max-height: 400px;
    overflow-y: auto;
  }
`
let count = 0
const CotizationPage = (props) => {

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
  const [cotizationData, setCotizationData] = useState({
    business_name_transmitter: '',
    rut_transmitter: '',
    address_transmitter: '',
    country_transmitter: '',
    email_transmitter: '',
    phone_transmitter: '',
    comment: '',
    date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type_api: true,
    rut_client: '',
    business_name_client: '',
    address_client: '',
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
  })
  const [displayModals,setDisplayModals] = useState(false)

  useEffect(() => {
    count++
    if(localStorage.getItem('configStore') === "null"){
      toast.error('Debe hacer su configuración de tienda primero')
      setTimeout(function () {
        props.history.replace('/config/config_store')
      }, 1500);
    }else{
      let config = JSON.parse(localStorage.getItem('configStore'))
      if(props.match.params.id){
        if(count > 1 && props.id_branch_office !== cotizationData.id_branch_office){
          toast.error('Esta cotización no pertenece a esta sucursal')
          setTimeout(function () {
            props.history.replace('/quotitation/search_quotitation')
          }, 1500);
        }else{
          fetchClients()
          fetchProducts()
          fetchDataUpdate()
        }
      }else{
        fetchClients()
        fetchProducts()
        setTimeout(function () {
          setCotizationData(oldData => {
            let test = Object.assign({},oldData,{
              business_name_transmitter: config.name_store,
              rut_transmitter: config.rut,
              address_transmitter: config.address,
              country_transmitter: config.pais.nombre,
              email_transmitter: config.email,
              phone_transmitter: config.phone
            })
            return test
          })
        }, 1000);
        get_ref()
      }
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

  useMemo(() => {

    if(GastosCotizacion.length > 2){
      GastosCotizacion.pop()
    }

    GastosCotizacion.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props.cell.row.original) }>Remover</Button>
        )
      }
    })

  },[props.id_branch_office])

  const clearData = () => {
    setDetailProducts([])
    setGastosDetail([])
    setClientDetail({})
    setResetValueClient(true)
    setCotizationData(oldData => {
      return {
        comment: '',
        date_issue : moment().tz('America/Santiago').format('YYYY-MM-DD'),
        date_expiration : moment().tz('America/Santiago').format('YYYY-MM-DD'),
      }
    })
    setTimeout(() => {
      setResetValueClient(false)
    },300)
  }

  const fetchDataUpdate = () => {
    axios.get(API_URL+'cotizacion/'+props.match.params.id).then(result => {
      setGastosDetail(result.data.gastos)
      setDetailProducts(result.data.products)

      setCotizationData(oldData => {
        return {
          business_name_transmitter: result.data.business_name_transmitter,
          rut_transmitter: result.data.rut_transmitter,
          address_transmitter: result.data.address_transmitter,
          country_transmitter: result.data.country_transmitter,
          email_transmitter: result.data.email_transmitter,
          phone_transmitter: result.data.phone_transmitter,
          comment: result.data.comment,
          date_issue: moment(result.data.date_issue).tz('America/Santiago').format('YYYY-MM-DD'),
          date_expiration: moment(result.data.date_expiration).tz('America/Santiago').format('YYYY-MM-DD'),
          type_api: result.data.type_api,
          rut_client: result.data.rut_client,
          business_name_client: result.data.business_name_client,
          address_client: result.data.address_client,
          name_contact: result.data.name_contact,
          phone_contact: result.data.phone_contact,
          email_contact: result.data.email_contact,
          name_seller: result.data.name_seller,
          phone_seller: result.data.phone_seller,
          email_seller: result.data.email_seller,
          total_with_iva : result.data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
          price_list: "",
          type_effect: result.data.type_effect,
          status: result.data.status,
          ref: result.data.ref,
          id_branch_office: result.data.id_branch_office
        }
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

  const goToFacturation = () => {
      props.history.replace('/facturation/dashboard')
  }

  const submitData = type => {

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: [...detailProducts],
      gastos: [...gastosDetail],
      status: type,
    }
    setDisableButton(true)
    if(props.match.params.id){
      axios.put(API_URL+'cotizacion/'+props.match.params.id,object_post).then(result => {
        toast.success('Cotización modificada con éxito')
        setDisableButton(false)
        clearData()
        if(type === 4){
          setTimeout(function () {
            goToFacturation()
          }, 1300);
        }else{
          setTimeout(function () {
            goToDashboard()
          }, 1300);
        }
      }).catch(err => {

        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'cotizacion',object_post).then(result => {
        setDisableButton(false)
        toast.success('Cotización guardada con éxito')
        clearData()
        if(type === 4){
          goToFacturation()
        }else{
          setTimeout(function () {
            props.history.replace('/quotitation/search_quotitation')
          }, 1500);
        }
      }).catch(err => {

        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }

  }

  const copyLinkOfCotizacion = () => {

    navigator.clipboard.writeText("http://localhost:3000/quotitation/create_quotitation").then(function() {
      toast.success('Url Copiada y Guardando...')
      submitData(2)
    }, function() {
      console.log('error')
    });

  }

  const displayTotalProduct = () => {
    let total = 0

    detailProducts.forEach((item, i) => {

      let item1 = Object.assign({},item)

      if(item1.is_neto){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        total+= parseFloat(item1.price) * item1.quantity
      }else{
        if(cotizationData.total_with_iva){
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          total+= parseFloat(item1.price) * item1.quantity
        }else{
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = parseFloat( (item1.price * props.configStore.tax) / 100) + parseFloat(item1.price) // linea para sumar el iva
          total+= parseFloat(item1.price) * item1.quantity
        }
      }
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

  const handleClientSubmit = data => {
    // funcion para manejar el envio de correos a los clientes con la cotización
    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: Object.assign({},detailProducts),
      gastos: Object.assign({},gastosDetail),
      client: Object.assign({},clientDetail),
      client_mail: data,
      status: 3,
    }
    setDisableButton(true)
    if(props.match.params.id){
      axios.put(API_URL+'cotizacion/'+props.match.params.id,object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setOpenModalClientMail(false)
        setDisableButton(false)
        clearData()
        goToDashboard()
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'cotizacion',object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setOpenModalClientMail(false)
        setDisableButton(false)
        clearData()
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const onChange = e => {
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect"){
      let val = e.target.value === "false" ? false : true
      setCotizationData({...cotizationData, [e.target.name] : val})
    }else{
      setCotizationData({...cotizationData, [e.target.name] : e.target.value})
    }
  }

  const get_ref = () => {
    axios.get(API_URL+'cotizacion_get_ref').then(result => {
      setCotizationData({...cotizationData, ref: result.data.ref})
    }).catch(err => {
      if(err.response){
       toast.error(err.response.data.message)
      }else{
       console.log(err);
       toast.error('Error, contacte con soporte')
      }
    })
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

  const handleResetValueClient = () => {
    setResetValueClient(!resetValueClient)
  }

  const handleModalContacts = () => {
    setIsShowModalContacts(!isShowModalContacts)
  }

  const handleModalSeller = () => {
    setIsShowModalSeller(!isShowModalSeller)
  }

  const handleSelectClient = data => {
    let data_document = data.split('/')[1]
    let client = clients.find(v => v.data_document === data_document)
    setCotizationData({...cotizationData, rut_client : client.data_document, business_name_client: client.name_client, address_client: client.address})
    setClientDetail(client)
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

    setDetailProducts([...detailProducts, product])
    setIsShowModalProduct(false)
  }

  const removeCLient = () => {
    setClientDetail({})
    handleResetValueClient()
    setCotizationData({...cotizationData, rut_client : '', business_name_client: '', address_client: ''})
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

  const saveCotizacion = type => {
    //
    if(type === 1 && !!clientDetail){
      toast.error('Debe seleccionar al menos 1 cliente')
      return false
    }
    submitData(type)
  }

  const searchClientByApiFacturacion = () =>{
     let val = rutFacturacionClientSearch
     toast.info('Buscando Receptor, espere por favor')
     axios.get(API_URL+'search_receptor/'+val.split('-')[0]+'/'+val.split('-')[1]).then(result => {
      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          rut_client : result.data.rut,
          business_name_client: result.data.razon_social,
          address_client: result.data.direccion_seleccionada
        })
      })
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
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

  const handleChangeRutFacturacionInput = e => {
    let val = e.target.value
    if(!val){
      setRutFacturacionClientSearch('')
    }else{
      val = val.replace(/-/g,'')
      val = val.substring(0,val.length -1) +"-"+val.substring(val.length -1)
      setRutFacturacionClientSearch(val)
    }
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
      is_neto: type
    }])
  }

  return (
    <Styles>
      <Container fluid>
        <Form onSubmit={() => {}} noValidate validated={validated}>
          <Row>
            <Col sm={8} md={8} lg={8}>
              <h4 className="title_principal">Formulario De Cotizaciones</h4>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <InputField
               type='text'
               label={(<h5 style={{color: "rgb(153, 31, 31)"}}>Ref.Cotización</h5>)}
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
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Accordion defaultActiveKey="1">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                    <b>Datos del Emisor</b> <FaUser />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <InputField
                         type='text'
                         label='Razón Social'
                         name='business_name_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.business_name_transmitter}
                         handleChange={onChange}
                        />
                        <InputField
                         type='text'
                         label='Rut'
                         name='rut_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.rut_transmitter}
                         handleChange={onChange}
                        />
                        <InputField
                         type='text'
                         label='Direccion'
                         name='address_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.address_transmitter}
                         handleChange={onChange}
                        />
                      </Row>
                      <Row>
                        <InputField
                         type='text'
                         label='País'
                         name='country_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.country_transmitter}
                         handleChange={onChange}
                        />
                        <InputField
                         type='email'
                         label='Email'
                         name='email_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.email_transmitter}
                         handleChange={onChange}
                        />
                        <InputField
                         type='text'
                         label='Fono'
                         name='phone_transmitter'
                         required={true}
                         messageErrors={[
                         'Requerido*'
                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.phone_transmitter}
                         handleChange={onChange}
                        />
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1" className="header_card">
                    <b>Datos para la Emisión</b> <FaUser />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Row>
                        <Col sm={4} md={4} lg={4}>
                          <Row>
                            <Col sm={12} md={12} lg={12}>
                              <h5 className="title_principal">Api a utilizar</h5>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                              <Form.Group>
                                <Form.Check
                                  name="type_api"
                                  type={'radio'}
                                  id={`radio-2`}
                                  label={`Sii`}
                                  value={true}
                                  checked={cotizationData.type_api}
                                  onChange={onChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                              <Form.Group>
                                <Form.Check
                                  name="type_api"
                                  type={'radio'}
                                  id={`radio-1`}
                                  label={`Aidy`}
                                  value={false}
                                  checked={!cotizationData.type_api}
                                  onChange={onChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        {cotizationData.type_api ? (
                          <Col sm={4} md={4} lg={4}>
                            <Form.Label className="fontBold">Rut</Form.Label>
                            <Form.Group className={"divContainerFlex"}>
                              <Form.Control
                                style={{flexGrow:2}}
                                type='text'
                                label='Rut'
                                id="rut_client_facturacion"
                                name='rut_client_facturacion_search'
                                required={false}
                                placeholder="rut del cliente"
                                cols='col-md-12 col-lg-12 col-sm-12'
                                className="form-control-sm"
                                onChange={handleChangeRutFacturacionInput}
                                value={rutFacturacionClientSearch}
                              />
                              <Button variant="secondary" size="sm" onClick={searchClientByApiFacturacion}><FaSearch /></Button>
                            </Form.Group>
                          </Col>
                        ) : (
                          <Col sm={4} md={4} lg={4}>
                            <label>Rut</label>
                            <AutoCompleteClientComponent
                              items={clients}
                              returnValue={handleSelectClient}
                              handleResetValueClient={handleResetValueClient}
                              resetValue={resetValueClient}
                              />
                            <br/>
                            {Object.keys(clientDetail).length > 0 ? (
                              <Row>
                                <Col sm={12} md={12} lg={12} className="text-center">
                                  <Button size="sm" size="sm" variant="danger text-center" onClick={removeCLient}><FaTrashAlt /></Button>
                                </Col>
                              </Row>
                            ) : ''}
                          </Col>
                        )}
                        <Col sm={4} md={4} lg={4}>
                          <br/>
                          <Button size="sm" size="sm" variant="danger" block={true} onClick={() => setIsShowModalClient(true)}>Crear Cliente <FaPlusCircle /></Button>
                        </Col>
                      </Row>
                      <Row>
                        <InputField
                         type='text'
                         label='Rut'
                         name='rut_client'
                         required={true}
                         messageErrors={[

                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.rut_client}
                         handleChange={onChange}
                        />
                       <InputField
                          type='text'
                          label='Razón Social'
                          name='business_name_client'
                          required={true}
                          messageErrors={[
                          'Requerido*'
                          ]}
                          cols='col-md-4 col-lg-4 col-sm-4'
                          value={cotizationData.business_name_client}
                          handleChange={onChange}
                        />
                        <InputField
                         type='text'
                         label='Direccion'
                         name='address_client'
                         required={true}
                         messageErrors={[

                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.address_client}
                         handleChange={onChange}
                        />
                      </Row>
                      <Row style={{borderBottom: '1px solid rgb(229, 227, 231)'}}>
                        <Col sm={8} md={8} lg={8}>
                          <h4 className="title_principal">Contactos Asignados al Receptor</h4>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                          <Button variant="secondary" block={true} size="sm" type="button" onClick={handleModalContacts}>Contactos <FaUsers /> <FaPlusCircle /></Button>
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        <InputField
                         type='text'
                         label='Nombre Contacto'
                         name='name_contact'
                         required={false}
                         messageErrors={[

                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.name_contact}
                         handleChange={onChange}
                        />
                        <InputField
                         type='text'
                         label='Fono'
                         name='phone_contact'
                         required={false}
                         messageErrors={[

                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.phone_contact}
                         handleChange={onChange}
                        />
                        <InputField
                         type='email'
                         label='Email'
                         name='email_contact'
                         required={false}
                         messageErrors={[

                         ]}
                         cols='col-md-4 col-lg-4 col-sm-4'
                         value={cotizationData.email_contact}
                         handleChange={onChange}
                        />
                      </Row>
                      <Row style={{borderBottom: '1px solid rgb(229, 227, 231)'}}>
                        <Col sm={8} md={8} lg={8}>
                          <h4 className="title_principal">Vendedor Asignado</h4>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                          <Button variant="secondary" block={true} size="sm" type="button" onClick={handleModalSeller}>Vendedores <FaUsers /> <FaPlusCircle /></Button>
                        </Col>
                      </Row>
                      <br/>
                        <Row>
                          <InputField
                           type='text'
                           label='Nombre Vendedor'
                           name='name_seller'
                           required={false}
                           messageErrors={[

                           ]}
                           cols='col-md-4 col-lg-4 col-sm-4'
                           value={cotizationData.name_seller}
                           handleChange={onChange}
                          />
                          <InputField
                           type='text'
                           label='Fono Vendedor'
                           name='phone_seller'
                           required={false}
                           messageErrors={[

                           ]}
                           cols='col-md-4 col-lg-4 col-sm-4'
                           value={cotizationData.phone_seller}
                           handleChange={onChange}
                          />
                          <InputField
                           type='email'
                           label='Email Vendedor'
                           name='email_seller'
                           required={false}
                           messageErrors={[

                           ]}
                           cols='col-md-4 col-lg-4 col-sm-4'
                           value={cotizationData.email_seller}
                           handleChange={onChange}
                          />
                        </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <br/><br/>
          {/* tabla editable de los productos de las cotizaciones */}
          <Row className="">
            <Col sm={12} md={12} lg={12}>
              <Row className="">
                <Col sm={12} md={12} lg={12} xs={12}>
                  <h4 className="title_principal text-center">Tabla de Productos</h4>
                </Col>
              </Row>
              <br/>
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
                      required={true}
                      messageErrors={[
                        'Requerido*'
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
                  <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Producto a la Cotización</Tooltip>}>
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
              <Table data={gastosDetail} columns={GastosCotizacion} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={1} md={1} lg={1}>
              <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Agregar Gastos a la Cotización</Tooltip>}>
                <div className="button-add">
                  <Button size="sm" variant="danger" block={true} onClick={() => setIsShowModalGastos(true)}><FaPlusCircle /></Button>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
          <br/>
          <Row>
            <InputField
              type='date'
              label='Fecha de Emisión'
              name='date_issue'
              required={true}
              messageErrors={[
                'Requerido*'
              ]}
              cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
              value={cotizationData.date_issue}
              handleChange={onChange}
              />
            <InputField
              type='date'
              label='Fecha de Vencimiento'
              name='date_expiration'
              required={true}
              messageErrors={[
                'Requerido*'
              ]}
              cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
              value={cotizationData.date_expiration}
              handleChange={onChange}
            />
            <Col sm={4} md={4} lg={4}>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <b>Tipo Venta</b>
                </Col>
              </Row>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <Form.Group>
                    <Form.Check
                      name="type_effect"
                      type={'radio'}
                      id={`radio-5`}
                      label={`Afecta`}
                      value={true}
                      checked={cotizationData.type_effect}
                      onChange={onChange}
                      />
                  </Form.Group>
                </Col>
                <Col sm={6} md={6} lg={6} className="text-right">
                  <Form.Group>
                    <Form.Check
                      name="type_effect"
                      type={'radio'}
                      id={`radio-6`}
                      label={`Excento`}
                      value={false}
                      checked={!cotizationData.type_effect}
                      onChange={onChange}
                      />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <label htmlFor="">Comentario de la cotización (Opcional)</label>
              <textarea rows={3} name="comment" className="form-control" onChange={onChange} value={cotizationData.comment} />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h3 className="text-center title_principal">Resumen y Totales</h3>
              <br/>
              <table className="table table-bordered">
                <thead>
                  {
                    cotizationData.total_with_iva ? (
                      <tr>
                        <th className="text-center">Neto(Productos)</th>
                        <th className="text-center">Iva</th>
                        <th className="text-center">Gastos</th>
                        <th className="text-center">Balance Total</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="text-center">Neto(Productos)</th>
                        <th className="text-center">Gastos</th>
                        <th className="text-center">Balance Total</th>
                      </tr>
                    )
                  }
                </thead>
                <tbody className="text-center">
                  {
                    cotizationData.total_with_iva ? (
                      <tr>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalIva())}</td>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(1)}>{disableButtons ? 'Guardando...' : 'Guardar y Enviar por Mail'} <FaMailBulk /></Button>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(4)}>{disableButtons ? 'Guardando...' : 'Guardar y Facturar'} <MdPrint /></Button>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(2)}>{disableButtons ? 'Guardando...' : 'Guardar'} <FaLocationArrow /></Button>
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col sm={3} md={3} lg={3}>
              <DropdownButton size="sm" id={'drop'} title={disableButtons ? 'Guardando' : "Compartir"}  className="dropdown_block" disabled={disableButtons} variant="secondary">
                <Dropdown.Item onClick={() => setOpenModalClientMail(true) }>Enviar por Mail</Dropdown.Item>
                <Dropdown.Item onClick={ copyLinkOfCotizacion } >Copiar Link</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Button variant="danger" size="sm" block={true} type="button" onClick={goToDashboard}>Volver a la Tabla</Button>
            </Col>
          </Row>
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
              <ModalClientCotizacion
                clients={clients}
                isShow={openModalClientMail}
                onHide={() => setOpenModalClientMail(false)}
                handleClientSubmit={handleClientSubmit}
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
            </React.Fragment>
          ) : ''}
        </Form>
      </Container>
    </Styles>
  )
}

CotizationPage.defaultProps = {
  configStore : JSON.parse(localStorage.getItem('configStore')),
  configGeneral: JSON.parse(localStorage.getItem('configGeneral'))
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

CotizationPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(CotizationPage)
