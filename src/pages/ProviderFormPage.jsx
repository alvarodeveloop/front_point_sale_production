import React, { useMemo, useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { FaTruck,FaPlusCircle } from "react-icons/fa";
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import InputMask from 'react-input-mask'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image
} from 'react-bootstrap'

const ProviderFormPage = (props) => {

  const [dataProvider,setDataProvider] = useState({
    name_fantasy: '',
    rut_provider: '',
    id_country: localStorage.getItem('configStore') ? JSON.parse(localStorage.getItem('configStore')).country : '',
    comuna: '',
    city: '',
    phone: '',
    spin: '',
    social_razon: '',
    address: '',
    type_id: '',
  })

  const [paises, setPaises] = useState([])
  const [isCreated,setIsCreated] = useState(false)
  const [validate, setValidate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    validateConfig()
    fetchData()
  },[])

  const onChange = async e => {
    if(e.target.name === "type_id"){
      await setDataProvider({...dataProvider, [e.target.name] : e.target.value, rut_provider: ''})
    }else if(e.target.name === "rut_provider"){
      let val = e.target.value
      val = val.split('-').join('')
      console.log(val,'aqui moton');
      if(val){
        let val1 = val.substring(0,val.length -1)+'-'+val.substring(val.length -1)
        await setDataProvider({...dataProvider, [e.target.name] : val1})
      }else{
        await setDataProvider({...dataProvider, [e.target.name] : val})
      }

    }else{
      await setDataProvider({...dataProvider, [e.target.name] : e.target.value})
    }
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL+'country')
    ]

    if(props.match.params.id){
      promise.push(
        axios.get(API_URL+'provider/'+atob(props.match.params.id))
      )
    }

    Promise.all(promise).then(result => {

      setPaises(result[0].data)
      if(result.length > 1){
        setDataProvider({
          name_fantasy: result[1].data.name_fantasy,
          rut_provider: result[1].data.rut_provider,
          id_country: result[1].data.id_country,
          comuna: result[1].data.comuna,
          city: result[1].data.city,
          phone: result[1].data.phone,
          spin: result[1].data.spin,
          social_razon: result[1].data.social_razon,
          address: result[1].data.address,
          type_id: result[1].data.type_id,
        })
        setIsUpdate(true)
      }

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error,contacte con soporte')
      }
    })
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    let data = Object.assign({},dataProvider)

    if(isUpdate){
      axios.put(API_URL+'provider/'+atob(props.match.params.id),data).then(result => {
        toast.success('Configuración Modificada')

        setTimeout(() => {
          props.history.push('/provider/list')
        },1500)

      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'provider',data).then(result => {
        toast.success('Proveedor Creado')

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

  const goToProvider = () => {
    props.history.replace('/provider/list')
  }

  const cleanForm = () => {
    setIsCreated(true)
    setDataProvider({
      name_fantasy: '',
      rut_provider: '',
      id_country: '',
      comuna: '',
      city: '',
      phone: '',
      spin: '',
      social_razon: '',
      address: '',
      type_id: '',
    })
  }

  const registerAnotherOne = () => {
    setIsCreated(false)
  }

  const validateConfig = () => {

  }

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate validated={validate}>
        <Row className="justify-content-center align-items-center">
          <Col sm={7} md={7} lg={7} xs={12} className="containerDivSeparated">
            <h3 className="text-center font-title">Datos del Proveedor</h3>
            <br/>
            <Row>
              <InputField
                {...props.inputNameFantasy}
                handleChange={onChange}
                value={dataProvider.name_fantasy}
              />
              <InputField
                {...props.inputTypeId}
                handleChange={onChange}
                value={dataProvider.type_id}
              >
                <option value="">--Seleccione--</option>
                <option value={1}>Rut</option>
                <option value={2}>Identificación Fiscal</option>
              </InputField>
            </Row>
            {dataProvider.type_id && dataProvider.type_id == 1 ? (
              <Row>
                <Form.Group className="col-md-6 col-sm-6 col-lg-6 col-12">
                  <Form.Label className="fontBold">Rut</Form.Label>
                  {/*<InputMask onChange={onChange} value={dataProvider.rut_provider} {...props.maskInput} {...props.inputRut}>
                    { (inputProps) => <Form.Control {...inputProps} /> }
                  </InputMask> */}
                  <Form.Control onChange={onChange} value={dataProvider.rut_provider} {...props.inputRut} />
                  <Form.Control.Feedback type="invalid">
                    <span className="error-input">Requerido*</span>
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            ) : dataProvider.type_id && dataProvider.type_id == 2 ? (
              <Row>
                <InputField
                  {...props.inputId}
                  handleChange={onChange}
                  value={dataProvider.rut_provider}
                />
              </Row>
            ) : ''}
            <Row>
              <InputField
                {...props.inputCountry}
                handleChange={onChange}
                value={dataProvider.id_country}
              >
                <option value=''>--Seleccione--</option>
                {paises.map((v,i) => (
                  <option value={v.id} key={i}>{v.nombre}</option>
                ))}
              </InputField>
              <InputField
                {...props.inputComuna}
                handleChange={onChange}
                value={dataProvider.comuna}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputCity}
                handleChange={onChange}
                value={dataProvider.city}
              />
              <InputField
                {...props.inputPhone}
                handleChange={onChange}
                value={dataProvider.phone}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputSpin}
                handleChange={onChange}
                value={dataProvider.spin}
              />
              <InputField
                {...props.inputSocialRazon}
                handleChange={onChange}
                value={dataProvider.social_razon}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputAddress}
                handleChange={onChange}
                value={dataProvider.address}
              />
            </Row>
          </Col>
          <Col sm={3} md={3} lg={3} xs={6} className="containerDivSeparated justify-content-center align-items-center">
            {isCreated ? (
              <a onClick={registerAnotherOne} href="javascript:void(0)" className="btn btn-secondary btn-block">Crear Otro <FaPlusCircle /></a>
            ) : (
              <Button size="sm" type="submit" variant="primary" block={true}>Guardar <FaPlusCircle /></Button>
            )}
            <br/>
            <p className="text-center">O</p>
            <Button size="sm" type="button" onClick={goToProvider} variant="info" block={true}>Volver a los Proveedores</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}


ProviderFormPage.defaultProps ={
  inputNameFantasy: {
    type: 'text',
    required: true,
    name: 'name_fantasy',
    label : 'Nombre Fantasia',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputRut: {
    type: 'text',
    required: true,
    name: 'rut_provider',
    placeholder: 'Introduzca su información',
  },
  inputCountry: {
    type: 'select',
    required: true,
    name: 'id_country',
    label : 'País',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputComuna: {
    type: 'text',
    required: true,
    name: 'comuna',
    label : 'Comuna',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputCity: {
    type: 'text',
    required: true,
    name: 'city',
    label : 'Ciudad',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputSpin: {
    type: 'textarea',
    required: true,
    name: 'spin',
    label : 'Giro',
    rows: 2,
    messageErrors: [
      'Requerido*'
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
  inputSocialRazon: {
    type: 'text',
    required: true,
    name: 'social_razon',
    label : 'Razón Social',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputAddress: {
    type: 'textarea',
    required: true,
    name: 'address',
    label : 'Dirección',
    rows: 2,
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputTypeId: {
    type: 'select',
    required: true,
    name: 'type_id',
    label : 'Tipo de Id',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputId: {
    type: 'number',
    required: true,
    name: 'rut_provider',
    label : 'Identificación Fiscal',
    placeholder: 'Ingrese su información personal',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  maskInput : {
    formatChars: {
      '*': '[A-Za-z0-9]'
    },
    mask: '**.***.***-*'
  }
}

export default ProviderFormPage
