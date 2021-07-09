import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  Form,
  Accordion,
  Card
} from 'react-bootstrap'
import 'styles/components/modalComponents.scss'
import axios from 'axios'
import { FaPlusCircle } from "react-icons/fa";
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'; // Import
import EnterpriseCardComponent from 'components/EnterpriseCardComponent'
import 'styles/pages/enterprisePage.scss'
import TablePlansComponent from 'components/TablePlansComponent'
import LoadingComponent from 'components/LoadingComponent'

const EnterprisePage = (props) => {

  const [enterprises, setEnterprises] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modulesPlan, setModulesPlan] = useState([])
  const [enterpriseDetail, setEnterpriseDetail] = useState({})
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(API_URL + 'enterprise').then(result => {
      setEnterprises(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const modifyRegister = data => {
    props.history.replace('/enterprise/form/' + data.id)
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
    setDisplayLoading(true)
    axios.delete(API_URL + 'enterprise/' + id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
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

  const displayDetails = enterpriseData => {
    setEnterpriseDetail(enterpriseData)
    console.log(enterpriseData, 'aqui');
    setTimeout(function () {
      handleModal()
    }, 200);
  }

  return (
    <>
      {displayLoading ? (
        <Container fluid={true}>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid={true}>
          <Row className="">
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Empresas Registradas</h4>
              <Button size="sm" variant="success" block={true} type="button" onClick={goToForm}>Crear Empresa <FaPlusCircle /></Button>
            </Col>
            <Col sm={6} md={6} lg={6} className="text-center">
              <h4 className="title_principal">Total Empresas</h4>
              <Badge variant="danger">{enterprises.length}</Badge>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={12}>
              <Row className="justify-content-center">
                {enterprises.map((v, i) => (
                  <Col sm={4} md={4} lg={4} key={i} className="text-center mb-4">
                    <EnterpriseCardComponent
                      enterprise={v}
                      modifyRegister={modifyRegister}
                      deleteRegister={deleteRegister}
                      displayDetails={displayDetails}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Modal
            show={isOpenModal}
            onHide={handleModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ zIndex: '1000000' }}
          >
            <Modal.Header closeButton className="header_dark">
              <Modal.Title id="contained-modal-title-vcenter">
                Detalles de la empresa {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.bussines_name : ''}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className=" justify-content-center">
                <Col sm={5} md={5} lg={5} style={{ textAligment: "justify" }}>
                  <h4 className="title_principal">Datos de la Empresa</h4>
                  <ul>
                    <li className="str"><b>Rut</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.rut : ''}</li>
                    <li className="str"><b>Nombre</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.name : ''}</li>
                    <li className="str"><b>Fono</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.phone : ''}</li>
                    <li className="str"><b>Ciudad</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.city : ''}</li>
                    <li className="str"><b>Comuna</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.comuna : ''}</li>
                    <li className="str"><b>Dirección</b>: {Object.keys(enterpriseDetail).length > 0 ? enterpriseDetail.address : ''}</li>
                  </ul>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <h4 className="title_principal">Plan de la Empresa</h4>
                  <Row className="snip1404">
                    <Col sm={12} md={12} lg={12}>
                      {Object.keys(enterpriseDetail).length > 0 ? (
                        <TablePlansComponent
                          plan={enterpriseDetail.plan}
                          disabled={true}
                          update={false}
                          isModal={true}
                        />
                      ) : ''}
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <br /><br />
                  {Object.keys(enterpriseDetail).length > 0 ? (
                    <Accordion>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                          Modulos del plan ( hacer click para desplegar )
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <Row>
                              {enterpriseDetail.plan.modules.map((v, i) => (
                                <Col sm={4} md={4} lg={4} xs={6} key={i}>
                                  <Form.Group>
                                    <Form.Check type="checkbox"
                                      custom
                                      id={v.name_item + v.id}
                                      label={(<span className="">{v.name_item}</span>)}
                                      value={v.id}
                                      checked={true}
                                      readOnly={true}
                                    />
                                  </Form.Group>
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  ) : ''}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button size="md" variant="danger" type="button" onClick={handleModal}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>

  )
}

export default EnterprisePage
