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
  Form,
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import {FaPlusCircle, FaMailBulk, FaUser } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
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
import ModalInvoiceCotization from 'components/modals/ModalInvoiceCotization'
import {formatRut} from 'utils/functions'
import { connect } from 'react-redux'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import {OBJECT_COTIZATION} from 'utils/constants'
import GastosComponent from 'components/invoice/GastosComponent'
import InvoiceExcentasComponent from 'components/invoice/InvoiceExcentasComponent'
import InvoiceAfectaComponent from 'components/invoice/InvoiceAfectaComponent'
import ProductTableComponent from 'components/invoice/ProductTableComponent'

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

const CotizationPage = (props) => {

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
  //const [requireInvoice, setRequireInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(
    Object.assign({},OBJECT_COTIZATION,{
      date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      type_invoicing: 3,
      searchReceptorDefault : false,
  }))
  const [displayModals,setDisplayModals] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [isShowModalStoreCotizacion, setShowModalStoreCotizacion] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    count++
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
        get_ref()
      }
      setDisplayModals(true)
    }
  },[props.id_branch_office,props.id_enterprise])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () => {
      layoutHelpers.toggleCollapsed()
      count = 0
    }
  },[])

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

  const clearData = () => {

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
          spin_transmitter: result.data.spin_transmitter,
          email_transmitter: result.data.email_transmitter,
          phone_transmitter: result.data.phone_transmitter,
          actividad_economica_transmitter: result.data.actividad_economica_transmitter,
          comment: result.data.comment,
          date_issue: moment(result.data.date_issue).tz('America/Santiago').format('YYYY-MM-DD'),
          date_expiration: moment(result.data.date_expiration).tz('America/Santiago').format('YYYY-MM-DD'),
          type_api: result.data.type_api,
          rut_client: result.data.rut_client,
          business_name_client: result.data.business_name_client,
          address_client: result.data.address_client,
          actividad_economica_client: result.data.actividad_economica_client,
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
          id_branch_office: result.data.id_branch_office,
          date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
          comuna_client: result.data.comuna_client,
          city_client: result.data.city_client,
          spin_client: result.data.spin_client,
          comuna_transmitter: result.data.comuna_transmitter,
          city_transmitter: result.data.city_transmitter,
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

  const submitData = (type, clientMailArray = []) => {

    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error('Hay campos en el formulario que le falta por llenar')
      if(type == 3 ){
        handleModalInvoice()
      }
      return
    }

    let object_post = {
      cotization: Object.assign({},cotizationData),
      products: [...detailProducts],
      gastos: [...gastosDetail],
      status: type,
      clientMailArray,
    }

    /*let validate = false

    let array_validation_invoice = [
      'business_name_transmitter','rut_transmitter',
      'rut_client','business_name_client','spin_client'
    ]

    let array_validation_invoice_excenta = [
      'actividad_economica_transmitter','comuna_transmitter','city_client','address_client',
      'comuna_client','actividad_economica_transmitter']

      if(requireInvoice || type === 3){
      array_validation_invoice.forEach((item, i) => {
      if(object_post.cotization[item] === '' || object_post.cotization[item] === null){
      validate = true
      }
      });

      if(object_post.cotization.type_invoicing === false){
      array_validation_invoice_excenta.forEach((item, i) => {
      if(object_post.cotization[item] === '' || object_post.cotization[item] === null){
      validate = true
      }
      });
      }
      }
      if(validate){
      setValidated(true);
      toast.error('Hay campos en el formulario que le falta por llenar')
      if(type == 3 ){
      handleModalInvoice()
      }
      return false
      }
    */



    if(type == 3){
      object_post.referencias = refCotizacion
    }else{
      object_post.cotization = Object.assign({},object_post.cotization,{
        days_expiration: '',
        way_of_payment: '',
        discount_global: 0,
        date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
        type_invoicing: true,
      })
    }

    setDisableButton(true)
    if(props.match.params.id){
      axios.put(API_URL+'cotizacion/'+props.match.params.id,object_post).then(result => {
        setDisableButton(false)
        clearData()
        if(type === 3){
          toast.success(result.data.message ? result.data.message : 'Cotización modificada y facturada con éxito')
          handleModalInvoice()
          setDisplayDataInvoice(1)

          toast.info('Generando pdf de la Cotización, espere por favor...')

          axios.get(API_URL+'cotizacion_print/'+props.match.params.id+"/0").then(result => {
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
        }else{
          toast.success('Cotización modificada con éxito')
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
    }else{
      axios.post(API_URL+'cotizacion',object_post).then(result => {
        setDisableButton(false)
        toast.success(result.data.message ? result.data.message : 'Cotización guardada con éxito')
        clearData()
        if(type === 3){
          handleModalInvoice()
          setDisplayDataInvoice(1)

          toast.info('Generando pdf de la Cotización, espere por favor...')

          axios.get(API_URL+'cotizacion_print/'+result.data.id+"/0").then(result => {
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
    submitData(1,data)
  }

  const onChange = async e => {
    e.persist()
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect" || e.target.name === "type_invoicing"){
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

  const saveCotizacion = type => {
    //
    if(type == 3){
      setDisplayDataInvoice(2)
      setRefCotizacion(oldData => {
        if(oldData.length === 0){
          return [
            {
              ind: 'ind',
              type_document: 'Hoja Entrada de Servicio',
              ref_cotizacion: cotizationData.ref,
              date_ref: moment().tz('America/Santiago').format('YYYY-MM-DD'),
              reason_ref: 'Cotización',
              type_code: '',
              id_invoice: ''
            }
          ]
        }else{
          return oldData
        }
      })

      if(cotizationData.type_effect === true){
        setCotizationData({...cotizationData, type_invoicing : true})
      }else if(cotizationData.type_effect === false){
        setCotizationData({...cotizationData, type_invoicing : false})
      }

      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 500);
    }else{
      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          business_name_transmitter: props.configStore.name_store,
          rut_transmitter: props.configStore.rut,
          address_transmitter: props.configStore.address,
          spin_transmitter: props.configGeneral.sping,
          email_transmitter: props.configStore.email,
          phone_transmitter: props.configStore.phone,
          actividad_economica_transmitter: props.configGeneral.actividad_economica,
          city_transmitter:  props.configStore.city,
          comuna_transmitter: props.configStore.comuna
        })
      })
      handleDisplayCotizacionField(3)
    }
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

  const handleDisplayCotizacionField = field => {
    setDisplayDataInvoice(field)
  }

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice)
  }

  const handleSubmitInvoice = () => {
    submitData(3)
  }

  const displayMembreteCotizacion = step => {
    return (
      <React.Fragment>
        <Row>
          <Col sm={8} md={8} lg={8}>
            <h4 className="title_principal">Formulario De Cotizaciones</h4>
            <h4 className="title_principal">Paso{step}</h4>
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
      </React.Fragment>
    )
  }

  return (
    <Styles>
      <Container fluid>
        <Form onSubmit={() => {}} noValidate validated={validated} ref={inputRef}>
          {
            displayDataInvoice == 1 ? (
              <React.Fragment>
                {displayMembreteCotizacion(1)}
                <br/>
                {/* tabla editable de los productos de las cotizaciones */}
                <ProductTableComponent
                  setDetailProducts={setDetailProducts}
                  detailProducts={detailProducts}
                  cotizationData={cotizationData}
                  setIsShowModalProduct={setIsShowModalProduct}
                  setGastosDetail={setGastosDetail}
                  onChange={onChange}
                />
                {/* ======================================================= */}
                <hr/>
                <GastosComponent
                  gastosDetail={gastosDetail}
                  setGastosDetail={setGastosDetail}
                  configGeneral={props.configGeneral}
                  setIsShowModalGastos={setIsShowModalGastos}
                />
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
                            required={true}
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
                            required={true}
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
                <TableTotalComponent
                  configGeneral={props.configGeneral}
                  configStore={props.configStore}
                  detailProducts={detailProducts}
                  cotizationData={cotizationData}
                  gastosDetail={gastosDetail}
                  isType={"cotizacion"}
                />
                <br/>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(3)}>{disableButtons ? 'Guardando...' : 'Guardar y Facturar'} <MdPrint /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(2)}>{disableButtons ? 'Guardando...' : 'Datos de emisor y receptor ( paso 2 )'} <FaUser /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="danger" size="sm" block={true} type="button" onClick={goToDashboard}>Volver a la Tabla</Button>
                  </Col>
                </Row>
              </React.Fragment>
            ) : displayDataInvoice == 2 ? (
              <React.Fragment>
                {displayMembreteCotizacion(2)}
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
                    onChange={onChange}
                    setIsShowModalClient={setIsShowModalClient}
                    handleModalSeller={handleModalSeller}
                    handleModalContacts={handleModalContacts}
                    clients={clients}
                    onChangeTableRef={onChangeTableRef}
                    refCotizacion={refCotizacion}
                    removeProductRef={removeProductRef}
                    addRef={addRef}
                    submitData={handleModalInvoice}
                    goToDashboard={goToDashboard}
                  />
                ) : cotizationData.type_invoicing === false ? (
                  <React.Fragment>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <h3 className="text-center title_principal">Datos necesarios para la Facturación</h3>
                      </Col>
                    </Row>
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
                      onChange={onChange}
                      setIsShowModalClient={setIsShowModalClient}
                      handleModalSeller={handleModalSeller}
                      handleModalContacts={handleModalContacts}
                      clients={clients}
                      onChangeTableRef={onChangeTableRef}
                      refCotizacion={refCotizacion}
                      removeProductRef={removeProductRef}
                      addRef={addRef}
                      submitData={handleModalInvoice}
                      goToDashboard={goToDashboard}
                    />
                  </React.Fragment>
                ) : ''}
              </React.Fragment>
            ) : (
              <Row>
                <Col sm={12} md={12} lg={12}>
                  {displayMembreteCotizacion(2)}
                </Col>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <Col sm={12} md={12} lg={12} xs={12}>
                      <Accordion defaultActiveKey="1">
                        <TransmitterInvoiceComponent
                          isType="cotizacion"
                          cotizationData={cotizationData}
                          setCotizationData={setCotizationData}
                          onChange={onChange}
                          configGeneral={props.configGeneral}
                        />
                        <ClientInvoiceComponent
                          isType="cotizacion"
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
                  <Row className="justify-content-center">
                    <Col sm={3} md={3} lg={3}>
                      <DropdownButton size="sm" id={'drop'} title={disableButtons ? 'Guardando' : "Compartir"}  className="dropdown_block" disabled={disableButtons} variant="secondary">
                        <Dropdown.Item onClick={() => setOpenModalClientMail(true) }>Enviar por Mail</Dropdown.Item>
                        <Dropdown.Item onClick={ copyLinkOfCotizacion } >Copiar Link</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                      <Button type="button" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => submitData(1)}>{disableButtons ? 'Guardando...' : 'Guardar y Enviar por Mail'} <FaMailBulk /></Button>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                      <Button type="button" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => submitData(2)}>{disableButtons ? 'Guardando...' : 'Guardar Cotización'}<FaPlusCircle /></Button>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                      <Button type="button" size="sm" variant="danger" disabled={disableButtons} block={true} onClick={() => handleDisplayCotizacionField(1)}>Volver</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }

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
                {...props}
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
    configGeneral: state.configs.config,
    configStore: state.configs.configStore
  }
}

CotizationPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(CotizationPage)
