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
import {formatRut} from 'utils/functions'
import TransmitterInvoiceComponent from 'components/invoice/TransmitterInvoiceComponent'
import ClientInvoiceComponent from 'components/invoice/ClientInvoiceComponent'
import TableTotalComponent from 'components/invoice/TableTotalComponent'
import RefComponent from 'components/invoice/RefComponent'
import GastosComponent from 'components/invoice/GastosComponent'
import ProductTableComponent from 'components/invoice/ProductTableComponent'
import LoadingComponent from 'components/LoadingComponent'

const InvoiceExcentasComponent = (props) => {

  const [readonly,setReadonly] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

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

  const searchReceptorEmisor = async (rut = false) => {
    try{
      let rut_search = rut ? rut : props.cotizationData.rut_client_search
      toast.info('Preparando Facturación')
      let emisor = await axios.get(API_URL+"get_transmitter_invoice_excenta")
      if(rut_search){
        let receptor = await axios.get(API_URL+"get_receptor_invoice_excenta/"+emisor.data.id+"/"+rut_search)
        props.setCotizationData(oldData => {
          return Object.assign({},oldData,{
            rut_transmitter: props.configStore ? props.configStore.rut : '',
            business_name_transmitter: emisor.data.emisor.razon_social,
            address_transmitter_array : emisor.data.emisor.direcciones[0],
            address_transmitter : emisor.data.emisor.direccion_seleccionada ? emisor.data.emisor.direccion_seleccionada : emisor.data.emisor.direcciones[0].length ? emisor.data.emisor.direcciones[0][0] : "",
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            city_transmitter: emisor.data.emisor.ciudad_seleccionada,
            phone_transmitter : emisor.data.emisor.numero_telefonico,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter : emisor.data.emisor.tipos_de_venta.length ? emisor.data.emisor.tipos_de_venta[0][0] : "", 
            email_transmitter: emisor.data.emisor.correo,
            spin_transmitter: emisor.data.emisor.giro,
            actividad_economica_transmitter_array: emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter: emisor.data.emisor.actividad_economica_seleccionada ? emisor.data.emisor.actividad_economica_seleccionada : emisor.data.emisor.actvidades_economicas.length ? emisor.data.emisor.actvidades_economicas[0][0] : "" ,
            rut_client : receptor.data.receptor.rut +"-"+ receptor.data.receptor.dv,
            business_name_client: receptor.data.receptor.razon_social,
            address_client_array: receptor.data.receptor.direcciones[0],
            address_client: receptor.data.receptor.direccion_seleccionada,
            comuna_client: receptor.data.receptor.comuna_seleccionada,
            city_client: receptor.data.receptor.ciudad_seleccionada,
            spin_client: receptor.data.girosReceptor[0].nombre,
            spin_client_array: receptor.data.girosReceptor,
            type_buy_client_array : receptor.data.TipoDeCompra,
            type_buy_client:  receptor.data.receptor.tipoDeCompraId.toString(),
            facturaId: emisor.data.id,
          })
        })
      }else{
        props.setCotizationData(oldData => {
          return Object.assign({},oldData,{
            rut_transmitter: props.configStore ? props.configStore.rut : '',
            business_name_transmitter: emisor.data.emisor.razon_social,
            address_transmitter_array : emisor.data.emisor.direcciones[0],
            address_transmitter : emisor.data.emisor.direccion_seleccionada ? emisor.data.emisor.direccion_seleccionada : emisor.data.emisor.direcciones[0].length ? emisor.data.emisor.direcciones[0][0] : "",
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            city_transmitter: emisor.data.emisor.ciudad_seleccionada,
            phone_transmitter : emisor.data.emisor.numero_telefonico,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter : emisor.data.emisor.tipos_de_venta.length ? emisor.data.emisor.tipos_de_venta[0][0] : "", 
            email_transmitter: emisor.data.emisor.correo,
            spin_transmitter: emisor.data.emisor.giro,
            actividad_economica_transmitter_array: emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter: emisor.data.emisor.actividad_economica_seleccionada ? emisor.data.emisor.actividad_economica_seleccionada : emisor.data.emisor.actvidades_economicas.length ? emisor.data.emisor.actvidades_economicas[0][0] : "" ,
            facturaId: emisor.data.id,
          })
        })
      }
      setIsLoading(false)
    }catch(e){
      toast.error("Ha ocurrido un error al cargar la factura, intente de nuevo")
      setTimeout(() => {
        props.history.goBack()
      },1500)
      
    }
  }

  return (
    <React.Fragment>
      {
        isLoading ? (
          <LoadingComponent />
        ) : (
          <>
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
          </>
        )
      }
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
  products : PropTypes.array.isRequired,
  listData: PropTypes.array,
  setProducts : PropTypes.array,
}

export default InvoiceExcentasComponent
