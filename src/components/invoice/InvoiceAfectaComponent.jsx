import React, { useState, useEffect } from 'react'
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
  Image
} from 'react-bootstrap'
import { API_URL, FRONT_URL } from 'utils/constants'
import { FaTrash, FaSearch,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt, FaUser, FaUsers, FaBook } from 'react-icons/fa'
import Table from 'components/Table'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import { showPriceWithDecimals } from 'utils/functions'
import * as moment from 'moment-timezone'
import InputField from 'components/input/InputComponent'
import { connect } from 'react-redux'
import styled from 'styled-components'
import layoutHelpers from 'shared/layouts/helpers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TableProductsCotization from 'components/TableProductsCotization'
import {formatRut} from 'utils/functions'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import GastosComponent from 'components/invoice/GastosComponent'

let DetailCotizacion = null


const InvoiceAfectaComponent = (props) => {

  const [displaySection, setDisplaySection] = useState(1)

  useEffect(() => {

    if(props.cotizationData.type_invoicing === true){
      searchReceptorEmisor()
    }
  },[props.cotizationData.type_invoicing])


  const goBackSelection = () => {
    props.setCotizationData({...props.cotizationData, type_invoicing : 3})

  }

  const searchReceptorEmisor = () => {

     toast.info('Buscando datos del emisor')
     axios.get(API_URL+'get_transmitter_invoice').then(transmitter => {

      props.setCotizationData(oldData => {
        return Object.assign({},oldData,{
          actividad_economica_transmitter_array: transmitter.data.emisor.actvidades_economicas,
          actividad_economica_transmitter : transmitter.data.emisor.actvidades_economicas.length > 0 ? transmitter.data.emisor.actvidades_economicas[0].actvidad1 : props.configGeneral.actividad_economica,
          city_transmitter : transmitter.data.emisor.ciudad_seleccionada,
          comuna_transmitter: transmitter.data.emisor.comuna_seleccionada,
          address_transmitter:  transmitter.data.emisor.direccion_seleccionada,
          address_transmitter_array: transmitter.data.emisor.direcciones,
          business_name_transmitter : transmitter.data.emisor.razon_social,
          rut_transmitter : transmitter.data.emisor.rut +"-"+transmitter.data.emisor.dv,
          type_sale_transmitter_array: transmitter.data.emisor.tipos_de_venta,
          type_sale_transmitter: transmitter.data.emisor.tipos_de_venta.length > 0 ? transmitter.data.emisor.tipos_de_venta[0].tipo1 : '',
          facturaId: transmitter.data.facturaId,
          token: transmitter.data.token,
          searchReceptorDefault : true
        })
      })

      setTimeout(function () {
        setDisplaySection(2)
      }, 400);
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
     })
  }

  return (
    <React.Fragment>
      {displaySection !== 1 ? (
        <React.Fragment>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Accordion defaultActiveKey="2">
                <TransmitterInvoiceComponent
                  isType="facturacion"
                  cotizationData={props.cotizationData}
                  setCotizationData={props.setCotizationData}
                  onChange={props.onChange}
                  />
                <ClientInvoiceComponent
                  isType="facturacion"
                  cotizationData={props.cotizationData}
                  setCotizationData={props.setCotizationData}
                  setIsShowModalClient={props.setIsShowModalClient}
                  handleModalSeller={props.handleModalSeller}
                  handleModalContacts={props.handleModalContacts}
                  clients={props.clients}
                  onChange={props.onChange}
                  />
                <RefComponent
                  onChangeTableRef={props.onChangeTableRef}
                  refCotizacion={props.refCotizacion}
                  removeProductRef={props.removeProductRef}
                  addRef={props.addRef}
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
                          checked={props.cotizationData.total_with_iva}
                          onChange={props.onChange}
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
                          checked={!props.cotizationData.total_with_iva}
                          onChange={props.onChange}
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
                      value={props.cotizationData.price_list}
                      handleChange={props.onChange}
                      >
                      <option value="">--Seleccione--</option>
                    </InputField>
                  </Row>
                </Col>
              </Row>
              <TableProductsCotization setDetailProducts={props.setDetailProducts} detailProducts={props.detailProducts} isShowIva={props.cotizationData.total_with_iva}/>
              <Row className="justify-content-center">
                <Col sm={1} md={1} lg={1}>
                  <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Producto a la Factura</Tooltip>}>
                    <DropdownButton size="sm" variant="danger" id={'dropdown_product'} title={(<FaPlusCircle />)} className="button_product">
                      <Dropdown.Item onClick={() => props.setIsShowModalProduct(true) }>Agregar Producto desde Inventario</Dropdown.Item>
                      <Dropdown.Item onClick={() => props.addNewProductIrregular(true)}>Agregar producto irregular con precio neto </Dropdown.Item>
                      <Dropdown.Item onClick={() => props.addNewProductIrregular(false)}>Agregar producto irregular con iva</Dropdown.Item>
                    </DropdownButton>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ======================================================= */}
          <hr/>
          <GastosComponent
            gastosDetail={props.gastosDetail}
            setGastosDetail={props.setGastosDetail}
            configGeneral={props.configGeneral}
            setIsShowModalGastos={props.setIsShowModalGastos}
            />
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
              value={props.cotizationData.date_issue_invoice}
              handleChange={props.onChange}
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
              value={props.cotizationData.days_expiration}
              handleChange={props.onChange}
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
              value={props.cotizationData.way_of_payment}
              handleChange={props.onChange}
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
              value={props.cotizationData.discount_global}
              handleChange={props.onChange}
              />
          </Row>
          <TableTotalComponent
            configGeneral={props.configGeneral}
            configStore={props.configStore}
            gastosDetail={props.gastosDetail}
            detailProducts={props.detailProducts}
            cotizationData={props.cotizationData}
            isType={"facturacion"}
            />
          <br/>
          <Row className="justify-content-center">
            <Col sm={3} md={3} lg={3}>
              {props.submitData ? (
                <Button variant="secondary" size="sm" block={true} type="button" onClick={props.submitData}>Emitir y Facturar</Button>
              ) : (
                <Button variant="secondary" size="sm" block={true} type="submit">Emitir y Facturar</Button>
              )}
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Button variant="danger" size="sm" block={true} type="button" onClick={props.goToDashboard}>Volver a la Tabla</Button>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Row>
          <Col sm={12} md={12} lg={12} className="text-center">
            <br/>
            <Image src={require('../../assets/img/loading.gif')} width="50" />
            <br/>
            Cargando Datos de la Factura...
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}


InvoiceAfectaComponent.propTypes = {
  setCotizationData: PropTypes.func.isRequired,
  cotizationData: PropTypes.object.isRequired,
  configGeneral: PropTypes.object,
  configStore: PropTypes.object,
  gastosDetail: PropTypes.array.isRequired,
  detailProducts: PropTypes.array.isRequired,
  setDetailProducts: PropTypes.func.isRequired,
  setGastosDetail: PropTypes.func.isRequired,
  setIsShowModalGastos: PropTypes.func.isRequired,
  setIsShowModalProduct: PropTypes.func.isRequired,
  addNewProductIrregular: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setIsShowModalClient: PropTypes.func.isRequired,
  handleModalSeller: PropTypes.func.isRequired,
  handleModalContacts: PropTypes.func.isRequired,
  clients : PropTypes.array.isRequired,
  onChangeTableRef: PropTypes.func.isRequired,
  refCotizacion: PropTypes.array.isRequired,
  removeProductRef: PropTypes.func.isRequired,
  addRef: PropTypes.func.isRequired,
  submitData : PropTypes.func,
}

export default InvoiceAfectaComponent
