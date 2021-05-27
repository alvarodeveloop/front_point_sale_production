import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Accordion,
  Card,
  Badge,
} from "react-bootstrap";
import InputField from "components/input/InputComponent";
import { toast } from "react-toastify";
import { API_URL } from "utils/constants";
import axios from "axios";
import { FaSearch, FaPlusCircle, FaBuilding } from "react-icons/fa";
import TablePlansComponent from "components/TablePlansComponent";
import { formatRut } from "utils/functions";
import {
  setEnterprises,
  setBranchOffices,
  setIdBranchOffice,
  setIdEnterprise,
} from "actions/enterpriseSucursal";
import { setMenu } from "actions/menu";
import { setDisplayMessage } from "actions/menu";
import { setConfig } from "actions/configs";
import { connect } from "react-redux";
import layoutHelpers from "shared/layouts/helpers";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import BranchOfficeFormModal from "components/modals/BranchOfficeFormModal";
import { setConfigStore } from "actions/configs";
import LoadingComponent from "components/LoadingComponent";
import "styles/pages/enterprisePage.css";

const EnterpriseFormPage = (props) => {
  const [globalState, setGlobalState] = useState({
    validated: false,
    planes: [],
    requiredInput: false,
    displaySection: true,
    dataForm: {
      rut: "",
      name: "",
      bussines_name: "",
      address: "",
      city: "",
      comuna: "",
      email_enterprise: "",
      phone: "",
      spin: "",
      plan: {},
      actividad_economica: "",
      giro: "",
    },
    displayLoading: true,
    branchOfficeForm: {
      name: "",
      is_open: true,
      id: "",
    },
    userForm: {
      email: "",
      password: "",
      password_repeat: "",
      rut: "",
      name: "",
      phone: "",
      id: "",
      id_rol: 3,
    },
    isOpenModalAdd: false,
  });

  useEffect(() => {
    layoutHelpers.toggleCollapsed();
    fetchData();
    return () => {
      layoutHelpers.toggleCollapsed();
    };
  }, []);

  const fetchData = () => {
    let promises = [axios.get(API_URL + "plans")];
    if (props.match.params.id) {
      promises.push(axios.get(API_URL + "enterprise/" + props.match.params.id));
    }

    Promise.all(promises)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            planes: result[0].data,
            dataForm:
              result.length > 1
                ? {
                    rut: result[1].data.rut,
                    name: result[1].data.name,
                    bussines_name: result[1].data.bussines_name,
                    email_enterprise: result[1].data.email_enterprise,
                    city: result[1].data.city,
                    comuna: result[1].data.comuna,
                    address: result[1].data.address,
                    phone: result[1].data.phone,
                    spin: result[1].data.spin,
                    plan: result[1].data.plan,
                    id: result[1].data.id,
                    actividad_economica: result[1].data.actividad_economica,
                    plan_backup: result[1].data.plan,
                    giro: result[1].data.giro,
                    displayLoading: false,
                  }
                : currentState.dataForm,
            displayLoading: false,
          });
        });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setGlobalState({ ...globalState, validated: true });
      return;
    }

    let data = Object.assign({}, globalState.dataForm);
    if (Object.keys(data.plan).length < 1) {
      toast.error("Debe escoger un plan para la empresa");
      return false;
    }

    setGlobalState({ ...globalState, displayLoading: true });
    if (data.id) {
      let backup = data.plan_backup;

      axios
        .put(API_URL + "enterprise/" + data.id, data)
        .then(async (result) => {
          toast.success("Empresa modificada con éxito");
          if (
            props.id_enterprise_redux == data.id &&
            backup.id !== data.plan.id
          ) {
            props.setDisplayMessage(true);
            let branch = await axios.get(
              API_URL + "enterprises_branch_office/" + data.id
            );
            props.setEnterprises(result.data.enterprises);
            if (branch.data.menu) {
              props.setMenu(branch.data.menu);
            }
            sessionStorage.setItem("id_enterprise", data.id);
            sessionStorage.setItem(
              "configGeneral",
              JSON.stringify(branch.data.config)
            );
            props.setConfig(branch.data.config);
            props.setIdEnterprise(data.id);

            setTimeout(function () {
              props.setDisplayMessage(false);
              goToTable();
            }, 1500);
          } else {
            setTimeout(function () {
              goToTable();
            }, 1500);
          }
        })
        .catch((err) => {
          setGlobalState({ ...globalState, displayLoading: false });
          props.tokenExpired(err);
        });
    } else {
      axios
        .post(API_URL + "enterprise", data)
        .then(async (result) => {
          toast.success("Empresa creada con éxito");
          if (result.data.enterprises.length === 1) {
            props.setDisplayMessage(true);
            let branch = await axios.get(
              API_URL +
                "enterprises_branch_office/" +
                result.data.enterprises[0].id
            );
            props.setEnterprises(result.data.enterprises);
            if (branch.data.menu) {
              props.setMenu(branch.data.menu);
            }
            sessionStorage.setItem(
              "id_enterprise",
              result.data.enterprises[0].id
            );
            sessionStorage.setItem(
              "configGeneral",
              JSON.stringify(branch.data.config)
            );
            props.setConfig(branch.data.config);
            props.setIdEnterprise(result.data.enterprises[0].id);
            setGlobalState({ ...globalState, displayLoading: false });

            setTimeout(function () {
              props.setDisplayMessage(false);
              handleOpenModalAdd();
              toast.info(
                "Cree la sucursal con la que va a trabajar para empezar en aidy"
              );
            }, 1500);
          } else {
            props.setEnterprises(result.data.enterprises);
            setTimeout(function () {
              goToTable();
            }, 1500);
          }
        })
        .catch((err) => {
          setGlobalState({ ...globalState, displayLoading: false });
          console.log(err);
          props.tokenExpired(err);
        });
    }
  };

  const onChange = (e) => {
    setGlobalState({
      ...globalState,
      dataForm: {
        ...globalState.dataForm,
        [e.target.name]:
          e.target.name === "rut" ? formatRut(e.target.value) : e.target.value,
      },
    });
  };

  const goToTable = () => {
    props.history.replace("/enterprise");
  };

  const handleSelectPlan = (plan) => {
    setGlobalState({
      ...globalState,
      dataForm: { ...globalState.dataForm, plan: Object.assign({}, plan) },
    });
    toast.info("Plan Seleccionado");
  };

  const searchClientByApiFacturacion = () => {
    // para buscar receptores simple
    let val = Object.assign({}, globalState.dataForm).rut;
    if (val) {
      toast.info("Buscando Receptor, espere por favor");
      setGlobalState({ ...globalState, displayLoading: true });
      axios
        .get(
          API_URL +
            "search_receptor/" +
            val.split("-")[0] +
            "/" +
            val.split("-")[1]
        )
        .then((result) => {
          globalState((currentState) => {
            return Object.assign({}, currentState, {
              dataForm: {
                ...currentState.dataForm,
                rut: result.data.rut + "-" + result.data.dv,
                bussines_name: result.data.razon_social,
                address: result.data.direccion_seleccionada,
                comuna: result.data.comuna_seleccionada,
                city: result.data.ciudad_seleccionada,
              },
              displayLoading: false,
            });
          });
        })
        .catch((err) => {
          setGlobalState({ ...globalState, displayLoading: false });
          props.tokenExpired(err);
        });
    } else {
      toast.info("Debe ingresar un rut para buscar los datos de la empresa");
    }
  };

  /* ==================== sección de las sucursales  ================================== */

  const handleOpenModalAdd = () => {
    setGlobalState({
      ...globalState,
      isOpenModalAdd: !globalState.isOpenModalAdd,
    });
  };

  const fetchDataBranch = (type = false, update = false) => {
    let promises = [axios.get(API_URL + "branch_office")];
    setGlobalState({ ...globalState, displayLoading: true });
    Promise.all(promises)
      .then(async (result) => {
        if (type) {
          props.setBranchOffices(result[0].data);
          if (!update) {
            if (result[0].data.length === 1) {
              let branch = await axios.get(
                API_URL +
                  "enterprises_branch_office/" +
                  null +
                  "/" +
                  result[0].data[0].id +
                  "/" +
                  1
              );
              sessionStorage.setItem("id_branch_office", result[0].data[0].id);
              sessionStorage.setItem(
                "configStore",
                JSON.stringify(branch.data.config)
              );
              props.setConfigStore(branch.data.config);
              props.setIdBranchOffice(result[0].data[0].id);
              toast.info("Sucursal seleccionada para trabajar");
              setTimeout(function () {
                props.history.replace("/config/config_general");
              }, 1000);
            }
          }
        }
        setGlobalState({ ...globalState, displayLoading: false });
      })
      .catch((err) => {
        setGlobalState({ ...globalState, displayLoading: false });
        props.tokenExpired(err);
      });
  };

  const displaySectionHandler = () => {
    let currentState = Object.assign({}, globalState);

    if (currentState.displaySection) {
      let form = document.getElementById("formEnterprise");
      if (form.checkValidity() === false) {
        setGlobalState({ ...globalState, validated: true });
        return;
      }
    }
    setGlobalState({
      ...globalState,
      displaySection: !globalState.displaySection,
      validated: false,
    });
  };
  return (
    <>
      {globalState.displayLoading ? (
        <Container fluid>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid>
          <Form
            onSubmit={onSubmit}
            noValidate
            validated={globalState.validated}
            id="formEnterprise"
          >
            <Row>
              <Col sm={6} md={6} lg={6}>
                <h4 className="title_principal">Formulario de Empresas</h4>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <h4 className="title_principal text-right">
                  Plan de la empresa:{" "}
                  <Badge variant="danger" className="font-badge">
                    {Object.keys(globalState.dataForm.plan).length > 0
                      ? globalState.dataForm.plan.name
                      : "Ninguno"}
                  </Badge>
                </h4>
              </Col>
            </Row>
            <hr />
            {globalState.displaySection ? (
              <>
                <Row>
                  <Col sm={12} lg={12} md={12}>
                    <Row>
                      <Col sm={4} md={4} lg={4}>
                        <Form.Label className="fontBold">Rut</Form.Label>
                        <Form.Group className={"divContainerFlex"}>
                          <Form.Control
                            type="text"
                            label="Rut"
                            id="rut_client_sii"
                            name="rut"
                            required={true}
                            placeholder="rut de la empresa"
                            cols="col-md-12 col-lg-12 col-sm-12"
                            className="form-control-sm rutInputSearch"
                            onChange={onChange}
                            value={globalState.dataForm.rut}
                          />
                          <OverlayTrigger
                            placement={"right"}
                            overlay={
                              <Tooltip id="tooltip-disabled2">
                                Hacer click para buscar datos de la empresa
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => searchClientByApiFacturacion()}
                            >
                              <FaSearch />
                            </Button>
                          </OverlayTrigger>
                          <br />
                          <Form.Control.Feedback
                            type="invalid"
                            style={{ position: "absolute", top: "50px" }}
                          >
                            <span className="error-input">Requerido</span>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <InputField
                        type="text"
                        label="Razon Social"
                        name="bussines_name"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.bussines_name}
                        handleChange={onChange}
                      />
                      <InputField
                        type="text"
                        label="Nombre"
                        name="name"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.name}
                        handleChange={onChange}
                      />
                    </Row>
                    <Row>
                      <InputField
                        type="textarea"
                        label="Dirección"
                        name="address"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.address}
                        handleChange={onChange}
                      />
                      <InputField
                        type="text"
                        label="Ciudad"
                        name="city"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.city}
                        handleChange={onChange}
                      />
                      <InputField
                        type="text"
                        label="Comuna"
                        name="comuna"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.comuna}
                        handleChange={onChange}
                      />
                    </Row>
                    <Row>
                      <InputField
                        type="email"
                        label="Email"
                        name="email_enterprise"
                        required={true}
                        messageErrors={["Requerido, ", "Formato tipo email"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.email_enterprise}
                        handleChange={onChange}
                      />
                      <InputField
                        type="number"
                        label="Fono"
                        name="phone"
                        required={true}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-4"
                        value={globalState.dataForm.phone}
                        handleChange={onChange}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="secondary"
                      size="sm"
                      block={true}
                      type="button"
                      onClick={goToTable}
                    >
                      Volver a la tabla
                    </Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="primary"
                      size="sm"
                      block={true}
                      type="button"
                      onClick={displaySectionHandler}
                    >
                      Continuar
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12}>
                    <Row className="snip1404 justify-content-center">
                      {globalState.planes.map((v, i) => (
                        <Col sm={4} md={4} lg={4} key={i}>
                          <TablePlansComponent
                            plan={v}
                            handleSelect={handleSelectPlan}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="secondary"
                      block={true}
                      size="sm"
                      type="button"
                      onClick={displaySectionHandler}
                    >
                      Volver
                    </Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="danger"
                      block={true}
                      size="sm"
                      type="submit"
                    >
                      Enviar <FaPlusCircle />
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Form>
          <BranchOfficeFormModal
            branchOfficeForm={globalState.branchOfficeForm}
            userForm={globalState.userForm}
            setGlobalState={setGlobalState}
            handleOpenModalAdd={handleOpenModalAdd}
            isOpenModalAdd={globalState.isOpenModalAdd}
            titleModal={"Crear Sucursal"}
            requiredInput={globalState.requiredInput}
            fetchData={fetchDataBranch}
            menu={props.modules}
          />
        </Container>
      )}
    </>
  );
};

EnterpriseFormPage.propTypes = {
  setEnterprises: PropTypes.func.isRequired,
  setDisplayMessage: PropTypes.func.isRequired,
  setBranchOffices: PropTypes.func.isRequired,
  setIdEnterprise: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  id_enterprise_redux: PropTypes.any,
  modules: PropTypes.array,
};

function mapDispatchToProps() {
  return {
    setEnterprises,
    setDisplayMessage,
    setBranchOffices,
    setIdEnterprise,
    setMenu,
    setConfig,
    setBranchOffices,
    setIdBranchOffice,
    setConfigStore,
  };
}

function mapStateToProps(state) {
  return {
    id_enterprise_redux: state.enterpriseSucursal.id_enterprise,
    modules: state.menu.modules,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(EnterpriseFormPage);
