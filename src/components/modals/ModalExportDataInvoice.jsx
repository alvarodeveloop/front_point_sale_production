import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { FaFileExcel } from "react-icons/fa";
import { API_URL } from "utils/constants";
import axios from "axios";
import "styles/components/modalComponents.css";
import LoadingComponent from "components/LoadingComponent";
import InputField from "components/input/InputComponent";
import * as moment from "moment-timezone";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import { s2ab, formatRut } from "utils/functions";
import { toast } from "react-toastify";
import { showPriceWithDecimals } from "utils/functions";
import {
  arrayCotizacion,
  arrayInvoice,
  arraySaleNote,
  arrayBoleta,
  arrayGuide,
} from "utils/constants";

function ModalExportDataInvoice(props) {
  let title =
    props.type === "cotizacion"
      ? "Cotizaciones"
      : props.type === "saleNote"
      ? "Notas de Ventas"
      : props.type === "facturacion"
      ? "Facturas"
      : props.type === "boleta"
      ? "Boletas"
      : props.type === "guide"
      ? "Guías"
      : "Ordenes de Compra";

  const [globalState, setGlobalState] = useState({
    isLoading: false,
    formData: {
      ref: "",
      ref_cotizacion: "",
      ref_sale: "",
      rut: "",
      bussinesName: "",
      type: "",
      type_invoicing: "",
      status: "",
      emisionDate: "",
      expiredDate: "",
      is_order: props.type === "cotizacion" ? 0 : 1,
    },
  });

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

  const exportDataExcel = (data) => {
    if (!data.length) {
      toast.error("Error, no hay datos para realizar el excel");
    } else {
      let wb = XLSX.utils.book_new();
      let bodyTable;
      if (arrayCotizacion.includes(props.type)) {
        bodyTable = [
          [
            "Referencia",
            "Rut Cliente",
            "Razon Social",
            "Tipo",
            "Fecha Emisión",
            "Fecha Vencimiento",
            "Status",
            "Total Neto",
            "Total Gastos",
            "Total Iva",
            "Descuento Global",
            "Total Balance",
          ],
        ];
      } else if (arrayInvoice.includes(props.type)) {
        bodyTable = [
          [
            "Referencia",
            "Referencia Cotización",
            "Rut Cliente",
            "Razon Social",
            "Tipo",
            "Status",
            "Fecha Emisión",
            "Fecha Vencimiento",
            "Total Neto",
            "Total Gastos",
            "Total Iva",
            "Descuento Global",
            "Total Balance",
          ],
        ];
      } else if (arraySaleNote.includes(props.type)) {
        bodyTable = [
          [
            "Referencia",
            "Referencia de Cotización",
            "Referencia de Pos",
            "Rut Cliente",
            "Razon Social",
            "Tipo",
            "Status",
            "Fecha Emisión",
            "Fecha Vencimiento",
            "Total Neto+",
            "Total Gastos",
            "Total Iva",
            "Descuento Global",
            "Total Balance",
          ],
        ];
      } else if (arrayBoleta.includes(props.type)) {
        bodyTable = [
          [
            "Referencia",
            "Rut Cliente",
            "Razon Social",
            "Tipo",
            "Fecha Emisión",
            "Fecha Vencimiento",
            "Status",
            "Total Neto",
            "Total Gastos",
            "Total Iva",
            "Descuento Global",
            "Total Balance",
          ],
        ];
      } else if (arrayGuide.includes(props.type)) {
        bodyTable = [
          [
            "Referencia",
            "Referencia Cotización",
            "Rut Cliente",
            "Razon Social",
            "Fecha Emisión",
            "Status",
            "Total Neto",
            "Total Gastos",
            "Total Iva",
            "Descuento Global",
            "Total Balance",
          ],
        ];
      }

      let nameTitle = `${title} de la empresa (${props.configGeneral.enterprise.bussines_name})`;
      wb.Props = {
        Title: nameTitle,
        Subject: `Exportación de ${title}`,
        Author: "Aidy tecnology",
        CreatedDate: moment().format("YYYY-MM-DD"),
      };
      wb.SheetNames.push(title);

      data.forEach((item, i) => {
        if (arrayCotizacion.includes(props.type)) {
          bodyTable.push([
            item.ref,
            item.rut_client,
            item.business_name_client,
            item.type_effect ? "Afecta" : "Excenta",
            item.date_issue_format,
            item.date_expiration_format,
            determinateStatus(item.status),
            showPriceWithDecimals(props.configGeneral, item.total_product),
            showPriceWithDecimals(props.configGeneral, item.total_gastos),
            showPriceWithDecimals(props.configGeneral, item.total_iva),
            showPriceWithDecimals(
              props.configGeneral,
              item.discount_global_total
            ),
            showPriceWithDecimals(
              props.configGeneral,
              item.total_balance_without_gastos
            ),
          ]);
        } else if (arrayInvoice.includes(props.type)) {
          bodyTable.push([
            item.ref,
            item.ref_cotizacion,
            item.rut_client,
            item.business_name_client,
            item.type_invoicing === true ? "Afecta" : "Excenta",
            item.status === 1
              ? "Pendiente"
              : item.status === 2
              ? "Pagada"
              : item.status === 3
              ? "Vencida"
              : "Anulada",
            item.date_issue_format,
            item.date_expiration_format,
            showPriceWithDecimals(props.configGeneral, item.total_product),
            showPriceWithDecimals(props.configGeneral, item.total_gastos),
            showPriceWithDecimals(props.configGeneral, item.total_iva),
            showPriceWithDecimals(
              props.configGeneral,
              item.discount_global_total
            ),
            showPriceWithDecimals(
              props.configGeneral,
              item.total_balance_without_gastos
            ),
          ]);
        } else if (
          arraySaleNote.includes(props.type) ||
          arrayBoleta.includes(props.type)
        ) {
          bodyTable.push([
            item.ref,
            item.ref_cotizacion,
            item.ref_sale,
            item.rut_client,
            item.business_name_client,
            item.type_invoicing === true ? "Afecta" : "Excenta",
            item.status === 1
              ? "Pendiente"
              : item.status === 2
              ? "Pagada"
              : item.status === 3
              ? "Vencida"
              : "Anulada",
            item.date_issue_format,
            item.date_expiration_format,
            determinateStatus(item.status),
            showPriceWithDecimals(props.configGeneral, item.total_product),
            showPriceWithDecimals(props.configGeneral, item.total_gastos),
            showPriceWithDecimals(props.configGeneral, item.total_iva),
            showPriceWithDecimals(
              props.configGeneral,
              item.discount_global_total
            ),
            showPriceWithDecimals(
              props.configGeneral,
              item.total_balance_without_gastos
            ),
          ]);
        } else if (arrayGuide.includes(props.type)) {
          bodyTable.push([
            item.ref,
            item.ref_cotizacion,
            item.rut_client,
            item.business_name_client,
            item.date_issue_format,
            item.status === 1
              ? "Pendiente"
              : item.status === 2
              ? "Vencida"
              : item.status === 3
              ? "Pagada"
              : "Anulada",
            showPriceWithDecimals(props.configGeneral, item.total_product),
            showPriceWithDecimals(props.configGeneral, item.total_gastos),
            showPriceWithDecimals(props.configGeneral, item.total_iva),
            showPriceWithDecimals(
              props.configGeneral,
              item.discount_global_total
            ),
            showPriceWithDecimals(
              props.configGeneral,
              item.total_balance_without_gastos
            ),
          ]);
        }
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets[title] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      let datos = s2ab(wbout);
      FileSaver.saveAs(
        new Blob([datos], { type: "application/octet-stream" }),
        nameTitle + "/" + moment().format("DD-MM-YYYY") + ".xlsx"
      );
    }
  };

  const onSubmit = async () => {
    try {
      //setGlobalState({...globalState, isLoading: true});
      let objectFilter = Object.assign({}, globalState.formData, {
        typeDocument: props.type,
      });

      let result = await axios.post(API_URL + "invoice_by_excel", objectFilter);
      exportDataExcel(result.data);
    } catch (error) {
      setGlobalState({ ...globalState, isLoading: false });
      props.catchErrorHandler(error);
    }
  };

  const onChangeHandler = (e) => {
    e.persist();

    setGlobalState((currentData) => {
      return Object.assign({}, currentData, {
        formData: {
          ...currentData.formData,
          [e.target.name]:
            e.target.name === "rut"
              ? formatRut(e.target.value)
              : e.target.value,
        },
      });
    });
  };

  return (
    <Modal
      show={props.isOpen}
      onHide={props.handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Exportación de {title} <FaFileExcel />
        </Modal.Title>
      </Modal.Header>
      {globalState.isLoading ? (
        <Modal.Body>
          <LoadingComponent />
        </Modal.Body>
      ) : (
        <Modal.Body>
          {arrayCotizacion.includes(props.type) ? (
            <>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.ref}
                      name="ref"
                      label="Referencia"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.rut}
                      name="rut"
                      label="Rut"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.bussinesName}
                      name="bussinesName"
                      label="Razon Social"
                      messageErrors={[]}
                    />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="select"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.type}
                      name="type"
                      label="Tipo"
                      messageErrors={[]}
                    >
                      {props.type === "cotizacion" ? (
                        <>
                          <option value="">--Seleccione--</option>
                          <option value="1">Pendiente</option>
                          <option value="2">Aprobada</option>
                          <option value="3">Facturada</option>
                          <option value="4">Nota de Venta</option>
                          <option value="5">Boleta</option>
                          <option value="6">Guía</option>
                          <option value="7">Anulada</option>
                          <option value="8">Vencida</option>
                        </>
                      ) : (
                        <>
                          <option value="">--Seleccione--</option>
                          <option value="1">Pendiente</option>
                          <option value="2">Aprobada</option>
                          <option value="3">Pagada</option>
                          <option value="4">Facturada</option>
                          <option value="7">Anulada</option>
                          <option value="8">Vencida</option>
                        </>
                      )}
                    </InputField>
                    <InputField
                      type="date"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.emisionDate}
                      name="emisionDate"
                      label="Fecha de Emisión"
                      messageErrors={[]}
                    />
                    <InputField
                      type="date"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.expiredDate}
                      name="expiredDate"
                      label="Fecha de Expiración"
                      messageErrors={[]}
                    />
                  </Row>
                </Col>
              </Row>
            </>
          ) : arrayInvoice.includes(props.type) ||
            arraySaleNote.includes(props.type) ||
            arrayBoleta.includes(props.type) ? (
            <>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.ref}
                      name="ref"
                      label="Referencia"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.ref_cotizacion}
                      name="ref_cotizacion"
                      label="Referencia Cotización"
                      messageErrors={[]}
                    />
                    {arraySaleNote.includes(props.type) ? (
                      <InputField
                        type="text"
                        required={false}
                        cols="col-md-4 col-sm-4 col-lg-4"
                        handleChange={onChangeHandler}
                        value={globalState.formData.ref_sale}
                        name="ref_sale"
                        label="Referencia Venta"
                        messageErrors={[]}
                      />
                    ) : (
                      ""
                    )}
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.rut}
                      name="rut"
                      label="Rut"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.bussinesName}
                      name="bussinesName"
                      label="Razon Social"
                      messageErrors={[]}
                    />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="date"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.emisionDate}
                      name="emisionDate"
                      label="Fecha de Emisión"
                      messageErrors={[]}
                    />
                    <InputField
                      type="date"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.expiredDate}
                      name="expiredDate"
                      label="Fecha de Expiración"
                      messageErrors={[]}
                    />
                    <InputField
                      type="select"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.status}
                      name="status"
                      label="Status"
                      messageErrors={[]}
                    >
                      <option value="">--Seleccione--</option>
                      <option value="1">Pendiente</option>
                      <option value="2">Pagada</option>
                      {arraySaleNote.includes(props.type) ? (
                        <option value="3">Facturada</option>
                      ) : (
                        ""
                      )}
                    </InputField>
                  </Row>
                </Col>
              </Row>
            </>
          ) : arrayGuide.includes(props.type) ? (
            <>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.ref}
                      name="ref"
                      label="Referencia"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.ref_cotizacion}
                      name="ref_cotizacion"
                      label="Referencia Cotización"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.rut}
                      name="rut"
                      label="Rut"
                      messageErrors={[]}
                    />
                    <InputField
                      type="text"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.bussinesName}
                      name="bussinesName"
                      label="Razon Social"
                      messageErrors={[]}
                    />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12}>
                  <Row>
                    <InputField
                      type="date"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.emisionDate}
                      name="emisionDate"
                      label="Fecha de Emisión"
                      messageErrors={[]}
                    />
                    <InputField
                      type="select"
                      required={false}
                      cols="col-md-4 col-sm-4 col-lg-4"
                      handleChange={onChangeHandler}
                      value={globalState.formData.status}
                      name="status"
                      label="Status"
                      messageErrors={[]}
                    >
                      <option value="">--Seleccione--</option>
                      <option value="1">Pendiente</option>
                      <option value="2">Vencida</option>
                      <option value="3">Facturada</option>
                      <option value="4">Anulada</option>
                    </InputField>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button size="md" variant="danger" type="button" onClick={onSubmit}>
          Exportar Data
        </Button>
        <Button size="md" variant="secondary" onClick={props.handleOnHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalExportDataInvoice.propTypes = {
  isOpen: PropTypes.bool,
  type: PropTypes.string,
  handleOnHide: PropTypes.func,
  catchErrorHandler: PropTypes.func,
  configGeneral: PropTypes.object,
};

export default ModalExportDataInvoice;
