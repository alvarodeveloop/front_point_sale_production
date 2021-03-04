import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Image,
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import {FaRegPaperPlane} from 'react-icons/fa'
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {toast} from 'react-toastify'
import {formatRut} from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent'

const ConfigAidyPage = (props) => {

  const [formData,setFormData] = useState({
    img_login: '',
    api_key_nuxo : '',
    rut_nuxo : '',
    password_nuxo: '',
    file_img_login : '',
    base64LoginImg: '',
    bussines_name: '',
    address: '',
    email: '',
  })
  const [validated, setValidated] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[])

  useEffect(() => {
    displayImgLogin()
  },[formData.base64LoginImg])

  const fetchData = () => {
    axios.get(API_URL+'config_aidy').then(result => {
      setFormData({
        img_login : result.data.img_login,
        api_key_nuxo : result.data.api_key_nuxo,
        rut_nuxo : result.data.rut_nuxo+"-"+result.data.dv_nuxo,
        password_nuxo : result.data.password_nuxo,
        bussines_name : result.data.bussines_name,
        address : result.data.address,
        email : result.data.email
      })
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
       props.tokenExpired(err)
    })
  }

  const displayImgLogin = () => {
    if(formData.base64LoginImg){
      return (
        <Image src={formData.base64LoginImg}
          id="img_show" style={{ width: '100px',height: '100px' }} roundedCircle
        />
      )
    }else if(!formData.img_login){
      return (
        <Image src={  require('../assets/img/utils/empty_logo.jpg') }
          id="imagen_logo" style={{ width: '80px' }} roundedCircle
        />
      )
    }else{
      if(formData.img_login){
        return (
          <Image src={API_URL+'images/aidy/'+formData.img_login}
            id="img_show" style={{ width: '100px',height: '100px' }} roundedCircle
          />
        )
      }
    }
  }

  const onChange = e => {
    setFormData({...formData, [e.target.name] : e.target.name === "rut_nuxo" ? formatRut(e.target.value) : e.target.value})
  }

  const openFileInput = () => {
    document.getElementById('input_file_img_login').click()
  }

  const onChangeInputFile = e => {

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here
      document.getElementById('input_file_img_login').src = event.target.result

      setFormData({...formData, file_img_login : file, base64LoginImg: event.target.result})
    };

    reader.readAsDataURL(file);
  }

  const onSubmit = e => {

    const form = e.currentTarget;

    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let formDataPost = new FormData()

    let objectNew = Object.assign({},formData)

    Object.keys(objectNew).forEach((v,i) => {
      if(v === 'file_img_login'){
        formDataPost.append('img_login',objectNew[v])
      }else if(v !== "base64LoginImg"){
        formDataPost.append(v,objectNew[v])
      }
    })
    setDisplayLoading(true)
     axios.post(API_URL+'config_aidy',formDataPost).then(result => {
      toast.success('Configuración guardada')
      setDisplayLoading(false)
     }).catch(err => {
      setDisplayLoading(false)
       props.tokenExpired(err)
     })
  }

  return (
    <Container>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Form onSubmit={onSubmit} noValidate validated={validated}>
              <Row>
                <Col sm={7} md={7} lg={7}>
                  <h4 className="title_principal">Formulario de configuración de aidy</h4>
                </Col>
                <Col sm={5} md={5} lg={5}>
                  <Button variant="danger" block={true} type="submit" size="sm">Guardar <FaRegPaperPlane /></Button>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm={4} md={4} lg={4}>
                  <br/>
                  <Button variant="primary" block={true} onClick={openFileInput} type="button" size="sm">Escoger imagen login</Button>
                  <input type="file" onChange={onChangeInputFile} style={{display: "none"}} id="input_file_img_login" />
                </Col>
                <Col sm={4} md={4} lg={4} className="text-center">
                  {displayImgLogin()}
                </Col>
              </Row>
              <Row>
                <InputField
                type='text'
                label='Api Key Nuxo'
                name='api_key_nuxo'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={formData.api_key_nuxo}
                handleChange={onChange}
                />
                <InputField
                type='text'
                label='Rut Nuxo'
                name='rut_nuxo'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={formData.rut_nuxo}
                handleChange={onChange}
                />
                <InputField
                type='password'
                label='Password Nuxo'
                name='password_nuxo'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={formData.password_nuxo}
                handleChange={onChange}
                />
              </Row>
              <Row>
                <InputField
                  type='text'
                  label='Nombre de la empresa'
                  name='bussines_name'
                  required={true}
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={formData.bussines_name}
                  handleChange={onChange}
                />
                  <InputField
                  type='text'
                  label='Dirección'
                  name='address'
                  required={true}
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={formData.address}
                  handleChange={onChange}
                />
                  <InputField
                  type='email'
                  label='Email'
                  name='email'
                  required={true}
                  messageErrors={[
                  'Requerido* ','*Formato email requerido'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={formData.email}
                  handleChange={onChange}
                />
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ConfigAidyPage
