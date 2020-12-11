import React, {useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {API_URL} from 'utils/constants'
import { FaFileAlt } from 'react-icons/fa'
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  Accordion,
  Card,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import * as moment from 'moment-timezone'
import Table from 'components/Table'
import {showPriceWithDecimals} from 'utils/functions'


const InvoiceBondComponent = ({invoice,...props}) => {

  return (
    <Row>
      <Col sm={12} md={12} lg={12}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
              <b>Datos del Documento</b> <FaFileAlt /> ( hacer click para ocultar la información )
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Fecha de Emisión</b>
                    <br/>
                    {invoice ? moment(invoice.date_issue_invoice).format('DD-MM-YYYY')  : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Nombre del Tramitador</b>
                    <br/>
                    {invoice ? invoice.business_name_transmitter : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Rut del Tramitador</b>
                    <br/>
                    {invoice ? invoice.rut_transmitter : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Email del Tramitador</b>
                    <br/>
                    {invoice ? invoice.email_transmitter : ''}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Razón Social</b>
                    <br/>
                    {invoice ? invoice.business_name_client : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Rut Cliente</b>
                    <br/>
                    {invoice ? invoice.rut_client : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Nombre Contacto</b>
                    <br/>
                    {invoice ? invoice.name_contact : ''}
                  </Col>
                  {props.isGuide ? (
                    <Col sm={3} md={3} lg={3} className="text-center">
                      <b>Dirección Contacto</b>
                      <br/>
                      {invoice ? invoice.address_client : ''}
                    </Col>
                  ) : (
                    <Col sm={3} md={3} lg={3} className="text-center">
                      <b>Email Contacto</b>
                      <br/>
                      {invoice ? invoice.email_contact : ''}
                    </Col>
                  )}
                </Row>
                <br/>
                <Row>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Neto</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.total_product)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Iva</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.total_iva)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Descuento al Neto</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.discount_global_amount)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total a Pagar</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.total_balance_without_gastos)}</Badge> : ''}
                  </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Saldo Abonado</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.total_bond)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Saldo Pendiente</b>
                    <br/>
                    {invoice ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,invoice.debit_balance)}</Badge> : ''}
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  )
}

InvoiceBondComponent.propTypes = {
  invoice : PropTypes.any,
  configStore: PropTypes.object.isRequired,
  configGeneral: PropTypes.object.isRequired,
  isGuide: PropTypes.bool,
}

export default InvoiceBondComponent
