import React from 'react'
import PropTypes from 'prop-types'
import {showPriceWithDecimals} from 'utils/functions'
import {
  Row,
  Col
} from 'react-bootstrap'


const TableTotalComponent = (props) => {
  return (
    <Row>
      {props.isType === "cotizacion" ? (
        <Col sm={12} md={12} lg={12}>
          <h3 className="text-center title_principal">Resumen y Totales</h3>
          <br/>
          <table className="table table-bordered">
            <thead>
              {
                props.cotizationData.total_with_iva ? (
                  <tr>
                    <th className="text-center">Neto(Productos)</th>
                    <th className="text-center">Iva</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Balance Total</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="text-center">Neto(Productos)</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Balance Total</th>
                  </tr>
                )
              }
            </thead>
            <tbody className="text-center">
              {
                props.cotizationData.total_with_iva ? (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalIva())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalTotal())}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalTotal())}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </Col>
      ) : (
        <Col sm={12} md={12} lg={12}>
          <h3 className="text-center title_principal">Resumen y Totales</h3>
          <br/>
          <table className="table table-bordered">
            <thead>
              {
                props.cotizationData.total_with_iva ? (
                  <tr>
                    <th className="text-center">Neto(Productos)</th>
                    <th className="text-center">Iva</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Descuento Global</th>
                    <th className="text-center">Balance Total</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="text-center">Neto(Productos)</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Descuento Global</th>
                    <th className="text-center">Balance Total</th>
                  </tr>
                )
              }
            </thead>
            <tbody className="text-center">
              {
                props.cotizationData.total_with_iva ? (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalIva())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalDiscount())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalTotal())}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalDiscount())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,props.displayTotalTotal())}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </Col>
      )}
    </Row>
  )
}

TableTotalComponent.propTypes = {
  configGeneral: PropTypes.object.isRequired,
  displayTotalProduct: PropTypes.func.isRequired,
  displayTotalIva: PropTypes.func.isRequired,
  displayTotalGastos: PropTypes.func.isRequired,
  displayTotalDiscount: PropTypes.func.isRequired,
  displayTotalTotal: PropTypes.func.isRequired,
  cotizationData: PropTypes.object.isRequired,
  isType: PropTypes.string.isRequired
}

export default TableTotalComponent
