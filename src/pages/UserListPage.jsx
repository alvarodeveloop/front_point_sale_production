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
  Dropdown
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
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">Usuarios</h4>
          <hr/>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <div className="button-add">
            <Button size="sm" title="Crear Usuario" onClick={goToForm} variant="success"><FaPlusCircle /></Button>
          </div>
          <Table columns={userColumns} data={users} />
        </Col>
      </Row>
    </Container>
  )
}

UserListPage.propTypes = {

}

export default UserListPage
