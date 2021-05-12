import React, {useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import { FaFileAlt } from 'react-icons/fa'
import {
  Row,
  Col,
  Badge,
  Accordion,
  Card,
} from 'react-bootstrap'
import * as moment from 'moment-timezone'
import {showPriceWithDecimals} from 'utils/functions'


const InvoiceBondComponent = ({document,...props}) => {

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
                    {document ? moment(document.date_issue_invoice).format('DD-MM-YYYY')  : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Nombre del Tramitador</b>
                    <br/>
                    {document ? document.business_name_transmitter : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Rut del Tramitador</b>
                    <br/>
                    {document ? document.rut_transmitter : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Email del Tramitador</b>
                    <br/>
                    {document ? document.email_transmitter : ''}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Razón Social</b>
                    <br/>
                    {document ? document.business_name_client : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Rut Cliente</b>
                    <br/>
                    {document ? document.rut_client : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Nombre Contacto</b>
                    <br/>
                    {document ? document.name_contact : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Email Contacto</b>
                    <br/>
                    {document ? document.email_contact : ''}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Neto</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.total_product)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Iva</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.total_iva)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total Descuento al Neto</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.discount_global_amount)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Total a Pagar</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.total_balance_without_gastos)}</Badge> : ''}
                  </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Saldo Abonado</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.total_bond)}</Badge> : ''}
                  </Col>
                  <Col sm={3} md={3} lg={3} className="text-center">
                    <b>Saldo Pendiente</b>
                    <br/>
                    {document ? <Badge variant="info" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}} className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,document.debit_balance)}</Badge> : ''}
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
  document : PropTypes.any,
  configStore: PropTypes.object.isRequired,
  configGeneral: PropTypes.object.isRequired,
}

export default InvoiceBondComponent
