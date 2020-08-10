import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Modal,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import 'styles/components/modalComponents.css'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'

const ModalStockInventary = (props) => {

  const [inventary, setInventary] = useState({
    minimun_stock: 0,
    stock: 0,
    id_product: 0,
    id_provider: '',
  })
  const [validate, setValidate] = useState(false)
  const [provider, setProvider] = useState([])

  useEffect(() => {
    fetchProvider()
  },[])

  useEffect(() => {
    setInventary({
      minimun_stock: props.product.minimun_stock,
      stock: props.product.stock,
      id_product: props.product.id,
      id_provider: props.product.id_provider,
    })
  },[props.product])

  const handleChange = e => {
    setInventary({...inventary, [e.target.name] : e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const objectUpdate = Object.assign({},inventary)

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    if(objectUpdate.minimun_stock < 0 || objectUpdate.stock < 0){
      toast.error('Los campos de stock no pueden ser menor a 0')
      e.stopPropagation();
      return
    }

    axios.put(API_URL+'inventary/'+inventary.id_product,objectUpdate).then(result => {

      toast.success('Stock Modificado')
      props.handleSubmitStock()

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const fetchProvider = () => {
    axios.get(API_URL+'provider').then(result => {
      setProvider(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Stock del Producto { props.product.name_product }
        </Modal.Title>
      </Modal.Header>
      <Form id="formSubmit" onSubmit={handleSubmit} noValidate validated={validate}>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} xs={12}>
            <Row>
              <InputField
                {...props.inputMinimun}
                handleChange={handleChange}
                value={inventary.minimun_stock}
              />
              <InputField
                {...props.inputStock}
                handleChange={handleChange}
                value={inventary.stock}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputProvider}
                handleChange={handleChange}
                value={inventary.id_provider}
              >
                <option>--Seleccione--</option>
                {provider.map((v,i) => (
                  <option value={v.id} key={i}>{v.name_fantasy}</option>
                ))}
              </InputField>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" type="submit" variant="success">Modificar</Button>
        <Button size="sm" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalStockInventary.propTypes =  {
  onHide : PropTypes.func.isRequired,
  isShow : PropTypes.bool.isRequired,
  product: PropTypes.object
}

ModalStockInventary.defaultProps = {
  inputMinimun: {
    type: 'number',
    min: '0',
    required: true,
    name: 'minimun_stock',
    label : 'Stock Mínimo',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputStock: {
    type: 'number',
    required: true,
    name: 'stock',
    label : 'Stock Actual',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputProvider: {
    type: 'select',
    required: true,
    name: 'id_provider',
    label : 'Proveedor',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default ModalStockInventary
