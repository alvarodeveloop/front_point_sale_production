import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import ReportDetailAccount from 'components/ReportDetailAccount'
import ReportDetailCenterCoste from 'components/ReportDetailCenterCoste'

const FlowCashReportDetailPage = (props) => {
  useEffect(() => {
    
  },[])
  return (
    <Container>
      <Row className="justif">
        <Col sm={12} md={12} lg={12}>
          <Tabs defaultActiveKey="account" id="uncontrolled-tab-example">
            <Tab eventKey="account" title="Reporte Cuentas">
              <ReportDetailAccount {...props} />
            </Tab>
            <Tab eventKey="center_coste" title="Reporte Centro de Costos">
              <ReportDetailCenterCoste {...props} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default FlowCashReportDetailPage
