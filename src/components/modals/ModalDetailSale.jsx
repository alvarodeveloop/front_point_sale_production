import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Image
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import * as moment from 'moment-timezone'
import { showPriceWithDecimals, returnTypePayment } from 'utils/functions'
import axios from 'axios'

const ModalDetailSale = ({dataSale, ...props}) => {

  const methodSaleHandle = type_method => {
    switch (parseInt(type_method,10)) {
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
    switch (parseInt(status,10)) {
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

  return (

    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white'}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Detalle de la Compra { dataSale.ref }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-center">Cliente</h3>
        <table className="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
              <th className="text-center">Nombre</th>
              <th className="text-center">Fono</th>
              <th className="text-center">Dirección</th>
              <th className="text-center">Documento</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{dataSale.client ? dataSale.client.name_client : ''}</td>
              <td>{dataSale.client ? dataSale.client.phone : ''}</td>
              <td>{dataSale.client ? dataSale.client.address : ''}</td>
              <td>{dataSale.client ? dataSale.client.type_document : ''} <br/> {dataSale.data_document}</td>
            </tr>
          </tbody>
        </table>
        <br/><br/><br/>
        <h3 className="text-center">Productos</h3>
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
              {dataSale.products ? dataSale.products.map((v,i) => (
                <tr key={i}>
                  <td>{v.product.name_product}</td>
                  <td>{props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,v.price)}</td>
                  <td>{v.quantity}</td>
                  <td>{v.description}</td>
                  <td>{methodSaleHandle(v.method_sale)}</td>
                  <td>{ v.discount_recharge.length > 0 ? v.discount_recharge[0].discount_or_recharge ? 'Descuento' : 'Recargo' : 'No posee' }</td>
                  <td>{ v.discount_recharge.length > 0 ? v.discount_recharge[0].amount : 'No posee' }</td>
                </tr>
              )) : ''}

              {dataSale.products_not_registered ? dataSale.products_not_registered.map((v,i) => (
                <tr key={i}>
                  <td>{v.product.name_product}<br/> ( Producto no Registrado )</td>
                  <td>{props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,v.price)}</td>
                  <td>{v.quantity}</td>
                  <td>{v.descriptionSale}</td>
                  <td></td>
                    <td>{ v.discount_recharge.length > 0 ? v.discount_recharge[0].discount_or_recharge ? 'Descuento' : 'Recargo' : '' }</td>
                    <td>{ v.discount_recharge.length > 0 ? v.discount_recharge[0].amount : '' }</td>
                </tr>
              )) : ''}
            </tbody>
          </table>
        <br/><br/><br/>
        <h3 className="text-center">Descuento o Recargo del Monto Total</h3>
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
              <td>{ props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,dataSale.total_discount_recharge) }</td>
              <td>{ dataSale.type_discount_recharge ? dataSale.type_discount_recharge : 'Ninguno' }</td>
              <td>{ dataSale.type_percentaje_fixed_discount_recharge ? dataSale.type_percentaje_fixed_discount_recharge : 'Ninguno'}</td>
            </tr>
          </tbody>
        </table>
        <br/><br/><br/>
        <h3 className="text-center">Totales</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: 'lightblue', color: 'black' }}>
                <th className="text-center">Total</th>
                <th className="text-center">Tax</th>
                <th className="text-center">Subtotal</th>
                <th className="text-center">Monto Pagado</th>
                <th className="text-center">Vuelto</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{ props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,dataSale.total) }</td>
                <td>{ props.config.simbolo_moneda+' '+dataSale.tax }</td>
                <td>{ props.config.simbolo_moneda+' '+dataSale.sub_total }</td>
                <td>{ props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,dataSale.payment) }</td>
                <td>{ props.config.simbolo_moneda+' '+showPriceWithDecimals(props.config,dataSale.turned) }</td>
              </tr>
            </tbody>
          </table>

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
                <td>{ dataSale.tax_configuration }</td>
                <td>{returnTypePayment(dataSale.type_sale)}</td>
                <td>{ handleStatus(dataSale.status) }</td>
                <td>{ dataSale.user ? dataSale.user.email : '' } - { dataSale.user ? dataSale.user.name : '' }</td>
              </tr>
            </tbody>
          </table>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalDetailSale.propTypes = {
  config: PropTypes.object.isRequired,
  configStore: PropTypes.object.isRequired,
  dataSale: PropTypes.object.isRequired
}

export default ModalDetailSale
