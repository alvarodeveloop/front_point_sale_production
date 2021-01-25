import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Image
} from 'react-bootstrap'
import {FaPlusCircle,FaImage} from 'react-icons/fa'
import {formatRut} from 'utils/functions'
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {toast} from 'react-toastify'
import InputField from 'components/input/InputComponent'
import LoadingComponent from 'components/LoadingComponent'


const ProfilePage = (props) => {
  const [validated, setValidated] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [dataForm, setDataForm] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirm_password: '',
    img_profile: '',
    file: '',
  })
  const [ imgComponent, setImgComponent ] = useState(
    <Image src={  require('../assets/img/utils/empty_logo.jpg') }
      id="imagen_logo" style={{ width: '70px' }} roundedCircle />
  )

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = () => {
     axios.get(API_URL+'profile').then(result => {
      setDataForm(oldData => {
        return Object.assign({},oldData,{
          email: result.data.email,
          name: result.data.name,
          phone: result.data.phone,
          rut: result.data.rut,
          img_profile: result.data.img_profile,
        })
      })

      if(result.data.img_profile){
        setImgComponent(
          <Image src={API_URL+'images/user/'+result.data.img_profile}
            id="imagen_logo" style={{ width: '50%' }} roundedCircle />
        )
      }
      setDisplayLoading(false)
     }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
     })
  }

  const onChange = e => {
    setDataForm({...dataForm, [e.target.name] : e.target.name === "rut" ? formatRut(e.target.value) : e.target.value })
  }

  const onSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    if(dataForm.password !== dataForm.confirm_password){
      console.log(dataForm.password,dataForm.confirm_password,'aqui');
      toast.error('Las contraseñas no coinciden')
      return false
    }

    let formData = new FormData()
    Object.keys(dataForm).forEach((item, i) => {
      if(item === "file"){
        formData.append('logo_profile',dataForm[item])
      }else{
        formData.append(item,dataForm[item])
      }
    });
    setDisplayLoading(true)
    axios.post(API_URL+'profile',formData).then(result => {
      toast.success('Datos modificados con éxito')
      setTimeout(function () {
        props.history.replace('/dashboard')
      }, 1500);
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const displayFileField = () => {
    document.getElementById('input_file').click()
  }

  const readImgProduct = e => {

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here

      setImgComponent(
        <Image src={ event.target.result }
          id="img_show" style={{ width: '50%' }} roundedCircle />
      )

      setDataForm({...dataForm, file})
    };

    reader.readAsDataURL(file);
  }

  const goToDashboard = () => {
    props.history.replace('/dashboard')
  }

  return (
    <>
      {displayLoading ? (
        <Container fluid={true}>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid={true}>
          <Row className="">
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Perfil del Usuario</h4>
            </Col>
            <Col sm={6} md={6} lg={6} className="text-center">
              {imgComponent}
            </Col>
          </Row>
          <hr/>
          <Col sm={12} md={12} lg={12}>
            <Form onSubmit={onSubmit} noValidate validated={validated}>
              <Row>
                <InputField
                type='email'
                label='Email'
                name='email'
                required={true}
                messageErrors={[
                'Requerido* ','Formato Email'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.email}
                handleChange={onChange}
                />
                <InputField
                  type='text'
                  label='Rut'
                  name='rut'
                  required={true}
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={dataForm.rut}
                  handleChange={onChange}
                />
                <InputField
                type='text'
                label='Nombre completo'
                name='name'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.name}
                handleChange={onChange}
                />
              </Row>
              <Row>
                <InputField
                type='text'
                label='Fono'
                name='phone'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.phone}
                handleChange={onChange}
                />
              <InputField
                type='password'
                label='Contraseña'
                name='password'
                required={false}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.password}
                handleChange={onChange}
              />
              <InputField
                type='password'
                label='Confirme Contraseña'
                name='confirm_password'
                required={false}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.confirm_password}
                handleChange={onChange}
              />
              </Row>
              <Row>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="primary" block={true} onClick={displayFileField} type="button" size="sm">Escoger imagen del perfil <FaImage /></Button>
                  <input type="file" style={{display : "none"}} id="input_file" onChange={readImgProduct} />
                </Col>
              </Row>
              <br/>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4}>
                  <Button variant="danger" block={true} type="submit" size="sm">Guardar <FaPlusCircle /></Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="secondary" block={true} type="button" size="sm" onClick={goToDashboard}>Ir al Dashboard</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Container>
      )}
    </>
  )
}

export default ProfilePage
