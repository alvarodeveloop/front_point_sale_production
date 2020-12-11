import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Accordion,
  Card,
  Col,
  Button,
  Image
} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'

const TransmitterInvoiceComponent = (props) => {
  const [clientSearched, setClientSearched] = useState(props.cotizationData.type_invoicing ? true : false)
  useEffect(() => {
    console.log(props.configGeneral,'aqui');
  },[])

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
        <b>Datos del Emisor</b> <FaUser /> (hacer click para desplegar campos)
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        {props.isType == "cotizacion" || props.isType == "boleta" ? (
          <Card.Body>
            {props.isType == "boleta" && !props.cotizationData.fetchTransmitter ? (
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <br/>
                  <Image src={require('../../assets/img/loading.gif')} width="30" />
                  <br/>
                  Cargando Documento...
                </Col>
              </Row>
            ) : ''}
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
                value={props.cotizationData.business_name_transmitter ? props.cotizationData.business_name_transmitter : props.configGeneral.enterprise.business_name}
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
                value={props.cotizationData.rut_transmitter ? props.cotizationData.rut_transmitter : props.configGeneral.enterprise.rut}
                handleChange={props.onChange}
                />
              {props.cotizationData.address_transmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Direccion'
                  name='address_transmitter'
                  required={false}
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
              ) : (
                <InputField
                  type='text'
                  label='Direccion'
                  name='address_transmitter'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.address_transmitter ? props.cotizationData.address_transmitter : props.configGeneral.enterprise.address}
                  handleChange={props.onChange}
                />
              )}
            </Row>
            <Row>
              <InputField
                type='text'
                label='Ciudad'
                name='city_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.city_transmitter ? props.cotizationData.city_transmitter : props.configGeneral.enterprise.city}
                handleChange={props.onChange}
              />
              {props.isType === "boleta" ? (
                <InputField
                  type='text'
                  label='Comuna'
                  name='comuna_transmitter'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.comuna_transmitter ? props.cotizationData.comuna_transmitter : props.configGeneral.enterprise.comuna}
                  handleChange={props.onChange}
                />
              ) : (
                <InputField
                  type='text'
                  label='Giro'
                  name='spin_transmitter'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.spin_transmitter ? props.cotizationData.spin_transmitter : props.configGeneral.enterprise.spin}
                  handleChange={props.onChange}
                />
              )}
              <InputField
                type='email'
                label='Email'
                name='email_transmitter'
                required={false}
                messageErrors={[
                  'Requerido*','Formato tipo email*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={props.cotizationData.email_transmitter ? props.cotizationData.email_transmitter : props.configGeneral.enterprise.email_enterprise}
                handleChange={props.onChange}
                />
            </Row>
            {props.isType === "boleta" ? (
              <Row>
                <InputField
                  type='text'
                  label='Actividad Económica'
                  name='actividad_economica_transmitter'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.actividad_economica_transmitter ? props.cotizationData.actividad_economica_transmitter : props.configGeneral.enterprise.actividad_economica}
                  handleChange={props.onChange}
                  />
              </Row>
            ) : (
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
                  value={props.cotizationData.phone_transmitter && props.cotizationData.phone_transmitter !== "0" ? props.cotizationData.phone_transmitter : props.configGeneral.enterprise.phone}
                  handleChange={props.onChange}
                  />
              </Row>
            )}
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
               value={props.cotizationData.business_name_transmitter ? props.cotizationData.business_name_transmitter : props.configGeneral.enterprise.business_name}
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
               value={props.cotizationData.rut_transmitter ? props.cotizationData.rut_transmitter : props.configGeneral.enterprise.rut}
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
                  value={props.cotizationData.address_transmitter ? props.cotizationData.address_transmitter : props.configGeneral.enterprise.address}
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
               value={props.cotizationData.city_transmitter ? props.cotizationData.city_transmitter : props.configGeneral.enterprise.city}
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
               value={props.cotizationData.comuna_transmitter ? props.cotizationData.comuna_transmitter : props.configGeneral.enterprise.comuna}
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
                  value={props.cotizationData.actividad_economica_transmitter ? props.cotizationData.actividad_economica_transmitter : props.configGeneral.enterprise.actividad_economica}
                  handleChange={props.onChange}
                />
              )}
            </Row>

            <Row>
              {props.isType !== "guide" ? (
                <React.Fragment>
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
                </React.Fragment>

              ) : (
                <React.Fragment>
                  {props.cotizationData.type_transfer_trasmitter_array.length > 0 ? (
                    <InputField
                      type='select'
                      label='Tipo de Traslado'
                      name='type_transfer_trasmitter'
                      required={true}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.type_transfer_trasmitter}
                      handleChange={props.onChange}
                      >
                      {props.cotizationData.type_transfer_trasmitter_array.map((v,i) => (
                        <option value={v['tipo'+(i+1)]} key={i}>{v['tipo'+(i+1)]}</option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type='text'
                      label='Tipo de Traslado'
                      name='type_transfer_trasmitter'
                      required={true}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.type_transfer_trasmitter}
                      handleChange={props.onChange}
                      />
                  )}
                </React.Fragment>
              )}
            </Row>
          </Card.Body>
        ) : props.isType == "guide" ? (

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
               value={props.cotizationData.business_name_transmitter ? props.cotizationData.business_name_transmitter : props.configGeneral.enterprise.business_name}
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
               value={props.cotizationData.rut_transmitter ? props.cotizationData.rut_transmitter : props.configGeneral.enterprise.rut}
               handleChange={props.onChange}
              />
              {props.cotizationData.address_transmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Direccion'
                  name='address_transmitter'
                  required={true}
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
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.address_transmitter ? props.cotizationData.address_transmitter : props.configGeneral.enterprise.address}
                  handleChange={props.onChange}
                />
              )}
            </Row>
            <Row>
              <InputField
               type='text'
               label='Ciudad'
               name='city_transmitter'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.city_transmitter ? props.cotizationData.city_transmitter : props.configGeneral.enterprise.city}
               handleChange={props.onChange}
              />
              <InputField
               type='text'
               label='Comuna'
               name='comuna_transmitter'
               required={false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={props.cotizationData.comuna_transmitter ? props.cotizationData.comuna_transmitter : props.configGeneral.enterprise.comuna}
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
                  value={props.cotizationData.actividad_economica_transmitter ? props.cotizationData.actividad_economica_transmitter : props.configGeneral.enterprise.actividad_economica}
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
        ) : '' }
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
