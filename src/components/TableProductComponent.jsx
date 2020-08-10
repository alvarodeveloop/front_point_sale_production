import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from 'components/Table'
import {
  DropdownButton,
  Dropdown,
  Badge
} from 'react-bootstrap'
import { showPriceWithDecimals } from 'utils/functions'

let columnsProductTable = []

const TableProductComponent = (props) => {
  useEffect(() => {
    return () => {
      columnsProductTable = []
    }
  },[])
  useMemo(() => {

    columnsProductTable.push(
      {
        Header: 'Nombre Producto',
        accessor: 'name_product'
      },
      {
        Header: 'Precio',
        accessor: propsTable => {
          if(!propsTable.is_neto){
            let total = parseFloat(propsTable.price)
            let iva = parseFloat((total * parseFloat(props.configStore.tax)) / 100)
            total = total + iva
            return [showPriceWithDecimals(props.config,total)]
          }else{
            return [showPriceWithDecimals(props.config,propsTable.price)]
          }
        },
        Cell: propsTable => {
          let data = propsTable.cell.row.original
          if(!data.is_neto){
            let total = parseFloat(data.price)
            let iva = parseFloat((total * parseFloat(props.configStore.tax)) / 100)
            total = total + iva
            return showPriceWithDecimals(props.config,total)
          }else{
            return showPriceWithDecimals(props.config,data.price)
          }
        }
      },
      {
        Header: 'Categoria',
        accessor: propsTable => propsTable.categories.map(v => v.categories ? v.categories.name_category : ''),
        Cell: propsTable => {
          return (
            <ul className="list-group">
              {propsTable.cell.row.original.categories.map((v,i) => (
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
      {
        Header: 'Cantidad Disponible',
        accessor: propsTable => propsTable.inventary.stock,
        Cell: propsTable => {
          return (<Badge variant="danger" style={{fontSize: '18px'}}> {propsTable.cell.row.original.inventary[0].stock} </Badge>)
        }
      },
      {
        Header: 'Acciones',
        Cell: propsTable => {
          const id = propsTable.cell.row.original.id
          return(
            <DropdownButton size="sm" id={'drop'+propsTable.cell.row.original.id} title="Seleccione"  block="true">
              <Dropdown.Item onClick={() => handleAddCart(propsTable.cell.row.original)}>Añadir al Carrito</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    )

  },[])

  const handleAddCart = data => {
    props.addToCart(data)
  }

  return (
    <Table data={props.data} columns={columnsProductTable} />
  )
}

TableProductComponent.propTypes = {
  data: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  configStore: PropTypes.object.isRequired
}

export default TableProductComponent
