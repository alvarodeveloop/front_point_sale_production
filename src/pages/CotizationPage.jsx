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
import { FaBook, FaTrash, FaSearch,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
import Table from 'components/Table'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
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
  const [displayDataInvoice, setDisplayDataInvoice] = useState(false)
  const [requireInvoice, setRequireInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState({
    business_name_transmitter: '',
    rut_transmitter: '',
    address_transmitter: '',
    country_transmitter: '',
    city_transmitter: '',
    email_transmitter: '',
    phone_transmitter: '',
    actividad_economica_transmitter: '',
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
    type_invoicing: true,
    comuna_client: '',
    city_client: '',
    spin_client: '',
    actividad_economica_client: '',
    actividad_economica_transmitter: '',
    comuna_transmitter: '',
  })
  const [displayModals,setDisplayModals] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])

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
              country_transmitter: config.pais ? config.pais.nombre : '',
              email_transmitter: config.email,
              phone_transmitter: config.phone,
              actividad_economica_transmitter: config_general.actividad_economica,
              city_transmitter:  config.city,
              comuna_transmitter: config.comuna
            })
            return test
          })
        }, 1000);
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

  const removeProductRef = i => {
    let array_copy = [...refCotizacion]
    array_copy.splice(i,1)
    setRefCotizacion(array_copy)
  }

  const addRef = () => {
    setRefCotizacion([...refCotizacion,{
      ind: 'ind',
      type_document: 'Hoja Entrada de Servicio',
      ref_invoice: '',
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
        return {
          business_name_transmitter: result.data.business_name_transmitter,
          rut_transmitter: result.data.rut_transmitter,
          address_transmitter: result.data.address_transmitter,
          country_transmitter: result.data.country_transmitter,
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
          type_invoicing: true,
          comuna_client: result.data.comuna_client,
          city_client: result.data.city_client,
          spin_client: result.data.spin_client,
          comuna_transmitter: result.data.comuna_transmitter,
          city_transmitter: result.data.city_transmitter
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
    }

    let validate = false

    let array_validation_invoice = [
      'business_name_transmitter','rut_transmitter',
      'rut_client','business_name_client','spin_client'
    ]

    let array_validation_invoice_excenta = [
      'actividad_economica_transmitter','comuna_transmitter','city_client','address_client',
      'comuna_client','actividad_economica_transmitter'
    ]

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
          toast.success('Cotización modificada y facturada con éxito')
          handleModalInvoice()
          setDisplayDataInvoice(false)

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
        toast.success('Cotización guardada con éxito')
        clearData()
        if(type === 3){
          handleModalInvoice()
          setDisplayDataInvoice(false)

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
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect" || e.target.name === "type_invoicing"){
      let val = e.target.value === "false" ? false : true
      setCotizationData({...cotizationData, [e.target.name] : val})
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
    setCotizationData({...cotizationData, rut_client : client.data_document, business_name_client: client.name_client, address_client: client.address, comuna_client: client.comuna, city_client : client.city, spin_client: client.spin, actividad_economica_client: client.actividad_economica})
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
    product.discount_stock = true
    product.id_product = product.id
    setDetailProducts([...detailProducts, product])
    setIsShowModalProduct(false)
  }

  const removeCLient = () => {
    setClientDetail({})
    handleResetValueClient()
    setCotizationData({...cotizationData, rut_client : '', business_name_client: '', address_client: '', city_client: '', comuna_client : '', spin_client: '', actividad_economica_client: '' })
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
    if(type == 3){
      setDisplayDataInvoice(true)
      setRequireInvoice(true)
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
    }else{
      if(requireInvoice){
        setRequireInvoice(false)
        setTimeout(function () {
          submitData(type)
        }, 800);
      }else{
        submitData(type)
      }
    }
  }

  const searchClientByApiFacturacion = () =>{
     let val = rutFacturacionClientSearch
     toast.info('Buscando Receptor, espere por favor')
     axios.get(API_URL+'search_receptor/'+val.split('-')[0]+'/'+val.split('-')[1]).then(result => {
      setCotizationData(oldData => {
        return Object.assign({},oldData,{
          rut_client : result.data.rut +"-"+result.data.dv,
          business_name_client: result.data.razon_social,
          address_client: result.data.direccion_seleccionada,
          comuna_client : result.data.comuna_seleccionada,
          city_client : result.data.ciudad_seleccionada,
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

  const handleDisplayCotizacionField = () => {
    setDisplayDataInvoice(false)
  }

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice)
  }

  const handleSubmitInvoice = () => {
    submitData(3)
  }

  return (
    <Styles>
      <Container fluid>
        <Form onSubmit={() => {}} noValidate validated={validated} ref={inputRef}>
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
          {
            !displayDataInvoice ? (
              <React.Fragment>
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
                               required={requireInvoice}
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
                               required={requireInvoice}
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
                               required={!cotizationData.type_invoicing ? true : false}
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
                               required={requireInvoice}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.country_transmitter}
                               handleChange={onChange}
                              />
                              <InputField
                               type='text'
                               label='Ciudad'
                               name='city_transmitter'
                               required={!cotizationData.type_invoicing ? true : false}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.city_transmitter}
                               handleChange={onChange}
                              />
                              <InputField
                               type='email'
                               label='Email'
                               name='email_transmitter'
                               required={false}
                               messageErrors={[
                               'Requerido*','Formato tipo email*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.email_transmitter}
                               handleChange={onChange}
                              />
                            </Row>
                            <Row>
                              <InputField
                               type='text'
                               label='Fono'
                               name='phone_transmitter'
                               required={false}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.phone_transmitter}
                               handleChange={onChange}
                              />
                              <InputField
                               type='text'
                               label='Actividad Económica'
                               name='actividad_economica_transmitter'
                               required={!cotizationData.type_invoicing ? true : false}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.actividad_economica_transmitter}
                               handleChange={onChange}
                              />
                              <InputField
                               type='text'
                               label='Comuna'
                               name='comuna_transmitter'
                               required={!cotizationData.type_invoicing ? true : false}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.comuna_transmitter}
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
                               required={requireInvoice}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.rut_client}
                               handleChange={onChange}
                              />
                             <InputField
                                type='text'
                                label='Razón Social'
                                name='business_name_client'
                                required={requireInvoice}
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
                               required={!cotizationData.type_invoicing ? true : false}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.address_client}
                               handleChange={onChange}
                              />
                            </Row>
                            <Row>
                              <InputField
                               type='text'
                               label='Ciudad'
                               name='city_client'
                               required={!cotizationData.type_invoicing ? true : false}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.city_client}
                               handleChange={onChange}
                              />
                             <InputField
                                type='text'
                                label='Comuna'
                                name='comuna_client'
                                required={!cotizationData.type_invoicing ? true : false}
                                messageErrors={[
                                'Requerido*'
                                ]}
                                cols='col-md-4 col-lg-4 col-sm-4'
                                value={cotizationData.comuna_client}
                                handleChange={onChange}
                              />
                              <InputField
                               type='text'
                               label='Giro'
                               name='spin_client'
                               required={requireInvoice}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.spin_client}
                               handleChange={onChange}
                              />
                            </Row>
                            <Row>
                              <InputField
                               type='text'
                               label='Actividad Económica'
                               name='actividad_economica_client'
                               required={false}
                               messageErrors={[
                               'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.actividad_economica_client}
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
                               required={requireInvoice}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.name_contact}
                               handleChange={onChange}
                              />
                              <InputField
                               type='text'
                               label='Fono'
                               name='phone_contact'
                               required={requireInvoice}
                               messageErrors={[
                                 'Requerido*'
                               ]}
                               cols='col-md-4 col-lg-4 col-sm-4'
                               value={cotizationData.phone_contact}
                               handleChange={onChange}
                              />
                              <InputField
                               type='email'
                               label='Email'
                               name='email_contact'
                               required={requireInvoice}
                               messageErrors={[
                                 'Requerido*'
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
                                 required={requireInvoice}
                                 messageErrors={[
                                   'Requerido*'
                                 ]}
                                 cols='col-md-4 col-lg-4 col-sm-4'
                                 value={cotizationData.name_seller}
                                 handleChange={onChange}
                                />
                                <InputField
                                 type='text'
                                 label='Fono Vendedor'
                                 name='phone_seller'
                                 required={requireInvoice}
                                 messageErrors={[
                                   'Requerido*'
                                 ]}
                                 cols='col-md-4 col-lg-4 col-sm-4'
                                 value={cotizationData.phone_seller}
                                 handleChange={onChange}
                                />
                                <InputField
                                 type='email'
                                 label='Email Vendedor'
                                 name='email_seller'
                                 required={requireInvoice}
                                 messageErrors={[
                                   'Requerido*'
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
                            <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props.cell.row.original) }>Remover</Button>
                          )
                        }
                      }
                    ]} />
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
                    <Button type="button" size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(1)}>{disableButtons ? 'Guardando...' : 'Guardar y Enviar por Mail'} <FaMailBulk /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(3)}>{disableButtons ? 'Guardando...' : 'Guardar y Facturar'} <MdPrint /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(2)}>{disableButtons ? 'Guardando...' : 'Guardar'} <FaLocationArrow /></Button>
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
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <h3 className="text-center title_principal">Datos necesarios para la Facturación</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <Accordion>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" className="header_card">
                          <b>Referencias </b> <FaBook />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            <Row>
                              <Col sm={12} md={12} lg={12} className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th className="text-center tr_cabecera">#</th>
                                      <th className="text-center tr_cabecera">Tipo Documento</th>
                                      <th className="text-center tr_cabecera">Ind</th>
                                      <th className="text-center tr_cabecera">Folio</th>
                                      <th className="text-center tr_cabecera">Fecha Ref</th>
                                      <th className="text-center tr_cabecera">Razón Ref</th>
                                      <th className="text-center tr_cabecera">Tipo de Código</th>
                                      <th className="text-center tr_cabecera"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {refCotizacion.map((v,i) => (
                                      <tr key={i}>
                                        <td>
                                          <br/>
                                          {i + 1}
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='select'
                                              label=''
                                              id={"type_document_ref"+i}
                                              name='type_document'
                                              required={i === 0 ? true : false}
                                              messageErrors={[
                                                'Requerido*'
                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].type_document}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            >
                                              <option value="">--Seleccione--</option>
                                              <option value={"Hoja Entrada de Servicio"}>Hoja Entrada de Servicio</option>
                                            </InputField>
                                          </Row>
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='text'
                                              label=''
                                              id={"ind_ref"+i}
                                              name='ind'
                                              required={i === 0 ? true : false}
                                              messageErrors={[
                                                'Requerido*'
                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].ind}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            />
                                          </Row>
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='text'
                                              label=''
                                              id={"ref_cotizacion_ref"+i}
                                              name='ref_cotizacion'
                                              required={i === 0 ? true : false}
                                              messageErrors={[
                                                'Requerido*'
                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].ref_cotizacion}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            />
                                          </Row>
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='date'
                                              label=''
                                              id={"date_ref_ref"+i}
                                              name='date_ref'
                                              required={i === 0 ? true : false}
                                              messageErrors={[
                                                'Requerido*'
                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].date_ref}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            />
                                          </Row>
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='text'
                                              label=''
                                              id={"reason_ref_ref"+i}
                                              name='reason_ref'
                                              required={i === 0 ? true : false}
                                              messageErrors={[
                                                'Requerido*'
                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].reason_ref}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            />
                                          </Row>
                                        </td>
                                        <td>
                                          <Row>
                                            <InputField
                                              className="letras_grandes"
                                              type='text'
                                              label=''
                                              id={"type_code_ref"+i}
                                              name='type_code'
                                              required={false}
                                              messageErrors={[

                                              ]}
                                              cols='col-md-12 col-lg-12 col-sm-12'
                                              value={refCotizacion[i].type_code}
                                              handleChange={(e) => {onChangeTableRef(e,i)}}
                                            />
                                          </Row>
                                        </td>
                                        <td>
                                          <br/>
                                          <Button variant="danger" size="sm" type="button" onClick={() => {removeProductRef(i)}}><FaTrash /></Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </Col>
                            </Row>
                            <Row className="justify-content-center">
                              <Col sm={1} md={1} lg={1}>
                                <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Referencia a la Facturación</Tooltip>}>
                                  <Button className="button_product_base" variant="danger" block={true} type="button" onClick={addRef}><FaPlusCircle /></Button>
                                </OverlayTrigger>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <InputField
                   type='date'
                   label='Fecha emisión de la factura'
                   name='date_issue_invoice'
                   required={requireInvoice}
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
                    required={requireInvoice}
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={cotizationData.days_expiration}
                    handleChange={onChange}
                   />
                  <Col sm={4} md={4} lg={4}>
                     <Row>
                       <Col sm={6} md={6} lg={6}>
                         <Form.Group>
                           <Form.Check
                             name="type_invoicing"
                             type={'radio'}
                             id={`radio-5`}
                             label={`Afecta`}
                             value={true}
                             checked={cotizationData.type_invoicing}
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
                             checked={!cotizationData.type_invoicing}
                             onChange={onChange}
                             />
                         </Form.Group>
                       </Col>
                     </Row>
                  </Col>
                </Row>
                <Row>
                  <InputField
                   type='select'
                   label='Forma de Pago'
                   name='way_of_payment'
                   required={requireInvoice}
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
                              <th className="text-center">Descuento Global</th>
                              <th className="text-center">Balance Total</th>
                            </tr>
                          ) : (
                            <tr>
                              <th className="text-center">Neto(Productos)</th>
                              <th className="text-center">Gastos</th>
                              <th className="text-center">Descuento Global</th>
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
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount())}</td>
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                            </tr>
                          ) : (
                            <tr>
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount())}</td>
                              <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" variant="primary" block={true} size="sm" onClick={handleModalInvoice} disabled={disableButtons}>Guardar <FaPlusCircle /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button type="button" variant="danger" block={true} size="sm" onClick={handleDisplayCotizacionField} disabled={disableButtons}>Volver</Button>
                  </Col>
                </Row>
              </React.Fragment>
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
