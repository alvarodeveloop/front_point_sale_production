import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaTrashAlt, FaPlusCircle,FaUsers } from "react-icons/fa";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { setMenu } from 'actions/menu'
import InputField from 'components/input/InputComponent'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import 'styles/pages/users.css'
let count = 0

const UserCreatePage  = props => {

  const [userData,setUserData] = useState({
    name: "",
    email: "",
    rut: "",
    password: "",
    id_rol: ""
  })
  const [modulesUser,setModulesUser] = useState([])
  const [roles,setRoles] = useState([])
  const [modules,setModules] = useState([])
  const [validated, setValidated] = useState(false);
  const [isFormClean, setIsFormClean] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchModules = () => {

    let promises = [
      axios.get(API_URL+'modules'),
      axios.get(API_URL+'roles'),
    ]

    if(props.match.params.id > 0){
      promises.push(
        axios.get(API_URL+'user/'+props.match.params.id),
      )
    }

    Promise.all(promises).then(result => {
      setModules(result[0].data)
      setRoles(result[1].data)

      if(props.match.params.id){
        setUserData({
          name: result[2].data.user.name,
          email: result[2].data.user.email,
          rut: result[2].data.user.rut,
          password: "",
          id_rol: result[2].data.user.id_rol
        })
        const userModules = result[2].data.modules.map(v => v.id_menu)
        setModulesUser(userModules)
        setIsUpdate(true)
      }
    }).catch(err => {
      toast.error('Error, contacte con soporte')
    })
  }

  useEffect(() => {
    fetchModules()
  },[])

  const onChange = e => {
    setUserData({ ...userData, [e.target.name] : e.target.value })
  }

  const handleAccess = async (e,id) => {
    e.persist()
    if(e.target.checked){
      await setModulesUser([...modulesUser,id])
    }else{
      setModulesUser(modulesUser.filter(v => v != e.target.value))
    }
  }

  const addAllModules = () => {
    let arreglo = modules.map(v => v.id)
    setModulesUser(arreglo)
  }

  const removeAllModules = () => {
    setModulesUser([])
  }

  const onSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    if(modulesUser.length === 0){
      e.stopPropagation();
      setValidated(true);
      toast.error('Debe escoger al menos un módulo para el usuario')
      return
    }

    let user = Object.assign({},userData,{
      modules: modulesUser
    })

    if(!isUpdate){
      if(!user.password){
        toast.error('Debe escribir una contraseña')
        return false
      }
    }

    if(isUpdate){
      axios.put(API_URL+'user/'+props.match.params.id,user).then(result => {
        toast.success('Usuario Modificado')
        renderMenuNew(true)
      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'user',user).then(result => {
        toast.success('Usuario Registrado')
        renderMenuNew(false)
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

  const cleanForm = () => {
    setUserData({
      name: "",
      email: "",
      rut: "",
      password: "",
      id_rol: ""
    })
    setModulesUser([])
    setValidated(false)
    setIsFormClean(true)
  }

  const goToListUser = () => {
    props.history.replace('/user/list')
  }

  const renderMenuNew = async type => {
    const menu = await axios.get(API_URL+'menu_user')
    props.setMenu(menu.data)
    if(type){
      setTimeout(() => {
        props.history.push('/user/list')
      },1000)
    }else{
      cleanForm()
    }
  }

  return(
    <Container>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Row>
          <Col
            sm={6} md={6} lg={6} xs={12} className="containerDivSeparated">
            <h3 className="text-center font-title">Formulario</h3>
            <br/>
            <Row>
              <InputField
                { ...props.inputName}
                handleChange={onChange}
                value={userData.name}
                />
              <InputField
                { ...props.inputEmail}
                handleChange={onChange}
                value={userData.email}
                />
            </Row>
            <Row>
              <InputField
                { ...props.inputRut}
                handleChange={onChange}
                value={userData.rut}
                />
              <InputField
                { ...props.inputPassword}
                handleChange={onChange}
                value={userData.password}
                />
            </Row>
            <Row>
              <InputField
                { ...props.inputSelect}
                handleChange={onChange}
                value={userData.id_rol}
              >
                <option value=''>--Seleccione--</option>
                {roles.map((v,i) => (
                  <option key={i} value={v.id}>{v.name_role}</option>
                ))}
              </InputField>
            </Row>
            {isFormClean ? (
              <Row>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <Button size="sm" type="button" variant="primary" block onClick={() => setIsFormClean(false)}>Registrar Otro <FaPlusCircle /></Button>
                </Col>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <Button size="sm" type="button" variant="warning" block onClick={goToListUser}>Ir al listado <FaUsers /></Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm={12} md={12} lg={12} xs={12} className="text-center">
                  <Button size="sm" type="submit" variant="primary" block>Enviar <FaPlusCircle /></Button>
                    o
                  <Button size="sm" onClick={goToListUser} type="button" variant="info" block>Ir al Listado</Button>
                </Col>
              </Row>
            )}
          </Col>
          <Col sm={6} md={6} lg={6} xs={12} className="containerDivSeparated">
            <h3 className="text-center font-title">Módulos</h3>
            <Row>
              {modules.map((v,i) => (
                <Col sm={4} md={4} lg={4} xs={6} key={i}>
                  <Form.Group>
                    <Form.Check type="checkbox"
                      custom
                      id={v.name_item+v.id}
                      label={v.name_item}
                      value={v.id}
                      checked={!!modulesUser.find(f => f == v.id)}
                      onChange={(e) => handleAccess(e,v.id) } />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <div className="fixedBottom">
              <Row>
                <Col sm={6} md={6} lg={6} xs={12}>
                  <Button size="sm" variant="secondary" block={true} onClick={addAllModules}>Seleccionar Todos <FaCheckCircle /></Button>
                </Col>
                <Col sm={6} md={6} lg={6} xs={12}>
                  <Button size="sm" variant="secondary" block={true} onClick={removeAllModules}>Deseleccionar Todos <FaTrashAlt /></Button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={12} md={12} lg={12}>
                  <br/>
                  <p>Hacer click en el botón enviar para guardar los cambios</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
    </Form>
    </Container>
  )
}

UserCreatePage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name',
    label : 'Nombre Completo',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputEmail: {
    type: 'email',
    required: true,
    name: 'email',
    label : 'Email',
    messageErrors: [
      'Requerido*, ','Formato tipo Email*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputRut: {
    type: 'text',
    required: true,
    name: 'rut',
    label : 'Documento Identidad',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputPassword: {
    type: 'password',
    required: false,
    name: 'password',
    label : 'Contraseña',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
  inputSelect: {
    type: 'select',
    required: true,
    name: 'id_rol',
    label : 'Rol',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  },
}

UserCreatePage.propTypes = {
  setMenu: PropTypes.func.isRequired
}


function mapDispatchToProps(){
    return {
      setMenu,
    }
}

export default connect(null,mapDispatchToProps())(UserCreatePage)
