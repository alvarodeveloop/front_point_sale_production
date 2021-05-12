import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs
} from 'react-bootstrap'
import CategoyPage from 'pages/CategoryPage'
import ProductPage from 'pages/ProductPage'
import InventaryTab from 'pages/InventaryTab'

const InventaryPage = (props) => {

  const [dispatchInventary, setDispatchInventary] = useState(false);
  
  const upgradeDispatch = () => {
    setDispatchInventary(!dispatchInventary);
  }   

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Tabs defaultActiveKey="product" id="uncontrolled-tab-example">
            <Tab eventKey="product" title="Productos">
              <ProductPage {...props} dispatchInventaryHandler={upgradeDispatch} />
            </Tab>
            <Tab eventKey="inventory" title="Inventario">
              <InventaryTab {...props} dispatchFetchRequest={dispatchInventary} />
            </Tab>
            <Tab eventKey="categories" title="Categorias">
              <CategoyPage />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default InventaryPage
