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
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ModalStockInventary from 'components/modals/ModalStockInventary'
import ModalHistoryInventary from 'components/modals/ModalHistoryInventary'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux'
let inventaryColumns = []

const InventaryTab = (props) => {

  const [inventary, setInventary] = useState([])
  const [isOpenStock, setIsOpenStock] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [idInventaryHistory, setIdInventaryHistory] = useState(false)
  const [product, setProduct] = useState({})
  const [nameProductHistory, setNameProductHistory] = useState('')


  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useMemo(() => {

    inventaryColumns = [
          {
            Header: 'Nombre Producto',
            accessor: props1 => props1.products.name_product
          },
          {
            Header: 'Proveedor',
            accessor: props1 => props1.products.providers ? props1.products.providers.name_fantasy : 'Sin Proveedor'
          },
          {
            Header: 'Categoría',
            accessor: props1 => props1.products.categories.map(v => v.categories ? v.categories.name_category : ''),
            Cell: props1 => {
              const {original} = props1.cell.row
              if(original.products.categories.length > 1){
                return(
                  <OverlayTrigger placement={'right'} overlay={
                    <Tooltip id={"tooltip-right"}>
                      <ul className="list-group">
                        {original.products.categories.map((v,i) => (
                          <li key={i} className="list-group-item">{v.categories ? v.categories.name_category : ''}</li>
                        ))}
                      </ul>
                    </Tooltip>
                  }>
                    <Button sm="sm" type="button" variant="link" block={true}>Categorias</Button>
                  </OverlayTrigger>
                )
              }else{
                if(original.products.categories.length > 0){
                  return original.products.categories[0].categories.name_category
                }else{
                  return ''
                }
              }
            }
          },
          {
            Header: 'Stock Mínimo',
            accessor: 'minimun_stock',
            Cell: props1 => {
              const stock = props1.cell.row.original.minimun_stock
              return (<Badge variant="danger" className="font_badge">{stock}</Badge>)
            }
          },
          {
            Header: 'Stock Actual',
            accessor: 'stock',
            Cell: props1 => {
              const stock = props1.cell.row.original.stock
              return (<Badge variant="danger" className="font_badge">{stock}</Badge>)
            }
          },
          {
            Header: 'Estado',
            accessor: 'estado',
            Cell: props1 => {

              if(props1.cell.row.original.estado === "Normal"){
                return (
                  <Badge variant="success" className="font-badge">
                    {props1.cell.row.original.estado}
                  </Badge>
                )
              }else{
                return (
                  <Badge variant="danger" className="font-badge">
                    {props1.cell.row.original.estado}
                  </Badge>
                )
              }
            }
          },
          {
            Header: 'Acciones',
            Cell: props1 => {
              const id = props1.cell.row.original.id
              return(
                <DropdownButton size="sm" id={'drop'+props1.cell.row.original.id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => handleUpdateStock(props1.cell.row.original) }>Modificar Stock</Dropdown.Item>
                  <Dropdown.Item onClick={() => showHistoryModal(props1.cell.row.original) }>Ver Historial</Dropdown.Item>
                </DropdownButton>
              )
            }
          }
        ]

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

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

InventaryTab.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(InventaryTab)
