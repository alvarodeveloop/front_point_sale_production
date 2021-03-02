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
import { API_URL } from 'utils/constants'
import { FaPlusCircle } from 'react-icons/fa'
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
import {formatRut} from 'utils/functions'
import { connect } from 'react-redux'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import TableBondsBillComponent from 'components/invoice/TableBondsBillComponent'
import GastosComponent from 'components/invoice/GastosComponent'
import ProductTableComponent from 'components/invoice/ProductTableComponent'
import LoadingComponent from 'components/LoadingComponent'

import {OBJECT_COTIZATION} from 'utils/constants'

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
  const [displayLoading, setDisplayLoading] = useState(true)
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
  const [detailBonds, setDetailBonds] = useState([])
  const [listData, setListData] = useState([])
  const [cotizationData, setCotizationData] = useState(
    Object.assign({},OBJECT_COTIZATION,{
      date_issue: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      date_expiration: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      type_invoicing: true,
      type : 3,
      date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
      fetchTransmitter : false,
      id_branch_office: props.id_branch_office
  }))
  const [displayModals,setDisplayModals] = useState(false)
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false)
  const [refCotizacion, setRefCotizacion] = useState([])
  const [isShowModalStoreCotizacion, setShowModalStoreCotizacion] = useState(false)
  const [typeBond,setTypeBond] = useState([])
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
          props.history.replace('/config/config_general')
        }, 3000);
      }
    }else{
      let config_general = props.configGeneral
      if(!config_general.is_syncronized){
        toast.error('Su cuenta no esta sincronizada con el SII, complete su configuración general para usar este módulo')
        setTimeout(function () {
          props.history.replace('/config/config_general')
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
        setDisplayModals(true)
      }else{
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
      }
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

  const fetchData = (onlyClient = false , isUpdate = false) => {
    if(!displayLoading){
      setDisplayLoading(true)
    }
    let promises = null
    let rut = props.configGeneral.enterprise.rut.split('-')[0]
    let dv  = props.configGeneral.enterprise.rut.split('-')[1]
    if(onlyClient){
      promises = [axios.get(API_URL+'client')]
    }else if(isUpdate){
      promises = [
        axios.get(API_URL+'client'),
        axios.get(API_URL+'product'),
        axios.get(API_URL+'type_bond'),
        axios.get(API_URL+'search_receptor/'+rut+'/'+dv),
        axios.get(API_URL+'cotizacion/'+props.match.params.id),
        axios.get(API_URL+'listProduct'),
      ]
    }

    Promise.all(promises).then(result => {
      setClients(result[0].data)
      if(result.length >= 2){
        setProducts(result[1].data)
        setTypeBond(result[2].data)

        if(isUpdate){
          setListData(result[5].data);
          setGastosDetail(result[4].data.gastos)
          setDetailProducts(result[4].data.products)
          setCotizationData(oldData => {
            return Object.assign({},oldData,{
              rut_transmitter: result[3].data.rut+"-"+result[3].data.dv,
              business_name_transmitter: result[3].data.razon_social,
              address_transmitter_array: result[3].data.direcciones[0],
              address_transmitter : result[3].data.direccion_seleccionada,
              comuna_transmitter: result[3].data.comuna_seleccionada,
              city_transmitter: result[3].data.ciudad_seleccionada,
              fetchTransmitter: true,

              country_transmitter: result[4].data.country_transmitter ? result[4].data.country_transmitter : props.configStore.country,
              email_transmitter: result[4].data.email_transmitter ? result[4].data.email_transmitter : props.configStore.email,
              phone_transmitter: result[4].data.phone_transmitter ? result[4].data.phone_transmitter : props.configStore.phone,
              actividad_economica_transmitter: result[4].data.actividad_economica_transmitter ? result[4].data.actividad_economica_transmitter : props.configGeneral.actividad_economica,
              spin_transmitter : result[4].data.spin_transmitter ? result[4].data.spin_transmitter : props.configGeneral.giro,
              comment: result[4].data.comment,
              date_issue_invoice: result[4].data.date_issue_invoice ? moment(result[4].data.date_issue_invoice).tz('America/Santiago').format('YYYY-MM-DD') : moment().tz('America/Santiago').format('YYYY-MM-DD'),
              type_api: result[4].data.type_api,
              rut_client: result[4].data.rut_client,
              business_name_client: result[4].data.business_name_client,
              address_client: result[4].data.address_client,
              actividad_economica_client: result[4].data.actividad_economica_client,
              city_client : result[4].data.city_client,
              name_contact: result[4].data.name_contact,
              phone_contact: result[4].data.phone_contact,
              email_contact: result[4].data.email_contact,
              name_seller: result[4].data.name_seller,
              phone_seller: result[4].data.phone_seller,
              email_seller: result[4].data.email_seller,
              total_with_iva : result[4].data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
              price_list: "",
              status: result[4].data.status,
              ref: result[4].data.ref,
              way_of_payment: result[4].data.way_of_payment ? result[4].data.way_of_payment : 1,
              discount_global: result[4].data.discount_global,
              days_expiration: result[4].data.days_expiration,
              id_branch_office : result[4].data.id_branch_office,
              comuna_client: result[4].data.comuna_client,
              city_client: result[4].data.city_client,
              spin_client: result[4].data.spin_client,
              type_buy_client: result[4].data.type_buy_client,
              type_sale_transmitter: result[4].data.type_sale_transmitter,
            })
          })
        }else{
          setCotizationData(oldData => {
            return Object.assign({},oldData,{
              rut_transmitter: result[3].rut+"-"+result[3].dv,
              business_name_transmitter: result[3].razon_social,
              address_transmitter_array: result[3].direcciones,
              address_transmitter : result[3].direccion_seleccionada,
              comuna_transmitter: result[3].comuna_seleccionada,
              city_transmitter: result[3].ciudad_seleccionada,
              fetchTransmitter: true,
            })
          })
        }
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      if(err.response && err.response.status !== 400){
        props.history.replace("/quotitation/search_quotitation");
      }else{
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
    setDisplayLoading(true)
    axios.put(API_URL+'cotizacion_facturar/'+props.match.params.id,object_post).then(result => {
      toast.success('Boleta hecha con éxito')
      setDisableButton(false)
      setDisplayLoading(false)
      toast.info('Generando pdf de la boleta, espere por favor...')
      result.data.response.forEach((item, i) => {
        if(item){
          window.open(item.url,'_blank')
        }
      });
      setTimeout(() => {
        goToDashboard()
      },1500)
    }).catch(err => {
      setDisplayLoading(false)
      setDisableButton(false)
      props.tokenExpired(err)
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
  },[detailProducts,gastosDetail])

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

CotizationBillPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
}

export default connect(mapStateToProps,{})(CotizationBillPage)
