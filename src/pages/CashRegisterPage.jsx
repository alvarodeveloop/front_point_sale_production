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

import { connect } from 'react-redux'

const CashRegisterPage = (props) => {

  const [dataCashRegister, setDataCashRegister] = useState([])
  const [configStore, setConfigStore] = useState({})
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [users, setUsers] = useState([])
  const [validated, setValidated] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [formData, setFormData] = useState({
    id_user: '',
    default_cash: false,
    amount_cash_default: '',
    nro_caja: '',
    id: ''
  })

  useEffect(() => {
    fetchData(true)
  },[props.id_branch_office])

  const fetchData = typeFetch => {

    let promises = [
      axios.get(API_URL+'cash_register')
    ]

    if(typeFetch){
      promises.push(axios.get(API_URL+'config_store'))
      promises.push(axios.get(API_URL+'user'))
    }

    Promise.all(promises).then(result => {
      setDataCashRegister(result[0].data)

      if(typeFetch){
        if(result[1].data){
          setConfigStore(result[1].data)
          setUsers(result[2].data)
        }else{
          toast.error('Debe hacer la configuración de Tiendas primero')
          setTimeout(function () {
            props.history.replace('/config/config_store_form')
          }, 1500);
        }
      }

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
    if(e.target.name === "default_cash"){
      setFormData({...formData, [e.target.name] : e.target.checked, amount_cash_default: ''})
    }else{
      setFormData({...formData, [e.target.name] : e.target.value})
    }
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},formData)

    if(data.id){
      axios.put(API_URL+'cash_register/'+data.id,data).then(result => {
        toast.success('Caja Registradora Modificada')
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
    }else{
      data.nro_caja = configStore.ref_cash_register
      axios.post(API_URL+'cash_register',data).then(result => {
        toast.success('Caja Registradora Creada')
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
    setFormData({
      id_user: '',
      default_cash: false,
      amount_cash_default: '',
      nro_caja: '',
      id: ''
    })
    setValidated(false)
  }

  const updateRegister = values => {
    setFormData({
      id_user: values.id_user,
      default_cash: values.default_cash,
      amount_cash_default: values.amount_cash_default,
      nro_caja: values.nro_caja,
      id: values.id
    })
    setTitleModal('Modificar Caja Registradora '+values.nro_caja)
    handleOpenModalAdd()
  }

  const createRegister = () => {
    let val = configStore  && Object.keys(configStore).length > 0 ? configStore.ref_cash_register : ''
    setTitleModal('Crear Caja Registradora N°'+ val)
    cleanForm()
    handleOpenModalAdd()
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Caja Registradoras</h4>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Button variant="success" block={true} onClick={createRegister} size="sm">Agregar Caja <FaPlusCircle /></Button>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        {dataCashRegister.map((v,i) => (
          <Col sm={3} lg={3} md={3} className="text-center" key={i}>
            <h5 style={{color: 'rgb(180, 55, 33)'}}>CAJA N° {v.nro_caja}</h5>
            <Image src={require('../assets/img/caja_registradora.jpg')} style={{width: '100%'}}/>
            Estado : {v.status ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
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
            &nbsp;&nbsp;<Image src={require('../assets/img/caja_registradora.jpg')} style={{ width: '50px'}}/>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit} noValidate validated={validated}>
          <Modal.Body>
            <Row>
              <InputField
                type="select"
                label="Usuario a Asociar"
                name="id_user"
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={formData.id_user}
                handleChange={onChange}
              >
                <option value=''>--Seleccione--</option>
                {users.map((v,i) => (
                  <option value={v.id} key={i}>{v.name} - {v.email}</option>
                ))}
              </InputField>
              <Col sm={4} md={4} lg={4}>
                <br/>
                <Form.Group>
                  <Form.Check type="checkbox"
                    custom
                    id={'default_cash'}
                    name={'default_cash'}
                    label={'Saldo Inicial por Default'}
                    value={formData.default_cash}
                    checked={formData.default_cash}
                    onChange={onChange} />
                </Form.Group>
              </Col>
              {
                formData.default_cash ? (
                  <InputField
                    type="number"
                    label="Saldo Inicial"
                    name="amount_cash_default"
                    step="any"
                    required={false}
                    messageErrors={[]}
                    cols="col-md-4 col-lg-4 col-sm-4"
                    value={formData.amount_cash_default}
                    handleChange={onChange}
                    />
                ) : ''
              }
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

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

CashRegisterPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(CashRegisterPage)
