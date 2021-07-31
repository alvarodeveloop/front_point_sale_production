import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Accordion,
  Card
} from 'react-bootstrap'
import { FaTruckMoving } from 'react-icons/fa'
import InputField from 'components/input/InputComponent'

const TransferComponent = (props) => {
  return (
    <React.Fragment>
      {!props.isNotAccordeon ? (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="5" className="header_card">
            <b>Datos de Transporte</b> <FaTruckMoving /> (hacer click para desplegar campos)
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
              <Row>
                <InputField
                  type='text'
                  label='Rut del Transporte'
                  name='rut_transfer'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-3 col-sm-6'
                  value={props.cotizationData.rut_transfer}
                  handleChange={props.onChange}
                />
                <InputField
                  type='text'
                  label='Patente del Transporte'
                  name='patent_transfer'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-3 col-sm-6'
                  value={props.cotizationData.patent_transfer}
                  handleChange={props.onChange}
                />
                <InputField
                  type='text'
                  label='Rut del Chofer'
                  name='rut_driver'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-3 col-sm-6'
                  value={props.cotizationData.rut_driver}
                  handleChange={props.onChange}
                />
                <InputField
                  type='text'
                  label='Nombre del Chofer'
                  name='name_driver'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-3 col-sm-6'
                  value={props.cotizationData.name_driver}
                  handleChange={props.onChange}
                />
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : (
        <Row>
          <InputField
            type='text'
            label='Rut del Transporte'
            name='rut_transfer'
            required={false}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-3 col-sm-6'
            value={props.cotizationData.rut_transfer}
            handleChange={props.onChange}
          />
          <InputField
            type='text'
            label='Patente del Transporte'
            name='patent_transfer'
            required={false}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-3 col-sm-6'
            value={props.cotizationData.patent_transfer}
            handleChange={props.onChange}
          />
          <InputField
            type='text'
            label='Rut del Chofer'
            name='rut_driver'
            required={false}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-3 col-sm-6'
            value={props.cotizationData.rut_driver}
            handleChange={props.onChange}
          />
          <InputField
            type='text'
            label='Nombre del Chofer'
            name='name_driver'
            required={false}
            messageErrors={[
              'Requerido*'
            ]}
            cols='col-md-4 col-lg-3 col-sm-6'
            value={props.cotizationData.name_driver}
            handleChange={props.onChange}
          />
        </Row>
      )}
    </React.Fragment>
  )
}

TransferComponent.propTypes = {
  cotizationData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  isNotAccordeon: PropTypes.bool,
}
export default TransferComponent
