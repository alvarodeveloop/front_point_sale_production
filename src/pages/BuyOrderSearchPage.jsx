import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  Accordion,
  Card,
  Modal,
  Image,
} from "react-bootstrap";
import InputField from "components/input/InputComponent";
import { confirmAlert } from "react-confirm-alert"; // Import
import Table from "components/Table";
import axios from "axios";
import { API_URL } from "utils/constants";
import { toast } from "react-toastify";
import { showPriceWithDecimals } from "utils/functions";
import { FaPlusCircle, FaChartLine, FaFileExcel } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import layoutHelpers from "shared/layouts/helpers";
import * as moment from "moment-timezone";
import { formatNumber } from "utils/functions";
import "styles/components/modalComponents.css";
import { connect } from "react-redux";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { ARRAY_COLORS } from "utils/constants";
import ModalActionsCotization from "components/modals/ModalActionsCotization";
import ModalExportDataInvoice from "components/modals/ModalExportDataInvoice";
import LoadingComponent from "components/LoadingComponent";

let optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  hover: {
    animationDuration: 0,
  },
  responsiveAnimationDuration: 0,
};

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
};

let data_donut_ss_status = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ],
};

let data_donut_total_status = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ],
};

let data_bar_failure_tipology = {
  labels: [],
  datasets: [
    {
      label: "Monto acumulado de documentos hechos por mes",
      backgroundColor: "rgb(15, 13, 74)",
      borderColor: "rgb(27, 13, 74)",
      borderWidth: 1,
      hoverBackgroundColor: "rgb(15, 13, 74)",
      hoverBorderColor: "rgb(27, 13, 74)",
      data: [],
    },
  ],
};

let data_line_by_year = {
  labels: [],
  datasets: [
    {
      label: "Cantidad facturada de documentos por años",
      data: [],
      fill: false,
      backgroundColor: "rgb(125, 81, 52)",
      borderColor: "rgb(99, 56, 21)",
    },
  ],
};

let cotizacionColumns = null;

const BuyOrderSearchPage = (props) => {
  const [globalState, setGlobalState] = useState({
    displayLoading: true,
    cotizacionData: [],
    cotizationDetail: {},
    isOpenModalDetail: false,
    isOpenModalExcel: false,
    redraw: false,
    statusCotization: {},
    displayFilter: 1,
    dataForm: {
      date_desde: "",
      date_hasta: "",
    },
    cotizationAction: {},
    isOpenModalAction: false,
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
                  Hacer click para ver las acciones
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
                      <b>Vendedor: </b> {original.name_seller}
                    </li>
                    <li className="list-group-item">
                      <b>Fono del Vendedor: </b>{" "}
                      {original.phone_seller
                        ? original.phone_seller
                        : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Contacto</b>{" "}
                      {original.name_contact
                        ? original.name_contact
                        : "No posee"}
                    </li>
                    <li className="list-group-item">
                      <b>Fono del Contacto: </b> {original.phone_contact}
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
        Header: "Tipo",
        accessor: (props1) =>
          props1.type_effect == 1 ? ["Afecta"] : ["Excento"],
      },
      {
        Header: "Fecha-Emisión",
        accessor: (props1) => [moment(props1.date_issue).format("DD-MM-YYYY")],
      },
      {
        Header: "Fecha Vencimiento",
        accessor: (props1) => [
          moment(props1.date_expiration).format("DD-MM-YYYY"),
        ],
      },
      {
        Header: "Status",
        accessor: (props1) => [determinateStatus(props1.status)],
        Cell: (props1) => {
          const { original } = props1.cell.row;
          if (original.status === 1) {
            return (
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id="tooltip-disabled2">
                    Hacer click para cambiar el Status
                  </Tooltip>
                }
              >
                <Button
                  variant="secondary"
                  block={true}
                  size="sm"
                  onClick={() => changeStatus(original.id, 2)}
                >
                  Pendiente
                </Button>
              </OverlayTrigger>
            );
          } else if (original.status === 2) {
            return (
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id="tooltip-disabled2">
                    Hacer click para cambiar el Status
                  </Tooltip>
                }
              >
                <Button
                  variant="danger"
                  block={true}
                  size="sm"
                  onClick={() => changeStatus(original.id, 1)}
                >
                  Aprobada
                </Button>
              </OverlayTrigger>
            );
          } else if (original.status === 3) {
            return (
              <Badge variant="primary" className="font-badge">
                Pagada
              </Badge>
            );
          } else if (original.status == 7) {
            return (
              <Badge variant="danger" className="font-badge">
                Anulada
              </Badge>
            );
          } else {
            return (
              <Badge variant="danger" className="font-badge">
                vencida
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
                        {props.configGeneral.simbolo_moneda +
                          showPriceWithDecimals(
                            props.configGeneral,
                            original.total_with_iva ? v.price : v.total
                          )}
                        <br />
                        <b>Cantidad</b>: {v.quantity}
                        <br />
                        <b>Status</b>:{" "}
                        {v.status == 1
                          ? "Pendiente"
                          : v.status == 2
                          ? "Pagado"
                          : "Anulado"}
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
        Header: "Descuento Global",
        accessor: "discount_global_total",
        Cell: (props1) => {
          return (
            <OverlayTrigger
              placement={"left"}
              overlay={
                <Tooltip
                  id={"tooltip-total_pagar" + props1.cell.row.original.id}
                >
                  {props1.cell.row.original.discount_global
                    ? props1.cell.row.original.discount_global
                    : 0}
                  %
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
                    props1.cell.row.original.discount_global_amount
                  )}
              </Badge>
            </OverlayTrigger>
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
        Header: "Productos Pagados",
        Cell: (props1) => {
          const original = props1.cell.row.original;
          if (original.status < 6) {
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
          } else {
            return "";
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
      data_donut_ss_status = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
      };

      data_bar_failure_tipology = {
        labels: [],
        datasets: [
          {
            label: "Monto acumulado de documentos hechos por mes",
            backgroundColor: "rgb(15, 13, 74)",
            borderColor: "rgb(27, 13, 74)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(15, 13, 74)",
            hoverBorderColor: "rgb(27, 13, 74)",
            data: [],
          },
        ],
      };

      data_line_by_year = {
        labels: [],
        datasets: [
          {
            label: "Cantidad facturada de documentos por años",
            data: [],
            fill: false,
            backgroundColor: "rgb(125, 81, 52)",
            borderColor: "rgb(99, 56, 21)",
          },
        ],
      };

      data_donut_total_status = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
      };

      handleDataDonutSsStatus();
    }
  }, [globalState.redraw]);

  const determinateStatus = (status) => {
    if (status === 1) {
      return "Pendiente";
    } else if (status === 2) {
      return "Aprobado";
    } else if (status === 3) {
      return "Pagada";
    } else if (status === 4) {
      return "Facturada";
    }
  };

  const goToDocument = (data) => {
    if (data.status === 3) {
      props.history.push("/invoice/invoice_search_by_ref/" + data.ref);
    } else if (data.status === 4) {
      props.history.push("/sale_note/sale_note_search_by_ref/" + data.ref);
    } else if (data.status === 5) {
      props.history.push("/bill/bill_search_by_ref/" + data.ref);
    } else if (data.status === 6) {
      props.history.push("/guide/guide_search_by_ref/" + data.ref);
    }
  };

  const onChange = (e) => {
    e.persist();
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        dataForm: { ...currentState.dataForm, [e.target.name]: e.target.value },
      });
    });
  };

  const handleDataDonutSsStatus = () => {
    globalState.statusCotization.statuses.forEach((v, i) => {
      data_donut_ss_status.labels.push(v.status);
      data_donut_ss_status.datasets[0].data.push(parseFloat(v.total));
      data_donut_ss_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i]);
      data_donut_ss_status.datasets[0].hoverBackgroundColor.push(
        ARRAY_COLORS[i]
      );
    });

    globalState.statusCotization.invoice.forEach((v, i) => {
      data_bar_failure_tipology.labels.push(v.mes);
      data_bar_failure_tipology.datasets[0].data.push(v.total);
    });

    globalState.statusCotization.invoiceByYear.forEach((item, i) => {
      data_line_by_year.labels.push(item.year);
      data_line_by_year.datasets[0].data.push(item.total);
    });

    globalState.statusCotization.totalByStatus.forEach((v, i) => {
      data_donut_total_status.labels.push(v.name);
      data_donut_total_status.datasets[0].data.push(parseFloat(v.total));
      data_donut_total_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i]);
      data_donut_total_status.datasets[0].hoverBackgroundColor.push(
        ARRAY_COLORS[i]
      );
    });

    setGlobalState({ ...globalState, redraw: false });
  };

  const handleStadistics = () => {
    let objectPost = Object.assign({}, globalState.dataForm);
    setGlobalState({ ...globalState, displayFilter: 3 });
    toast.info("Filtrando datos...");
    axios
      .post(API_URL + "cotizacion_stadistics", objectPost)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            statusCotization: {
              ...currentState.statusCotization,
              statuses: result.data.statuses,
              invoice: result.data.invoice,
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

  const goToGuideDispatch = (id) => {
    props.history.push("/quotitation/guide/" + id);
  };

  const handleDisplayFilter = (filter) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        dataForm:
          filter === 3
            ? {
                ...currentState.dataForm,
                date_desde: "",
                date_hasta: "",
              }
            : currentState.dataForm,
        displayFilter: filter,
      });
    });
  };

  const fetchData = () => {
    let objectPost = Object.assign({}, globalState.dataForm);
    let promises = [
      axios.get(API_URL + "cotizacion/1"),
      axios.post(API_URL + "cotizacion_stadistics", objectPost),
    ];
    Promise.all(promises)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            cotizacionData: result[0].data,
            statusCotization: {
              ...currentState.statusCotization,
              statuses: result[1].data.statuses,
              invoice: result[1].data.invoice,
              invoiceByYear: result[1].data.invoiceByYear,
              totalByStatus: result[1].data.totalByStatus,
            },
            displayLoading: false,
            redraw: true,
          });
        });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const updateCotizacion = (id) => {
    props.history.replace("/buyOrder/create/" + id);
  };

  const goToForm = () => {
    props.history.replace("/buyOrder/create");
  };

  const printCotizacion = (id) => {
    toast.info("Buscando documento, espere por favor...");
    setGlobalState({ ...globalState, displayLoading: true });
    axios
      .get(API_URL + "cotizacion_print/" + id + "/0")
      .then((result) => {
        window.open(
          API_URL + "documents/cotizacion/files_pdf/" + result.data.name
        );
        setGlobalState({ ...globalState, displayLoading: false });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const printCotizacionNew = (id) => {
    toast.info("Generando documento, espere por favor...");
    setGlobalState({ ...globalState, displayLoading: true });
    axios
      .get(API_URL + "cotizacion_print/" + id + "/0/1")
      .then((result) => {
        window.open(
          API_URL + "documents/cotizacion/files_pdf/" + result.data.name
        );
        setGlobalState({ ...globalState, displayLoading: false });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const changeStatus = (id, status) => {
    let objectStatus = {
      status,
    };
    toast.info("Cambiando estado, espere por favor...");
    setGlobalState({ ...globalState, displayLoading: true });
    setTimeout(() => {
      axios
        .put(API_URL + "cotizacion_status/" + id, objectStatus)
        .then((result) => {
          toast.success("Status Cambiado");
          if (Object.keys(globalState.cotizationAction).length) {
            setGlobalState({ ...globalState, cotizationAction: status });
          }
          fetchData();
        })
        .catch((err) => {
          setGlobalState({ ...globalState, displayLoading: false });
          props.tokenExpired(err);
        });
    }, 3000);
  };

  const anulateCotization = (id, status) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-edit">
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente realizar esta acción?</p>
            <button
              className="button-alert"
              onClick={() => {
                confirmAnulateCotization(id, status);
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

  const confirmAnulateCotization = (id, status) => {
    setGlobalState({ ...globalState, displayLoading: true });
    axios
      .delete(API_URL + "cotizacion/" + id)
      .then((result) => {
        if (status >= 1 && status <= 2) {
          toast.success("Orden de compra anulada con éxito");
          if (Object.keys(globalState.cotizationAction).length) {
            setGlobalState({ ...globalState, cotizationAction: 7 });
          }
        } else if (status >= 3 && status <= 6) {
          if (status === 3) {
            let validate = true;
            result.data.forEach((v, i) => {
              if (!v.status) {
                validate = false;
                toast.error(`Factura ${v.folio} no ha podido ser anulada`);
              } else {
                window.open(v.pdf_public_url, "_blank");
              }
            });
            if (validate) {
              if (Object.keys(globalState.cotizationAction).length) {
                setGlobalState({ ...globalState, cotizationAction: 2 });
              }
            } else {
              toast.error(
                "La orden de compra no ha podido ser anulada debido a que 1 o más facturas no fueron anuladas"
              );
            }
          } else {
            if (Object.keys(globalState.cotizationAction).length) {
              setGlobalState({ ...globalState, cotizationAction: 2 });
            }
          }
          toast.success("Documento anulado con éxito");
          setGlobalState({ ...globalState, displayLoading: false });
        }
        fetchData();
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const handleModalDetail = () => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        isOpenModalDetail: !currentState.isOpenModalDetail,
      });
    });
  };

  const displayMehotdSale = (method) => {
    method = parseInt(method);
    if (method === 1) {
      return "Unidad";
    } else if (method === 2) {
      return "Mayorista";
    } else {
      return "(Litros, Kg, Etc..)";
    }
  };

  const seeDetailCotization = (data) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        cotizationDetail: data,
      });
    });
    handleModalDetail();
  };

  const goToFacturation = (id) => {
    props.history.push("/quotitation/invoicing/" + id);
  };

  const onHideModalAction = (originalCoti = false) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        isOpenModalAction: !currentState.isOpenModalAction,
        cotizationAction:
          !globalState.isOpenModalAction && originalCoti
            ? originalCoti
            : currentState.cotizationAction,
      });
    });
  };

  const goToPayments = (idOrder) => {
    props.history.push("/buyOrder/bond/" + idOrder);
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
        <Col className="text-center">
          <h4 className="title_principal">Tabla de Ordenes de Compra</h4>
        </Col>
        <Col className="text-center title_principal">
          <h4>Total Ordenes Realizadas</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={3} md={3} lg={3} className="text-center">
          <Button block={true} variant="success" onClick={goToForm} size="sm">
            Nueva Orden de Compra <FaPlusCircle />
          </Button>
        </Col>
        <Col sm={3} md={3} lg={3} className="text-center">
          <Button
            block={true}
            variant="success"
            onClick={openModalExcelHandler}
            size="sm"
          >
            Exportar data <FaFileExcel />
          </Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center">
          <Badge variant="danger">{globalState.cotizacionData.length}</Badge>
        </Col>
      </Row>
      <hr />
      {globalState.displayLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Accordion>
                <Card>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="0"
                    className="header_card"
                  >
                    <b>Estadísticas</b> <FaChartLine />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row className="justify-content-center">
                        {globalState.displayFilter == 1 ? (
                          <Col sm={2} md={2} lg={2}>
                            <Button
                              variant="secondary"
                              type="button"
                              size="sm"
                              block={true}
                              onClick={() => handleDisplayFilter(2)}
                            >
                              Activar Filtros
                            </Button>
                          </Col>
                        ) : globalState.displayFilter == 2 ? (
                          <React.Fragment>
                            <InputField
                              type="date"
                              label="Fecha desde"
                              name="date_desde"
                              required={true}
                              messageErrors={["Requerido*"]}
                              cols="col-md-3 col-lg-3 col-sm-3"
                              value={globalState.dataForm.date_desde}
                              handleChange={onChange}
                            />
                            <InputField
                              type="date"
                              label="Fecha Hasta"
                              name="date_hasta"
                              required={true}
                              messageErrors={["Requerido*"]}
                              cols="col-md-3 col-lg-3 col-sm-3"
                              value={globalState.dataForm.date_hasta}
                              handleChange={onChange}
                            />
                            <Col sm={3} md={3} lg={3}>
                              <br />
                              <Button
                                variant="danger"
                                type="button"
                                size="sm"
                                block={true}
                                onClick={handleStadistics}
                              >
                                Buscar
                              </Button>
                            </Col>
                            <Col sm={3} md={3} lg={3}>
                              <br />
                              <Button
                                variant="secondary"
                                type="button"
                                size="sm"
                                block={true}
                                onClick={() => handleDisplayFilter(1)}
                              >
                                Ocultar Filtros
                              </Button>
                            </Col>
                          </React.Fragment>
                        ) : (
                          <Col sm={12} md={12} lg={12} className="text-center">
                            <br />
                            <Image
                              src={require("../assets/img/loading.gif")}
                              width="30"
                            />
                            <br />
                            Cargando datos...
                          </Col>
                        )}
                      </Row>
                      <br />
                      <Row>
                        <Col sm={6} md={6} lg={6} style={{ height: "200px" }}>
                          <Doughnut
                            data={data_donut_ss_status}
                            redraw={globalState.redraw}
                            options={optionsBar}
                          />
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th
                                  className="text-center"
                                  colSpan="2"
                                  style={{
                                    backgroundColor: "rgb(147, 52, 12)",
                                    color: "white",
                                  }}
                                >
                                  Monto acumulado por estados
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="text-center"
                                  style={{
                                    backgroundColor: "rgb(133, 124, 124)",
                                    color: "white",
                                  }}
                                >
                                  Estado
                                </th>
                                <th
                                  className="text-center"
                                  style={{
                                    backgroundColor: "rgb(133, 124, 124)",
                                    color: "white",
                                  }}
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {Object.keys(globalState.statusCotization)
                                .length > 0 ? (
                                <React.Fragment>
                                  {globalState.statusCotization.statuses.map(
                                    (v, i) => (
                                      <tr key={i}>
                                        <td>{v.status}</td>
                                        <td>
                                          {props.configGeneral.simbolo_moneda}
                                          {showPriceWithDecimals(
                                            props.configGeneral,
                                            v.total
                                          )}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </React.Fragment>
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center">
                                    Sin registros...
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          sm={12}
                          md={12}
                          lg={12}
                          style={{ height: "200px" }}
                        >
                          <Bar
                            data={data_bar_failure_tipology}
                            options={optionsBar}
                            redraw={globalState.redraw}
                          />
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={6} md={6} lg={6} style={{ height: "230px" }}>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th
                                  className="text-center"
                                  colSpan="2"
                                  style={{
                                    backgroundColor: "rgb(147, 52, 12)",
                                    color: "white",
                                  }}
                                >
                                  Total cotizaciones realizadas
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="text-center"
                                  style={{
                                    backgroundColor: "rgb(133, 124, 124)",
                                    color: "white",
                                  }}
                                >
                                  Estado
                                </th>
                                <th
                                  className="text-center"
                                  style={{
                                    backgroundColor: "rgb(133, 124, 124)",
                                    color: "white",
                                  }}
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {Object.keys(globalState.statusCotization)
                                .length > 0 ? (
                                <React.Fragment>
                                  {globalState.statusCotization.totalByStatus.map(
                                    (v, i) => (
                                      <tr key={i}>
                                        <td>{v.name}</td>
                                        <td>{v.total}</td>
                                      </tr>
                                    )
                                  )}
                                </React.Fragment>
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center">
                                    Sin registros...
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </Col>
                        <Col
                          sm={6}
                          md={6}
                          lg={6}
                          style={{ height: "200px" }}
                          className="text-center"
                        >
                          <Doughnut
                            data={data_donut_total_status}
                            redraw={globalState.redraw}
                            options={optionsBar}
                          />
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <Row>
                        <Col
                          sm={12}
                          md={12}
                          lg={12}
                          style={{ height: "200px" }}
                        >
                          <Line
                            data={data_line_by_year}
                            options={options_line}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Table
                columns={cotizacionColumns}
                data={globalState.cotizacionData}
              />
            </Col>
          </Row>
        </>
      )}
      <Modal
        onHide={handleModalDetail}
        show={globalState.isOpenModalDetail}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Detalles de la Cotización N°{" "}
            {Object.keys(globalState.cotizationDetail).length > 0
              ? globalState.cotizationDetail.ref
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">
                Datos del Registrador
              </h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Rut</th>
                    <th className="text-center">Dirección</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">País</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <tr>
                      <td>
                        {globalState.cotizationDetail.business_name_transmitter}
                      </td>
                      <td>{globalState.cotizationDetail.rut_transmitter}</td>
                      <td>
                        {globalState.cotizationDetail.address_transmitter}
                      </td>
                      <td>{globalState.cotizationDetail.email_transmitter}</td>
                      <td>{globalState.cotizationDetail.phone_transmitter}</td>
                      <td>
                        {globalState.cotizationDetail.country_transmitter}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">Datos del Cliente</h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Razon Social / Nombre</th>
                    <th className="text-center">Rut</th>
                    <th className="text-center">Dirección</th>
                    <th className="text-center">Ciudad</th>
                    <th className="text-center">Comuna</th>
                    <th className="text-center">Giro</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <tr>
                      <td>
                        {globalState.cotizationDetail.business_name_client}
                      </td>
                      <td>{globalState.cotizationDetail.rut_client}</td>
                      <td>{globalState.cotizationDetail.address_client}</td>
                      <td>{globalState.cotizationDetail.city_client}</td>
                      <td>{globalState.cotizationDetail.comuna_client}</td>
                      <td>{globalState.cotizationDetail.spin_client}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">
                Datos del Contacto
              </h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">Email</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{globalState.cotizationDetail.name_contact}</td>
                      <td>{globalState.cotizationDetail.phone_contact}</td>
                      <td>{globalState.cotizationDetail.email_contact}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">
                Datos del Vendedor
              </h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">Email</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{globalState.cotizationDetail.name_seller}</td>
                      <td>{globalState.cotizationDetail.phone_seller}</td>
                      <td>{globalState.cotizationDetail.email_seller}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12} className="table-responsive">
              <h4 className="title_principal text-center">
                Productos de la Cotización
              </h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Categoria</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Descripción</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Descuento</th>
                    <th className="text-center">Método de Venta</th>
                    <th className="text-center">Neto</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <React.Fragment>
                      {globalState.cotizationDetail.products.map((v, i) => (
                        <tr key={i}>
                          <td>{v.category}</td>
                          <td>{v.name_product}</td>
                          <td>{v.description}</td>
                          <td>{v.quantity}</td>
                          <td>
                            {props.configGeneral.simbolo_moneda}
                            {formatNumber(
                              globalState.cotizationDetail.total_with_iva
                                ? v.price
                                : v.total,
                              2,
                              ",",
                              "."
                            )}
                          </td>
                          <td>{v.discount ? v.discount + "%" : ""}</td>
                          <td>{displayMehotdSale(v.method_sale)}</td>
                          <td>{v.is_neto ? "Neto" : "Iva"}</td>
                          <td>
                            <Badge variant="danger" className="font-badge">
                              {props.configGeneral.simbolo_moneda}
                              {formatNumber(v.total, 2, ",", ".")}
                            </Badge>
                          </td>
                          <td>
                            {v.status == 1
                              ? "Pendiente"
                              : v.status == 2
                              ? "Pagado"
                              : "Anulado"}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12} className="">
              <h4 className="title_principal text-center">
                Gastos de la Orden de Compra
              </h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Descripción</th>
                    <th className="text-center">Monto</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <React.Fragment>
                      {globalState.cotizationDetail.gastos.map((v, i) => (
                        <tr>
                          <td>{v.description}</td>
                          <td>
                            <Badge variant="danger" className="font-badge">
                              {props.configGeneral.simbolo_moneda}
                              {formatNumber(v.amount, 2, ",", ".")}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          {Object.keys(globalState.cotizationDetail).length > 0 &&
          globalState.cotizationDetail.referencias &&
          globalState.cotizationDetail.referencias.length > 0 ? (
            <Row>
              <Col sm={12} md={12} lg={12} className="">
                <h4 className="title_principal text-center">
                  Referencias de la Cotización
                </h4>
                <br />
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Tipo de Documento</th>
                      <th className="text-center">Referencia Cotiz.</th>
                      <th className="text-center">Ind</th>
                      <th className="text-center">Fecha Ref.</th>
                      <th className="text-center">Razón de Referencia</th>
                      <th className="text-center">Tipo de Código</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {Object.keys(globalState.cotizationDetail).length > 0 ? (
                      <React.Fragment>
                        {globalState.cotizationDetail.referencias.map(
                          (v, i) => (
                            <tr>
                              <td>{v.type_document}</td>
                              <td>{v.ref_cotizacion}</td>
                              <td>{v.ind}</td>
                              <td>
                                {v.date_ref
                                  ? moment(v.date_ref)
                                      .tz("America/Santiago")
                                      .format("DD-MM-YYYY")
                                  : ""}
                              </td>
                              <td>{v.reason_ref}</td>
                              <td>{v.type_code}</td>
                            </tr>
                          )
                        )}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Col sm={12} md={12} lg={12} className="">
              <h4 className="title_principal text-center">Totales</h4>
              <br />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Neto</th>
                    <th className="text-center">Iva</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Descuento Global</th>
                    <th className="text-center">Total Balance</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(globalState.cotizationDetail).length > 0 ? (
                    <tr>
                      <td>
                        <Badge variant="danger" className="font-badge">
                          {props.configGeneral.simbolo_moneda}
                          {formatNumber(
                            globalState.cotizationDetail.total_product,
                            2,
                            ",",
                            "."
                          )}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant="danger" className="font-badge">
                          {props.configGeneral.simbolo_moneda}
                          {formatNumber(
                            globalState.cotizationDetail.total_iva,
                            2,
                            ",",
                            "."
                          )}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant="danger" className="font-badge">
                          {props.configGeneral.simbolo_moneda}
                          {formatNumber(
                            globalState.cotizationDetail.total_gastos,
                            2,
                            ",",
                            "."
                          )}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant="danger" className="font-badge">
                          {props.configGeneral.simbolo_moneda}
                          {formatNumber(
                            globalState.cotizationDetail.discount_global_amount,
                            2,
                            ",",
                            "."
                          )}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant="danger" className="font-badge">
                          {props.configGeneral.simbolo_moneda}
                          {formatNumber(
                            globalState.cotizationDetail.total_balance,
                            2,
                            ",",
                            "."
                          )}
                        </Badge>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              {Object.keys(globalState.cotizationDetail).length > 0 ? (
                <h5>
                  Mostrar solo los Totales:{" "}
                  <Badge variant="primary" className="font-badge">
                    {globalState.cotizationDetail.total_with_iva ? "No" : "Si"}
                  </Badge>
                </h5>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="info" onClick={handleModalDetail}>
            cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalActionsCotization
        isShow={globalState.isOpenModalAction}
        onHide={onHideModalAction}
        cotization={globalState.cotizationAction}
        updateCotizacion={updateCotizacion}
        seeDetailCotization={seeDetailCotization}
        printCotizacion={printCotizacion}
        printCotizacionNew={printCotizacionNew}
        changeStatus={changeStatus}
        anulateCotization={anulateCotization}
        goToFacturation={goToFacturation}
        goToGuideDispatch={goToGuideDispatch}
        displayLoadingModal={globalState.displayLoading}
        goToPayments={goToPayments}
      />
      <ModalExportDataInvoice
        isOpen={globalState.isOpenModalExcel}
        type="buyOrder"
        handleOnHide={openModalExcelHandler}
        catchErrorHandler={props.tokenExpired}
        configGeneral={props.configGeneral}
      />
    </Container>
  );
};

BuyOrderSearchPage.defaultProps = {
  configGeneral: JSON.parse(localStorage.getItem("configGeneral")),
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
  };
}

BuyOrderSearchPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {})(BuyOrderSearchPage);
