import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'styles/components/modalComponents.css'
import { FaUser } from 'react-icons/fa'
import { connect } from 'react-redux'

const ProviderPage = (props) => {

  const [provider,setProvider] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [directionRegister,setDirectionRegister] = useState('')
  useEffect(() => {
    fetchData()
  },[props.id_enterprise])

  const deleteRegister = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(id);
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
    axios.delete(API_URL+'provider/'+id).then(result => {
      toast.success('Registro eliminado con éxito')
      fetchData()
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const modifyRegister = id => {
    props.history.replace('/provider/form/'+btoa(id))
  }

  const fetchData = () => {
    axios.get(API_URL+'provider').then(result => {
      setProvider(result.data)
    }).catch(err => {
      const { response } = err
      console.log(err,response)
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToForm = () => {
    props.history.replace('/provider/form')
  }

  const createRepresent = data => {
    props.history.replace('/provider/represent/'+data.id)
  }

  const onHide = () => {
    setIsOpen(false)
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">Proveedores</h4>
          <hr/>
        </Col>
        <Col sm={6} md={6} lg={6} xs={12} className="">
          <Button size="sm" title="Crear Proveedor" onClick={goToForm} variant="success" block={true}>Crear Proveedor <FaPlusCircle /></Button>
        </Col>
        <Col sm={6} md={6} lg={6} xs={12} className="text-right">
          <h5 className="title_principal">Total Proveedores: <Badge variant="danger" className="font_badge">{provider.length}</Badge></h5>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12}>
          <Table columns={[
            {
              Header: 'Nombre',
              accessor: 'name_fantasy',
              Cell: props1 => {
                return (
                  <OverlayTrigger placement={'right'} overlay={
                    <Tooltip id={"tooltip-right"}>
                      <ul className="list-group">
                        <li className="list-group-item text-center"><b>Pais:</b> {props1.cell.row.original.pais.nombre}</li>
                        <li className="list-group-item text-center"><b>Ciudad:</b>  {props1.cell.row.original.city}</li>
                        <li className="list-group-item text-center"><b>Comuna:</b>  {props1.cell.row.original.comuna}</li>
                        <li className="list-group-item text-center"><b>Detalles:</b>  {props1.cell.row.original.address}</li>
                      </ul>
                    </Tooltip>
                  }>
                    <Button size="sm" type="button" block={true} variant="link" onClick={() => modifyRegister(props1.cell.row.original.id)}>{props1.cell.row.original.name_fantasy}</Button>
                  </OverlayTrigger>
                )
              }
            },
            {
              Header: 'Rut',
              accessor: 'rut_provider',
            },
            {
              Header: 'Teléfono',
              accessor: 'phone',
            },
            {
              Header: 'Spin',
              accessor: 'spin',
            },
            {
              Header: 'Acciones',
              Cell: props => {
                const id = props.cell.row.original.id
                return(
                  <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
                    <Dropdown.Item onClick={() => createRepresent(props.cell.row.original)}>Crear Representante</Dropdown.Item>
                    <Dropdown.Item onClick={() => modifyRegister(id)}>Modificar</Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
                  </DropdownButton>
                )
              }
            }
          ]} data={provider} />
        </Col>
      </Row>
      <Modal
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        handleClose={onHide}
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Dirección del Registro <FaUser />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {directionRegister}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

ProviderPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(ProviderPage)
