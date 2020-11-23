import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Accordion,
  Card,
  Badge
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import { FaSearch,FaPlusCircle, FaBuilding } from "react-icons/fa";
import 'styles/components/tabla_plans.css'
import TablePlansComponent from 'components/TablePlansComponent'
import {formatRut} from 'utils/functions'
import { setEnterprises, setBranchOffices, setIdEnterprise} from 'actions/enterpriseSucursal'
import { setMenu } from 'actions/menu'
import { setDisplayMessage } from 'actions/menu'
import { setConfig } from 'actions/configs'
import { connect } from 'react-redux'
import layoutHelpers from 'shared/layouts/helpers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const EnterpriseFormPage = (props) => {

  const [validated, setValidated] = useState(false)
  const [planes, setPlanes] = useState([])
  const [dataForm, setDataForm] = useState({
    rut: '',
    name: '',
    bussines_name: '',
    address: '',
    city: '',
    comuna: '',
    email_enterprise: '',
    phone: '',
    spin: '',
    plan: {},
    actividad_economica: '',
    giro : '',
  })
  const accordionRef = useRef(null)

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    fetchData()
    return () => {
      layoutHelpers.toggleCollapsed()
    }
  },[])

  const fetchData = () => {
    let promises = [
      axios.get(API_URL+'plans')
    ]
    if(props.match.params.id){
      promises.push(
        axios.get(API_URL+'enterprise/'+props.match.params.id)
      )
    }

    Promise.all(promises).then(result => {
      setPlanes(result[0].data)
      if(result.length > 1){
        setDataForm({
          rut: result[1].data.rut,
          name: result[1].data.name,
          bussines_name: result[1].data.bussines_name,
          email_enterprise: result[1].data.email_enterprise,
          city: result[1].data.city,
          comuna: result[1].data.comuna,
          address: result[1].data.address,
          phone: result[1].data.phone,
          spin: result[1].data.spin,
          plan: result[1].data.plan,
          id: result[1].data.id,
          actividad_economica: result[1].data.actividad_economica,
          plan_backup: result[1].data.plan,
          giro: result[1].data.giro
        })
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

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},dataForm)
    if(Object.keys(dataForm.plan).length < 1){
      toast.error('Debe escoger un plan para la empresa')
      return false
    }

    if(data.id){
      let backup = data.plan_backup

      axios.put(API_URL+'enterprise/'+data.id,data).then(async result => {
        toast.success('Empresa modificada con éxito')
        if(props.id_enterprise_redux == data.id && backup.id !== data.plan.id){
          props.setDisplayMessage(true)
          let branch = await axios.get(API_URL+'enterprises_branch_office/'+data.id)
          props.setEnterprises(result.data.enterprises)
          if(branch.data.menu){
            props.setMenu(branch.data.menu)
          }
          localStorage.setItem('id_enterprise',data.id)
          localStorage.setItem('configGeneral',JSON.stringify(branch.data.config))
          props.setConfig(branch.data.config)
          props.setIdEnterprise(data.id)

          setTimeout(function () {
            props.setDisplayMessage(false)
            goToTable()
          }, 1500);

        }else{
          setTimeout(function () {
            goToTable()
          }, 1500);
        }

      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'enterprise',data).then(async result => {
        toast.success('Empresa creada con éxito')
        if(result.data.enterprises.length === 1){
          props.setDisplayMessage(true)
          let branch = await axios.get(API_URL+'enterprises_branch_office/'+result.data.enterprises[0].id)
          props.setEnterprises(result.data.enterprises)
          props.setBranchOffices([])
          if(branch.data.menu){
            props.setMenu(branch.data.menu)
          }
          localStorage.setItem('id_enterprise',result.data.enterprises[0].id)
          localStorage.setItem('configGeneral',JSON.stringify(branch.data.config))
          props.setConfig(branch.data.config)
          props.setIdEnterprise(result.data.enterprises[0].id)

          setTimeout(function () {
            props.setDisplayMessage(false)
            goToTable()
          }, 1500);

        }else{
          props.setEnterprises(result.data.enterprises)
          setTimeout(function () {
            goToTable()
          }, 1500);
        }
      }).catch(err => {
        console.log(err);
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const onChange = e => {
    if(e.target.name === "rut"){
      setDataForm({...dataForm,[e.target.name] : formatRut(e.target.value)})
    }else{
      setDataForm({...dataForm,[e.target.name] : e.target.value})
    }
  }

  const goToTable = () => {
    props.history.replace('/enterprise')
  }

  const handleSelectPlan = plan => {
    setDataForm({...dataForm, plan : Object.assign({},plan)})
    accordionRef.current.click()
    toast.info('Plan Seleccionado')
  }

  const searchClientByApiFacturacion = () =>{
    // para buscar receptores simple
    let val = Object.assign({},dataForm).rut
     if(val){
       toast.info('Buscando Receptor, espere por favor')
       axios.get(API_URL+'search_receptor/'+val.split('-')[0]+'/'+val.split('-')[1]).then(result => {
         setDataForm(oldData => {
           return Object.assign({},oldData,{
             rut : result.data.rut +"-"+result.data.dv,
             bussines_name: result.data.razon_social,
             address: result.data.direccion_seleccionada,
             comuna : result.data.comuna_seleccionada,
             city : result.data.ciudad_seleccionada,
           })
         })

       }).catch(err => {
         if(err.response){
           toast.error(err.response.data.message)
         }else{
           console.log(err);
           toast.error('Error, contacte con soporte')
         }
       })
     }else{
       toast.info('Debe ingresar un rut para buscar los datos de la empresa')
     }
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Formulario de Empresas</h4>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal text-right">Plan de la empresa: <Badge variant="danger" className="font-badge">{Object.keys(dataForm.plan).length > 0 ? dataForm.plan.name : 'Ninguno'}</Badge></h4>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm={12} lg={12} md={12}>
          <Form onSubmit={onSubmit} noValidate validated={validated}>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <Form.Label className="fontBold">Rut</Form.Label>
                <Form.Group className={"divContainerFlex"}>
                  <Form.Control
                    style={{flexGrow:2}}
                    type='text'
                    label='Rut'
                    id="rut_client_sii"
                    name='rut'
                    required={false}
                    placeholder="rut de la empresa"
                    cols='col-md-12 col-lg-12 col-sm-12'
                    className="form-control-sm"
                    onChange={onChange}
                    value={dataForm.rut}
                    />
                  <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para buscar datos de la empresa</Tooltip>}>
                      <Button variant="secondary" size="sm" onClick={() => searchClientByApiFacturacion()}><FaSearch /></Button>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
               <InputField
                type='text'
                label='Razon Social'
                name='bussines_name'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.bussines_name}
                handleChange={onChange}
               />
               <InputField
                type='text'
                label='Nombre'
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
               type='textarea'
               label='Dirección'
               name='address'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={dataForm.address}
               handleChange={onChange}
               />
               <InputField
                type='text'
                label='Ciudad'
                name='city'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.city}
                handleChange={onChange}
               />
               <InputField
                type='text'
                label='Comuna'
                name='comuna'
                required={true}
                messageErrors={[
                'Requerido*'
                ]}
                cols='col-md-4 col-lg-4 col-sm-4'
                value={dataForm.comuna}
                handleChange={onChange}
               />
            </Row>
            <Row>
              <InputField
               type='email'
               label='Email'
               name='email_enterprise'
               required={false}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={dataForm.email_enterprise}
               handleChange={onChange}
              />
              <InputField
               type='number'
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
            </Row>
            <Row className="justify-content-center">
              <Col sm={12} md={12} lg={12}>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card" ref={accordionRef}>
                      <b>Planes para la empresa</b> <FaBuilding />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body style={{backgroundColor: 'rgb(129, 195, 237)'}}>
                        <Row className="snip1404 justify-content-center">
                          {planes.map((v,i) => (
                            <Col sm={4} md={4} lg={4} key={i}>
                              <TablePlansComponent plan={v} handleSelect={handleSelectPlan}/>
                            </Col>
                          ))}
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Button variant="success" block={true} size="sm" type="submit">Enviar <FaPlusCircle /></Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button variant="danger" block={true} size="sm" type="button" onClick={goToTable}>Volver</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

EnterpriseFormPage.propTypes = {
  setEnterprises: PropTypes.func.isRequired,
  setDisplayMessage: PropTypes.func.isRequired,
  setBranchOffices: PropTypes.func.isRequired,
  setIdEnterprise : PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  id_enterprise_redux: PropTypes.any,
}

function mapDispatchToProps(){
    return {
      setEnterprises,
      setDisplayMessage,
      setBranchOffices,
      setIdEnterprise,
      setMenu,
      setConfig
    }
}

function mapStateToProps(state){
  return {
    id_enterprise_redux: state.enterpriseSucursal.id_enterprise
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(EnterpriseFormPage);
