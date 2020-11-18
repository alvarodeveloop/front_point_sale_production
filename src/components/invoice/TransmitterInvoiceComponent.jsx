import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Accordion,
  Card,
  Col,
  Button
} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'

const TransmitterInvoiceComponent = (props) => {
  const [clientSearched, setClientSearched] = useState(props.cotizationData.type_invoicing ? true : false)

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
        <b>Datos del Emisor</b> <FaUser /> (hacer click para desplegar campos)
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        {props.isType == "cotizacion" ? (
          <Card.Body>
            <Row>
              <InputField
                type='text'
                label='Razón Social'
                name='business_name_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.business_name_transmitter}
                handleChange={props.onChange}
                />
              <InputField
                type='text'
                label='Rut'
                name='rut_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.rut_transmitter}
                handleChange={props.onChange}
                />
              <InputField
                type='text'
                label='Direccion'
                name='address_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.address_transmitter}
                handleChange={props.onChange}
                />
            </Row>
            <Row>
              <InputField
                type='text'
                label='Giro'
                name='spin_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.spin_transmitter}
                handleChange={props.onChange}
                />
              <InputField
                type='text'
                label='Ciudad'
                name='city_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.city_transmitter}
                handleChange={props.onChange}
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
                value={props.cotizationData.email_transmitter}
                handleChange={props.onChange}
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
                value={props.cotizationData.phone_transmitter}
                handleChange={props.onChange}
                />
            </Row>
          </Card.Body>
        ) : props.isType == "facturacion" || props.isType == "sale_note" ? (
          <Card.Body>
            <Row>
              <InputField
               type='text'
               label='Razón Social'
               name='business_name_transmitter'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.business_name_transmitter}
               handleChange={props.onChange}
              />
              <InputField
               type='text'
               label='Rut'
               name='rut_transmitter'
               required={props.isType === "facturacion" ? !props.cotizationData.type_invoicing ? true : false : true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.rut_transmitter}
               handleChange={props.onChange}
              />
              {props.cotizationData.address_transmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Direccion'
                  name='address_transmitter'
                  required={!props.cotizationData.type_invoicing ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.address_transmitter}
                  handleChange={props.onChange}
                  >
                  {props.cotizationData.address_transmitter_array.map((v,i) => (
                    <option value={v['direccion'+(i+1)]} key={i}>{v['direccion'+(i+1)]}</option>
                  ))}
                </InputField>
              ): (
                <InputField
                  type='text'
                  label='Direccion'
                  name='address_transmitter'
                  required={props.isType === "facturacion" ? !props.cotizationData.type_invoicing ? true : false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.address_transmitter}
                  handleChange={props.onChange}
                />
              )}
            </Row>
            <Row>
              <InputField
               type='text'
               label='Ciudad'
               name='city_transmitter'
               required={props.isType === "facturacion" ? !props.cotizationData.type_invoicing ? true : false : false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.city_transmitter}
               handleChange={props.onChange}
              />
              <InputField
               type='text'
               label='Comuna'
               name='comuna_transmitter'
               required={props.isType === "facturacion" ? true : false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.comuna_transmitter}
               handleChange={props.onChange}
              />
              {props.cotizationData.actividad_economica_transmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Actividad Económica'
                  name='actividad_economica_transmitter'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.actividad_economica_transmitter}
                  handleChange={props.onChange}
                  >
                  {props.cotizationData.actividad_economica_transmitter_array.map((v,i) => (
                    <option value={v['actvidad'+(i+1)]} key={i}>{v['actvidad'+(i+1)]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Actividad Económica'
                  name='actividad_economica_transmitter'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.actividad_economica_transmitter}
                  handleChange={props.onChange}
                />
              )}
            </Row>
            <Row>
              {props.cotizationData.type_sale_transmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Tipo de Venta'
                  name='type_sale_transmitter'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                  >
                  {props.cotizationData.type_sale_transmitter_array.map((v,i) => (
                    <option value={v['tipo'+(i+1)]} key={i}>{v['tipo'+(i+1)]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Tipo de Venta'
                  name='type_sale_transmitter'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                />
              )}
            </Row>
          </Card.Body>
        ) : props.isType == "bill" ? (
          <h1>Boletas</h1>
        ) : (
          <h1>Guias</h1>
        )}
      </Accordion.Collapse>
    </Card>
  )
}

TransmitterInvoiceComponent.propTypes = {
  isType : PropTypes.string.isRequired,
  cotizationData : PropTypes.object.isRequired,
  setCotizationData : PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TransmitterInvoiceComponent