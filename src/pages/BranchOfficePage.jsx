import React, { useEffect, useState } from 'react'
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
  Form,
  Modal,
  Image,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import 'styles/components/modalComponents.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const BranchOfficePage = (props) => {

  const [configStore, setConfigStore] = useState([])
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [users, setUsers] = useState([])
  const [validated, setValidated] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [branchOfficeForm, setBranchOfficeForm] = useState({
    name: '',
    is_open: true,
    id: '',
  })
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    password_repeat: '',
    rut: '',
    name: '',
    phone: '',
    id: '',
    id_rol: 3,
  })
  const [branchOffice, setBranchOffice] = useState([])
  const [requiredInput,setRequiredInput] = useState(true)

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = () => {

    let promises = [axios.get(API_URL+'branch_office')]

    Promise.all(promises).then(result => {
      setBranchOffice(result[0].data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleOpenModalAdd = () => {
    setIsOpenModalAdd(!isOpenModalAdd)
  }

  const onChange = e => {
    if(e.target.name === "is_open"){
      setBranchOfficeForm({...branchOfficeForm, [e.target.name] : e.target.checked})
    }else{
      setBranchOfficeForm({...branchOfficeForm, [e.target.name] : e.target.value})
    }
  }

  const onChangeUser = e => {
    setUserForm({...userForm, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let dataBranch = Object.assign({},branchOfficeForm)
    let dataUser = Object.assign({},userForm)

    if(dataUser.password !== dataUser.password_repeat){
      toast.error('Error, las contraseñas no coinciden')
      return false
    }


    if(dataBranch.id){
      axios.put(API_URL+'branch_office/'+dataBranch.id,dataBranch).then(result => {
        axios.put(API_URL+'user_by_branch_office/'+dataUser.id,dataUser).then(result => {
          toast.success('Sucursal Modificada')
          cleanForm()
          handleOpenModalAdd()
          fetchData()
        }).catch(err => {
          const { response } = err
          if(response){
            toast.error(response.data.message)
          }else{
            toast.error('Error, contacte con soporte')
          }
        })
      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      dataUser.branch = dataBranch
      axios.post(API_URL+'user_by_brach_office',dataUser).then(result => {
        toast.success('Sucursal Creada con éxito')
        cleanForm()
        handleOpenModalAdd()
        fetchData(true)
      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })

    }
  }

  const cleanForm = () => {
    setUserForm({
      email: '',
      password: '',
      password_repeat: '',
      rut: '',
      name: '',
      phone: '',
      id: '',
      id_rol: 3,
    })
    setBranchOfficeForm({
      name: '',
      id: '',
      is_open: true,
    })
    setRequiredInput(true)
    setValidated(false)
  }

  const updateRegister = values => {
    setBranchOfficeForm({
      name: values.name,
      is_open: values.is_open,
      id: values.id,
    })
    setUserForm({
      email: values.user[0].email,
      password: '',
      password_repeat: '',
      rut: values.user[0].rut,
      name: values.user[0].name,
      phone: values.user[0].phone,
      id: values.user[0].id,
      id_rol: values.user[0].id_rol,
    })
    setTitleModal('Modificar Sucursal '+values.name)
    setRequiredInput(false)
    handleOpenModalAdd()
  }

  const createRegister = () => {
    setTitleModal('Crear Sucursal')
    cleanForm()
    handleOpenModalAdd()
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Sucursales</h4>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Button variant="success" block={true} onClick={createRegister} size="sm">Agregar Sucursal <FaPlusCircle /></Button>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        {branchOffice.map((v,i) => (
          <Col sm={3} lg={3} md={3} className="text-center" key={i}>
            <h5 style={{color: 'rgb(180, 55, 33)'}}>{v.name}</h5>
            <Image src={require('../assets/img/sucursal.png')} style={{width: '100%'}}/>
            Estado : {v.is_open ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
            <br/><br/>
            <DropdownButton size="md" id={'fila'+i} title="Acciones" style={{width: '100%'}} variant="primary">
              <Dropdown.Item onClick={() => updateRegister(v) }>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => {}}>Eliminar</Dropdown.Item>
            </DropdownButton>
          </Col>
        ))}
      </Row>
      <Modal
        show={isOpenModalAdd}
        onHide={handleOpenModalAdd}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            {titleModal}
            &nbsp;&nbsp;<Image src={require('../assets/img/sucursal.png')} style={{ width: '50px'}}/>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit} noValidate validated={validated}>
          <Modal.Body>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <h4 className="title_principal">Datos del Administrador de la Sucursal</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <InputField
                type="text"
                label="Nombre Completo"
                name="name"
                required={true}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.name}
                handleChange={onChangeUser}
              />
              <InputField
                type="text"
                label="Rut"
                name="rut"
                required={true}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.rut}
                handleChange={onChangeUser}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                required={true}
                messageErrors={[
                  'Requerido* ','Formato Tipo Email*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.email}
                handleChange={onChangeUser}
              />
            </Row>
            <Row>
              <InputField
                type="number"
                label="Fono"
                name="phone"
                required={false}
                messageErrors={[]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.phone}
                handleChange={onChangeUser}
              />
              <InputField
                type="password"
                label="Contraseña"
                name="password"
                required={requiredInput}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.password}
                handleChange={onChangeUser}
              />
              <InputField
                type="password"
                label="Repita Contraseña"
                name="password_repeat"
                required={requiredInput}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={userForm.password_repeat}
                handleChange={onChangeUser}
              />
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <h4 className="title_principal">Datos de la Sucursal</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <InputField
                type="text"
                label="Nombre Sucursal"
                name="name"
                required={true}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={branchOfficeForm.name}
                handleChange={onChange}
              />
              <Col sm={4} md={4} lg={4}>
                <br/>
                <Form.Group>
                  <Form.Check type="checkbox"
                    custom
                    id={'is_open'}
                    name={'is_open'}
                    label={'Activa'}
                    value={branchOfficeForm.is_open}
                    checked={branchOfficeForm.is_open}
                    onChange={onChange} />
                </Form.Group>
              </Col>
            </Row>
            <hr/>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Button block={true} variant="primary" size="sm" type="submit">Guardar</Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button block={true} variant="danger" size="sm" onClick={handleOpenModalAdd} type="button">Cerrar</Button>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    </Container>
  )
}

export default BranchOfficePage
