import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Image,
  Accordion,
  Card,
} from "react-bootstrap";
import InputField from "components/input/InputComponent";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { API_URL } from "utils/constants";
import "styles/components/modalComponents.scss";
import { formatRut } from "utils/functions";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingComponent from "components/LoadingComponent";

let count = 1;

const BranchOfficeFormModal = (props) => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (props.isOpenModalAdd) {
      if (props.titleModal === "Crear Sucursal") {
        cleanForm();
      }
    }
  }, [props.isOpenModalAdd]);
  const [validated, setValidated] = useState(false);

  const onChange = (e) => {
    e.persist();

    props.setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        branchOfficeForm: {
          ...currentState.branchOfficeForm,
          [e.target.name]:
            e.target.name === "is_open" ? e.target.checked : e.target.value,
        },
      });
    });
  };

  const onChangeUser = (e) => {
    e.persist();

    props.setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        userForm: {
          ...currentState.userForm,
          [e.target.name]:
            e.target.name === "rut"
              ? formatRut(e.target.value)
              : e.target.value,
        },
      });
    });
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    let dataBranch = Object.assign({}, props.branchOfficeForm);
    let dataUser = Object.assign({}, props.userForm);

    if (dataUser.password !== dataUser.password_repeat) {
      toast.error("Error, las contraseñas no coinciden");
      return false;
    }

    setIsloading(true);
    if (props.isBranchOffice) {
      if (dataBranch.id) {
        axios
          .put(API_URL + "branch_office/" + dataBranch.id, dataBranch)
          .then((result) => {
            let validateUser = validate_user(dataUser);
            if (validateUser.validate) {
              if (validateUser.required) {
                setIsloading(false);
                toast.error("Todos los campos del usuario son requeridos");
                return false;
              }
              axios
                .put(API_URL + "user_by_branch_office/" + dataUser.id, dataUser)
                .then((result) => {
                  toast.success("Sucursal Modificada");
                  cleanForm();
                  props.handleOpenModalAdd();
                  if (
                    parseInt(
                      JSON.parse(sessionStorage.getItem("user")).id_rol,
                      10
                    ) === 2
                  ) {
                    props.fetchData(true, true);
                  } else {
                    props.fetchData();
                  }
                  setIsloading(false);
                })
                .catch((err) => {
                  setIsloading(false);
                  const { response } = err;
                  if (response) {
                    toast.error(response.data.message);
                  } else {
                    toast.error("Error, contacte con soporte");
                  }
                });
            } else {
              toast.success("Sucursal Modificada");
              cleanForm();
              props.handleOpenModalAdd();
              if (
                parseInt(
                  JSON.parse(sessionStorage.getItem("user")).id_rol,
                  10
                ) === 2
              ) {
                props.fetchData(true, true);
              } else {
                props.fetchData();
              }
              setIsloading(false);
            }
          })
          .catch((err) => {
            setIsloading(false);
            const { response } = err;
            if (response) {
              toast.error(response.data.message);
            } else {
              toast.error("Error, contacte con soporte");
            }
          });
      } else {
        let validateUser = validate_user(dataUser);
        if (validateUser.validate) {
          if (validateUser.required) {
            toast.error("Todos los campos del usuario son requeridos");
            return false;
          }

          dataUser.branch = dataBranch;
          axios
            .post(API_URL + "user_and_branch_office", dataUser)
            .then((result) => {
              toast.success("Sucursal Creada con éxito");
              cleanForm();
              props.handleOpenModalAdd();
              count++;
              if (
                parseInt(
                  JSON.parse(sessionStorage.getItem("user")).id_rol,
                  10
                ) === 2 &&
                count > 1 &&
                count < 3
              ) {
                props.fetchData(true);
              } else {
                props.fetchData();
              }
              setIsloading(false);
            })
            .catch((err) => {
              setIsloading(false);
              const { response } = err;
              if (response) {
                toast.error(response.data.message);
              } else {
                toast.error("Error, contacte con soporte");
              }
            });
        } else {
          axios
            .post(API_URL + "branch_office", dataBranch)
            .then((result) => {
              toast.success("Sucursal Creada con éxito");
              cleanForm();
              props.handleOpenModalAdd();
              count++;
              if (
                parseInt(
                  JSON.parse(sessionStorage.getItem("user")).id_rol,
                  10
                ) === 2 &&
                count > 1 &&
                count < 3
              ) {
                props.fetchData(true);
              } else {
                props.fetchData();
              }
              setIsloading(false);
            })
            .catch((err) => {
              setIsloading(false);
              if (err.response) {
                toast.error(err.response.data.message);
              } else {
                console.log(err);
                toast.error("Error, contacte con soporte");
              }
            });
        }
      }
    } else {
      let validateUser = validate_user(dataUser);
      if (validateUser.validate) {
        if (validateUser.required) {
          toast.error("Todos los campos del usuario son requeridos");
          return false;
        }
        if (modules.length === 0) {
          toast.error(
            "Debe seleccionar los módulos del administrador, si después de la creación desea cambiarlos debe ir al módulo de usuarios"
          );
          return false;
        }
        dataUser.branch = dataBranch;
        dataUser.modules = [...modules];
        axios
          .post(API_URL + "user_and_branch_office", dataUser)
          .then((result) => {
            toast.success("Sucursal Creada con éxito");
            cleanForm();
            props.handleOpenModalAdd();
            count++;
            if (
              parseInt(
                JSON.parse(sessionStorage.getItem("user")).id_rol,
                10
              ) === 2 &&
              count > 1 &&
              count < 3
            ) {
              props.fetchData(true);
            } else {
              props.fetchData();
            }
            setIsloading(false);
          })
          .catch((err) => {
            setIsloading(false);
            const { response } = err;
            if (response) {
              toast.error(response.data.message);
            } else {
              toast.error("Error, contacte con soporte");
            }
          });
      } else {
        axios
          .post(API_URL + "branch_office", dataBranch)
          .then((result) => {
            toast.success("Sucursal Creada con éxito");
            cleanForm();
            props.handleOpenModalAdd();
            count++;
            if (
              parseInt(
                JSON.parse(sessionStorage.getItem("user")).id_rol,
                10
              ) === 2 &&
              count > 1 &&
              count < 3
            ) {
              props.fetchData(true);
            } else {
              props.fetchData();
            }
            setIsloading(false);
          })
          .catch((err) => {
            setIsloading(false);
            if (err.response) {
              toast.error(err.response.data.message);
            } else {
              console.log(err);
              toast.error("Error, contacte con soporte");
            }
          });
      }
    }
  };

  const validate_user = (userDatos) => {
    let validate = false;
    let required = false;
    Object.keys(userDatos).forEach((item, i) => {
      if (
        userDatos[item] !== "" &&
        userDatos[item] !== null &&
        item !== "id_rol"
      ) {
        validate = true;
      } else if (
        validate === true &&
        !userDatos[item] &&
        item !== "id_rol" &&
        item !== "id"
      ) {
        required = true;
      }
    });
    return {
      validate,
      required,
    };
  };

  const cleanForm = () => {
    props.setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
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
        branchOfficeForm: {
          name: "",
          id: "",
          is_open: true,
        },
        requiredInput: false,
      });
    });
    setValidated(false);
  };

  const addAllModules = () => {
    let arreglo = props.menu.map((v) => v.id);
    setModules(arreglo);
  };

  const removeAllModules = () => {
    setModules([]);
  };

  const handleAccess = (e, id) => {
    e.persist();
    if (e.target.checked) {
      setModules([...modules, id]);
    } else {
      setModules(modules.filter((v) => v != e.target.value));
    }
  };

  return (
    <Modal
      show={props.isOpenModalAdd}
      onHide={props.handleOpenModalAdd}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.titleModal}
          &nbsp;&nbsp;
          <Image
            src={require("../../assets/img/sucursal.png")}
            style={{ width: "50px" }}
          />
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <Modal.Body>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <h4 className="title_principal">Datos de la Sucursal</h4>
                </Col>
              </Row>
              <hr />
              <Row>
                <InputField
                  type="text"
                  label="Nombre Sucursal"
                  name="name"
                  required={true}
                  messageErrors={["Requerido*"]}
                  cols="col-md-4 col-lg-4 col-sm-4"
                  value={props.branchOfficeForm.name}
                  handleChange={onChange}
                />
                <Col sm={4} md={4} lg={4}>
                  <br />
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      custom
                      id={"is_open"}
                      name={"is_open"}
                      label={"Activa"}
                      value={props.branchOfficeForm.is_open}
                      checked={props.branchOfficeForm.is_open}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {!props.branchOfficeForm.id ? (
                <Row className="d-none d-md-flex">
                  <Col sm={12} md={12} lg={12}>
                    <Accordion>
                      <Card>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="0"
                          className="header_card"
                        >
                          <b>Datos del administrador de la sucursal</b> ( No es
                          requerido para crear la sucursal, hacer click para
                          desplegar )
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <Row>
                              <Col sm={12} md={12} lg={12}>
                                <h4 className="title_principal">
                                  Datos del Administrador de la Sucursal
                                </h4>
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <InputField
                                type="text"
                                label="Nombre Completo"
                                name="name"
                                required={false}
                                messageErrors={["Requerido*"]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.name}
                                handleChange={onChangeUser}
                              />
                              <InputField
                                type="text"
                                label="Rut"
                                name="rut"
                                required={false}
                                messageErrors={["Requerido*"]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.rut}
                                handleChange={onChangeUser}
                              />
                              <InputField
                                type="email"
                                label="Email"
                                name="email"
                                required={false}
                                autoComplete={"new-password"}
                                messageErrors={[
                                  "Requerido* ",
                                  "Formato Tipo Email*",
                                ]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.email}
                                handleChange={onChangeUser}
                              />
                            </Row>
                            <Row>
                              <InputField
                                type="number"
                                label="Fono"
                                name="phone"
                                required={false}
                                messageErrors={[]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.phone}
                                handleChange={onChangeUser}
                              />
                              <InputField
                                type="password"
                                label="Contraseña"
                                name="password"
                                required={props.requiredInput}
                                autoComplete={"new-password"}
                                messageErrors={["Requerido*"]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.password}
                                handleChange={onChangeUser}
                              />
                              <InputField
                                type="password"
                                label="Repita Contraseña"
                                name="password_repeat"
                                required={props.requiredInput}
                                messageErrors={["Requerido*"]}
                                cols="col-md-4 col-lg-4 col-sm-4"
                                value={props.userForm.password_repeat}
                                handleChange={onChangeUser}
                              />
                            </Row>
                            <Row>
                              <Col sm={12} md={12} lg={12}>
                                <Accordion>
                                  <Card>
                                    <Accordion.Toggle
                                      as={Card.Header}
                                      eventKey="1"
                                      className="header_card"
                                    >
                                      <b>Modulos para el administrador</b> (
                                      hacer click para desplegar )
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                      <Card.Body>
                                        <Row>
                                          {props.menu.map((v, i) => (
                                            <Col
                                              sm={4}
                                              md={4}
                                              lg={4}
                                              xs={6}
                                              key={i}
                                            >
                                              <Form.Group>
                                                <Form.Check
                                                  type="checkbox"
                                                  custom
                                                  id={v.name_item + v.id}
                                                  label={v.name_item}
                                                  value={v.id}
                                                  checked={
                                                    !!modules.find(
                                                      (f) => f == v.id
                                                    )
                                                  }
                                                  onChange={(e) =>
                                                    handleAccess(e, v.id)
                                                  }
                                                />
                                              </Form.Group>
                                            </Col>
                                          ))}
                                        </Row>
                                        <Row className="">
                                          <Col sm={6} md={6} lg={6} xs={12}>
                                            <Button
                                              size="sm"
                                              variant="danger"
                                              block={true}
                                              onClick={addAllModules}
                                            >
                                              Seleccionar Todos{" "}
                                              <FaCheckCircle />
                                            </Button>
                                          </Col>
                                          <Col sm={6} md={6} lg={6} xs={12}>
                                            <Button
                                              size="sm"
                                              variant="danger"
                                              block={true}
                                              onClick={removeAllModules}
                                            >
                                              Deseleccionar Todos <FaTrash />
                                            </Button>
                                          </Col>
                                        </Row>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                </Accordion>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <hr />
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4} xs={6}>
                  <Button
                    block={true}
                    variant="danger"
                    size="sm"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Col>
                {props.isBranchOffice ? (
                  <Col sm={4} md={4} lg={4} xs={6}>
                    <Button
                      block={true}
                      variant="secondary"
                      size="sm"
                      onClick={props.handleOpenModalAdd}
                      type="button"
                    >
                      Cerrar
                    </Button>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </Modal.Body>
          )}
        </>
      </Form>
    </Modal>
  );
};

BranchOfficeFormModal.propTypes = {
  branchOfficeForm: PropTypes.object.isRequired,
  userForm: PropTypes.object.isRequired,
  handleOpenModalAdd: PropTypes.func.isRequired,
  isOpenModalAdd: PropTypes.bool.isRequired,
  fetchData: PropTypes.func,
  requiredInput: PropTypes.bool.isRequired,
  isBranchOffice: PropTypes.bool,
  menu: PropTypes.array.isRequired,
};

export default BranchOfficeFormModal;
