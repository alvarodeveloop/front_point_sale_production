import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Badge
} from 'react-bootstrap'
import Table from 'components/Table'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { showPriceWithDecimals } from 'utils/functions'
import { FaPlusCircle } from "react-icons/fa";
import FileSaver from 'file-saver'

let cotizacionColumns = null

const CotizacionSearchPage = props => {

  const [cotizacionData, setCotizacionData] = useState([])

  useMemo(() => {
    cotizacionColumns = [
        {
          Header: 'Referencia',
          accessor: 'ref',
          Cell: props1 => {
            let id = props1.cell.row.original.id
            return (
              <Button size="sm" variant="link" block={true} onClick={() => updateCotizacion(id)}>{ props1.cell.row.original.ref } </Button>
            )
          }
        },
        {
          Header: 'Cliente',
          accessor: props1 => props1.client ? [props1.client.name_client] : []
        },
        {
          Header: 'Total Productos',
          accessor: 'total_product',
          Cell: props => {
            return showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_product)
          }
        },
        {
          Header: 'Total gastos',
          accessor: 'total_gastos',
          Cell: props => {
            return showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_gastos)
          }
        },
        {
          Header: 'Total Balance',
          accessor: 'total_balance',
          Cell: props => {
            return showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_balance)
          }
        },
        {
          Header: 'Acciones',
          Cell: props => {
            const id = props.cell.row.original.id
            return (
              <DropdownButton size="sm" id={'drop'+id} title="Seleccione"  block="true">
                <Dropdown.Item onClick={() => updateCotizacion(id)}>Modificar | Ver detalle</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteCotizacion(id)}>Eliminar</Dropdown.Item>
                <Dropdown.Item onClick={() => printCotizacion(id)}>Imprimir Cotizacion</Dropdown.Item>
              </DropdownButton>
            )
          }
        }
    ]
  },[])

  useEffect(() => {
    fetchData()
    return () =>{
      cotizacionColumns = null
    }
  },[])

  const fetchData = () => {
    axios.get(API_URL+'cotizacion').then(result => {
      setCotizacionData(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const updateCotizacion = id => {
    props.history.replace('/quotitation/create_quotitation/'+id)
  }

  const deleteCotizacion = id => {
    axios.delete(API_URL+'cotizacion/'+id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.messsage)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToForm = () => {
    props.history.replace('/quotitation/create_quotitation')
  }

  const printCotizacion = id => {
    axios.get(API_URL+'cotizacion_print/'+id,{
      responseType: 'blob'
    }).then(result => {
      FileSaver.saveAs(result.data,'test.pdf')
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Container className="containerDiv">
      <Row>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Tabla de Cotizaciones</h4>
          <Button variant="success" onClick={goToForm} size="sm">Nuevo Registro <FaPlusCircle /></Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center title_principal">
          <h4>Total Cotizaciones Realizadas</h4>
          <Badge variant="danger">{cotizacionData.length}</Badge>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12}>
          <Table columns={cotizacionColumns} data={cotizacionData} />
        </Col>
      </Row>
    </Container>
  )
}

CotizacionSearchPage.defaultProps = {
  configGeneral: JSON.parse(localStorage.getItem('configGeneral')),
}

export default CotizacionSearchPage
