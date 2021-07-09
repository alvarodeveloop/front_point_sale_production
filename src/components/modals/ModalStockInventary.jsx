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
import { FaPaperPlane, FaCartPlus } from 'react-icons/fa'
import 'styles/components/modalComponents.scss'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import axios from 'axios'
import Select from 'react-select';
import LoadingComponent from 'components/LoadingComponent'

const ModalStockInventary = (props) => {

  const [inventary, setInventary] = useState({
    detail: '',
    cost: '',
    quantity: '',
    id_inventary: '',
    id_provider: [],
    type_operation: "suma",
  })
  const [validate, setValidate] = useState(false)
  const [provider, setProvider] = useState([])
  const [displayLoading, setDisplayLoading] = useState(false)


  useEffect(() => {

  }, [])

  useEffect(() => {
    setInventary(currentData => Object.assign({}, currentData, { id_inventary: props.product.id }))
  }, [props.product])

  const handleChange = e => {
    setInventary({ ...inventary, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const objectPost = Object.assign({}, inventary)

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    setDisplayLoading(true)
    axios.post(API_URL + 'inventary', objectPost).then(result => {
      toast.success('Stock Modificado')
      props.handleSubmitStock()
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const onChangeSelect = val => {
    setInventary({ ...inventary, id_provider: val })
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
          Ingreso de stock del producto {Object.keys(props.product).length > 0 ? props.product.products.name_product : ''} <FaCartPlus />
        </Modal.Title>
      </Modal.Header>
      <Form id="formSubmit" onSubmit={handleSubmit} noValidate validated={validate}>
        <>
          {displayLoading ? (
            <Modal.Body>
              <LoadingComponent />
            </Modal.Body>
          ) : (
            <Modal.Body>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type={'number'}
                      required={true}
                      name={'quantity'}
                      label={'Cantidad'}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      messageErrors={[
                        'Requerido*'
                      ]}
                      handleChange={handleChange}
                      value={inventary.quantity}
                    />
                    <InputField
                      type='text'
                      label='Detalle de Costo'
                      name='detail'
                      required={false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={inventary.detail}
                      handleChange={handleChange}
                    />
                    <InputField
                      type='number'
                      step="any"
                      label='Costo'
                      name='cost'
                      required={inventary.type_operation === "resta" ? false : true}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={inventary.cost}
                      handleChange={handleChange}
                    />
                  </Row>
                  <Row>
                    <Form.Group className={'col-md-4 col-sm-4 col-lg-4'}>
                      <Form.Label className="fontBold">Proveedores</Form.Label>
                      <Select
                        value={inventary.id_provider}
                        onChange={onChangeSelect}
                        isMulti={true}
                        options={props.providers.map((v, i) => {
                          return { value: v.id, label: v.social_razon }
                        })}
                      />
                    </Form.Group>
                    <InputField
                      type='select'
                      label='Tipo de Operación'
                      name='type_operation'
                      required={true}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={inventary.type_operation}
                      handleChange={handleChange}
                    >
                      <option value="">--Seleccione--</option>
                      <option value="suma">Ingresar</option>
                      <option value="resta">Sacar</option>
                    </InputField>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" type="submit" variant="danger" block={true}>Modificar <FaPaperPlane /></Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button variant="secondary" size="sm" onClick={props.onHide} block={true}>Cerrar</Button>
                </Col>
              </Row>
            </Modal.Body>
          )}
        </>
        <Modal.Footer>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalStockInventary.propTypes = {
  onHide: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
  product: PropTypes.object,
  providers: PropTypes.array.isRequired,
}

ModalStockInventary.defaultProps = {
  inputMinimun: {
    type: 'number',
    min: '0',
    required: true,
    name: 'minimun_stock',
    label: 'Stock Mínimo',
    cols: "col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputProvider: {
  },
}

export default ModalStockInventary
