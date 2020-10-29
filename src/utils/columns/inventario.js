import React from 'react'
import { formatNumber } from 'utils/functions'
import { Badge } from 'react-bootstrap'
import * as moment from 'moment-timezone'

export let categoryColumns = [

      {
        Header: 'Nombre Categoria',
        accessor: 'name_category'
      }
]

export const inventaryHistorialColumns = [
  {
    Header: 'Motivo',
    accessor: props => props.reason.name_reason,
    Cell: props => {
      return props.cell.row.original.reason.name_reason
    }
  },
  {
    Header: 'Usuario',
    accessor: props => props.user.email,
    Cell: props => {
      return props.cell.row.original.user.email
    }
  },
  {
    Header: 'Tipo de Operación',
    accessor: 'type_operation',
    Cell: props => {
      if(props.cell.row.original.type_operation === "Resta"){
        return (
          <Badge variant="danger" style={{fontSize: '18px'}}>Resta</Badge>
        )
      }else{
        return (
          <Badge variant="success" style={{fontSize: '18px'}}>Suma</Badge>
        )
      }
    }
  },
  {
    Header: 'Moficación de Stock',
    accessor: 'stock'
  },
  {
    Header: 'Stock Minimo',
    accessor: 'minimun_stock'
  },
  {
    Header: 'Fecha',
    accessor: props => props.createdAt,
    Cell: props => moment.tz(props.cell.row.original.createdAt,'America/Santiago').format('DD-MM-YYYY HH:mm:ss')
  },
]
