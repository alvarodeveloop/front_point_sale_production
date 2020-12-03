import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image
} from 'react-bootstrap'
import { FaTrash,FaImage,FaCheckCircle,FaCogs } from "react-icons/fa";
import { connect } from 'react-redux'
import InputField from 'components/input/InputComponent'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import 'styles/pages/config_general.css'
import { setConfig } from 'actions/configs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {formatRut} from 'utils/functions'

const ConfigGeneralFormPage = (props) => {

  const [ configData, setConfigData ] = useState({
    simbolo_moneda: '',
    active_price_decimals: '',
    close_session: '',
    actividad_economica: '',
    giro : '',
    rut_legal_representative : '',
    clave_login_sii: '', // clave para hacer login en el  sii
    clave_sii: '', // firma del sii
    file: ''
  })
  const [validated, setValidated] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [imgComponent,setImgComponent] = useState('')

  useEffect(() => {
    if(props.match.params.id){
      fetchDataUpdate()
    }
  },[props.id_enterprise])

  const fetchDataUpdate = () => {
    axios.get(API_URL+'config_general_update').then(result => {

      setConfigData( oldData => {
        return Object.assign({},oldData,{
          simbolo_moneda: result.data.simbolo_moneda,
          active_price_decimals: result.data.active_price_decimals,
          close_session: result.data.close_session,
          actividad_economica: result.data.actividad_economica,
          giro: result.data.giro,
          rut_legal_representative: result.data.rut_legal_representative,
          clave_sii: result.data.clave_sii,
          clave_login_sii: result.data.clave_login_sii,
          logo: result.data.logo,
        })
      })

      setIsUpdate(true)
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }
  const onChange = async e => {
    if(e.target.name === "rut_legal_representative"){
      setConfigData({...configData, [e.target.name] : formatRut(e.target.value)})
    }else{
      setConfigData({...configData, [e.target.name] : e.target.value})
    }
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    let newFormData = new FormData()
    Object.keys(configData).forEach((v, i) => {
      if(v === "file" && configData[v] !== ''){
        newFormData.append('logo',configData[v])
      }else{
        newFormData.append(v,configData[v])
      }

    });

    if(isUpdate){
      axios.put(API_URL+'config_general/'+props.match.params.id,newFormData).then(result => {
        toast.success('Configuración General Modificada')
        localStorage.setItem('configGeneral',JSON.stringify(result.data))
        setTimeout(() => {
          props.history.push('/config/config_general')
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
      axios.post(API_URL+'config_general',newFormData).then(result => {
        toast.success('Configuración Guardada')
        localStorage.setItem('configGeneral',JSON.stringify(result.data))
        setTimeout(() => {
          props.history.push('/config/config_general')
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
    props.history.replace('/config/config_general')
  }

  const openFileInput = () => {
    document.getElementById('file_input').click()
  }

  const readFileImg = e => {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here

      setImgComponent(
        <Image src={ event.target.result }
          id="img_show" style={{ width: '100%' }} thumbnail/>
      )

      setConfigData({...configData,file})
    };

    reader.readAsDataURL(file);
  }

  const removeLogo = () => {
    setImgComponent('')
    setConfigData({...configData,file : ''})
  }

  return (
    <Container>
      <Row className="">
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">Formulario de Configuración General</h4>
          <br/>
          <Form onSubmit={onSubmit} noValidate validated={validated} className="">
            <Row>
              <Col md={4} lg={4} sm={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled1">Este campo contendrá el simbolo con el que se mostraran los precios en el sistema</Tooltip>}>
                  <Row>
                    <InputField
                      { ...props.inputSymbol}
                      handleChange={onChange}
                      value={configData.simbolo_moneda}
                      />
                  </Row>
                </OverlayTrigger>
              </Col>
              <Col md={4} lg={4} sm={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Campo para activar la función de mostrar los precios con 2 decimales en el sistema</Tooltip>}>
                  <Row>
                    <InputField
                      { ...props.inputPriceDecimals}
                      handleChange={onChange}
                      value={configData.active_price_decimals}
                      >
                      <option value=''>--Seleccione--</option>
                      <option value={true}>Activo</option>
                      <option value={false}>Desactivado</option>
                    </InputField>
                  </Row>
                </OverlayTrigger>
              </Col>
              <Col md={4} lg={4} sm={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled3">Campo para activar la función de cerrar la sesión en el sistema</Tooltip>}>
                  <Row>
                    <InputField
                      { ...props.inputSession}
                      handleChange={onChange}
                      value={configData.close_session}
                      >
                      <option value=''>--Seleccione--</option>
                      <option value={true}>Activo</option>
                      <option value={false}>Desactivado</option>
                    </InputField>
                  </Row>
                </OverlayTrigger>
              </Col>
            </Row>
            <Row>
              <InputField
               type='text'
               label='Actividad Económica'
               name='actividad_economica'
               required={false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={configData.actividad_economica}
               handleChange={onChange}
              />
              <InputField
               type='text'
               label='Giro'
               name='giro'
               required={false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={configData.giro}
               handleChange={onChange}
              />
              <Col sm={4} md={4} lg={4}>
                {imgComponent ? (
                  <React.Fragment>
                    <Row className="justify-content-center">
                      <Col sm={8} md={8} lg={8}>
                        {imgComponent}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} lg={12} className="text-center">
                        <br/>
                        <Button variant="dark" size="sm" onClick={removeLogo} type="button"><FaTrash /></Button>
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <br/>
                    <Button block={true} size="sm" type="button" variant="primary" onClick={openFileInput}>Logo Empresa <FaImage /></Button>
                    <input type="file" id="file_input" style={{display: 'none'}} onChange={readFileImg} />
                  </React.Fragment>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled4">
                  Rut del representante legal de la empresa en el Sii
                </Tooltip>}
                >
                  <Row>
                    <InputField
                     type='text'
                     label='Rut Representante Legal'
                     name='rut_legal_representative'
                     required={false}
                     messageErrors={[
                     'Requerido*'
                     ]}
                     cols='col-md-12 col-lg-12 col-sm-12'
                     value={configData.rut_legal_representative}
                     handleChange={onChange}
                     />
                  </Row>
                </OverlayTrigger>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled5">
                  Clave del representate legal de la empresa en el Sii
                </Tooltip>}
                >
                  <Row>
                    <InputField
                     type='text'
                     label='Clave Sii'
                     name='clave_login_sii'
                     required={false}
                     messageErrors={[
                     'Requerido*'
                     ]}
                     cols='col-md-12 col-lg-12 col-sm-12'
                     value={configData.clave_login_sii}
                     handleChange={onChange}
                     />
                  </Row>
                </OverlayTrigger>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled6">
                  Firma del representate legal en el Sii
                </Tooltip>}
                >
                  <Row>
                    <InputField
                     type='text'
                     label='Firma Sii'
                     name='clave_sii'
                     required={false}
                     messageErrors={[
                     'Requerido*'
                     ]}
                     cols='col-md-12 col-lg-12 col-sm-12'
                     value={configData.clave_sii}
                     handleChange={onChange}
                     />
                  </Row>
                </OverlayTrigger>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" type="submit" variant="danger" block="true">
                  Enviar <FaCheckCircle />
                </Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" type="button" variant="secondary" block="true" onClick={goToConfig}>
                  Ir a la configuración <FaCogs />
              </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

ConfigGeneralFormPage.defaultProps ={
  inputSymbol: {
    type: 'text',
    required: true,
    name: 'simbolo_moneda',
    label : 'Simbolo de Moneda',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputPriceDecimals: {
    type: 'select',
    required: true,
    name: 'active_price_decimals',
    label : 'Estado de Precios Decimales',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputSession: {
    type: "select",
    name: 'close_session',
    label : 'Estado de Cerrar Sesión',
    messageErrors: [
      'Requerido*'
    ],
    required: true,
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
}

ConfigGeneralFormPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  setConfig: PropTypes.func.isRequired,
}

function mapDispatchToProps(){
  return {
    setConfig
  }
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

export default connect(mapStateToProps,{})(ConfigGeneralFormPage)
