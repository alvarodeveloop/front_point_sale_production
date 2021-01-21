import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  Badge
} from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import Table from 'components/Table'
import FormClientModal from 'components/modals/FormClientModal'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {FaPlusCircle} from 'react-icons/fa'
import layoutHelpers from 'shared/layouts/helpers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LoadingComponent from 'components/LoadingComponent'

import { connect } from 'react-redux'

let columns_client = []

const ClientPage = (props) => {

  const [clients, setClients] = useState([])
  const [clientUpdate, setClientUpdate] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return() => {
      layoutHelpers.toggleCollapsed()
      columns_client = []
    }
  },[])

  useMemo(() => {
    columns_client = [
        {
          Header:'Nombre',
          accessor: 'name_client',
          Cell: props1 => {
            const {original} = props1.cell.row
            return(
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para modificar al cliente</Tooltip>}>
                <Button variant="link" block={true} type="button" size="sm" onClick={() => modifyRegister(original)}>{ original.name_client }</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header:'Email',
          accessor: 'email'
        },
        {
          Header:'Teléfono',
          accessor: 'phone'
        },
        {
          Header:'Dirección',
          accessor: 'address'
        },
        {
          Header:'Id',
          accessor: props1 => [props1.type_document+' '+props1.data_document],
        },
        {
          Header:'Observación',
          accessor: 'observation'
        },
        {
          Header: 'Acciones',
          Cell: props1 => {
            const id = props1.cell.row.original.id
            return(
              <DropdownButton size="sm" id={'drop'+id} title="Seleccione"  block="true">
                <Dropdown.Item onClick={() => modifyRegister(props1.cell.row.original)}>Modificar</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
              </DropdownButton>
            )
          }
        }
    ]
  },[])

  const fetchData = () => {
    axios.get(API_URL+'client').then(result => {
      setClients(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleModalHide = (create = false) => {
    setIsOpenModal(!isOpenModal)
    if(clientUpdate){
      setClientUpdate(null)
      fetchData()
    }else if(create){
      fetchData()
    }
  }

  const modifyRegister = data => {
    setClientUpdate(data)
    handleModalHide()
  }

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
    setDisplayLoading(true)
    axios.delete(API_URL+'client/'+id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      setDisplayLoading(false)
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid={true}>
          <Row className="">
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Tabla de Clientes</h4>
            </Col>
            <Col sm={6} md={6} lg={6} className="text-center">
              <h4 className="title_principal">Total Clientes</h4>
              <Badge variant="danger">{clients.length}</Badge>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <Button variant="success" block={true} size="sm" onClick={handleModalHide} type="button">Crear Cliente <FaPlusCircle /></Button>
            </Col>
          </Row>
          <hr/>
          <Row className="">
            <Col sm={12} md={12} lg={12}>
              <Table data={clients} columns={columns_client} />
            </Col>
          </Row>
          <FormClientModal
            isShow={isOpenModal}
            onHide={handleModalHide}
            dataModify={clientUpdate}
          />
        </Container>
      )}
    </>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

ClientPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(ClientPage)
