import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'
import Table from 'components/Table'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { showPriceWithDecimals } from 'utils/functions'

let cotizacionColumns = null

const CotizacionSearchPage = props => {

  const [cotizacionData, setCotizacionData] = useState([])

  useMemo(() => {
    cotizacionColumns = [
      {
        Header: 'Cotizaciones Registradas',
        columns: [
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
            accessor: props1 => [props1.client.name_client]
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
                </DropdownButton>
              )
            }
          }
        ]
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

  return (
    <Container className="containerDiv">
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
