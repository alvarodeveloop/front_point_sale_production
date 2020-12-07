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
import { FaTrash, FaSearch, FaMoneyBill,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers, FaBook } from 'react-icons/fa'
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
import ModalInvoiceCotization from 'components/modals/ModalInvoiceCotization'
import {formatRut} from 'utils/functions'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import GastosComponent from 'components/invoice/GastosComponent'
import TransferComponent from 'components/invoice/TransferComponent'
import {OBJECT_COTIZATION,API_FACTURACION} from 'utils/constants'
import ProductTableComponent from 'components/invoice/ProductTableComponent'

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

const CotizationGuidePage = (props) => {

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
  const [cotizationData, setCotizationData] = useState(Object.assign({},OBJECT_COTIZATION,{
    date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type: 4,
    id_branch_office: props.id_branch_office
  }))
  const [displayModals,setDisplayModals] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [displayReturnButton, setDisplayReturnButton] = useState(false)
  const [displaySection,setDisplaySection] = useState(1)
  const inputRef = useRef(null)
  const [typeTransfer,setTypeTransfer] = useState([])
  const [optionalFields,setOptionalFields] = useState({
    check_ref : false,
    check_transfer: false
  })

  useEffect(() => {
    if(!props.configStore || !props.configGeneral){
      if(!props.configStore){
        toast.error('Debe hacer su configuración de tienda o seleccionar una sucursal para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
      }else if(!props.configGeneral){
        toast.error('Debe hacer su configuración general para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
      }
    }else{
      let config_general = props.configGeneral
      if(!config_general.is_syncronized){
        toast.error('Su cuenta no esta sincronizada con el SII, complete su configuración general para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
        return
      }

      count++
      if(count > 1 && props.id_branch_office !== cotizationData.id_branch_office){
        toast.error('Esta cotización no pertenece a esta sucursal')
        setTimeout(function () {
          props.history.replace('/quotitation/search_quotitation')
        }, 1500);
      }else{
        fetchClients()
        fetchProducts()
        fetchTypeTransfer()
        fetchUpdate()
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

  const fetchUpdate = () => {
    axios.get(API_URL+'cotizacion/'+props.match.params.id).then(result => {
      setGastosDetail(result.data.gastos)
      setDetailProducts(result.data.products)
      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          type_api: result.data.type_api,
          name_contact: result.data.name_contact,
          email_contact: result.data.email_contact,
          phone_contact: result.data.phone_contact,
          name_seller: result.data.name_seller,
          phone_seller: result.data.phone_seller,
          email_seller: result.data.email_seller,
          ref: result.data.ref,
          id_branch_office : result.data.id_branch_office,
        })
      })

      if(result.data.rut_client){
        searchClientReceptor(result.data.rut_client)
      }else{
        toast.info('Ingrese el rut del receptor de la guía')
      }


    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
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


  const fetchTypeTransfer = () => {
     axios.get(API_URL+'type_transfer').then(result => {
      setTypeTransfer(result.data)
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
     })
  }
  const onChange = async e => {
    e.persist()
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect" || e.target.name === "type_invoicing"){
      let val = e.target.value === "false" ? false : true
      setCotizationData({...cotizationData, [e.target.name] : val})
    }else if(e.target.name === "rut_transmitter" || e.target.name === "rut_client" || e.target.name === "rut_client_search" || e.target.name === "rut_transfer" || e.target.name === "rut_driver"){
      setCotizationData({...cotizationData, [e.target.name] : formatRut(e.target.value)})
    }else{
      setCotizationData({...cotizationData, [e.target.name] : e.target.value})
    }
  }

  const onChangeOptionalFields = e => {
    e.persist()
    if(e.target.id === "check_ref"){
      if(e.target.checked){
        addRef()
      }else{
        setRefCotizacion([])
      }
      setOptionalFields({...optionalFields, [e.target.id] : e.target.checked})
    }else{
      if(!e.target.checked){
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
            rut_transfer : '',
            patent_transfer: '',
            rut_driver: '',
            name_driver: ''
          })
        })
      }
      setOptionalFields({...optionalFields, [e.target.id] : e.target.checked})
    }
  }

  const searchClientReceptor = (rutSearch = false) => {
    let rut_value = rutSearch ? rutSearch : cotizationData.rut_client_search

    if(rut_value){
      let rut = rut_value.split('-')[0]
      let dv  = rut_value.split('-')[1]
      toast.info('Buscando datos, espere por favor...')
      axios.get(API_URL+'search_receptor_emisor_guide/'+rut+"/"+dv).then(result => {

       setCotizationData(oldData => {
         return Object.assign({},oldData,{
           actividad_economica_transmitter_array: result.data.emisor.actvidades_economicas,
           actividad_economica_transmitter : result.data.emisor.actividad_economica_seleccionada,
           city_transmitter : result.data.emisor.ciudad_seleccionada,
           email_transmitter: result.data.emisor.correo,
           comuna_transmitter: result.data.emisor.comuna_seleccionada,
           address_transmitter:  result.data.emisor.direccion_seleccionada,
           address_transmitter_array: result.data.emisor.direcciones,
           business_name_transmitter : result.data.emisor.razon_social,
           rut_transmitter : rut+"-"+dv,

           type_transfer_trasmitter_array: API_FACTURACION ? result.data.emisor.tipos_de_traslado : result.data.emisor.tipos_de_venta,
           type_transfer_trasmitter: API_FACTURACION ? result.data.emisor.tipos_de_traslado.length > 0 ? result.data.emisor.tipos_de_traslado[0].tipo1 : result.data.emisor.tipos_de_venta.length > 0 ? result.data.emisor.tipos_de_venta[0].tipo1 : '' : result.data.emisor.tipos_de_venta.length > 0 ? result.data.emisor.tipos_de_venta[0].tipo1 : '',

           type_sale_transmitter_array: result.data.emisor.tipos_de_venta,
           type_sale_transmitter: result.data.emisor.tipos_de_venta.length > 0 ? result.data.emisor.tipos_de_venta[0].tipo1 : '',

           facturaId: API_FACTURACION ? result.data.guiaDespachoID : result.data.facturaID,
           token: result.data.token,
           spin_transmitter: result.data.emisor.giro,
           rut_client: result.data.receptor.rut+"-"+result.data.receptor.dv,
           business_name_client: result.data.receptor.razon_social,
           address_client_array: result.data.receptor.direcciones,
           address_client: result.data.receptor.direccion_seleccionada,
           comuna_client: result.data.receptor.comuna_seleccionada,
           city_client: result.data.receptor.ciudad_seleccionada,
           spin_client_array: result.data.receptor.giros,
           spin_client: result.data.receptor.giro_seccionado,
           type_buy_client_array: API_FACTURACION ? result.data.receptor.tipos_de_compra : [],
           type_buy_client: 'Tipo de compra',
           name_contact: result.data.receptor.contacto,
         })
       })

       setTimeout(function () {
         setDisplaySection(2)
       }, 500);

      }).catch(err => {
         if(err.response){
           toast.error(err.response.data.message)
         }else{
           console.log(err);
           toast.error('Error, contacte con soporte')
         }
      })
    }else{
      toast.error('Debe introducir un rut para buscar al cliente')
    }
  }

  const handleSubmit = () => {
    const form = inputRef.current
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error('Revise los campos del formulario que hay errores en los requisitos pedidos')
      return
    }

    if(detailProducts.length < 1){
      toast.error('Debe tener al menos un producto para la guía')
      return false
    }

    handleModalInvoice()
  }

  const submitData = () => {

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: [...detailProducts],
      gastos: [...gastosDetail],
      status: 4,
      referencias : [...refCotizacion],
    }


    setDisableButton(true)
    axios.put(API_URL+'cotizacion_facturar_guide/'+props.match.params.id,object_post).then(result => {
      setDisableButton(false)
      handleModalInvoice()
      toast.success('Guía guardada con éxito')

      toast.info('Generando pdf de la Guía, espere por favor...')

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

      setTimeout(function () {
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

  const get_ref = () => {
    axios.get(API_URL+'guide_get_ref').then(result => {
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

  const removeProductRef = i => {
    let array_copy = [...refCotizacion]
    array_copy.splice(i,1)
    setRefCotizacion(array_copy)
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

  const onChangeTableRef = (e,i) => {
    e.persist()
    setRefCotizacion( oldData => {
      let newData = [...oldData]
      newData[i][e.target.name] = e.target.value
      return newData
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
    product.discount_stock = true
    product.id_product = product.id
    if(product.inventary[0].inventary_cost.length){
      setGastosDetail([...gastosDetail, {description: product.inventary[0].inventary_cost[0].detail, amount: product.inventary[0].inventary_cost[0].cost, id_product: product.id}])
      setDetailProducts([...detailProducts, product])
    }else{
      setDetailProducts([...detailProducts, product])
    }
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
      is_neto: type
    }])
  }

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice)
  }

  const goToDashboard = () => {
      props.history.replace('/quotitation/search_quotitation')
  }

  return (
    <Styles>
      <Container fluid>
        <Form onSubmit={() => {}} noValidate validated={validated} ref={inputRef}>
          <Row>
            <Col sm={8} md={8} lg={8}>
              <h4 className="title_principal">Formulario De Guías</h4>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <InputField
               type='text'
               label={(<h5 style={{color: "rgb(153, 31, 31)"}}>Ref.Guía</h5>)}
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
          {displaySection == 1 ? (
            <React.Fragment>
              <Row className="justify-content-center">
                <InputField
                  type='text'
                  label='Ingrese el rut del cliente'
                  name='rut_client_search'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={cotizationData.rut_client_search}
                  handleChange={onChange}
                />
              </Row>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4}>
                  <Button type="button" size="sm" variant="danger" block={true} onClick={() => searchClientReceptor()}>Buscar <FaSearch /></Button>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Accordion>
                    <TransmitterInvoiceComponent
                      isType="guide"
                      cotizationData={cotizationData}
                      setCotizationData={setCotizationData}
                      onChange={onChange}
                      />
                    <ClientInvoiceComponent
                      isType="guide"
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
                  </Accordion>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <h5>Opcionales</h5>
                </Col>
              </Row>
              <br/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3} className="text-center">
                  <Form.Group>
                    <Form.Check type="checkbox"
                      custom
                      id={'check_ref'}
                      label={'Referencias'}
                      value={optionalFields.check_ref}
                      checked={optionalFields.check_ref}
                      onChange={onChangeOptionalFields}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3} md={3} lg={3} className="text-center">
                  <Form.Group>
                    <Form.Check type="checkbox"
                      custom
                      id={'check_transfer'}
                      label={'Transporte'}
                      value={optionalFields.check_transfer}
                      checked={optionalFields.check_transfer}
                      onChange={onChangeOptionalFields}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br/>
              {optionalFields.check_ref ? (
                <RefComponent
                  onChangeTableRef={onChangeTableRef}
                  refCotizacion={refCotizacion}
                  removeProductRef={removeProductRef}
                  addRef={addRef}
                  isNotAccordeon={true}
                  />
              ) : ''}
              <br/>
              {optionalFields.check_transfer ? (
                <TransferComponent
                  cotizationData={cotizationData}
                  onChange={onChange}
                  isNotAccordeon={true}
                  />
              ) : '' }
              <br/>
              <ProductTableComponent
                setDetailProducts={setDetailProducts}
                detailProducts={detailProducts}
                cotizationData={cotizationData}
                setIsShowModalProduct={setIsShowModalProduct}
                addNewProductIrregular={addNewProductIrregular}
                setGastosDetail={setGastosDetail}
                onChange={onChange}
              />
              {/* ======================================================= */}
              <hr/>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="4" className="header_card">
                    <b>Gastos</b> <FaMoneyBill /> ( hacer click para desplegar campos )
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <GastosComponent
                          gastosDetail={gastosDetail}
                          setGastosDetail={setGastosDetail}
                          configGeneral={props.configGeneral}
                          setIsShowModalGastos={setIsShowModalGastos}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <br/>
                <Row>
                  <InputField
                    type='date'
                    label='Fecha de Emisión'
                    name='date_issue_invoice'
                    required={true}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
                    value={cotizationData.date_issue_invoice}
                    handleChange={onChange}
                    />
                  <InputField
                    type='select'
                    label='Tipo de Traslado'
                    name='type_transfer'
                    required={true}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
                    value={cotizationData.type_transfer}
                    handleChange={onChange}
                  >
                    <option value="">--Seleccione--</option>
                    {typeTransfer.map((v,i) => (
                      <option value={v.name} key={i}>{v.name}</option>
                    ))}
                  </InputField>
                </Row>
                <TableTotalComponent
                  configGeneral={props.configGeneral}
                  gastosDetail={gastosDetail}
                  detailProducts={detailProducts}
                  configStore={props.configStore}
                  cotizationData={cotizationData}
                  isType={"cotizacion"}
                />
                <br/>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" variant="primary" block={true} size="sm" onClick={handleSubmit} disabled={disableButtons}>Guardar <FaPlusCircle /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" variant="danger" block={true} size="sm" onClick={goToDashboard} disabled={disableButtons}>Volver a la tabla</Button>
                  </Col>
                </Row>
            </React.Fragment>
          )}
          {displayModals ? (
            <React.Fragment>

              <ModalInvoiceCotization
                isShow={isOpenModalInvoice}
                onHide={handleModalInvoice}
                handleSubmit={submitData}
                setDetailProducts={setDetailProducts}
                products={detailProducts}
                disableButtons={disableButtons}
              />

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
                  {...props}
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

CotizationGuidePage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(CotizationGuidePage)
