import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Image,
  Navbar,
  Nav,
  Dropdown,
  Modal,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import {
  setEnterprises,
  setBranchOffices,
  setIdEnterprise,
  setIdBranchOffice,
} from "actions/enterpriseSucursal";
import { setMenu } from "actions/menu";
import layoutHelpers from "./helpers";
import InputField from "components/input/InputComponent";
import axios from "axios";
import { API_URL } from "utils/constants";
import styled from "styled-components";
import { setConfigStore, setConfig } from "actions/configs";
import { setAuthorizationToken } from "utils/functions";
import { FaUser, FaSearch } from "react-icons/fa";
import "styles/components/modalComponents.scss";
import 'styles/components/navBar.scss';

const LayoutNavbar = (props) => {
  const [isRTL, setIsRTL] = useState(
    document.documentElement.getAttribute("dir") === "rtl"
  );
  const [isOpenModalSucursal, setIsOpenModalSucursal] = useState(
    false
  );
  const [objectMessage, setObjectMessage] = useState({
    displayMessage: false,
    borderSuccess: false,
  });
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(() => {
    if (props.displayMessageNav) {
      setObjectMessage({
        displayMessage: true,
        borderSuccess: true,
      });
    } else {
      setObjectMessage({
        displayMessage: false,
        borderSuccess: false,
      });
    }
  }, [props.displayMessageNav]);
  const toggleSidenav = (e) => {
    e.preventDefault();
    layoutHelpers.toggleCollapsed();
  };

  const handleSelectEnterpriseBranch = async (e, type) => {
    e.persist();
    let val = e.target.value ? e.target.value : false;
    if (isOpenModalSucursal) setIsOpenModalSucursal(false);

    setObjectMessage({ ...objectMessage, displayMessage: true });
    try {
      if (type === "enterprise") {
        let branch = await axios.get(
          API_URL + "enterprises_branch_office/" + val
        );
        props.setBranchOffices(branch.data.branchOffices);
        props.setIdBranchOffice("");
        if (branch.data.menu) {
          props.setMenu(branch.data.menu);
        }
        sessionStorage.setItem("id_enterprise", val);
        if (val) {
          sessionStorage.setItem(
            "configGeneral",
            JSON.stringify(branch.data.config)
          );
          props.setConfig(branch.data.config);
        } else {
          sessionStorage.removeItem("configGeneral");
          props.setConfig({});
        }
        props.setIdEnterprise(val);
        if (branch.data.token) {
          sessionStorage.setItem("token", branch.data.token);
          setAuthorizationToken(branch.data.token);
        }
        setObjectMessage({ displayMessage: false, borderSuccess: true });
        setTimeout(function () {
          setObjectMessage({ ...objectMessage, borderSuccess: false });
        }, 1000);
      } else {
        let branch = await axios.get(
          API_URL + "enterprises_branch_office/" + null + "/" + val + "/" + 1
        );
        sessionStorage.setItem("id_branch_office", val);
        if (val) {
          sessionStorage.setItem(
            "configStore",
            JSON.stringify(branch.data.config)
          );
          props.setConfigStore(branch.data.config);
        } else {
          sessionStorage.removeItem("configStore");
          props.setConfigStore({});
        }
        props.setIdBranchOffice(val);
        setObjectMessage({ displayMessage: false, borderSuccess: true });
        setTimeout(function () {
          setObjectMessage({ ...objectMessage, borderSuccess: false });
        }, 1000);
      }
    } catch (e) {
      setObjectMessage({ ...objectMessage, displayMessage: false });
      props.logoutByToken(e);
      console.log(e);
      //toast.error('Error, si este error persiste contacte con soporte')
    }
  };

  const displayTutoModalHandler = (e) => {
    if (!e.target.value) {
      return;
    }

    let videoSelected = props.videosTutorial.find(
      (v) => +v.id === +e.target.value
    );
    if (isOpenModalSucursal) setIsOpenModalSucursal(false);
    displayModalHandler();

    setTimeout(() => {
      let videoTag = document.getElementById("containerIframe");
      let descriptionTag = document.getElementById("descriptionVideoTag");
      if (videoTag && descriptionTag) {
        videoTag.innerHTML = videoSelected.link;
        descriptionTag.innerText = videoSelected.description;
      } else {
        setTimeout(() => {
          videoTag = document.getElementById("containerIframe");
          videoTag.innerHTML = videoSelected.link;
          descriptionTag = document.getElementById("descriptionVideoTag");
          descriptionTag.innerText = videoSelected.description;
        }, 1500);
      }
    }, 2000);
  };

  const displayModalHandler = () => {
    setDisplayModal(!displayModal);
  };

  const openModalSucursalHandler = () => {
    setIsOpenModalSucursal(!isOpenModalSucursal);
  }

  return (
    <>
      <Navbar
        bg={props.navbarBg}
        expand="md"
        className={`layout-navbar align-items-center justify-content-between container-p-x ${!objectMessage.borderSuccess ? "" : "border_success"
          }`}
        style={{ height: "80px" }}
      >
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="imageRotateHorizontal">
          <Image
            src={require("../../assets/img/logo/AIDY_BETA.jpg")}
            width="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        {/* Sidenav toggle */}
        {props.sidenavToggle && (
          <Nav className="align-items-lg-center toggleButtonMargin">
            <Nav.Item
              as="a"
              className="nav-item nav-link px-0 ml-2 ml-lg-0"
              href="#toggle"
              onClick={toggleSidenav}
            >
              <i className="ion ion-md-menu text-large align-middle"></i>
            </Nav.Item>
          </Nav>
        )}

        {/* Navbar toggle */}
        {objectMessage.displayMessage ? (
          <Nav>
            <Nav.Item>
              <p style={{ color: "rgb(200, 67, 28)" }}>
                Actualizando el sistema, espere por favor...{" "}
                <Image
                  src={require("../../assets/img/loading.gif")}
                  style={{ width: "10px" }}
                />
              </p>
            </Nav.Item>
          </Nav>
        ) : (
          ""
        )}
        <Nav
          style={{
            paddingLeft: "100px",
            display: props.videosTutorial.length ? "block" : "none",
          }}
          className="d-none d-lg-block"
        >
          <Nav.Item
            className="nav-item nav-link px-0 ml-9 ml-lg-0"
            style={{ width: "200px" }}
          >
            <InputField
              type="select"
              label={
                <span style={{ color: "rgb(198, 69, 41)" }}>Tutoriales</span>
              }
              name="tutoNavbar"
              required={false}
              messageErrors={[]}
              cols="col-12"
              handleChange={(e) => displayTutoModalHandler(e)}
            >
              <option value="">--Seleccione--</option>
              {props.videosTutorial.map((v, i) => (
                <option key={i} value={v.id}>
                  {v.name}
                </option>
              ))}
            </InputField>
          </Nav.Item>
        </Nav>
        <Nav className="align-items-lg-center ml-auto d-none d-lg-flex">
          <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">
            |
          </div>
          {props.userConnect &&
            (props.userConnect.id_rol == 2 || props.userConnect.id_rol == 9) ? (
            <React.Fragment>
              <Nav.Item
                className="nav-item nav-link px-0 ml-2 ml-lg-0"
                style={{ width: "200px" }}
              >
                <InputField
                  type="select"
                  label={
                    <span style={{ color: "rgb(198, 69, 41)" }}>
                      Empresas
                    </span>
                  }
                  name="enterprise"
                  required={false}
                  value={props.enterpriseSucursal.id_enterprise}
                  messageErrors={[]}
                  cols="col-md-12 col-lg-12 col-sm-12"
                  handleChange={(e) =>
                    handleSelectEnterpriseBranch(e, "enterprise")
                  }
                >
                  {props.enterpriseSucursal.enterprises.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.bussines_name}
                    </option>
                  ))}
                </InputField>
              </Nav.Item>
              <Nav.Item
                className="nav-item nav-link px-0 ml-2 ml-lg-0"
                style={{ width: "200px" }}
              >
                <InputField
                  type="select"
                  label={
                    <span style={{ color: "rgb(198, 69, 41)" }}>
                      Sucursales
                    </span>
                  }
                  name="branch_office"
                  required={false}
                  value={props.enterpriseSucursal.id_branch_office}
                  messageErrors={[]}
                  cols="col-md-12 col-lg-12 col-sm-12"
                  handleChange={(e) =>
                    handleSelectEnterpriseBranch(e, "branch_office")
                  }
                >
                  <option value={""}>--Seleccione--</option>
                  {props.enterpriseSucursal.branchOffices.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </InputField>
              </Nav.Item>
            </React.Fragment>
          ) : (
            ""
          )}
        </Nav>
        <Nav className="align-items-center justify-content-center  d-lg-none d-block">
          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip id="tooltipConfigPrice">
                hacer click para ver las empresas, sucursales y tutoriales disponibles
              </Tooltip>
            }
          >
            <Button variant="secondary" onClick={openModalSucursalHandler} className="buttonNavbar" size="sm">
              <span className="d-block d-sm-none"><FaSearch /></span>
              <span className="d-none d-sm-block d-md-none">Sucursales <FaSearch /></span>
              <span className="d-none d-md-block">Ver sucursales y tutoriales</span>
            </Button>
          </OverlayTrigger>
        </Nav>
        <Nav>
          <Dropdown
            as={Nav.Item}
            className="demo-navbar-user floatinUserIcon"
            alignRight={isRTL}
            drop="down"
          >
            <Dropdown.Toggle as={Nav.Link}>
              <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                <img
                  src={`${process.env.PUBLIC_URL}/add_client.png`}
                  className="d-block ui-w-30 rounded-circle"
                  alt="User"
                />
                <span className="px-1 mr-lg-2 ml-2 ml-lg-0 d-none d-md-block">
                  {props.userConnect.email}
                </span>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ position: "absolute" }}>
              <Dropdown.Item
                hred="#"
                onClick={() => props.history.replace("/profile")}
              >
                <FaUser className="text-primary" /> &nbsp; Perfil
              </Dropdown.Item>
              <Dropdown.Item hred="#" onClick={props.logoutUser}>
                <i className="ion ion-ios-log-out text-danger"></i> &nbsp;
                Salir
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
      <Modal
        show={displayModal}
        onHide={displayModalHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Modal de video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="text-center" id="containerIframe"></Col>
          </Row>
          <br />
          <Row>
            <Col>
              <p
                id="descriptionVideoTag"
                style={{ fontSize: "16px" }}
                className="text-center"
              ></p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="md"
            onClick={displayModalHandler}
            type="button"
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isOpenModalSucursal}
        onHide={openModalSucursalHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Modal de sucursales y tutoriales
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <InputField
                type="select"
                label={
                  <span style={{ color: "rgb(198, 69, 41)" }}>
                    Empresas
                  </span>
                }
                name="enterprise"
                required={false}
                value={props.enterpriseSucursal.id_enterprise}
                messageErrors={[]}
                cols="col-md-12 col-lg-12 col-sm-12"
                handleChange={(e) =>
                  handleSelectEnterpriseBranch(e, "enterprise")
                }
              >
                {props.enterpriseSucursal.enterprises.map((v, i) => (
                  <option key={i} value={v.id}>
                    {v.bussines_name}
                  </option>
                ))}
              </InputField>
            </Col>
            <Col>
              <InputField
                type="select"
                label={
                  <span style={{ color: "rgb(198, 69, 41)" }}>
                    Sucursales
                  </span>
                }
                name="branch_office"
                required={false}
                value={props.enterpriseSucursal.id_branch_office}
                messageErrors={[]}
                cols="col-md-12 col-lg-12 col-sm-12"
                handleChange={(e) =>
                  handleSelectEnterpriseBranch(e, "branch_office")
                }
              >
                <option value={""}>--Seleccione--</option>
                {props.enterpriseSucursal.branchOffices.map((v, i) => (
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </InputField>
            </Col>
          </Row>
          {props.videosTutorial.length ? (

            <Row>
              <Col sm={8} md={8} xs={10}>
                <InputField
                  type="select"
                  label={
                    <span style={{ color: "rgb(198, 69, 41)" }}>Tutoriales</span>
                  }
                  name="tutoNavbar"
                  required={false}
                  messageErrors={[]}
                  cols="col-12"
                  handleChange={(e) => displayTutoModalHandler(e)}
                >
                  <option value="">--Seleccione--</option>
                  {props.videosTutorial.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </InputField>
              </Col>
            </Row>
          ) : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="md"
            onClick={openModalSucursalHandler}
            type="button"
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool,
  setEnterprises: PropTypes.func.isRequired,
  setBranchOffices: PropTypes.func.isRequired,
  setIdEnterprise: PropTypes.func.isRequired,
  setIdBranchOffice: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setConfigStore: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  videosTutorial: PropTypes.array,
};

LayoutNavbar.defaultProps = {
  sidenavToggle: true,
};

function mapDispatchToProps() {
  return {
    setEnterprises,
    setBranchOffices,
    setIdEnterprise,
    setIdBranchOffice,
    setConfig,
    setConfigStore,
    setMenu,
  };
}

export default connect(
  (store) => ({
    navbarBg: store.theme.navbarBg,
    userConnect: store.auth.user,
    enterpriseSucursal: store.enterpriseSucursal,
    displayMessageNav: store.menu.displayMessageNav,
    videosTutorial: store.videoTutorial.videos,
  }),
  mapDispatchToProps()
)(LayoutNavbar);
