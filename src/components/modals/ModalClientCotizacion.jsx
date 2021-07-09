import React, { useState, useMemo, useEffect } from 'react'
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
import Table from 'components/Table'
import 'styles/components/modalComponents.scss'
let client_columns = null

const ModalClientCotizacion = (props) => {

  const [clientSelect, setClientSelect] = useState([])
  const [disableButton, setDisableButton] = useState(false)
  useEffect(() => {
    return () => {
      client_columns = null
    }
  }, [])

  useMemo(() => {
    client_columns = [
      {
        Header: 'Nombre Cliente',
        accessor: 'name_client'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Documento',
        accessor: props1 => [props1.type_document + ' ' + props1.data_document],
        Cell: props1 => {
          return (props1.cell.row.original.type_document + '\n' + props1.cell.row.original.data_document)
        }
      },
      {
        Header: 'Seleccione',
        Cell: props1 => {
          return (
            <input type="checkbox" value={props1.cell.row.original.email} onChange={addOrRemoveClient} className="checkTable" />
          )
        }
      }
    ]
  }, [])

  const addOrRemoveClient = e => {
    e.persist()
    if (e.target.checked) {
      setClientSelect(client => [...client, e.target.value])
    } else {
      setClientSelect(state => state.filter(v => v !== e.target.value))
    }
  }

  const descheck = () => {
    document.querySelectorAll('.checkTable').forEach((item, i) => {
      item.checked = false
    });

  }

  const handleOnHide = () => {
    props.onHide()
  }

  const handleSubmit = () => {
    props.handleClientSubmit([...clientSelect])
    if (clientSelect.length > 0) {
      setClientSelect([])
      descheck()
      setDisableButton(true)
      setTimeout(() => {
        setDisableButton(false)
      }, 5000)
    } else {
      toast.error('Debe seleccionar al menos 1 cliente')
    }
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
          Clientes registrados
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table data={props.clients} columns={client_columns} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" size="md" variant="primary" onClick={handleSubmit}>Enviar</Button>
        <Button type="button" size="md" variant="secondary" onClick={handleOnHide}>cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalClientCotizacion.propTypes = {
  clients: PropTypes.array.isRequired,
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleClientSubmit: PropTypes.func.isRequired
}

export default ModalClientCotizacion
