import React, {useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { FaImage, FaCogs,FaPlusCircle, FaTrash } from "react-icons/fa";
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { setConfigStore } from 'actions/configs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { formatRut } from 'utils/functions'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image
} from 'react-bootstrap'


const ConfigStoreFormPage = (props) => {

  const [dataStore,setDataStore] = useState({
    logo: '',
    name_store: '',
    country: '',
    phone: '',
    whatssap: '',
    address: '',
    email: '',
    tax: '',
    handle_stock: false,
    header_text: '',
    foot_page_text: '',
    client_data_foot_page: '',
    ref: 1,
    rut: '',
  })
  const [logo, setLogo] = useState([])
  const [paises, setPaises] = useState([])
  const [validate, setValidate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [ imgComponent, setImgComponent ] = useState(
    <Image src={  require('../assets/img/utils/empty_logo.jpg') }
      id="imagen_logo" style={{ width: '80px' }} roundedCircle />
  )

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  const onChange = e => {
    if(e.target.name === "client_data_foot_page"){
      setDataStore({ ...dataStore, [e.target.name] : e.target.value === "true" ? true : false })
    }else if(e.target.name === "rut"){
      let val = formatRut(e.target.value)
      setDataStore({ ...dataStore, [e.target.name] : val })
    }else{
      setDataStore({ ...dataStore, [e.target.name] : e.target.value })
    }
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL+'country')
    ]

    if(props.match.params.id || (JSON.parse(localStorage.getItem('user')).id_rol == 2 && props.id_branch_office)){
      promise.push(
        axios.get(API_URL+'config_store')
      )
    }
    Promise.all(promise).then(result => {

      setPaises(result[0].data)
      if(result.length > 1 && result[1].data){
        setDataStore({
          logo: result[1].data.logo,
          name_store: result[1].data.name_store,
          country: result[1].data.country,
          phone: result[1].data.phone,
          whatssap: result[1].data.whatssap,
          address: result[1].data.address,
          email: result[1].data.email,
          header_text: result[1].data.header_text,
          tax: result[1].data.tax,
          handle_stock: result[1].data.handle_stock,
          foot_page_text: result[1].data.foot_page_text,
          client_data_foot_page: result[1].data.client_data_foot_page,
          ref: result[1].data.ref,
          rut: result[1].data.rut,
        })
        setIsUpdate(true)
        if(result[1].data.logo){
          setImgComponent(
            <Image src={  API_URL+'images/store/logo/'+ result[1].data.logo}
              id="imagen_logo" style={{ width: '80px' }} roundedCircle />
          )
        }
      }else{
        if((JSON.parse(localStorage.getItem('user')).id_rol == 2 && !props.id_branch_office)){
          setDataStore({
            logo: '',
            name_store: '',
            country: '',
            phone: '',
            whatssap: '',
            address: '',
            email: '',
            tax: '',
            handle_stock: false,
            header_text: '',
            foot_page_text: '',
            client_data_foot_page: '',
            ref: 1,
            rut: ''
          })
        }
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

    let formData = new FormData()

    Object.keys(dataStore).forEach((v,i) => {
      if(v === 'logo'){
        if(logo){
          formData.append(v,logo)
        }
      }else{
        formData.append(v,dataStore[v])
      }
    })

    if(isUpdate){
      axios.put(API_URL+'config_store/'+props.match.params.id,formData).then(result => {
        toast.success('Configuración Modificada')
        localStorage.setItem('configStore',JSON.stringify(result.data))
        setTimeout(() => {
          props.history.push('/config/config_store')
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
      axios.post(API_URL+'config_store',formData).then(result => {
        toast.success('Configuración Creada')
        localStorage.setItem('configStore',JSON.stringify(result.data))
        setTimeout(() => {
          props.history.push('/config/config_store')
        },1500)

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

  const goToConfig = () => {
    props.history.replace('/config/config_store')
  }

  const pickLogo = () => {
    document.getElementById('file_logo').click()
  }

  const readLogoImg = e => {

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here
      document.getElementById('imagen_logo').src = event.target.result
      setLogo(file)
    };

    reader.readAsDataURL(file);
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate validated={validate}>
        <Row className="justify-content-center containerDiv">
          <Col sm={12} md={12} lg={12}>
            <h3 className="text-center font-title">Datos de la Tienda</h3>
            <br/>
          </Col>
          <Col sm={6} md={6} lg={6} xs={6} className="">
            <br/>
            <Row className="align-items-center">
              <Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" size="sm" onClick={pickLogo} variant="secondary" block="true">
                  Escoger Logo <FaImage />
                </Button>
                <input type="file" id="file_logo" style={{display: 'none'}} onChange={readLogoImg} />
              </Col>
              <Col sm={6} md={6} lg={6} xs={6} className="text-center">
                {imgComponent}
              </Col>
            </Row>
            <br/>
            <Row>
              <InputField
               type='text'
               label='Rut'
               name='rut'
               required={false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={dataStore.rut}
               handleChange={onChange}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputNameStore}
                handleChange={onChange}
                value={dataStore.name_store}
              />
              <InputField
                {...props.inputEmail}
                handleChange={onChange}
                value={dataStore.email}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputCountry}
                handleChange={onChange}
                value={ dataStore.country }
              >
                <option value=''>--Seleccione--</option>
                {paises.map((v,i) => (
                  <option value={v.id} key={i}>{v.nombre}</option>
                ))}
              </InputField>
              <InputField
                {...props.inputPhone}
                handleChange={onChange}
                value={dataStore.phone}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputWhatssap}
                handleChange={onChange}
                value={dataStore.whatssap}
              />
              <InputField
                {...props.inputAddress}
                handleChange={onChange}
                value={dataStore.address}
              />
            </Row>
            <OverlayTrigger placement={'top'} overlay={
                <Tooltip id="tooltip-disabled1">
                  Campos para especificar el tax que se le va a colocar a los productos y si se maneja inventario a la hora de facturar una venta
                </Tooltip>
              }
            >
              <Row>
                <InputField
                  {...props.inputTax}
                  handleChange={onChange}
                  value={dataStore.tax}
                />
                <InputField
                  {...props.inputHandleStock}
                  handleChange={onChange}
                  value={dataStore.handle_stock}
                >
                  <option value={false}>No</option>
                  <option value={true}>Si</option>
                </InputField>
              </Row>
            </OverlayTrigger>
          </Col>
          <Col sm={6} md={6} lg={6} xs={6} className="">
            <h4 className="text-center font-title">Datos de la Factura</h4>
              <OverlayTrigger placement={'top'} overlay={
                  <Tooltip id="tooltip-disabled1">
                    Campos para especificar que texto saldrá en el encabezado de la factura y en el pie de página ( No es requerido )
                  </Tooltip>
                }
              >
                <Row>
                  <InputField
                    {...props.inputHeaderText}
                    handleChange={onChange}
                    value={dataStore.header_text}
                  />
                  <InputField
                    {...props.inputFooterPageText}
                    handleChange={onChange}
                    value={dataStore.foot_page_text}
                  />
                </Row>
              </OverlayTrigger>
              <br/>
              <OverlayTrigger placement={'top'} overlay={
                  <Tooltip id="tooltip-disabled1">
                    Campo para determinar desde que número empieza la facturación en las ventas
                  </Tooltip>
                }
              >
                <Row>
                  <InputField
                    {...props.inputRef}
                    handleChange={onChange}
                    value={dataStore.ref}
                  />
                </Row>
              </OverlayTrigger>
              <br/>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <label htmlFor="" className="form-control-label">Datos del Cliente en el Pie de Página</label>
                </Col>
                <br/>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <label htmlFor="check1" className="form-control-label">Activado</label>
                  &nbsp;&nbsp;&nbsp;
                  <input id="check1" name="client_data_foot_page" type="checkbox" checked={dataStore.client_data_foot_page === true} value={true} onChange={onChange} />
                </Col>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <label htmlFor="check2" className="form-control-label">Desactivado</label>
                  &nbsp;&nbsp;&nbsp;
                  <input id="check2" name="client_data_foot_page" type="checkbox" checked={dataStore.client_data_foot_page === false} value={false} onChange={onChange} />
                </Col>
              </Row>
              <br/><br/>
              <Row className="justify-content-center">
                <Col sm={12} md={12} lg={12} xs={12} className="">
                  <Button size="sm" size="sm" type="submit" variant="primary" block={true}>Guardar <FaPlusCircle /></Button>
                  <br/>
                  <p className="text-center">O</p>
                  <Button size="sm" size="sm" type="button" onClick={goToConfig} variant="info" block={true}>Volver a la Configuracipon <FaCogs /></Button>
                </Col>
              </Row>
            </Col>
          </Row>
      </Form>
    </Container>
  )
}


ConfigStoreFormPage.defaultProps ={
  inputNameStore: {
    type: 'text',
    required: true,
    name: 'name_store',
    label : 'Nombre de la Tienda',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputEmail: {
    type: 'email',
    required: false,
    name: 'email',
    label : 'Correo',
    messageErrors: [
      'Requerido*', ' Formato Email*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputCountry: {
    type: 'select',
    required: true,
    name: 'country',
    label : 'País',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputPhone: {
    type: 'number',
    required: false,
    name: 'phone',
    label : 'Teléfono',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputWhatssap: {
    type: 'number',
    required: false,
    name: 'whatssap',
    label : 'Whatssap',
    messageErrors: [],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputAddress: {
    type: 'textarea',
    required: false,
    name: 'address',
    label : 'Dirección',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputTax: {
    type: 'number',
    required: true,
    name: 'tax',
    label : 'Tax',
    messageErrors: [],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputHandleStock: {
    type: 'select',
    required: true,
    name: 'handle_stock',
    label : 'Maneja Inventario',
    messageErrors: [],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputHeaderText: {
    type: 'textarea',
    required: false,
    rows: 3,
    name: 'header_text',
    label : 'Texto de Cabecera',
    messageErrors: [],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputFooterPageText: {
    type: 'textarea',
    required: false,
    rows: 3,
    name: 'foot_page_text',
    label : 'Texto Pie de Página',
    messageErrors: [],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputRut: {
    type: 'text',
    required: false,
    name: 'rut',
    label : 'Rut de la tienda',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputRef: {
    type: 'number',
    required: true,
    name: 'ref',
    label : 'Número de referencia',
    placeholder:'Número de referencia de venta',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
}

function mapDispatchToProps(){
  return {
    setConfigStore
  }
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

ConfigStoreFormPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfigStoreFormPage)
