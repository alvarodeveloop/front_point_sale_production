import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
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
import RefComponent from 'components/invoice/RefComponent'
import TableBondsBillComponent from 'components/invoice/TableBondsBillComponent'
import {OBJECT_COTIZATION} from 'utils/constants'
import GastosComponent from 'components/invoice/GastosComponent'
import ProductTableComponent from 'components/invoice/ProductTableComponent'
import LoadingComponent from 'components/LoadingComponent'

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

const BillPage = (props) => {

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
  const [cotizationData, setCotizationData] = useState(Object.assign({},OBJECT_COTIZATION,{
    business_name_transmitter: props.configStore ? props.configStore.name_store : '',
    rut_transmitter: props.configStore ? props.configStore.rut : '',
    address_transmitter: props.configStore ? props.configStore.address : '',
    spin_transmitter: props.configStore ? props.configGeneral.sping : '',
    city_transmitter:  props.configStore ? props.configStore.city : '',
    email_transmitter: props.configStore ? props.configStore.email : '',
    phone_transmitter: props.configStore ? props.configStore.phone : '',
    date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    actividad_economica_transmitter: props.configGeneral ? props.configGeneral.actividad_economica : '',
    comuna_transmitter: props.configStore ? props.configStore.comuna : '',
    actividad_economica_transmitter: props.configGeneral ? props.configGeneral.actividad_economica : '',
    type: 3
  }))

  const [displayModals,setDisplayModals] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [isShowModalStoreCotizacion, setShowModalStoreCotizacion] = useState(false)
  const [typeBond,setTypeBond] = useState([])
  const [displayLoading, setDisplayLoading] = useState(true)
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
          fetchData(false,true)
        }
      }else{
        fetchData(false,false)
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

  const fetchData = (onlyClient = false , isUpdate = false) => {
    if(!displayLoading){
      setDisplayLoading(true)
    }
    let promises = null
    if(!onlyClient && !isUpdate){
      let rut = props.configGeneral.enterprise.rut.split('-')[0]
      let dv  = props.configGeneral.enterprise.rut.split('-')[1]
      promises = [
        axios.get(API_URL+'client'),
        axios.get(API_URL+'product'),
        axios.get(API_URL+'type_bond'),
        axios.get(API_URL+'search_receptor/'+rut+'/'+dv),
      ]
    }else if(onlyClient){
      promises = [axios.get(API_URL+'client')]
    }else if(isUpdate){
      promises = [axios.get(API_URL+'client'),axios.get(API_URL+'product')]
    }

    Promise.all(promises).then(result => {
      setClients(result[0].data)
      if(result.length >= 2){
        setProducts(result[1].data)
        if(result.length > 2){

          setTypeBond(result[2].data)
          setCotizationData(oldData => {
            return Object.assign({},oldData,{
              rut_transmitter: result[3].data.rut+"-"+result[3].data.dv,
              business_name_transmitter: result[3].data.razon_social,
              address_transmitter_array: result[3].data.direcciones[0],
              address_transmitter : result[3].data.direccion_seleccionada,
              comuna_transmitter: result[3].data.comuna_seleccionada,
              city_transmitter: result[3].data.ciudad_seleccionada,
              fetchTransmitter: false,
            })
          })
        }
      }
      setDisplayLoading(false)
    }).catch(err => {
      console.log(err.response,err,"aqui el error");
      if(err.response.status != 400){
        if(promises.length > 2){
          promises.splice(3,1);
        }
        Promise.all(promises).then(result => {
          setClients(result[0].data)
          if(result.length >= 2){
            setProducts(result[1].data)
            if(result.length > 2){
              setTypeBond(result[2].data)
            }
          }
          setDisplayLoading(false)
        }).catch(err => {
          setDisplayLoading(false)
          props.tokenExpired(err)  
        })
      }else{
        setDisplayLoading(false)
        props.tokenExpired(err)
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

  const displayTotalProduct = useCallback(() => {
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
  },[detailProducts])

  const displayTotalIva = useCallback( () => {
    let total = 0

    detailProducts.forEach((item, i) => {
      let item1 = Object.assign({}, item)
      if (!item1.is_neto) {
        if (cotizationData.total_with_iva) {
          item1.price = item1.discount ? (parseFloat(item1.price) - ((parseFloat(item1.price) * item1.discount) / 100)) : item1.price
          item1.price = cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * cotizationData.discount_global) / 100) : item1.price
          total += parseFloat(((item1.price * props.configStore.tax) / 100))
        } else {
          total += 0
        }
      }
    })
    return total

  },[detailProducts])

  const displayTotalGastos = useCallback(() => {
      let total = 0
      gastosDetail.forEach((item, i) => {
        total += parseFloat(item.amount)
      });
  
      return total
    },[gastosDetail])


  const displayTotalTotal = useCallback((sin_gastos = false) => {
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
  },[detailProducts])

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
    setDisplayLoading(true)
    axios.post(API_URL+'invoice',object_post).then(result => {
      setDisableButton(false)
      setDisplayLoading(false)
      toast.success('Boleta guardada con éxito')
      toast.info('Generando pdf de la boleta, espere por favor...')
      result.data.forEach((item, i) => {
        if(item){
          window.open(item.url,'_blank')
        }
      });
      setTimeout(() => {
        goToDashboard()
      }, 1500);
    }).catch(err => {
      setDisableButton(false)
      setDisplayLoading(false)
      if(err.response){
        toast.error(err.response.data.message+" o es posible que su usuario no pueda realizar boletas")
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
    fetchData(true)
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
          {displayLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Accordion>
                    <TransmitterInvoiceComponent
                      isType="boleta"
                      cotizationData={cotizationData}
                      setCotizationData={setCotizationData}
                      onChange={onChange}
                      configGeneral={props.configGeneral}
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
              <ProductTableComponent
                setDetailProducts={setDetailProducts}
                detailProducts={detailProducts}
                products={products}
                cotizationData={cotizationData}
                setIsShowModalProduct={setIsShowModalProduct}
                setGastosDetail={setGastosDetail}
                onChange={onChange}
                {...props}
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
                  label='Fecha de Emisión (MM-DD-YYYY)'
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
                configStore={props.configStore}
                detailProducts={detailProducts}
                cotizationData={cotizationData}
                gastosDetail={gastosDetail}
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
            </>
          )}
          
          {displayModals ? (
            <React.Fragment>
              <FormClientModal
                isShow={isShowModalClient}
                onHide={handleHideModalClient}
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

BillPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(BillPage)
