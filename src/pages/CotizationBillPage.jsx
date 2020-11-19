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
  Form,
  Modal
} from 'react-bootstrap'
import { API_URL, FRONT_URL } from 'utils/constants'
import { FaBook, FaMoneyBill,FaTrash, FaSearch,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
import Table from 'components/Table'
import FormClientModal from 'components/modals/FormClientModal'
import ModalCotizacionProduct from 'components/modals/ModalCotizacionProduct'
import ModalGastosCotizacion from 'components/modals/ModalGastosCotizacion'
import { showPriceWithDecimals } from 'utils/functions'
import * as moment from 'moment-timezone'
import InputField from 'components/input/InputComponent'
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
import { connect } from 'react-redux'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import TableBondsBillComponent from 'components/invoice/TableBondsBillComponent'

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
let GastosCotizacion = []

const CotizationBillPage = (props) => {

  const [clients,setClients] = useState([])
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
  const [displayDataInvoice, setDisplayDataInvoice] = useState(1)
  const [requireInvoice, setRequireInvoice] = useState(false)
  const [detailBonds, setDetailBonds] = useState([])
  const [cotizationData, setCotizationData] = useState({
    business_name_transmitter: '',
    rut_transmitter: '',
    address_transmitter: '',
    spin_transmitter: '',
    city_transmitter:  '',
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
    total_with_iva : false , // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
    price_list: "",
    type_effect: true,
    status: 1,
    ref: '',
    days_expiration: '',
    way_of_payment: '',
    discount_global: '',
    date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type_invoicing: true,
    type : 3,
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
    fetchTransmitter : false,
  })
  const [displayModals,setDisplayModals] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [isShowModalStoreCotizacion, setShowModalStoreCotizacion] = useState(false)
  const [typeBond,setTypeBond] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    count++
    if(localStorage.getItem('configStore') === "null"){
      toast.error('Debe hacer su configuración de tienda primero')
      setTimeout(function () {
        props.history.replace('/config/config_store')
      }, 1500);
    }else{
      let config = props.configStore
      let config_general = props.configGeneral
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
          fetchTypeBond()
          fetchEmisor()
        }
      }else{
        fetchClients()
        fetchProducts()
        fetchTypeBond()
        fetchEmisor()
      }
      setDisplayModals(true)
    }
  },[props.id_branch_office,props.id_enterprise])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () => {
      layoutHelpers.toggleCollapsed()
      count = 0
      GastosCotizacion = []
    }
  },[])

  useMemo(() => {

    GastosCotizacion = [
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
        Cell: props => {
          const id = props.cell.row.original.id
          return(
            <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props.cell.row.original) }>Remover</Button>
          )
        }
      }
    ]

  },[])

  const fetchDataUpdate = () => {
    axios.get(API_URL+'cotizacion/'+props.match.params.id).then(result => {
      setGastosDetail(result.data.gastos)
      setDetailProducts(result.data.products)

      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          country_transmitter: result.data.country_transmitter ? result.data.country_transmitter : props.configStore.country,
          email_transmitter: result.data.email_transmitter ? result.data.email_transmitter : props.configStore.email,
          phone_transmitter: result.data.phone_transmitter ? result.data.phone_transmitter : props.configStore.phone,
          actividad_economica_transmitter: result.data.actividad_economica_transmitter ? result.data.actividad_economica_transmitter : props.configGeneral.actividad_economica,
          spin_transmitter : result.data.spin_transmitter ? result.data.spin_transmitter : props.configGeneral.giro,
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

  const fetchEmisor = () => {
    let rut = props.configStore ? props.configStore.rut.split('-')[0] : ''
    let dv  = props.configStore ?  props.configStore.rut.split('-')[1] : ''

    axios.get(API_URL+'search_receptor/'+rut+'/'+dv).then(result => {
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
            rut_transmitter: result.data.rut+"-"+result.data.dv,
            business_name_transmitter: result.data.razon_social,
            address_transmitter_array: result.data.direcciones,
            address_transmitter : result.data.direccion_seleccionada,
            comuna_transmitter: result.data.comuna_seleccionada,
            city_transmitter: result.data.ciudad_seleccionada,
            fetchTransmitter: true
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

  const fetchTypeBond = () => {
    axios.get(API_URL+'type_bond').then(result => {
        setTypeBond(result.data)
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

  const goToDashboard = () => {
      props.history.replace('/bill/bill_search')
  }

  const submitData = () => {

    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error('Hay campos en el formulario que le falta por llenar')
      return
    }

    if(detailProducts.length === 0){
      toast.error('Debe escoger almenos un producto')
      return
    }

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: [...detailProducts],
      gastos: [...gastosDetail],
      status: 3,
      referencias : [...refCotizacion],
      bonds : [...detailBonds]
    }

    let sum_bonds = 0
    let total_total = displayTotalTotal(true)

    object_post.bonds.forEach((item, i) => {
      sum_bonds+= parseFloat(item.amount)
    });

    if(sum_bonds > total_total){
      toast.error('El monto total de pagos no puede ser mayor que el de la boleta')
      return
    }

    setDisableButton(true)

    axios.put(API_URL+'cotizacion_facturar/'+props.match.params.id,object_post).then(result => {
      toast.success('Boleta hecha con éxito')
      setDisableButton(false)
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


  const displayTotalTotal = (sin_gastos = false) => {
    let total_product = displayTotalProduct()
    let total_gastos  = displayTotalGastos()
    let total_iva = 0
    if(cotizationData.total_with_iva){
      total_iva = displayTotalIva()
    }
    if(!sin_gastos){
      return (parseFloat(total_product) + parseFloat(total_iva)) - parseFloat(total_gastos)
    }else{
      return (parseFloat(total_product) + parseFloat(total_iva))
    }
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
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect" || e.target.name === "type_invoicing"){
      let val = e.target.value === "false" ? false : true
      setCotizationData({...cotizationData, [e.target.name] : val})
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

  const handleHideModalStoreCotizacion = () => {
    setShowModalStoreCotizacion(!isShowModalStoreCotizacion)
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
      is_neto: type
    }])
  }

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice)
  }

  return (
    <Styles>
      <Container fluid>
        <Form onSubmit={() => {}} noValidate validated={validated} ref={inputRef}>
          <Row>
            <Col sm={8} md={8} lg={8}>
              <h4 className="title_principal">Formulario De Boletas</h4>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <InputField
               type='text'
               label={(<h5 style={{color: "rgb(153, 31, 31)"}}>Ref.Boleta</h5>)}
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
            <Col sm={12} md={12} lg={12}>
              <Accordion>
                <TransmitterInvoiceComponent
                  isType="boleta"
                  cotizationData={cotizationData}
                  setCotizationData={setCotizationData}
                  onChange={onChange}
                  />
                <ClientInvoiceComponent
                  isType="boleta"
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
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <Row>
                    <InputField
                      type='select'
                      label='Listado de Productos'
                      name='price_list'
                      required={false}
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
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="4" className="header_card">
                <b>Gastos</b> <FaMoneyBill /> ( hacer click para desplegar campos )
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
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
                        <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Agregar Gastos a la Cotización</Tooltip>}>
                          <Button className="button_product_base" size="sm" variant="danger" block={true} onClick={() => setIsShowModalGastos(true)}><FaPlusCircle /></Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
              <Col sm={6} md={6} lg={6} className="text-center">
                <b>Tipo de Boleta</b>
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
          <TableTotalComponent
            configGeneral={props.configGeneral}
            displayTotalProduct={displayTotalProduct}
            displayTotalIva={displayTotalIva}
            displayTotalGastos={displayTotalGastos}
            displayTotalDiscount={() => {}}
            displayTotalTotal={displayTotalTotal}
            cotizationData={cotizationData}
            isType={"cotizacion"}
          />
        <br/>
        <TableBondsBillComponent
          typePayments={typeBond}
          detailBonds={detailBonds}
          setDetailBonds={setDetailBonds}
        />
        <br/>
        <Row className="justify-content-center">
          <Col sm={4} md={4} lg={4}>
            <Button type="button" variant="primary" block={true} size="sm" onClick={submitData} disabled={disableButtons}>Guardar <FaPlusCircle /></Button>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Button type="button" variant="danger" block={true} size="sm" onClick={goToDashboard} disabled={disableButtons}>Volver a la tabla</Button>
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
    configGeneral: state.configs.config,
    configStore: state.configs.configStore
  }
}

CotizationBillPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(CotizationBillPage)
