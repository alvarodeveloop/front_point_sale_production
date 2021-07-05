import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import ModalSolvedSale from 'components/modals/ModalSolvedSale'
import ModalDetailSale from 'components/modals/ModalDetailSale'
import 'styles/components/modalComponents.css'
import * as moment from 'moment-timezone'
import { showPriceWithDecimals } from 'utils/functions'
import { ARRAY_COLORS } from 'utils/constants'
import { connect } from 'react-redux'
import layoutHelpers from 'shared/layouts/helpers'
import LoadingComponent from 'components/LoadingComponent'
import { confirmAlert } from 'react-confirm-alert'; // Import

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

  const [sales, setSales] = useState([])
  const [isOpenSolvedSale, setIsOpenSolvedSale] = useState(false)
  const [saleDataOption, setSaleDataOption] = useState({})
  const [isOpenDetailSale, setIsOpenDetailSale] = useState(false)
  const [redraw, setRedraw] = useState(false)
  const [stadistics, setStadistics] = useState([])
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    if (!props.config || !props.configStore) {
      if (!props.config) {
        toast.error('Error, debe hacer su configuración general')
        setTimeout(function () {
          props.history.replace('/config/config_general')
        }, 2000);
      } else if (!props.configStore) {
        toast.error('Error, debe hacer su configuración de la tienda primero')
        setTimeout(function () {
          props.history.replace('/config/config_store')
        }, 2000);
      }
    }
    layoutHelpers.toggleCollapsed()
    return () => {
      layoutHelpers.toggleCollapsed()
      saleColumns = []
      resetChartData()
    }
  }, [])

  useEffect(() => {
    resetChartData()
    fetchData()
  }, [props.id_branch_office])

  useEffect(() => {
    handleDataDonutSsStatus()
    setTimeout(function () {
      setRedraw(false)
    }, 3000);
  }, [stadistics])

  useMemo(() => {
    saleColumns = [
      {
        Header: 'Referencia',
        accessor: 'ref',
      },
      {
        Header: 'Cliente',
        accessor: props1 => props1.client ? [props1.client.name_client + ' ' + props1.client.data_document] : [],

      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: props1 => {
          return showPriceWithDecimals(props1.config, props1.cell.row.original.total)
        }
      },
      {
        Header: 'Pago',
        accessor: 'payment',
        Cell: props1 => {
          return showPriceWithDecimals(props1.config, props1.cell.row.original.payment)
        }
      },
      {
        Header: 'Status',
        accessor: props1 => [props1.status === 2 ? 'En Espera' : 'Pagado'],
        Cell: props1 => {
          const { original } = props1.cell.row
          if (original.status === 2) {
            return (<Badge variant="info" className="font-badge">En espera</Badge>)
          } else if (original.status === 1) {
            return (<Badge variant="success" className="font-badge">Pagado</Badge>)
          } else if (original.status === 3) {
            return (<Badge variant="danger" className="font-badge">Anulada</Badge>)
          }
        }
      },
      {
        Header: 'Fecha',
        accessor: props1 => [moment(props1.createdAt).format('DD-MM-YYYY')],
      },
      {
        Header: 'Acciones',
        Cell: props1 => {
          return (
            <DropdownButton size="sm" id={'drop' + props1.cell.row.original.id} title="Seleccione" drop="left" block="true">
              {props1.cell.row.original.status === 2 ? (
                <React.Fragment>
                  <Dropdown.Item onClick={() => solvedSale(props1.cell.row.original)}>Pagar Pedido</Dropdown.Item>
                  <Dropdown.Item onClick={() => seeDetails(props1.cell.row.original)}>Ver Detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => anulateSale(props1.cell.row.original)}>Anular Venta</Dropdown.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Dropdown.Item onClick={() => printInvoice(props1.cell.row.original)}>Imprimir Factura</Dropdown.Item>
                  <Dropdown.Item onClick={() => seeDetails(props1.cell.row.original)}>Ver Detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => anulateSale(props1.cell.row.original)}>Anular Venta</Dropdown.Item>
                </React.Fragment>
              )}

            </DropdownButton>
          )
        }
      }
    ]
  })

  const anulateSale = (sale) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente anular esta venta?</p>
            <button className="button-alert"
              onClick={() => {
                confirmAnulateSale(sale.id);
                onClose();
              }}
            >
              Si, Aceptar
            </button>
            <button className="button-alert" onClick={onClose}>No</button>
          </div>
        );
      }
    });
  }

  const confirmAnulateSale = async (id) => {
    try {
      setDisplayLoading(true);
      await axios.delete(API_URL + "sale/" + id)
      toast.success("Venta anulada con éxito");
      fetchData();
    } catch (error) {
      setDisplayLoading(false);
      console.log(error);
      props.tokenExpired(error);
    }
  }

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
    let params = "/" + datos.ref;
    setDisplayLoading(true)
    axios.get(API_URL + "sale_print_invoice_history/" + datos.ref).then(result => {
      if (datos.voucher) {

        axios.get(API_URL + 'invoice_print/' + result.data.id + "/2/2").then(result => {
          window.open(API_URL + 'documents/sale_note/files_pdf/' + result.data.name)
          setDisplayLoading(false)
        }).catch(err => {
          setDisplayLoading(false)
          props.tokenExpired(err)
        })

      } else {
        setDisplayLoading(false)
        window.open(result.data.pdf_public_url_bill, "_blank")
      }
    }).catch(error => {
      setDisplayLoading(false)
      props.tokenExpired(error)
    })
  }

  const solvedSale = data => {
    setSaleDataOption(data)
    setIsOpenSolvedSale(true)
  }

  const seeDetails = data => {
    setSaleDataOption(data)
    setIsOpenDetailSale(true)
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL + 'sale'),
      axios.get(API_URL + 'sale_stadistics')
    ]
    Promise.all(promise).then(result => {
      setSales(result[0].data)
      setStadistics(result[1].data.sale)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleOnhideSaleFiao = (isPost = false) => {
    setIsOpenSolvedSale(false)
    if (isPost) {
      resetChartData()
      fetchData()
    }
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
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Tabla de Ventas</h4>
            </Col>
            <Col sm={6} md={6} lg={6} className="text-center">
              <h4 className="title_principal">Total ventas <Badge variant="danger" className="font-badge">{sales.length}</Badge></h4>
            </Col>
          </Row>
          <hr />
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
              onHide={() => setIsOpenDetailSale(false)}
              config={props.config}
              configStore={props.configStore}
              dataSale={saleDataOption}
            />
          ) : ''}

        </Container>
      )}
    </>
  )
}

HistorySalePage.propTypes = {
  config: PropTypes.object,
  configStore: PropTypes.object,
}

function mapDispatchToProps(state) {
  return {
    config: state.configs.config,
    configStore: state.configs.configStore,
    id_branch_office: state.enterpriseSucursal.id_branch_office
  }
}

export default connect(mapDispatchToProps, {})(HistorySalePage)
