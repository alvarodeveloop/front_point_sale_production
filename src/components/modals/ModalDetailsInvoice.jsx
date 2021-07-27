import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button, Badge } from 'react-bootstrap'
import { showPriceWithDecimals } from 'utils/functions'
import * as moment from 'moment-timezone';

function ModalDetailsInvoice(props) {

  const displayMehotdSale = method => {
    method = parseInt(method)
    if (method === 1) {
      return "Unidad"
    } else if (method === 2) {
      return "Mayorista"
    } else {
      return "(Litros, Kg, Etc..)"
    }
  }

  return (
    <Modal
      show={props.isOpenModalDetail}
      onHide={props.handleModalDetail}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Detalles de la Factura N° {Object.keys(props.cotizationDetail).length > 0 ? props.cotizationDetail.ref : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} className="table-responsive">
            <h4 className="title_principal text-center">Datos del Registrador</h4>
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Rut</th>
                  <th className="text-center">Dirección</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Fono</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <tr>
                    <td>{props.cotizationDetail.business_name_transmitter}</td>
                    <td>{props.cotizationDetail.rut_transmitter}</td>
                    <td>{props.cotizationDetail.address_transmitter}</td>
                    <td>{props.cotizationDetail.email_transmitter}</td>
                    <td>{props.cotizationDetail.phone_transmitter}</td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} lg={12} className="table-responsive">
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
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <tr>
                    <td>{props.cotizationDetail.business_name_client}</td>
                    <td>{props.cotizationDetail.rut_client}</td>
                    <td>{props.cotizationDetail.address_client}</td>
                    <td>{props.cotizationDetail.city_client}</td>
                    <td>{props.cotizationDetail.comuna_client}</td>
                    <td>{props.cotizationDetail.spin_client}</td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        {!props.isBill && (
          <>
            <Row>
              <Col sm={12} md={12} lg={12} className="table-responsive">
                <h4 className="title_principal text-center">Datos del Contacto</h4>
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
                    {Object.keys(props.cotizationDetail).length > 0 ? (
                      <tr>
                        <td>{props.cotizationDetail.name_contact}</td>
                        <td>{props.cotizationDetail.phone_contact}</td>
                        <td>{props.cotizationDetail.email_contact}</td>
                      </tr>
                    ) : ''}
                  </tbody>
                </table>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={12} md={12} lg={12} className="table-responsive">
                <h4 className="title_principal text-center">Datos del Vendedor</h4>
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
                    {Object.keys(props.cotizationDetail).length > 0 ? (
                      <tr>
                        <td>{props.cotizationDetail.name_seller}</td>
                        <td>{props.cotizationDetail.phone_seller}</td>
                        <td>{props.cotizationDetail.email_seller}</td>
                      </tr>
                    ) : ''}
                  </tbody>
                </table>
              </Col>
            </Row>
          </>
        )}
        <br />
        <Row>
          <Col sm={12} md={12} lg={12} className="table-responsive">
            <h4 className="title_principal text-center">Productos de la Factura</h4>
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
                  <th className="text-center">Neto</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <React.Fragment>
                    {props.cotizationDetail.products.map((v, i) => (
                      <tr>
                        <td>{v.category}</td>
                        <td>{v.name_product}</td>
                        <td>{v.description}</td>
                        <td>{v.quantity}</td>
                        <td>{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.total_with_iva ? v.price : v.total)}</td>
                        <td>{v.discount}</td>
                        <td>{displayMehotdSale(v.method_sale)}</td>
                        <td>{v.is_neto ? 'Neto' : "Iva"}</td>
                        <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, v.total)}</Badge></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} lg={12} className="table-responsive">
            <h4 className="title_principal text-center">Gastos de la Factura</h4>
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Descripción</th>
                  <th className="text-center">Monto</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <React.Fragment>
                    {props.cotizationDetail.gastos.map((v, i) => (
                      <tr>
                        <td>{v.description}</td>
                        <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, v.amount)}</Badge></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        {Object.keys(props.cotizationDetail).length > 0 && props.cotizationDetail.refs.length > 0 ? (
          <Row>
            <Col sm={12} md={12} lg={12} className="table-responsive">
              <h4 className="title_principal text-center">Referencias de la Factura</h4>
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
                  {Object.keys(props.cotizationDetail).length > 0 ? (
                    <React.Fragment>
                      {props.cotizationDetail.refs.map((v, i) => (
                        <tr>
                          <td>{v.type_document}</td>
                          <td>{v.ref_invoice}</td>
                          <td>{v.ind}</td>
                          <td>{v.date_ref ? moment(v.date_ref).tz('America/Santiago').format('DD-MM-YYYY') : ''}</td>
                          <td>{v.reason_ref}</td>
                          <td>{v.type_code}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
        ) : ''}
        <Row>
          <Col sm={12} md={12} lg={12} className="table-responsive">
            <h4 className="title_principal text-center">Totales</h4>
            <br />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Total Neto</th>
                  <th className="text-center">Total Iva</th>
                  <th className="text-center">Total Gastos</th>
                  {!props.isBill && (
                    <th className="text-center">Total Descuento Global</th>
                  )}
                  <th className="text-center">Total Balance</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <tr>
                    <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.total_product)}</Badge></td>
                    <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.total_iva)}</Badge></td>
                    <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.total_gastos)}</Badge></td>
                    {!props.isBill && (
                      <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.discount_global_amount)}</Badge></td>
                    )}
                    <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral, props.cotizationDetail.total_balance)}</Badge></td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={6} md={6} lg={6}>
            {Object.keys(props.cotizationDetail).length > 0 ? (
              <h5>Mostrar solo los Totales: <Badge variant="primary" className="font-badge">{props.cotizationDetail.total_with_iva ? 'No' : "Si"}</Badge></h5>
            ) : ''}
          </Col>
          <Col sm={6} md={6} lg={6} className="text-center">
            {props.isGuide ? (
              <h5>Tipo de Traslado: <Badge variant="primary" className="font-badge">{props.cotizationDetail.type_transfer_trasmitter}</Badge></h5>
            ) : (
              <>
                {Object.keys(props.cotizationDetail).length > 0 ? (
                  <h5>Método de Pago: <Badge variant="primary" className="font-badge">{props.cotizationDetail.way_of_payment}</Badge></h5>
                ) : ''}
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={props.handleModalDetail}>cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalDetailsInvoice.propTypes = {
  isOpenModalDetail: PropTypes.bool,
  handleModalDetail: PropTypes.func,
  cotizationDetail: PropTypes.object,
  configGeneral: PropTypes.object,
  isBill: PropTypes.bool, // true si es una boleta
  isGuide: PropTypes.bool,
}

export default ModalDetailsInvoice

