import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaTrashAlt,
  FaPlusCircle,
  FaUsers,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import { Row, Col, Form, Button, Container, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { setMenu } from "actions/menu";
import InputField from "components/input/InputComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "utils/constants";
import "styles/pages/users.scss";
import { formatRut } from "utils/functions";
import LoadingComponent from "components/LoadingComponent";
let count = 0;

const UserCreatePage = (props) => {
  const [displayLoading, setDisplayLoading] = useState(false);
  const [displayModuleSectionXs, setDisplayModuleSectionXs] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    rut: "",
    password: "",
    id_rol: "",
    password_repeat: "",
  });

  const [enterpriseForm, setEnterpriseForm] = useState({
    name: "",
    address: "",
    is_open: true,
    id: "",
  });

  const [modulesUser, setModulesUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isFormClean, setIsFormClean] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [typeDisplayModule, setTypeDisplayModule] = useState(1);
  const [enterpriseArray, setEntepriseArray] = useState([]);
  const [messageDisplay, setMessageDisplay] = useState("");

  const fetchModules = () => {
    let promises = [
      axios.get(API_URL + "modules"),
      axios.get(API_URL + "roles"),
    ];

    if (props.match.params.id > 0) {
      promises.push(axios.get(API_URL + "user/" + props.match.params.id));
    }

    Promise.all(promises)
      .then((result) => {
        setModules(result[0].data);
        setRoles(result[1].data);

        if (props.match.params.id) {
          setUserData({
            name: result[2].data.user.name,
            email: result[2].data.user.email,
            rut: result[2].data.user.rut,
            password: "",
            id_rol: result[2].data.user.id_rol,
            password_repeat: "",
          });
          if (
            result[2].data.user.id_rol == 3 ||
            result[2].data.user.id_rol == 4
          ) {
            setModulesUser(result[2].data.modules.map((v) => v.id_menu));
          } else if (
            result[2].data.user.id_rol > 4 ||
            result[2].data.user.id_rol <= 2
          ) {
            setTypeDisplayModule(2);
          }
          if (result[2].data.message) setMessageDisplay(result[2].data.message);
          setIsUpdate(true);
        }
        setDisplayLoading(false);
      })
      .catch((err) => {
        setDisplayLoading(false);
        props.tokenExpired(err);
      });
  };

  useEffect(() => {
    fetchModules();
  }, [props.id_enterprise]);

  const onChange = (e) => {
    if (e.target.name === "id_rol") {
      if (e.target.value == 3 || e.target.value == 4 || e.target.value == 1) {
        setTypeDisplayModule(1);
      } else {
        setTypeDisplayModule(3);
      }
      setUserData({ ...userData, [e.target.name]: e.target.value });
    } else if (e.target.name === "rut") {
      setUserData({ ...userData, [e.target.name]: formatRut(e.target.value) });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleAccess = async (e, id) => {
    e.persist();
    if (e.target.checked) {
      await setModulesUser([...modulesUser, id]);
    } else {
      setModulesUser(modulesUser.filter((v) => v != e.target.value));
    }
  };

  const addAllModules = () => {
    let arreglo = modules.map((v) => v.id);
    setModulesUser(arreglo);
  };

  const removeAllModules = () => {
    setModulesUser([]);
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    if (
      modulesUser.length === 0 &&
      (userData.id_rol == 3 || userData.id_rol == 4)
    ) {
      e.stopPropagation();
      setValidated(true);
      toast.error("Debe escoger al menos un módulo para el usuario");
      return;
    }

    let user = Object.assign({}, userData, {
      modules: modulesUser,
    });
    setDisplayLoading(true);
    if (!isUpdate) {
      if (!user.password) {
        toast.error("Debe escribir una contraseña");
        return false;
      }

      if (user.password !== user.password_repeat) {
        toast.error("Las contraseñas no coinciden");
        return false;
      }
    } else {
      if (user.password !== user.password_repeat) {
        toast.error("Las contraseñas no coinciden");
        return false;
      }
    }

    if (user.id_rol >= 4 && user.id_rol <= 7) {
      user.id_sucursal = sessionStorage.getItem("id_sucursal");
    }

    let route = "";
    setDisplayLoading(true);
    if (isUpdate) {
      route =
        user.id_rol >= 3 && user.id_rol <= 7
          ? API_URL + "user_by_branch_office/" + props.match.params.id
          : API_URL + "user/" + props.match.params.id;

      axios
        .put(route, user)
        .then((result) => {
          toast.success("Usuario Modificado");
          renderMenuNew(true);
          setDisplayLoading(false);
        })
        .catch((err) => {
          setDisplayLoading(false);
          props.tokenExpired(err);
        });
    } else {
      route =
        user.id_rol >= 3 && user.id_rol <= 7
          ? API_URL + "user_by_brach_office"
          : API_URL + "user";
      axios
        .post(route, user)
        .then((result) => {
          toast.success("Usuario Registrado");
          renderMenuNew(false);
          setDisplayLoading(false);
        })
        .catch((err) => {
          setDisplayLoading(false);
          props.tokenExpired(err);
        });
    }
  };

  const cleanForm = () => {
    setUserData({
      name: "",
      email: "",
      rut: "",
      password: "",
      id_rol: 1,
    });
    setModulesUser([]);
    setValidated(false);
  };

  const cleanEnterprise = () => {
    setEnterpriseForm({
      name: "",
      address: "",
      is_open: true,
      id: "",
    });
  };

  const goToListUser = () => {
    props.history.replace("/user/list");
  };

  const renderMenuNew = async (type) => {
    const menu = await axios.get(API_URL + "menu_user");
    props.setMenu(menu.data);
    if (type) {
      setTimeout(() => {
        props.history.push("/user/list");
      }, 1000);
    } else {
      props.history.push("/user/list");
    }
  };

  const displayRolesOption = () => {
    if (isUpdate) {
      if (userData.id_rol == 2 || userData.id_rol == 9) {
        return roles.map((v, i) => (
          <option key={i} value={v.id}>
            {v.name_role}
          </option>
        ));
      } else {
        return roles
          .filter((v) => v.id !== 2 && v.id !== 9)
          .map((v, i) => (
            <option key={i} value={v.id}>
              {v.name_role}
            </option>
          ));
      }
    } else {
      return roles
        .filter((v) => v.id !== 2)
        .map((v, i) => (
          <option key={i} value={v.id}>
            {v.name_role}
          </option>
        ));
    }
  };

  const validateFieldsHandler = () => {
    if (!displayModuleSectionXs) {
      const form = document.getElementById("formUsers");
      if (form.checkValidity() === false) {
        setValidated(true);
        return;
      }
    }
    setDisplayModuleSectionXs(currentData => !displayModuleSectionXs);
    setValidated(false);

  }

  const displayFieldsFormHandler = (sizeClassName, type) => {
    return (
      <>
        {type === 1 ? (
          <Col
            sm={12}
            md={typeDisplayModule > 1 ? 12 : 5}
            lg={typeDisplayModule > 1 ? 12 : 5}
            xs={12}
            style={{ borderRight: "1px solid rgb(237, 237, 237)" }}
            className={sizeClassName}
          >
            <h4 className="text-center title_principal">
              Formulario de usuarios
            </h4>
            <br />
            <Row>
              <InputField
                {...props.inputName}
                handleChange={onChange}
                value={userData.name}
              />
              <InputField
                {...props.inputEmail}
                handleChange={onChange}
                value={userData.email}
              />
            </Row>
            <Row>
              <InputField
                {...props.inputRut}
                handleChange={onChange}
                value={userData.rut}
              />
              <InputField
                {...props.inputPassword}
                required={isUpdate ? false : true}
                handleChange={onChange}
                value={userData.password}
              />
            </Row>
            <Row>
              <InputField
                type="password"
                label="Confirme Contraseña"
                name="password_repeat"
                required={isUpdate ? false : true}
                messageErrors={[]}
                cols="col-md-6 col-lg-6 col-sm-6"
                value={userData.password_repeat}
                handleChange={onChange}
              />
              <InputField
                {...props.inputSelect}
                cols={"col-md-6 col-sm-6 col-lg-6"}
                handleChange={onChange}
                value={userData.id_rol}
              >
                <option value="">--Seleccione--</option>
                {displayRolesOption()}
              </InputField>
            </Row>
            <Row className="justify-content-center">
              {typeDisplayModule === 1 ? (
                <Col sm={12} md={12} lg={12} xs={12} className="text-center">
                  <Button size="sm" type="submit" variant="danger" block className="d-none d-md-block">
                    Enviar <FaPlusCircle />
                  </Button>
                  <Button size="sm" type="button" onClick={validateFieldsHandler} variant="danger" block className="d-block d-md-none">
                    Continuar
                  </Button>
                  <Button
                    size="sm"
                    onClick={goToListUser}
                    type="button"
                    variant="secondary"
                    block
                  >
                    Ir al Listado
                  </Button>
                </Col>
              ) : (
                <Col sm={6} md={6} lg={6} xs={12} className="text-center">
                  <Button size="sm" type="submit" variant="danger" block>
                    Enviar <FaPlusCircle />
                  </Button>
                  <Button
                    size="sm"
                    onClick={goToListUser}
                    type="button"
                    variant="secondary"
                    block
                  >
                    Ir al Listado
                  </Button>
                </Col>
              )}
            </Row>
            <br />
            {messageDisplay ? (
              <p className="alert alert-info text-center">{messageDisplay}</p>
            ) : (
              ""
            )}
          </Col>

        ) : (
          <>
            {!displayModuleSectionXs ? (

              <Col
                sm={12}
                md={typeDisplayModule > 1 ? 12 : 5}
                lg={typeDisplayModule > 1 ? 12 : 5}
                xs={12}
                style={{ borderRight: "1px solid rgb(237, 237, 237)" }}
                className={sizeClassName}
              >
                <h4 className="text-center title_principal">
                  Formulario de usuarios
                </h4>
                <br />
                <Row>
                  <InputField
                    {...props.inputName}
                    handleChange={onChange}
                    value={userData.name}
                  />
                  <InputField
                    {...props.inputEmail}
                    handleChange={onChange}
                    value={userData.email}
                  />
                </Row>
                <Row>
                  <InputField
                    {...props.inputRut}
                    handleChange={onChange}
                    value={userData.rut}
                  />
                  <InputField
                    {...props.inputPassword}
                    required={isUpdate ? false : true}
                    handleChange={onChange}
                    value={userData.password}
                  />
                </Row>
                <Row>
                  <InputField
                    type="password"
                    label="Confirme Contraseña"
                    name="password_repeat"
                    required={isUpdate ? false : true}
                    messageErrors={[]}
                    cols="col-md-6 col-lg-6 col-sm-6"
                    value={userData.password_repeat}
                    handleChange={onChange}
                  />
                  <InputField
                    {...props.inputSelect}
                    cols={"col-md-6 col-sm-6 col-lg-6"}
                    handleChange={onChange}
                    value={userData.id_rol}
                  >
                    <option value="">--Seleccione--</option>
                    {displayRolesOption()}
                  </InputField>
                </Row>
                <Row className="justify-content-center">
                  {typeDisplayModule === 1 ? (
                    <Col sm={12} md={12} lg={12} xs={12} className="text-center">
                      <Button size="sm" type="submit" variant="danger" block className="d-none d-md-block">
                        Enviar <FaPlusCircle />
                      </Button>
                      <Button size="sm" type="button" onClick={validateFieldsHandler} variant="danger" block className="d-block d-md-none">
                        Continuar
                      </Button>
                      <Button
                        size="sm"
                        onClick={goToListUser}
                        type="button"
                        variant="secondary"
                        block
                      >
                        Ir al Listado
                      </Button>
                    </Col>
                  ) : (
                    <Col sm={6} md={6} lg={6} xs={12} className="text-center">
                      <Button size="sm" type="submit" variant="danger" block>
                        Enviar <FaPlusCircle />
                      </Button>
                      <Button
                        size="sm"
                        onClick={goToListUser}
                        type="button"
                        variant="secondary"
                        block
                      >
                        Ir al Listado
                      </Button>
                    </Col>
                  )}
                </Row>
                <br />
                {messageDisplay ? (
                  <p className="alert alert-info text-center">{messageDisplay}</p>
                ) : (
                  ""
                )}
              </Col>
            ) : ""}
          </>
        )}
      </>
    )
  };

  return (
    <Container fluid>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Form onSubmit={onSubmit} noValidate validated={validated} id="formUsers">
          <Row>
            {displayFieldsFormHandler("d-none d-md-block", 1)}
            {displayFieldsFormHandler("d-block d-md-none", 2)}
            {typeDisplayModule == 1 ? (
              <>
                <Col
                  md={7}
                  lg={7}
                  className="containerDivSeparated d-none d-md-block"
                  style={{ height: "auto" }}
                >
                  <h4 className="text-center title_principal">Módulos</h4>
                  <Row>
                    {modules.map((v, i) => (
                      <Col sm={4} md={4} lg={4} xs={6} key={i}>
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            custom
                            id={v.name_item + v.id}
                            label={v.name_item}
                            value={v.id}
                            checked={!!modulesUser.find((f) => f == v.id)}
                            onChange={(e) => handleAccess(e, v.id)}
                          />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                  <Row className="fixedBottom">
                    <Col sm={12} md={12} lg={12}>
                      <p className="text-center">
                        Hacer click en el botón enviar para guardar los cambios
                      </p>
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={12}>
                      <Button
                        size="sm"
                        variant="secondary"
                        block={true}
                        onClick={addAllModules}
                      >
                        Seleccionar Todos <FaCheckCircle />
                      </Button>
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={12}>
                      <Button
                        size="sm"
                        variant="secondary"

                        block={true}
                        onClick={removeAllModules}
                      >
                        Deseleccionar Todos <FaTrashAlt />
                      </Button>
                    </Col>
                  </Row>
                </Col>
                {displayModuleSectionXs ? (
                  <Col
                    sm={12}
                    xs={12}
                    className="containerDivSeparated d-block d-md-none"
                    style={{ height: "auto" }}
                  >
                    <h4 className="text-center title_principal">Módulos</h4>
                    <Row className="text-center">
                      {modules.map((v, i) => (
                        <Col sm={4} md={4} lg={4} xs={5} key={i}>
                          <Form.Group>
                            <Form.Check
                              type="checkbox"
                              custom
                              id={v.name_item + v.id}
                              label={v.name_item}
                              value={v.id}
                              checked={!!modulesUser.find((f) => f == v.id)}
                              onChange={(e) => handleAccess(e, v.id)}
                            />
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>
                    <Row className="fixedBottom">
                      <Col sm={12} md={12} lg={12}>
                        <p className="text-center d-none d-md-block">
                          Hacer click en el botón enviar para guardar los cambios
                        </p>
                      </Col>
                      <Col sm={6} md={6} lg={6} xs={6}>
                        <Row>
                          <Col xs={12} sm={12} className="mb-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              block={true}
                              onClick={addAllModules}
                            >
                              Seleccionar Todos <FaCheckCircle />
                            </Button>
                          </Col>
                          <Col xs={12} sm={12}>
                            <Button
                              size="sm"
                              variant="secondary"
                              block={true}
                              onClick={removeAllModules}
                            >
                              Deseleccionar Todos <FaTrashAlt />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={6} md={6} lg={6} xs={6}>
                        <Row>
                          <Col xs={12} sm={12} className="mb-2">
                            <Button size="sm" type="submit" variant="danger" block className="">
                              Enviar <FaPlusCircle />
                            </Button>
                          </Col>
                          <Col xs={12} sm={12}>
                            <Button
                              size="sm"
                              onClick={() => setDisplayModuleSectionXs(false)}
                              type="button"
                              variant="secondary"
                              block
                            >
                              Atrás
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ) : ""}
              </>
            ) : (
              ""
            )}
          </Row>
        </Form>
      )}
    </Container>
  );
};

UserCreatePage.defaultProps = {
  inputName: {
    type: "text",
    required: true,
    name: "name",
    label: "Nombre Completo",
    messageErrors: ["Requerido"],
    cols: "col-sm-6 col-md-6 col-lg-6 col-xs-6",
  },
  inputEmail: {
    type: "email",
    required: true,
    name: "email",
    label: "Email",
    messageErrors: ["Requerido, ", "Formato tipo Email*"],
    cols: "col-sm-6 col-md-6 col-lg-6 col-xs-6",
  },
  inputRut: {
    type: "text",
    required: true,
    name: "rut",
    label: "Documento Identidad",
    messageErrors: ["Requerido*"],
    cols: "col-sm-6 col-md-6 col-lg-6 col-xs-6",
  },
  inputPassword: {
    type: "password",
    name: "password",
    label: "Contraseña",
    messageErrors: ["Requerido"],
    cols: "col-sm-6 col-md-6 col-lg-6 col-xs-6",
  },
  inputSelect: {
    type: "select",
    required: true,
    name: "id_rol",
    label: "Rol",
    messageErrors: ["Requerido*"],
  },
};

UserCreatePage.propTypes = {
  setMenu: PropTypes.func.isRequired,
  id_enterprise: PropTypes.string.isRequired,
};

function mapDispatchToProps() {
  return {
    setMenu,
  };
}

function mapStateToProps(state) {
  return {
    id_enterprise: state.enterpriseSucursal.id_enterprise,
  };
}

export default connect(mapStateToProps, mapDispatchToProps())(UserCreatePage);
