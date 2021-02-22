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
  Form
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import { FaSearch, FaMoneyBill,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers, FaBook } from 'react-icons/fa'
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
import GastosComponent from 'components/invoice/GastosComponent'
import TransferComponent from 'components/invoice/TransferComponent'
import {OBJECT_COTIZATION,API_FACTURACION} from 'utils/constants'
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

const CotizationGuidePage = (props) => {

  const [clients,setClients] = useState([])
  const [detailProducts, setDetailProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalGastos, setIsShowModalGastos] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)
  const [products,setProducts] = useState([])
  const [gastosDetail,setGastosDetail] = useState([])
  const [disableButtons,setDisableButton] = useState(false)
  const [isShowModalContacts,setIsShowModalContacts] = useState(false)
  const [isShowModalSeller,setIsShowModalSeller] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(Object.assign({},OBJECT_COTIZATION,{
    date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
    type: 4,
    id_branch_office: props.id_branch_office
  }))
  const [displayModals,setDisplayModals] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const inputRef = useRef(null)
  const [optionalFields,setOptionalFields] = useState({
    check_ref : false,
    check_transfer: false
  })
  const [displayLoading, setDisplayLoading] = useState(true)
  const [listData, setListData] = useState([])

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
            type_api: result[2].data.type_api,
            name_contact: result[2].data.name_contact,
            email_contact: result[2].data.email_contact,
            phone_contact: result[2].data.phone_contact,
            name_seller: result[2].data.name_seller,
            phone_seller: result[2].data.phone_seller,
            email_seller: result[2].data.email_seller,
            ref: result[2].data.ref,
            id_branch_office : result[2].data.id_branch_office,
          })
        })
  
        if(result[2].data.rut_client){
          searchClientReceptor(result[2].data.rut_client)
        }else{
          toast.info('Ingrese el rut del receptor de la guía')
          setDisplayLoading(false)
        }
      }else{
        setDisplayLoading(false)
      }
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
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

  const searchClientReceptor = async (rutSearch = false) => {
    try {
      let rut_value = rutSearch ? rutSearch : cotizationData.rut_client_search
      let emisor = await axios.get(API_URL+"search_emisor_guide")
      console.log(emisor,"aqui el emisor");
      if(rut_value){
        toast.info('Buscando datos, espere por favor...')
        if(!displayLoading){
          setDisplayLoading(true)
        }
        let receptor = await axios.get(API_URL+'search_receptor_guide/'+emisor.data.id+"/"+rut_value)
        console.log(receptor,"aqui el receptor");
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
  
            actividad_economica_transmitter_array: emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter : emisor.data.emisor.actividad_economica_seleccionada ? emisor.data.emisor.actividad_economica_seleccionada : emisor.data.emisor.actvidades_economicas[0][0],
            city_transmitter : emisor.data.emisor.ciudad_seleccionada,
            email_transmitter: emisor.data.emisor.correo,
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            address_transmitter:  emisor.data.emisor.direccion_seleccionada,
            address_transmitter_array: emisor.data.emisor.direcciones[0],
            business_name_transmitter : emisor.data.emisor.razon_social,
            rut_transmitter : props.configGeneral.enterprise.rut,  
            spin_transmitter: emisor.data.emisor.giro,
            type_transfer_trasmitter_array: API_FACTURACION ? emisor.data.tipos_de_traslado : emisor.data.tipos_de_venta,
            type_transfer_trasmitter: API_FACTURACION ? emisor.data.tipos_de_traslado.length > 0 ? emisor.data.tipos_de_traslado[0].id : "" : "",
            facturaId: API_FACTURACION ? emisor.data.id : "",//result.data.facturaID,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter: emisor.data.emisor.tipos_de_venta.length > 0 ? emisor.data.emisor.tipos_de_venta[0][0] : '',
            facturaId : emisor.data.id,
  
            rut_client: receptor.data.receptor.rut+"-"+receptor.data.receptor.dv,
            business_name_client: receptor.data.receptor.razon_social,
            address_client_array: receptor.data.receptor.direcciones[0],
            address_client: receptor.data.receptor.direccion_seleccionada,
            comuna_client: receptor.data.receptor.comuna_seleccionada,
            city_client: receptor.data.receptor.ciudad_seleccionada,
            spin_client_array: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor : [receptor.data.girosReceptor],
            spin_client: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor[0].nombre : receptor.data.girosReceptor.nombre,
            type_buy_client_array: Array.isArray(receptor.data.TipoDeCompra) ? receptor.data.TipoDeCompra : [receptor.data.TipoDeCompra] ,
            type_buy_client: receptor.data.receptor.tipoDeCompraId.toString(),
          })
        })
        setDisplayLoading(false)
      }else{
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
            actividad_economica_transmitter_array: emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter : emisor.data.emisor.actividad_economica_seleccionada ? emisor.data.emisor.actividad_economica_seleccionada : emisor.data.emisor.actvidades_economicas[0][0],
            city_transmitter : emisor.data.emisor.ciudad_seleccionada,
            email_transmitter: emisor.data.emisor.correo,
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            address_transmitter:  emisor.data.emisor.direccion_seleccionada,
            address_transmitter_array: emisor.data.emisor.direcciones[0],
            business_name_transmitter : emisor.data.emisor.razon_social,
            rut_transmitter : props.configGeneral.enterprise.rut,  
            spin_transmitter: emisor.data.emisor.giro,
            type_transfer_trasmitter_array: API_FACTURACION ? emisor.data.tipos_de_traslado : emisor.data.tipos_de_venta,
            type_transfer_trasmitter: API_FACTURACION ? emisor.data.tipos_de_traslado.length > 0 ? emisor.data.tipos_de_traslado[0].id : "" : "",
            facturaId: API_FACTURACION ? emisor.data.id : "",//result.data.facturaID,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter: emisor.data.emisor.tipos_de_venta.length > 0 ? emisor.data.emisor.tipos_de_venta[0][0] : '',
            facturaId : emisor.data.id,
          })
        })
        setDisplayLoading(false)
      }
    } catch (error) {
      console.log(error,"aqui ========================");
      toast.error("No se ha podido cargar la guía , intentelo de nuevo por favor")
      setTimeout(() => {
        props.history.goBack()
      },1500)
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
    //setDisplayLoading(true)
    axios.put(API_URL+'cotizacion_facturar_guide/'+props.match.params.id,object_post).then(result => {
      setDisableButton(false)
      setDisplayLoading(false)
      handleModalInvoice()
      toast.success('Guía guardada con éxito')
      toast.info('Generando pdf de la Guía, espere por favor...')
      result.data.forEach((item, i) => {
        if(item) window.open(item.pdf_public_url,'_blank')
      });
      goToDashboard()

    }).catch(err => {
      //setDisplayLoading(false)
      setDisableButton(false)
      props.tokenExpired(err)
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
      type_document: 'HES',
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
    fetchData(true)
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
          {displayLoading ? (
            <LoadingComponent />
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
                      configGeneral={props.configGeneral}
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
                    label='Fecha de Emisión (MM-DD-YYYY)'
                    name='date_issue_invoice'
                    required={true}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
                    value={cotizationData.date_issue_invoice}
                    handleChange={onChange}
                  />
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
