import React, { useMemo, useState, useEffect } from 'react'
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
  Form
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { API_URL } from 'utils/constants'
import { providerRepresentColumns } from 'utils/columns/provider'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ProviderRepresentPage = (props) => {

  const id_provider = props.match.params.id
  const [validate,setValidate] = useState(false)
  const [isUpdate,setIsUpdate] = useState(false)
  const [represent,setRepresent] = useState([])
  const [dataRepresent,setDataRepresent] = useState({
    name_contact: '',
    phone: '',
    email: '',
    position: '',
    id_provider
  })

  useEffect(() => {
    fetchData()
  },[])

  useMemo(() => {

    if(providerRepresentColumns[0].columns.length > 4){
      providerRepresentColumns[0].columns.pop()
    }

    providerRepresentColumns[0].columns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
            <Dropdown.Item onClick={() => modifyRegister(props.cell.row.original)}>Modificar</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
          </DropdownButton>
        )
      }
    })

  },[])

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
    axios.delete(API_URL+'provider_contact/'+id).then(result => {
      toast.success('Registro eliminado con éxito')
      fetchData()
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const modifyRegister = data => {

    const objectModify = Object.assign({},dataRepresent,{
      name_contact: data.name_contact,
      phone: data.phone,
      position: data.position,
      email: data.email,
      id: data.id
    })
    setIsUpdate(true)
    setDataRepresent(objectModify)
    document.getElementById('name_contact').focus()
  }

  const fetchData = () => {
    axios.get(API_URL+'provider_contact/'+id_provider).then(result => {
      setRepresent(result.data)
    }).catch(err => {
      const { response } = err
      console.log(err,response)
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToProvider = () => {
    props.history.replace('/provider/list')
  }

  // ========== SECCION FORMULARIO =========================
  const onChange = async e => {
    await setDataRepresent({...dataRepresent, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    let data = Object.assign({},dataRepresent)

    if(isUpdate){
      axios.put(API_URL+'provider_contact/'+data.id,data).then(result => {
        toast.success('Conctacto Modificado')
        cleanForm()
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
      axios.post(API_URL+'provider_contact',data).then(result => {
        toast.success('Contacto Creado')
        fetchData()
        cleanForm()
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
    setIsUpdate(false)
    setValidate(false)
    setDataRepresent({
      name_contact: '',
      email: '',
      phone: '',
      position: '',
      id_provider
    })
  }

  const cancelUpdate = () => {
    cleanForm()
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <h1 className="text-center font-title">Formulario De Contacto</h1>
          <br/>
          <Form onSubmit={onSubmit} noValidate validated={validate}>
            <Row>
              <InputField
                {...props.inputName}
                handleChange={onChange}
                value={dataRepresent.name_contact}
              />
              <InputField
                {...props.inputEmail}
                handleChange={onChange}
                value={dataRepresent.email}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputPhone}
                handleChange={onChange}
                value={dataRepresent.phone}
              />
              <InputField
                {...props.inputPosition}
                handleChange={onChange}
                value={dataRepresent.position}
              />
            </Row>
            <Row className="justify-content-center">
              <Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" type="submit" variant="primary" block="true">Guardar <FaPlusCircle /></Button>
              </Col>
            </Row>
            {isUpdate ? (
              <Row className="justify-content-center">
                <Col sm={6} md={6} lg={6} xs={6}>
                  <br/>
                  <Button size="sm" type="button" onClick={cancelUpdate} variant="secondary" block="true">Cancelar Modificación</Button>
                </Col>
              </Row>
            ) : (
              <Row className="justify-content-center">
                <Col sm={6} md={6} lg={6} xs={6}>
                  <br/>
                  <Button size="sm" type="button" onClick={goToProvider} variant="info" block="true">Ir a los Proveedores</Button>
                </Col>
              </Row>
            )}

          </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Table columns={providerRepresentColumns} data={represent} />
        </Col>
      </Row>
    </Container>
  )
}

ProviderRepresentPage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name_contact',
    label : 'Nombre Completo',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputPosition: {
    type: 'text',
    required: true,
    name: 'position',
    label : 'Cargo',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputEmail: {
    type: 'email',
    required: true,
    name: 'email',
    label : 'Correo',
    messageErrors: [
      'Requerido*, ','Formato tipo Email*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputPhone: {
    type: 'number',
    required: true,
    name: 'phone',
    label : 'Teléfono',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
}


export default ProviderRepresentPage
