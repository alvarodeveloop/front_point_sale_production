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
  Form
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

const InvoiceExcentasComponent = (props) => {

  const [displaySection,setDisplaySection] = useState(1)
  const [readonly,setReadonly] = useState(true)

  useEffect(() => {

    if(props.cotizationData.type_invoicing === false){
      searchReceptorEmisor(props.cotizationData.rut_client)
    }
  },[props.cotizationData.type_invoicing])



  const onChangeLocal = e => {
    props.setCotizationData({...props.cotizationData,[e.target.name] : formatRut(e.target.value)})

  }

  const goBackSelection = () => {
    props.setCotizationData({...props.cotizationData, type_invoicing : 3})

  }

  const searchReceptorEmisor = (rut = false) => {
    let rut_search = rut ? rut : props.cotizationData.rut_client_search
    if(rut_search){
      toast.info('Preparando Facturación')
       axios.get(API_URL+'get_transmitter_invoice_excenta/'+rut_search).then(result => {

        props.setCotizationData(oldData => {
          return Object.assign({},oldData,{
            rut_transmitter: props.configStore ? props.configStore.rut : '',
            business_name_transmitter: result.data.emisor.razon_social,
            address_transmitter_array : result.data.emisor.direcciones,
            direccion_seleccionada : result.data.emisor.direccion_seleccionada,
            comuna_transmitter: result.data.emisor.comuna_seleccionada,
            city_transmitter: result.data.emisor.ciudad_seleccionada,
            phone_transmitter : result.data.emisor.numero_telefonico,
            type_sale_transmitter_array: result.data.emisor.tipos_de_venta,
            email_transmitter: result.data.emisor.correo,
            spin_transmitter: result.data.emisor.giro,
            actividad_economica_transmitter_array: result.data.emisor.actvidades_economicas,
            actividad_economica_transmitter: result.data.emisor.actividad_economica_seleccionada,
            rut_client : result.data.receptor.rut +"-"+ result.data.receptor.dv,
            business_name_client: result.data.receptor.razon_social,
            address_client_array: result.data.receptor.direcciones,
            comuna_client: result.data.receptor.comuna_seleccionada,
            city_client: result.data.receptor.ciudad_seleccionada,
            spin_client: result.data.receptor.giro_seccionado,
            spin_client_array: result.data.receptor.giros,
            name_contact : result.data.receptor.contacto,
            facturaId: result.data.facturaID
          })
        })

        setTimeout(function () {
          setDisplaySection(2)
        }, 1000);

       }).catch(err => {
         if(err.response){
           toast.error(err.response.data.message)
         }else{
           console.log(err);
           toast.error('Error, contacte con soporte')
         }
       })
    }else{
      toast.info('Debe ingresar el rut del cliente para cargar la factura')
      setReadonly(false)
    }
  }

  return (
    <React.Fragment>
      {displaySection == 1 ? (
        <React.Fragment>
          <Row className="justify-content-center">
            <InputField
              type='text'
              label='Ingrese el rut del cliente'
              name='rut_client_search'
              readonly={readonly}
              required={true}
              messageErrors={[
                'Requerido*'
              ]}
              cols='col-md-4 col-lg-4 col-sm-4'
              value={props.cotizationData.rut_client_search}
              handleChange={onChangeLocal}
              />
          </Row>
          <Row className="justify-content-center">
            <Col sm={3} md={3} lg={3}>
              <Button variant="danger" block={true} onClick={searchReceptorEmisor} size="sm">Buscar <FaSearch /></Button>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Button variant="secondary" block={true} onClick={goBackSelection} size="sm">Volver</Button>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
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
      )}
    </React.Fragment>
  )
}

InvoiceExcentasComponent.propTypes = {
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

export default InvoiceExcentasComponent
