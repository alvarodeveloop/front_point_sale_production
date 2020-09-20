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

export let productColumns = [
      {
        Header: 'Nombre Producto',
        accessor: 'name_product'
      },
      {
        Header: 'P.Venta',
        accessor: 'price',
        Cell: props1 => {
          const price = props1.cell.row.original.price
          return ( <Badge variant="danger">{formatNumber(price,2,',','.')}</Badge>)
        }
      },
      {
        Header: 'P.Compra',
        accessor: 'cost',
        Cell: props1 => {
          const cost = props1.cell.row.original.cost
          return ( <Badge variant="danger">{formatNumber(cost,2,',','.')}</Badge>)
        }
      },
      {
        Header: 'Categoria',
        accessor: props => props.categories.map(v => v.categories ? v.categories.name_category : ''),
        Cell: props => {
          return (
            <ul className="list-group">
              {props.cell.row.original.categories.map((v,i) => (
                <li key={i} className="list-group-item">{v.categories ? v.categories.name_category : ''}</li>
              ))}
            </ul>
          )
        }
      },
      {
        Header: 'Tipo de Venta',
        accessor: 'method_sale_format'
      },
]


export let inventaryColumns = [

      {
        Header: 'Nombre Producto',
        accessor: props => props.products.name_product
      },
      {
        Header: 'Proveedor',
        accessor: props => props.products.providers ? props.products.providers.name_fantasy : 'Sin Proveedor'
      },
      {
        Header: 'Categoría',
        accessor: props => props.products.categories.map(v => v.categories ? v.categories.name_category : ''),
        Cell: props => (

          <ul className="list-group">
            {props.cell.row.original.products.categories.map((v,i) => (
              <li key={i} className="list-group-item">{v.categories ? v.categories.name_category : ''}</li>
            ))}
          </ul>
        )
      },
      {
        Header: 'Stock Mínimo',
        accessor: 'minimun_stock',
        Cell: props1 => {
          const stock = props1.cell.row.original.minimun_stock
          return (<Badge variant="danger" className="font_badge">{stock}</Badge>)
        }
      },
      {
        Header: 'Stock Actual',
        accessor: 'stock',
        Cell: props1 => {
          const stock = props1.cell.row.original.stock
          return (<Badge variant="danger" className="font_badge">{stock}</Badge>)
        }
      },
      {
        Header: 'Estado',
        accessor: 'estado',
        Cell: props => {

          if(props.cell.row.original.estado === "Normal"){
            return (
              <Badge variant="success" className="font-badge">
                {props.cell.row.original.estado}
              </Badge>
            )
          }else{
            return (
              <Badge variant="danger" className="font-badge">
                {props.cell.row.original.estado}
              </Badge>
            )
          }
        }
      },
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
