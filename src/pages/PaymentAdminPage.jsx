import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { API_URL, ARRAY_COLORS } from 'utils/constants';
import axios from 'axios';
import { Container, Row, Col, Button, Badge, Form, Modal } from 'react-bootstrap';
import Table from 'components/Table';
import { formatNumber } from "utils/functions"
import LoadingComponent from 'components/LoadingComponent'
import layoutHelpers from 'shared/layouts/helpers'
import InputField from 'components/input/InputComponent'
import { FaSearch, FaChartArea } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2"
import 'styles/components/modalComponents.scss'

let paymentColumns = [];

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

let dataDonut = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
  }]
}

let dataBar = {
  labels: [],
  datasets: [
    {
      label: 'Monto acumulado por estados de las facturas',
      backgroundColor: 'rgb(15, 13, 74)',
      borderColor: 'rgb(27, 13, 74)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(15, 13, 74)',
      hoverBorderColor: 'rgb(27, 13, 74)',
      data: []
    }
  ]
};

function PaymentAdminPage(props) {
  const [objectState, setObjectStates] = useState({
    payments: [],
    isLoading: true,
    filter: {
      dateIni: "",
      dateEnd: ""
    },
    isOpenModal: false,
    counts: [],
    amounts: [],
    redraw: false
  })

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    fetchData();
    return () => {
      layoutHelpers.toggleCollapsed()
    }
  }, [])

  useEffect(() => {
    if (objectState.counts.length) stadisticsHandler()
  }, [objectState.counts])

  paymentColumns = useMemo(() => {
    return [
      {
        Header: "Empresa",
        accessor: props1 => [props1.enterprise.bussines_name]
      },
      {
        Header: "Plan",
        accessor: props1 => [props1.plan.name]
      },
      {
        Header: "Monto",
        accessor: "amount",
        Cell: props1 => <Badge variant="danger" className="font-badge">{formatNumber(props1.cell.row.original.amount, 2, ",", ".")}</Badge>
      },
      {
        Header: "Estado",
        accessor: props1 => props1.status === 1 ? ["Pendiente"] : ["Pagada"]
      },
      {
        Header: "Nº Factura",
        accessor: "identifier"
      },
      {
        Header: "Token Flow",
        accessor: "tokenFlow"
      },
      {
        Header: "Orden Flow",
        accessor: "flowOrdenFlow",
      }
    ]
  }, [])

  const fetchData = () => {
    axios.post(API_URL + "payment_invoices", {}).then(result => {
      setObjectStates(currentData => {
        return Object.assign({}, currentData, {
          payments: result.data.invoices, counts: result.data.counts, amounts: result.data.amounts, isLoading: false
        })
      })
    }).catch(err => {
      setObjectStates({ ...objectState, isLoading: false })
      props.tokenExpired(err)
    })
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    let objectPost = Object.assign({}, objectState.filter);
    setObjectStates({ ...objectState, isLoading: true })
    axios.post(API_URL + "payment_invoices", objectPost).then(result => {
      setObjectStates({ ...objectState, isLoading: false, payments: result.data })
    }).catch(err => {
      setObjectStates({ ...objectState, isLoading: false })
      props.tokenExpired(err)
    })
  }

  const onChangeHandler = e => {
    e.persist()
    setObjectStates(currentData => {
      return Object.assign({}, currentData, {
        filter: Object.assign({}, currentData.filter, {
          [e.target.name]: e.target.value
        })
      })
    })
  }

  const displayModalHandler = () => {
    setObjectStates({ ...objectState, isOpenModal: !objectState.isOpenModal })
  }

  const stadisticsHandler = () => {
    dataDonut.labels = []
    dataDonut.datasets[0].data = []
    dataDonut.datasets[0].backgroundColor = []
    dataDonut.datasets[0].hoverBackgroundColor = []
    dataBar.labels = [];
    dataBar.datasets[0].data = [];

    objectState.counts.forEach((v, i) => {
      dataDonut.labels.push(v.label)
      dataDonut.datasets[0].data.push(parseFloat(v.total))
      dataDonut.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      dataDonut.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    objectState.amounts.forEach((v, i) => {
      dataBar.labels.push(v.label)
      dataBar.datasets[0].data.push(v.total)
    });

    setObjectStates(currentState => Object.assign({}, currentState, { redraw: true }))
    setTimeout(function () {
      setObjectStates(currentState => Object.assign({}, currentState, { redraw: false }))
    }, 1500);
  }

  return (
    <Container fluid>
      {objectState.isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Row>
            <Col>
              <h4 className="title_principal">Facturas de Aidy</h4>
            </Col>
            <Col>
              <h4 className="title_principal text-right">Total Factutas <Badge variant="danger" className="font-badge">{objectState.payments.length}</Badge></h4>
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <Button variant="danger" size="sm" type="button" onClick={displayModalHandler}>Estadísticas <FaChartArea /></Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Form onSubmit={onSubmitHandler}>
                <Row>
                  <InputField
                    type="date"
                    name="dateIni"
                    required={false}
                    label="Desde"
                    cols="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4"
                    messageErrors={[]}
                    handleChange={onChangeHandler}
                    value={objectState.filter.dateIni}
                  />
                  <InputField
                    type="date"
                    name="dateEnd"
                    required={false}
                    label="Hasta"
                    cols="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4"
                    messageErrors={[]}
                    handleChange={onChangeHandler}
                    value={objectState.filter.dateEnd}
                  />
                  <Col>
                    <br />
                    <Button variant="secondary" size="sm" block={true} type="submit">Buscar <FaSearch /></Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table data={objectState.payments} columns={paymentColumns} />
            </Col>
          </Row>
        </>
      )}
      <Modal
        show={objectState.isOpenModal}
        onHide={displayModalHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Estadísticas de las Facturas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{ height: "200px", borderRight: "1px solid lightgray" }}>
              <h5>Total de facturas categorizado por estados</h5>
              <Doughnut data={dataDonut} redraw={objectState.redraw} options={optionsBar} />
            </Col>
            <Col>
              <Bar
                data={dataBar}
                options={optionsBar}
                redraw={objectState.redraw}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="button" onClick={displayModalHandler}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

PaymentAdminPage.propTypes = {

}

export default PaymentAdminPage

