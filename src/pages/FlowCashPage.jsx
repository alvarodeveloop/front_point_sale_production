import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import { connect } from 'react-redux'
import FlowCashAccountPage from 'pages/FlowCashAccountPage'
import FlowCashCenterCostePage from 'pages/FlowCashCenterCostePage'
import FlowCashEarningPage from 'pages/FlowCashEarningPage'
import FlowCashExpensivePage from 'pages/FlowCashExpensivePage'

const FlowCashPage = (props) => {

  const [centerCostes , setCenterCostes] = useState([])
  const [accounts , setAccounts] = useState([])

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  const fetchData = () => {
    let promises = [
      axios.get(API_URL+'flow_cash_account'),
      axios.get(API_URL+'flow_cash_center_coste'),
    ]

    Promise.all(promises).then(result => {
      setAccounts(result[0].data)
      setCenterCostes(result[1].data)
    }).catch(err => {
      props.tokenExpired(err)
    })

  }

  return (
    <Container>
      <Row className="containerDiv">
        <Col sm={12} md={12} lg={12} xs={12}>
          <h4 className="title_principal">Flujo de Caja - Caja</h4>
          <hr/>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12}>
          <Tabs defaultActiveKey="center_coste" id="uncontrolled-tab-example">
            <Tab eventKey="center_coste" title="Centro de Costos">
              <FlowCashCenterCostePage  centerCostes={centerCostes} fetchData={fetchData}/>
            </Tab>
            <Tab eventKey="accounts" title="Cuentas">
              <FlowCashAccountPage accounts={accounts} fetchData={fetchData} />
            </Tab>
            <Tab eventKey="earning" title="Ingresos">
              <FlowCashEarningPage accounts={accounts} centerCostes={centerCostes} fetchData={fetchData} />
            </Tab>
            <Tab eventKey="expenses" title="Egresos">
              <FlowCashExpensivePage accounts={accounts} centerCostes={centerCostes} fetchData={fetchData} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

FlowCashPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(FlowCashPage)
