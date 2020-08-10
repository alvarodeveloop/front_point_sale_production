import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import
import { formatNumber } from 'utils/functions'
import ModalSolvedSale from 'components/modals/ModalSolvedSale'
import ModalDetailSale from 'components/modals/ModalDetailSale'
import * as moment from 'moment-timezone'
import { showPriceWithDecimals } from 'utils/functions'
let saleColumns = []

const HistorySalePage = (props) => {

  const [sales,setSales] = useState([])
  const [isOpenSolvedSale,setIsOpenSolvedSale] = useState(false)
  const [saleDataOption, setSaleDataOption] = useState({})
  const [isOpenDetailSale,setIsOpenDetailSale] = useState(false)

  useEffect(() =>{
    fetchData()
    return () =>{
      saleColumns = []
    }
  },[])

  useMemo(() =>{
    saleColumns = [
        {
          Header: 'Referencia',
          accessor: 'ref',
        },
        {
          Header: 'Cliente',
          accessor: props => props.client ? [props.client.name_client+' '+props.client.data_document] : [],

        },
        {
          Header: 'Total',
          accessor: 'total',
          Cell: props => {
            return showPriceWithDecimals(props.config,props.cell.row.original.total)
          }
        },
        {
          Header: 'Pago',
          accessor: 'payment',
          Cell: props => {
            return showPriceWithDecimals(props.config,props.cell.row.original.payment)
          }
        },
        {
          Header: 'Status',
          accessor: props => [props.status === 2 ? 'En Espera' : 'Pagado'],
          Cell: props =>{
            return props.cell.row.original.status === 2 ? 'En Espera' : 'Pagado'
          }
        },
        {
          Header: 'Fecha',
          accessor: props => [props.createdAt],
          Cell: props =>{
            return moment(props.cell.row.original.createdAt).format('DD-MM-YYYY HH:II:SS')
          }
        },
        {
          Header: 'Acciones',
          Cell: props =>{
            return(
              <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
                {props.cell.row.original.status === 2 ? (
                  <React.Fragment>
                    <Dropdown.Item onClick={() => solvedSale(props.cell.row.original)}>Pagar Pedido</Dropdown.Item>
                      <Dropdown.Item onClick={() => seeDetails(props.cell.row.original)}>Ver Detalle</Dropdown.Item>
                      <Dropdown.Item onClick={() => anulateSale(props.cell.row.original)}>Anular Venta</Dropdown.Item>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Dropdown.Item onClick={() => printInvoice(props.cell.row.original)}>Imprimir Factura</Dropdown.Item>
                      <Dropdown.Item onClick={() => seeDetails(props.cell.row.original)}>Ver Detalle</Dropdown.Item>
                      <Dropdown.Item onClick={() => anulateSale(props.cell.row.original)}>Anular Venta</Dropdown.Item>
                  </React.Fragment>
                )}

              </DropdownButton>
            )
          }
        }
      ]
  })

  const printInvoice = datos => {
    window.open('/invoicePrintPage/'+datos.id,'_blank')
  }

  const solvedSale = data => {
    setSaleDataOption(data)
    setIsOpenSolvedSale(true)
  }

  const seeDetails = data => {
    setSaleDataOption(data)
    setIsOpenDetailSale(true)
  }

  const anulateSale = data => {

  }

  const fetchData = () => {
    axios.get(API_URL+'sale').then(result =>{
      setSales(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleOnhideSaleFiao = () => {
    setIsOpenSolvedSale(false)
    fetchData()
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">Tabla de Ventas</h4>
          <hr/>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Table columns={saleColumns} data={sales} />
        </Col>
      </Row>
      <ModalSolvedSale
        isShow={isOpenSolvedSale}
        onHide={handleOnhideSaleFiao}
        config={props.config}
        configStore={props.configStore}
        dataToPay={saleDataOption}
      />
      <ModalDetailSale
        isShow={isOpenDetailSale}
        onHide={() => setIsOpenDetailSale(false) }
        config={props.config}
        configStore={props.configStore}
        dataSale={saleDataOption}
      />
    </Container>
  )
}

HistorySalePage.defaultProps = {
 config: JSON.parse(localStorage.getItem('configGeneral')),
 configStore: JSON.parse(localStorage.getItem('configStore')),
}

export default HistorySalePage
