import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Dropdown,
  DropdownButton,
  Tab,
  Tabs,
  Modal,
  Badge
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import Table from 'components/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { confirmAlert } from 'react-confirm-alert'; // Import

import TableEarningExpensiveComponent from 'components/TableEarningExpensiveComponent'
import { FaPlusCircle } from 'react-icons/fa'
import LoadingComponent from 'components/LoadingComponent'
let columns_center = []

const FlowCashCenterCostePage = (props) => {
  const [centerForm, setCenterForm] = useState({
    name : ''
  })
  const [showForm, setShowForm] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [displayEarnings, setDisplayEarnings] = useState([])
  const [displayExpensives, setDisplayExpensives] = useState([])
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    return () => {
      columns_center = []
    }
  },[])

  useMemo(() => {
    columns_center = [

          {
            Header: 'Nombre',
            accessor: 'name'
          },
          {
            Header: 'Ingresos',
            accessor: props1 => [props1.earnings.length]
          },
          {
            Header: 'Egresos',
            accessor: props1 => [props1.expensives.length]
          },
          {
            Header: 'Acciones',
            Cell: props1 => {
              const id = props1.cell.row.original.id
              return (
                <DropdownButton size="sm" id={'drop'+id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => seeAllInformation(props1.cell.row.original)}>Ver Ingresos y Egresos</Dropdown.Item>
                  <Dropdown.Item onClick={() => modifyRegister(props1.cell.row.original)}>Modificar</Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
                </DropdownButton>
              )
            }
          }
        ]
  },[])

  const cleanForm = () => {
    setCenterForm({
      name: ''
    })
  }

  const confirmDeleteRegister = id => {
    setDisplayLoading(true)
    axios.delete(API_URL+'flow_cash_center_coste/'+id).then(result => {
      toast.success('Registro Eliminado')
      props.fetchData()
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

  const displayForm = () => {
    setShowForm(!showForm)
  }

  const handleIsOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const handleSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    const objectPost = Object.assign({},centerForm)
    setDisplayLoading(true)
    if(objectPost.id){
      axios.put(API_URL+'flow_cash_center_coste/'+objectPost.id,objectPost).then(result => {
        toast.success('Cuenta Modificada')
        cleanForm()
        displayForm()
        props.fetchData()
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'flow_cash_center_coste',objectPost).then(result => {
        toast.success('Cuenta Agregada')
        cleanForm()
        displayForm()
        props.fetchData()
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
  }

  const modifyRegister = data => {
    setCenterForm({
      name: data.name,
      id : data.id
    })

    displayForm()
  }

  const onChange = e => {
    setCenterForm({...centerForm, [e.target.name] : e.target.value })
  }

  const seeAllInformation = data => {
    setDisplayEarnings(data.earnings)
    setDisplayExpensives(data.expensives)
    handleIsOpenModal()
  }

  return (
    <>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Container>
          <br/><br/>
          {showForm ? (
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <Row className="justify-content-center">
                  <InputField
                    {...props.inputName}
                    value={centerForm.name}
                    handleChange={onChange}
                  />
              </Row>
              <Row>
                <Col sm={6} md={6} lg={6} xs={12}>
                  <br/>
                  <Button size="sm" type="submit" variant="primary" block={true}>Guardar Centro de Costo</Button>
                </Col>
                <Col sm={6} md={6} lg={6} xs={12}>
                  <br/>
                  <Button size="sm" type="button" variant="info" block={true} onClick={displayForm}>Desplegar Datos</Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Row>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <Button size="sm" variant="secondary" block={true} onClick={displayForm}>Agregar Centro de Costo <FaPlusCircle /></Button>
                  </Col>
                  <Col sm={6} md={6} lg={6} xs={12} className="text-right">
                    <h5>Total Centros: <Badge variant="danger" className="font_badge">{props.centerCostes.length}</Badge></h5>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} xs={12}>
                    <Table data={props.centerCostes} columns={columns_center} />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}

          <Modal
            show={isOpenModal}
            onHide={handleIsOpenModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton style={{backgroundColor: 'black', color: 'white'}}>
              <Modal.Title id="contained-modal-title-vcenter">
                Ingresos y Egresos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="earnings" id="uncontrolled-tab-example">
                <Tab eventKey="earnings" title="Ingresos">
                  <TableEarningExpensiveComponent data={displayEarnings} isAccount={false} />
                </Tab>
                <Tab eventKey="expensives" title="Egresos">
                  <TableEarningExpensiveComponent data={displayExpensives} isAccount={false} />
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleIsOpenModal}>cerrar</Button>
            </Modal.Footer>
          </Modal>

        </Container>
      )}
    </>
  )
}

FlowCashCenterCostePage.propTypes = {
  fetchData : PropTypes.func.isRequired,
  centerCostes: PropTypes.array.isRequired
}

FlowCashCenterCostePage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name',
    label : 'Nombre del Centro de Costo',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default FlowCashCenterCostePage
