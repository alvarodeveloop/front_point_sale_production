import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle, FaFileExcel } from "react-icons/fa";
import axios from "axios";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Image,
  Badge,
  Carousel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL } from "utils/constants";
import Table from "components/Table";
import { confirmAlert } from "react-confirm-alert"; // Import
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import * as moment from "moment-timezone";
import "styles/components/modalComponents.scss";
import "styles/pages/productStyle.scss";
import { formatNumber, s2ab } from "utils/functions";
import layoutHelpers from "shared/layouts/helpers";
import LoadingComponent from "components/LoadingComponent";
let productColumns = [];

const ProductPage = (props) => {
  const [globalState, setGlobalState] = useState({
    product: [],
    isOpen: false,
    productDetail: {},
    isLoading: true,
    showSectionExcel: false,
  });

  useEffect(() => {
    fetchData();
  }, [props.id_branch_office]);

  useEffect(() => {
    layoutHelpers.toggleCollapsed();
    return () => {
      layoutHelpers.toggleCollapsed();
      productColumns = [];
    };
  }, []);

  useMemo(() => {
    productColumns = [
      {
        Header: "Nombre Producto",
        accessor: "name_product",
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <OverlayTrigger
              placement={"bottom"}
              overlay={
                <Tooltip id={"tooltip-disabled2" + original.id}>
                  Hacer click para modificar el producto
                </Tooltip>
              }
            >
              <Button
                size="sm"
                variant="link"
                block={true}
                onClick={() => modifyRegister(original.id)}
              >
                {original.name_product}{" "}
              </Button>
            </OverlayTrigger>
          );
        },
      },
      {
        Header: "P.Venta",
        accessor: "price",
        Cell: (props1) => {
          const price = props1.cell.row.original.price;
          return (
            <Badge variant="danger" className="font-badge">
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}
              {formatNumber(price, 2, ",", ".")}
            </Badge>
          );
        },
      },
      {
        Header: "Categoria",
        accessor: (props) =>
          props.categories.map((v) =>
            v.categories ? v.categories.name_category : ""
          ),
        Cell: (props1) => {
          const { original } = props1.cell.row;
          if (original.categories.length > 1) {
            return (
              <OverlayTrigger
                placement={"right"}
                overlay={
                  <Tooltip id={"tooltip-right"}>
                    <ul className="list-group">
                      {original.categories.map((v, i) => (
                        <li key={i} className="list-group-item">
                          {v.categories ? v.categories.name_category : ""}
                        </li>
                      ))}
                    </ul>
                  </Tooltip>
                }
              >
                <Button sm="sm" type="button" variant="link" block={true}>
                  Categorías
                </Button>
              </OverlayTrigger>
            );
          } else {
            if (original.categories.length > 0) {
              return original.categories[0].categories.name_category;
            } else {
              return "";
            }
          }
        },
      },
      {
        Header: "Tipo de Venta",
        accessor: "method_sale_format",
      },
      {
        Header: "Acciones",
        Cell: (props1) => {
          const id = props1.cell.row.original.id;
          return (
            <DropdownButton
              size="sm"
              id={"drop" + props1.cell.row.original.id}
              title="Seleccione"
              drop="left"
              block="true"
            >
              <Dropdown.Item
                onClick={() => seeAllInformation(props1.cell.row.original)}
              >
                Ver Detalle
              </Dropdown.Item>
              <Dropdown.Item onClick={() => modifyRegister(id)}>
                Modificar
              </Dropdown.Item>
              <Dropdown.Item onClick={() => deleteRegister(id)}>
                Eliminar
              </Dropdown.Item>
            </DropdownButton>
          );
        },
      },
    ];
  }, []);

  const deleteRegister = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-edit">
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button
              className="button-alert"
              onClick={() => {
                confirmDeleteRegister(id);
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

  const seeAllInformation = (data) => {
    setGlobalState((currentState) => {
      return Object.assign({}, currentState, {
        productDetail: {
          code_ean: data.code_ean,
          description: data.description,
          is_neto: data.is_neto_format,
          is_auto_sale: data.is_auto_sale_format,
          sticker_color: data.sticker_color,
          qr_image: data.qr_image,
          img_product: data.img_product,
          gallery: data.gallery,
          detailCost: data.cost_details,
          pack: data.pack,
        },
        isOpen: true,
      });
    });
  };

  const confirmDeleteRegister = (id) => {
    axios
      .delete(API_URL + "product/" + id)
      .then((result) => {
        toast.success("Registro eliminado con éxito");
        fetchData();
      })
      .catch((err) => {
        props.tokenExpired(err);
      });
  };

  const modifyRegister = (id) => {
    props.history.replace("/product/form/" + btoa(id));
  };

  const fetchData = (dispatchInventaryRequest = false) => {
    const promises = [axios.get(API_URL + "product")];

    Promise.all(promises)
      .then((result) => {
        setGlobalState((currentState) => {
          return Object.assign({}, currentState, {
            product: result[0].data,
            isLoading: false,
            showSectionExcel: false,
          });
        });
        if (dispatchInventaryRequest) {
          props.dispatchInventaryHandler();
        }
      })
      .catch((err) => {
        props.tokenExpired(err);
      });
  };

  const goToForm = () => {
    props.history.replace("/product/form");
  };

  const onHide = () => {
    setGlobalState({ ...globalState, isOpen: false });
  };

  const donwloandExcel = async () => {
    window.open(API_URL + "documents/product/cargar_productos.xlsx", "_blank");
    toast.info(
      "Debe llenar el excel con los datos y después cargar el archivo en la opción subir archivo"
    );
  };

  const displayInputFile = () => {
    document.getElementById("inputFile").click();
  };

  const uploadCreateExcel = (e) => {
    setGlobalState({ ...globalState, isLoading: true });
    let f = e.target.files[0];
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      handleRequestCreateExcel(data);
    };
    reader.readAsBinaryString(f);
  };

  const handleRequestCreateExcel = (data) => {
    axios
      .post(API_URL + "product_excel", { data })
      .then((result) => {
        toast.success(
          "Registros importados con éxito : " +
          result.data.positivo +
          "\n registros no importados : " +
          result.data.negativo
        );
        fetchData(true);
      })
      .catch((err) => {
        setGlobalState({ ...globalState, isLoading: false });
        props.tokenExpired(err);
      });
  };

  const displayInputUpload = () => {
    document.getElementById("inputFileUpload").click();
  };

  const uploadEditExcel = (e) => {
    setGlobalState({ ...globalState, isLoading: true });
    let f = e.target.files[0];
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      handleRequestEditExcel(data);
    };
    reader.readAsBinaryString(f);
  };

  const handleRequestEditExcel = (data) => {
    axios
      .put(API_URL + "product_excel_edit", { data })
      .then((result) => {
        toast.success(
          "Registros editados con éxito : " +
          result.data.positivo +
          "\n registros no editados : " +
          result.data.negativo
        );
        fetchData(true);
      })
      .catch((err) => {
        console.log(err, "aqui el error");
        setGlobalState({ ...globalState, isLoading: false });
        props.tokenExpired(err);
      });
  };

  const exportDataExcel = () => {
    if (!globalState.product.length) {
      toast.error("Error, no hay datos para realizar el excel");
    } else {
      let wb = XLSX.utils.book_new();
      let bodyTable = [
        [
          "Nombre",
          "Descripción",
          "Código Ean",
          "Método de Venta",
          "Categoría",
          "Stock",
        ],
      ];
      let nameTitle = `Productos la empresa (${props.configGeneral.enterprise.bussines_name})`;
      wb.Props = {
        Title: nameTitle,
        Subject: "Exportación de Productos",
        Author: "Aidy tecnology",
        CreatedDate: moment().format("YYYY-MM-DD"),
      };
      wb.SheetNames.push("Productos");

      globalState.product.forEach((item, i) => {
        let categoriesString = "";
        item.categories.forEach((item1, i1) => {
          categoriesString += item1.name_category + " - ";
        });
        categoriesString = categoriesString
          ? categoriesString.substring(0, categoriesString.length - 3)
          : "Sin categorias";

        bodyTable.push([
          item.name_product,
          item.description,
          item.code_ean,
          item.method_sale_format,
          categoriesString,
          item.inventary[0].stock,
        ]);
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Productos"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      let datos = s2ab(wbout);
      FileSaver.saveAs(
        new Blob([datos], { type: "application/octet-stream" }),
        nameTitle + "/" + moment().format("DD-MM-YYYY") + ".xlsx"
      );
    }
  };
  const displayExcelSectionHandler = () => {
    setGlobalState({
      ...globalState,
      showSectionExcel: !globalState.showSectionExcel,
    });
  };

  const downloadExcelToUploadHandler = () => {
    if (!globalState.product.length) {
      toast.error("Error, no hay datos para modificar");
    } else {
      let wb = XLSX.utils.book_new();
      let bodyTable = [
        [
          "id",
          "nombre_producto",
          "precio",
          "descripcion",
          "codigoEan",
          "cantidad",
        ],
      ];
      let nameTitle = `Plantilla para modificar los productos de la empresa (${props.configGeneral.enterprise.bussines_name})`;
      wb.Props = {
        Title: nameTitle,
        Subject: "Exportación de Productos",
        Author: "Aidy tecnology",
        CreatedDate: moment().format("YYYY-MM-DD"),
      };
      wb.SheetNames.push("Productos");

      globalState.product.forEach((item, i) => {
        bodyTable.push([
          item.id,
          item.name_product,
          item.price,
          item.description,
          item.code_ean,
          item.inventary[0].stock,
        ]);
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Productos"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      let datos = s2ab(wbout);
      toast.info(
        "No borre ningún registro de la tabla id, es el único registro que no debe ser alterado",
        {
          autoClose: 7000,
        }
      );
      FileSaver.saveAs(
        new Blob([datos], { type: "application/octet-stream" }),
        nameTitle + ".xlsx"
      );
    }
  };

  return (
    <Container>
      {globalState.isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {globalState.showSectionExcel ? (
            <>
              <Row className="excelContainer">
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Row style={{ flexDirection: "column", flex: 1 }}>
                    <Col sm={10} md={10} lg={10} className="marginTopExcelCols">
                      <Button
                        variant="success"
                        block={true}
                        size="sm"
                        onClick={donwloandExcel}
                      >
                        Descargar Plantilla de Carga <FaFileExcel />
                      </Button>
                    </Col>
                    <Col sm={10} md={10} lg={10} className="marginTopExcelCols">
                      <Button
                        variant="success"
                        block={true}
                        size="sm"
                        onClick={displayInputFile}
                      >
                        Cargar Productos <FaFileExcel />
                      </Button>
                    </Col>
                    <Col sm={10} md={10} lg={10} className="marginTopExcelCols">
                      <Button
                        variant="success"
                        block={true}
                        size="sm"
                        onClick={downloadExcelToUploadHandler}
                      >
                        Descargar Plantilla para Modificar <FaFileExcel />
                      </Button>
                    </Col>
                    <Col sm={10} md={10} lg={10} className="marginTopExcelCols">
                      <Button
                        variant="success"
                        block={true}
                        size="sm"
                        onClick={displayInputUpload}
                      >
                        Modificar Productos <FaFileExcel />
                      </Button>
                    </Col>
                    <Col sm={10} md={10} lg={10} className="marginTopExcelCols">
                      <Button
                        variant="success"
                        block={true}
                        size="sm"
                        onClick={exportDataExcel}
                      >
                        Exportar Data <FaFileExcel />
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="secondary"
                    block={true}
                    size="sm"
                    onClick={displayExcelSectionHandler}
                  >
                    Desplegar Tabla
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col sm={8} md={8} lg={8}>
                <br />
                <h4 className="title_principal">Tabla Productos</h4>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <br />
                <Button
                  variant="success"
                  block={true}
                  size="sm"
                  onClick={displayExcelSectionHandler}
                >
                  Operaciones Excel <FaFileExcel />
                </Button>
              </Col>
              <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
                <hr />
                <Row>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <Button
                      variant="success"
                      block={true}
                      size="sm"
                      onClick={goToForm}
                    >
                      Crear Producto <FaPlusCircle />
                    </Button>
                  </Col>
                  <Col sm={6} md={6} lg={6} xs={12} className="text-right">
                    <h5>
                      Total Productos:{" "}
                      <Badge variant="danger" className="title_badge">
                        {globalState.product.length}
                      </Badge>
                    </h5>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} xs={12}>
                    <Table
                      columns={productColumns}
                      data={globalState.product}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </>
      )}
      <Modal
        show={globalState.isOpen}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="font-title">Detalles del Producto</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col sm={6} md={6} lg={6}>
              {Object.keys(globalState.productDetail).length > 0 ? (
                <ul className="">
                  <li className="str">
                    <b>Codigo EAN:&nbsp;&nbsp;</b>{" "}
                    {globalState.productDetail.code_ean}
                  </li>
                  <li className="str">
                    <b>Descripción:&nbsp;&nbsp;</b>{" "}
                    {globalState.productDetail.description}
                  </li>
                  <li className="str">
                    <b>¿Es Neto?:&nbsp;&nbsp;</b>{" "}
                    {globalState.productDetail.is_neto === "Desactivado"
                      ? "No"
                      : "Si"}
                  </li>
                  <li className="str">
                    <b>¿Es auto venta?:&nbsp;&nbsp;</b>{" "}
                    {globalState.productDetail.is_auto_sale === "Desactivado"
                      ? "No"
                      : "Si"}
                  </li>
                  {globalState.productDetail.pack ? (
                    <li className="str">
                      <b>Pack de Venta:&nbsp;&nbsp;</b>{" "}
                      {globalState.productDetail.pack}
                    </li>
                  ) : (
                    ""
                  )}
                  {globalState.productDetail.img_product ? (
                    <li className="str">
                      <b>Imagen del Producto:</b>
                      <br />{" "}
                      <Image
                        src={
                          API_URL +
                          "images/product/principal/" +
                          globalState.productDetail.img_product
                        }
                        thumbnail
                        style={{ width: "50%" }}
                      />
                    </li>
                  ) : (
                    <li className="str">
                      <b>Sin imagen de Presentación</b>
                    </li>
                  )}
                  <li className="str">
                    <b>Qr Imagen:</b>
                    <br />
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={"tooltip-qrImg"}>
                          Hacer click para abrir la imagen en otra ventana
                        </Tooltip>
                      }
                    >
                      <a
                        href={
                          API_URL +
                          "images/product/qr/" +
                          globalState.productDetail.qr_image
                        }
                        target="_blank"
                      >
                        <Image
                          src={
                            API_URL +
                            "images/product/qr/" +
                            globalState.productDetail.qr_image
                          }
                          thumbnail
                          style={{ width: "50%" }}
                        />
                      </a>
                    </OverlayTrigger>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </Col>
            <Col sm={6} md={6} lg={6}>
              {globalState.productDetail.gallery &&
                globalState.productDetail.gallery.length > 0 ? (
                <Row>
                  <Col sm={12} md={12} lg={12} xs={12}>
                    <h4 className="text-center title_principal">
                      Galería de Imagénes
                    </h4>
                  </Col>
                  <div className="clearfix"></div>
                  <br />
                  <br />
                  <Carousel>
                    {globalState.productDetail.gallery.map((v, i) => (
                      <Carousel.Item key={i}>
                        <img
                          className="d-block"
                          src={API_URL + "images/product/gallery/" + v.filename}
                          alt="First slide"
                          style={{ height: "300px", width: "100%" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Row>
              ) : (
                <div style={{ width: "100%" }} className="text-center">
                  <Image
                    src={require("../assets/img/denied.png")}
                    style={{ width: "30%" }}
                  />
                  <br />
                  El producto no posee galeria
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <input
        type="file"
        style={{ display: "none" }}
        id="inputFile"
        onChange={uploadCreateExcel}
        accept=".xlsx"
      />
      <input
        type="file"
        style={{ display: "none" }}
        id="inputFileUpload"
        onChange={uploadEditExcel}
        accept=".xlsx"
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
  };
}

ProductPage.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
  dispatchInventaryHandler: PropTypes.func,
};

export default connect(mapStateToProps, {})(ProductPage);
