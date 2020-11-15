import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Image
} from 'react-bootstrap'
import 'styles/components/tabla_plans.css'
import TablePlansComponent from 'components/TablePlansComponent'
import {FaPlusCircle,FaPencilAlt} from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import {API_URL} from 'utils/constants'
import ModalPlansComponent from 'components/modals/ModalPlansComponent'

const PlanPage = (props) => {
  const [planes, setPlanes] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [validate, setValidate] = useState(false)
  const [modules, setModules] = useState([])
  const [dataForm, setDataForm] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    billing_period: '',
    days_to_advice_before_payment: '',
    day_before_day_cut: '',
    day_test : '',
    day_payment: '',
    especial : false,
    modulesPlan: [],
  })

  useEffect(() => {
    fetchData()
    get_modules()
  },[])

  const fetchData = () => {
     axios.get(API_URL+'plans').then(result => {
       setPlanes(result.data)
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
     })
  }

  const get_modules = () => {
    axios.get(API_URL+'modules_all').then(result => {
      setModules(result.data)
    }).catch(err => {
     if(err.response){
       toast.error(err.response.data.message)
     }else{
       console.log(err);
       toast.error('Error, contacte con soporte')
     }
    })
  }

  const handleModal = () => {
    if(isOpenModal){
      cleanForm()
    }
    setIsOpenModal(!isOpenModal)
  }

  const onSubmit = e => {
    const objectPost = Object.assign({},dataForm)
    if(objectPost.modulesPlan.length < 1){
      toast.error('El plan debe tener un módulo al menos')
      return false
    }
    if(!objectPost.id){
      axios.post(API_URL+'plans',objectPost).then(result => {
        toast.success('Plan creado con éxito')
        handleModal()
        fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      toast.info('Guardando... espere mientras se modifican los modulos de los usuarios con este plan')
      axios.put(API_URL+'plans/'+objectPost.id,objectPost).then(result => {
        toast.success('Plan modificado con éxito')
        handleModal()
        fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }
  const cleanForm = () => {
    setDataForm({
      name: '',
      description: '',
      price: '',
      discount: '',
      billing_period: '',
      days_to_advice_before_payment: '',
      day_test : '',
      day_before_day_cut: '',
      day_payment: '',
      especial : false,
      modulesPlan: [],
    })
  }

  const handleUpdate = dataUpdate => {
    setDataForm({
      name: dataUpdate.name,
      description: dataUpdate.description,
      price: dataUpdate.price,
      discount: dataUpdate.discount,
      billing_period: dataUpdate.billing_period,
      days_to_advice_before_payment: dataUpdate.days_to_advice_before_payment,
      day_test : dataUpdate.day_test,
      day_payment: dataUpdate.day_payment,
      day_before_day_cut: dataUpdate.day_before_day_cut,
      especial : dataUpdate.especial,
      id: dataUpdate.id,
      modulesPlan: dataUpdate.modules_plan.map(v => v.id_module),
    })
    handleModal()
  }

  const deletePlan = id => {
     axios.delete(API_URL+'plans/'+id).then(result => {
      toast.success('Plan eliminado con éxito')
      handleModal()
      fetchData()
     }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
     })
  }

  return (
    <Container fluid>
      <Row className="">
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Módulo de Planes</h4>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Total Planes <Badge variant="danger">{planes.length}</Badge></h4>
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={6}>
          <Button onClick={handleModal} variant="secondary" block={true} size="sm" type="button">Agregar Plan <FaPlusCircle /></Button>
        </Col>
      </Row>
      {planes.length > 0 ? (
        <Row className="snip1404 justify-content-center" style={{backgroundColor: 'rgb(192, 119, 204)', padding: '10px', margin: '50px 10px'}}>
          {planes.map((v,i) => (
            <Col sm={4} md={4} lg={4}>
              <TablePlansComponent plan={v} update={true} handleUpdate={handleUpdate}/>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} className="text-center">
            <br/>
            <Image src={require('../assets/img/denied.png')} style={{width: '30%'}}/>
            <br/><br/>
            <h4 className="">No existen planes creados</h4>
          </Col>
        </Row>
      )}
      <ModalPlansComponent
        isOpenModal={isOpenModal}
        handleModal={handleModal}
        dataForm={dataForm}
        setDataForm={setDataForm}
        onSubmit={onSubmit}
        deletePlan={deletePlan}
        modules={modules}
      />
    </Container>
  )
}

export default PlanPage
