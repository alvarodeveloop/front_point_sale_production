
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import { FaUserCircle, FaSave, FaSearch } from 'react-icons/fa';
import { API_URL } from 'utils/constants'
import 'styles/components/modalComponents.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { formatRut } from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent'

const FormClientModal = (props) => {

  const [validate, setValidate] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(false)

  const [client,setClient] = useState({
    name_client: '',
    email: '',
    type_document: 'Rut',
    data_document: '',
    phone: '',
    address: '',
    observation: '',
    picture: '',
    city: '',
    comunda: '',
    spin: '',
    actividad_economica: ''
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if(props.dataModify){
      let updateClient = Object.assign({},props.dataModify)
      setClient({
        name_client : updateClient.name_client,
        email: updateClient.email,
        type_document: updateClient.type_document,
        data_document: updateClient.data_document+"-"+updateClient.dv,
        phone: updateClient.phone,
        address: updateClient.address,
        observation: updateClient.observation,
        picture: updateClient.picture,
        city: updateClient.city,
        comuna: updateClient.comuna,
        spin: updateClient.spin,
        actividad_economica: updateClient.actividad_economica,

        id: updateClient.id
      })
    }
  },[props.dataModify])

  const handleOnChange = e => {
    if(e.target.name === "type_document"){
      let client_rut = e.target.value === "Rut" ? formatRut(Object.assign({},client).data_document) : Object.assign({},client).data_document.replace(/-/g,'')
      setClient({...client, [e.target.name] : e.target.value, data_document: client_rut})
    }else if(e.target.name === "data_document" && client.type_document === "Rut"){
      setClient({...client, [e.target.name] : formatRut(e.target.value)})
    }else{
      setClient({...client, [e.target.name] : e.target.value})
    }
  }

  const onSubmit = () => {

    const form = inputRef.current

    if (form.checkValidity() === false) {
      setValidate(true);
      return
    }

    const dataSend = Object.assign({},client)
    setDisplayLoading(true)
    if(props.dataModify){
      axios.put(API_URL+'client/'+dataSend.id,dataSend).then(result => {
        toast.success('Cliente Modificado')
        handleOnHide()
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
      axios.post(API_URL+'client',client).then(result => {
        toast.success('Cliente Registrado')
        handleOnHide(true)
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

  const handleOnHide = (create = false) => {
    setClient({
      name_client: '',
      email: '',
      type_document: 'Rut',
      data_document: '',
      phone: '',
      address: '',
      observation: '',
      picture: '',
      city: '',
      comuna: '',
      spin: '',
      actividad_economica: ''
    })
    props.onHide(create)
  }

  const searchClient = async () => {
    if(client.data_document){
      setDisplayLoading(true);
      try {
        let rut = Object.assign({},client).data_document;
        let dv = rut.split('-')[1];
        rut = rut.split("-")[0];
        let result = await axios.get(API_URL+"search_user_simple/"+rut+"/"+dv);
        setClient(currentData => {
          return Object.assign({},currentData, {
            city: result.data.receptor.ciudad_seleccionada,
            comuna : result.data.receptor.comuna_seleccionada,
            address: result.data.receptor.direccion_seleccionada,
          })
        })
        setDisplayLoading(false);
      } catch (error) {
        setDisplayLoading(false);
        if(error.response){
          toast.error(error.response.data.message);
        }else{
          console.log(error);
          toast.error("Error, contacte con soporte");
        }
      }

    }else{
      toast.info("Introduzca un rut para buscar los datos del cliente");
    }
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
      <Form onSubmit={() => {}} noValidate validated={validate} ref={inputRef}>
      {displayLoading ? (
        <Modal.Body>
          <LoadingComponent />
        </Modal.Body>
      ) : (
        <Modal.Body>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
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
                  {client.type_document === "Rut" ? (
                    <Col sm={4} md={4} lg={4}>
                      <br/>
                      <Button block={true} variant="secondary" type="button" size="sm" onClick={searchClient}>Buscar cliente <FaSearch/></Button>
                    </Col>
                  ) : ""}
                </Row>
                <Row>
                  <InputField
                    {...props.inputName}
                    handleChange={handleOnChange}
                    value={client.name_client}
                  />
                </Row>
                <Row>
                  <InputField
                    {...props.inputEmail}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={client.email}
                  />
                  <InputField
                    {...props.inputPhone}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={client.phone}
                    />
                  <InputField
                    {...props.inputAddress}
                    placeholder="opcional"
                    handleChange={handleOnChange}
                    value={client.address}
                  />
                </Row>
                <Row>
                  <InputField
                  type='text'
                  label='Ciudad'
                  name='city'
                  required={false}
                  placeholder="opcional"
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={client.city}
                  handleChange={handleOnChange}
                  />
                  <InputField
                    type='text'
                    label='Comuna'
                    name='comuna'
                    required={false}
                    placeholder="opcional"
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={client.comuna}
                    handleChange={handleOnChange}
                    />
                    <InputField
                    type='text'
                    label='Giro'
                    name='spin'
                    required={false}
                    placeholder="opcional"
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={client.spin}
                    handleChange={handleOnChange}
                    />
                </Row>
                <Row>
                  <InputField
                    {...props.inputObservation}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={client.observation}
                    />
                    <InputField
                    type='text'
                    label='Actividad Económica'
                    placeholder="opcional"
                    name='actividad_economica'
                    required={false}
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={client.actividad_economica}
                    handleChange={handleOnChange}
                    />
                </Row>
            </Col>
          </Row>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button size="md" variant="danger" type="button" onClick={onSubmit}>Guardar</Button>
        <Button size="md" variant="secondary" onClick={handleOnHide}>Cerrar</Button>
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
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputEmail: {
    type: 'email',
    required: false,
    name: 'email',
    label : 'Email',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*, ','Formato Tipo Email*'
    ],
  },
  inputPhone: {
    type: 'number',
    required: false,
    name: 'phone',
    label : 'Teléfono',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [],
  },
  inputAddress: {
    type: 'text',
    required: false,
    name: 'address',
    label : 'Dirección',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",

    messageErrors: [],
  },
  inputTypeDocument: {
    type: 'select',
    required: false,
    name: 'type_document',
    label : 'Tipo de Documento',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDataDocument: {
    type: 'text',
    required: false,
    name: 'data_document',
    label : 'Información Identidad',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
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
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",
    rows: 2,
    messageErrors: [],
  },

}

export default FormClientModal
