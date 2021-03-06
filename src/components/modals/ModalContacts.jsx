import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';
import { API_URL } from 'utils/constants'
import 'styles/components/modalComponents.scss'
import axios from 'axios'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { formatRut } from 'utils/functions'
import Table from 'components/Table'

let contactColumns = []

const ModalContacts = (props) => {

  const [validate, setValidate] = useState(false)
  const [contactData, setContactData] = useState([])
  const [contact, setContact] = useState({
    name: '',
    email: '',
    type_document: '',
    data_document: '',
    phone: '',
    address: '',
    observation: '',
    picture: '',
    id: ''
  })
  const inputRef = useRef(null)

  useMemo(() => {
    contactColumns = [
      {
        Header: 'Nombre',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Teléfono',
        accessor: 'phone'
      },
      {
        Header: 'Dirección',
        accessor: 'address'
      },
      {
        Header: 'Id',
        accessor: props1 => [props1.type_document + ' ' + props1.data_document],
      },
      {
        Header: 'Observación',
        accessor: 'observation'
      },
      {
        Header: 'Acciones',
        Cell: props1 => {
          const id = props1.cell.row.original.id
          return (
            <DropdownButton size="sm" id={'drop' + id} title="Seleccione" block="true">
              {
                props.handleSelectContact ? (
                  <Dropdown.Item onClick={() => props.handleSelectContact(props1.cell.row.original)}>Seleccionar</Dropdown.Item>
                ) : ''
              }
              <Dropdown.Item onClick={() => modifyRegister(props1.cell.row.original)}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(API_URL + 'contact').then(result => {
      setContactData(result.data)
    }).catch(err => {
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleOnChange = e => {
    e.persist()
    if (e.target.name === "type_document") {
      if (e.target.value === "Rut") {
        setContact(oldData => {
          return Object.assign({}, oldData, {
            data_document: formatRut(oldData.data_document),
            type_document: e.target.value
          })
        })
      } else {
        setContact(oldData => {
          return Object.assign({}, oldData, {
            data_document: oldData.data_document.replace(/-/g, ''),
            type_document: e.target.value
          })
        })
      }
    } else if (e.target.name === "data_document") {
      setContact({ ...contact, [e.target.name]: contact.type_document === "Rut" ? formatRut(e.target.value) : e.target.value })
    } else {
      setContact({ ...contact, [e.target.name]: e.target.value })
    }
  }

  const onSubmit = () => {

    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidate(true);
      return
    }

    const dataSend = Object.assign({}, contact)

    if (dataSend.id) {
      axios.put(API_URL + 'contact/' + dataSend.id, dataSend).then(result => {
        toast.success('Contacto Modificado')
        clearData()
        fetchData()
      }).catch(err => {
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error, contacte con soporte')
        }
      })
    } else {
      axios.post(API_URL + 'contact', dataSend).then(result => {
        toast.success('Contacto Registrado')
        clearData()
        fetchData()
      }).catch(err => {
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error, contacte con soporte')
        }
      })
    }

  }

  const clearData = () => {
    setContact({
      name: '',
      email: '',
      type_document: '',
      data_document: '',
      phone: '',
      address: '',
      observation: '',
      picture: ''
    })
  }

  const modifyRegister = updateClient => {
    setContact({
      name: updateClient.name,
      email: updateClient.email,
      type_document: updateClient.type_document,
      data_document: updateClient.data_document,
      phone: updateClient.phone,
      address: updateClient.address,
      observation: updateClient.observation,
      picture: updateClient.picture,
      id: updateClient.id
    })
  }

  const deleteRegister = id => {
    axios.delete(API_URL + 'contact/' + id).then(result => {
      toast.success('Contacto Eliminado')
      fetchData()
    }).catch(err => {
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de Contactos <FaUserCircle />
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => { }} noValidate validated={validate} ref={inputRef}>
        <Modal.Body>
          <Row>
            <InputField
              {...props.inputName}
              handleChange={handleOnChange}
              value={contact.name}
            />
            <InputField
              {...props.inputEmail}
              handleChange={handleOnChange}
              value={contact.email}
            />
            <InputField
              {...props.inputTypeDocument}
              handleChange={handleOnChange}
              value={contact.type_document}
            >
              <option value=''>--Seleccione--</option>
              <option value={'Rut'}>Rut</option>
              <option value={'Id'}>Id</option>
              <option value={'Nro pasaporte'}>N° pasaporte</option>
            </InputField>
          </Row>
          <Row>
            <InputField
              {...props.inputDataDocument}
              handleChange={handleOnChange}
              value={contact.data_document}
            />
            <InputField
              {...props.inputPhone}
              handleChange={handleOnChange}
              value={contact.phone}
            />
            <InputField
              {...props.inputAddress}
              handleChange={handleOnChange}
              value={contact.address}
            />
          </Row>
          <Row>
            <InputField
              {...props.inputObservation}
              handleChange={handleOnChange}
              value={contact.observation}
            />
          </Row>
          <Row className="justify-content-center">
            <Col sm={6} md={6} lg={6}>
              <Button size="sm" variant="success" type="button" onClick={onSubmit} block={true}>Guardar <FaPlusCircle /></Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Table columns={contactColumns} data={contactData} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="md" onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalContacts.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSelectContact: PropTypes.func,
}

ModalContacts.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name',
    label: 'Nombre',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputEmail: {
    type: 'email',
    required: false,
    name: 'email',
    label: 'Email',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*, ', 'Formato Tipo Email*'
    ],
  },
  inputPhone: {
    type: 'number',
    required: false,
    name: 'phone',
    label: 'Teléfono',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [],
  },
  inputAddress: {
    type: 'textarea',
    required: false,
    name: 'address',
    label: 'Dirección',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    rows: 2,
    messageErrors: [],
  },
  inputTypeDocument: {
    type: 'select',
    required: false,
    name: 'type_document',
    label: 'Tipo de Documento',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDataDocument: {
    type: 'text',
    required: false,
    name: 'data_document',
    label: 'Información Identidad',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    placeholder: 'Introduzca su rut, id o su n° de pasaporte',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputObservation: {
    type: 'textarea',
    required: false,
    name: 'observation',
    label: 'Observación',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    rows: 2,
    messageErrors: [],
  },

}

export default ModalContacts
