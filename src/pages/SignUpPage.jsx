import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import { ToastContainer, toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import 'vendor/styles/pages/authentication.scss'

const SignUpPage = (props) => {

  const [validatedForm, setValidatedForm] = useState(false)
  const [user,setUser] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    password_repeat: '',
    id_rol: 2
  })

  useEffect(() => {

  },[])

  const onChange = e => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedForm(true);
      return
    }

    let userSave = Object.assign({},user)

    if(userSave.password !== userSave.password_repeat){
      toast.error('Las contraseñas no coinciden')
      return false
    }

    axios.post(API_URL+'user_free',userSave).then(result => {
      toast.success('Usuario Registrado')
      setTimeout(() => {
        props.history.replace('/')
      },1500)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })

  }

  return (
    <div className="authentication-wrapper authentication-3">
      <div className="authentication-inner">
        {/* Side container */}
        {/* Do not display the container on extra small, small and medium screens */}
        <div className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/background_1920-16.jpg')` }}>
          <div className="ui-bg-overlay bg-dark opacity-50"></div>

          {/* Text */}
          <div className="w-100 text-white px-5">
            <h1 className="display-2 font-weight-bolder mb-4">Registro de Cuenta</h1>
            <div className="text-large font-weight-light">
              Crea tu usuario para acceder a aidy
            </div>
          </div>
          {/* /.Text */}
        </div>
        {/* / Side container */}

        {/* Form container */}
        <div className="d-flex col-lg-4 align-items-center theme-bg-white p-5">
          {/* Inner container */}
          {/* Have to add `.d-flex` to control width via `.col-*` classes */}
          <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
            <div className="w-100">
              {/* Logo */}
              <div className="d-flex justify-content-center align-items-center">
                <div className="ui-w-60">
                  <div className="w-100 position-relative" style={{ paddingBottom: '54%' }}>
                    <svg className="w-100 h-100 position-absolute" viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stopOpacity=".25" offset="0"></stop><stop stopOpacity=".1" offset=".3"></stop><stop stopOpacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlinkHref="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlinkHref="#a"></linearGradient></defs><path className="fill-primary" transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
                  </div>
                </div>
              </div>
              {/* / Logo */}

              <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0"></h4>

              {/* Form */}
              <Form onSubmit={onSubmit} noValidate validated={validatedForm}>
                <Row className="justify-content-center">
                  <InputField
                    {...props.inputName}
                    handleChange={onChange}
                    value={user.name}
                  />
                </Row>
                <Row className="justify-content-center">
                  <InputField
                    {...props.inputEmail}
                    handleChange={onChange}
                    value={user.email}
                  />
                </Row>
                <Row className="justify-content-center">
                  <InputField
                    {...props.inputRut}
                    handleChange={onChange}
                    value={user.rut}
                  />
                </Row>
                <Row className="justify-content-center">
                  <InputField
                    {...props.inputPassword}
                    handleChange={onChange}
                    value={user.password}
                  />
                </Row>
                <Row className="justify-content-center">
                  <InputField
                    {...props.inputPasswordRepeat}
                    handleChange={onChange}
                    value={user.password_repeat}
                  />
                </Row>
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12}>
                    <Button size="sm" variant="primary" block={true} type="submit">Enviar</Button>
                  </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12}>
                    <Button size="sm" variant="secondary" block={true} type="button" onClick={() => props.history.replace('/')}>Volver</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        {/* / Form container */}
      </div>
      <ToastContainer />
    </div>
  )
}

SignUpPage.propTypes = {

}

SignUpPage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name',
    label : 'Nombre Completo',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputEmail: {
    type: 'email',
    required: true,
    name: 'email',
    label : 'Correo',
    messageErrors: [
      'Requerido*',' Formato tipo Email*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputRut: {
    type: 'text',
    required: true,
    name: 'rut',
    label : 'Rut',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputPassword: {
    type: 'password',
    required: true,
    name: 'password',
    label : 'Contraseña',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputPasswordRepeat: {
    type: 'password',
    required: true,
    name: 'password_repeat',
    label : 'Repita la Contraseña',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
}

export default SignUpPage
