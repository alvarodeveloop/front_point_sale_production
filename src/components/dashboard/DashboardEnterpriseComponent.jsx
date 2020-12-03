import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Button,
  Container
} from 'react-bootstrap'

const DashboardEnterpriseComponent = (props) => {

  const goToEnterpriseForm = () => {
    props.history.replace('/enterprise/form')
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4} md={4} lg={4}>
          <Button variant="secondary" block={true} size="sm" type="button" onClick={goToEnterpriseForm}>Crear Empresa</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardEnterpriseComponent
