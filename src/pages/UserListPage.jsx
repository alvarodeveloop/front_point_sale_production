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
import { userColumns } from 'utils/columns'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'styles/pages/users.css'


const UserListPage = (props) => {

  const [users,setUsers] = useState([])

  useEffect(() => {
    fetchData()
  },[])

  useMemo(() => {

    if(userColumns.length > 3){
      userColumns.pop()
    }

    userColumns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
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
    axios.delete(API_URL+'user/'+id).then(result => {
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
    props.history.replace('/user/create/'+id)
  }

  const fetchData = () => {
    axios.get(API_URL+'user').then(result => {
      setUsers(result.data)
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
    props.history.replace('/user/create')
  }

  return (
    <Container>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Usuarios</h4>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Total Usuarios Registrados: <Badge variant="danger">{users.length}</Badge></h4>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={6} xs={12}>
          <Button block={true} size="sm" title="Crear Usuario" onClick={goToForm} variant="success">Crear Usuario <FaPlusCircle /></Button>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Table columns={userColumns} data={users} />
        </Col>
      </Row>
    </Container>
  )
}

UserListPage.propTypes = {

}

export default UserListPage
