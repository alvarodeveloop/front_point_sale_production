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
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'styles/pages/users.scss'
import { connect } from 'react-redux'
import LoadingComponent from 'components/LoadingComponent'

let userColumns = [];

const UserListPage = (props) => {

  const [users, setUsers] = useState([])
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [props.id_branch_office])

  useMemo(() => {
    userColumns = [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Rol',
        accessor: "name_role",
      },
      {
        Header: 'Acciones',
        Cell: props => {
          const id = props.cell.row.original.id
          return (
            <DropdownButton size="sm" id={'drop' + props.cell.row.original.id} title="Seleccione" block="true">
              <Dropdown.Item onClick={() => modifyRegister(id)}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  }, [])

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
    axios.delete(API_URL + 'user/' + id).then(result => {
      toast.success('Registro eliminado con éxito')
      fetchData()
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const modifyRegister = id => {
    props.history.replace('/user/create/' + id)
  }

  const fetchData = () => {
    axios.get(API_URL + 'user').then(result => {
      setUsers(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const goToForm = () => {
    props.history.replace('/user/create')
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6} className="d-none d-sm-block">
          <h4 className="title_principal">Usuarios</h4>
        </Col>
        <Col sm={6} md={6} lg={6} className="alignTextSecondary">
          <h4 className="title_principal">Total usuarios registrados: <Badge variant="danger" className="font-badge">{users.length}</Badge></h4>
        </Col>
      </Row>
      <hr />
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} xs={12}>
            <Button block={true} size="sm" title="Crear Usuario" onClick={goToForm} variant="success">Crear Usuario <FaPlusCircle /></Button>
          </Col>
          <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
            <Table columns={userColumns} data={users} />
          </Col>
        </Row>
      )}
    </Container>
  )
}

UserListPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired
}

function mapDispatchToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office
  }
}

export default connect(mapDispatchToProps, {})(UserListPage)