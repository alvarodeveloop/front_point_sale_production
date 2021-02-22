import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Badge,Row,Col,Button,Accordion,Card,Image} from 'react-bootstrap'
import CardStatusComponent from "./CardStatusComponent"
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {toast} from 'react-toastify'
import { ARRAY_COLORS } from 'utils/constants'
import {formatNumber} from 'utils/functions'
import {Doughnut,Bar,Line} from 'react-chartjs-2';

let data_donut_payments = {
  labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
}

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

const options_line = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio : false,
}

let data_bar_total_debit = {
  labels: [],
  datasets: [
    {
      label: 'Pagos Pendientes',
      backgroundColor: 'rgb(15, 13, 74)',
      borderColor: 'rgb(27, 13, 74)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(15, 13, 74)',
      hoverBorderColor: 'rgb(27, 13, 74)',
      data: []
    }
  ]
};

let data_bar_most_sales = {
  labels: [],
  datasets: [
    {
      label: 'Productos más vendidos',
      backgroundColor: '#0c0f5d',
      borderColor: '#0c0f5d',
      borderWidth: 1,
      hoverBackgroundColor: '#c50747',
      hoverBorderColor: '#0c0f5d',
      data: []
    }
  ]
};

let data_line_by_year = {
  labels: [],
  datasets: [
    {
      label: 'Cantidad facturada por años',
      data: [],
      fill: false,
      backgroundColor: 'rgb(125, 81, 52)',
      borderColor: 'rgb(99, 56, 21)',
    },
  ],
}

const EnterpriseDashboardComponent = (props) => {

  const [dataDh, setDataDh] = useState(null)
  const [loading,setLoading] = useState(true)
  const [redraw,setRedraw] = useState(false)

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useEffect(() => {
    if(dataDh) handleStadistics()
  },[dataDh])

  const handleStadistics = () => {
    data_donut_payments.labels = []
    data_donut_payments.datasets[0].data = []
    data_donut_payments.datasets[0].backgroundColor = []
    data_donut_payments.datasets[0].hoverBackgroundColor = []
    data_bar_total_debit.labels = []
    data_bar_total_debit.datasets[0].data = []
    data_bar_most_sales.labels = []
    data_bar_most_sales.datasets[0].data = []
    data_line_by_year.labels = []
    data_line_by_year.datasets[0].data = []

    dataDh.totalPayments.forEach((v, i) => {
      data_donut_payments.labels.push(v.label)
      data_donut_payments.datasets[0].data.push(parseFloat(v.total))
      data_donut_payments.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_payments.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    dataDh.totalDebt.forEach((item, i) => {
      data_bar_total_debit.labels.push(item.label)
      data_bar_total_debit.datasets[0].data.push(item.total)
    });

    dataDh.mostSales.forEach((item, i) => {
      data_bar_most_sales.labels.push(item.name_product)
      data_bar_most_sales.datasets[0].data.push(item.total)
    });

    dataDh.totalCharged.forEach((item, i) => {
      data_line_by_year.labels.push(item.year)
      data_line_by_year.datasets[0].data.push(item.total)
    });


    setRedraw(true)
    setTimeout(function () {
      setRedraw(false)
    }, 1500);
  }

  useEffect(() => {
    return () => {
      data_donut_payments = {
        labels: [],
      	datasets: [{
      		data: [],
      		backgroundColor: [],
      		hoverBackgroundColor: []
      	}]
      }

      data_bar_total_debit = {
        labels: [],
        datasets: [
          {
            label: 'Pagos Pendientes',
            backgroundColor: 'rgb(15, 13, 74)',
            borderColor: 'rgb(27, 13, 74)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgb(15, 13, 74)',
            hoverBorderColor: 'rgb(27, 13, 74)',
            data: []
          }
        ]
      };

      data_bar_most_sales = {
        labels: [],
        datasets: [
          {
            label: 'Productos más vendidos',
            backgroundColor: '#0c0f5d',
            borderColor: '#0c0f5d',
            borderWidth: 1,
            hoverBackgroundColor: '#c50747',
            hoverBorderColor: '#0c0f5d',
            data: []
          }
        ]
      };

      data_line_by_year = {
        labels: [],
        datasets: [
          {
            label: 'Cantidad facturada por años',
            data: [],
            fill: false,
            backgroundColor: 'rgb(125, 81, 52)',
            borderColor: 'rgb(99, 56, 21)',
          },
        ],
      }

    } // fin returnn
  },[])

  const fetchData = () => {
    axios.get(API_URL+'dashboard_stadistics').then(result => {
      setDataDh(result.data)
      setLoading(false)
    }).catch(err => {
      props.tokenExpired(err)
    })
  }

  const routerFunction = route => {
    props.history.replace(route)
  }

  return (
    <React.Fragment>
      {loading ? (
        <Row className="justify-content-center" >
          <Col sm={4} lg={4} md={4} className="text-center">
            <Image src={require('../../assets/img/loading.gif')} />
            <p className="title_principal">Cargando...</p>
          </Col>
        </Row>
      ) : (
        <Row className="animate__animated animate__fadeInUp">
          <Col sm={12} md={12} lg={12}>
            <Row>
              <Col>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" className="header_card">
                      <b>Accesos directos</b> ( hacer click para desplegar )
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Row>
                          <Col sm={3} md={3} lg={3}>
                            <Button variant="dark" block={true} size="sm" type="button" onClick={() => routerFunction('/quotitation/search_quotitation')}>Cotizaciones</Button>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <Button variant="dark" block={true} size="sm" type="button" onClick={() => routerFunction('/invoice/invoice_search')}>Facturaciones</Button>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <Button variant="dark" block={true} size="sm" type="button" onClick={() => routerFunction('/sale_note/sale_note_search')}>Notas de Venta</Button>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <Button variant="dark" block={true} size="sm" type="button" onClick={() => routerFunction('/src/bill/bill_search')}>Boletas</Button>
                          </Col>
                        </Row>
                        <br/>
                        <Row>
                          <Col sm={3} md={3} lg={3}>
                            <Button variant="dark" block={true} size="sm" type="button" onClick={() => routerFunction('/guide/guide_search')}>Guias de Despacho</Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
            <br/>
            <Row className="animate__animated animate__fadeInLeft">
              <CardStatusComponent value={dataDh.cardStadistics.total_cotizacion} styleInline={"lnr lnr-book"} colorFont={"success"} title={"Cotizaciones"} />
              <CardStatusComponent value={dataDh.cardStadistics.total_invoice} styleInline={"lnr lnr-book"} colorFont={"warning"} title={"Facturacion"} />
              <CardStatusComponent value={dataDh.cardStadistics.total_sale_note} styleInline={"lnr lnr-book"} colorFont={"danger"} title={"Notas de Ventas"} />
              <CardStatusComponent value={dataDh.cardStadistics.total_bill} styleInline={"lnr lnr-book"} colorFont={"primary"} title={"Boletas"} />
              <CardStatusComponent value={dataDh.cardStadistics.total_guide} styleInline={"lnr lnr-book"} colorFont={"dark"} title={"Guias"} />
            </Row>
            <br/>
            <Row>
              <Col style={{height: "200px"}}>
                <Doughnut data={data_donut_payments} redraw={redraw} options={optionsBar} />
              </Col>
              <Col>
                <table className="table table-striped">
                  <thead>
                    <tr style={{backgroundColor: "#ca3428", color: "white"}}>
                      <th colSpan="2" className="text-center">Total pagado</th>
                    </tr>
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {dataDh.totalPayments.map((v,i) => (
                      <tr key={i}>
                        <td>{v.label}</td>
                        <td><Badge variant="danger" className="font-badge" style={{color: "white"}}>{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{formatNumber(v.total,2,',','.')}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="animate__animated animate__fadeInRight">
              <Col>
                <table className="table table-striped">
                  <thead>
                    <tr style={{backgroundColor: "#262463", color: "white"}}>
                      <th colSpan="2" className="text-center">Total Pendiente</th>
                    </tr>
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {dataDh.totalDebt.map((v,i) => (
                      <tr key={i}>
                        <td>{v.label}</td>
                        <td><Badge variant="danger" className="font-badge" style={{color: "white"}}>{props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{formatNumber(v.total,2,',','.')}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
              <Col style={{height : '260px'}}>
                <Bar data={data_bar_total_debit} options={optionsBar} redraw={redraw} />
              </Col>
            </Row>
            <Row>
              <Col style={{height : '260px'}}>
                <Bar data={data_bar_most_sales} options={optionsBar} redraw={redraw} />
              </Col>
              <Col>
                <table className="table table-striped">
                  <thead>
                    <tr style={{backgroundColor: "#07610b", color: "white"}}>
                      <th colSpan="2" className="text-center">Los 5 productos con menor stock</th>
                    </tr>
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {dataDh.minimunStock.map((v,i) => (
                      <tr key={i}>
                        <td>{v.name_product}</td>
                        <td><Badge variant="danger" className="font-badge" style={{color: "white"}}>{v.total}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="animate__animated animate__fadeInLeft">
              <Col style={{height: "200px"}}>
                <Line data={data_line_by_year} options={options_line} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}


EnterpriseDashboardComponent.propTypes = {
  id_branch_office : PropTypes.string.isRequired,
}
export default EnterpriseDashboardComponent
