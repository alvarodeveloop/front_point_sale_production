import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Image
} from 'react-bootstrap'
import InputField from 'components/input/InputComponent'
import { showPriceWithDecimals } from 'utils/functions'
import { FaChartLine } from "react-icons/fa";
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { ARRAY_COLORS } from 'utils/constants'
import "styles/components/stadisticsInvoice.scss";

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

let data_donut_ss_status = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
  }]
};

let data_donut_total_status = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
  }]
};

let data_donut_status_bonds = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
  }]
}

let data_bar_failure_tipology = {
  labels: [],
  datasets: [
    {
      label: 'Monto acumulado de pagos hechos por mes',
      backgroundColor: 'rgb(15, 13, 74)',
      borderColor: 'rgb(27, 13, 74)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(15, 13, 74)',
      hoverBorderColor: 'rgb(27, 13, 74)',
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

const StadisticsInvoiceComponent = (props) => {

  useEffect(() => {
    if (props.redraw) {

      data_donut_ss_status = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }]
      };

      data_donut_status_bonds = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }]
      }

      data_bar_failure_tipology = {
        labels: [],
        datasets: [
          {
            label: props.isGuide ? "Monto acumulado de guias facturadas por mes" : 'Monto acumulado de pagos hechos por mes',
            backgroundColor: 'rgb(15, 13, 74)',
            borderColor: 'rgb(27, 13, 74)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgb(15, 13, 74)',
            hoverBorderColor: 'rgb(27, 13, 74)',
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

      data_donut_total_status = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }]
      };

      handleDataDonutSsStatus()
    }
  }, [props.redraw])

  const onChange = e => {
    e.persist();
    props.setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        dataForm: {
          ...currentState.dataForm,
          [e.target.name]: e.target.value
        }
      });
    });
  }

  const handleDataDonutSsStatus = () => {
    props.statusCotization.statuses.forEach((v, i) => {
      data_donut_ss_status.labels.push(v.status)
      data_donut_ss_status.datasets[0].data.push(parseFloat(v.total))
      data_donut_ss_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_ss_status.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });
    if (!props.isGuide) {
      props.statusCotization.statusesBonds.forEach((v, i) => {
        data_donut_status_bonds.labels.push(v.status)
        data_donut_status_bonds.datasets[0].data.push(parseFloat(v.total))
        data_donut_status_bonds.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
        data_donut_status_bonds.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
      });
    }

    props.statusCotization.bondsByMonth.forEach((v, i) => {
      data_bar_failure_tipology.labels.push(v.mes)
      data_bar_failure_tipology.datasets[0].data.push(v.total)
    });

    props.statusCotization.invoiceByYear.forEach((item, i) => {
      data_line_by_year.labels.push(item.year)
      data_line_by_year.datasets[0].data.push(item.total)
    });

    props.statusCotization.totalByStatus.forEach((v, i) => {
      data_donut_total_status.labels.push(v.name)
      data_donut_total_status.datasets[0].data.push(parseFloat(v.total))
      data_donut_total_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_total_status.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });
  }

  const handleStadistics = () => {
    props.handleStadistics()
  }

  const handleDisplayFilter = filter => {
    props.handleDisplayFilter(filter)
  }

  return (
    <Row>
      <Col sm={12} md={12} lg={12} xs={12}>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
              <b>Estadísticas</b> <FaChartLine />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row className="justify-content-center">
                  {props.displayFilter == 1 ? (
                    <Col sm={6} md={6} lg={6}>
                      <Button variant="secondary" type="button" size="sm" block={true} onClick={() => handleDisplayFilter(2)}>Activar Filtros</Button>
                    </Col>
                  ) : props.displayFilter == 2 ? (
                    <React.Fragment>
                      <InputField
                        type='date'
                        label='Fecha desde'
                        name='date_desde'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-3 col-lg-3 col-sm-3 col-6'
                        value={props.dataForm.date_desde}
                        handleChange={onChange}
                      />
                      <InputField
                        type='date'
                        label='Fecha Hasta'
                        name='date_hasta'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-3 col-lg-3 col-sm-3 col-6'
                        value={props.dataForm.date_hasta}
                        handleChange={onChange}
                      />
                      <Col sm={3} md={3} lg={3} xs={6}>
                        <br />
                        <Button variant="danger" type="button" size="sm" block={true} onClick={handleStadistics}>Buscar</Button>
                      </Col>
                      <Col sm={3} md={3} lg={3} xs={6}>
                        <br />
                        <Button variant="secondary" type="button" size="sm" block={true} onClick={() => handleDisplayFilter(1)}>Ocultar Filtros</Button>
                      </Col>
                    </React.Fragment>

                  ) : (
                    <Col sm={12} md={12} lg={12} className="text-center">
                      <br />
                      <Image src={require('../assets/img/loading.gif')} width="30" />
                      <br />
                      Cargando datos...
                    </Col>
                  )}
                </Row>
                <br />
                <Row>
                  <Col sm={6} md={6} lg={6} className="donutChartHeight">
                    <Doughnut data={data_donut_ss_status} redraw={props.redraw} options={optionsBar} />
                  </Col>
                  <Col sm={6} md={6} lg={6} className="mb-2 mb-sm-0">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center" colSpan="2" style={{ backgroundColor: "rgb(147, 52, 12)", color: "white" }}>Monto acumulado por estados</th>
                        </tr>
                        <tr>
                          <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Estado</th>
                          <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {Object.keys(props.statusCotization).length > 0 ? (
                          <React.Fragment>
                            {props.statusCotization.statuses.map((v, i) => (
                              <tr key={i}>
                                <td>{v.status}</td>
                                <td>{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, v.total)}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">Sin registros...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                {!props.isGuide ? (

                  <Row>
                    <Col sm={6} md={6} lg={6} className="mb-2 mb-sm-0">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center" colSpan="2" style={{ backgroundColor: "rgb(21, 26, 88)", color: "white" }}>Monto pagado por estados</th>
                          </tr>
                          <tr>
                            <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Estado</th>
                            <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Total</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {Object.keys(props.statusCotization).length > 0 ? (
                            <React.Fragment>
                              {props.statusCotization.statusesBonds.map((v, i) => (
                                <tr key={i}>
                                  <td>{v.status}</td>
                                  <td>{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, v.total)}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">Sin registros...</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Col>
                    <Col sm={6} md={6} lg={6} className="donutChartHeight">
                      <Doughnut data={data_donut_status_bonds} redraw={props.redraw} options={optionsBar} />
                    </Col>
                  </Row>
                ) : ""}
                <Row>
                  <Col sm={12} md={12} lg={12} style={{ height: "200px" }}>
                    <Bar
                      data={data_bar_failure_tipology}
                      options={optionsBar}
                      redraw={props.redraw}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6} md={6} lg={6}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center" colSpan="2" style={{ backgroundColor: "rgb(147, 52, 12)", color: "white" }}>Total {props.dataForm.type == 1 ? "facturas" : props.dataForm.type == 2 ? "notas de ventas" : props.dataForm.type === 3 ? "boletas" : "guias"} realizadas</th>
                        </tr>
                        <tr>
                          <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Estado</th>
                          <th className="text-center" style={{ backgroundColor: "rgb(133, 124, 124)", color: "white" }}>Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {Object.keys(props.statusCotization).length > 0 ? (
                          <React.Fragment>
                            {props.statusCotization.totalByStatus.map((v, i) => (
                              <tr key={i}>
                                <td>{v.name}</td>
                                <td>{v.total}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">Sin registros...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Col>
                  <Col sm={6} md={6} lg={6} className="donutChartHeight text-center">
                    <Doughnut data={data_donut_total_status} redraw={props.redraw} options={optionsBar} />
                  </Col>
                </Row>
                <br /><br /><br />
                <Row>
                  <Col sm={12} md={12} lg={12} style={{ height: "200px" }}>
                    <Line data={data_line_by_year} options={options_line} />
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  )
}

StadisticsInvoiceComponent.propTypes = {
  setGlobalState: PropTypes.func.isRequired,
  dataForm: PropTypes.object.isRequired,
  redraw: PropTypes.bool.isRequired,
  statusCotization: PropTypes.object.isRequired,
  handleDisplayFilter: PropTypes.func.isRequired,
  handleStadistics: PropTypes.func.isRequired,
  displayFilter: PropTypes.any.isRequired,
  isGuide: PropTypes.bool,
}

export default StadisticsInvoiceComponent
