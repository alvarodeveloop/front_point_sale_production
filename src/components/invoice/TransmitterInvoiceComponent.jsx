import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Accordion,
  Card,
} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'
import LoadingComponent from 'components/LoadingComponent'
import { arrayCotizacion,arraySaleNote, arrayBoleta, arrayGuide,arrayInvoice } from 'utils/constants';

const TransmitterInvoiceComponent = (props) => {
  
  let arrayInvoiceMerge = [...arrayInvoice,...arraySaleNote];


  useEffect(() => {
    setTimeout(function () {
      props.setCotizationData(oldData => {
        return Object.assign({},oldData,{
          business_name_transmitter : props.configGeneral && !oldData.bussines_name ? props.configGeneral.enterprise.bussines_name : oldData.bussines_name,
          rut_transmitter : props.configGeneral && !oldData.rut_transmitter ? props.configGeneral.enterprise.rut : oldData.rut_transmitter,
          address_transmitter : props.configGeneral && !oldData.address_transmitter ? props.configGeneral.enterprise.address : oldData.address_transmitter,
          city_transmitter : props.configGeneral && !oldData.city_transmitter ? props.configGeneral.enterprise.city : oldData.city_transmitter,
          comuna_transmitter : props.configGeneral && !oldData.comuna_transmitter ? props.configGeneral.enterprise.comuna : oldData.comuna_transmitter,
          spin_transmitter : props.configGeneral && !oldData.spin_transmitter ? props.configGeneral.enterprise.spin : oldData.spin_transmitter,
          email_transmitter : props.configGeneral && !oldData.email_transmitter ? props.configGeneral.enterprise.email_enterprise : oldData.email_transmitter,
          actividad_economica_transmitter : props.configGeneral && !oldData.actividad_economica_transmitter ? props.configGeneral.enterprise.actividad_economica : oldData.actividad_economica_transmitter,
          phone_transmitter : props.configGeneral && !oldData.phone_transmitter ? props.configGeneral.enterprise.phone : oldData.phone_transmitter,
        })
      })
    }, 1500);
  },[])

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
        <b>Datos del Emisor</b> <FaUser /> (hacer click para desplegar campos)
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        {arrayCotizacion.includes(props.isType) || arrayBoleta.includes(props.isType) ? (
          <Card.Body>
            {arrayBoleta.includes(props.isType) && props.cotizationData.fetchTransmitter ? (
              <LoadingComponent />
            ) : (
              <>
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
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.address_transmitter_array.map((v,i) => (
                        <option value={v} key={i}>{v}</option>
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
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.city_transmitter}
                    handleChange={props.onChange}
                  />
                  {arrayBoleta.includes(props.isType) ? (
                    <InputField
                      type='text'
                      label='Comuna'
                      name='comuna_transmitter'
                      required={false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.comuna_transmitter}
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
                      value={props.cotizationData.spin_transmitter}
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
                    value={props.cotizationData.email_transmitter}
                    handleChange={props.onChange}
                    />
                </Row>
                {arrayBoleta.includes(props.isType) ? (
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
                      value={props.cotizationData.actividad_economica_transmitter}
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
                      value={props.cotizationData.phone_transmitter}
                      handleChange={props.onChange}
                      />
                  </Row>
                )}
              </>
            )}
          </Card.Body>
        ) : arrayInvoiceMerge.includes(props.isType) ? (
          <Card.Body>
            <Row>
              <InputField
               type='text'
               label='Razón Social'
               name='business_name_transmitter'
               required={arraySaleNote.includes(props.isType) ? false : true}
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
                  required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType)  ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.address_transmitter}
                  handleChange={props.onChange}
                  >
                  <option value="">--Seleccione--</option>
                  {props.cotizationData.address_transmitter_array.map((v,i) => (
                    <option value={v} key={i}>{v}</option>
                  ))}
                </InputField>
              ): (
                <InputField
                  type='text'
                  label='Direccion'
                  name='address_transmitter'
                  required={props.isType === "facturacion" ? !props.cotizationData.type_invoicing ? true : false : false}
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
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.actividad_economica_transmitter}
                  handleChange={props.onChange}
                  >
                  <option>--Seleccione--</option>
                  {props.cotizationData.actividad_economica_transmitter_array.map((v,i) => (
                    <option value={v[0]} key={i}>{v[1]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Actividad Económica'
                  name='actividad_economica_transmitter'
                  required={!arraySaleNote.includes(props.isType) ? true : false}
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
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                  >
                  <option vcalue="">--Seleccione--</option>
                  {props.cotizationData.type_sale_transmitter_array.map((v,i) => (
                    <option value={v[0]} key={i}>{v[1]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Tipo de Venta'
                  name='type_sale_transmitter'
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                />
              )}
              <InputField
                  type='text'
                  label='Giro'
                  name='spin_transmitter'
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.spin_transmitter}
                  handleChange={props.onChange}
                />
            </Row>
          </Card.Body>
        ) : arrayGuide.includes(props.isType) ? (

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
                    <option value={v} key={i}>{v}</option>
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
               required={true}
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
               required={false}
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
                  required={arraySaleNote.includes(props.isType) ? false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.actividad_economica_transmitter}
                  handleChange={props.onChange}
                  >
                  <option>--Seleccione--</option>
                  {props.cotizationData.actividad_economica_transmitter_array.map((v,i) => (
                    <option value={v[0]} key={i}>{v[1]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Actividad Económica'
                  name='actividad_economica_transmitter'
                  required={arraySaleNote.includes(props.isType) ? false : true}
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
                  required={arraySaleNote.includes(props.isType) || arrayGuide.includes(props.isType) ? false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                  >
                  <option value="">--Seleccione--</option>
                  {props.cotizationData.type_sale_transmitter_array.map((v,i) => (
                    <option value={v[0]} key={i}>{v[1]}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Tipo de Venta'
                  name='type_sale_transmitter'
                  required={arraySaleNote.includes(props.isType) || arrayGuide.includes(props.isType) ? false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_sale_transmitter}
                  handleChange={props.onChange}
                  />
              )}
              {props.cotizationData.type_transfer_trasmitter_array.length > 0 ? (
                <InputField
                  type='select'
                  label='Tipo de Traslado'
                  name='type_transfer_trasmitter'
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_transfer_trasmitter}
                  handleChange={props.onChange}
                  >
                    <option value="">--Seleccione--</option>
                  {props.cotizationData.type_transfer_trasmitter_array.map((v,i) => (
                    <option value={v.id} key={i}>{v.valor}</option>
                  ))}
                </InputField>
              ) : (
                <InputField
                  type='text'
                  label='Tipo de Traslado'
                  name='type_transfer_trasmitter'
                  required={!arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.type_transfer_trasmitter}
                  handleChange={props.onChange}
                  />
              )}
              <InputField
                  type='text'
                  label='Giro'
                  name='spin_transmitter'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.spin_transmitter}
                  handleChange={props.onChange}
              />
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