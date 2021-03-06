import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Row,
  Col,
  Button,
  Accordion,
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import InputField from 'components/input/InputComponent'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import GastosComponent from 'components/invoice/GastosComponent'
import ProductTableComponent from 'components/invoice/ProductTableComponent'
import LoadingComponent from 'components/LoadingComponent'


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
            actividad_economica_transmitter : transmitter.data.emisor.actvidades_economicas.length > 0 ? transmitter.data.emisor.actvidades_economicas[0][0] : props.configGeneral.actividad_economica,
            city_transmitter : transmitter.data.emisor.ciudad_seleccionada,
            comuna_transmitter: transmitter.data.emisor.comuna_seleccionada,
            address_transmitter:  transmitter.data.emisor.direccion_seleccionada,
            address_transmitter_array: transmitter.data.emisor.direcciones[0],
            business_name_transmitter : transmitter.data.emisor.razon_social,
            spin_transmitter : transmitter.data.emisor.giro,
            type_sale_transmitter_array: transmitter.data.emisor.tipos_de_venta,
            type_sale_transmitter: transmitter.data.emisor.tipos_de_venta.length > 0 ? transmitter.data.emisor.tipos_de_venta[0][0] : '',
            facturaId: transmitter.data.id,
            token: transmitter.data.token,
            searchReceptorDefault : true
          })
        })

        setTimeout(function () {
          setDisplaySection(2)
        }, 400);
     }).catch(err => {
       props.setCotizationData({...props.cotizationData,type_invoicing: 3})
       setDisplaySection(1)
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
      {displaySection === 2 ? (
        <React.Fragment>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Accordion defaultActiveKey="2">
                <TransmitterInvoiceComponent
                  isType="facturacion"
                  cotizationData={props.cotizationData}
                  setCotizationData={props.setCotizationData}
                  onChange={props.onChange}
                  configGeneral={props.configGeneral}
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
          <ProductTableComponent
            setDetailProducts={props.setDetailProducts}
            detailProducts={props.detailProducts}
            cotizationData={props.cotizationData}
            setIsShowModalProduct={props.setIsShowModalProduct}
            setGastosDetail={props.setGastosDetail}
            onChange={props.onChange}
            products={props.products}
            listData={props.listData}
            setProducts={props.setProducts}
            {...props}
          />
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
              label='Fecha emisión de la factura (MM-DD-YYYY)'
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
      ) : displaySection === 1 ? (
        <LoadingComponent />
      ) : ''}
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
  products: PropTypes.array.isRequired,
  listData : PropTypes.array,
  setProducts : PropTypes.func,
}

export default InvoiceAfectaComponent
