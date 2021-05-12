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
import { API_URL, API_FACTURACION } from "utils/constants";
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
  arraySearchDefaultInvoiceRecetor,
} from "utils/constants";
import TableBondsBillComponent from "components/invoice/TableBondsBillComponent";

const Styles = styled.div`
  .divContainerFlex {
    display: flex;
    flex-direction: row;
  }

  .inputFlex {
    flex-grow: 2;
    border: none;
  }

  .inputFlex:focus {
    outline: none;
  }

  .tr_cabecera {
    background-color: rgb(218, 236, 242);
  }

  .button_product > button {
    height: 55px;
    border-radius: 100%;
    box-shadow: 3px 3px rgb(219, 222, 215);
    width: 55px;
    padding: 5px;
  }

  .button_product_base {
    height: 55px;
    border-radius: 100%;
    box-shadow: 3px 3px rgb(219, 222, 215);
    width: 55px;
    padding: 5px;
  }

  .div_overflow {
    max-height: 400px;
    overflow-y: auto;
  }
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
  const [showSections, setshowSections] = useState(
    arrayInvoice.includes(props.type) ? 0 : 1
  ); // variable para controlar las pantallas que se muestran
  //const [requireInvoice, setRequireInvoice] = useState(false)
  const [cotizationData, setCotizationData] = useState(
    Object.assign({}, OBJECT_COTIZATION, {
      date_issue: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      date_expiration: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      date_issue_invoice: moment().tz("America/Santiago").format("YYYY-MM-DD"),
      type_invoicing: props.type === "facturacion" ? 1 : 3,
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
          props.history.replace("/config_store");
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
      if (props.configGeneral.is_syncronized) {
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
        //xodigo para producción promises.push(axios.get(API_URL+'search_receptor/'+rut+'/'+dv));
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
            if (
              arrayInvoice.includes(props.type) &&
              props.type !== "invoiceByGuide"
            ) {
              let isInvoice = props.type === "facturacion" ? true : false;
              searchReceptorEmisorInvoice(
                isInvoice ? false : true,
                isInvoice ? false : result[indexArray]
              );
            } else {
              /* logica para algunos datos de las boletas */
              let addressTransmitterArray = Object.assign(
                {},
                OBJECT_COTIZATION
              ).address_transmitter_array;
              let addressTransmitter =
                result[indexArray].data.address_transmitter;
              if (arrayBoleta.includes(props.type)) {
                setTypeBond(result[4].data);
                // código de ejercicio... remover para producción
                //addressTransmitterArray = result[5].data.direcciones[0];
                //addressTransmitter = result[5].data.direccion_seleccionada
              }

              /*=================================*/
              if (arrayGuide.includes(props.type)) {
                searchClientReceptorGuide(
                  result[indexArray].data.rut_client,
                  result[indexArray].data
                );
              } else {
                setCotizationData((oldData) => {
                  return Object.assign({}, oldData, {
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
                      : 1,

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
                  });
                });
              }
            }
          } else if (
            arrayCotizacion.includes(props.type) ||
            props.type === "saleNote"
          ) {
            setCotizationData((currentData) =>
              Object.assign({}, currentData, { ref: result[3].data.ref })
            );
          } else if (props.type === "boleta") {
            // código de ejercicio... remover para producción
            /*setCotizationData(currentData => {
            return Object.assign({},currentData, {
              rut_transmitter: result[4].data.rut+"-"+result[4].data.dv,
              business_name_transmitter: result[4].data.razon_social,
              address_transmitter_array: result[4].data.direcciones[0],
              address_transmitter : result[4].data.direccion_seleccionada,
              comuna_transmitter: result[4].data.comuna_seleccionada,
              city_transmitter: result[4].data.ciudad_seleccionada,
              fetchTransmitter: false,
            })
          })*/
            setTypeBond(result[3].data);
          } else if (props.type === "guide") {
            searchClientReceptorGuide();
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

  const searchReceptorEmisorInvoice = (
    autoReceptorSearch = false,
    dataCotizacion = false
  ) => {
    toast.info("Preparando el emisor de la factura");
    //comentado para ejemplo, descomentar para producción

    /*axios.get(API_URL+'get_transmitter_invoice').then(transmitter => {
      if(dataCotizacion){
        
        setCotizationData(oldData => {
          return Object.assign({},oldData,{

            business_name_transmitter : transmitter.data.emisor.razon_social,
            rut_transmitter: dataCotizacion.data.rut_transmitter,
            address_transmitter:  transmitter.data.emisor.direccion_seleccionada,
            address_transmitter_array: transmitter.data.emisor.direcciones[0],
            spin_transmitter : transmitter.data.emisor.giro,
            email_transmitter: dataCotizacion.data.email_transmitter,
            phone_transmitter: dataCotizacion.data.phone_transmitter,
            actividad_economica_transmitter : transmitter.data.emisor.actvidades_economicas.length > 0 ? transmitter.data.emisor.actvidades_economicas[0][0] : props.configGeneral.actividad_economica,
            actividad_economica_transmitter_array: transmitter.data.emisor.actvidades_economicas,
            city_transmitter : transmitter.data.emisor.ciudad_seleccionada,
            comuna_transmitter: transmitter.data.emisor.comuna_seleccionada,
            city_transmitter: dataCotizacion.data.city_transmitter,
            type_sale_transmitter: transmitter.data.emisor.tipos_de_venta.length > 0 ? transmitter.data.emisor.tipos_de_venta[0][0] : '',
            type_sale_transmitter_array: transmitter.data.emisor.tipos_de_venta,
            
            facturaId: transmitter.data.id,
            token: transmitter.data.token,
            searchReceptorDefault : autoReceptorSearch,

            rut_client: dataCotizacion.data.rut_client,
            business_name_client: dataCotizacion.data.business_name_client,
            address_client: dataCotizacion.data.address_client,
            city_client: dataCotizacion.data.city_client,
            spin_client: dataCotizacion.data.spin_client,
            type_buy_client: dataCotizacion.data.type_buy_client,
            actividad_economica_client: dataCotizacion.data.actividad_economica_client,
            
            name_contact: dataCotizacion.data.name_contact,
            phone_contact: dataCotizacion.data.phone_contact,
            email_contact: dataCotizacion.data.email_contact,
            
            name_seller: dataCotizacion.data.name_seller,
            phone_seller: dataCotizacion.data.phone_seller,
            email_seller: dataCotizacion.data.email_seller,
            comment: dataCotizacion.data.comment,

            date_issue: moment(dataCotizacion.data.date_issue).tz('America/Santiago').format('YYYY-MM-DD'),
            date_expiration: moment(dataCotizacion.data.date_expiration).tz('America/Santiago').format('YYYY-MM-DD'),
            type_api: dataCotizacion.data.type_api,
            total_with_iva : dataCotizacion.data.total_with_iva, // si esta en true en el total de las cotizaciones se muestra iva si no el iva va en los productos y no se muestra el iva al final
            price_list: "",
            type_effect: dataCotizacion.data.type_effect,
            status: dataCotizacion.data.status,
            ref: dataCotizacion.data.ref,
            id_branch_office: dataCotizacion.data.id_branch_office,
            date_issue_invoice: moment().tz('America/Santiago').format('YYYY-MM-DD'),
            comuna_client: dataCotizacion.data.comuna_client,
            type_invoicing : dataCotizacion.data.type_effect
          })
        })
      }else{
        setCotizationData(oldData => {
          return Object.assign({},oldData,{
            actividad_economica_transmitter_array: transmitter.data.emisor.actvidades_economicas,
            actividad_economica_transmitter : transmitter.data.emisor.actvidades_economicas.length > 0 ? transmitter.data.emisor.actvidades_economicas[0][0] : props.configGeneral.actividad_economica,
            city_transmitter : transmitter.data.emisor.ciudad_seleccionada,
            comuna_transmitter: transmitter.data.emisor.comuna_seleccionada,
            address_transmitter:  transmitter.data.emisor.direccion_seleccionada,
            address_transmitter_array: transmitter.data.emisor.direcciones[0],
            business_name_transmitter : transmitter.data.emisor.razon_social,
            spin_transmitter : transmitter.data.emisor.giro,
            type_sale_transmitter_array: transmitter.data.emisor.tipos_de_venta,
            type_sale_transmitter: transmitter.data.emisor.tipos_de_venta.length > 0 ? transmitter.data.emisor.tipos_de_venta[0][0] : '',
            facturaId: transmitter.data.id,
            token: transmitter.data.token,
            searchReceptorDefault : autoReceptorSearch
          })
        })
      }
       
    }).catch(err => {
      setCotizationData({...props.cotizationData,type_invoicing: null})
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })*/
    if (dataCotizacion) {
      setCotizationData((currentData) =>
        Object.assign({}, currentData, {
          type_invoicing: false,
          ref: dataCotizacion.data.ref,
        })
      );
    }
    setshowSections(1);
  };

  const searchClientReceptorGuide = async (
    rutSearch = false,
    dataCoti = null
  ) => {
    try {
      let rut_value = rutSearch ? rutSearch : cotizationData.rut_client_search;
      if (dataCoti) {
        // código de ejercicio... remover para producción
        setCotizationData((oldData) => {
          return Object.assign({}, oldData, {
            type_api: dataCoti.type_api,
            name_contact: dataCoti.name_contact,
            email_contact: dataCoti.email_contact,
            phone_contact: dataCoti.phone_contact,
            name_seller: dataCoti.name_seller,
            phone_seller: dataCoti.phone_seller,
            email_seller: dataCoti.email_seller,
            ref: dataCoti.ref,
            id_branch_office: dataCoti.id_branch_office,
          });
        });
      }

      return;
      let emisor = await axios.get(API_URL + "search_emisor_guide");
      if (rut_value) {
        toast.info("Buscando datos, espere por favor...");
        if (!displayLoading) {
          setDisplayLoading(true);
        }
        let receptor = await axios.get(
          API_URL + "search_receptor_guide/" + emisor.data.id + "/" + rut_value
        );
        setCotizationData((oldData) => {
          return Object.assign({}, oldData, {
            type_api: dataCoti.type_api,
            name_contact: dataCoti.name_contact,
            email_contact: dataCoti.email_contact,
            phone_contact: dataCoti.phone_contact,
            name_seller: dataCoti.name_seller,
            phone_seller: dataCoti.phone_seller,
            email_seller: dataCoti.email_seller,
            ref: dataCoti.ref,
            id_branch_office: dataCoti.id_branch_office,

            actividad_economica_transmitter_array:
              emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter: emisor.data.emisor
              .actividad_economica_seleccionada
              ? emisor.data.emisor.actividad_economica_seleccionada
              : emisor.data.emisor.actvidades_economicas[0][0],
            city_transmitter: emisor.data.emisor.ciudad_seleccionada,
            email_transmitter: emisor.data.emisor.correo,
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            address_transmitter: emisor.data.emisor.direccion_seleccionada,
            address_transmitter_array: emisor.data.emisor.direcciones[0],
            business_name_transmitter: emisor.data.emisor.razon_social,
            rut_transmitter: props.configGeneral.enterprise.rut,
            spin_transmitter: emisor.data.emisor.giro,
            type_transfer_trasmitter_array: API_FACTURACION
              ? emisor.data.tipos_de_traslado
              : emisor.data.tipos_de_venta,
            type_transfer_trasmitter: API_FACTURACION
              ? emisor.data.tipos_de_traslado.length > 0
                ? emisor.data.tipos_de_traslado[0].id
                : ""
              : "",
            facturaId: API_FACTURACION ? emisor.data.id : "", //result.data.facturaID,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter:
              emisor.data.emisor.tipos_de_venta.length > 0
                ? emisor.data.emisor.tipos_de_venta[0][0]
                : "",
            facturaId: emisor.data.id,

            rut_client:
              receptor.data.receptor.rut + "-" + receptor.data.receptor.dv,
            business_name_client: receptor.data.receptor.razon_social,
            address_client_array: receptor.data.receptor.direcciones[0],
            address_client: receptor.data.receptor.direccion_seleccionada,
            comuna_client: receptor.data.receptor.comuna_seleccionada,
            city_client: receptor.data.receptor.ciudad_seleccionada,
            spin_client_array: Array.isArray(receptor.data.girosReceptor)
              ? receptor.data.girosReceptor
              : [receptor.data.girosReceptor],
            spin_client: Array.isArray(receptor.data.girosReceptor)
              ? receptor.data.girosReceptor[0].nombre
              : receptor.data.girosReceptor.nombre,
            type_buy_client_array: Array.isArray(receptor.data.TipoDeCompra)
              ? receptor.data.TipoDeCompra
              : [receptor.data.TipoDeCompra],
            type_buy_client: receptor.data.receptor.tipoDeCompraId.toString(),
          });
        });
        setDisplayLoading(false);
      } else {
        setCotizationData((oldData) => {
          return Object.assign({}, oldData, {
            type_api: dataCoti.type_api,
            name_contact: dataCoti.name_contact,
            email_contact: dataCoti.email_contact,
            phone_contact: dataCoti.phone_contact,
            name_seller: dataCoti.name_seller,
            phone_seller: dataCoti.phone_seller,
            email_seller: dataCoti.email_seller,
            ref: dataCoti.ref,
            id_branch_office: dataCoti.id_branch_office,

            actividad_economica_transmitter_array:
              emisor.data.emisor.actvidades_economicas,
            actividad_economica_transmitter: emisor.data.emisor
              .actividad_economica_seleccionada
              ? emisor.data.emisor.actividad_economica_seleccionada
              : emisor.data.emisor.actvidades_economicas[0][0],
            city_transmitter: emisor.data.emisor.ciudad_seleccionada,
            email_transmitter: emisor.data.emisor.correo,
            comuna_transmitter: emisor.data.emisor.comuna_seleccionada,
            address_transmitter: emisor.data.emisor.direccion_seleccionada,
            address_transmitter_array: emisor.data.emisor.direcciones[0],
            business_name_transmitter: emisor.data.emisor.razon_social,
            rut_transmitter: props.configGeneral.enterprise.rut,
            spin_transmitter: emisor.data.emisor.giro,
            type_transfer_trasmitter_array: API_FACTURACION
              ? emisor.data.tipos_de_traslado
              : emisor.data.tipos_de_venta,
            type_transfer_trasmitter: API_FACTURACION
              ? emisor.data.tipos_de_traslado.length > 0
                ? emisor.data.tipos_de_traslado[0].id
                : ""
              : "",
            facturaId: API_FACTURACION ? emisor.data.id : "", //result.data.facturaID,
            type_sale_transmitter_array: emisor.data.emisor.tipos_de_venta,
            type_sale_transmitter:
              emisor.data.emisor.tipos_de_venta.length > 0
                ? emisor.data.emisor.tipos_de_venta[0][0]
                : "",
            facturaId: emisor.data.id,
          });
        });
        setDisplayLoading(false);
      }
    } catch (error) {
      toast.error(
        "No se ha podido cargar la guía , intentelo de nuevo por favor"
      );
      setTimeout(() => {
        goToDashboard();
      }, 1500);
    }
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
        type_document: "HES",
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

  const clearData = () => {};

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
            window.open(item.pdf_public_url, "_blank");
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
              window.open(item.url, "_blank");
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
            if (item) window.open(item.pdf_public_url, "_blank");
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
      if (
        e.target.name === "type_invoicing" &&
        arrayInvoice.includes(props.type)
      ) {
        if (
          cotizationData.type_invoicing !== true &&
          cotizationData.type_invoicing !== false
        ) {
          let val = e.target.value === "false" ? false : true;
          setCotizationData({ ...cotizationData, type_invoicing: val });
          searchReceptorEmisorInvoice(
            arraySearchDefaultInvoiceRecetor.includes(props.type) ? false : true
          );
        } else {
          toast.error("Error ya inicio una factura previamente");
        }
      } else {
        let val = e.target.value === "false" ? false : true;
        setCotizationData({ ...cotizationData, [e.target.name]: val });
      }
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
    if (
      arrayInvoice.includes(props.type) &&
      cotizationData.type_invoicing !== true &&
      cotizationData.type_invoicing !== false
    ) {
      return false;
    }
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
          !cotizationData.way_of_payment
        ) {
          return [
            false,
            arrayInvoice.includes(props.type)
              ? "Todos los campos de esta sección son requeridos"
              : "Todos los campos de esta sección son requeridos menos el descuento global",
          ];
        } else {
          if (
            arraySaleNote.includes(props.type) &&
            !cotizationData.type_invoicing
          ) {
            return [
              false,
              "Todos los campos de esta sección son requeridos menos el descuento global",
            ];
          }
          return [true];
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
            !cotizationData.spin_client ||
            !cotizationData.name_contact
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
            !cotizationData.spin_client ||
            !cotizationData.name_contact
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
          <Col sm={6} md={6} lg={6}>
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
                      className={
                        showSections === 4
                          ? "indicatorsCircleActive"
                          : "indicatorsCircle"
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
                        Pagos de la boleta
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
                      Resumen y Totales
                    </div>
                  </OverlayTrigger>
                </div>
              </Col>
            </Row>
          </Col>
          {arrayCotizacion.includes(props.type) ||
          arraySaleNote.includes(props.type) ? (
            <Col sm={4} md={4} lg={4}>
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
                handleChange={() => {}}
              />
              <Row className="justify-content-center">
                <Col sm={6} md={6} lg={6}>
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
          ) : (
            <Col sm={4} md={4} lg={4}>
              <Button
                variant="secondary"
                size="sm"
                block={true}
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
            onSubmit={() => {}}
            noValidate
            validated={validated}
            ref={inputRef}
          >
            <React.Fragment>
              {displayMembreteCotizacion()}
              <br />
              {showSections === 0 ? (
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12} className="text-center">
                        <b>Tipo de Factura</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_invoicing"
                            type={"radio"}
                            id={`radio-5`}
                            label={`Afecta`}
                            value={true}
                            checked={cotizationData.type_invoicing === true}
                            required={true}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6} className="text-right">
                        <Form.Group>
                          <Form.Check
                            name="type_invoicing"
                            type={"radio"}
                            id={`radio-6`}
                            label={`Excento`}
                            value={false}
                            required={true}
                            checked={cotizationData.type_invoicing === false}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : showSections === 1 ? (
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
                    <Col sm={4} lg={4} md={4}>
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
                    {arrayCotizacion.includes(props.type) ? (
                      <Col sm={4} lg={4} md={4}>
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
                      <Col sm={4} lg={4} md={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                  <Col sm={4} md={4} lg={4}>
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
                  <Col sm={4} md={4} lg={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                    <Col sm={4} md={4} lg={4}>
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
                    isType={props.type}
                  />
                  {arrayCotizacion.includes(props.type) ? (
                    <Row className="justify-content-center">
                      <Col sm={3} md={3} lg={3}>
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
                      <Col sm={3} md={3} lg={3}>
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
                      <Col sm={3} md={3} lg={3}>
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
                      <Col sm={3} md={3} lg={3}>
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
                      <Col sm={3} md={3} lg={3}>
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
                      <Col sm={3} md={3} lg={3}>
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
                  handleClientSubmit={() => {}}
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
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
    configStore: state.configs.configStore,
  };
}

export default connect(mapStateToProps, {})(ContainerFormInvoice);
