import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {showPriceWithDecimals} from 'utils/functions'
import {
  Row,
  Col,
  Badge
} from 'react-bootstrap'
import { displayTotalDiscount, displayTotalTotal, displayTotalGastos, displayTotalIva, displayTotalProduct} from 'utils/functions';

const TableTotalComponent = (props) => {

  let detailProducts = props.detailProducts;
  let discountGlobal = props.cotizationData.discount_global;
  let totalWithIva = props.cotizationData.total_with_iva;
  let tax = props.configStore.tax;
  let gastosDetail = props.gastosDetail;

  const displayMehotdSale = method => {
    method = parseInt(method)
    if(method === 1){
      return "Unidad"
    }else if(method === 2){
      return "Mayorista"
    }else{
      return "(Litros, Kg, Etc..)"
    }
  }

  const displayTotal = productData => {
    let product = Object.assign({},productData)

    if(product.is_neto){
      product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
    }else{
      if(props.isShowIva){
        product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
      }else{
        product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
        product.price = parseFloat( (product.price * props.configStore.tax) / 100) + parseFloat(product.price) // linea para sumar el iva

      }
    }
    return showPriceWithDecimals(props.configGeneral,parseFloat(product.price) * product.quantity);
  }

  return (
    <>
      
        <Row>
          <Col sm={12} md={12} lg={12}>
            <h4 className="title_principal text-center">Datos del Registrador</h4>
            <br/>
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
                {Object.keys(props.cotizationData).length > 0 ? (
                  <tr>
                    <td>{props.cotizationData.business_name_transmitter}</td>
                    <td>{props.cotizationData.rut_transmitter}</td>
                    <td>{props.cotizationData.address_transmitter}</td>
                    <td>{props.cotizationData.email_transmitter}</td>
                    <td>{props.cotizationData.phone_transmitter}</td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <br/>
            <h4 className="title_principal text-center">Datos del Cliente</h4>
            <br/>
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
                {Object.keys(props.cotizationData).length > 0 ? (
                  <tr>
                    <td>{props.cotizationData.business_name_client}</td>
                    <td>{props.cotizationData.rut_client}</td>
                    <td>{props.cotizationData.address_client}</td>
                    <td>{props.cotizationData.city_client}</td>
                    <td>{props.cotizationData.comuna_client}</td>
                    <td>{props.cotizationData.spin_client}</td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </Col>
          <Col sm={12} md={12} lg={12} className="table-responsive">
            <br/>
            <h4 className="title_principal text-center">Productos de la Factura</h4>
            <br/>
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
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationData).length > 0 ? (
                  <React.Fragment>
                    {props.detailProducts.map((v,i) => (
                      <tr key={i}>
                        <td>{v.category}</td>
                        <td>{v.name_product}</td>
                        <td>{v.description}</td>
                        <td>{v.quantity}</td>
                        <td>{props.configGeneral.simbolo_moneda}{ showPriceWithDecimals(props.configGeneral,v.price)}</td>
                        <td>{v.discount}</td>
                        <td>{displayMehotdSale(v.method_sale)}</td>
                        <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{displayTotal(v)}</Badge></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : ''}
              </tbody>
            </table>
          </Col>
          <Col sm={12} md={12} lg={12} className="">
            <br/>
            <h4 className="title_principal text-center">Gastos de la Factura</h4>
            <br/>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Descripción</th>
                  <th className="text-center">Monto</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.keys(props.cotizationData).length > 0 ? (
                  <React.Fragment>
                    {props.gastosDetail.map((v,i) => (
                      <tr key={i}>
                        <td>{v.description}</td>
                        <td><Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,v.amount)}</Badge></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ) : ''}
              </tbody>
            </table>
          </Col>
          {props.bondsPayments.length ? (
            <Col sm={12} md={12} lg={12} className="">
              <br/>
              <h4 className="title_principal text-center">Pagos de la boleta</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Detalle</th>
                    <th className="text-center">Monto</th>
                    <th className="text-center">Tipo de pago</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(props.bondsPayments).length > 0 ? (
                    <React.Fragment>
                      {props.bondsPayments.map((v,i) => (
                        <tr key={i}>
                          <td>{v.detail}</td>
                          <td>{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,v.amount)}</td>
                          <td><Badge variant="danger" className="font-badge">{v.id_type_bond}</Badge></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          ) : ""}
          <Col sm={6} md={6} lg={6}>
            {Object.keys(props.cotizationData).length > 0 ? (
              <h5>Mostrar solo los Totales: <Badge variant="primary" className="font-badge">{props.cotizationData.total_with_iva ? 'No' : "Si"}</Badge></h5>
            ) : ''}
          </Col>
          <Col sm={12} md={12} lg={12}>
            <br/>
            <h4 className="text-center title_principal">Resumen y Totales</h4>
            <br/>
            <table className="table table-bordered">
              <thead>
                {props.cotizationData.total_with_iva ? (
                    <tr>
                      <th className="text-center">Total Neto</th>
                      <th className="text-center">Iva</th>
                      <th className="text-center">Gastos</th>
                      {props.cotizationData.discount_global ? (
                        <th className="text-center">Descuento Global</th>
                      ) : ""}
                      <th className="text-center">Balance Total</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="text-center">Total</th>
                      <th className="text-center">Gastos</th>
                      {props.cotizationData.discount_global ? (
                        <th className="text-center">Descuento Global</th>
                      ) : ""}
                      <th className="text-center">Balance Total</th>
                    </tr>
                  )
                }
              </thead>
              <tbody className="text-center">
                {
                  props.cotizationData.total_with_iva ? (
                    <tr>
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct(detailProducts,discountGlobal,totalWithIva,tax))}</td>
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalIva(detailProducts,discountGlobal,totalWithIva,tax))}</td>
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos(gastosDetail))}</td>
                      {props.cotizationData.discount_global ? (
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount(detailProducts,discountGlobal,totalWithIva))}</td>
                      ) : ""}
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal(detailProducts,discountGlobal,totalWithIva,tax,false,gastosDetail))}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct(detailProducts,discountGlobal,totalWithIva,tax))}</td>
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos(gastosDetail))}</td>
                      {props.cotizationData.discount_global ? (
                        <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount(detailProducts,discountGlobal,totalWithIva))}</td>
                      ) : ""}
                      <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal(detailProducts,discountGlobal,totalWithIva,tax,false,gastosDetail))}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </Col>
        </Row>
    </>
  )
}

TableTotalComponent.propTypes = {
  configGeneral: PropTypes.object.isRequired,
  configStore : PropTypes.object.isRequired,
  cotizationData: PropTypes.object.isRequired,
  gastosDetail: PropTypes.array.isRequired,
  detailProducts: PropTypes.array,
  isType: PropTypes.string.isRequired,
  bondsPayments: PropTypes.array,
}

export default TableTotalComponent
