import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  Badge,
  Modal,
  Form
} from 'react-bootstrap'
import 'styles/components/modalComponents.css'
import axios from 'axios'
import { FaPlusCircle } from "react-icons/fa";
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import Table from 'components/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { connect } from 'react-redux'
import {formatNumber} from 'utils/functions'
import layoutHelpers from 'shared/layouts/helpers'

let columns_enterprise = []

const EnterprisePage = (props) => {

  const [enterprises, setEnterprises] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modulesPlan, setModulesPlan] = useState([])

  useEffect(() => {
    fetchData()
    layoutHelpers.toggleCollapsed()
    return() => {
      layoutHelpers.toggleCollapsed()
      columns_enterprise = []
    }
  },[])

  useMemo(() => {
    columns_enterprise = [
      {
        Header:'Rut',
        accessor: 'rut',
        Cell: props1 => {
          return (
            <OverlayTrigger placement={'bottom'} overlay={<Tooltip id={"tooltip-disabled"+props1.cell.row.original.id}>Hacer click para modificar</Tooltip>}>
              <Button size="sm" variant="link" block={true} onClick={() => modifyRegister(props1.cell.row.original)}>{props1.cell.row.original.rut}</Button>
            </OverlayTrigger>
          )
        }
      },
      {
        Header:'Razon Social',
        accessor: 'bussines_name'
      },
      {
        Header:'Nombre',
        accessor: 'name'
      },
      {
        Header:'Dirección',
        accessor: 'address'
      },
      {
        Header:'Actidad Económica',
        accessor: 'actividad_economica'
      },
      {
        Header:'Plan',
        accessor: props1 => [props1.plan.name],
        Cell: props1 => {
          const {plan} = props1.cell.row.original
          return (
            <OverlayTrigger placement={'right'} delay={{ show: 250, hide: 400 }} overlay={
              <Tooltip id={"tooltip-button"+props1.cell.row.original.id}>
                Hacer click para ver los detalles
              </Tooltip>
            }>
            <div>
              <OverlayTrigger placement={'left'} trigger="click" overlay={
                  <Popover id={"tooltip-plan"+props1.cell.row.original.id}>
                    <Popover.Title as="h5">Datos del Plan</Popover.Title>
                    <Popover.Content>
                      <ul className="list-group">
                        <li className="list-group-item"><b>Precio:</b><br/>{displayPricePlan(plan)}</li>
                        <li className="list-group-item"><b>Descripción:</b><br/>{plan.description}</li>
                        <li className="list-group-item"><b>Día de Cobro:</b><br/>{plan.day_payment}</li>
                        <li className="list-group-item"><b>Días de aviso con anticipación a la fecha de cobro:</b><br/>{plan.days_to_advice_before_expire}</li>
                        <li className="list-group-item"><b>Días de Prueba:</b><br/>{plan.day_test}</li>
                        <li className="list-group-item"><b>Días de plazo extra:</b><br/>{plan.day_before_day_cut}</li>
                        <li className="list-group-item"><b>Modulos:</b><br/><Button variant="link" block={true} onClick={() => displayModules(plan.modules)}>hacer click para ver los módulos</Button></li>
                      </ul>
                    </Popover.Content>
                  </Popover>
                }>
                <Button variant="link" size="sm" block={true} type="button">{plan.name}</Button>
              </OverlayTrigger>
            </div>
            </OverlayTrigger>
          )
        }
      },
      {
        Header:'Estado',
        accessor: props1 => props1.is_open ? ['Operativa'] : ['Desactivada'],
        Cell: props1 => {
          const {original} = props1.cell.row
          if(original.is_open){
            return (<Badge style={{backgroundColor: "rgb(13, 9, 60)", color: "white"}} className="font-badge">Operativa</Badge>)
          }else{
            return (<Badge variant="danger" className="font-badge">Desactivada</Badge>)
          }
        }
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

  const displayPricePlan = plan => {
    let config = JSON.parse(localStorage.getItem('configGeneral'))
    if(plan.discount > 0){
      let discount = parseFloat((plan.discount * plan.price) / 100)
      return (<Badge variant="danger" className="font-badge">{config.simbolo_moneda+formatNumber(parseFloat(plan.price) - discount,2,',','.')}</Badge>)
    }else{
      return (<Badge variant="danger" className="font-badge">{config.simbolo_moneda+formatNumber(parseFloat(plan.price),2,',','.')}</Badge>)
    }
  }

  const fetchData = () => {
    axios.get(API_URL+'enterprise').then(result => {
      setEnterprises(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const modifyRegister = data => {
    props.history.replace('/enterprise/form/'+data.id)
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
    axios.delete(API_URL+'enterprise/'+id).then(result => {
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

  const goToForm = () => {
    props.history.replace('/enterprise/form')
  }

  const handleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const displayModules = modules => {
    setModulesPlan(modules)
    handleModal()
  }

  return (
    <Container fluid={true}>
      <Row className="">
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Empresas Registradas</h4>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Total Empresas</h4>
          <Badge variant="danger">{enterprises.length}</Badge>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={6}>
          <Button size="sm" variant="success" block={true} type="button" onClick={goToForm}>Crear Empresa <FaPlusCircle /></Button>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Table data={enterprises} columns={columns_enterprise} />
        </Col>
      </Row>
      <Modal
        show={isOpenModal}
        onHide={handleModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{zIndex: '1000000'}}
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Total módulos del plan ({modulesPlan.length})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="">
            {modulesPlan.map((v,i) => (
              <Col sm={4} md={4} lg={4} xs={6} key={i}>
                <Form.Group>
                  <Form.Check type="checkbox"
                    custom
                    id={v.name_item+v.id}
                    label={(<span className="title_principal">{v.name_item}</span>)}
                    value={v.id}
                    checked={true}
                    readOnly={true}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="danger" type="button" onClick={handleModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>

  )
}

export default EnterprisePage
