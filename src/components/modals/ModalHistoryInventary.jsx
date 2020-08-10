import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import { inventaryHistorialColumns } from 'utils/columns/inventario'
import Table from 'components/Table'
import 'styles/components/modalComponents.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ModalHistoryInventary = (props) => {

  const [historial, setHistorial] = useState([])

  useEffect(() => {
    if(props.id_inventary){
      fetchData()
    }
  },[props.id_inventary])

  useMemo(() => {

  },[])

  const fetchData = () => {
    axios.get(API_URL+'inventary_historial/'+props.id_inventary).then(result => {
      setHistorial(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Historial del Producto {props.name_product}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} xs={12}>
            <Table columns={inventaryHistorialColumns} data={historial} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )

}

export default ModalHistoryInventary
