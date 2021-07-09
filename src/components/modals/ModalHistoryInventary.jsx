import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownButton,
  Form
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { FaTrash } from 'react-icons/fa'
import 'styles/components/modalComponents.scss'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatNumber } from 'utils/functions'
import * as moment from 'moment-timezone'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import
import InputFieldRef from 'components/input/InputComponentRef'
import InputField from 'components/input/InputComponent'
import Select from 'react-select';
import LoadingComponent from 'components/LoadingComponent'


let inventaryHistorialColumns = []

const ModalHistoryInventary = (props) => {

  const [costUpdate, setCostUpdate] = useState(null)
  const [validated, setValidated] = useState(null)
  const [displayLoading, setDisplayLoading] = useState(false)

  useEffect(() => {

  }, [])

  useMemo(() => {
    inventaryHistorialColumns = [
      {
        Header: 'Detalle Costo',
        accessor: 'detail',
      },
      {
        Header: 'Cantidad',
        accessor: 'quantity',
      },
      {
        Header: 'Costo',
        accessor: 'cost',
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <Badge variant="danger" className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{formatNumber(original.cost, 2, ',', '.')}</Badge>
          )
        }
      },
      {
        Header: 'Tipo Operación',
        accessor: props1 => props1.type_operation === "suma" ? ["Ingreso"] : ["Egreso"],
      },
      {
        Header: 'Proveedores',
        accessor: props1 => props1.providers.map(v => v.provider.social_razon),
        Cell: props1 => {
          const { original } = props1.cell.row
          if (original.providers.length > 1) {
            return (
              <OverlayTrigger placement={'right'} overlay={
                <Tooltip id={"tooltip-right"}>
                  <ul className="list-group">
                    {original.providers.map((v, i) => (
                      <li key={i} className="list-group-item">{v.provider.social_razon}</li>
                    ))}
                  </ul>
                </Tooltip>
              }>
                <Button sm="sm" type="button" variant="link" block={true}>Proveedores</Button>
              </OverlayTrigger>
            )
          } else {
            if (original.providers.length === 1) {
              return original.providers[0].provider.social_razon
            } else {
              return 'Sin proveedores'
            }
          }
        }
      },
      {
        Header: 'Fecha',
        accessor: props1 => props.createdAt,
        Cell: props1 => moment.tz(props1.cell.row.original.createdAt, 'America/Santiago').format('DD-MM-YYYY')
      },
      {
        Header: '.',
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <DropdownButton size="sm" id={'drop' + props1.cell.row.original.id} title="Seleccione" block="true">
              <Dropdown.Item onClick={() => modifyRegister(original)}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => removeCost(original)}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  }, [])

  const modifyRegister = original => {

    setCostUpdate(oldData => {
      return Object.assign({}, original, {
        id_provider: original.providers.map(v => { return { value: v.id_provider, label: v.provider.social_razon } }),
        type_operation: 1
      })
    })
  }

  const removeCost = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">Afectara el stock del inventario también</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(data.id);
                onClose();
              }}
            >
              Si, Aceptar
            </button>
            <button className="button-alert" onClick={onClose}>No</button>
          </div>
        );
      }
    });
  }

  const confirmDeleteRegister = id => {
    setDisplayLoading(true)
    axios.delete(API_URL + 'inventary/' + id).then(result => {
      toast.success('Registro eliminado, actualizando registros del inventario...')
      props.fetchData()
      setTimeout(() => {
        document.getElementById('button_close').click()
      }, 1500);
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

  const handleChange = e => {
    setCostUpdate({ ...costUpdate, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const objectPost = Object.assign({}, costUpdate)

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    setDisplayLoading(true)
    axios.put(API_URL + 'inventary/' + objectPost.id, objectPost).then(result => {
      toast.success('Stock Modificado')
      setCostUpdate(null)
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
    setCostUpdate({ ...costUpdate, id_provider: val })
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Historial del Producto {Object.keys(props.costs).length > 0 ? props.costs.products.name_product : ''}
        </Modal.Title>
      </Modal.Header>
      <>
        {displayLoading ? (
          <Modal.Body>
            <LoadingComponent />
          </Modal.Body>
        ) : (
          <Modal.Body>
            {costUpdate ? (
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <h4 className="title_principal">Modificación del costo</h4>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <Form onSubmit={handleSubmit} noValidate validated={validated}>
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
                        value={costUpdate.quantity}
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
                        value={costUpdate.detail ? costUpdate.detail : ''}
                        handleChange={handleChange}
                      />
                      <InputField
                        type='number'
                        step="any"
                        label='Costo'
                        name='cost'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={costUpdate.cost}
                        handleChange={handleChange}
                      />
                    </Row>
                    <Row>
                      <Form.Group className={'col-md-4 col-sm-4 col-lg-4'}>
                        <Form.Label className="fontBold">Proveedores</Form.Label>
                        <Select
                          value={costUpdate.id_provider}
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
                        value={costUpdate.type_operation}
                        handleChange={handleChange}
                      >
                        <option value={1}>No afecta el Stock</option>
                        <option value={2}>Afecta el Stock en forma de descuento</option>
                        <option value={3}>Afecta el stock en forma de aumento</option>
                      </InputField>
                    </Row>
                    <Row className="justify-content-center">
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="danger" block={true} size="sm" type="submit">Enviar</Button>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="secondary" block={true} size="sm" type="button" onClick={() => setCostUpdate(null)}>Cancelar</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Table columns={inventaryHistorialColumns} data={props.costs.inventary_cost ? props.costs.inventary_cost : []} />
                </Col>
              </Row>
            )}
          </Modal.Body>
        )}
      </>
      <Modal.Footer>
        <Button onClick={props.onHide} id="button_close">Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalHistoryInventary.propTypes = {
  costs: PropTypes.any.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmitStock: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  configGeneral: PropTypes.object,
}

export default ModalHistoryInventary
