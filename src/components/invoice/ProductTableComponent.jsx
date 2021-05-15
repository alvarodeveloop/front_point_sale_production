import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import TableProductsCotization from "components/TableProductsCotization";
import InputField from "components/input/InputComponent";
import { FaPlusCircle } from "react-icons/fa";
import ModalCotizacionProduct from "components/modals/ModalCotizacionProduct";
import axios from "axios";
import { API_URL } from "utils/constants";
import { toast } from "react-toastify";
import LoadingComponent from "components/LoadingComponent";

const ProductTableComponent = (props) => {
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  useEffect(() => {}, []);

  const addNewProductIrregular = (type) => {
    props.setDetailProducts([
      ...props.detailProducts,
      {
        category: "",
        name_product: "",
        description: "",
        quantity: "",
        price: "",
        discount: "",
        method_sale: "1",
        total: "",
        is_neto: type,
        discount_stock: false,
      },
    ]);
  };

  const handleHideModalProduct = () => {
    setIsShowModalProduct(false);
  };

  const handleSelectProduct = (product) => {
    // metodo para manejar la escogencia del producto en la modal de productos para el detalle de la cotizacion
    if (!product.quantity) product.quantity = 1;
    if (!product.category) {
      product.category = "";
      if (Array.isArray(product.categories)) {
        product.categories.forEach((item, i) => {
          product.category += item.categories.name_category;
        });
      }
    }
    product.discount_stock = true;
    product.id_product = product.id;
    if (
      product.inventary &&
      Array.isArray(product.inventary) &&
      product.inventary[0].inventary_cost.length
    ) {
      props.setGastosDetail((oldData) => {
        return [
          ...oldData,
          {
            description: product.name_product,
            amount: product.inventary[0].inventary_cost[0].cost,
            id_product: product.id,
          },
        ];
      });
      props.setDetailProducts([...props.detailProducts, product]);
    } else {
      props.setDetailProducts([...props.detailProducts, product]);
    }
    setIsShowModalProduct(false);
  };

  const changeListProductHandler = (e) => {
    e.persist();
    setDisplayLoading(true);
    axios
      .get(API_URL + "productByListProduct/" + e.target.value)
      .then((result) => {
        props.setProducts(result.data);
        setDisplayLoading(false);
      })
      .catch((err) => {
        setDisplayLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          console.log(err);
          toast.error("Error, contacte con soporte");
        }
      });
  };

  return (
    <>
      <Row className="">
        <Col sm={12} md={12} lg={12}>
          <Row className="">
            <Col sm={12} md={12} lg={12} xs={12}>
              <h4 className="title_principal text-center">
                Tabla de Productos
              </h4>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={4} md={4} lg={4}>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-center">
                  <OverlayTrigger
                    placement={"top"}
                    overlay={
                      <Tooltip id="tooltipConfigPrice">
                        Opción para configurar como se muestran los totales de
                        los productos y los totales en el resumen
                      </Tooltip>
                    }
                  >
                    <Form.Label>Configuración de Totales</Form.Label>
                  </OverlayTrigger>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={5} md={5} lg={5} className="text-center">
                  <Form.Group>
                    <Form.Check
                      name="total_with_iva"
                      type={"radio"}
                      id={`radio-3`}
                      label={`Con Iva`}
                      value={true}
                      checked={props.cotizationData.total_with_iva}
                      onChange={props.onChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={5} md={5} lg={5}>
                  <Form.Group>
                    <Form.Check
                      name="total_with_iva"
                      type={"radio"}
                      id={`radio-4`}
                      label={`Solo totales`}
                      value={false}
                      checked={!props.cotizationData.total_with_iva}
                      onChange={props.onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Row>
                <InputField
                  type="select"
                  label="Listado de Productos"
                  name="price_list"
                  required={false}
                  messageErrors={["Requerido*"]}
                  cols="col-md-12 col-lg-12 col-sm-12"
                  handleChange={changeListProductHandler}
                >
                  <option value="">--Seleccione--</option>
                  {props.listData.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </InputField>
              </Row>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Form.Label>Agregar producto a la {props.word2}</Form.Label>
              <DropdownButton
                size="sm"
                variant="danger"
                id={"dropdown_product"}
                title={<FaPlusCircle />}
                className=""
              >
                <Dropdown.Item onClick={() => setIsShowModalProduct(true)}>
                  Agregar Producto desde Inventario
                </Dropdown.Item>
                {/*<Dropdown.Item onClick={() => addNewProductIrregular(true)}>Agregar producto (valor neto) </Dropdown.Item>*/}
                <Dropdown.Item onClick={() => addNewProductIrregular(false)}>
                  Agregar producto
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          {displayLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  overflowY: "auto",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  maxHeight: "300px",
                }}
              >
                <TableProductsCotization
                  setDetailProducts={props.setDetailProducts}
                  detailProducts={props.detailProducts}
                  isShowIva={props.cotizationData.total_with_iva}
                  setGastosDetail={props.setGastosDetail}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
      <ModalCotizacionProduct
        isShow={isShowModalProduct}
        onHide={handleHideModalProduct}
        products={props.products}
        handleSelectProduct={handleSelectProduct}
        handleSelectProductNotRegistered={() => {}}
        {...props}
      />
    </>
  );
};

ProductTableComponent.propTypes = {
  setDetailProducts: PropTypes.func.isRequired,
  detailProducts: PropTypes.array.isRequired,
  cotizationData: PropTypes.object.isRequired,
  setIsShowModalProduct: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setGastosDetail: PropTypes.func.isRequired,
  listData: PropTypes.array,
  setProducts: PropTypes.func,
  type: PropTypes.string,
  word2: PropTypes.string,
};

export default ProductTableComponent;
