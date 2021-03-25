import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  Accordion,
  Card
} from 'react-bootstrap'
import 'styles/components/modalComponents.css'
import InputField from 'components/input/InputComponent'
import {FaCheckCircle,FaPlusCircle,FaPencilAlt,FaTrash} from 'react-icons/fa'
import TablePlansComponent from 'components/TablePlansComponent'
import 'styles/components/tabla_plans.css'
import 'styles/pages/users.css'

const ModalPlansComponent  = (props) => {

  const [validate, setValidate] = useState(false)

  const onChange = e => {
    if(e.target.name === "especialPlan"){
      props.setDataForm({...props.dataForm, especial : e.target.checked})
    }else{
      props.setDataForm({...props.dataForm, [e.target.name] : e.target.value})
    }
  }

  const onSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    props.onSubmit()
  }

  const handleDeletePlan = () => {
    props.deletePlan(Object.assign({},props.dataForm).id)
  }

  const handleAccess = async (e,id) => {
    e.persist()
    let object = Object.assign({},props.dataForm)
    if(e.target.checked){
      props.setDataForm({...object, modulesPlan: [...object.modulesPlan,id]})
    }else{
      props.setDataForm({...object, modulesPlan: object.modulesPlan.filter(v => v != e.target.value) })
    }
  }

  const addAllModules = () => {
    let arreglo = props.modules.map(v => v.id)
    props.setDataForm({...props.dataForm, modulesPlan: arreglo})
  }

  const removeAllModules = () => {
    props.setDataForm({...props.dataForm, modulesPlan: []})
  }

  return (
    <Modal
      show={props.isOpenModal}
      onHide={props.handleModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de Planes <FaPencilAlt />
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit} noValidate validated={validate}>
      <Modal.Body>
        <Row>
          <Col sm={8} md={8} lg={8}>
            <Row>
              <InputField
               type='text'
               label='Nombre Plan'
               name='name'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={props.dataForm.name}
               handleChange={onChange}
               />
               <InputField
                type='text'
                label='Descripción'
                name='description'
                required={false}
                messageErrors={[

                ]}
                cols='col-md-6 col-lg-6 col-sm-6'
                value={props.dataForm.description}
                handleChange={onChange}
                />
            </Row>
            <Row>
              <InputField
               type='number'
               label='Valor'
               name='price'
               step="any"
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={props.dataForm.price}
               handleChange={onChange}
               />
               <InputField
                type='number'
                label='Descuento'
                name='discount'
                step="any"
                required={false}
                messageErrors={[

                ]}
                cols='col-md-6 col-lg-6 col-sm-6'
                value={props.dataForm.discount}
                handleChange={onChange}
                />
            </Row>
            <Row>
              <InputField
                 type='select'
                 label='Periodo de Facturación'
                 name='billing_period'
                 step="any"
                 required={true}
                 messageErrors={[
                 'Requerido*'
                 ]}
                 cols='col-md-6 col-lg-6 col-sm-6'
                 value={props.dataForm.billing_period}
                 handleChange={onChange}
                 >
                  <option>--Seleccione--</option>
                  <option value={1}>1 Mes</option>
                  <option value={2}>2 Mes</option>
                  <option value={3}>3 Mes</option>
                  <option value={6}>6 Mes</option>
                  <option value={12}>12 Mes</option>
              </InputField>
              <InputField
                type='number'
                label='Dias para aviso de Vencimiento'
                name='days_to_advice_before_payment'
                required={false}
                messageErrors={[

                ]}
                cols='col-md-6 col-lg-6 col-sm-6'
                value={props.dataForm.days_to_advice_before_payment}
                handleChange={onChange}
                />
            </Row>
            <Row>
              <InputField
               type='number'
               label='Día de Facturación'
               name='day_payment'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={props.dataForm.day_payment}
               handleChange={onChange}
              />
              <InputField
                type='number'
                label='Días aviso antes de fecha de corte'
                name='day_before_day_cut'
                required={false}
                messageErrors={[

                ]}
                cols='col-md-6 col-lg-6 col-sm-6'
                value={props.dataForm.day_before_day_cut}
                handleChange={onChange}
              />
            </Row>
            <Row>
              <InputField
               type='number'
               label='Días de periodo de prueba'
               name='day_test'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={props.dataForm.day_test}
               handleChange={onChange}
              />
              <InputField
               type='number'
               label='Nº de límite de registros'
               name='number_limit_registers'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-6 col-lg-6 col-sm-6'
               value={props.dataForm.number_limit_registers}
               handleChange={onChange}
              />
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6}>
                <br/>
                <Form.Group>
                  <Form.Check type="checkbox"
                    custom
                    id={'especialPlan'}
                    name={'especialPlan'}
                    label={'Plan Especial'}
                    value={props.dataForm.especial}
                    checked={props.dataForm.especial}
                    onChange={onChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                      <b>Módulos del sistema para el plan</b>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Row>
                          {props.modules.map((v,i) => (
                            <Col sm={4} md={4} lg={4} xs={6} key={i}>
                              <Form.Group>
                                <Form.Check type="checkbox"
                                  custom
                                  id={v.name_item+v.id}
                                  label={v.name_item}
                                  value={v.id}
                                  checked={!!props.dataForm.modulesPlan.find(f => f == v.id)}
                                  onChange={(e) => handleAccess(e,v.id) } />
                              </Form.Group>
                            </Col>
                          ))}
                        </Row>
                        <Row className="">
                          <Col sm={6} md={6} lg={6} xs={12}>
                            <Button size="sm" variant="secondary" block={true} onClick={addAllModules}>Seleccionar Todos <FaCheckCircle /></Button>
                          </Col>
                          <Col sm={6} md={6} lg={6} xs={12}>
                            <Button size="sm" variant="secondary" block={true} onClick={removeAllModules}>Deseleccionar Todos <FaTrash /></Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
          </Col>
          <Col sm={4} md={4} lg={4} className="snip1404" style={{margin: '0px 0px 30px 0px'}}>
            <TablePlansComponent plan={props.dataForm} disabled={true}/>
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Col sm={4} md={4} lg={4}>
            <Button size="sm" variant="primary" type="submit" block={true}>Guardar <FaPlusCircle /> </Button>
          </Col>
          {props.dataForm.id ? (
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" variant="danger" onClick={handleDeletePlan} block={true}><FaTrash /> Eliminar</Button>
            </Col>
          ) : ''}
          <Col sm={4} md={4} lg={4}>
            <Button size="sm" variant="secondary" onClick={props.handleModal} block={true}>Cerrar</Button>
          </Col>
        </Row>
      </Modal.Body>
      </Form>
    </Modal>
  )
}

ModalPlansComponent.propTypes = {
  handleModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  dataForm: PropTypes.object.isRequired,
  setDataForm: PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired,
  deletePlan: PropTypes.func,
  modules: PropTypes.array,
}

export default ModalPlansComponent
