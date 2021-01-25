import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios'
import { connect } from 'react-redux'
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
import { confirmAlert } from 'react-confirm-alert'; // Import

import { setBranchOffices, setIdBranchOffice } from 'actions/enterpriseSucursal'
import { setConfigStore } from 'actions/configs'
import { formatRut } from 'utils/functions'
import BranchOfficeFormModal from 'components/modals/BranchOfficeFormModal'
import LoadingComponent from 'components/LoadingComponent'


const BranchOfficePage = (props) => {

  const [configStore, setConfigStore] = useState([])
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [requiredInput,setRequiredInput] = useState(false)
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
  const [isLoading,setIsloading] = useState(false)


  useEffect(() => {
    fetchData()
  },[])

  useEffect(() => {
    fetchData(false)
  },[props.id_enterprise])

  const fetchData = (type = false, update = false) => {
    setIsloading(true)
    let promises = [axios.get(API_URL+'branch_office')]

    Promise.all(promises).then(async result => {
      setBranchOffice(result[0].data)
      props.setBranchOffices(result[0].data)
      if(type){
        if(!update){
          if(result[0].data.length === 1){

            let branch = await axios.get(API_URL+'enterprises_branch_office/'+null+'/'+result[0].data[0].id+'/'+1)
            localStorage.setItem('id_branch_office',result[0].data[0].id)
            localStorage.setItem('configStore',JSON.stringify(branch.data.config))
            props.setConfigStore(branch.data.config)
            props.setIdBranchOffice(result[0].data[0].id)
            toast.info('Sucursal seleccionada para trabajar')
          }
        }
      }
      setIsloading(false)
    }).catch(err => {
      setIsloading(false)
      props.tokenExpired(err)
    })
  }

  const handleOpenModalAdd = () => {
    setIsOpenModalAdd(!isOpenModalAdd)
  }

  const updateRegister = values => {
    setBranchOfficeForm({
      name: values.name,
      is_open: values.is_open,
      id: values.id,
    })

    if(values.user.length){
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
    }
    setTitleModal('Modificar Sucursal '+values.name)
    setRequiredInput(false)
    handleOpenModalAdd()
  }

  const createRegister = () => {
    setTitleModal('Crear Sucursal')
    handleOpenModalAdd()
  }

  return (
    <Container fluid>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
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
        </>
      )}
      <BranchOfficeFormModal
        branchOfficeForm={branchOfficeForm}
        userForm={userForm}
        setUserForm={setUserForm}
        setBranchOfficeForm={setBranchOfficeForm}
        handleOpenModalAdd={handleOpenModalAdd}
        isOpenModalAdd={isOpenModalAdd}
        titleModal={titleModal}
        requiredInput={requiredInput}
        setRequiredInput={setRequiredInput}
        fetchData={fetchData}
        isBranchOffice={true}
        menu={props.modules}
      />
    </Container>
  )
}

BranchOfficePage.propTypes ={
  setBranchOffices: PropTypes.func.isRequired,
  id_branch_office: PropTypes.any.isRequired,
  id_enterprise : PropTypes.any.isRequired,
  setIdBranchOffice: PropTypes.func.isRequired,
  setConfigStore: PropTypes.func.isRequired,
}

function mapDispatchToProps(){
  return {
    setBranchOffices,
    setIdBranchOffice,
    setConfigStore,
  }
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    modules: state.menu.modules
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(BranchOfficePage)
