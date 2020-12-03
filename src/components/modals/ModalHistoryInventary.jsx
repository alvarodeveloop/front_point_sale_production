import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
  Col,
  Badge
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { FaTrash } from 'react-icons/fa'
import 'styles/components/modalComponents.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatNumber } from 'utils/functions'
import * as moment from 'moment-timezone'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import

let inventaryHistorialColumns = []

const ModalHistoryInventary = (props) => {

  useEffect(() => {

  },[])

  useMemo(() => {
    inventaryHistorialColumns = [
      {
        Header: 'Detalle Costo',
        accessor: 'detail',
      },
      {
        Header: 'Cantidad',
        accessor: 'quantity',
      },
      {
        Header: 'Costo',
        accessor: 'cost',
        Cell: props1 => {
          const {original} = props1.cell.row
          return (
            <Badge variant="danger" className="font-badge">{formatNumber(original.cost,2,',','.')}</Badge>
          )
        }
      },
      {
        Header: 'Proveedores',
        accessor: props1 => props1.providers.map(v => v.provider.social_razon),
        Cell: props1 => {
          const {original} = props1.cell.row
          if(original.providers.length > 1){
            return(
              <OverlayTrigger placement={'right'} overlay={
                <Tooltip id={"tooltip-right"}>
                  <ul className="list-group">
                    {original.providers.map((v,i) => (
                      <li key={i} className="list-group-item">{v.provider.social_razon}</li>
                    ))}
                  </ul>
                </Tooltip>
              }>
                <Button sm="sm" type="button" variant="link" block={true}>Proveedores</Button>
              </OverlayTrigger>
            )
          }else{
            if(original.providers.length === 1){
              return original.providers[0].provider.social_razon
            }else{
              return 'Sin proveedores'
            }
          }
        }
      },
      {
        Header: 'Fecha',
        accessor: props1 => props.createdAt,
        Cell: props1 => moment.tz(props1.cell.row.original.createdAt,'America/Santiago').format('DD-MM-YYYY')
      },
      {
        Header : '.',
        Cell : props1 => {
          const {original} = props1.cell.row
          return (<Button variant="danger" block={true} size="sm" onClick={() => removeCost(original)} type="button"><FaTrash /></Button>)
        }
      }
    ]
  },[])

  const removeCost = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">Afectara el stock del inventario también</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(data.id);
                onClose();
              }}
            >
              Si, Aceptar
            </button>
            <button className="button-alert" onClick={onClose}>No</button>
          </div>
        );
      }
    });
  }

  const confirmDeleteRegister = id => {

     axios.delete(API_URL+'inventary/'+id).then(result => {
      toast.success('Registro eliminado, actualizando registros del inventario...')
      props.fetchData()
      setTimeout( () => {
        document.getElementById('button_close').click()
      }, 1500);
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
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
          Historial del Producto {Object.keys(props.costs).length > 0 ? props.costs.products.name_product : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} xs={12}>
            <Table columns={inventaryHistorialColumns} data={props.costs.inventary_cost} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} id="button_close">Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalHistoryInventary.propTypes = {
  costs : PropTypes.object.isRequired,
  onHide : PropTypes.func.isRequired,
}

export default ModalHistoryInventary
