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
import {Doughnut} from 'react-chartjs-2';
import { ARRAY_COLORS } from 'utils/constants'
let saleColumns = []

let optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  },
  hover: {
    animationDuration: 0
  },
  responsiveAnimationDuration: 0,
}

let data_donut_ss_status = {
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
};

const HistorySalePage = (props) => {

  const [sales,setSales] = useState([])
  const [isOpenSolvedSale,setIsOpenSolvedSale] = useState(false)
  const [saleDataOption, setSaleDataOption] = useState({})
  const [isOpenDetailSale,setIsOpenDetailSale] = useState(false)
  const [redraw,setRedraw] = useState(false)
  const [stadistics,setStadistics] = useState([])

  useEffect(() =>{
    if(!props.config || !props.configStore){
      if(!props.config){
        toast.error('Error, debe hacer su configuración general')
        setTimeout(function () {
          props.history.replace('/config/config_general')
        }, 2000);
      }else if(!props.configStore){
        toast.error('Error, debe hacer su configuración de la tienda primero')
        setTimeout(function () {
          props.history.replace('/config/config_store')
        }, 2000);
      }
    }else{
      fetchData()
    }
    return () =>{
      saleColumns = []
      resetChartData()
    }
  },[])

  useEffect(() => {
    handleDataDonutSsStatus()
    setTimeout(function () {
      setRedraw(false)
    }, 3000);
  },[stadistics])

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

  const handleDataDonutSsStatus = () => {

    stadistics.forEach((v, i) => {
      data_donut_ss_status.labels.push(v.name)
      data_donut_ss_status.datasets[0].data.push(parseFloat(v.total))
      data_donut_ss_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_ss_status.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    setTimeout(function () {
      setRedraw(true)
    }, 1500);

  }

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
    let promise = [
      axios.get(API_URL+'sale'),
      axios.get(API_URL+'sale_stadistics')
    ]
    Promise.all(promise).then(result => {
      setSales(result[0].data)
      setStadistics(result[1].data.sale)
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
    resetChartData()
    fetchData()
  }

  const resetChartData = () => {
    data_donut_ss_status = {
      labels: [],
    	datasets: [{
    		data: [],
    		backgroundColor: [],
    		hoverBackgroundColor: []
    	}]
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={6} md={6} lg={6}></Col>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h5>Totales de Ventas</h5>
        </Col>
      </Row>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h4 className="title_principal">Tabla de Ventas</h4>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Doughnut data={data_donut_ss_status} redraw={redraw} options={optionsBar}/>
        </Col>
      </Row>
      <hr/>
      <Row>
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
      {props.config && props.configStore ? (
        <ModalDetailSale
          isShow={isOpenDetailSale}
          onHide={() => setIsOpenDetailSale(false) }
          config={props.config}
          configStore={props.configStore}
          dataSale={saleDataOption}
        />
      ) : ''}

    </Container>
  )
}

HistorySalePage.defaultProps = {
 config: JSON.parse(localStorage.getItem('configGeneral')),
 configStore: JSON.parse(localStorage.getItem('configStore')),
}

export default HistorySalePage
