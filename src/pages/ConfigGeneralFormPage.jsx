import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
} from 'react-bootstrap'
import { FaCheckCircle,FaCogs } from "react-icons/fa";
import { connect } from 'react-redux'
import InputField from 'components/input/InputComponent'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import 'styles/pages/config_general.css'
import { setConfig } from 'actions/configs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ConfigGeneralFormPage = (props) => {

  const [ configData, setConfigData ] = useState({
    simbolo_moneda: '',
    active_price_decimals : '',
    close_session: '',
    actividad_economica: '',
  })
  const [validated, setValidated] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if(props.match.params.id){
      fetchDataUpdate()
    }
  },[props.id_enterprise])

  const fetchDataUpdate = () => {
    axios.get(API_URL+'config_general_update').then(result => {

      setConfigData({
        simbolo_moneda: result.data.simbolo_moneda,
        active_price_decimals: result.data.active_price_decimals,
        close_session: result.data.close_session
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
    await setConfigData({...configData, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},configData)

    if(isUpdate){
      axios.put(API_URL+'config_general/'+props.match.params.id,data).then(result => {
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
      axios.post(API_URL+'config_general',data).then(result => {
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

  return (
    <Container>
      <Row className="containerDiv">
        <Col
          sm={{
              span: 7,
              offset: 3,
              order: 0
          }}

          md={{
            span: 7,
            offset: 3,
            order: 0
          }}

          lg={{
            span: 7,
            offset: 3,
            order: 0
          }}
          xs={{
            span:12
          }}
        >
          <h3 className="text-center">Formulario de Configuración</h3>
          <br/>
          <Form onSubmit={onSubmit} noValidate validated={validated} className="form_config">
            <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled">Este campo contendrá el simbolo con el que se mostraran los precios en el sistema</Tooltip>}>
              <Row>
                <InputField
                  { ...props.inputSymbol}
                  handleChange={onChange}
                  value={configData.simbolo_moneda}
                  />
              </Row>
            </OverlayTrigger>
            <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled">Campo para activar la función de mostrar los precios con 2 decimales en el sistema</Tooltip>}>
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
            <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled">Campo para activar la función de cerrar la sesión en el sistema</Tooltip>}>
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
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Button size="sm" type="submit" variant="primary" block="true">
                  Enviar <FaCheckCircle />
                </Button>
                <br/>
                <p className="text-center">O</p>
                <Button size="sm" type="button" variant="info" block="true" onClick={goToConfig}>
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
    type: 'select',
    required: true,
    name: 'close_session',
    label : 'Estado de Cerrar Sesión',
    messageErrors: [
      'Requerido*'
    ],
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
