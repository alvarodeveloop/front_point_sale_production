import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import { ToastContainer, toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import 'vendor/styles/pages/authentication.scss'
import {formatRut} from 'utils/functions'
import { connect } from 'react-redux'
import { login } from 'actions/auth'
import { setAuthorizationToken } from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent'

const SignUpPage = (props) => {

  const [displayLoading, setDisplayLoading] = useState(false)
  const [validatedForm, setValidatedForm] = useState(false)
  const [user,setUser] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    password_repeat: '',
    id_rol: 2,
    name_enterprise: '',
    address_enterprise: ''
  })
  const [imgLogin,setImgLogin] = useState(null)

  useEffect(() => {
    fetchAidyConfig()
  },[])

  const fetchAidyConfig = () => {
     axios.get(API_URL+'config_aidy_login').then(result => {
      if(result.data && result.data.img_login){
        setImgLogin(result.data.img_login)
      }
    }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
     })
  }

  const onChange = e => {
    if(e.target.name === "rut"){
      let val = formatRut(e.target.value)
      setUser({...user, [e.target.name] : val})
    }else{
      setUser({...user, [e.target.name] : e.target.value})
    }
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
    setDisplayLoading(true)
    axios.post(API_URL+'user_free',userSave).then(result => {
      toast.success('Felicidades, usuario registrado con éxito')
      localStorage.setItem('user',JSON.stringify(result.data.user))
      localStorage.setItem('token',result.data.token)
      setAuthorizationToken(result.data.token)
      props.login(result.data.user)
      setDisplayLoading(false)
      setTimeout(() => {
        props.history.replace('/dashboard')
      },1500)
    }).catch(err => {
      setDisplayLoading(false)
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

        {!imgLogin ? (
          <div className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/background_1920-16.jpg')` }}>
            <div className="ui-bg-overlay bg-dark opacity-50"></div>

            {/* Text */}
            <div className="w-100 text-white px-5">
              <h1 className="display-2 font-weight-bolder mb-4">REGISTRO DE CUENTA</h1>
              <div className="text-large font-weight-light">
                Crea tu usuario nivel empresa para empezar el manejo de negocio en aidy
              </div>
            </div>
            {/* /.Text */}
          </div>
        ) : (
          <div className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" style={{ backgroundImage: `url('${API_URL}images/aidy/${imgLogin}')` }}>
            <div className="ui-bg-overlay bg-dark opacity-50"></div>

            {/* Text */}
            <div className="w-100 text-white px-5">
              <h1 className="display-2 font-weight-bolder mb-4">REGISTRO DE CUENTA</h1>
              <div className="text-large font-weight-light">
                Crea tu usuario nivel empresa para empezar el manejo de negocio en aidy
              </div>
            </div>
            {/* /.Text */}
          </div>
        )}
        {/* / Side container */}

        {/* Form container */}
        <div className="d-flex col-lg-4 align-items-center theme-bg-white p-5">
          {/* Inner container */}
          {/* Have to add `.d-flex` to control width via `.col-*` classes */}
          <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
            <div className="w-100">
              {/* Logo */}
              <div className="d-flex justify-content-center align-items-center">
                <div className="position-relative text-center">
                  <Image src={require('../assets/img/logo/AIDY_01.jpg')} width="150px" />
                </div>
              </div>
              {/* / Logo */}

              <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0"></h4>

              {/* Form */}
              {displayLoading ? (
                <LoadingComponent />
              ) : (
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
              )}
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
    isLogin : PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
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

function mapStateToProps(state){
  return {
    isLogin : state.auth.isAuthenticated
  }
}

function mapDispatchToProps(){
    return {
      login
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(SignUpPage);
