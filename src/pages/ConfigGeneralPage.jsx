import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaCheck, FaPlusCircle, FaSyncAlt, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { API_URL } from "utils/constants";
import { setAuthorizationToken } from "utils/functions";
import { Container, Row, Col, Button, Badge, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import "styles/pages/config_general.scss";
import { confirmAlert } from "react-confirm-alert"; // Import
import LoadingComponent from "components/LoadingComponent";
import ModalConfirmDataDeleteConfigGeneral from "components/ModalConfirmDataDeleteConfigGeneral";
import { setConfig } from "actions/configs";

const ConfigGeneralPage = (props) => {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [config, setConfig] = useState({
    simbolo_moneda: "",
    active_price_decimals: "",
    close_session: "",
    actividad_economica: "",
    giro: "",
    rut_legal_representative: "",
    clave_login_sii: "", // clave para hacer login en el  sii
    clave_sii: "", // firma del sii
    logo: "",
    username: "",
    password_nuxo: ""
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    fechData();
  }, [props.id_enterprise]);

  const fechData = () => {
    let promises = [axios.get(API_URL + "config_general")];
    Promise.all(promises)
      .then((result) => {
        if (result[0].data) {
          setConfig({
            simbolo_moneda: result[0].data.simbolo_moneda,
            active_price_decimals: result[0].data.active_price_decimals,
            close_session: result[0].data.close_session,
            actividad_economica: result[0].data.actividad_economica,
            giro: result[0].data.giro,
            rut_legal_representative: result[0].data.rut_legal_representative,
            clave_login_sii: result[0].data.clave_login_sii, // clave para hacer login en el  sii
            clave_sii: result[0].data.clave_sii, // firma del sii
            logo: result[0].data.logo,
            is_syncronized: result[0].data.is_syncronized,
            username: result[0].data.username,
            password_nuxo: result[0].data.password_nuxo
          });
        }
        setDisplayLoading(false);
      })
      .catch((err) => {
        setDisplayLoading(false);
        props.tokenExpired(err);
      });
  };

  const createConfigGeneral = () => {
    props.history.push("/config/config_general_form");
  };

  const updateConfigGeneral = () => {
    props.history.push(
      "/config/config_general_form/" +
      JSON.parse(sessionStorage.getItem("user")).id_parent
    );
  };

  const modalConfirmDataDelete = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const syncSii = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-edit">
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">
              syncronizara con el Sii y creara una cuenta en nuestra api de nuxo
            </p>
            <button
              className="button-alert"
              onClick={() => {
                confirmSyncSii();
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

  const confirmSyncSii = () => {
    let configData = Object.assign({}, config);
    toast.info("Espere por favor esto puede tomar unos minutos...");
    setDisplayLoading(true);
    axios
      .post(API_URL + "config_nuxo", configData)
      .then((result) => {
        toast.success("Empresa sincronizada con éxito");
        sessionStorage.setItem("token", result.data.token);
        setAuthorizationToken(result.data.token);
        setConfig((currentData) =>
          Object.assign({}, currentData, { is_syncronized: true })
        );
        props.setConfigRedux({ ...props.configGeneral, is_syncronized: true });
        let configLocal = JSON.parse(sessionStorage.getItem("configGeneral"));
        configLocal.is_syncronized = true;
        sessionStorage.setItem("configGeneral", JSON.stringify(configLocal));
        setDisplayLoading(false);
      })
      .catch((err) => {
        setDisplayLoading(false);
        props.tokenExpired(err);
      });
  };

  return (
    <>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Container>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal">Configuración General</h4>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col md={7} sm={10} lg={7} xs={12}>
              <ul>
                {/*<li className="d-flex" style={{justifyContent: 'space-between'}}><b><span style={{color: "rgb(203, 44, 67)"}}>*  </span>Simbolo de moneda: </b><Badge style={{backgroundColor: 'rgb(241, 194, 86)', color: "white"}} className="font-badge">{config.simbolo_moneda}</Badge></li>
                <li className="d-flex" style={{justifyContent: 'space-between'}}><b><span style={{color: "rgb(203, 44, 67)"}}>*  </span>Mostrar decimales en los precios: </b><Badge style={{backgroundColor: 'rgb(241, 194, 86)', color: "white"}} className="font-badge">{config.active_price_decimals}</Badge></li>
                <li className="d-flex" style={{justifyContent: 'space-between'}}><b><span style={{color: "rgb(203, 44, 67)"}}>*  </span>Cerrar Sesión: </b><Badge style={{backgroundColor: 'rgb(241, 194, 86)', color: "white"}} variant="secondary" className="font-badge">{config.close_session}</Badge></li>
                <li className="d-flex" style={{justifyContent: 'space-between'}}><b><span style={{color: "rgb(203, 44, 67)"}}>*  </span>Actividad Económica: </b><Badge style={{backgroundColor: 'rgb(241, 194, 86)', color: "white"}} className="font-badge">{config.actividad_economica}</Badge></li>
      <li className="d-flex" style={{justifyContent: 'space-between'}}><b><span style={{color: "rgb(203, 44, 67)"}}>*  </span>Giro: </b><Badge style={{backgroundColor: 'rgb(241, 194, 86)', color: "white"}} className="font-badge">{config.giro}</Badge></li>*/}
                <li
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <b>
                    <span style={{ color: "rgb(203, 44, 67)" }}>* </span>Rut del
                    representante legal:{" "}
                  </b>
                  <Badge
                    style={{
                      backgroundColor: "rgb(241, 194, 86)",
                      color: "white",
                    }}
                    className="font-badge"
                  >
                    {config.rut_legal_representative}
                  </Badge>
                </li>
                <li
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <b>
                    <span style={{ color: "rgb(203, 44, 67)" }}>* </span>Clave
                    del representante legal:{" "}
                  </b>
                  <Badge
                    style={{
                      backgroundColor: "rgb(241, 194, 86)",
                      color: "white",
                    }}
                    className="font-badge"
                  >
                    ***********
                  </Badge>
                </li>
                <li
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <b>
                    <span style={{ color: "rgb(203, 44, 67)" }}>* </span>Firma:{" "}
                  </b>
                  <Badge
                    style={{
                      backgroundColor: "rgb(241, 194, 86)",
                      color: "white",
                    }}
                    className="font-badge"
                  >
                    ***************
                  </Badge>
                </li>
                <li
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <b>
                    <span style={{ color: "rgb(203, 44, 67)" }}>* </span>Logo:{" "}
                  </b>
                  {config.logo ? (
                    <Image
                      src={API_URL + "images/enterprise/logo/" + config.logo}
                      width="100px"
                    />
                  ) : (
                    "No ha cargado el logo de su empresa"
                  )}
                </li>
              </ul>
            </Col>
            <Col sm={10} md={5} lg={5}>

              {config.simbolo_moneda ? (
                <Button
                  size="sm"
                  variant="primary"
                  block="true"
                  onClick={updateConfigGeneral}
                >
                  Modificar Configuración General <FaEdit />
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    size="sm"
                    variant="primary"
                    block="true"
                    onClick={createConfigGeneral}
                  >
                    Crear Configuración General <FaPlusCircle />
                  </Button>
                  <br />
                  <p
                    className="text-center"
                    style={{ color: "darkred", fontWeight: "bold" }}
                  >
                    (No posee configuración y debe crearla)
                  </p>
                </React.Fragment>
              )}
              <br />
              {!config.is_syncronized &&
                config.rut_legal_representative &&
                config.clave_sii &&
                config.clave_login_sii &&
                config.username ? (
                <Button
                  variant="danger"
                  size="sm"
                  block={true}
                  onClick={syncSii}
                >
                  Syncronizar con el SII <FaSyncAlt />
                </Button>
              ) : !config.is_syncronized &&
                (!config.rut_legal_representative ||
                  !config.clave_sii ||
                  !config.clave_login_sii ||
                  !config.username) ? (
                <p className="alert alert-danger text-center">
                  <b>
                    Modifique la configuración general y agregue los datos del
                    representante legal para sincronizar con el SII
                  </b>
                </p>
              ) : config.is_syncronized &&
                config.rut_legal_representative &&
                config.clave_sii &&
                config.clave_login_sii ? (
                <p className="alert alert-success text-center">
                  <b>
                    Cuenta Sincronizada con el SII <FaCheck />
                  </b>
                </p>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <ModalConfirmDataDeleteConfigGeneral
            show={isOpenModal}
            onHide={handleClose}
            handleClose={handleClose}
          />
        </Container>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config
  };
}

function mapDispatchToProps() {
  return {
    setConfigRedux: setConfig
  }
}

ConfigGeneralPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  setConfigRedux: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps())(ConfigGeneralPage);
