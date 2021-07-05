import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import InputField from 'components/input/InputComponent';
import { arrayInvoice, arraySaleNote, arrayBoleta, arrayGuide, arrayCotizacion } from 'utils/constants';

function ExtraDataComponent(props) {

  return (
    <>
      <h4 className="text-center title_principal">Fecha y datos extra</h4>
      <br />
      {arrayInvoice.includes(props.type) ? (
        <>
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
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={12} className="text-center">
              <b>Tipo de Documento</b>
            </Col>
            <Col sm={2} md={2} lg={2}>
              <Form.Group>
                <Form.Check
                  name="type_invoicing"
                  type={'radio'}
                  id={`radio-5`}
                  label={`Afecta`}
                  value={true}
                  checked={props.cotizationData.type_invoicing === true}
                  required={true}
                  onChange={props.onChange}
                />
              </Form.Group>
            </Col>
            <Col sm={2} md={2} lg={2} className="text-right">
              <Form.Group>
                <Form.Check
                  name="type_invoicing"
                  type={'radio'}
                  id={`radio-6`}
                  label={`Excenta`}
                  value={false}
                  required={true}
                  checked={props.cotizationData.type_invoicing === false}
                  onChange={props.onChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      ) : arrayCotizacion.includes(props.type) ? (
        <Row>
          <InputField
            type='date'
            label='Fecha de Emisión'
            name='date_issue'
            required={true}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
            value={props.cotizationData.date_issue}
            handleChange={props.onChange}
          />
          <InputField
            type='date'
            label='Fecha de Vencimiento (MM-DD-YYYY)'
            name='date_expiration'
            required={true}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
            value={props.cotizationData.date_expiration}
            handleChange={props.onChange}
          />
          <Col sm={4} md={4} lg={4}>
            <Row>
              <Col sm={12} md={12} lg={12} className="text-center">
                <b>Tipo Venta</b>
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6}>
                <Form.Group>
                  <Form.Check
                    name="type_effect"
                    type={'radio'}
                    id={`radio-5`}
                    label={`Afecta`}
                    value={true}
                    required={true}
                    checked={props.cotizationData.type_effect}
                    onChange={props.onChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={6} md={6} lg={6} className="text-right">
                <Form.Group>
                  <Form.Check
                    name="type_effect"
                    type={'radio'}
                    id={`radio-6`}
                    label={`Excento`}
                    value={false}
                    checked={!props.cotizationData.type_effect}
                    required={true}
                    onChange={props.onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <label htmlFor="">Comentario de la cotización (Opcional)</label>
            <textarea style={{ border: "1px solid #252e79" }} rows={3} name="comment" className="form-control" onChange={props.onChange} value={props.cotizationData.comment} />
          </Col>
        </Row>
      ) : arraySaleNote.includes(props.type) ? (
        <>
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
            <Col sm={4} md={4} lg={4}>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <b>Tipo de Documento</b>
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
                      checked={props.cotizationData.type_invoicing === true}
                      required={true}
                      onChange={props.onChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6} md={6} lg={6} className="text-right">
                  <Form.Group>
                    <Form.Check
                      name="type_invoicing"
                      type={'radio'}
                      id={`radio-6`}
                      label={`Excenta`}
                      value={false}
                      required={true}
                      checked={props.cotizationData.type_invoicing === false}
                      onChange={props.onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : arrayBoleta.includes(props.type) ? (
        <Row>
          <InputField
            type='date'
            label='Fecha de Emisión'
            name='date_issue'
            required={true}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
            value={props.cotizationData.date_issue}
            handleChange={props.onChange}
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
                    checked={props.cotizationData.type_invoicing === true}
                    required={true}
                    onChange={props.onChange}
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
                    checked={props.cotizationData.type_invoicing === false}
                    onChange={props.onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : arrayGuide.includes(props.type) ? (
        <Row className="justify-content-center">
          <InputField
            type='date'
            label='Fecha de Emisión'
            name='date_issue_invoice'
            required={true}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-4 col-sm-4 col-xs-12'
            value={props.cotizationData.date_issue_invoice}
            handleChange={props.onChange}
          />
        </Row>
      ) : ""}
    </>
  )
}

ExtraDataComponent.propTypes = {
  cotizationData: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string,
}

export default ExtraDataComponent

