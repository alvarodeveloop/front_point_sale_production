import React from 'react'
import PropTypes from 'prop-types';
import { Badge, Modal, Row, Col, Button } from 'react-bootstrap';
import { showPriceWithDecimals } from "utils/functions";
import * as moment from 'moment-timezone'


export default function ModalCotizationDetail(props) {

    const displayMehotdSale = (method) => {
        method = parseInt(method);
        if (method === 1) {
            return "Unidad";
        } else if (method === 2) {
            return "Mayorista";
        } else {
            return "(Litros, Kg, Etc..)";
        }
    };

    return (
        <Modal
            onHide={props.handleModalDetail}
            show={props.globalState.isOpenModalDetail}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="header_dark">
                <Modal.Title id="contained-modal-title-vcenter">
                    Detalles de la Cotización N°{" "}
                    {Object.keys(props.globalState.cotizationDetail).length > 0
                        ? props.globalState.cotizationDetail.ref
                        : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className="title_principal text-center">
                            Datos del Registrador
                        </h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Nombre</th>
                                    <th className="text-center">Rut</th>
                                    <th className="text-center">Dirección</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Fono</th>
                                    <th className="text-center">País</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <tr>
                                        <td>
                                            {props.globalState.cotizationDetail.business_name_transmitter}
                                        </td>
                                        <td>{props.globalState.cotizationDetail.rut_transmitter}</td>
                                        <td>
                                            {props.globalState.cotizationDetail.address_transmitter}
                                        </td>
                                        <td>{props.globalState.cotizationDetail.email_transmitter}</td>
                                        <td>{props.globalState.cotizationDetail.phone_transmitter}</td>
                                        <td>
                                            {props.globalState.cotizationDetail.country_transmitter}
                                        </td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className="title_principal text-center">Datos del Cliente</h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Razon Social / Nombre</th>
                                    <th className="text-center">Rut</th>
                                    <th className="text-center">Dirección</th>
                                    <th className="text-center">Ciudad</th>
                                    <th className="text-center">Comuna</th>
                                    <th className="text-center">Giro</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <tr>
                                        <td>
                                            {props.globalState.cotizationDetail.business_name_client}
                                        </td>
                                        <td>{props.globalState.cotizationDetail.rut_client}</td>
                                        <td>{props.globalState.cotizationDetail.address_client}</td>
                                        <td>{props.globalState.cotizationDetail.city_client}</td>
                                        <td>{props.globalState.cotizationDetail.comuna_client}</td>
                                        <td>{props.globalState.cotizationDetail.spin_client}</td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className="title_principal text-center">
                            Datos del Contacto
                        </h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Nombre</th>
                                    <th className="text-center">Fono</th>
                                    <th className="text-center">Email</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <tr>
                                        <td>{props.globalState.cotizationDetail.name_contact}</td>
                                        <td>{props.globalState.cotizationDetail.phone_contact}</td>
                                        <td>{props.globalState.cotizationDetail.email_contact}</td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h4 className="title_principal text-center">
                            Datos del Vendedor
                        </h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Nombre</th>
                                    <th className="text-center">Fono</th>
                                    <th className="text-center">Email</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <tr>
                                        <td>{props.globalState.cotizationDetail.name_seller}</td>
                                        <td>{props.globalState.cotizationDetail.phone_seller}</td>
                                        <td>{props.globalState.cotizationDetail.email_seller}</td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12} className="table-responsive">
                        <h4 className="title_principal text-center">
                            Productos de la Cotización
                        </h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Categoria</th>
                                    <th className="text-center">Nombre</th>
                                    <th className="text-center">Descripción</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Precio</th>
                                    <th className="text-center">Descuento</th>
                                    <th className="text-center">Método de Venta</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <React.Fragment>
                                        {props.globalState.cotizationDetail.products.map((v, i) => (
                                            <tr key={i}>
                                                <td>{v.category}</td>
                                                <td>{v.name_product}</td>
                                                <td>{v.description}</td>
                                                <td>{v.quantity}</td>
                                                <td>
                                                    {props.configGeneral.simbolo_moneda}
                                                    {showPriceWithDecimals(
                                                        props.configGeneral,
                                                        props.globalState.cotizationDetail.total_with_iva
                                                            ? v.price
                                                            : v.total
                                                    )}
                                                </td>
                                                <td>{v.discount ? v.discount + "%" : ""}</td>
                                                <td>{displayMehotdSale(v.method_sale)}</td>
                                                <td>
                                                    <Badge variant="danger" className="font-badge">
                                                        {props.configGeneral.simbolo_moneda}
                                                        {showPriceWithDecimals(props.configGeneral, v.total)}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {v.status == 1
                                                        ? "Pendiente"
                                                        : v.status == 2
                                                            ? "Pagado"
                                                            : "Anulado"}
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12} className="">
                        <h4 className="title_principal text-center">
                            Gastos de la Cotización
                        </h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Descripción</th>
                                    <th className="text-center">Monto</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <React.Fragment>
                                        {props.globalState.cotizationDetail.gastos.map((v, i) => (
                                            <tr>
                                                <td>{v.description}</td>
                                                <td>
                                                    <Badge variant="danger" className="font-badge">
                                                        {props.configGeneral.simbolo_moneda}
                                                        {showPriceWithDecimals(props.configGeneral, v.amount)}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                {Object.keys(props.globalState.cotizationDetail).length > 0 &&
                    props.globalState.cotizationDetail.referencias &&
                    props.globalState.cotizationDetail.referencias.length > 0 ? (
                    <Row>
                        <Col sm={12} md={12} lg={12} className="">
                            <h4 className="title_principal text-center">
                                Referencias de la Cotización
                            </h4>
                            <br />
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Tipo de Documento</th>
                                        <th className="text-center">Referencia Cotiz.</th>
                                        <th className="text-center">Ind</th>
                                        <th className="text-center">Fecha Ref.</th>
                                        <th className="text-center">Razón de Referencia</th>
                                        <th className="text-center">Tipo de Código</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                        <React.Fragment>
                                            {props.globalState.cotizationDetail.referencias.map(
                                                (v, i) => (
                                                    <tr>
                                                        <td>{v.type_document}</td>
                                                        <td>{v.ref_cotizacion}</td>
                                                        <td>{v.ind}</td>
                                                        <td>
                                                            {v.date_ref
                                                                ? moment(v.date_ref)
                                                                    .tz("America/Santiago")
                                                                    .format("DD-MM-YYYY")
                                                                : ""}
                                                        </td>
                                                        <td>{v.reason_ref}</td>
                                                        <td>{v.type_code}</td>
                                                    </tr>
                                                )
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        ""
                                    )}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                ) : (
                    ""
                )}
                <Row>
                    <Col sm={12} md={12} lg={12} className="">
                        <h4 className="title_principal text-center">Totales</h4>
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Neto</th>
                                    <th className="text-center">Iva</th>
                                    <th className="text-center">Gastos</th>
                                    <th className="text-center">Descuento Global</th>
                                    <th className="text-center">Total Balance</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                                    <tr>
                                        <td>
                                            <Badge variant="danger" className="font-badge">
                                                {props.configGeneral.simbolo_moneda}
                                                {showPriceWithDecimals(
                                                    props.configGeneral,
                                                    props.globalState.cotizationDetail.total_product,
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge variant="danger" className="font-badge">
                                                {props.configGeneral.simbolo_moneda}
                                                {showPriceWithDecimals(
                                                    props.configGeneral,
                                                    props.globalState.cotizationDetail.total_iva
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge variant="danger" className="font-badge">
                                                {props.configGeneral.simbolo_moneda}
                                                {showPriceWithDecimals(
                                                    props.configGeneral,
                                                    props.globalState.cotizationDetail.total_gastos,
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge variant="danger" className="font-badge">
                                                {props.configGeneral.simbolo_moneda}
                                                {showPriceWithDecimals(
                                                    props.configGeneral,
                                                    props.globalState.cotizationDetail.discount_global_amount,
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge variant="danger" className="font-badge">
                                                {props.configGeneral.simbolo_moneda}
                                                {showPriceWithDecimals(
                                                    props.configGeneral,
                                                    props.globalState.cotizationDetail.total_balance,
                                                )}
                                            </Badge>
                                        </td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        {Object.keys(props.globalState.cotizationDetail).length > 0 ? (
                            <h5>
                                Mostrar solo los Totales:{" "}
                                <Badge variant="primary" className="font-badge">
                                    {props.globalState.cotizationDetail.total_with_iva ? "No" : "Si"}
                                </Badge>
                            </h5>
                        ) : (
                            ""
                        )}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button size="md" variant="secondary" onClick={props.handleModalDetail}>
                    cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalCotizationDetail.propTypes = {
    globalState: PropTypes.object,
    handleModalDetail: PropTypes.func,
    configGeneral: PropTypes.object,
}