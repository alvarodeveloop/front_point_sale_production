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

import { connect } from 'react-redux'

let columns_client = []

const ClientPage = (props) => {

  const [clients, setClients] = useState([])
  const [clientUpdate, setClientUpdate] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    fetchData()  
  },[props.id_branch_office])

  useEffect(() => {
    return() => {
      columns_client = []
    }
  },[])

  useMemo(() => {
    columns_client = [
        {
          Header:'Nombre',
          accessor: 'name_client'
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
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleModalHide = () => {
    setIsOpenModal(!isOpenModal)
    if(clientUpdate){
      setClientUpdate(null)
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
    axios.delete(API_URL+'client/'+id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
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
