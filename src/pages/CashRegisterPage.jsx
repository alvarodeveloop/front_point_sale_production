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
import 'styles/components/modalComponents.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import LoadingComponent from 'components/LoadingComponent'

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
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData(true)
  }, [props.id_branch_office])

  const fetchData = typeFetch => {

    let promises = [
      axios.get(API_URL + 'cash_register')
    ]

    if (typeFetch) {
      promises.push(axios.get(API_URL + 'config_store'))
      promises.push(axios.get(API_URL + 'user'))
    }

    Promise.all(promises).then(result => {
      setDataCashRegister(result[0].data)

      if (typeFetch) {
        if (result[1].data) {
          setConfigStore(result[1].data)
          setUsers(result[2].data)
        } else {
          toast.error('Debe hacer la configuración de Tiendas primero')
          setTimeout(function () {
            props.history.replace('/config/config_store_form')
          }, 1500);
        }
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleOpenModalAdd = () => {
    setIsOpenModalAdd(!isOpenModalAdd)
  }

  const onChange = e => {
    if (e.target.name === "default_cash") {
      setFormData({ ...formData, [e.target.name]: e.target.checked, amount_cash_default: '' })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
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

    let data = Object.assign({}, formData)
    setDisplayLoading(true)
    if (data.id) {
      axios.put(API_URL + 'cash_register/' + data.id, data).then(result => {
        toast.success('Caja Registradora Modificada')
        cleanForm()
        handleOpenModalAdd()
        fetchData()
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
      })
    } else {
      data.nro_caja = configStore.ref_cash_register
      axios.post(API_URL + 'cash_register', data).then(result => {
        toast.success('Caja Registradora Creada')
        cleanForm()
        handleOpenModalAdd()
        fetchData(true)
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
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
    setTitleModal('Modificar Caja Registradora ' + values.nro_caja)
    handleOpenModalAdd()
  }

  const createRegister = () => {
    let val = configStore && Object.keys(configStore).length > 0 ? configStore.ref_cash_register : ''
    setTitleModal('Crear Caja Registradora N°' + val)
    cleanForm()
    handleOpenModalAdd()
  }

  const seeDetails = data => {
    props.history.push("/cashBox/" + data.id);
  }

  const deleteCashBox = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar esta caja?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteCashBox(data.id);
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

  const confirmDeleteCashBox = async (id) => {
    try {
      setDisplayLoading(true);
      await axios.delete(API_URL + "cash_register/" + id);
      toast.success("Caja eliminada con éxito");
      fetchData();
    } catch (error) {
      setDisplayLoading(false);
      props.tokenExpired(error);
    }
  }

  return (
    <>
      {displayLoading ? (
        <Container fluid>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Caja Registradoras</h4>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Button variant="success" block={true} onClick={createRegister} size="sm">Agregar Caja <FaPlusCircle /></Button>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            {dataCashRegister.map((v, i) => (
              <Col sm={6} lg={3} md={4} xs={10} className="text-center mb-4" key={i}>
                <h5 style={{ color: 'darkred' }}>CAJA N° {v.nro_caja}</h5>
                <Image src={require('../assets/img/caja_registradora.jpg')} style={{ width: '70%' }} /><br />
                Estado : {v.status ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
                <br /><br />
                <DropdownButton block={true} id={'fila' + i} title="Acciones" style={{ width: '100%' }} size="sm" variant="primary">
                  <Dropdown.Item onClick={() => updateRegister(v)}>Modificar</Dropdown.Item>
                  <Dropdown.Item onClick={() => seeDetails(v)}>Ver Detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteCashBox(v)}>Eliminar</Dropdown.Item>
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
                &nbsp;&nbsp;<Image src={require('../assets/img/caja_registradora.jpg')} style={{ width: '50px' }} />
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
                    {users.map((v, i) => (
                      <option value={v.id} key={i}>{v.name} - {v.email}</option>
                    ))}
                  </InputField>
                  <Col sm={4} md={4} lg={4}>
                    <br />
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
                <hr />
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4} xs={6}>
                    <Button block={true} variant="danger" size="sm" type="submit">Guardar</Button>
                  </Col>
                  <Col sm={4} md={4} lg={4} xs={6}>
                    <Button block={true} variant="secondary" size="sm" onClick={handleOpenModalAdd} type="button">Cerrar</Button>
                  </Col>
                </Row>
              </Modal.Body>
            </Form>
          </Modal>
        </Container>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
  }
}

CashRegisterPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, {})(CashRegisterPage)
