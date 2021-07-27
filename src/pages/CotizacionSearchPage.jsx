import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import Table from "components/Table";
import axios from "axios";
import { API_URL } from "utils/constants";
import { toast } from "react-toastify";
import { showPriceWithDecimals } from "utils/functions";
import { FaPlusCircle, FaFileExcel } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import layoutHelpers from "shared/layouts/helpers";
import "styles/components/modalComponents.scss";
import { connect } from "react-redux";
import ModalActionsCotization from "components/modals/ModalActionsCotization";
import ModalExportDataInvoice from "components/modals/ModalExportDataInvoice";
import LoadingComponent from "components/LoadingComponent";
import StadisticsInvoiceComponent from 'components/invoice/StadisticsCotizationComponent';
import ModalCotizationDetail from "components/modals/ModalCotizationDetail";

let cotizacionColumns = null;

const CotizacionSearchPage = (props) => {
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
      type: 0
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
        Header: "Fecha Emisión",
        accessor: "date_issue_format",
      },
      {
        Header: "Fecha Vencimiento",
        accessor: "date_expiration_format",
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
          } else if (original.status >= 3 && original.status < 7) {
            return (
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id="tooltip-disabled2">
                    Hacer click para ver el documento
                  </Tooltip>
                }
              >
                <Badge
                  variant="primary"
                  className="font-badge"
                  onClick={() => goToDocument(original)}
                >
                  {determinateStatus(original.status)}
                </Badge>
              </OverlayTrigger>
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

  const determinateStatus = (status) => {
    if (status === 1) {
      return "Pendiente";
    } else if (status === 2) {
      return "Aprobado";
    } else if (status === 3) {
      return "Facturado";
    } else if (status === 4) {
      return "Nota de Venta";
    } else if (status === 5) {
      return "Boleta";
    } else if (status === 6) {
      return "Guía Despacho";
    } else {
      return "Anulada";
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
      axios.get(API_URL + "cotizacion/0"),
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
    props.history.replace("/quotitation/create_quotitation/" + id);
  };

  const goToForm = () => {
    props.history.replace("/quotitation/create_quotitation");
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

    axios
      .put(API_URL + "cotizacion_status/" + id, objectStatus)
      .then((result) => {
        toast.success("Status Cambiado");
        if (Object.keys(globalState.cotizationAction).length) {
          setGlobalState({
            ...globalState,
            cotizationAction: { ...globalState.cotizationAction, status },
          });
        }
        fetchData();
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
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
          toast.success("Cotización Anulada con éxito");
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
                "La cotización no ha podido ser anulada debido a que 1 o más facturas no fueron anuladas"
              );
            }
          } else {
            if (Object.keys(globalState.cotizationAction).length) {
              setGlobalState({ ...globalState, cotizationAction: 2 });
            }
          }
          toast.success("Documento anulado con éxito");
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

  const goToNoteSale = (id) => {
    props.history.replace("/quotitation/sale_note_create/" + id);
  };

  const goToBillOfSale = (id) => {
    props.history.replace("/quotitation/bill_create/" + id);
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

  const openModalExcelHandler = () => {
    setGlobalState({
      ...globalState,
      isOpenModalExcel: !globalState.isOpenModalExcel,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col className="text-center d-none d-md-block">
          <h4 className="title_principal">Tabla de Cotizaciones</h4>
        </Col>
        <Col className="text-center title_principal">
          <h4><span className="d-none d-md-inline">Total </span>Cotizaciones Realizadas <Badge variant="danger" className="font-badge d-inlne d-md-none">{globalState.cotizacionData.length}</Badge></h4>
        </Col>
      </Row>
      <Row>
        <Col sm={6} md={3} lg={3} xs={12} className="text-center mb-2 mb-sm-0">
          <Button block={true} variant="success" onClick={goToForm} size="sm">
            Nueva Cotización <FaPlusCircle />
          </Button>
        </Col>
        <Col sm={6} md={3} lg={3} xs={12} className="text-center">
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

              <StadisticsInvoiceComponent
                setGlobalState={setGlobalState}
                dataForm={globalState.dataForm}
                redraw={globalState.redraw}
                statusCotization={globalState.statusCotization}
                handleDisplayFilter={handleDisplayFilter}
                handleStadistics={handleStadistics}
                displayFilter={globalState.displayFilter}
                globalState={globalState}
                configGeneral={props.configGeneral}
                isCotization={true}
              />
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
      <ModalCotizationDetail
        globalState={globalState}
        handleModalDetail={handleModalDetail}
        configGeneral={props.configGeneral}
      />
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
        goToNoteSale={goToNoteSale}
        goToBillOfSale={goToBillOfSale}
        goToGuideDispatch={goToGuideDispatch}
        displayLoadingModal={globalState.displayLoading}
      />
      <ModalExportDataInvoice
        isOpen={globalState.isOpenModalExcel}
        type="cotizacion"
        handleOnHide={openModalExcelHandler}
        catchErrorHandler={props.tokenExpired}
        configGeneral={props.configGeneral}
      />
    </Container>
  );
};

CotizacionSearchPage.defaultProps = {
  configGeneral: JSON.parse(sessionStorage.getItem("configGeneral")),
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
  };
}

CotizacionSearchPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {})(CotizacionSearchPage);
