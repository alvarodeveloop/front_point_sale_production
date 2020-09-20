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
import { providerColumns } from 'utils/columns/provider'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'styles/components/modalComponents.css'
import { FaUser } from 'react-icons/fa'


const ProviderPage = (props) => {

  const [provider,setProvider] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [directionRegister,setDirectionRegister] = useState('')
  useEffect(() => {
    fetchData()
  },[])

  useMemo(() => {

    if(providerColumns.length > 4){
      providerColumns.pop()
    }

    providerColumns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
            <Dropdown.Item onClick={() => seeDirection(props.cell.row.original)}>Ver Dirección</Dropdown.Item>
            <Dropdown.Item onClick={() => createRepresent(props.cell.row.original)}>Crear Representante</Dropdown.Item>
            <Dropdown.Item onClick={() => modifyRegister(id)}>Modificar</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
          </DropdownButton>
        )
      }
    })

  },[])

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

  const seeDirection = data => {
    setIsOpen(true)
    setDirectionRegister(prev => {
        return (
          <ul className="list-group">
            <li className="list-group-item text-center"><h4><b>Pais:</b> {data.pais.nombre}</h4></li>
            <li className="list-group-item text-center"><h4><b>Ciudad:</b>  {data.city}</h4></li>
            <li className="list-group-item text-center"><h4><b>Comuna:</b>  {data.comuna}</h4></li>
            <li className="list-group-item text-center"><h4><b>Detalles:</b>  {data.address}</h4></li>
          </ul>
        )
    })
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
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <div className="button-add">
            <Button size="sm" title="Crear Proveedor" onClick={goToForm} variant="success"><FaPlusCircle /></Button>
          </div>
          <Table columns={providerColumns} data={provider} />
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

ProviderPage.propTypes = {

}

export default ProviderPage
