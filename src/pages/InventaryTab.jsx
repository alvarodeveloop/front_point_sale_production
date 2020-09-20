import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Form,
  Badge
} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { inventaryColumns } from 'utils/columns/inventario'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ModalStockInventary from 'components/modals/ModalStockInventary'
import ModalHistoryInventary from 'components/modals/ModalHistoryInventary'

const InventaryTab = (props) => {

  const [inventary, setInventary] = useState([])
  const [isOpenStock, setIsOpenStock] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [idInventaryHistory, setIdInventaryHistory] = useState(false)
  const [product, setProduct] = useState({})
  const [nameProductHistory, setNameProductHistory] = useState('')


  useEffect(() => {
    fetchData()
  },[])

  useMemo(() => {

    if(inventaryColumns.length > 6){
      inventaryColumns.pop()
    }

    inventaryColumns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
            <Dropdown.Item onClick={() => handleUpdateStock(props.cell.row.original) }>Modificar Stock</Dropdown.Item>
            <Dropdown.Item onClick={() => showHistoryModal(props.cell.row.original) }>Ver Historial</Dropdown.Item>
          </DropdownButton>
        )
      }
    })

  },[])

  const handleUpdateStock = productData => {
    setProduct(productData)
    setIsOpenStock(true)
  }

  const fetchData = () => {
    axios.get(API_URL+'inventary').then(result => {
      setInventary(result.data)
    }).catch(err => {
     	 if(err.response){
        toast.error(err.response.data.message)
       }else{
        toast.error('Error, contacte con soporte')
       }
    })
  }

  const handleOnHideModalStock = () => {
    setIsOpenStock(false)
  }

  const showHistoryModal = data => {
    setIdInventaryHistory(data.id)
    setIsOpenHistory(true)
    setNameProductHistory(data.name_product)
  }

  const handleOnHideModalHistory = () => {
    setIsOpenHistory(false)
    setIdInventaryHistory(null)
  }

  const handleSubmit = () => {
    setIsOpenStock(false)
    setProduct({})
    fetchData()
  }

  return (
    <Container>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <br/>
          <h4 className="title_principal">Tabla Inventario</h4>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-right">
          <br/>
          <h4 className="title_principal">Cantidad Productos: <Badge variant="danger" className="title_badge">{inventary.length}</Badge></h4>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <hr/>
          <Table columns={ inventaryColumns } data={ inventary } />
        </Col>
      </Row>
      <ModalStockInventary
        isShow={isOpenStock}
        onHide={handleOnHideModalStock}
        product={product}
        handleSubmitStock={handleSubmit}
      />
    <ModalHistoryInventary
      isShow={isOpenHistory}
      onHide={handleOnHideModalHistory}
      id_inventary={idInventaryHistory}
      name_product={nameProductHistory}
    />
    </Container>
  )
}

export default InventaryTab
