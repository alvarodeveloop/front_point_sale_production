import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';
import { API_URL } from 'utils/constants'
import 'styles/components/modalComponents.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'

const FormClientModal = (props) => {

  const [validate, setValidate] = useState(false)

  const [client,setClient] = useState({
    name_client: '',
    email: '',
    type_document: '',
    data_document: '',
    phone: '',
    address: '',
    observation: '',
    picture: ''
  })

  useEffect(() => {
    if(props.dataModify){
      let updateClient = Object.assign({},props.dataModify)
      setClient({
        name_client : updateClient.name_client,
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
  },[props.dataModify])

  const handleOnChange = e => {
    setClient({...client, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    const dataSend = Object.assign({},client)

    if(props.dataModify){
      axios.put(API_URL+'client/'+dataSend.id,dataSend).then(result => {
        toast.success('Cliente Modificado')
        handleOnHide()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'client',client).then(result => {
        toast.success('Cliente Registrado')
        handleOnHide()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }

  }

  const handleOnHide = () => {
    setClient({
      name_client: '',
      email: '',
      type_document: '',
      data_document: '',
      phone: '',
      address: '',
      observation: '',
      picture: ''
    })
    props.onHide()
  }

  return (
    <Modal
      show={props.isShow}
      onHide={handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de Clientes <FaUserCircle/>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit} noValidate validated={validate}>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} xs={12}>
              <Row>
                <InputField
                  {...props.inputName}
                  handleChange={handleOnChange}
                  value={client.name_client}
                />
                <InputField
                  {...props.inputEmail}
                  handleChange={handleOnChange}
                  value={client.email}
                />
              </Row>
              <Row>
                <InputField
                  {...props.inputTypeDocument}
                  handleChange={handleOnChange}
                  value={client.type_document}
                >
                  <option value=''>--Seleccione--</option>
                  <option value={'Rut'}>Rut</option>
                  <option value={'Id'}>Id</option>
                  <option value={'Nro pasaporte'}>N° pasaporte</option>
                </InputField>
                <InputField
                  {...props.inputDataDocument}
                  handleChange={handleOnChange}
                  value={client.data_document}
                />
              </Row>
              <Row>
                <InputField
                  {...props.inputPhone}
                  handleChange={handleOnChange}
                  value={client.phone}
                />
                <InputField
                  {...props.inputAddress}
                  handleChange={handleOnChange}
                  value={client.address}
                />
              </Row>
              <Row>
                <InputField
                  {...props.inputObservation}
                  handleChange={handleOnChange}
                  value={client.observation}
                />
              </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="success" type="submit">Guardar</Button>
        <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

FormClientModal.propTypes = {
  isShow : PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  dataModify: PropTypes.object,
}

FormClientModal.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name_client',
    label : 'Nombre Cliente',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputEmail: {
    type: 'email',
    required: false,
    name: 'email',
    label : 'Email',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*, ','Formato Tipo Email*'
    ],
  },
  inputPhone: {
    type: 'phone',
    required: false,
    name: 'phone',
    label : 'Teléfono',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [],
  },
  inputAddress: {
    type: 'textarea',
    required: false,
    name: 'address',
    label : 'Dirección',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    rows: 3,
    messageErrors: [],
  },
  inputTypeDocument: {
    type: 'select',
    required: false,
    name: 'type_document',
    label : 'Tipo de Documento',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDataDocument: {
    type: 'text',
    required: false,
    name: 'data_document',
    label : 'Información Identidad',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    placeholder: 'Introduzca su rut, id o su n° de pasaporte',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputObservation: {
    type: 'textarea',
    required: false,
    name: 'observation',
    label : 'Observación',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    rows: 3,
    messageErrors: [],
  },

}

export default FormClientModal
