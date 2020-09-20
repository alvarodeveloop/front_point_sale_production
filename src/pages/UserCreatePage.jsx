import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaTrashAlt, FaPlusCircle,FaUsers,FaArrowAltCircleUp } from "react-icons/fa";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image,
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
  const [enterpriseForm,setEnterpriseForm] = useState({
    name: "",
    address: "",
    is_open: true,
    id: ''
  })

  const [modulesUser,setModulesUser] = useState([])
  const [roles,setRoles] = useState([])
  const [modules,setModules] = useState([])
  const [validated, setValidated] = useState(false);
  const [isFormClean, setIsFormClean] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [typeDisplayModule, setTypeDisplayModule] = useState(1)
  const [enterpriseArray, setEntepriseArray] = useState([])
  const [messageDisplay , setMessageDisplay] = useState('')

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
        if(result[2].data.user.id_rol == 1 || result[2].data.user.id_rol == 3 || result[2].data.user.id_rol == 4){
          setModulesUser(result[2].data.modules.map(v => v.id_menu))
        }else if(result[2].data.user.id_rol == 2){
          setTypeDisplayModule(2)
          setEntepriseArray(result[2].data.user.enterprise)
        }else if(result[2].data.user.id_rol > 4){
          setTypeDisplayModule(3)
        }
        if(result[2].data.message) setMessageDisplay(result[2].data.message)
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
    if(e.target.name === "id_rol"){
      if(e.target.value == 2){
        setTypeDisplayModule(2)
      }else if( (e.target.value >= 3 && e.target.value <= 4 ) || e.target.value == 1){
        setTypeDisplayModule(1)
        cleanEnterprise()
      }else{
        setTypeDisplayModule(3)
        cleanEnterprise()
      }
    }
    setUserData({ ...userData, [e.target.name] : e.target.value })
  }

  const onChangeEnterprise = e => {
    setEnterpriseForm({ ...enterpriseForm, [e.target.name] : e.target.name === "is_open" ? e.target.checked : e.target.value })
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
    if(modulesUser.length === 0 && (userData.id_rol == 1 || userData.id_rol == 3 || userData.id_rol == 4) ){
      e.stopPropagation();
      setValidated(true);
      toast.error('Debe escoger al menos un módulo para el usuario')
      return
    }

    let user = Object.assign({},userData,{
      modules: modulesUser,
      enterprise : enterpriseForm
    })

    if(!isUpdate){
      if(!user.password){
        toast.error('Debe escribir una contraseña')
        return false
      }
    }

    let id_rol_user = parseInt(JSON.parse(localStorage.getItem('user')).id_rol,10)
    if(user.id_rol >= 4 && user.id_rol <= 7){
      user.id_sucursal = localStorage.getItem('id_sucursal')
    }

    let route = ''

    if(isUpdate){

      route = id_rol_user >= 3 && id_rol_user <= 7 ? API_URL+'user_by_branch_office/'+props.match.params.id : API_URL+'user/'+props.match.params.id

      axios.put(route,user).then(result => {
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
      route = id_rol_user >= 3 && id_rol_user <= 7 ? API_URL+'user_by_brach_office' : API_URL+'user'
      axios.post(route,user).then(result => {
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
      id_rol: 1
    })
    setModulesUser([])
    setValidated(false)
  }

  const cleanEnterprise = () => {
    setEnterpriseForm({
      name: "",
      address: "",
      is_open: true,
      id: ''
    })
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
      cleanEnterprise()
    }
  }

  const updateEnterprise = (id_enterprise, display = false) => {
    if(!display){
      let enter = enterpriseArray.find(v => v.id === id_enterprise)
      setEnterpriseForm({name: enter.name, address: enter.address, id: id_enterprise, is_open: enter.is_open})
    }else{
      cleanEnterprise()
    }
  }

  return(
    <Container>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Row>
          <Col sm={ typeDisplayModule > 4 ? 12 : 5 } md={typeDisplayModule > 4 ? 12 : 5} lg={typeDisplayModule > 4 ? 12 : 5} xs={12} style={{borderRight: '1px solid rgb(237, 237, 237)'}}>

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
                cols={typeDisplayModule < 5 ? 'col-md-6 col-sm-6 col-lg-6' : 'col-md-12 col-sm-12 col-lg-12'}
                handleChange={onChange}
                value={userData.id_rol}
              >
                <option value=''>--Seleccione--</option>
                {roles.map((v,i) => (
                  <option key={i} value={v.id}>{v.name_role}</option>
                ))}
              </InputField>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12} xs={12} className="text-center">
                <Button size="sm" type="submit" variant="primary" block>Enviar <FaPlusCircle /></Button>
                  o
                <Button size="sm" onClick={goToListUser} type="button" variant="info" block>Ir al Listado</Button>
              </Col>
            </Row>
            <br/>
            {messageDisplay ? (
              <p className="alert alert-info text-center">{messageDisplay}</p>
            ) : ''}
          </Col>
          {
            typeDisplayModule == 1 ? (
              <Col sm={7} md={7} lg={7} xs={12} className="containerDivSeparated">
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
                <Row className="fixedBottom">
                  <Col sm={12} md={12} lg={12}>
                    <p className="text-center">Hacer click en el botón enviar para guardar los cambios</p>
                  </Col>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <Button size="sm" variant="secondary" block={true} onClick={addAllModules}>Seleccionar Todos <FaCheckCircle /></Button>
                  </Col>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <Button size="sm" variant="secondary" block={true} onClick={removeAllModules}>Deseleccionar Todos <FaTrashAlt /></Button>
                  </Col>
                </Row>
              </Col>
            ) : typeDisplayModule == 2 ? (
              <Col sm={7} md={7} lg={7} xs={12} className="containerDivSeparated">
                <h3 className="text-center font-title">Datos de la Empresa</h3>
                { isUpdate && !enterpriseForm.id ? (
                  <Row>
                    {enterpriseArray.map((v,i) => (
                      <Col sm={4} md={4} lg={4} className="text-center" key={i}>
                        <h5 style={{color: 'black', textTransform: 'uppercase'}}>{v.name}</h5>
                        <Image src={require('../assets/img/enterprises.jpg')} style={{width: '100%'}}/>
                        <br/>
                        <Button size="sm" variant="danger" block={true} onClick={() => updateEnterprise(v.id)}>Modificar</Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <Row>
                        <InputField
                          type='text'
                          label='Nombre empresa'
                          name='name'
                          required={true}
                          messageErrors={[
                            'Requerido*'
                          ]}
                          cols='col-md-6 col-lg-6 col-sm-6'
                          value={enterpriseForm.name}
                          handleChange={onChangeEnterprise}
                          />
                        <InputField
                          type='text'
                          label='Dirección'
                          name='address'
                          required={false}
                          messageErrors={[]}
                          cols='col-md-6 col-lg-6 col-sm-6'
                          value={enterpriseForm.address}
                          handleChange={onChangeEnterprise}
                          />
                      </Row>
                      <Row>
                        <Col sm={4} md={4} lg={4}>
                          <br/>
                          <Form.Group>
                            <Form.Check type="checkbox"
                              custom
                              id={'is_open'}
                              name={'is_open'}
                              label={'Activa'}
                              value={enterpriseForm.is_open}
                              checked={enterpriseForm.is_open}
                              onChange={onChangeEnterprise} />
                          </Form.Group>
                        </Col>
                      </Row>
                      {
                        isUpdate ? (
                          <Row className="justify-content-center">
                            <Col sm={4} md={4} lg={4}>
                              <br/>
                              <Button variant="secondary" size="sm" type="button" block={true} onClick={() => updateEnterprise(null,true)}>Ver Empresas <FaArrowAltCircleUp /></Button>
                            </Col>
                          </Row>
                        ) : ''
                      }
                    </Col>
                  </Row>
                )}
            </Col>
          ) : '' }
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
