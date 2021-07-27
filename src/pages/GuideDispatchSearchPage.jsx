import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Button, Badge } from "react-bootstrap";
import Table from "components/Table";
import axios from "axios";
import { API_URL } from "utils/constants";
import { toast } from "react-toastify";
import { showPriceWithDecimals } from "utils/functions";
import { FaPlusCircle, FaFileExcel } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import layoutHelpers from "shared/layouts/helpers";
import * as moment from "moment-timezone";
import "styles/components/modalComponents.scss";
import { connect } from "react-redux";
import ModalInvoiceActions from "components/modals/ModalInvoiceActions";
import { confirmAlert } from "react-confirm-alert"; // Import
import StadisticsInvoiceComponent from "components/StadisticsInvoiceComponent";
import LoadingComponent from "components/LoadingComponent";
import ModalDetailsInvoice from "components/modals/ModalDetailsInvoice";
import ModalExportDataInvoice from "components/modals/ModalExportDataInvoice";

let cotizacionColumns = null;

const GuideDispatchSearchPage = (props) => {
  const [globalState, setGlobalState] = useState({
    invoiceData: [],
    cotizationDetail: {},
    isOpenModalDetail: false,
    redraw: false,
    statusCotization: {},
    displayFilter: 1,
    displayLoading: true,
    dataForm: {
      date_desde: "",
      date_hasta: "",
      type: 1,
    },
    invoiceAction: "",
    isOpenModalAction: "",
    isOpenModalExcel: "",
  });

  useMemo(() => {
    cotizacionColumns = [
      {
        Header: "Referencia",
        accessor: "ref",
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <OverlayTrigger
              placement={"bottom"}
              overlay={
                <Tooltip id="tooltip-disabled2">
                  Hacer click para acceder a las acciones de la guía
                </Tooltip>
              }
            >
              <Button
                variant="link"
                block={true}
                type="button"
                size="sm"
                onClick={() => onHideModalAction(original)}
              >
                {original.ref}
              </Button>
            </OverlayTrigger>
          );
        },
      },
      {
        Header: "Ref Cotización",
        accessor: "ref_cotizacion",
      },
      {
        Header: "Rut Cliente",
        accessor: "rut_client",
      },
      {
        Header: "Razón Social",
        accessor: "business_name_client",
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <OverlayTrigger
              placement={"right"}
              overlay={
                <Tooltip id="tooltip-disabled2">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <b>Contacto</b>{" "}
                      {original.name_contact
                        ? original.name_contact
                        : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Ciudad</b>{" "}
                      {original.city_client ? original.city_client : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Comuna</b>{" "}
                      {original.comuna_client
                        ? original.comuna_client
                        : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Comuna</b>{" "}
                      {original.address_client
                        ? original.address_client
                        : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Comentario: </b> {original.comment}
                    </li>
                  </ul>
                </Tooltip>
              }
            >
              <Button variant="link" size="sm" block={true} type="button">
                {original.business_name_client}
              </Button>
            </OverlayTrigger>
          );
        },
      },
      {
        Header: "Fecha-Emisión",
        accessor: "date_issue_format",
      },
      {
        Header: "Status",
        accessor: (props1) => {
          if (props1.status == 1) {
            return (
              <Badge variant="secondary" className="font-badge">
                Pendiente
              </Badge>
            );
          } else if (props1.status == 2) {
            return (
              <Badge variant="secondary" className="font-badge">
                Vencida
              </Badge>
            );
          } else if (props1.status == 3) {
            return (
              <Badge variant="secondary" className="font-badge">
                Pagada
              </Badge>
            );
          } else {
            return (
              <Badge variant="secondary" className="font-badge">
                Anulada
              </Badge>
            );
          }
        },
      },
      {
        Header: "Total Productos",
        accessor: "total_product",
        Cell: (props1) => {
          const original = props1.cell.row.original;
          return (
            <OverlayTrigger
              placement={"left"}
              overlay={
                <Tooltip id={"tooltip-total_pagar" + original.id}>
                  <ul className="list-group">
                    {original.products.map((v, i) => (
                      <li className="list-group-item" key={i}>
                        <b>Producto</b>: {v.name_product}
                        <br />
                        <b>Precio</b> :{" "}
                        {props.configGeneral
                          ? props.configGeneral.simbolo_moneda
                          : ""}{" "}
                        {showPriceWithDecimals(
                          props.configGeneral,
                          original.total_with_iva ? v.price : v.total
                        )}
                        <br />
                        <b>Cantidad</b>: {v.quantity}
                      </li>
                    ))}
                  </ul>
                </Tooltip>
              }
            >
              <Badge
                variant="info"
                className="font-badge"
                style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}
              >
                {props.configGeneral.simbolo_moneda +
                  showPriceWithDecimals(
                    props.configGeneral,
                    original.total_product
                  )}
              </Badge>
            </OverlayTrigger>
          );
        },
      },
      {
        Header: "Total gastos",
        accessor: "total_gastos",
        Cell: (props1) => {
          return (
            <Badge
              variant="info"
              className="font-badge"
              style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}
            >
              {props.configGeneral.simbolo_moneda}
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.total_gastos
              )}
            </Badge>
          );
        },
      },
      {
        Header: "Total Iva",
        accessor: "total_iva",
        Cell: (props1) => {
          return (
            <Badge
              variant="info"
              className="font-badge"
              style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}
            >
              {props.configGeneral.simbolo_moneda}
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.total_iva
              )}
            </Badge>
          );
        },
      },
      {
        Header: "Total Balance",
        accessor: "total_balance",
        Cell: (props1) => {
          return (
            <Badge
              variant="info"
              className="font-badge"
              style={{ backgroundColor: "rgb(198, 196, 54)", color: "white" }}
            >
              {props.configGeneral.simbolo_moneda}
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.total_balance
              )}
            </Badge>
          );
        },
      },
      {
        Header: "Abonado",
        accessor: "total_bond",
        Cell: (props1) => {
          return (
            <Badge variant="danger" className="font-badge">
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.total_bond
              )}
            </Badge>
          );
        },
      },
      {
        Header: "Saldo Deudor",
        accessor: "debit_balance",
        Cell: (props1) => {
          return (
            <Badge variant="danger" className="font-badge">
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.debit_balance
              )}
            </Badge>
          );
        },
      },
      {
        Header: "Productos Pagados",
        Cell: (props1) => {
          const original = props1.cell.row.original;
          if (original.is_products_paid) {
            return (
              <Badge variant="success" className="font-badge">
                {original.total_quantity_products_paid}/
                {original.total_quantity_products}
              </Badge>
            );
          } else {
            return (
              <Badge variant="danger" className="font-badge">
                {original.total_quantity_products_paid}/
                {original.total_quantity_products}
              </Badge>
            );
          }
        },
      },
      {
        Header: "Acciones",
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <Button
              variant="primary"
              block={true}
              type="button"
              size="sm"
              onClick={() => onHideModalAction(original)}
            >
              Acciones
            </Button>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    layoutHelpers.toggleCollapsed();
    return () => {
      cotizacionColumns = null;
      layoutHelpers.toggleCollapsed();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.id_branch_office]);

  useEffect(() => {
    if (globalState.redraw) {
      handleDataDonutSsStatus();
    }
  }, [globalState.redraw]);

  const onHideModalAction = (originalCoti = false) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        invoiceAction:
          !currentState.isOpenModalAction && originalCoti
            ? originalCoti
            : currentState.invoiceAction,
        isOpenModalAction: !currentState.isOpenModalAction,
      });
    });
  };

  const handleDataDonutSsStatus = () => {
    setGlobalState({ ...globalState, redraw: false });
  };

  const handleStadistics = () => {
    let objectPost = Object.assign({}, globalState.dataForm);
    setGlobalState({ ...globalState, displayFilter: 3 });

    axios
      .post(API_URL + "guide_stadistics", objectPost)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            statusCotization: {
              ...currentState.statusCotization,
              statusesBonds: result.data.statusesBonds,
              statuses: result.data.statuses,
              bondsByMonth: result.data.bondsByMonth,
              invoiceByYear: result.data.invoiceByYear,
              totalByStatus: result.data.totalByStatus,
            },
            redraw: true,
            displayFilter: 1,
          });
        });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayFilter: 1 });
        props.tokenExpired(err);
      });
  };

  const handleDisplayFilter = (filter) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        displayFilter: filter,
        dataForm:
          filter === 3
            ? { ...currentState.dataForm, date_desde: "", date_hasta: "" }
            : currentState.dataForm,
      });
    });
  };

  const fetchData = () => {
    let objectPost = Object.assign({}, globalState.dataForm);
    let promises = [
      axios.get(API_URL + "guide"),
      axios.post(API_URL + "invoice_stadistics", objectPost),
    ];
    Promise.all(promises)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            statusCotization: {
              ...currentState.statusCotization,
              statusesBonds: result[1].data.statusesBonds,
              statuses: result[1].data.statuses,
              bondsByMonth: result[1].data.bondsByMonth,
              invoiceByYear: result[1].data.invoiceByYear,
              totalByStatus: result[1].data.totalByStatus,
            },
            invoiceData: result[0].data,
            redraw: true,
            displayLoading: false,
          });
        });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const goToInvoice = (id) => {
    props.history.replace("/guide/guide_invoice/" + id);
  };

  const printInvoice = (original) => {
    toast.info("Cargando documento, espere por favor");
    window.open(original.name_pdf, "_blank");
  };

  const handleModalDetail = () => {
    setGlobalState({
      ...globalState,
      isOpenModalDetail: !globalState.isOpenModalDetail,
    });
  };

  const seeDetailCotization = (data) => {
    setGlobalState({
      ...globalState,
      isOpenModalDetail: !globalState.isOpenModalDetail,
      cotizationDetail: data,
    });
  };

  const anulateInvoice = (datos) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-edit">
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente anular este registro?</p>
            <button
              className="button-alert"
              onClick={() => {
                confirmAnulateInvoice(datos.id);
                onClose();
              }}
            >
              Si, Aceptar
            </button>
            <button className="button-alert" onClick={onClose}>
              No
            </button>
          </div>
        );
      },
    });
  };

  const confirmAnulateInvoice = (id) => {
    toast.info(
      "Anulando factura, esto podría tardar unos segundos... espere por favor"
    );
    setGlobalState({ ...globalState, displayLoading: true });
    axios
      .put(API_URL + "guide_status/" + id)
      .then((result) => {
        toast.success("Guía anulada con éxito");
        setGlobalState({
          ...globalState,
          invoiceAction: { ...globalState.invoiceAction, status: 4 },
        });
        fetchData();
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const goToForm = () => {
    props.history.replace("/guide/guide_create");
  };

  const openModalExcelHandler = () => {
    setGlobalState({
      ...globalState,
      isOpenModalExcel: !globalState.isOpenModalExcel,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6} className="text-center d-none d-md-block">
          <h4 className="title_principal">Tabla de Guías</h4>
        </Col>
        <Col sm={12} md={6} lg={6} className="text-center title_principal">
          <h4>Total Guías Realizadas <Badge variant="danger" className="font-badge d-inline-block d-md-none">{globalState.invoiceData.length}</Badge></h4>
        </Col>
      </Row>
      <Row>
        <Col sm={6} md={3} lg={3} xs={6} className="text-center">
          <Button block={true} variant="success" onClick={goToForm} size="sm">
            Nueva Guía <FaPlusCircle />
          </Button>
        </Col>
        <Col sm={6} md={3} lg={3} xs={6} className="text-center">
          <Button
            block={true}
            variant="success"
            onClick={openModalExcelHandler}
            size="sm"
          >
            Exportar data <FaFileExcel />
          </Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center d-none d-md-block">
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
              <Table
                columns={cotizacionColumns}
                data={globalState.invoiceData}
              />
            </Col>
          </Row>
        </>
      )}
      <ModalDetailsInvoice
        isOpenModalDetail={globalState.isOpenModalDetail}
        handleModalDetail={handleModalDetail}
        cotizationDetail={globalState.cotizationDetail}
        configGeneral={props.configGeneral}
        isGuide={true}
      />
      <ModalInvoiceActions
        isShow={globalState.isOpenModalAction}
        onHide={onHideModalAction}
        cotization={globalState.invoiceAction}
        printInvoice={printInvoice}
        goToInvoice={goToInvoice}
        anulateInvoice={anulateInvoice}
        seeDetailCotization={seeDetailCotization}
        isGuide={true}
      />
      <ModalExportDataInvoice
        isOpen={globalState.isOpenModalExcel}
        type="guide"
        handleOnHide={openModalExcelHandler}
        catchErrorHandler={props.tokenExpired}
        configGeneral={props.configGeneral}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
    configStore: state.configs.configStore,
  };
}

GuideDispatchSearchPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
  configStore: PropTypes.object,
};

export default connect(mapStateToProps, {})(GuideDispatchSearchPage);
