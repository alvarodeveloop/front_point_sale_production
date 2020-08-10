import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import CategoyPage from 'pages/CategoryPage'
import ProductPage from 'pages/ProductPage'
import InventaryTab from 'pages/InventaryTab'

const InventaryPage = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Tabs defaultActiveKey="product" id="uncontrolled-tab-example">
            <Tab eventKey="product" title="Productos">
              <ProductPage {...props} />
            </Tab>
            <Tab eventKey="inventory" title="Inventario">
              <InventaryTab {...props} />
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
