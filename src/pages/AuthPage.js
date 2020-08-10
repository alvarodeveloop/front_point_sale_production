import React, {useState, useEffect} from 'react'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import PropTypes from 'prop-types'
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import {
  Row,
  Col,
  Form,
  Button,
  Container
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import CarrouselComponent from 'components/carrousel/CarrouselComponent'
import { setAuthorizationToken } from 'utils/functions'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


let imgLogin = null

const AuthPage = props => {

  const [userData,setUserData] = useState({email: '',password: ''})
  const [validated, setValidated] = useState(false);
  const imgDisplay = true

  const onChange = e => {
    setUserData({...userData, [e.target.name] : e.target.value})
  }

  const goToRegisterPage = () => {
    props.history.replace('/login/register')
  }

  const onSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    axios.post(API_URL+'auth',userData).then(result => {
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

  if(imgDisplay){
    imgLogin = (
      <img src={require('../assets/img/login/login5.jpg')} className="img-login"/>
    )
  }else{
    const numItems = [2,1,5]
    const itemsCarrousel = numItems.map((v,i) => {
      return {
        src: require('../assets/img/login/login'+v+'.jpg'),
        altText: '',
        caption: 'Restaurant Chile'
      }
    })

    imgLogin = <CarrouselComponent items={itemsCarrousel} imgClass={'img-login'} />
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

  return(
    <Container>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <div className="containerImg">
            {imgLogin}
          </div>
        </Col>
        <Col
          xs={12}
          sm={{
            offset: 1, span: 5, order: 1
          }}
          md={{
            offset: 1, span: 5, order: 0
          }}
          lg={{
            offset: 1, span: 5, order: 2
          }}
        >
          <div className="flexContainer">
            <div className="containerBox">
              <h1 className="title-login">Login</h1>
              <Form onSubmit={onSubmit} noValidate validated={validated}>
                <Row>
                  <InputField
                    { ...props.inputEmail }
                    handleChange={onChange}
                    value={userData.email}
                    />
                  <InputField
                    { ...props.inputPassword}
                    handleChange={onChange}
                    value={userData.password}
                    />
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button size="sm" variant="info" type="submit" block={true}>Enviar</Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <p className="text-center letraAzul">O</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className="text-center">
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
                    <br/><br/>
                    <a href="#" style={{ fontSize: '18px'}}>¿Se te olvido tu contraseña?</a>
                  </Col>
                </Row>
              </Form>
            </div>
            <br/>
            <div className="loginFormContainer">
              <p className="text-center">¿No posees cuenta?  <button className="btn btn-link" onClick={goToRegisterPage} style={{fontSize: '18px'}}>registrate</button>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer/>
    </Container>
  )
}

AuthPage.propTypes = {
    loginDispatch: PropTypes.func.isRequired,
}

AuthPage.defaultProps = {
  inputEmail: {
    type: 'email',
    required: true,
    name: 'email',
    label : 'Usuario',
    messageErrors: [
      'Requerido*,',' Formato tipo Email*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  },
  inputPassword:{
    type: 'password',
    required: true,
    name: 'password',
    label : 'Contraseña',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"
  }
}


export default AuthPage
