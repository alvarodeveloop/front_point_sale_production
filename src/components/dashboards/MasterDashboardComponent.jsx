import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {Row,Col,Badge,Container,Image,Accordion,Card} from 'react-bootstrap'
import Table from 'components/Table'
import axios from 'axios'
import { API_URL, ARRAY_COLORS } from 'utils/constants'
import { toast } from 'react-toastify'
import * as moment from 'moment-timezone'
import {FaUsers} from 'react-icons/fa'
import layoutHelpers from 'shared/layouts/helpers'
import {Doughnut, HorizontalBar,Line} from 'react-chartjs-2';

let columnsEnterpriseExpire = []
let lastUserConnectedsColumns = []
let enterpriseTestColumns = []
let enterpriseAboutToExpireColumns = []

let data_donut_status_enterprise = {
  labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
}

let dataBarHorizontal = {
  labels: [],
  datasets: [
    {
      label: 'Acumulado en facturas de planes este mes',
      backgroundColor: '#bb3a65',
      borderColor: '#8e1525',
      borderWidth: 1,
      hoverBackgroundColor: '#bb3a65',
      hoverBorderColor: '#8e1525',
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
      backgroundColor: '#e91e63',
      borderColor: '#a9093f',
    },
  ],
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
  maintainAspectRatio: false,
}

const MasterDashboardComponent = (props) => {

  const [dataDh,setDataDh] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [redraw, setRedraw] = useState(false)

  useEffect(() => {
    fetchData()
    layoutHelpers.toggleCollapsed()
    return () => {
      dataBarHorizontal = {
        labels: [],
        datasets: [
          {
            label: 'Acumulado en facturas de planes este mes',
            backgroundColor: '#bb3a65',
            borderColor: '#8e1525',
            borderWidth: 1,
            hoverBackgroundColor: '#bb3a65',
            hoverBorderColor: '#8e1525',
            data: []
          }
        ]
      };

      data_donut_status_enterprise = {
        labels: [],
      	datasets: [{
      		data: [],
      		backgroundColor: [],
      		hoverBackgroundColor: []
      	}]
      }

      data_line_by_year = {
        labels: [],
        datasets: [
          {
            label: 'Cantidad facturada por años',
            data: [],
            fill: false,
            backgroundColor: '#e91e63',
            borderColor: '#a9093f',
          },
        ],
      }

      layoutHelpers.toggleCollapsed()
    }
  },[])

  useEffect(() => {
      if(dataDh) handleStadistics()
  },[dataDh])

  useMemo(() => {
    columnsEnterpriseExpire = [
      {
        Header: "EMPRESAS EXPIRADAS",
        columns: [
          {
            Header : "Empresa",
            accessor : "bussines_name"
          },
          {
            Header : "Ultima fecha de Pago",
            accessor : "last_day_payment"
          },
          {
            Header : "Estado",
            accessor : props1 => ["cerrada"],
            Cell : props1 => {
              return (<Badge className="font-badge" variant="danger">Cerrada</Badge>)
            }
          },
        ]
      }
    ]

    lastUserConnectedsColumns = [
      {
        Header: "CONEXIONES MAS RECIENTES",
        columns: [
          {
            Header : "Usuario",
            accessor : "name"
          },
          {
            Header : "Rut",
            accessor : "rut",
            Cell : props1 => {
              const original = props1.cell.row.original
              return (<Badge variant="danger" className="font-badge">{original.rut}</Badge>)
            }
          },
          {
            Header : "Empresa",
            accessor : "name_enterprise"
          },
          {
            Header : "Fecha Conexion",
            accessor : "last_connection"
          },
        ]
      }
    ]

    enterpriseTestColumns = [
      {
        Header: "EMPRESAS EN DIAS DE PRUEBA",
        columns: [
          {
            Header : "Empresa",
            accessor : "bussines_name"
          },
          {
            Header : "Ultima fecha de pago",
            accessor : "last_day_payment",
          },
        ]
      }
    ]

    enterpriseAboutToExpireColumns = [
      {
        Header: "EMPRESAS EN PERIODOS DE VENCIMIENTO",
        columns: [
          {
            Header : "Empresa",
            accessor : "bussines_name"
          },
          {
            Header : "Ultima fecha de pago",
            accessor : "last_day_payment",
          },
        ]
      }
    ]
  },[])

  const fetchData = () => {
    axios.get(API_URL+'dashboard_stadistics_master').then(result => {
      setDataDh(result.data)
      setIsLoading(false)
    }).catch(err => {
      props.tokenExpired(err)
    })
  }

  const handleStadistics = () => {
    data_donut_status_enterprise.labels = []
    data_donut_status_enterprise.datasets[0].data = []
    data_donut_status_enterprise.datasets[0].backgroundColor = []
    data_donut_status_enterprise.datasets[0].hoverBackgroundColor = []

    dataBarHorizontal.labels = []
    dataBarHorizontal.datasets[0].data = []
    data_line_by_year.labels = []
    data_line_by_year.datasets[0].data = []

    dataDh.countEnterpriseStatus.forEach((v, i) => {
      data_donut_status_enterprise.labels.push(v.label)
      data_donut_status_enterprise.datasets[0].data.push(parseFloat(v.total))
      data_donut_status_enterprise.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_status_enterprise.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    dataDh.totalAmountInvoices.forEach((item, i) => {
      dataBarHorizontal.labels.push(item.label)
      dataBarHorizontal.datasets[0].data.push(item.total)
    });

    dataDh.totalAmountInvoicesByYear.forEach((item, i) => {
      data_line_by_year.labels.push(item.year)
      data_line_by_year.datasets[0].data.push(item.total)
    });

    setRedraw(true)
    setTimeout(function () {
      setRedraw(false)
    }, 1500);
  }

  return (
    <Container fluid={true}>
      {isLoading ? (
        <Row className="justify-content-center" >
          <Col sm={4} lg={4} md={4} className="text-center">
            <Image src={require('../../assets/img/loading.gif')} />
            <p className="title_principal">Cargando...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Row>
              <Col>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                      <b>Estadísticas</b> ( hacer click para desplegar )
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Row>
                          <Col style={{height: "200px"}}>
                            <Doughnut data={data_donut_status_enterprise} redraw={redraw} options={optionsBar} />
                          </Col>
                          <Col>
                            <table className="table table-striped">
                              <thead>
                                <tr style={{backgroundColor: "#bb3a65", color: "white"}}>
                                  <th colSpan="4" className="text-center">Conexiones más recientes</th>
                                </tr>
                                <tr>
                                  <th className="text-center">Nombre</th>
                                  <th className="text-center">Rut</th>
                                  <th className="text-center">Empresa</th>
                                  <th className="text-center">Fecha Conexión</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {dataDh.lastConnecteds.map((v,i) => (
                                  <tr key={i}>
                                    <td>{v.name}</td>
                                    <td>{v.rut}</td>
                                    <td>{v.name_enterprise}</td>
                                    <td>{v.last_connection}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{height: '200px'}}>
                            <HorizontalBar data={dataBarHorizontal} options={optionsBar} />
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{height: '200px'}}>
                            <Line data={data_line_by_year} options={options_line} />
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table headerColor={"#c78681"} headerFontColor={"white"} data={dataDh.enterpriseAboutToExpire} columns={enterpriseAboutToExpireColumns} />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6} xl={6}>
                <Table headerColor={"#c78681"} headerFontColor={"white"} data={dataDh.enterpriseTestPeriod} columns={enterpriseTestColumns} />
              </Col>
              <Col sm={12} md={6} lg={6} xl={6}>
                <Table headerColor={"#c78681"} headerFontColor={"white"} data={dataDh.enterpriseExpiredPayment} columns={columnsEnterpriseExpire} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default MasterDashboardComponent
