import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'vendor/styles/pages/authentication.scss'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { setAuthorizationToken } from 'utils/functions'
import {
  Row,
  Col
} from 'react-bootstrap'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const AuthPageTemplate = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [validated, setValidated] = useState(false);

  const onValueChange = (field, e) => {
    setCredentials({...credentials,[field] : field === 'rememberMe' ? e.target.checked : e.target.value})
  }

  const prevent = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    if(credentials.id_rol === '' || credentials.email === '' || credentials.password === ''){
      toast.error('Todos los campos son requeridos')
      return false
    }

    axios.post(API_URL+'auth',credentials).then(result => {
      const { data } = result
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      setAuthorizationToken(data.token)
      props.loginDispatch(data.user)
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message,'Error')
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const responseFacebook = responseFace => {
    let profile = Object.assign({},responseFace)

    axios.post(API_URL+'auth_by_social_media',profile).then(result => {
      const { data } = result
      if(data.user){
        localStorage.setItem('user',JSON.stringify(data.user))
        localStorage.setItem('token',data.token)
        setAuthorizationToken(data.token)
        props.loginDispatch(data.user)
      }else{
        registerUserBySocialMedia(profile)
      }
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message,'Error')
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const responseFacebookFail = responseFacebookFail => {
    console.log(responseFacebookFail)
  }

  const responseGoogle = responseGmail => {

    let profile = Object.assign({},responseGmail.profileObj)

    axios.post(API_URL+'auth_by_social_media',profile).then(result => {
      const { data } = result
      if(data.user){
        localStorage.setItem('user',JSON.stringify(data.user))
        localStorage.setItem('token',data.token)
        setAuthorizationToken(data.token)
        props.loginDispatch(data.user)
      }else{
        registerUserBySocialMedia(profile)
      }
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message,'Error')
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const responseGoogleFail = err => {
      console.log(err)

  }

  const registerUserBySocialMedia = data => {

    axios.post(API_URL+'user_by_social_media',data).then(result => {
      const { data } = result
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      setAuthorizationToken(data.token)
      props.loginDispatch(data.user)

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message,'Error')
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToSignUp = () => {
    props.history.replace('/login/register')
    //SignUpPage
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
            <h1 className="display-2 font-weight-bolder mb-4">BIENVENIDO A AIDY</h1>
            <div className="text-large font-weight-light">
              Sistema de administración, gestión de ventas e inventario
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

              <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0">Accede a tu Cuenta</h4>

              {/* Form */}
              <Form className="my-5" onSubmit={prevent} noValidate validated={validated}>
                <Form.Group>
                  <Form.Label>Email o Rut</Form.Label>
                  <Form.Control value={credentials.email} onChange={e => onValueChange('email', e)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex justify-content-between align-items-end">
                    <div>Password</div>
                    {/*<a href="#d" onClick={prevent} className="d-block small">Forgot password?</a>*/}
                  </Form.Label>
                  <Form.Control type="password" value={credentials.password} onChange={e => onValueChange('password', e)} />
                </Form.Group>

                <div className="d-flex justify-content-center align-items-center m-0">
                  <Button size="sm" variant="secondary" type="submit">Acceder</Button>
                </div>
                <br/>
                <Row>
                  <Col sm={12} md={12} lg={12}  className="text-center">
                    <GoogleLogin
                      clientId="1004768059197-6gtlnmf01jp02fum4067npm5mdbjo9c2.apps.googleusercontent.com"
                      render={renderProps => (
                        <Button size="sm" variant="danger" onClick={renderProps.onClick} block={true} disabled={renderProps.disabled}><FaGoogle/> Ingresa con Gmail</Button>
                      )}
                      buttonText="Login"
                      autoLoad={false}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogleFail}
                      cookiePolicy={'single_host_origin'}
                    />
                    O
                    <FacebookLogin
                      appId="2491656114258109"
                      autoLoad={false}
                      fields="name,email"
                      render={renderProps => (
                        <Button size="sm" variant="primary" onClick={renderProps.onClick} block={true} disabled={renderProps.disabled}><FaFacebook/> Ingresa con Facebook</Button>
                      )}
                      onFailure={responseFacebookFail}
                      callback={responseFacebook}
                    />
                  </Col>
                </Row>
              </Form>
              {/* / Form */}

              <div className="text-center text-muted">
                Aún no tienes Cuenta? <Button variant="link" size="sm" onClick={goToSignUp}>Registrate</Button>
              </div>

            </div>
          </div>
        </div>
        {/* / Form container */}
      </div>
      <ToastContainer />
    </div>
  )

}

export default AuthPageTemplate
