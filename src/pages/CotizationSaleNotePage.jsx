import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Row,
  Col,
  Container,
  Button,
  Accordion,
  Form,
  Image
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import FormClientModal from 'components/modals/FormClientModal'
import ModalGastosCotizacion from 'components/modals/ModalGastosCotizacion'
import * as moment from 'moment-timezone'
import InputField from 'components/input/InputComponent'
import { connect } from 'react-redux'
import ModalContacts from 'components/modals/ModalContacts'
import ModalSeller from 'components/modals/ModalSeller'
import styled from 'styled-components'
import layoutHelpers from 'shared/layouts/helpers'
import ModalInvoiceCotization from 'components/modals/ModalInvoiceCotization'
import {formatRut} from 'utils/functions'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
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

const CotizationSaleNotePage = (props) => {

  const [displayLoading, setDisplayLoading] = useState(true)
  const [clients,setClients] = useState([])
  const [clientDetail,setClientDetail] = useState({})
  const [detailProducts, setDetailProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalGastos, setIsShowModalGastos] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)
  const [products,setProducts] = useState([])
  const [gastosDetail,setGastosDetail] = useState([])
  const [listData, setListData] = useState([])
  const [disableButtons,setDisableButton] = useState(false)
  const [isShowModalContacts,setIsShowModalContacts] = useState(false)
  const [isShowModalSeller,setIsShowModalSeller] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(
    Object.assign({},OBJECT_COTIZATION,{
      date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      type_invoicing: 3,
      type : 2,
      date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      id_branch_office: props.id_branch_office
  }))
  const [displayModals,setDisplayModals] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const inputRef = useRef(null)

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
          props.history.replace('/config/config_general')
        }, 3000);
      }
    }else{
      let config_general = props.configGeneral
      count++
      if(count > 1 && props.id_branch_office !== cotizationData.id_branch_office){
        toast.error('Esta cotización no pertenece a esta sucursal')
        setTimeout(function () {
          props.history.replace('/quotitation/search_quotitation')
        }, 1500);
      }else{
        fetchData()
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
  }

  const fetchData = (onlyClient = false) => {
    if(!displayLoading){
      setDisplayLoading(true)
    }
    let promises = null
    if(!onlyClient){
      promises = [
        axios.get(API_URL+'client'),
        axios.get(API_URL+'product'),
        axios.get(API_URL+'cotizacion/'+props.match.params.id),
        axios.get(API_URL+'listProduct'),
      ]
    }else if(onlyClient){
      promises = [axios.get(API_URL+'client')]
    }

    Promise.all(promises).then(result => {
      setClients(result[0].data)
      if(result.length >= 2){
        
        setProducts(result[1].data)
        setGastosDetail(result[2].data.gastos)
        setDetailProducts(result[2].data.products)
        setListData(result[3].data)
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
            business_name_transmitter: result[2].data.business_name_transmitter,
            rut_transmitter: result[2].data.rut_transmitter,
            address_transmitter: result[2].data.address_transmitter,
            country_transmitter: result[2].data.country_transmitter,
            email_transmitter: result[2].data.email_transmitter,
            phone_transmitter: result[2].data.phone_transmitter,
            actividad_economica_transmitter: result[2].data.actividad_economica_transmitter,
            city_transmitter : result[2].data.city_transmitter,
            comment: result[2].data.comment,
            date_issue_invoice: result[2].data.date_issue_invoice ? moment(result[2].data.date_issue_invoice).tz('America/Santiago').format('YYYY-MM-DD') : moment().tz('America/Santiago').format('YYYY-MM-DD'),
            type_api: result[2].data.type_api,
            rut_client: result[2].data.rut_client,
            business_name_client: result[2].data.business_name_client,
            address_client: result[2].data.address_client,
            actividad_economica_client: result[2].data.actividad_economica_client,
            city_client : result[2].data.city_client,
            name_contact: result[2].data.name_contact,
            phone_contact: result[2].data.phone_contact,
            email_contact: result[2].data.email_contact,
            name_seller: result[2].data.name_seller,
            phone_seller: result[2].data.phone_seller,
            email_seller: result[2].data.email_seller,
            total_with_iva : result[2].data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
            price_list: "",
            status: result[2].data.status,
            type_invoicing: result[2].data.type_effect,
            ref: result[2].data.ref,
            way_of_payment: result[2].data.way_of_payment ? result[2].data.way_of_payment : 1,
            discount_global: result[2].data.discount_global,
            days_expiration: result[2].data.days_expiration,
            id_branch_office : result[2].data.id_branch_office,
            comuna_client: result[2].data.comuna_client,
            city_client: result[2].data.city_client,
            spin_client: result[2].data.spin_client,
            comuna_transmitter: result[2].data.comuna_transmitter,
            type_buy_client: result[2].data.type_buy_client,
            type_sale_transmitter: result[2].data.type_sale_transmitter,
            way_of_payment: "Crédito"
          })
        })
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const goToDashboard = () => {
      props.history.replace('/quotitation/search_quotitation')
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
    fetchData(true)
  }

  const handleModalContacts = () => {
    setIsShowModalContacts(!isShowModalContacts)
  }

  const handleModalSeller = () => {
    setIsShowModalSeller(!isShowModalSeller)
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
    //setDisplayLoading(true)
    axios.put(API_URL+'cotizacion_facturar/'+props.match.params.id,object_post).then(result => {
      toast.success('Nota de venta realizada con éxito')
      setDisableButton(false)
      handleModalInvoice()
      clearData()
      toast.info('Generando pdf de la cotización, espere por favor...')
      axios.get(API_URL+'cotizacion_print/'+props.match.params.id+'/0').then(result => {
        //setDisplayLoading(false)
        window.open(API_URL+'documents/cotizacion/files_pdf/'+result.data.name)
        setTimeout( () => {
          goToDashboard()
        }, 1500);
      }).catch(err => {
        //setDisplayLoading(false)
        props.tokenExpired(err)
      })

    }).catch(err => {
      setDisableButton(false)
      //setDisplayLoading(false)
      props.tokenExpired(err)
    })

  }

  const addRef = () => {
    setRefCotizacion([...refCotizacion,{
      ind: 'ind',
      type_document: 'HES',
      ref_cotizacion: cotizationData.ref,
      date_ref: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      reason_ref: 'Cotización',
      type_code: '',
      id_invoice: ''
    }])
  }

  const getEmisorReceptorInvoicing = async type => {
    setCotizationData(oldData => {
      return Object.assign({},cotizationData,{
        type_invoicing: type,
        searchReceptorDefault : true
      })
    })
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
          {!displayLoading ? (
            <React.Fragment>
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
                          configGeneral={props.configGeneral}
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
                  <ProductTableComponent
                    setDetailProducts={setDetailProducts}
                    detailProducts={detailProducts}
                    cotizationData={cotizationData}
                    setIsShowModalProduct={setIsShowModalProduct}
                    setGastosDetail={setGastosDetail}
                    onChange={onChange}
                    products={products}
                    listData={listData}
                    setProducts={setProducts}
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
                        label='Fecha emisión de la nota (MM-DD-YYYY)'
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
                      configStore={props.configStore}
                      detailProducts={detailProducts}
                      cotizationData={cotizationData}
                      gastosDetail={gastosDetail}
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
            </React.Fragment>
          ) : (
            <LoadingComponent />
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
