import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Dropdown,
  DropdownButton,
  Accordion,
  Card,
  Modal,
  Badge
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import * as moment from 'moment-timezone'
import Table from 'components/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import FileSaver from 'file-saver';
import 'styles/components/modalComponents.css'
import {
  FaCloudDownloadAlt,
  FaPlusCircle
} from 'react-icons/fa'
import {formatNumber} from 'utils/functions'
let columns_earning = []

const FlowCashEarningPage = (props) => {

  const [earnings, setEarnings] = useState([])
  const [earningForm, setEarningForm] = useState({
    name : '',
    description : '',
    amount: '',
    id_flow_cash_account: '',
    id_flow_cash_center_cost: '',
    date_execution: '',
    is_recurrent: false,
    date_execution: '',
    document_1 : '',
    document_2 : '',
  })

  const [showForm, setShowForm] = useState(false)
  const [validated, setValidated] = useState(false)
  const [fileUpload, setFileUpload] = useState(null)
  const [fileUpload2, setFileUpload2] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [detailExpensive, setDetailExpensive] = useState({})

  useEffect(() => {
    fetchData()
    return () => {
      columns_earning = []
    }
  },[])

  useMemo(() => {
    columns_earning = [

          {
            Header: 'Nombre',
            accessor: 'name'
          },
          {
            Header: 'Descripción',
            accessor: 'description'
          },
          {
            Header: 'Monto',
            accessor: 'amount',
            Cell : props1 => {
              return <Badge variant="danger" className="font_badge">{formatNumber(props1.cell.row.original.amount,2,',','.')}</Badge>
            }
          },
          {
            Header: 'Cuenta',
            accessor: props1 => [props1.account.account_name]
          },
          {
            Header: 'Centro de Costros',
            accessor: props1 => [props1.centerCoste.name]
          },
          {
            Header: 'Acciones',
            Cell: props1 => {
              const id = props1.cell.row.original.id
              return (
                <DropdownButton size="sm" id={'drop'+id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => seeDetails(props1.cell.row.original)}>Ver Detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => modifyRegister(props1.cell.row.original)}>Modificar</Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
                </DropdownButton>
              )
            }
          }
        ]
  },[])

  const cleanForm = () => {
    setEarningForm({
      name : '',
      description : '',
      amount: '',
      id_flow_cash_account: '',
      id_flow_cash_center_cost: '',
      date_execution: '',
      is_recurrent: false,
      date_execution: '',
      document_1: '',
      document_2: '',
    })

    setFileUpload(null)
    setFileUpload2(null)
  }

  const confirmDeleteRegister = id => {
    axios.delete(API_URL+'flow_cash_earning/'+id).then(result => {
      toast.success('Registro Eliminado')
      fetchData()
      props.fetchData()
    }).catch(err => {
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

  const downloadDocument = doc => {
    axios.get(API_URL+'flow_cash_doc_download/'+doc,{
      responseType: 'blob'
    }).then(result => {
      FileSaver.saveAs(result.data,doc);
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const fetchData = () => {
    axios.get(API_URL+'flow_cash_earning').then(result => {
      setEarnings(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleAdjunto = id => {
    document.getElementById(id).click()
  }

  const handleChangeFile = e => {
    if(e.target.id === 'adjunt1'){
      setFileUpload(e.target.files)
    }else{
      setFileUpload2(e.target.files)
    }
  }

  const handleOnHideModal = () => {
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

    let newFormData = new FormData()
    Object.keys(earningForm).forEach((v,i) => {
      newFormData.append(v,earningForm[v])
    })

    if(fileUpload){
      newFormData.append('delete_adjunt_1',true)
      Object.keys(fileUpload).forEach((item, i2) => {
        newFormData.append('documents',fileUpload[item])
      });
    }

    if(fileUpload2){
      newFormData.append('delete_adjunt_2',true)
      Object.keys(fileUpload2).forEach((item, i2) => {
        newFormData.append('documents',fileUpload2[item])
      });
    }

    if(earningForm.id){
      axios.put(API_URL+'flow_cash_earning/'+earningForm.id,newFormData).then(result => {
        toast.success('Ingreso Modificado')
        cleanForm()
        displayForm()
        fetchData()
        props.fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'flow_cash_earning',newFormData).then(result => {
        toast.success('Ingreso Agregado')
        cleanForm()
        displayForm()
        fetchData()
        props.fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const modifyRegister = data => {
    setEarningForm({
      name : data.name,
      description : data.description,
      amount: data.amount,
      id_flow_cash_account: data.id_flow_cash_account,
      id_flow_cash_center_cost: data.id_flow_cash_center_cost,
      date_execution: data.date_execution,
      is_recurrent: data.is_recurrent,
      date_execution: data.date_execution ? moment(data.date_execution).format('YYYY-MM-DD') : '',
      document_1: data.document_1,
      document_2: data.document_2,
      id : data.id
    })
    displayForm()
  }

  const onChange = e => {
    if(e.target.name === 'is_recurrent'){
      let val = e.target.value === 'true' ? true : false
      setEarningForm({...earningForm, [e.target.name] : val })
    }else{
      setEarningForm({...earningForm, [e.target.name] : e.target.value })
    }
  }

  const seeDetails = data => {
    setDetailExpensive(data)
    handleOnHideModal()
  }

  return (
    <Container>
      <br/><br/>
      {showForm ? (
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row>
            <InputField
              {...props.inputName}
              handleChange={onChange}
              value={earningForm.name}
            />
            <InputField
              {...props.inputDescription}
              handleChange={onChange}
              value={earningForm.description}
            />
            <InputField
              {...props.inputAmount}
              handleChange={onChange}
              value={earningForm.amount}
            />
          </Row>
          <Row>
            <InputField
              {...props.inputAccount}
              handleChange={onChange}
              value={earningForm.id_flow_cash_account}
            >
              <option value="">--Seleccione--</option>
              {
                props.accounts.map( (v,i) => (
                  <option key={i} value={v.id}>{v.account_name}</option>
                ))
              }
            </InputField>

            <InputField
              {...props.inputCoste}
              handleChange={onChange}
              value={earningForm.id_flow_cash_center_cost}
            >
              <option value="">--Seleccione--</option>
              {
                props.centerCostes.map( (v,i) => (
                  <option key={i} value={v.id}>{v.name}</option>
                ))
              }
            </InputField>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0" style={{ backgroundColor: 'black', color: 'lightblue'}}>
                    Avanzado, hacer click para desplegar campos
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <InputField
                          {...props.inputDateExecution}
                          handleChange={onChange}
                          value={earningForm.date_execution}
                        />
                        <Col sm={6} md={6} lg={6}>
                          <label for="">Es recurrente?</label>
                          <Row>
                            <Col sm={6} md={6} lg={6}>
                              <label>
                                <input type="checkbox" onChange={onChange} name="is_recurrent" value={false} checked={earningForm.is_recurrent ? false : true} />
                                &nbsp;&nbsp;No
                              </label>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                              <label>
                                <input type="checkbox" onChange={onChange} name="is_recurrent" value={true} checked={earningForm.is_recurrent ? true : false} />
                                &nbsp;&nbsp;Si
                              </label>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4} md={4} lg={4}>
                          <br/>
                            <Button size="sm" variant="info" block={true} onClick={() =>  handleAdjunto('adjunt1')  }>Adjunto1</Button>
                            <input type="file" id="adjunt1" onChange={handleChangeFile} style={{display: 'none'}} />
                            {
                              earningForm.document_1 && earningForm.id ? (
                                <Button size="sm" variant="link" onClick={() => downloadDocument(earningForm.document_1) }>Descargar Adjunto1</Button>
                              ) : ''
                            }
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                          <br/>
                            <Button size="sm" variant="info" block={true} onClick={() => handleAdjunto('adjunt2') }>Adjunto2</Button>
                            <input type="file" id="adjunt2" onChange={handleChangeFile} style={{display: 'none'}} />
                              {
                                earningForm.document_1 && earningForm.id ? (
                                  <Button size="sm" variant="link" onClick={() => downloadDocument(earningForm.document_2) }>Descargar Adjunto2</Button>
                                ) : ''
                              }
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4} xs={12}>
                <br/>
                <Button size="sm" type="submit" variant="primary" block={true}>Guardar Ingreso</Button>
              </Col>
              <Col sm={4} md={4} lg={4} xs={12}>
                <br/>
                <Button size="sm" type="button" variant="info" block={true} onClick={displayForm}>Volver a la Tabla</Button>
              </Col>
          </Row>
        </Form>
      ) : (
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Row className="">
              <Col sm={6} md={6} lg={6} xs={12}>
                <Button size="sm" variant="secondary" block={true} onClick={displayForm}>Agregar Ingresos <FaPlusCircle /></Button>
              </Col>
              <Col sm={6} md={6} lg={6} xs={12} className="text-right">
                <h5>Total Egresos: <Badge variant="danger" className="font_badge">{earnings.length}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12} xs={12}>
                <Table data={earnings} columns={columns_earning} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <Modal
        show={isOpenModal}
        onHide={handleOnHideModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Detalles del Egreso
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <Col sm={8} md={8} lg={8} xs={8}>
                {
                  Object.keys(detailExpensive).length > 0 ? (
                    <ul className="list-group">
                      <li className="list-group-item text-center"><b>Fecha de Ejecución:</b> { moment(detailExpensive.date_execution).format('DD-MM-YYYY') } </li>
                      <li className="list-group-item text-center"><b>¿Es recurrente?:</b> { detailExpensive.is_recurrent ? 'Si' : 'No' } </li>
                      {
                        detailExpensive.document_1 ? (
                          <li className="list-group-item text-center">
                            <b>Descargar Archivo Adjunto1:</b>
                            <Button size="sm" variant="link" onClick={() => downloadDocument(detailExpensive.document_1) }>Descargar <FaCloudDownloadAlt /> </Button>
                          </li>
                        ) : ''
                      }

                      {
                        detailExpensive.document_2 ? (
                          <li className="list-group-item text-center">
                            <b>Descargar Archivo Adjunto2:</b>
                            <Button size="sm" variant="link" onClick={() => downloadDocument(detailExpensive.document_2) }>Descargar <FaCloudDownloadAlt /> </Button>
                        </li>
                        ) : ''
                      }

                    </ul>
                  ) : ''
                }
              </Col>
            </Row>
          </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={handleOnHideModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

FlowCashEarningPage.propTypes = {
  centerCostes: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired
}

FlowCashEarningPage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name',
    label : 'Nombre',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDescription: {
    type: 'textarea',
    required: true,
    name: 'description',
    label : 'Descripción',
    rows: '2',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputAmount: {
    type: 'number',
    required: true,
    name: 'amount',
    label : 'Monto',
    step: 'any',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputAccount: {
    type: 'select',
    required: true,
    name: 'id_flow_cash_account',
    label : 'Cuenta',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCoste: {
    type: 'select',
    required: true,
    name: 'id_flow_cash_center_cost',
    label : 'Centro de Costo',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDateExecution: {
    type: 'date',
    required: false,
    name: 'date_execution',
    label : 'Fecha de Ejecución',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default FlowCashEarningPage
