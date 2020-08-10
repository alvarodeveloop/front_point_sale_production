import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Tab,
  Tabs
} from 'react-bootstrap'
import FlowCashReportGeneralPage from 'pages/FlowCashReportGeneralPage'
import FlowCashReportDetailPage from 'pages/FlowCashReportDetailPage'

const FlowCashReport = (props) => {
  return (
    <Container>
      <Row className="justif">
        <Col sm={12} md={12} lg={12}>
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
            <Tab eventKey="general" title="Reporte General">
              <FlowCashReportGeneralPage {...props} />
            </Tab>
            <Tab eventKey="detailed" title="Reporte Detallado">
              <FlowCashReportDetailPage {...props} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default FlowCashReport
