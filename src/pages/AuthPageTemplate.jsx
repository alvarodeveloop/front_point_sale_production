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
  Badge,
  Image
} from 'react-bootstrap'
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";
import GoogleLogin from 'react-google-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {FaPaperPlane} from 'react-icons/fa'
import 'styles/pages/AuthPage.css'
import 'styles/animate.css'
import { formatRut } from 'utils/functions'
import * as moment from 'moment-timezone'

const AuthPageTemplate = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    is_email: true,
    email_recover: ''
  })

  const [validated, setValidated] = useState(false);
  const [enterprises, setEnterprises] = useState([])
  const [branchOffices, setBranchOffices] = useState([])
  const [typeVisibleDiv, setTypeVisibleDiv] = useState(1)
  const [showGif, setShowGif] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [imgLogin,setImgLogin] = useState(null)
  const [storage,setStorage] = useState({
    token: "",
    user: "",
    token_facturacion: "",
  })

  useEffect(() => {
    fetchAidyConfig()
  },[])

  useEffect(() => {
    displayImgSection()
  },[imgLogin])

  let hr_tz = moment().tz('America/Santiago').format('HH')
  let array_morning = ['06','07','08','09','10','11']
  let array_afternoon = ['12','13','14','15','16','17','18']
  let array_evening = ['19','20','21','22','23','00','01','02','03','04','05']

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

  const onValueChange = (field, e) => {
    if(field === "email"){
      let val =  credentials.is_email === false ? formatRut(e.target.value) : e.target.value
      setCredentials({...credentials,[field] : val})
    }else{
      if(field === "is_email"){
        let val = e.target.value === "true" ? true : false
        let email_value = val ? credentials.email.replace(/-/g,'') : formatRut(credentials.email)
        setCredentials({...credentials,[field] : val, email: email_value})
      }else{
        setCredentials({...credentials,[field] : e.target.value})
      }
    }
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
    setDisabledButton(true)
    axios.post(API_URL+'auth',credentials).then( async result => {
      setDisabledButton(false)
      const { data } = result
      setStorage({
        user: data.user,
        token: data.token,
      })
      setAuthorizationToken(data.token)
      if(data.user.branch_offices.length > 0){
        if(data.user.branch_offices.length === 1){
          // si solo hay una empresa y solo una sucursal
          await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: data.user.branch_offices[0].id, id_enterprise: data.user.enterprises[0].id, id_parent : data.user.id_parent, email: data.user.email})
          localStorage.setItem('user',JSON.stringify(data.user))
          localStorage.setItem('token',data.token)
          localStorage.setItem('id_enterprise',data.user.enterprises[0].id)
          localStorage.setItem('id_branch_office',data.user.branch_offices[0].id)
          authFinish(data.user)
        }else{
          // si solo hay una empresa y más de una sucursal
          setStorage({user: data.user,toke: data.token,token_facturacion: data.token_facturacion,id_enterprise: data.user.enterprises[0].id})
          setBranchOffices(data.user.branch_offices)
          setTypeVisibleDiv(3)
        }
      }else{
        if(data.user.enterprises.length > 0){
          if(data.user.enterprises.length === 1){
            localStorage.setItem('user',JSON.stringify(data.user))
            localStorage.setItem('token',data.token)
            localStorage.setItem('id_enterprise',data.user.enterprises[0].id)
            await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: '', id_enterprise: data.user.enterprises[0].id, id_parent : data.user.id_parent, email: data.user.email})
            authFinish(data.user)
          }else{
            setEnterprises(data.user.enterprises)
            setTypeVisibleDiv(2)
          }
        }else{
          localStorage.setItem('user',JSON.stringify(data.user))
          localStorage.setItem('token',data.token)
          props.loginDispatch(data.user)
        }
      }
    }).catch(err => {
      setDisabledButton(false)
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
        authFinish(data.user)
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
      toast.success('Felicidades, usuario registrado con éxito')
      const { data } = result
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      setAuthorizationToken(data.token)
      setTimeout(() => {
        props.loginDispatch(data.user)
      },1500)

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
    let userLocal = Object.assign({},storage).user
    let id_enterprise = Object.assign({},storage).id_enterprise
    localStorage.setItem('user',JSON.stringify(userLocal))
    localStorage.setItem('token',storage.token)
    localStorage.setItem('id_enterprise',id_enterprise)
    localStorage.setItem('id_branch_office',idBranch)
    await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: idBranch, id_enterprise: id_enterprise,  id_parent: userLocal.id_parent, email: userLocal.email})
    authFinish(userLocal)
  }

  const handleChoiceEnterprise = async idEnteprise => {
    setShowGif(true)
    let userLocal = Object.assign({},storage).user
    if(userLocal.id_rol == 2){
      await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: null, id_enterprise: idEnteprise,  id_parent: userLocal.id_parent, email: userLocal.email})
      localStorage.setItem('user',JSON.stringify(userLocal))
      localStorage.setItem('token',storage.token)
      localStorage.setItem('id_enterprise',idEnteprise)
      authFinish(userLocal)
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
    let userLocal = Object.assign({},storage).user
    await axios.post(API_URL+'user_id_sucursal_enterprise',{id_sucursal_active: null, id_enterprise: null, id_parent: userLocal.id_parent, email: userLocal.email})
    setAuthorizationToken(null)
    setBranchOffices([])
    setTypeVisibleDiv(1)
    setShowGif(false)
    setCredentials({
      email: '',
      password: '',
      is_email: true,
      email_recover: ''
    })
  }

  const showRecoverSection = () => {
    setDisabledButton(true)
    setTypeVisibleDiv(1)
    setTimeout(function () {
      setDisabledButton(false)
    }, 100);

  }

  const recoverPassword = () => {
    if(!credentials.email_recover){
      toast.error('Debe ingregar el email de su cuenta')
    }else{
      setDisabledButton(true)
       axios.post(API_URL+'user_recover_password',Object.assign({},credentials)).then(result => {
        toast.success('Correo enviado con éxito')
        setTypeVisibleDiv(1)
        setDisabledButton(false)
       }).catch(err => {
         setDisabledButton(false)
         if(err.response){
           toast.error(err.response.data.message)
         }else{
           console.log(err);
           toast.error('Error, contacte con soporte')
         }
       })
    }
  }

  const authFinish = userDatos => {
    toast.info('Terminando de configurar aidy para una mejor experiencia, espere un momento por favor...')
    axios.get(API_URL+'auth_nuxo').then(result => {
      if(result.data.token){
        localStorage.setItem('token',result.data.token)
        setAuthorizationToken(result.data.token)
        props.loginDispatch(userDatos)
      }else{
        setTimeout(function () {
          props.loginDispatch(userDatos)
        }, 1000);
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

  const displayImgSection = () => {
    return (
      <React.Fragment>
        {!imgLogin ? (
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
        ) : (
          <div className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" style={{ backgroundImage: `url('${API_URL}images/aidy/${imgLogin}')` }}>
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
        )}
      </React.Fragment>
    )
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
                    <h4 style={{color: 'rgb(180, 55, 33)', textTransform: 'uppercase'}}>{v.bussines_name}</h4>
                    <Image src={require('../assets/img/enterprises.jpg')} style={{width: '100%'}}/>
                    <span className="letras_negras">Estado :</span> {v.is_open ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
                    <br/><br/>
                    <Button size="sm" variant="primary" block={true} onClick={() => handleChoiceEnterprise(v.id) }>Acceder</Button>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

        ) : typeVisibleDiv == 1 ? (
            <div className="authentication-inner">
              {/* Side container */}
              {/* Do not display the container on extra small, small and medium screens */}
              {displayImgSection()}
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

                    <h4 className="text-center text-lighter font-weight-normal mt-2 mb-0">{array_morning.includes(hr_tz) ? 'Buenos Días' : array_afternoon.includes(hr_tz) ? "Buenas tardes" : array_evening.includes(hr_tz) ? "Buenas noches" : ''}, accede a tu cuenta</h4>

                    {/* Form */}
                    <Form className="my-5" onSubmit={prevent} noValidate validated={validated}>
                      <Form.Group>
                        <Row>
                          <Col sm={12} md={12} lg={12} className="text-center">
                            <b>Entrar con:</b>
                          </Col>
                          <Col sm={6} md={6} lg={6} className="text-center">
                            <Form.Check
                              name="is_email"
                              type={'radio'}
                              id={`checkbox-1`}
                              label={"Email"}
                              checked={credentials.is_email}
                              onChange={e => onValueChange('is_email', e)}
                              value={true}
                              />
                          </Col>
                          <Col sm={6} md={6} lg={6} className="text-center">
                            <Form.Check
                              name="is_email"
                              type={'radio'}
                              id={`checkbox-2`}
                              label={"Rut"}
                              checked={!credentials.is_email}
                              onChange={e => onValueChange('is_email', e)}
                              value={false}
                              />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>{credentials.is_email ? 'Entrar con email' : "Entrar con rut"}</Form.Label>
                        <Form.Control type={credentials.is_email ? "email" : "text"} value={credentials.email} onChange={e => onValueChange('email', e)} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="d-flex justify-content-between align-items-end">
                          <div>Password</div>
                          {/*<a href="#d" onClick={prevent} className="d-block small">Forgot password?</a>*/}
                        </Form.Label>
                        <Form.Control type="password" value={credentials.password} onChange={e => onValueChange('password', e)} />
                      </Form.Group>

                      <div className="d-flex justify-content-center align-items-center m-0">
                        <Button block={true} size="sm" variant="secondary" type="submit" disabled={disabledButton}>{disabledButton ? "Verificado Datos..." : "Acceder"}</Button>
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
                    <div className="text-center text-muted">
                      Contraseña olvidada? <Button variant="link" size="sm" onClick={() => setTypeVisibleDiv(4)}>Recuperala</Button>
                    </div>
                </div>
              </div>
            </div>
            {/* / Form container */}
          </div>
        ) : typeVisibleDiv == 4 ? (
          <div className="authentication-inner">
              {/* Side container */}
              {/* Do not display the container on extra small, small and medium screens */}
              {displayImgSection()}
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
                        <Image src={require('../assets/img/logo/AIDY_01.jpg')} width="55%" />
                      </div>
                    </div>
                    {/* / Logo */}

                    <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0">{array_morning.includes(hr_tz) ? 'Buenos Días' : array_afternoon.includes(hr_tz) ? "Buenas tardes" : array_evening.includes(hr_tz) ? "Buenas noches" : ''}, accede a tu cuenta</h4>

                    {/* Form */}
                    <Form className="my-5" onSubmit={() => {}} noValidate validated={false}>
                      <Form.Group>
                        <Form.Label className="d-flex justify-content-between align-items-end">
                          <div>Email</div>
                          {/*<a href="#d" onClick={prevent} className="d-block small">Forgot password?</a>*/}
                        </Form.Label>
                        <Form.Control type="email" value={credentials.email_recover} onChange={e => onValueChange('email_recover', e)} />
                      </Form.Group>
                      <div className="d-flex justify-content-center align-items-center m-0">
                        <Button block={true} size="sm" variant="danger" type="button" onClick={recoverPassword} disabled={disabledButton}>{disabledButton ? "Enviando datos, espere por favor..." : (<span>Enviar <FaPaperPlane /></span>)}</Button>
                      </div>
                      <br/>
                      <div className="d-flex justify-content-center align-items-center m-0">
                        <Button type="button" block={true} size="sm" variant="secondary" disabled={disabledButton} onClick={() =>  showRecoverSection()}>Mostrar Formulario</Button>
                      </div>
                    </Form>
                </div>
              </div>
            </div>
            {/* / Form container */}
          </div>
        ) : ''}
        <ToastContainer />
      </div>
  )

}

export default AuthPageTemplate
