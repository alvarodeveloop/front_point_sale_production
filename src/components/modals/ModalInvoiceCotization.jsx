import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "utils/functions";
import { Row, Col, Form, Button, Modal, Badge } from "react-bootstrap";
import LoadingComponent from "components/LoadingComponent";

import { FaShoppingCart } from "react-icons/fa";

const ModalInvoiceCotization = (props) => {
  const determinatedMethodSale = (method) => {
    if (method == 1) {
      return "Unidad";
    } else if (method == 2) {
      return "Mayorista";
    } else {
      return "Litros, Kg, Etc...";
    }
  };

  const onChange = (e, i) => {
    e.persist();
    props.setDetailProducts((oldData) => {
      let newData = [...oldData];
      newData[i][e.target.name] = e.target.checked;
      return newData;
    });
  };

  const handleOnHide = () => {
    props.onHide();
  };

  const onSubmit = () => {
    props.handleSubmit();
  };

  return (
    <Modal
      show={props.isShow}
      onHide={handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Productos a Facturar <FaShoppingCart />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.displayLoading ? (
          <LoadingComponent text={"Enviando petición..."} />
        ) : (
          <Row>
            <Col sm={12} md={12} lg={12} className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgb(218,236,242)",
                      fontWeight: "bold",
                    }}
                  >
                    <th className="text-center">Categoria</th>
                    <th className="text-center">Producto</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Método de Venta</th>
                    <th className="text-center">Inventariable</th>
                    <th className="text-center">Stock Inventario</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Descontar</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {props.products.map((v, i) => (
                    <tr key={i}>
                      <td>{v.category}</td>
                      <td>{v.name_product}</td>
                      <td>
                        {
                          <Badge variant="danger" className="font-badge">
                            {formatNumber(v.price, 2, ",", ".")}
                          </Badge>
                        }
                      </td>
                      <td>{determinatedMethodSale(v.method_sale)}</td>
                      <td>
                        {v.id_product ? (
                          <Badge variant="primary" className="font-badge">
                            Si
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="font-badge">
                            No
                          </Badge>
                        )}
                      </td>
                      <td>
                        {v.id_product
                          ? v.products
                            ? Array.isArray(v.products.inventary)
                              ? v.products.inventary[0].stock
                              : v.products.inventary.stock
                            : v.inventary
                            ? v.inventary[0].stock
                            : "Sin Stock"
                          : "Sin Stock"}
                      </td>
                      <td>{v.quantity}</td>
                      <td>
                        {v.id_product ? (
                          <Form.Check
                            name="discount_stock"
                            type={"checkbox"}
                            id={`radio-5`}
                            label={``}
                            value={true}
                            checked={v.discount_stock}
                            onChange={(e) => onChange(e, i)}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.displayLoading ? (
          ""
        ) : (
          <>
            <Button size="md" variant="secondary" onClick={handleOnHide}>
              cerrar
            </Button>
            <Button size="md" variant="danger" onClick={onSubmit}>
              Enviar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

ModalInvoiceCotization.propTypes = {
  products: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setDetailProducts: PropTypes.func,
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool.isRequired,
  displayLoading: PropTypes.bool,
};

export default ModalInvoiceCotization;
