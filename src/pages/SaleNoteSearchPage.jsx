import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
} from 'react-bootstrap';
import Table from 'components/Table';
import axios from 'axios';
import { API_URL } from 'utils/constants';
import { toast } from 'react-toastify';
import { showPriceWithDecimals } from 'utils/functions';
import { FaPlusCircle } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import layoutHelpers from 'shared/layouts/helpers';
import 'styles/components/modalComponents.scss';
import { connect } from 'react-redux';
import ModalInvoiceActions from 'components/modals/ModalInvoiceActions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import StadisticsInvoiceComponent from 'components/StadisticsInvoiceComponent';
import LoadingComponent from 'components/LoadingComponent';
import ModalDetailsInvoice from 'components/modals/ModalDetailsInvoice';
import { FaFileExcel } from 'react-icons/fa';
import ModalExportDataInvoice from 'components/modals/ModalExportDataInvoice';

let cotizacionColumns = null

const SaleNoteSearchPage = props => {

  const [globalState, setGlobalState] = useState({
    displayLoading: true,
    invoiceData: [],
    saleNoteDetail: {},
    isOpenModalDetail: false,
    isOpenModalExcel: false,
    redraw: false,
    statusCotization: {},
    displayFilter: 1,
    dataForm: {
      date_desde: "",
      date_hasta: "",
      type: 2
    },
    invoiceAction: {},
    isOpenModalAction: false
  });

  useMemo(() => {
    cotizacionColumns = [
      {
        Header: 'Referencia',
        accessor: 'ref',
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para acceder a las acciones de la Nota</Tooltip>}>
              <Button variant="link" block={true} type="button" size="sm" onClick={() => onHideModalAction(original)}>{original.ref}</Button>
            </OverlayTrigger>
          )
        }
      },
      {
        Header: 'Referencia-Cotización',
        accessor: 'ref_cotizacion',
      },
      {
        Header: 'Referencia-Venta',
        accessor: 'ref_sale',
      },
      {
        Header: 'Rut Cliente',
        accessor: 'rut_client',
      },
      {
        Header: 'Razón Social',
        accessor: 'business_name_client',
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <OverlayTrigger placement={'right'} overlay={
              <Tooltip id="tooltip-disabled2">
                <ul className="list-group">
                  <li className="list-group-item"><b>Vendedor: </b> {original.name_seller}</li>
                  <li className="list-group-item"><b>Fono del Vendedor: </b> {original.phone_seller ? original.phone_seller : 'No posee'}</li>
                  <li className="list-group-item"><b>Contacto</b> {original.name_contact ? original.name_contact : 'No posee'}</li>
                  <li className="list-group-item"><b>Fono del Contacto: </b> {original.phone_contact}</li>
                  <li className="list-group-item"><b>Comentario: </b> {original.comment}</li>
                </ul>
              </Tooltip>}>
              <Button variant="link" size="sm" block={true} type="button">{original.business_name_client}</Button>
            </OverlayTrigger>
          )
        }
      },
      {
        Header: 'Tipo',
        accessor: props1 => props1.type_invoicing == 1 ? ['Afecta'] : ['Excento'],
      },
      {
        Header: 'Fecha-Emisión',
        accessor: "date_issue_format",
      },
      {
        Header: 'Días de Vencimiento',
        accessor: 'days_expiration_format'
      },
      {
        Header: 'Status',
        accessor: props1 => {
          if (props1.status == 1) {
            return (<Badge variant="secondary" className="font-badge">Pendiente</Badge>)
          } else if (props1.status == 2) {
            return (<Badge variant="secondary" className="font-badge">Pagada</Badge>)
          } else if (props1.status == 3) {
            return (<Badge variant="secondary" className="font-badge">Vencida</Badge>)
          } else {
            return (<Badge variant="secondary" className="font-badge">Anulada</Badge>)
          }
        },
      },
      {
        Header: 'Total Productos',
        accessor: 'total_product',
        Cell: props1 => {
          const original = props1.cell.row.original;
          return (
            <OverlayTrigger placement={'left'} overlay={
              <Tooltip id={"tooltip-total_pagar" + original.id}>
                <ul className="list-group">
                  {original.products.map((v, i) => (
                    <li className="list-group-item" key={i}>
                      <b>Producto</b>: {v.name_product}<br />
                      <b>Precio</b> : {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, original.total_with_iva ? v.price : v.total)}<br />
                      <b>Cantidad</b>: {v.quantity}</li>
                  ))}
                </ul>
              </Tooltip>}>
              <Badge variant="info" className="font-badge" style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}>
                {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, original.total_product)}
              </Badge>
            </OverlayTrigger>
          )
        }
      },
      {
        Header: 'Total gastos',
        accessor: 'total_gastos',
        Cell: props1 => {
          return (
            <Badge variant="info" className="font-badge" style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}>
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, props1.cell.row.original.total_gastos)}
            </Badge>
          )
        }
      },
      {
        Header: 'Total Iva',
        accessor: 'total_iva',
        Cell: props1 => {
          return (
            <Badge variant="info" className="font-badge" style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}>
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, props1.cell.row.original.total_iva)}
            </Badge>
          )
        }
      },
      {
        Header: 'Descuento o Recargo Global',
        accessor: 'discount_global_total',
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <OverlayTrigger placement={'left'} overlay={
              <Tooltip id={"tooltip-total_pagar" + original.id}>
                {original.ref_sale ? (
                  <React.Fragment>
                    Monto: {original.type_discount_global ? original.discount_global + "%" : showPriceWithDecimals(props.configGeneral, original.discount_global_amount)}
                    <br />
                    {original.discount_global_amount > 0 ? (
                      <React.Fragment>
                        <b>Tipo:</b> {original.type_discount_global ? "Porcentaje" : "Fijo"} - {original.discount_or_recharge_discount_global ? "Descuento" : "Recarga"}
                      </React.Fragment>
                    ) : ''}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {original.discount_global}%
                  </React.Fragment>
                )}
              </Tooltip>}>
              <Badge variant="info" className="font-badge" style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}>
                {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, original.discount_global_amount)}
              </Badge>
            </OverlayTrigger>
          )
        }
      },
      {
        Header: 'Total Balance',
        accessor: 'total_balance',
        Cell: props1 => {
          return (
            <Badge variant="info" className="font-badge" style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}>
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, props1.cell.row.original.total_balance)}
            </Badge>
          )
        }
      },
      {
        Header: 'Abonado',
        accessor: 'total_bond',
        Cell: props1 => {
          return (
            <Badge variant="danger" className="font-badge">
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, props1.cell.row.original.total_bond)}
            </Badge>

          )
        }
      },
      {
        Header: 'Saldo Deudor',
        accessor: 'debit_balance',
        Cell: props1 => {
          return (
            <Badge variant="danger" className="font-badge">
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral, props1.cell.row.original.debit_balance)}
            </Badge>

          )
        }
      },
      {
        Header: 'Acciones',
        Cell: props1 => {
          let original = Object.assign({}, props1.cell.row.original)
          return (
            <Button variant="primary" block={true} type="button" size="sm" onClick={() => onHideModalAction(original)}>Acciones</Button>
          )
        }
      }
    ]
  }, [])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () => {
      cotizacionColumns = null
      layoutHelpers.toggleCollapsed()
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [props.id_branch_office])

  useEffect(() => {
    if (globalState.redraw) {
      handleDataDonutSsStatus()
    }
  }, [globalState.redraw])

  const onHideModalAction = (originalCoti = false) => {

    setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        isOpenModalAction: !currentState.isOpenModalAction,
        invoiceAction: !currentState.isOpenModalAction && originalCoti ? originalCoti : currentState.invoiceAction
      });
    });

  }

  const handleDataDonutSsStatus = () => {
    setTimeout(function () {
      setGlobalState(currentState => {
        return Object.assign({}, currentState, {
          redraw: false
        });
      });
    }, 2000);
  }

  const handleStadistics = () => {
    let objectPost = Object.assign({}, globalState.dataForm)
    setGlobalState({ ...globalState, displayFilter: 3 });

    axios.post(API_URL + 'invoice_stadistics', objectPost).then(result => {
      setGlobalState(currentState => {
        return Object.assign({}, currentState, {
          redraw: true,
          statusCotization: {
            ...currentState.statusCotization,
            statusesBonds: result.data.statusesBonds,
            statuses: result.data.statuses,
            bondsByMonth: result.data.bondsByMonth,
            invoiceByYear: result.data.invoiceByYear,
            totalByStatus: result.data.totalByStatus,
          },
          displayFilter: 1
        });
      });
    }).catch(err => {
      setGlobalState({ ...globalState, displayFilter: 1 });
      props.tokenExpired(err);
    })
  }

  const handleDisplayFilter = filter => {
    setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        displayFilter: filter,
        dataForm: filter === 3 ? { date_desde: "", date_hasta: "" } : currentState.dataForm
      });
    });
  }

  const fetchData = () => {

    let objectPost = Object.assign({}, globalState.dataForm)
    let promises = [
      axios.get(API_URL + 'invoice/0/2'),
      axios.post(API_URL + 'invoice_stadistics', objectPost),
    ]
    Promise.all(promises).then(result => {
      setGlobalState(currentState => {
        return Object.assign({}, currentState, {
          invoiceData: result[0].data,
          statusCotization: {
            statusesBonds: result[1].data.statusesBonds,
            statuses: result[1].data.statuses,
            bondsByMonth: result[1].data.bondsByMonth,
            invoiceByYear: result[1].data.invoiceByYear,
            totalByStatus: result[1].data.totalByStatus
          },
          redraw: true,
          displayLoading: false
        });
      });
    }).catch(err => {
      setGlobalState({ ...globalState, displayLoading: false });
      props.tokenExpired(err);
    })
  }

  const goToForm = () => {
    props.history.push('/sale_note/sale_note_create')
  }

  const printInvoice = (original, type = 0) => {

    toast.info('Cargando documento, espere por favor')

    setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        displayLoading: true,
        isOpenModalAction: false
      });
    });

    axios.get(API_URL + 'invoice_print/' + original.id + "/" + type + "/2").then(result => {
      window.open(API_URL + 'documents/sale_note/files_pdf/' + result.data.name)
      setGlobalState(currentState => {
        return Object.assign({}, currentState, {
          displayLoading: false,
          isOpenModalAction: true
        });
      });
    }).catch(err => {
      setGlobalState({ ...globalState, displayLoading: false });
      props.tokenExpired(err)
    })
  }

  const handleModalDetail = () => {
    setGlobalState({ ...globalState, isOpenModalDetail: !globalState.isOpenModalDetail });
  }

  const seeDetailCotization = data => {
    setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        saleNoteDetail: data,
        isOpenModalDetail: !currentState.isOpenModalDetail
      });
    });
  }

  const goToBond = datos => {
    props.history.push('/sale_note/sale_note_bond/' + datos.id)
  }

  const anulateInvoice = datos => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente anular este registro?</p>
            {datos.bonds.length > 0 && (
              <button className="button-alert"
                onClick={() => {
                  confirmAnulateInvoice(datos.id, true);
                  onClose();
                }}
              >
                Borrar pagos y anular
              </button>
            )}
            <button className="button-alert"
              onClick={() => {
                confirmAnulateInvoice(datos.id, false);
                onClose();
              }}
            >
              Anular
            </button>
            <button className="button-alert" onClick={onClose}>No</button>
          </div>
        );
      }
    });
  }

  const confirmAnulateInvoice = (id, type) => {

    toast.info('Anulando nota, esto podría tardar algunos segundos... espere por favor')
    setGlobalState({ ...globalState, displayLoading: true });
    let objectUpdate = { type };

    axios.put(API_URL + 'invoice_status/' + id, objectUpdate).then(result => {
      toast.success('Nota de venta anulada con éxito')
      setGlobalState({ ...globalState, invoiceAction: { ...globalState.invoiceAction, status: 4 } });
      fetchData();
    }).catch(err => {
      setGlobalState({ ...globalState, displayLoading: false });
      props.tokenExpired(err)
    })
  }

  const invoiceBySaleNoteHandler = (saleNoteData) => {
    props.history.push("/invoice/create_invoice_by_sale_note/" + saleNoteData.id);
  }

  const openModalExcelHandler = () => {
    setGlobalState({ ...globalState, isOpenModalExcel: !globalState.isOpenModalExcel });
  }

  return (

    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Tabla de Notas de Ventas</h4>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center title_principal">
          <h4>Total Notas Realizadas</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={3} md={3} lg={3} className="text-center">
          <Button block={true} variant="success" onClick={goToForm} size="sm">Nueva Nota <FaPlusCircle /></Button>
        </Col>
        <Col sm={3} md={3} lg={3} className="text-center">
          <Button block={true} variant="success" onClick={openModalExcelHandler} size="sm">Exportar data <FaFileExcel /></Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center ">
          <Badge variant="danger">{globalState.invoiceData.length}</Badge>
        </Col>
      </Row>
      <hr />
      {globalState.displayLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <StadisticsInvoiceComponent
            setGlobalState={setGlobalState}
            dataForm={globalState.dataForm}
            redraw={globalState.redraw}
            statusCotization={globalState.statusCotization}
            handleDisplayFilter={handleDisplayFilter}
            handleStadistics={handleStadistics}
            displayFilter={globalState.displayFilter}
            configGeneral={props.configGeneral}
          />
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Table columns={cotizacionColumns} data={globalState.invoiceData} />
            </Col>
          </Row>
        </>
      )}
      <ModalDetailsInvoice
        isOpenModalDetail={globalState.isOpenModalDetail}
        handleModalDetail={handleModalDetail}
        cotizationDetail={globalState.saleNoteDetail}
        configGeneral={props.configGeneral}
      />
      <ModalInvoiceActions
        isShow={globalState.isOpenModalAction}
        onHide={onHideModalAction}
        cotization={globalState.invoiceAction}
        printInvoice={printInvoice}
        goToBond={goToBond}
        anulateInvoice={anulateInvoice}
        seeDetailCotization={seeDetailCotization}
        invoiceBySaleNote={invoiceBySaleNoteHandler}
      />
      <ModalExportDataInvoice
        isOpen={globalState.isOpenModalExcel}
        type="saleNote"
        handleOnHide={openModalExcelHandler}
        catchErrorHandler={props.tokenExpired}
        configGeneral={props.configGeneral}
      />
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
    configStore: state.configs.configStore
  }
}

SaleNoteSearchPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
  configStore: PropTypes.object,
}

export default connect(mapStateToProps, {})(SaleNoteSearchPage)
