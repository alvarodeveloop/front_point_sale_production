import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Accordion, Card, Col, Button, Form } from "react-bootstrap";
import {
  FaSearch,
  FaPlusCircle,
  FaTrashAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import InputField from "components/input/InputComponent";
import AutoCompleteClientComponent from "components/AutoCompleteClientComponent";
import { toast } from "react-toastify";
import axios from "axios";
import { formatRut } from "utils/functions";
import { API_URL, API_FACTURACION } from "utils/constants";
import LoadingComponent from "components/LoadingComponent";
import {
  arrayCotizacion,
  arraySaleNote,
  arrayBoleta,
  arrayGuide,
  arrayInvoice,
} from "utils/constants";

const ClientInvoiceComponet = (props) => {
  const [rutFacturacionClientSearch, setRutFacturacionClientSearch] =
    useState("");
  const [resetValueClient, setResetValueClient] = useState(false);
  const [clientDetail, setClientDetail] = useState({});
  const [readonlyRut, setReadonlyRut] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  let arrayInvoiceMerge = [...arraySaleNote, ...arrayInvoice];

  useEffect(() => {
    if (props.cotizationData.searchReceptorDefault) {
      searchClientByApiFacturacionInvoice(props.cotizationData.rut_client);
    }
  }, [props.cotizationData.searchReceptorDefault]);

  useEffect(() => { }, []);

  const onChange = (e) => {
    if (
      e.target.name === "type_api" ||
      e.target.name === "total_with_iva" ||
      e.target.name === "type_effect" ||
      e.target.name === "type_invoicing"
    ) {
      let val = e.target.value === "false" ? false : true;
      props.setCotizationData({
        ...props.cotizationData,
        [e.target.name]: val,
      });
    } else if (
      e.target.name === "rut_transmitter" ||
      e.target.name === "rut_client"
    ) {
      props.setCotizationData({
        ...props.cotizationData,
        [e.target.name]: formatRut(e.target.value),
      });
    } else {
      props.setCotizationData({
        ...props.cotizationData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeRutFacturacionInput = (e) => {
    setRutFacturacionClientSearch(formatRut(e.target.value));
  };

  const setClientResearchByApi = (clientResearch) => {
    console.log(clientResearch, "aqui cabeza de ganado");
    props.setCotizationData((currentData) => {
      return Object.assign({}, currentData, {
        rut_client: clientResearch.rut.rut + "-" + clientResearch.rut.dv,
        business_name_client: clientResearch.businessName
          ? clientResearch.businessName
          : "",
        address_client: clientResearch.addresses && clientResearch.addresses.length ? clientResearch.addresses[0].address.value : "",
        city_client: clientResearch.addresses && clientResearch.addresses.length ? clientResearch.addresses[0].city : "",
        comuna_client: clientResearch.addresses && clientResearch.addresses.length ? clientResearch.addresses[0].commune : "",
        address_client_array: clientResearch.addresses && clientResearch.addresses.length ? clientResearch.addresses : [],
        type_buy_client: clientResearch.purchaseType && clientResearch.purchaseType.length ? clientResearch.purchaseType[0].value : "",
        type_buy_client_array: clientResearch.purchaseType && clientResearch.purchaseType.length ? clientResearch.purchaseType : [],
        spin_client: clientResearch.concept && clientResearch.concept.length ? clientResearch.concept[0].value : "",
        spin_client_array: clientResearch.concept && clientResearch.concept.length ? clientResearch.concept : []
      });
    });

  }

  const searchClientByApiFacturacion = async (rut = false) => {
    // para buscar receptores simple
    let val = !rut ? rutFacturacionClientSearch : rut;
    if (val) {
      toast.info("Buscando Receptor, espere por favor");
      setDisplayLoading(true);
      try {
        let receptor = await axios.post(
          API_URL +
          "search_receptor", {
          rut: val.split("-")[0],
          dv: val.split("-")[1]
        }
        );
        let receiver = receptor.data;
        if (receiver) {
          setClientResearchByApi(receiver);
          setReadonlyRut(true);
        }
        setDisplayLoading(false);
      } catch (error) {
        setDisplayLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          console.log(error);
          toast.error("Error, contacte con soporte");
        }
      }
    } else {
      toast.info("Debe ingresar un rut para realizar la busqueda");
    }
  };

  const searchClientByApiFacturacionInvoice = async (rut = false) => {
    // para buscar receptores a la factura o la nota de venta
    let val = !rut ? rutFacturacionClientSearch : rut;
    try {
      if (val) {
        if (props.isType === "facturacion") {
          setDisplayLoading(true);
          toast.info("Buscando Receptor, espere por favor");
          let result = await axios.post(
            API_URL +
            "search_receptor",
            {
              rut: val.split("-")[0],
              dv: val.split("-")[1]
            }
          );

          let receiver = result.data;
          setClientResearchByApi(receiver);
          setReadonlyRut(true);
          setDisplayLoading(false);

        } else {
          // si es nota de venta
          if (arraySaleNote.includes(props.isType)) {
            searchClientByApiFacturacion(val);
          }
        }
      }
    } catch (error) {
      setDisplayLoading(false);
      toast.error(
        "ha ocurrido un error buscando el receptor, intente de nuevo por favor"
      );
    }
  };

  const handleSelectClient = (data) => {
    let data_document = data.split('/');
    let client = props.clients.find(v => {
      if (data_document.length > 1) {
        if (data_document[1].indexOf("-") !== -1) {
          return v.data_document + "-" + v.dv === data_document[1];
        } else {
          return v.data_document === data_document[1];
        }

      } else {
        return v.name_client === data_document[0];
      }
    })

    if (client) {
      props.setCotizationData((currentData) => {
        return Object.assign({}, currentData, {
          rut_client: data_document[1] ? data_document[1] : "",
          business_name_client: client.bussines_name
            ? client.bussines_name
            : client.name_client,
          address_client: client.address,
          city_client: client.city,
          comuna_client: client.comuna,
          address_client_array: client.addresses && client.addresses.length ? client.addresses.map((v, i) => {
            return {
              address: {
                value: v.value,
                text: v.text
              },
              city: v.city,
              commune: v.commune
            }
          }) : [],
          type_buy_client: client.purchase_type,
          type_buy_client_array: client.purchaseTypes,
          spin_client: client.spin,
          spin_client_array: client.spins
        });
      });
    }
  };

  const handleResetValueClient = () => {
    setResetValueClient(!resetValueClient);
  };

  const removeCLient = () => {
    setClientDetail({});
    handleResetValueClient();
    props.setCotizationData({
      ...props.cotizationData,
      rut_client: "",
      business_name_client: "",
      address_client: "",
      city_client: "",
      comuna_client: "",
      spin_client: "",
      actividad_economica_client: "",
    });
  };

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1" className="header_card">
        <b>Datos para la Emisión</b> <FaUser /> (hacer click para desplegar
        campos)
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        {displayLoading ? (
          <LoadingComponent size={75} text="buscando receptor" />
        ) : (
          <>
            {arrayCotizacion.includes(props.isType) ||
              arrayBoleta.includes(props.isType) ||
              arrayGuide.includes(props.isType) ? (
              <Card.Body>
                <Row>
                  <Col sm={6} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <h5 className="title_principal">Api a utilizar</h5>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={"radio"}
                            id={`radio-2`}
                            label={`Sii`}
                            value={true}
                            checked={props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={"radio"}
                            id={`radio-1`}
                            label={`Aidy`}
                            value={false}
                            checked={!props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  {props.cotizationData.type_api ? (
                    <Col sm={6} md={4} lg={4}>
                      <Form.Label className="fontBold">Rut</Form.Label>
                      <Form.Group className={"divContainerFlex"}>
                        <Form.Control
                          type="text"
                          label="Rut"
                          id="rut_client_facturacion"
                          name="rut_client_facturacion_search"
                          required={false}
                          placeholder="rut del cliente"
                          cols="col-md-12 col-lg-12 col-sm-12"
                          className="form-control-sm rutInputSearch"
                          onChange={handleChangeRutFacturacionInput}
                          value={rutFacturacionClientSearch}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => searchClientByApiFacturacion()}
                        >
                          <FaSearch />
                        </Button>
                      </Form.Group>
                    </Col>
                  ) : (
                    <Col sm={6} md={4} lg={4}>
                      <label>Rut</label>
                      <AutoCompleteClientComponent
                        items={props.clients}
                        returnValue={handleSelectClient}
                        handleResetValueClient={handleResetValueClient}
                        resetValue={resetValueClient}
                      />
                      <br />
                      {Object.keys(clientDetail).length > 0 ? (
                        <Row>
                          <Col sm={12} md={12} lg={12} className="text-center">
                            <Button
                              size="sm"
                              size="sm"
                              variant="danger text-center"
                              onClick={removeCLient}
                            >
                              <FaTrashAlt />
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Col>
                  )}
                  <Col sm={6} md={4} lg={4} className="mb-3 mb-md-0 createClientButton">
                    <br />
                    <Button
                      size="sm"
                      size="sm"
                      variant="danger"
                      block={true}
                      onClick={() => props.setIsShowModalClient(true)}
                    >
                      Crear Cliente <FaPlusCircle />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <InputField
                    type="text"
                    label="Rut"
                    name="rut_client"
                    readonly={readonlyRut}
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.rut_client}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Razón Social"
                    name="business_name_client"
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.business_name_client}
                    handleChange={onChange}
                  />
                  {props.cotizationData.address_client_array.length > 0 ? (
                    <InputField
                      type="select"
                      label="Dirección"
                      name="address_client"
                      required={
                        arrayGuide.includes(props.isType) ? true : false
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    >
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.address_client_array.map((v, i) => (
                        <option value={v.address.value} key={"addressCoti" + i}>
                          {v.address.text}
                        </option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type="text"
                      label="Dirección"
                      name="address_client"
                      required={
                        arrayGuide.includes(props.isType) ? true : false
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    />
                  )}
                </Row>
                <Row>
                  <InputField
                    type="text"
                    label="Ciudad"
                    name="city_client"
                    required={arrayGuide.includes(props.isType) ? true : false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.city_client}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Comuna"
                    name="comuna_client"
                    required={arrayGuide.includes(props.isType) ? true : false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.comuna_client}
                    handleChange={onChange}
                  />
                  {arrayGuide.includes(props.isType) ? (
                    <>
                      {props.cotizationData.spin_client_array.length > 0 ? (
                        <InputField
                          type="select"
                          label="Giro"
                          name="spin_client"
                          required={true}
                          messageErrors={["Requerido*"]}
                          cols="col-md-4 col-lg-4 col-sm-6"
                          value={props.cotizationData.spin_client}
                          handleChange={onChange}
                        >
                          <option value="">--Seleccione--</option>
                          {props.cotizationData.spin_client_array.map((v, i) => (
                            <option value={v.value} key={"spinClient" + i}>
                              {v.text}
                            </option>
                          ))}
                        </InputField>
                      ) : (
                        <InputField
                          type="text"
                          label="Giro"
                          name="spin_client"
                          required={true}
                          messageErrors={["Requerido*"]}
                          cols="col-md-4 col-lg-4 col-sm-6"
                          value={props.cotizationData.spin_client}
                          handleChange={onChange}
                        />
                      )}
                      {props.cotizationData.type_buy_client_array.length > 0 ? (
                        <InputField
                          type="select"
                          label="Tipo de Compra"
                          name="type_buy_client"
                          required={true}
                          messageErrors={["Requerido*"]}
                          cols="col-md-4 col-lg-4 col-sm-6"
                          value={props.cotizationData.type_buy_client}
                          handleChange={onChange}
                        >
                          <option value="">--Seleccione--</option>
                          {props.cotizationData.type_buy_client_array.map(
                            (v, i) => (
                              <option value={v.value} key={"typePurchaseCoti" + i}>
                                {v.text}
                              </option>
                            )
                          )}
                        </InputField>
                      ) : (
                        <InputField
                          type="text"
                          label="Tipo de Compra"
                          name="type_buy_client"
                          required={true}
                          messageErrors={["Requerido*"]}
                          cols="col-md-4 col-lg-4 col-sm-6"
                          value={props.cotizationData.type_buy_client}
                          handleChange={onChange}
                        />
                      )}
                    </>
                  ) : ""}
                </Row>
                {!arrayBoleta.includes(props.isType) &&
                  !arrayGuide.includes(props.type) ? (
                  <React.Fragment>
                    <br />
                    <Row className="mb-3 mb-sm-0">
                      <Col sm={8} md={8} lg={8}>
                        <h4 className="title_principal">
                          Contactos Asignados al Receptor
                        </h4>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button
                          variant="secondary"
                          block={true}
                          size="sm"
                          type="button"
                          onClick={props.handleModalContacts}
                        >
                          Contactos <FaUsers /> <FaPlusCircle />
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <InputField
                        type="text"
                        label="Nombre Contacto"
                        name="name_contact"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.name_contact}
                        handleChange={onChange}
                      />
                      <InputField
                        type="text"
                        label="Fono"
                        name="phone_contact"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.phone_contact}
                        handleChange={onChange}
                      />
                      <InputField
                        type="email"
                        label="Email"
                        name="email_contact"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.email_contact}
                        handleChange={onChange}
                      />
                    </Row>
                    <Row>
                      <Col sm={8} md={8} lg={8}>
                        <h4 className="title_principal">Vendedor Asignado</h4>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button
                          variant="secondary"
                          block={true}
                          size="sm"
                          type="button"
                          onClick={props.handleModalSeller}
                        >
                          Vendedores <FaUsers /> <FaPlusCircle />
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <InputField
                        type="text"
                        label="Nombre Vendedor"
                        name="name_seller"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.name_seller}
                        handleChange={onChange}
                      />
                      <InputField
                        type="text"
                        label="Fono Vendedor"
                        name="phone_seller"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.phone_seller}
                        handleChange={onChange}
                      />
                      <InputField
                        type="email"
                        label="Email Vendedor"
                        name="email_seller"
                        required={false}
                        messageErrors={["Requerido*"]}
                        cols="col-md-4 col-lg-4 col-sm-6"
                        value={props.cotizationData.email_seller}
                        handleChange={onChange}
                      />
                    </Row>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Card.Body>
            ) : arrayInvoiceMerge.includes(props.isType) ? (
              <Card.Body>
                <Row>
                  <Col sm={6} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <h5 className="title_principal">Api a utilizar</h5>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={"radio"}
                            id={`radio-2`}
                            label={`Sii`}
                            value={true}
                            checked={props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={"radio"}
                            id={`radio-1`}
                            label={`Aidy`}
                            value={false}
                            checked={!props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  {props.cotizationData.type_api ? (
                    <Col sm={6} md={4} lg={4}>
                      <Form.Label className="fontBold">Rut</Form.Label>
                      <Form.Group className={"divContainerFlex"}>
                        <Form.Control
                          style={{ flexGrow: 2 }}
                          type="text"
                          label="Rut"
                          id="rut_client_facturacion"
                          name="rut_client_facturacion_search"
                          required={false}
                          placeholder="rut del cliente"
                          cols="col-md-12 col-lg-12 col-sm-12"
                          className="form-control-sm"
                          onChange={handleChangeRutFacturacionInput}
                          value={rutFacturacionClientSearch}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => searchClientByApiFacturacionInvoice()}
                        >
                          <FaSearch />
                        </Button>
                      </Form.Group>
                    </Col>
                  ) : (
                    <Col sm={6} md={4} lg={4}>
                      <label>Rut</label>
                      <AutoCompleteClientComponent
                        items={props.clients}
                        returnValue={handleSelectClient}
                        handleResetValueClient={handleResetValueClient}
                        resetValue={resetValueClient}
                      />
                      <br />
                      {Object.keys(clientDetail).length > 0 ? (
                        <Row>
                          <Col sm={12} md={12} lg={12} className="text-center">
                            <Button
                              size="sm"
                              size="sm"
                              variant="danger text-center"
                              onClick={removeCLient}
                            >
                              <FaTrashAlt />
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Col>
                  )}
                  <Col sm={6} md={4} lg={4} className="mb-3 mb-md-0 createClientButton">
                    <br />
                    <Button
                      size="sm"
                      size="sm"
                      variant="danger"
                      block={true}
                      onClick={() => props.setIsShowModalClient(true)}
                    >
                      Crear Cliente <FaPlusCircle />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <InputField
                    type="text"
                    label="Rut"
                    name="rut_client"
                    readonly={readonlyRut}
                    required={
                      arraySaleNote.includes(props.isType) ? false : true
                    }
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.rut_client}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Razón Social"
                    name="business_name_client"
                    required={
                      arraySaleNote.includes(props.isType) ? false : true
                    }
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.business_name_client}
                    handleChange={onChange}
                  />
                  {props.cotizationData.address_client_array.length > 0 ? (
                    <InputField
                      type="select"
                      label="Direccion"
                      name="address_client"
                      required={
                        !props.cotizationData.type_invoicing &&
                          !arraySaleNote.includes(props.isType)
                          ? true
                          : false
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    >
                      {props.cotizationData.address_client_array.map((v, i) => (
                        <option value={v.address.value} key={"addressInvoice" + i}>
                          {v.address.text}
                        </option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type="text"
                      label={"Direccion"}
                      name="address_client"
                      required={
                        !props.cotizationData.type_invoicing &&
                          !arraySaleNote.includes(props.isType)
                          ? true
                          : false
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    />
                  )}
                </Row>
                <Row>
                  <InputField
                    type="text"
                    label="Ciudad"
                    name="city_client"
                    required={
                      !props.cotizationData.type_invoicing &&
                        !arraySaleNote.includes(props.isType)
                        ? true
                        : false
                    }
                    messageErrors={[]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.city_client}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Comuna"
                    name="comuna_client"
                    required={
                      !props.cotizationData.type_invoicing &&
                        !arraySaleNote.includes(props.isType)
                        ? true
                        : false
                    }
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.comuna_client}
                    handleChange={onChange}
                  />
                  {props.cotizationData.spin_client_array.length > 0 ? (
                    <InputField
                      type="select"
                      label="Giro"
                      name="spin_client"
                      required={true}
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.spin_client}
                      handleChange={onChange}
                    >
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.spin_client_array.map((v, i) => (
                        <option value={v.value} key={"spinInvoice" + i}>
                          {v.text}
                        </option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type="text"
                      label="Giro"
                      name="spin_client"
                      required={
                        !props.cotizationData.type_invoicing &&
                          !arraySaleNote.includes(props.isType)
                          ? true
                          : false
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.spin_client}
                      handleChange={onChange}
                    />
                  )}
                </Row>
                <Row>
                  {props.cotizationData.type_buy_client_array.length > 0 ? (
                    <InputField
                      type="select"
                      label="Tipo de Compra"
                      name="type_buy_client"
                      placeholder={
                        props.cotizationData.type_invoicing ? "opcional" : ""
                      }
                      required={
                        props.cotizationData.type_invoicing &&
                          arraySaleNote.includes(props.isType)
                          ? false
                          : true
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.type_buy_client}
                      handleChange={onChange}
                    >
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.type_buy_client_array.map(
                        (v, i) => (
                          <option value={v.value} key={"typePurchaseInvoice" + i}>
                            {v.text}
                          </option>
                        )
                      )}
                    </InputField>
                  ) : (
                    <InputField
                      type="text"
                      label="Tipo de Compra"
                      name="type_buy_client"
                      placeholder={
                        props.cotizationData.type_invoicing ? "opcional" : ""
                      }
                      required={
                        props.cotizationData.type_invoicing &&
                          arraySaleNote.includes(props.isType)
                          ? false
                          : true
                      }
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-6"
                      value={props.cotizationData.type_buy_client}
                      handleChange={onChange}
                    />
                  )}
                </Row>
                <Row>
                  <Col sm={8} md={8} lg={8}>
                    <h4 className="title_principal">
                      Contactos Asignados al Receptor
                    </h4>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="secondary"
                      block={true}
                      size="sm"
                      type="button"
                      onClick={props.handleModalContacts}
                    >
                      Contactos <FaUsers /> <FaPlusCircle />
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  <InputField
                    type="text"
                    label="Nombre Contacto"
                    name="name_contact"
                    required={
                      arraySaleNote.includes(props.isType) ? false : true
                    }
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.name_contact}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Fono"
                    name="phone_contact"
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.phone_contact}
                    handleChange={onChange}
                  />
                  <InputField
                    type="email"
                    label="Email"
                    name="email_contact"
                    required={false}
                    messageErrors={["Requerido*, ", "Formato Email*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.email_contact}
                    handleChange={onChange}
                  />
                </Row>
                <Row>
                  <Col sm={8} md={8} lg={8}>
                    <h4 className="title_principal">Vendedor Asignado</h4>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button
                      variant="secondary"
                      block={true}
                      size="sm"
                      type="button"
                      onClick={props.handleModalSeller}
                    >
                      Vendedores <FaUsers /> <FaPlusCircle />
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  <InputField
                    type="text"
                    label="Nombre Vendedor"
                    name="name_seller"
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.name_seller}
                    handleChange={onChange}
                  />
                  <InputField
                    type="text"
                    label="Fono Vendedor"
                    name="phone_seller"
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.phone_seller}
                    handleChange={onChange}
                  />
                  <InputField
                    type="email"
                    label="Email Vendedor"
                    name="email_seller"
                    required={false}
                    messageErrors={["Requerido*"]}
                    cols="col-md-4 col-lg-4 col-sm-6"
                    value={props.cotizationData.email_seller}
                    handleChange={onChange}
                  />
                </Row>
              </Card.Body>
            ) : (
              ""
            )}
          </>
        )}
      </Accordion.Collapse>
    </Card>
  );
};

ClientInvoiceComponet.propTypes = {
  isType: PropTypes.string.isRequired,
  cotizationData: PropTypes.object.isRequired,
  setCotizationData: PropTypes.func.isRequired,
  setIsShowModalClient: PropTypes.func.isRequired,
  handleModalSeller: PropTypes.func.isRequired,
  handleModalContacts: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ClientInvoiceComponet;
