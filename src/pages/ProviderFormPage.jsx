import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { FaTruck, FaPlusCircle } from "react-icons/fa";
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { formatRut } from 'utils/functions'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image
} from 'react-bootstrap'
import LoadingComponent from 'components/LoadingComponent'

const ProviderFormPage = (props) => {

  const [dataProvider, setDataProvider] = useState({
    name_fantasy: '',
    rut_provider: '',
    id_country: '',
    comuna: '',
    city: '',
    phone: '',
    spin: '',
    social_razon: '',
    address: '',
    type_id: 1,
  })

  const [paises, setPaises] = useState([])
  const [isCreated, setIsCreated] = useState(false)
  const [validate, setValidate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    validateConfig()
    fetchData()
  }, [])

  useEffect(() => {

    setDataProvider({ ...dataProvider, id_country: props.configStore && Object.keys(props.configStore).length > 0 ? props.configStore.country : '' })
  }, [props.id_branch_office])

  const onChange = async e => {
    if (e.target.name === "type_id") {
      setDataProvider({ ...dataProvider, [e.target.name]: e.target.value, rut_provider: '' })
    } else if (e.target.name === "rut_provider") {
      setDataProvider({ ...dataProvider, [e.target.name]: dataProvider.type_id == 1 ? formatRut(e.target.value) : e.target.value })
    } else {
      setDataProvider({ ...dataProvider, [e.target.name]: e.target.value })
    }
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL + 'country')
    ]

    if (props.match.params.id) {
      promise.push(
        axios.get(API_URL + 'provider/' + atob(props.match.params.id))
      )
    }

    Promise.all(promise).then(result => {

      setPaises(result[0].data)
      if (result.length > 1) {
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
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
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

    let data = Object.assign({}, dataProvider)
    setDisplayLoading(true)
    if (isUpdate) {
      axios.put(API_URL + 'provider/' + atob(props.match.params.id), data).then(result => {
        toast.success('Configuración Modificada')

        setTimeout(() => {
          props.history.push('/provider/list')
        }, 1500)
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
      })
    } else {
      axios.post(API_URL + 'provider', data).then(result => {
        toast.success('Proveedor Creado')

        cleanForm()
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
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
      type_id: 1,
    })
    setValidate(false)
  }

  const registerAnotherOne = () => {
    setIsCreated(false)
  }

  const validateConfig = () => {

  }

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate validated={validate}>
        <>
          {displayLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row className="justify-content-center align-items-center">
                <Col sm={12} md={12} lg={12} xs={12} className="containerDivSeparated">
                  <h4 className="title_principal">Formulario de Proveedores</h4>
                  <br />
                  <Row>
                    <InputField
                      {...props.inputSocialRazon}
                      handleChange={onChange}
                      value={dataProvider.social_razon}
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
                    {dataProvider.type_id && dataProvider.type_id == 1 ? (
                      <InputField
                        onChange={onChange} value={dataProvider.rut_provider} {...props.inputRut} handleChange={onChange}
                      />
                    ) : dataProvider.type_id && dataProvider.type_id == 2 ? (
                      <InputField
                        {...props.inputId}
                        handleChange={onChange}
                        value={dataProvider.rut_provider}
                      />
                    ) : ''}
                    <InputField
                      {...props.inputNameFantasy}
                      handleChange={onChange}
                      value={dataProvider.name_fantasy}
                    />
                  </Row>
                  <Row>
                    <InputField
                      {...props.inputCountry}
                      handleChange={onChange}
                      value={dataProvider.id_country}
                    >
                      <option value=''>--Seleccione--</option>
                      {paises.map((v, i) => (
                        <option value={v.id} key={i}>{v.nombre}</option>
                      ))}
                    </InputField>
                    <InputField
                      {...props.inputComuna}
                      handleChange={onChange}
                      value={dataProvider.comuna}
                    />
                    <InputField
                      {...props.inputCity}
                      handleChange={onChange}
                      value={dataProvider.city}
                    />
                  </Row>
                  <Row>
                    <InputField
                      {...props.inputPhone}
                      handleChange={onChange}
                      value={dataProvider.phone}
                    />
                    <InputField
                      {...props.inputSpin}
                      handleChange={onChange}
                      value={dataProvider.spin}
                    />
                    <InputField
                      {...props.inputAddress}
                      handleChange={onChange}
                      value={dataProvider.address}
                    />
                  </Row>
                </Col>
              </Row>
              <br />
              <Row className="justify-content-center">
                <Col sm={6} md={4} lg={4} xs={6}>
                  {isCreated ? (
                    <Button size="sm" type="button" onClick={registerAnotherOne} variant="primary" block={true}>Crear otro <FaPlusCircle /></Button>
                  ) : (
                    <Button size="sm" type="submit" variant="danger" block={true}>Guardar <FaPlusCircle /></Button>
                  )}
                </Col>
                <Col sm={6} md={4} lg={4} xs={6}>
                  <Button size="sm" type="button" onClick={goToProvider} variant="secondary" block={true}>Volver a los Proveedores</Button>
                </Col>
              </Row>
            </>
          )}
        </>
      </Form>
    </Container>
  )
}


ProviderFormPage.defaultProps = {
  inputNameFantasy: {
    type: 'text',
    required: false,
    name: 'name_fantasy',
    label: 'Nombre Fantasia',
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputRut: {
    type: 'text',
    required: true,
    name: 'rut_provider',
    placeholder: 'Introduzca su información',
    label: 'Rut',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputCountry: {
    type: 'select',
    required: false,
    name: 'id_country',
    label: 'País',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputComuna: {
    type: 'text',
    required: false,
    name: 'comuna',
    label: 'Comuna',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputCity: {
    type: 'text',
    required: false,
    name: 'city',
    label: 'Ciudad',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputSpin: {
    type: 'textarea',
    required: false,
    name: 'spin',
    label: 'Giro',
    rows: 1,
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputPhone: {
    type: 'number',
    required: false,
    name: 'phone',
    label: 'Teléfono',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputSocialRazon: {
    type: 'text',
    required: true,
    name: 'social_razon',
    label: 'Razón Social',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputAddress: {
    type: 'textarea',
    required: false,
    name: 'address',
    label: 'Dirección',
    rows: 1,
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputTypeId: {
    type: 'select',
    required: true,
    name: 'type_id',
    label: 'Tipo de Id',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  inputId: {
    type: 'number',
    required: true,
    name: 'rut_provider',
    label: 'Identificación Fiscal',
    placeholder: 'Ingrese su información personal',
    messageErrors: [
      'Requerido*'
    ],
    cols: "col-sm-6 col-md-4 col-lg-4 col-xs-6"
  },
  maskInput: {
    formatChars: {
      '*': '[A-Za-z0-9]'
    },
    mask: '**.***.***-*'
  }
}


function mapStateToProps(state) {
  return {
    configStore: state.configs.configStore,
    id_branch_office: state.enterpriseSucursal.id_branch_office
  }
}

export default connect(mapStateToProps, {})(ProviderFormPage)
