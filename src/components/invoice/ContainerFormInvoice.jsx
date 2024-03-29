import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Accordion,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { API_URL } from "utils/constants";
import { FaPlusCircle, FaMailBulk } from "react-icons/fa";
import FormClientModal from "components/modals/FormClientModal";
import ModalGastosCotizacion from "components/modals/ModalGastosCotizacion";
import * as moment from "moment-timezone";
import InputField from "components/input/InputComponent";
import ModalClientCotizacion from "components/modals/ModalClientCotizacion";
import ModalContacts from "components/modals/ModalContacts";
import ModalSeller from "components/modals/ModalSeller";
import styled from "styled-components";
import layoutHelpers from "shared/layouts/helpers";
import ModalInvoiceCotization from "components/modals/ModalInvoiceCotization";
import { formatRut, displayTotalTotal } from "utils/functions";
import { connect } from "react-redux";
import TransmitterInvoiceComponent from "components/invoice/TransmitterInvoiceComponent";
import ClientInvoiceComponent from "components/invoice/ClientInvoiceComponent";
import TableTotalComponent from "components/invoice/TableTotalComponent";
import { OBJECT_COTIZATION } from "utils/constants";
import GastosComponent from "components/invoice/GastosComponent";
import ProductTableComponent from "components/invoice/ProductTableComponent";
import ExtraDataComponent from "components/invoice/ExtraDataComponent";
import RefComponent from "components/invoice/RefComponent";
import TransferComponent from "components/invoice/TransferComponent";
import LoadingComponent from "components/LoadingComponent";
import {
  arrayCotizacion,
  arrayInvoice,
  arraySaleNote,
  arrayBoleta,
  arrayGuide,
  arrayById,
  arrayFacturarInvoice,
  arrayFacturarCotizacion,
  TransfferTypeArray
} from "utils/constants";
import TableBondsBillComponent from "components/invoice/TableBondsBillComponent";
import "styles/pages/formInvoice.scss";

const Styles = styled.div`
  
`;

let count = 0;

function ContainerFormInvoice(props) {
  let word2 = arraySaleNote.includes(props.type)
    ? "nota de venta"
    : arrayBoleta.includes(props.type)
      ? "boleta"
      : arrayGuide.includes(props.type)
        ? "guía"
        : arrayInvoice.includes(props.type)
          ? "facturación"
          : props.type === "cotizacion"
            ? "cotización"
            : "orden de compra";

  const [displayLoading, setDisplayLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [detailProducts, setDetailProducts] = useState([]);
  const [isShowModalClient, setIsShowModalClient] = useState(false);
  const [isShowModalGastos, setIsShowModalGastos] = useState(false);
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [gastosDetail, setGastosDetail] = useState([]);
  const [openModalClientMail, setOpenModalClientMail] = useState(false);
  const [disableButtons, setDisableButton] = useState(false);
  const [isShowModalContacts, setIsShowModalContacts] = useState(false);
  const [isShowModalSeller, setIsShowModalSeller] = useState(false);
  const [validated, setValidated] = useState(false);
  const [displayDataInvoice, setDisplayDataInvoice] = useState(1);
  const [showSections, setshowSections] = useState(1
  ); // variable para controlar las pantallas que se muestran
  //const [requireInvoice, setRequireInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(
    Object.assign({}, OBJECT_COTIZATION, {
      date_issue: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      date_expiration: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      date_issue_invoice: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      searchReceptorDefault: false,
      type:
        props.type === "invoiceByGuide"
          ? 6
          : props.type === "invoiceBySaleNote"
            ? 5
            : arrayInvoice.includes(props.type)
              ? 1
              : arraySaleNote.includes(props.type)
                ? 2
                : arrayBoleta.includes(props.type)
                  ? 3
                  : arrayGuide.includes(props.type)
                    ? 4
                    : OBJECT_COTIZATION.type,
      is_order: props.type === "buyOrder" ? 1 : 0,
      business_name_transmitter: props.enterpriseSelected.bussines_name,
      rut_transmitter: props.enterpriseSelected.rut,
      address_transmitter: props.enterpriseSelected.address,
      address_transmitter_array: props.enterpriseSelected.addresses && props.enterpriseSelected.addresses.length ? props.enterpriseSelected.addresses.map((v, i) => {
        return {
          address: {
            value: v.value,
            text: v.text
          },
          city: v.city,
          commune: v.commune
        }
      }) : [],
      city_transmitter: props.enterpriseSelected.city,
      comuna_transmitter: props.enterpriseSelected.comuna,
      spin_transmitter: props.enterpriseSelected.spin,
      email_transmitter: props.enterpriseSelected.email_enterprise,
      phone_transmitter: props.enterpriseSelected.phone,
      actividad_economica_transmitter_array: props.enterpriseSelected.activities && props.enterpriseSelected.activities.length ? props.enterpriseSelected.activities : [],
      actividad_economica_transmitter: props.enterpriseSelected.economic_activity,
      type_sale_transmitter_array: props.enterpriseSelected.saleTypes && props.enterpriseSelected.saleTypes.length ? props.enterpriseSelected.saleTypes : [],
      type_sale_transmitter: props.enterpriseSelected.sale_type,
      type_transfer_trasmitter_array: TransfferTypeArray
    })
  );
  const [displayModals, setDisplayModals] = useState(false);
  const [isOpenModalInvoice, setIsOpenModalInvoice] = useState(false);
  const [refCotizacion, setRefCotizacion] = useState([]);
  const [listData, setListData] = useState([]);
  const inputRef = useRef(null);
  const [displayLoadingModal, setDisplayLoadingModal] = useState(false);
  const [typeBond, setTypeBond] = useState([]);
  const [detailBonds, setDetailBonds] = useState([]);

  useEffect(() => {
    count++;
    if (!props.configStore || !props.configGeneral) {
      if (!props.configStore) {
        toast.error(
          "Debe hacer su configuración de tienda o seleccionar una sucursal para usar este módulo"
        );
        setTimeout(function () {
          props.history.replace("/config/config_store");
        }, 3000);
      } else if (!props.configGeneral) {
        toast.error(
          "Debe hacer su configuración general para usar este módulo"
        );
        setTimeout(function () {
          props.history.replace("/config/config_general");
        }, 3000);
      }
    } else {
      if (!props.configGeneral.is_syncronized) {
        toast.error(
          "Su cuenta no esta sincronizada con el SII, complete su configuración general para usar este módulo"
        );
        setTimeout(function () {
          goToDashboard();
        }, 3000);
        return;
      }

      // count++
      // if(props.match.params.id){
      //   if(count > 1 && props.id_branch_office !== cotizationData.id_branch_office){
      //     toast.error(`Esta ${word2} no pertenece a esta sucursal`)
      //     setTimeout(function () {
      //       goToDashboard();
      //     }, 1500);
      //     return
      //   }
      // }

      fetchData();
      setDisplayModals(true);
    }
  }, [props.id_branch_office, props.id_enterprise]);

  useEffect(() => {
    layoutHelpers.toggleCollapsed();
    return () => {
      layoutHelpers.toggleCollapsed();
      count = 0;
    };
  }, []);

  const fetchData = (onlyClient = false, isUpdate = false) => {
    if (!displayLoading) {
      setDisplayLoading(true);
    }
    let promises = null;
    let isById =
      arrayById.includes(props.type) && props.match.params.id ? true : false;
    if (!onlyClient) {
      promises = [
        axios.get(API_URL + "client"),
        axios.get(API_URL + "product"),
        axios.get(API_URL + "listProduct"),
      ];
      if (props.type === "cotizacion" && !props.match.params.id)
        promises.push(axios.get(API_URL + "cotizacion_get_ref/0"));
      if (props.type === "buyOrder" && !props.match.params.id)
        promises.push(axios.get(API_URL + "cotizacion_get_ref/1"));
      if (arraySaleNote.includes(props.type))
        promises.push(axios.get(API_URL + "sale_note_get_ref"));
      if (isById) {
        if (props.type === "invoiceByGuide") {
          promises.push(axios.get(API_URL + "guide/" + props.match.params.id));
        } else if (props.type === "invoiceBySaleNote") {
          promises.push(
            axios.get(API_URL + "invoice/" + props.match.params.id)
          );
        } else {
          promises.push(
            axios.get(
              API_URL +
              "cotizacion/" +
              cotizationData.is_order +
              "/" +
              props.match.params.id
            )
          );
        }
      }
      if (arrayBoleta.includes(props.type)) {
        let rut = props.configGeneral.enterprise.rut.split("-")[0];
        let dv = props.configGeneral.enterprise.rut.split("-")[1];
        promises.push(axios.get(API_URL + "type_bond"));
      }
    } else if (onlyClient) {
      promises = [axios.get(API_URL + "client")];
    }

    Promise.all(promises)
      .then((result) => {
        setClients(result[0].data);
        if (result.length > 1) {
          setProducts(result[1].data);
          setListData(result[2].data);

          if (isById) {
            let indexArray = arraySaleNote.includes(props.type) ? 4 : 3;
            setGastosDetail(result[indexArray].data.gastos);
            setDetailProducts(result[indexArray].data.products);

            /* logica para algunos datos de las boletas */
            let addressTransmitterArray = Object.assign(
              {},
              OBJECT_COTIZATION
            ).address_transmitter_array;
            let addressTransmitter =
              result[indexArray].data.address_transmitter;
            if (arrayBoleta.includes(props.type)) {
              setTypeBond(result[4].data);
            }

            let client = result[indexArray].data.rut_client ? result[0].data.find(v => v.data_document + "-" + v.dv === result[indexArray].data.rut_client) : null;

            /*=================================*/
            setCotizationData((oldData) => {
              return Object.assign({}, oldData, {
                ...oldData,
                business_name_transmitter:
                  result[indexArray].data.business_name_transmitter,
                rut_transmitter: result[indexArray].data.rut_transmitter,
                address_transmitter: addressTransmitter,
                spin_transmitter: result[indexArray].data.spin_transmitter,
                email_transmitter:
                  result[indexArray].data.email_transmitter,
                phone_transmitter:
                  result[indexArray].data.phone_transmitter,
                actividad_economica_transmitter:
                  result[indexArray].data.actividad_economica_transmitter,
                city_transmitter: result[indexArray].data.city_transmitter,
                comuna_transmitter:
                  result[indexArray].data.comuna_transmitter,
                type_sale_transmitter:
                  result[indexArray].data.type_sale_transmitter,
                address_transmitter_array: addressTransmitterArray,

                comment: result[indexArray].data.comment,
                date_issue: moment(result[indexArray].data.date_issue)
                  .tz("America/Santiago")
                  .format("YYYY-MM-DD"),
                date_issue_invoice: moment()
                  .tz("America/Santiago")
                  .format("YYYY-MM-DD"),
                date_expiration: moment(
                  result[indexArray].data.date_expiration
                )
                  .tz("America/Santiago")
                  .format("YYYY-MM-DD"),
                type_api: result[indexArray].data.type_api,
                discount_global: result[indexArray].data.discount_global,
                way_of_payment: result[indexArray].data.way_of_payment
                  ? result[indexArray].data.way_of_payment
                  : "Crédito",

                rut_client: result[indexArray].data.rut_client,
                business_name_client:
                  result[indexArray].data.business_name_client,
                address_client: result[indexArray].data.address_client,
                actividad_economica_client:
                  result[indexArray].data.actividad_economica_client,
                city_client: result[indexArray].data.city_client,
                spin_client: result[indexArray].data.spin_client,
                type_buy_client: result[indexArray].data.type_buy_client,
                comuna_client: result[indexArray].data.comuna_client,

                name_contact: result[indexArray].data.name_contact,
                phone_contact: result[indexArray].data.phone_contact,
                email_contact: result[indexArray].data.email_contact,

                name_seller: result[indexArray].data.name_seller,
                phone_seller: result[indexArray].data.phone_seller,
                email_seller: result[indexArray].data.email_seller,

                total_with_iva: result[indexArray].data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
                price_list: "",
                type_effect: result[indexArray].data.type_effect,
                status: result[indexArray].data.status,
                ref: result[indexArray].data.ref,
                id_branch_office: result[indexArray].data.id_branch_office,
                id_guide:
                  props.type === "invoiceByGuide"
                    ? props.match.params.id
                    : oldData.id_guide,
                type_invoicing: result[indexArray].data.type_effect,
                spin_client_array: client ? client.spins : [],
                type_buy_client_array: client ? client.purchaseTypes : [],
                address_client_array: client ? client.addresses.map(v => {
                  return {
                    address: {
                      value: v.value,
                      text: v.text
                    },
                    city: v.city,
                    commune: v.commune
                  }
                }) : [],

              });
            });

          } else if (
            arrayCotizacion.includes(props.type) ||
            props.type === "saleNote"
          ) {
            setCotizationData((currentData) =>
              Object.assign({}, currentData, { ref: result[3].data.ref })
            );
          } else if (props.type === "boleta") {
            setTypeBond(result[3].data);
          }
        }
        setDisplayLoading(false);
      })
      .catch((err) => {
        setDisplayLoading(false);
        props.tokenExpired(err);
        setTimeout(() => {
          goToDashboard();
        }, 1500);
      });
  };

  const removeProductRef = (i) => {
    let array_copy = [...refCotizacion];
    array_copy.splice(i, 1);
    setRefCotizacion(array_copy);
  };

  const addRef = () => {
    setRefCotizacion([
      ...refCotizacion,
      {
        ind: "ind",
        type_document: 0,
        ref_cotizacion: cotizationData.ref,
        date_ref: moment().tz("America/Santiago").format("YYYY-MM-DD"),
        reason_ref: "Cotización",
        type_code: "",
        id_invoice: "",
      },
    ]);
  };

  const onChangeTableRef = (e, i) => {
    e.persist();
    setRefCotizacion((oldData) => {
      let newData = [...oldData];
      newData[i][e.target.name] = e.target.value;
      return newData;
    });
  };

  const clearData = () => { };

  const goToDashboard = () => {
    let route =
      props.type === "cotizacion"
        ? "/quotitation/search_quotitation"
        : props.type === "buyOrder"
          ? "/buyOrder/view"
          : arrayById.includes(props.type) && arrayInvoice.includes(props.type)
            ? "/invoice/invoice_search"
            : arrayById.includes(props.type)
              ? "/quotitation/search_quotitation"
              : arrayInvoice.includes(props.type)
                ? "/invoice/invoice_search"
                : arraySaleNote.includes(props.type)
                  ? "/sale_note/sale_note_search"
                  : arrayBoleta.includes(props.type)
                    ? "/bill/bill_search"
                    : arrayGuide.includes(props.type)
                      ? "/guide/guide_search"
                      : "/dashboard";
    props.history.replace(route);
  };

  const submitData = (type, clientMailArray = []) => {
    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error("Hay campos en el formulario que le falta por llenar");
      return;
    }

    let object_post = {
      cotization: Object.assign({}, cotizationData),
      products: [...detailProducts],
      gastos: [...gastosDetail],
      status: type,
      clientMailArray,
    };

    object_post.cotization = Object.assign({}, object_post.cotization, {
      days_expiration: "",
      way_of_payment: "",
      discount_global: 0,
      date_issue_invoice: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      type_invoicing: true,
    });

    setDisableButton(true);
    //setDisplayLoading(true)
    let word = props.type === "cotizacion" ? "Cotización" : "Orden de compra";
    if (props.match.params.id) {
      axios
        .put(API_URL + "cotizacion/" + props.match.params.id, object_post)
        .then((result) => {
          setDisableButton(false);
          clearData();
          setDisplayLoading(true);
          toast.success(word + " modificada con éxito");
          setDisplayLoading(true);
          setTimeout(function () {
            goToDashboard();
          }, 1500);
        })
        .catch((err) => {
          //setDisplayLoading(false)
          setDisableButton(false);
          props.tokenExpired(err);
        });
    } else {
      axios
        .post(API_URL + "cotizacion", object_post)
        .then((result) => {
          setDisableButton(false);
          setDisplayLoading(false);
          toast.success(
            result.data.message
              ? result.data.message
              : word + " guardada con éxito"
          );
          clearData();
          setTimeout(function () {
            goToDashboard();
          }, 1500);
        })
        .catch((err) => {
          setDisplayLoading(false);
          //setDisableButton(false)
          props.tokenExpired(err);
        });
    }
  };

  const handleSubmitInvoice = () => {
    let object_post = {
      cotization: Object.assign({}, cotizationData),
      products: detailProducts,
      gastos: gastosDetail,
      referencias: refCotizacion,
      bonds: [...detailBonds],
    };

    if (arrayBoleta.includes(props.type)) {
      let sum_bonds = 0;
      let total_total = displayTotalTotal(
        detailProducts,
        cotizationData.discount_global,
        cotizationData.total_with_iva,
        props.configStore.tax,
        true,
        gastosDetail
      );

      object_post.bonds.forEach((item, i) => {
        sum_bonds += parseFloat(item.amount);
      });

      if (sum_bonds > total_total) {
        toast.error(
          "El monto total de pagos no puede ser mayor que el de la boleta"
        );
        return;
      }
    }

    setDisableButton(true);
    setDisplayLoadingModal(true);
    let route = arrayFacturarInvoice.includes(props.type)
      ? API_URL + "invoice"
      : arrayFacturarCotizacion.includes(props.type)
        ? API_URL + "cotizacion_facturar/" + props.match.params.id
        : props.type === "guide"
          ? API_URL + "guide"
          : "";
    let request = arrayFacturarInvoice.includes(props.type)
      ? axios.post(route, object_post)
      : arrayFacturarCotizacion.includes(props.type)
        ? axios.put(route, object_post)
        : props.type === "guide"
          ? axios.post(route, object_post)
          : "";

    //API_URL+'cotizacion_facturar/'+props.match.params.id
    request
      .then((result) => {
        if (arrayInvoice.includes(props.type)) {
          let invoice_word = result.data.length > 1 ? "Facturas" : "Factura";
          toast.success(invoice_word + " realizada con éxito");
          setDisplayLoadingModal(false);
          toast.info(
            "Generando pdf de la " + invoice_word + ", espere por favor..."
          );

          result.data.response.forEach((item, i) => {
            window.open(process.env.REACT_APP_API_FACTURACION + item.file.url, "_blank");
          });

          setTimeout(() => {
            goToDashboard();
          }, 2000);
        } else if (arraySaleNote.includes(props.type)) {
          toast.success(
            "Proceso completado, espere mientras se genera el documento de la nota"
          );
          setDisplayLoadingModal(false);
          toast.info("Generando el o los pdf, espere por favor...");
          let promises = [];
          result.data.response.forEach((item, i) => {
            promises.push(
              axios.get(API_URL + "invoice_print/" + item.id + "/" + 3 + "/2")
            );
          });
          Promise.all(promises)
            .then((resultPdf) => {
              resultPdf.forEach((v, i) => {
                window.open(
                  API_URL + "documents/sale_note/files_pdf/" + v.data.name
                );
              });
              setTimeout(() => {
                goToDashboard();
              }, 2000);
            })
            .catch((err) => {
              props.tokenExpired(err);
            });
        } else if (arrayBoleta.includes(props.type)) {
          toast.success("Boleta hecha con éxito");
          setDisableButton(false);
          setDisplayLoadingModal(false);
          toast.info("Generando pdf de la boleta, espere por favor...");
          result.data.response.forEach((item, i) => {
            if (item) {
              window.open(
                process.env.REACT_APP_API_FACTURACION + item.url,
                "_blank"
              );
            }
          });
          setTimeout(() => {
            goToDashboard();
          }, 2000);
        } else if (arrayGuide.includes(props.type)) {
          setDisableButton(false);
          setDisplayLoadingModal(false);
          toast.success("Guía guardada con éxito");
          toast.info("Generando pdf de la Guía, espere por favor...");
          result.data.response.forEach((item, i) => {
            if (item) window.open(process.env.REACT_APP_API_FACTURACION + item.file.url, "_blank");
          });
          setTimeout(() => {
            goToDashboard();
          }, 2000);
        }
      })
      .catch((err) => {
        setDisplayLoadingModal(false);
        setDisableButton(false);
        props.tokenExpired(err);
      });
  };

  const handleModalInvoice = () => {
    setIsOpenModalInvoice(!isOpenModalInvoice);
  };

  const onChange = async (e) => {
    e.persist();
    if (
      e.target.name === "type_api" ||
      e.target.name === "total_with_iva" ||
      e.target.name === "type_effect" ||
      e.target.name === "type_invoicing"
    ) {
      let val = e.target.value === "false" ? false : true;
      setCotizationData({ ...cotizationData, [e.target.name]: val });
    } else if (
      e.target.name === "rut_transmitter" ||
      e.target.name === "rut_client" ||
      e.target.name === "rut_driver" ||
      e.target.name === "rut_transfer"
    ) {
      setCotizationData({
        ...cotizationData,
        [e.target.name]: formatRut(e.target.value),
      });
    } else {
      setCotizationData({ ...cotizationData, [e.target.name]: e.target.value });
    }
  };

  const handleGastoSubmit = (data) => {
    // funcion para manejar el submit de los gastos y agglos a la tabla de gastos
    setGastosDetail([...gastosDetail, data]);
  };
  const handleHideModalClient = (isCreated) => {
    setIsShowModalClient(false);
    if (isCreated) {
      fetchData(true);
    }
  };

  const handleModalContacts = () => {
    setIsShowModalContacts(!isShowModalContacts);
  };

  const handleModalSeller = () => {
    setIsShowModalSeller(!isShowModalSeller);
  };

  const handleSelectContact = (dataContact) => {
    setCotizationData((oldData) => {
      return Object.assign({}, oldData, {
        name_contact: dataContact.name,
        phone_contact: dataContact.phone,
        email_contact: dataContact.email,
      });
    });
    setIsShowModalContacts(false);
  };

  const handleSelectSeller = (dataSeller) => {
    setCotizationData((oldData) => {
      return Object.assign({}, oldData, {
        name_seller: dataSeller.name,
        phone_seller: dataSeller.phone,
        email_seller: dataSeller.email,
      });
    });
    setIsShowModalSeller(false);
  };

  const displayShowSectionsHandler = (section, type, isLastSection = false) => {
    //type ? avanzar : retroceder;
    let validate = true;
    if (showSections < section && type) {
      for (let index = showSections; index < section; index++) {
        let result = validateSectionHandler(index);
        if (!result[0]) {
          if (index === 4) {
            let arraySections = result[1].split(":");

            toast.info(
              <>
                <span>{result[1].split(":")[0]}</span>
                <br />
                <ul>
                  {arraySections[1].split(",").map((v) => (
                    <li>*{v}</li>
                  ))}
                </ul>
                <br /> Sección: {index}
              </>
            );
          } else {
            toast.info(
              <span>
                {result[1]} <br /> sección: {index}
              </span>
            );
          }
          validate = false;
          break;
        }
      }
    }

    if (!validate) {
      return false;
    }

    if (
      isLastSection &&
      (arrayBoleta.includes(props.type) || arrayGuide.includes(props.type))
    ) {
      setshowSections(section);
    } else {
      setshowSections(5);
    }

    if (section === 7) {
      setshowSections(section);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    setshowSections(section);
  };

  const validateSectionHandler = (section) => {
    // sección 1
    if (section === 1) {
      if (
        arrayInvoice.includes(props.type) ||
        arrayBoleta.includes(props.type) ||
        arrayGuide.includes(props.type)
      ) {
        if (!detailProducts.length) {
          return [
            false,
            "Debe seleccionar al menos un producto para continuar",
          ];
        } else {
          let validateRequired = true;
          detailProducts.forEach((v, i) => {
            if (!v.name_product || !v.price || !v.quantity || !v.method_sale) {
              validateRequired = false;
            }
          });
          if (!validateRequired)
            return [false, "el campo nombre, precio y cantidad son requeridos"];

          return [true];
        }
      } else {
        return [true];
      }
    }

    //section 3
    if (section === 3) {
      if (
        arrayInvoice.includes(props.type) ||
        arraySaleNote.includes(props.type)
      ) {
        if (
          !cotizationData.date_issue_invoice ||
          !cotizationData.days_expiration ||
          !cotizationData.way_of_payment ||
          !cotizationData.type_invoicing
        ) {
          return [
            false,
            arrayInvoice.includes(props.type)
              ? "Todos los campos de esta sección son requeridos"
              : "Todos los campos de esta sección son requeridos menos el descuento global",
          ];
        }
      } else if (arrayBoleta.includes(props.type)) {
        if (
          !cotizationData.date_issue ||
          (cotizationData.type_invoicing !== true &&
            cotizationData.type_invoicing !== false)
        ) {
          return [false, "Todos los campos de esta sección son requeridos"];
        } else {
          return [true];
        }
      } else if (arrayGuide.includes(props.type)) {
        if (!cotizationData.date_issue_invoice) {
          return [false, "Todos los campos de esta sección son requeridos"];
        }

        return [true];
      }
    }

    //section 4
    if (section === 4) {
      if (arrayInvoice.includes(props.type)) {
        if (cotizationData.type_invoicing) {
          // si es afecta
          if (
            !cotizationData.rut_client ||
            !cotizationData.business_name_client ||
            !cotizationData.address_client ||
            !cotizationData.city_client ||
            !cotizationData.comuna_client ||
            !cotizationData.spin_client
          ) {
            return [
              false,
              "Los siguientes campos del cliente son requeridos:Rut,razon social,dirección,ciudad,comuna,giro,nombre del contacto",
            ];
          } else {
            return [true];
          }
        } else {
          // si es excenta
          if (
            !cotizationData.rut_client ||
            !cotizationData.business_name_client ||
            !cotizationData.address_client ||
            !cotizationData.city_client ||
            !cotizationData.comuna_client ||
            !cotizationData.spin_client
          ) {
            return [
              false,
              "Los siguientes campos del cliente son requeridos:Rut,razon social,dirección,ciudad,comuna,giro,nombre del contacto",
            ];
          } else {
            return [true];
          }
        }
      } else if (arrayGuide.includes(props.type)) {
        if (
          !cotizationData.rut_client ||
          !cotizationData.business_name_client ||
          !cotizationData.address_client ||
          !cotizationData.type_buy_client ||
          !cotizationData.city_client ||
          !cotizationData.comuna_client ||
          !cotizationData.spin_client ||
          !cotizationData.name_contact
        ) {
          console.log(cotizationData, "aqui");
          return [
            false,
            "Los siguientes campos del cliente son requeridos: Rut,razon social,dirección,ciudad,comuna,giro, tipo de compra y nombre del contacto",
          ];
        }

        if (
          !cotizationData.address_transmitter ||
          !cotizationData.city_transmitter ||
          !cotizationData.type_sale_transmitter ||
          !cotizationData.actividad_economica_transmitter ||
          !cotizationData.type_transfer_trasmitter
        ) {
          return [
            false,
            "Los siguientes campos del emisor son requeridos: direcció,ciudad,tipo de venta,actividad económica y tipo de traslado",
          ];
        }
        return [true];
      }
    }
    //section 6
    if (section === 6 && arrayGuide.includes(props.type)) {
      if (
        cotizationData.rut_transfer ||
        cotizationData.patent_transfer ||
        cotizationData.rut_driver ||
        cotizationData.name_driver
      ) {
        if (
          !cotizationData.rut_transfer ||
          !cotizationData.patent_transfer ||
          !cotizationData.rut_driver ||
          !cotizationData.name_driver
        ) {
          return [
            false,
            "Todos los campos de esta sección son requeridos a menos que no se desee llenar ninguno",
          ];
        }
      }
    }

    if (section === 6 && arrayBoleta.includes(props.type)) {
      if (detailBonds.length) {
        let validate = true;
        detailBonds.forEach((v) => {
          if (!v.detail || !v.amount || !v.id_type_bond) {
            validate = false;
          }
        });
        if (!validate) {
          return [false, "Todos los campos de los pagos son requeridos"];
        } else {
          let sum_bonds = 0;
          let total_total = displayTotalTotal(
            detailProducts,
            cotizationData.discount_global,
            cotizationData.total_with_iva,
            props.configStore.tax,
            true,
            gastosDetail
          );

          detailBonds.forEach((item, i) => {
            sum_bonds += parseFloat(item.amount);
          });

          if (sum_bonds > total_total) {
            return [
              false,
              "El monto total de pagos no puede ser mayor que el de la boleta",
            ];
          }
        }
      }
    }

    return [true];
  };

  const displayMembreteCotizacion = () => {
    let word1 = arraySaleNote.includes(props.type)
      ? "Nota de Venta"
      : arrayBoleta.includes(props.type)
        ? "Boleta"
        : arrayGuide.includes(props.type)
          ? "Guía"
          : arrayInvoice.includes(props.type)
            ? "Facturación"
            : props.type === "cotizacion"
              ? "Cotización"
              : "Orden de Compra";
    return (
      <React.Fragment>
        <Row className="justify-content-between align-items-center">
          <Col sm={12} md={7} lg={8}>
            <Row>
              <Col>
                <h4 className="title_principal">Formulario De {word1} </h4>
                <div style={{ display: "flex", width: "100%" }}>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigPrice">
                        Gestione los productos de la {word2}.
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(1, true)}
                      className={
                        showSections === 1
                          ? "indicatorsCircleActive"
                          : "indicatorsCircle"
                      }
                    >
                      Productos
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigGastos">
                        Gestione los gastos de la {word2}. No afectará el monto
                        total a facturar pero le dará un estimado entre perdidas
                        y ganancias.
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(2, true)}
                      className={
                        showSections === 2
                          ? "indicatorsCircleActive"
                          : "indicatorsCircle"
                      }
                    >
                      Gastos
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigExtra">
                        Gestione la fechas de inicio y vencimiento además de
                        indicar si el tipo de factura a efectuar desde esta{" "}
                        {word2} es de tipo afecta o excenta
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(3, true)}
                      className={
                        showSections === 3
                          ? "indicatorsCircleActive"
                          : "indicatorsCircle"
                      }
                    >
                      Fecha y Tipo
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigClienteEmisor">
                        Gestione los datos del emisor de la {word2} y el
                        receptor.
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(4, true)}
                      className={`${showSections === 4
                        ? "indicatorsCircleActive"
                        : "indicatorsCircle"}
                        d-none d-lg-block`

                      }
                    >
                      Emisor y Receptor
                    </div>
                  </OverlayTrigger>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col sm={12} md={12} lg={12}>
                <div style={{ display: "flex", width: "100%" }}>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigClienteEmisor">
                        Gestione los datos del emisor de la {word2} y el
                        receptor.
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(4, true)}
                      className={`${showSections === 4
                        ? "indicatorsCircleActive"
                        : "indicatorsCircle"}
                        d-flex d-lg-none`

                      }
                    >
                      Emisor y Receptor
                    </div>
                  </OverlayTrigger>
                  {!arrayCotizacion.includes(props.type) ? (
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id="tooltipRef">
                          Gestione las referencias que quiera agregar a la{" "}
                          {word2}
                        </Tooltip>
                      }
                    >
                      <div
                        onClick={() => displayShowSectionsHandler(5, true)}
                        className={
                          showSections === 5
                            ? "indicatorsCircleActive"
                            : "indicatorsCircle"
                        }
                      >
                        Referencias
                      </div>
                    </OverlayTrigger>
                  ) : (
                    ""
                  )}
                  {arrayBoleta.includes(props.type) ? (
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id="tooltipConfigResumen">
                          Puede agragar pagos a la {word2} para gestionar su
                          liquidación o para agregar pagos parciales.
                        </Tooltip>
                      }
                    >
                      <div
                        onClick={() => displayShowSectionsHandler(6, true)}
                        className={
                          showSections === 6
                            ? "indicatorsCircleActive"
                            : "indicatorsCircle"
                        }
                      >
                        Pagos <span className="d-none d-md-inline">de la boleta</span>
                      </div>
                    </OverlayTrigger>
                  ) : arrayGuide.includes(props.type) ? (
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id="tooltipConfigResumen">
                          Seccionar para gestionar datos del transportista de la
                          guía.
                        </Tooltip>
                      }
                    >
                      <div
                        onClick={() => displayShowSectionsHandler(6, true)}
                        className={
                          showSections === 6
                            ? "indicatorsCircleActive"
                            : "indicatorsCircle"
                        }
                      >
                        Transporte
                      </div>
                    </OverlayTrigger>
                  ) : (
                    ""
                  )}
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip id="tooltipConfigResumen">
                        Resumen y totales antes de generar la {word2}.
                      </Tooltip>
                    }
                  >
                    <div
                      onClick={() => displayShowSectionsHandler(7, true)}
                      className={
                        showSections === 7
                          ? "indicatorsCircleActive"
                          : "indicatorsCircle"
                      }
                    >
                      <span className="d-none d-sm-inline">Resumen y</span> Totales
                    </div>
                  </OverlayTrigger>
                </div>
              </Col>
            </Row>
          </Col>
          {arrayCotizacion.includes(props.type) ||
            arraySaleNote.includes(props.type) ? (
            <>
              <Col sm={6} md={5} lg={4} className="mt-2 mt-md-0">
                <InputField
                  type="text"
                  label={
                    <h5 style={{ color: "rgb(153, 31, 31)" }}>Ref.{word1}</h5>
                  }
                  name="id_cotizacion"
                  required={true}
                  messageErrors={[]}
                  cols="col-md-12 col-lg-12 col-sm-12"
                  readonly={true}
                  value={cotizationData.ref}
                  handleChange={() => { }}
                />
                <Row className="justify-content-center d-flex d-sm-none d-md-flex">
                  <Col sm={6} md={10} lg={10} xs={10}>
                    <Button
                      variant="secondary"
                      size="sm"
                      block={true}
                      onClick={goToDashboard}
                    >
                      Volver a la tabla
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col sm={6} className="d-none d-sm-block d-md-none mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  block={true}
                  onClick={goToDashboard}
                >
                  Volver a la tabla
                </Button>
              </Col>
            </>

          ) : (
            <Col sm={12} md={4} lg={4} className="mt-2 mt-md-0 text-center">
              <Button
                variant="secondary"
                size="sm"
                className="buttonGoBack"
                onClick={goToDashboard}
              >
                Volver a la tabla
              </Button>
            </Col>
          )}
        </Row>
        <hr />
      </React.Fragment>
    );
  };

  return (
    <Styles>
      <Container fluid>
        {displayLoading ? (
          <LoadingComponent />
        ) : (
          <Form
            onSubmit={() => { }}
            noValidate
            validated={validated}
            ref={inputRef}
          >
            <React.Fragment>
              {displayMembreteCotizacion()}
              <br />
              {showSections === 1 ? (
                <>
                  <ProductTableComponent
                    setDetailProducts={setDetailProducts}
                    detailProducts={detailProducts}
                    products={products}
                    cotizationData={cotizationData}
                    setIsShowModalProduct={setIsShowModalProduct}
                    setGastosDetail={setGastosDetail}
                    onChange={onChange}
                    listData={listData}
                    setProducts={setProducts}
                    type={props.type}
                    changeSection={displayShowSectionsHandler}
                    word2={word2}
                    {...props}
                  />
                  <br />
                  <Row className="justify-content-center">
                    {arrayCotizacion.includes(props.type) ? (
                      <Col sm={4} lg={4} md={4} xs={6}>
                        <Button
                          type="button"
                          size="sm"
                          variant="danger"
                          disabled={disableButtons}
                          block={true}
                          onClick={() => submitData(2)}
                        >
                          {disableButtons ? "Guardando..." : "Guardar " + word2}{" "}
                          <FaPlusCircle />
                        </Button>
                      </Col>
                    ) : arraySaleNote.includes(props.type) &&
                      detailProducts.length ? (
                      <Col sm={4} lg={4} md={4} xs={6}>
                        <Button
                          variant="danger"
                          size="sm"
                          block={true}
                          type="button"
                          onClick={handleModalInvoice}
                        >
                          Emitir y Facturar
                        </Button>
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col sm={4} lg={4} md={4} xs={6}>
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(2, true)}
                        type="button"
                      >
                        Siguiente
                      </Button>
                    </Col>

                  </Row>
                </>
              ) : showSections === 2 ? (
                <GastosComponent
                  gastosDetail={gastosDetail}
                  setGastosDetail={setGastosDetail}
                  configGeneral={props.configGeneral}
                  setIsShowModalGastos={setIsShowModalGastos}
                  isCotizacion={props.type === "cotizacion" ? true : false}
                  changeSection={displayShowSectionsHandler}
                  word2={word2}
                />
              ) : showSections === 3 ? (
                <>
                  <ExtraDataComponent
                    cotizationData={cotizationData}
                    onChange={onChange}
                    type={props.type}
                  />
                  <br />
                  <Row className="justify-content-center">
                    <Col sm={6} md={4} lg={4} xs={6}>
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(2, false)}
                        type="button"
                      >
                        Atrás
                      </Button>
                    </Col>
                    <Col sm={6} md={4} lg={4} xs={6}>
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(4, true)}
                        type="button"
                      >
                        Siguiente
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : showSections === 4 ? (
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12} xs={12}>
                    <Row>
                      <Col sm={12} md={12} lg={12} xs={12}>
                        <Accordion defaultActiveKey="1">
                          <TransmitterInvoiceComponent
                            isType={props.type}
                            cotizationData={cotizationData}
                            setCotizationData={setCotizationData}
                            onChange={onChange}
                            configGeneral={props.configGeneral}
                          />
                          <ClientInvoiceComponent
                            isType={props.type}
                            cotizationData={cotizationData}
                            setCotizationData={setCotizationData}
                            setIsShowModalClient={setIsShowModalClient}
                            handleModalSeller={handleModalSeller}
                            handleModalContacts={handleModalContacts}
                            clients={clients}
                            onChange={onChange}
                            setIsShowModalClient={setIsShowModalClient}
                            handleModalSeller={handleModalSeller}
                          />
                        </Accordion>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={6} md={4} lg={4} xs={6}>
                    <br />
                    <Button
                      variant="secondary"
                      block={true}
                      size="sm"
                      onClick={() => displayShowSectionsHandler(3, false)}
                      type="button"
                    >
                      Atrás
                    </Button>
                  </Col>
                  <Col sm={6} md={4} lg={4} xs={6}>
                    <br />
                    <Button
                      variant="secondary"
                      block={true}
                      size="sm"
                      onClick={() =>
                        displayShowSectionsHandler(
                          arrayCotizacion.includes(props.type) ? 7 : 5,
                          true
                        )
                      }
                      type="button"
                    >
                      Siguiente
                    </Button>
                  </Col>
                </Row>
              ) : showSections === 5 ? (
                <>
                  <RefComponent
                    onChangeTableRef={onChangeTableRef}
                    refCotizacion={refCotizacion}
                    removeProductRef={removeProductRef}
                    addRef={addRef}
                    isNotAccordeon={true}
                  />
                  <Row className="justify-content-center">
                    <Col sm={6} xs={6} md={4} lg={4}>
                      <br />
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(3, false)}
                        type="button"
                      >
                        Atrás
                      </Button>
                    </Col>
                    <Col sm={6} xs={6} md={4} lg={4}>
                      <br />
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() =>
                          arrayBoleta.includes(props.type) ||
                            arrayGuide.includes(props.type)
                            ? displayShowSectionsHandler(6, true)
                            : displayShowSectionsHandler(7, true)
                        }
                        type="button"
                      >
                        Siguiente
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : showSections === 6 && arrayBoleta.includes(props.type) ? (
                <TableBondsBillComponent
                  typePayments={typeBond}
                  detailBonds={detailBonds}
                  setDetailBonds={setDetailBonds}
                  changeSection={displayShowSectionsHandler}
                />
              ) : showSections === 6 && arrayGuide.includes(props.type) ? (
                <>
                  <h4 className="text-center title_principal">
                    Datos del transportista
                  </h4>
                  <br />
                  <TransferComponent
                    cotizationData={cotizationData}
                    onChange={onChange}
                    isNotAccordeon={true}
                  />
                  <Row className="justify-content-center">
                    <Col sm={6} md={4} lg={4} xs={6}>
                      <br />
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(5, false)}
                        type="button"
                      >
                        Atrás
                      </Button>
                    </Col>
                    <Col sm={6} md={4} lg={4} xs={6}>
                      <br />
                      <Button
                        variant="secondary"
                        block={true}
                        size="sm"
                        onClick={() => displayShowSectionsHandler(7, true)}
                        type="button"
                      >
                        Siguiente
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : showSections === 7 ? (
                <>
                  <TableTotalComponent
                    configGeneral={props.configGeneral}
                    configStore={props.configStore}
                    detailProducts={detailProducts}
                    cotizationData={cotizationData}
                    gastosDetail={gastosDetail}
                    bondsPayments={detailBonds}
                    typeBond={typeBond}
                    isType={props.type}
                  />
                  {arrayCotizacion.includes(props.type) ? (
                    <Row className="justify-content-center">
                      <Col sm={6} md={3} lg={3} xs={6} className="d-block d-md-none mb-2 mb-md-0">
                        <Button
                          type="button"
                          size="sm"
                          variant="primary"
                          disabled={disableButtons}
                          block={true}
                          onClick={() => submitData(2)}
                        >
                          {disableButtons ? "Guardando..." : "Guardar " + word2}{" "}
                          <FaPlusCircle />
                        </Button>
                      </Col>
                      <Col sm={6} md={3} lg={3} xs={6} className="d-none d-md-block">
                        <DropdownButton
                          size="sm"
                          id={"drop"}
                          title={disableButtons ? "Guardando" : "Compartir"}
                          className="dropdown_block"
                          disabled={disableButtons}
                          variant="secondary"
                        >
                          <Dropdown.Item
                            onClick={() => setOpenModalClientMail(true)}
                          >
                            Enviar por Mail
                          </Dropdown.Item>
                          {/*<Dropdown.Item onClick={ copyLinkOfCotizacion } >Copiar Link</Dropdown.Item>*/}
                        </DropdownButton>
                      </Col>
                      <Col sm={6} md={3} lg={3} xs={6} className="mb-2 mb-md-0">
                        <Button
                          type="button"
                          size="sm"
                          variant="primary"
                          disabled={disableButtons}
                          block={true}
                          onClick={() => submitData(1)}
                        >
                          {disableButtons
                            ? "Guardando..."
                            : "Guardar y Enviar por Mail"}{" "}
                          <FaMailBulk />
                        </Button>
                      </Col>
                      <Col sm={6} md={3} lg={3} xs={6} className="d-block d-md-none">
                        <DropdownButton
                          size="sm"
                          id={"drop"}
                          title={disableButtons ? "Guardando" : "Compartir"}
                          className="dropdown_block"
                          disabled={disableButtons}
                          variant="secondary"
                        >
                          <Dropdown.Item
                            onClick={() => setOpenModalClientMail(true)}
                          >
                            Enviar por Mail
                          </Dropdown.Item>
                          {/*<Dropdown.Item onClick={ copyLinkOfCotizacion } >Copiar Link</Dropdown.Item>*/}
                        </DropdownButton>
                      </Col>
                      <Col sm={6} md={3} lg={3} xs={6} className="d-none d-md-block">
                        <Button
                          type="button"
                          size="sm"
                          variant="primary"
                          disabled={disableButtons}
                          block={true}
                          onClick={() => submitData(2)}
                        >
                          {disableButtons ? "Guardando..." : "Guardar " + word2}{" "}
                          <FaPlusCircle />
                        </Button>
                      </Col>
                      <Col sm={6} md={3} lg={3} xs={6}>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={disableButtons}
                          block={true}
                          onClick={() => setshowSections(4)}
                        >
                          Volver
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="justify-content-center">
                      <Col sm={6} md={4} lg={3} xs={6}>
                        <Button
                          variant="secondary"
                          size="sm"
                          block={true}
                          type="button"
                          onClick={() =>
                            displayShowSectionsHandler(6, false, true)
                          }
                        >
                          Atras
                        </Button>
                      </Col>
                      <Col sm={6} md={4} lg={3} xs={6}>
                        <Button
                          variant="danger"
                          size="sm"
                          block={true}
                          type="button"
                          onClick={handleModalInvoice}
                        >
                          Emitir y Facturar
                        </Button>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                ""
              )}
            </React.Fragment>
            {displayModals ? (
              <React.Fragment>
                <FormClientModal
                  isShow={isShowModalClient}
                  onHide={handleHideModalClient}
                />
                <ModalGastosCotizacion
                  isShow={isShowModalGastos}
                  onHide={() => setIsShowModalGastos(false)}
                  handleGastoSubmit={handleGastoSubmit}
                />
                <ModalClientCotizacion
                  clients={clients}
                  isShow={openModalClientMail}
                  onHide={() => setOpenModalClientMail(false)}
                  handleClientSubmit={() => { }}
                />
                <ModalContacts
                  isShow={isShowModalContacts}
                  onHide={handleModalContacts}
                  handleSelectContact={handleSelectContact}
                />
                <ModalSeller
                  isShow={isShowModalSeller}
                  onHide={handleModalSeller}
                  handleSelectContact={handleSelectSeller}
                />
                <ModalInvoiceCotization
                  isShow={isOpenModalInvoice}
                  onHide={handleModalInvoice}
                  handleSubmit={handleSubmitInvoice}
                  setDetailProducts={setDetailProducts}
                  products={detailProducts}
                  disableButtons={disableButtons}
                  displayLoading={displayLoadingModal}
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </Form>
        )}
      </Container>
    </Styles>
  );
}

ContainerFormInvoice.propTypes = {
  type: PropTypes.string,
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  configStore: PropTypes.object,
  configGeneral: PropTypes.object,
  enterpriseSelected: PropTypes.object
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
    configStore: state.configs.configStore,
    enterpriseSelected: state.enterpriseSucursal.enterprises.find(v => v.id === parseInt(state.enterpriseSucursal.id_enterprise))
  };
}

export default connect(mapStateToProps, {})(ContainerFormInvoice);
