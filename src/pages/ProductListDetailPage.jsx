import React, { useState, useEffect, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Form, Container, Row, Col, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "utils/constants";
import InputFieldRef from "components/input/InputComponentRef";
import { toast } from "react-toastify";
import LoadingComponent from "components/LoadingComponent";
import Table from "components/Table";
import { FaTrash, FaFileExcel } from "react-icons/fa";
import { showPriceWithDecimals } from "utils/functions";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import * as moment from "moment-timezone";
import { s2ab } from "utils/functions";
import "styles/pages/ListProductPage.scss";

let id_branch = sessionStorage.getItem("id_branch_office");
let listColumns = [];

export const ProductListDetailPage = (props) => {
  const [objectList, setObjectList] = useState(null);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [listDetails, setListDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [configStore, setConfigStore] = useState({ tax: 19 });
  const [dataForm, setDataForm] = useState({
    id_product: "",
    price: "",
  });
  const [validated, setValidated] = useState(false);
  const [displayExcelSection, setDisplayExcelSection] = useState(false);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  useEffect(() => {
    if (id_branch != props.id_branch_office) {
      toast.error("Esta lista no pertenece a esta sucursal");
      setTimeout(() => {
        props.history.replace("/product/listProduct");
      }, 1500);
    } else {
      fetchData(true);
    }
  }, [props.id_branch_office]);

  listColumns = useMemo(() => {
    return [
      {
        Header: "Producto",
        accessor: (props1) => [props1.products.name_product],
      },
      {
        Header: "Precio",
        accessor: (props1) => [props1.price],
        Cell: (props1) => {
          return (
            <span>
              {showPriceWithDecimals(
                props.configGeneral,
                props1.cell.row.original.price
              )}
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}
            </span>
          );
        },
      },
      {
        Header: "Precio con iva",
        accessor: (props1) => [
          (parseFloat(props1.price) * parseFloat(configStore.tax)) / 100 +
          parseFloat(props1.price),
        ],
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <Badge variant="danger" className="font-badge">
              {showPriceWithDecimals(
                props.configGeneral,
                (parseFloat(original.price) * parseFloat(configStore.tax)) /
                100 +
                parseFloat(original.price),
                2,
                ",",
                "."
              )}{" "}
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}
            </Badge>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: (props1) => {
          const { original } = props1.cell.row;
          return (
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeProductDetailHandler(original)}
            >
              <FaTrash />
            </Button>
          );
        },
      },
    ];
  }, []);

  const fetchData = (type = false) => {
    let promises = [
      axios.get(API_URL + "listProduct/" + props.match.params.id),
    ];

    if (type) {
      promises.push(axios.get(API_URL + "product"));
      promises.push(axios.get(API_URL + "config_store"));
    }

    Promise.all(promises)
      .then((result) => {
        setObjectList(result[0].data);
        setListDetails(result[0].data.details);
        if (type) {
          setProducts(result[1].data);
          setConfigStore(result[2].data);
        }
        setDisplayLoading(false);
        if (displayExcelSection) {
          setDisplayExcelSection(false);
        }
      })
      .catch((err) => {
        props.tokenExpired(err);
        setDisplayLoading(false);
      });
  };

  const onChangeHandler = (e) => {
    e.persist();
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    if (e.target.name === "id_product") {
      let prod = products.find((v) => v.id == e.target.value);
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
        price: prod.price,
      });
      inputRef1.current.focus();
    } else {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    let selectOption = document.getElementById("id_product");
    let element;
    for (let i = 0; i < selectOption.options.length; i++) {
      if (selectOption.options[i].value === selectOption.value) {
        element = selectOption.options[i];
      }
    }
    let productObject = products[element.attributes.dataindex.value];
    let validate = listDetails.find((v) => v.id_product === productObject.id);
    if (!validate) {
      let objectDetailNew = {
        id_product_list: objectList.id,
        id_product: dataForm.id_product,
        price: dataForm.price,
        products: productObject,
      };
      setListDetails((currentData) => [...currentData, objectDetailNew]);
      clearData();
    } else {
      toast.error("Producto repetido, por favor agregue otro....");
    }
  };

  const removeProductDetailHandler = (dataRemove) => {
    setListDetails((currentData) =>
      currentData.filter(
        (v) => parseInt(v.id_product) !== parseInt(dataRemove.id_product)
      )
    );
  };

  const confirmSubmitHandler = () => {
    setDisplayLoading(true);
    let arrayPut = [...listDetails];
    let objectPut = {
      detailProducts: arrayPut,
    };
    axios
      .put(API_URL + "listProductDetail/" + props.match.params.id, objectPut)
      .then((result) => {
        toast.success("Lista modificada con éxito");
        setTimeout(() => {
          goBack();
        }, 1500);
      })
      .catch((err) => {
        setDisplayLoading(false);
        props.tokenExpired(err);
      });
  };

  const goBack = () => {
    props.history.replace("/product/listProduct");
  };
  const clearData = () => {
    setDataForm({
      id_product: "",
      price: "",
    });
    setValidated(false);
    inputRef.current.focus();
  };

  const displayExcelSectionHandler = () => {
    setDisplayExcelSection(!displayExcelSection);
  };

  const displayInputExcelHandler = () => {
    document.getElementById("input-excel").click();
  };

  const downloadExcelTemplate = () => {
    if (!products.length) {
      toast.error("Error, no hay datos para realizar el excel");
    } else {
      setDisplayLoading(true);

      let wb = XLSX.utils.book_new();
      let bodyTable = [["id", "precio", "nombre del producto"]];
      let nameTitle = `Productos la empresa (${props.configGeneral.enterprise.bussines_name})`;
      wb.Props = {
        Title: nameTitle,
        Subject: "Exportación de Productos",
        Author: "Aidy tecnology",
        CreatedDate: moment().format("YYYY-MM-DD"),
      };
      wb.SheetNames.push("Productos");

      products.forEach((item, i) => {
        bodyTable.push([item.id, item.price, item.name_product]);
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Productos"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      let datos = s2ab(wbout);
      FileSaver.saveAs(
        new Blob([datos], { type: "application/octet-stream" }),
        nameTitle + "/" + moment().format("DD-MM-YYYY") + ".xlsx"
      );
      toast.info(
        "Modifique solo el precio en la lista del excel y elimine los productos que no desee agregar",
        {
          autoClose: 7000,
        }
      );
      setDisplayLoading(false);
    }
  };

  const addProductExcelHandler = (e) => {
    setDisplayLoading(true);
    let f = e.target.files[0];
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      excelRequestHandler(data);
    };
    reader.readAsBinaryString(f);
  };

  const excelRequestHandler = (data) => {
    axios
      .post(API_URL + "list_product_excel", {
        data,
        id_list: props.match.params.id,
      })
      .then((result) => {
        toast.success(
          "Registros agregados con éxito : " +
          result.data.positivo +
          "\n registros no agregados : " +
          result.data.negativo
        );
        fetchData();
      })
      .catch((err) => {
        console.log(err, "aqui el error");
        setDisplayLoading(false);
        props.tokenExpired(err);
      });
  };

  return (
    <Container fluid>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {!displayExcelSection ? (
            <>
              <Row>
                <Col>
                  <h4 className="title_principal">
                    Detalle de la lista{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textTransform: "uppercase",
                      }}
                    >
                      {objectList ? objectList.name : ""}
                    </span>
                  </h4>
                </Col>
                <Col>
                  <h4 className="title_principal text-right">
                    Total de productos{" "}
                    <Badge variant="danger" className="font-badge">
                      {listDetails.length}
                    </Badge>
                  </h4>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Form
                    onSubmit={onSubmitHandler}
                    noValidate
                    validated={validated}
                  >
                    <Row className="justify-content-center">
                      <InputFieldRef
                        ref={inputRef}
                        type="select"
                        name="id_product"
                        label="Producto"
                        value={dataForm.id_product}
                        handleChange={onChangeHandler}
                        required={true}
                        cols="col-6 col-md-4 col-sm-4 col-lg-4 col-xl-4"
                        messageErrors={["Requerido"]}
                      >
                        <option value="">--Seleccione--</option>
                        {products.map((v, i) => (
                          <option key={i} value={v.id} dataindex={i}>
                            {v.name_product}
                          </option>
                        ))}
                      </InputFieldRef>
                      <InputFieldRef
                        ref={inputRef1}
                        type="number"
                        name="price"
                        label="Precio"
                        value={dataForm.price}
                        required={true}
                        handleChange={onChangeHandler}
                        cols="col-6 col-md-4 col-sm-4 col-lg-4 col-xl-4"
                        messageErrors={["Requerido"]}
                      />
                    </Row>
                    <Row>
                      <Col className="text-center text-danger">
                        *El botón de agregar es para agregar el item a la tabla
                        y el confirmar para almacenar en la base de datos.
                      </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-center">
                      <Col xs={6} sm={4} md={4} lg={4}>
                        <Button
                          variant="secondary"
                          type="button"
                          block={true}
                          size="sm"
                          onClick={goBack}
                        >
                          Volver
                        </Button>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={4}>
                        <Button
                          variant="danger"
                          type="submit"
                          block={true}
                          size="sm"
                        >
                          Agregar
                        </Button>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={4} className="mt-2 mt-md-0">
                        <Button
                          variant="secondary"
                          type="button"
                          block={true}
                          size="sm"
                          onClick={confirmSubmitHandler}
                        >
                          Confirmar
                        </Button>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={4} className="mt-2 mt-md-0">
                        <Button
                          variant="secondary"
                          type="button"
                          block={true}
                          size="sm"
                          onClick={displayExcelSectionHandler}
                        >
                          Agregar por excel <FaFileExcel />
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <Row className="d-none d-md-flex">
                      <Col sm={4} md={4} lg={4}>
                        <Button
                          variant="secondary"
                          type="button"
                          block={true}
                          size="sm"
                          onClick={displayExcelSectionHandler}
                        >
                          Agregar por excel <FaFileExcel />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Table data={listDetails} columns={listColumns} />
                </Col>
              </Row>
            </>
          ) : (
            <Row className="containerExcel justify-content-center align-items-center">
              <Col sm={4} md={4} lg={4}>
                <Button
                  variant="success"
                  type="button"
                  block={true}
                  size="sm"
                  onClick={downloadExcelTemplate}
                >
                  Descargar Plantilla <FaFileExcel />
                </Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button
                  variant="success"
                  type="button"
                  block={true}
                  size="sm"
                  onClick={displayInputExcelHandler}
                >
                  Subir Plantilla <FaFileExcel />
                </Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button
                  variant="secondary"
                  type="button"
                  block={true}
                  size="sm"
                  onClick={displayExcelSectionHandler}
                >
                  Desplegar tabla
                </Button>
              </Col>
              <input
                type="file"
                id="input-excel"
                style={{ display: "none" }}
                onChange={addProductExcelHandler}
              />
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

ProductListDetailPage.propTypes = {};

const mapStateToProps = (state) => ({
  id_branch_office: state.enterpriseSucursal.id_branch_office,
  id_enterprise: state.enterpriseSucursal.id_enterprise,
  configGeneral: state.configs.config,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListDetailPage);
