import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'

import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
let validate = false

const ModalCostDetailProduct = (props) => {

  const [dataDetail, setDataDetail ] = useState({detail: '',price:''})
  const [submitDataDetail, setSubmitDataDetail] = useState([])
  const [validate, setValidate] = useState(false)

  const finishDetail = () => {

    props.handleCostValues(submitDataDetail)
  }

  const handleOnHide = () => {
    props.onHide()
  }

  const onChange = e => {
    setDataDetail({...dataDetail, [e.target.name] : e.target.value})
  }

  const handleRemoveFromArray = offset => {
    let newArray = submitDataDetail.filter((v,i) => {
      if(i !== offset){
        return v
      }
    })

    setSubmitDataDetail(newArray)
  }

  const handleRemoveFromUpdate = data => {
    props.handleRemoveFromUpdate(data)
  }

  const handleSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }
    let objectNew = Object.assign({},dataDetail)
    setSubmitDataDetail([...submitDataDetail,objectNew])
    setDataDetail({detail: '', price: ''})
  }

  return (
    <Modal
      show={props.isShow}
      onHide={handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Detalle de Costos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate validated={validate}>
          <Row>
            <InputField
              {...props.inputDetail}
              value={dataDetail.detail}
              handleChange={onChange}
            />
            <InputField
              {...props.inputPrice}
              value={dataDetail.price}
              handleChange={onChange}
            />
          </Row>
          <Row className="justify-content-center">
            <Col sm={6} md={6} lg={6} xs={12}>
              <Button size="sm" type="submit" variant="success" block="true">Agregar</Button>
            </Col>
          </Row>
        </Form>
        <br/><br/>
        <Row className="justify-content-center">
          <Col
            sm={6}
            md={6}
            lg={6}
            xs={12}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">Detalle</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {submitDataDetail.map((v,i) => (
                  <tr key={i}>
                    <td>{v.detail}</td>
                    <td>{v.price}</td>
                    <td>
                      <Button size="sm" variant="danger" block="true" onClick={() => handleRemoveFromArray(i) }>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
                {props.dataUpdate.map((v,i) => (
                  <tr key={i}>
                    <td>{v.detail}</td>
                    <td>{v.cost}</td>
                    <td>
                      <Button size="sm" variant="danger" block="true" onClick={() => handleRemoveFromUpdate(v) }>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={finishDetail}>Finalizar</Button>
        <Button size="sm" onClick={handleOnHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalCostDetailProduct.propTypes = {
  onHide: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
  handleCostValues: PropTypes.func.isRequired,
  dataUpdate: PropTypes.array.isRequired,
  handleRemoveFromUpdate: PropTypes.func.isRequired,
}

ModalCostDetailProduct.defaultProps = {
  inputDetail: {
    type: 'text',
    required: true,
    name: 'detail',
    label : 'Detalle',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputPrice: {
    type: 'number',
    step: 'any',
    required: true,
    name: 'price',
    label : 'Precio',
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default ModalCostDetailProduct
