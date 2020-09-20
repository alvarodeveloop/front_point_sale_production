import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'vendor/styles/pages/authentication.scss'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { setAuthorizationToken } from 'utils/functions'
import {
  Row,
  Col,
  Container,
  Badge,
  Image
} from 'react-bootstrap'
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import 'styles/pages/AuthPage.css'
import 'styles/animate.css'

const AuthPageTemplate = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [validated, setValidated] = useState(false);
  const [enterprises, setEnterprises] = useState([])
  const [branchOffices, setBranchOffices] = useState([])
  const [typeVisibleDiv, setTypeVisibleDiv] = useState(false)
  const [showGif, setShowGif] = useState(false)

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

    axios.post(API_URL+'auth',credentials).then( async result => {

      const { data } = result
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      setAuthorizationToken(data.token)
      if(data.user.branch_offices.length > 0){
        if(data.user.branch_offices.length === 1){
          // si solo hay una empresa y solo una sucursal
          await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: data.user.branch_offices[0].id, id_enterprise: data.user.enterprises[0].id, id_parent : data.user.id_parent, email: data.user.email})
          props.loginDispatch(data.user)
        }else{
          // si solo hay una empresa y más de una sucursal
          localStorage.setItem('id_enterprise',data.user.enterprises[0].id)
          setBranchOffices(data.user.branch_offices)
          setTypeVisibleDiv(3)
        }
      }else{
        if(data.user.enterprises.length > 0){
          if(data.user.enterprises.length === 1){
            localStorage.setItem('id_enterprise',data.user.enterprises[0].id)
            await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: '', id_enterprise: data.user.enterprises[0].id, id_parent : data.user.id_parent, email: data.user.email})
            props.loginDispatch(data.user)
          }else{
            setEnterprises(data.user.enterprises)
            setTypeVisibleDiv(2)
          }
        }else{
          props.loginDispatch(data.user)
        }
      }
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message,'Error')
      }else{
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  /*const responseFacebook = responseFace => {
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
  }*/

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

  const handleChoiceBranchOffice = async idBranch => {
    setShowGif(true)
    let userLocal = JSON.parse(localStorage.getItem('user'))
    let id_enterprise = localStorage.getItem('id_enterprise')
    await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: idBranch, id_enterprise: id_enterprise,  id_parent: userLocal.id_parent, email: userLocal.email})
    setTimeout(() => {
      props.loginDispatch(userLocal)
    },1500)
  }

  const handleChoiceEnterprise = async idEnteprise => {
    setShowGif(true)
    localStorage.setItem('id_enterprise',idEnteprise)
    let userLocal = JSON.parse(localStorage.getItem('user'))
    if(userLocal.id_rol == 2){
      await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: null, id_enterprise: idEnteprise,  id_parent: userLocal.id_parent, email: userLocal.email})
      setTimeout(function () {
        props.loginDispatch(userLocal)
      }, 1500);
    }else{
      axios.get(API_URL+'branch_office_by_enterprise_and_user/'+idEnteprise+'/'+userLocal.email).then(result => {
        setShowGif(false)
        setBranchOffices(result.data)
        setTypeVisibleDiv(3)
      }).catch(err => {
        setShowGif(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const resetLogin = async () => {
    let userLocal = JSON.parse(localStorage.getItem('user'))
    await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: null, id_enterprise: null, id_parent: userLocal.id_parent, email: userLocal.email})
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('id_sucursal')
    localStorage.removeItem('id_enterprise')
    setAuthorizationToken(null)
    setBranchOffices([])
    setTypeVisibleDiv(false)
    setShowGif(false)
  }

  return (
    <div className="authentication-wrapper authentication-3">
        {typeVisibleDiv == 3 ? (
          <Row className="fondo">
            <Col sm={12} md={12} lg={12} className="animate__animated animate__zoomIn">
              <Row className="separated_top justify-content-center">
                <Col sm={6} md={6} lg={6}>
                  <h3 className="title_principal text-center">Escoja la Sucursal con la que trabajara</h3>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button variant="danger" block={true} size="sm" onClick={resetLogin}>Volver al Login <FaSignOutAlt/></Button>
                </Col>
              </Row>
              {
                showGif ? (
                  <Row className="justify-content-center" >
                    <Col sm={4} lg={4} md={4} className="text-center">
                      <Image src={require('../assets/img/loading.gif')} />
                      <p className="title_principal">Cargando...</p>
                    </Col>
                  </Row>
                ) : ''
              }
              <br/><br/>
              <Row className="justify-content-center alto_sucursal">
                {branchOffices.map((v,i) => (
                  <Col sm={3} lg={3} md={3} className="text-center" key={i}>
                    <h4 style={{color: 'rgb(180, 55, 33)', textTransform: 'uppercase'}}>{v.name}</h4>
                    <Image src={require('../assets/img/sucursal.png')} style={{width: '100%'}}/>
                    <span className="letras_negras">Estado :</span> {v.is_open ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
                    <br/><br/>
                    <Button size="sm" variant="primary" block={true} onClick={() => handleChoiceBranchOffice(v.id) }>Acceder</Button>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ) : typeVisibleDiv == 2 ? (

          <Row className="fondo">
            <Col sm={12} md={12} lg={12} className="animate__animated animate__zoomIn">
              <Row className="separated_top justify-content-center">
                <Col sm={6} md={6} lg={6}>
                  <h3 className="title_principal text-center">Escoja la Empresa con la que trabajara</h3>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button variant="danger" block={true} size="sm" onClick={resetLogin}>Volver al Login <FaSignOutAlt/></Button>
                </Col>
              </Row>
              {
                showGif ? (
                  <Row className="justify-content-center" >
                    <Col sm={4} lg={4} md={4} className="text-center">
                      <Image src={require('../assets/img/loading.gif')} />
                      <p className="title_principal">Cargando...</p>
                    </Col>
                  </Row>
                ) : ''
              }
              <br/><br/>
              <Row className="justify-content-center alto_sucursal">
                {enterprises.map((v,i) => (
                  <Col sm={3} lg={3} md={3} className="text-center" key={i}>
                    <h4 style={{color: 'rgb(180, 55, 33)', textTransform: 'uppercase'}}>{v.name}</h4>
                    <Image src={require('../assets/img/enterprises.jpg')} style={{width: '100%'}}/>
                    <span className="letras_negras">Estado :</span> {v.is_open ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
                    <br/><br/>
                    <Button size="sm" variant="primary" block={true} onClick={() => handleChoiceEnterprise(v.id) }>Acceder</Button>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

        ) : (
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
                          { /*O
                            <FacebookLogin
                            appId="2491656114258109"
                            autoLoad={false}
                            fields="name,email"
                            render={renderProps => (
                            <Button size="sm" variant="primary" onClick={renderProps.onClick} block={true} disabled={renderProps.disabled}><FaFacebook/> Ingresa con Facebook</Button>
                          )}
                          onFailure={responseFacebookFail}
                          callback={responseFacebook}
                          /> */ }
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
        )}
        <ToastContainer />
      </div>
  )

}

export default AuthPageTemplate
