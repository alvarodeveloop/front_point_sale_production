import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Image,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL } from "utils/constants";

import {
  setBranchOffices,
  setIdBranchOffice,
} from "actions/enterpriseSucursal";
import { setConfigStore } from "actions/configs";
import BranchOfficeFormModal from "components/modals/BranchOfficeFormModal";
import LoadingComponent from "components/LoadingComponent";
import 'styles/pages/branchOfficePage.scss';

const BranchOfficePage = (props) => {
  const [globalState, setGlobalState] = useState({
    configStore: [],
    isOpenModalAdd: false,
    titleModal: "",
    requiredInput: false,
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
    branchOffice: [],
    isLoading: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [props.id_enterprise]);

  const fetchData = (type = false, update = false) => {
    setGlobalState({ ...globalState, isLoading: true });
    let promises = [axios.get(API_URL + "branch_office")];

    Promise.all(promises)
      .then(async (result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            branchOffice: result[0].data,
            isLoading: false,
          });
        });

        props.setBranchOffices(result[0].data);
        if (type) {
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
            }
          }
        }
      })
      .catch((err) => {
        setGlobalState({ ...globalState, isLoading: false });
        props.tokenExpired(err);
      });
  };

  const handleOpenModalAdd = () => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        isOpenModalAdd: !globalState.isOpenModalAdd,
      });
    });
  };

  const updateRegister = (values) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        branchOfficeForm: {
          name: values.name,
          is_open: values.is_open,
          id: values.id,
        },
        userForm: values.user.length
          ? {
            email: values.user[0].email,
            password: "",
            password_repeat: "",
            rut: values.user[0].rut,
            name: values.user[0].name,
            phone: values.user[0].phone,
            id: values.user[0].id,
            id_rol: values.user[0].id_rol,
          }
          : currentState.userForm,
        titleModal: "Modificar Sucursal " + values.name,
        requiredInput: false,
      });
    });
    handleOpenModalAdd();
  };

  const createRegister = () => {
    setGlobalState({
      ...globalState,
      titleModal: "Crear Sucursal",
    });

    handleOpenModalAdd();
  };

  return (
    <Container fluid>
      {globalState.isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Sucursales</h4>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Button
                variant="success"
                block={true}
                onClick={createRegister}
                size="sm"
              >
                Agregar Sucursal <FaPlusCircle />
              </Button>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            {globalState.branchOffice.map((v, i) => (
              <Col sm={6} lg={4} xl={3} md={4} xs={10} className="text-center mb-4 mb-sm-2 mb-md-0" key={i}>
                <h5 style={{ color: "rgb(180, 55, 33)" }}>{v.name}</h5>
                <Image
                  src={require("../assets/img/sucursal.png")}
                  className="widthImage"
                />
                <br />
                Estado :{" "}
                {v.is_open ? (
                  <Badge variant="success" className="font_badge">
                    Abierta
                  </Badge>
                ) : (
                  <Badge variant="danger" className="font_badge">
                    Cerrada
                  </Badge>
                )}
                <DropdownButton
                  size="sm"
                  id={"fila" + i}
                  title="Acciones"
                  style={{ width: "100%", marginTop: "15px" }}
                  variant="primary"
                >
                  <Dropdown.Item onClick={() => updateRegister(v)}>
                    Modificar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => { }}>Eliminar</Dropdown.Item>
                </DropdownButton>
              </Col>
            ))}
          </Row>
        </>
      )}
      <BranchOfficeFormModal
        branchOfficeForm={globalState.branchOfficeForm}
        setGlobalState={setGlobalState}
        userForm={globalState.userForm}
        handleOpenModalAdd={handleOpenModalAdd}
        isOpenModalAdd={globalState.isOpenModalAdd}
        titleModal={globalState.titleModal}
        requiredInput={globalState.requiredInput}
        fetchData={fetchData}
        isBranchOffice={true}
        menu={props.modules}
      />
    </Container>
  );
};

BranchOfficePage.propTypes = {
  setBranchOffices: PropTypes.func.isRequired,
  id_branch_office: PropTypes.any.isRequired,
  id_enterprise: PropTypes.any.isRequired,
  setIdBranchOffice: PropTypes.func.isRequired,
  setConfigStore: PropTypes.func.isRequired,
};

function mapDispatchToProps() {
  return {
    setBranchOffices,
    setIdBranchOffice,
    setConfigStore,
  };
}

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    modules: state.menu.modules,
  };
}

export default connect(mapStateToProps, mapDispatchToProps())(BranchOfficePage);
