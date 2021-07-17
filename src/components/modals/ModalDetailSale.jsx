import React from 'react'
import {
  Modal,
  Button,
  Badge,
  Row,
  Col
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { showPriceWithDecimals, returnTypePayment } from 'utils/functions'

const ModalDetailSale = ({ dataSale, ...props }) => {

  const methodSaleHandle = type_method => {
    switch (parseInt(type_method, 10)) {
      case 1:
        return (<span>Unidad</span>)
        break;
      case 2:
        return (<span>Mayorista</span>)
        break;
      case 3:
        return (<span>Kilos,Litros u Otros</span>)
        break;
    }
  }

  const handleStatus = status => {
    switch (parseInt(status, 10)) {
      case 1:
        return (<span>Pagado</span>)
        break;
      case 2:
        return (<span>En espera</span>)
        break;
      case 3:
        return (<span>Anulado</span>)
        break;
    }
  }

  const displayTotal = datos => {
    let amount_descuento = datos.discount_recharge.length > 0 ? parseFloat(datos.discount_recharge[0].amount_calculate) : 0
    let total = (parseFloat(datos.price) * datos.quantity) - amount_descuento
    return showPriceWithDecimals(props.config, total)
  }

  return (

    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Detalle {props.isDispatch ? "del despacho " : "de la compra "} {dataSale.ref}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="table-responsive">
          <Col>
            <h3 className="title_principal text-center">Cliente</h3>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Razón Social</th>
                  <th className="text-center">Fono</th>
                  <th className="text-center">Dirección</th>
                  <th className="text-center">Documento</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>{dataSale.client ? dataSale.client.name_client : ''}</td>
                  <td>{dataSale.client ? dataSale.client.bussines_name : ''}</td>
                  <td>{dataSale.client ? dataSale.client.phone : ''}</td>
                  <td>{dataSale.client ? dataSale.client.address : ''}</td>
                  <td>{dataSale.client ? (<>{dataSale.client.type_document} <br /> {dataSale.client.data_document}</>) : ''}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br /><br /><br />
        <Row className="table-responsive">
          <Col>
            <h3 className="title_principal text-center">Productos</h3>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Descripción</th>
                  <th className="text-center">Método de Venta</th>
                  <th className="text-center">Descuento o Recargo</th>
                  <th className="text-center">Monto</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {dataSale.products ? dataSale.products.map((v, i) => (
                  <tr key={i}>
                    <td>{v.product.name_product}</td>
                    <td>{props.config.simbolo_moneda + showPriceWithDecimals(props.config, v.price)}</td>
                    <td>{v.quantity}</td>
                    <td>{v.description}</td>
                    <td>{methodSaleHandle(v.method_sale)}</td>
                    <td>{v.discount_recharge.length > 0 ? v.discount_recharge[0].discount_or_recharge
                      ? (<>Descuento<br />{props.config.simbolo_moneda + v.discount_recharge[0].amount_calculate}</>)
                      : (<>Recargo<br />{props.config.simbolo_moneda + v.discount_recharge[0].amount_calculate}</>)
                      : "No posee"}</td>
                    <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, v.price * v.quantity)}</Badge></td>
                  </tr>
                )) : ''}
              </tbody>
            </table>
          </Col>
        </Row>
        <br /><br /><br />
        <Row className="table-responsive">
          <Col>
            <h3 className="title_principal text-center">Descuento o Recargo del Monto Total</h3>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                  <th className="text-center">Monto</th>
                  <th className="text-center">Descuento o Recargo</th>
                  <th className="text-center">Tipo de Operación</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>{props.config.simbolo_moneda + ' ' + showPriceWithDecimals(props.config, dataSale.total_discount_recharge)}</td>
                  <td>{dataSale.type_discount_recharge ? dataSale.type_discount_recharge : 'Ninguno'}</td>
                  <td>{dataSale.type_percentaje_fixed_discount_recharge ? dataSale.type_percentaje_fixed_discount_recharge : 'Ninguno'}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br /><br /><br />
        <Row className="table-responsive">
          <Col>
            <h3 className="title_principal text-center">Totales</h3>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                  <th className="text-center">Subtotal</th>
                  <th className="text-center">Tax</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Monto Pagado</th>
                  <th className="text-center">Vuelto</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, dataSale.sub_total)}</Badge></td>
                  <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, dataSale.tax)}</Badge></td>
                  <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, dataSale.total)}</Badge></td>
                  <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, dataSale.payment)}</Badge></td>
                  <td><Badge variant="danger" className="font-badge">{props.config.simbolo_moneda + showPriceWithDecimals(props.config, dataSale.turned)}</Badge></td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="table-responsive">
          <Col>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                  <th className="text-center">Tax Configurado Al:</th>
                  <th className="text-center">Método de Pago:</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Vendedor</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>{dataSale.tax_configuration}</td>
                  <td>{returnTypePayment(dataSale.type_sale)}</td>
                  <td>{handleStatus(dataSale.status)}</td>
                  <td>{dataSale.user ? dataSale.user.email : ''} - {dataSale.user ? dataSale.user.name : ''}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalDetailSale.propTypes = {
  config: PropTypes.object.isRequired,
  configStore: PropTypes.object.isRequired,
  dataSale: PropTypes.object.isRequired,
  isDispatch: PropTypes.bool
}

export default ModalDetailSale
