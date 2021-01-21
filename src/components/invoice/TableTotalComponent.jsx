import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {showPriceWithDecimals} from 'utils/functions'
import {
  Row,
  Col
} from 'react-bootstrap'


const TableTotalComponent = (props) => {

  const displayTotalProduct = useCallback(() => {
    let total = 0

    props.detailProducts.forEach((item, i) => {

      let item1 = Object.assign({},item)

      if(item1.is_neto){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        item1.price = props.cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * props.cotizationData.discount_global) / 100) : item1.price
      }else{
        if(props.cotizationData.total_with_iva){
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = props.cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * props.cotizationData.discount_global) / 100) : item1.price
        }else{
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = props.cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * props.cotizationData.discount_global) / 100) : item1.price
          item1.price = parseFloat( (item1.price * props.configStore.tax) / 100) + parseFloat(item1.price) // linea para sumar el iva
        }
      }
      total+= parseFloat(item1.price) * item1.quantity
    })
    return total
  },[props.detailProducts])

  const displayTotalIva = useCallback( () => {
    let total = 0

    props.detailProducts.forEach((item, i) => {
      let item1 = Object.assign({},item)
      if(!item1.is_neto){
        if(props.cotizationData.total_with_iva){
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          item1.price = props.cotizationData.discount_global ? parseFloat(item1.price) - ((item1.price * props.cotizationData.discount_global) / 100) : item1.price
          total+= parseFloat(((item1.price * props.configStore.tax) / 100))
        }else{
          total+= 0
        }
      }
    })
    return total
  },[props.detailProducts])

  const displayTotalGastos = useCallback( () => {
    let total = 0
    props.gastosDetail.forEach((item, i) => {
      total += parseFloat(item.amount)
    });

    return total
  },[props.gastosDetail])


  const displayTotalTotal = useCallback((sin_gastos = false) => {
    let total_product = displayTotalProduct()
    let total_gastos  = displayTotalGastos()
    let total_iva = 0
    if(props.cotizationData.total_with_iva){
      total_iva = displayTotalIva()
    }
    if(!sin_gastos){
      return (parseFloat(total_product) + parseFloat(total_iva)) - parseFloat(total_gastos)
    }else{
      return (parseFloat(total_product) + parseFloat(total_iva))
    }
  },[props.detailProducts, props.gastosDetail])

  const displayTotalDiscount = useCallback(() => {
    let total = 0

    props.detailProducts.forEach((item, i) => {

      let item1 = Object.assign({},item)
      let value = 0
      if(item1.is_neto){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        value  = props.cotizationData.discount_global ? ((item1.price * props.cotizationData.discount_global) / 100) : 0
      }else{
        if(props.cotizationData.total_with_iva){

          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          value = props.cotizationData.discount_global ?  ((item1.price * props.cotizationData.discount_global) / 100) : 0
        }else{
          item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
          value = props.cotizationData.discount_global ? ((item1.price * props.cotizationData.discount_global) / 100) : 0
        }
      }
      total+= value * item1.quantity
    })
    return total
  }, [props.detailProducts])

  return (
    <Row>
      {props.isType === "cotizacion" ? (
        <Col sm={12} md={12} lg={12}>
          <h4 className="text-center title_principal">Resumen y Totales</h4>
          <br/>
          <table className="table table-bordered">
            <thead>
              {
                props.cotizationData.total_with_iva ? (
                  <tr>
                    <th className="text-center">Total Neto</th>
                    <th className="text-center">Iva</th>
                    <th className="text-center">Gastos</th>
                    <th className="text-center">Balance Total</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="text-center">Total</th>
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
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalIva())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
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
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalIva())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalDiscount())}</td>
                    <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
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
  configStore : PropTypes.object.isRequired,
  cotizationData: PropTypes.object.isRequired,
  gastosDetail: PropTypes.array.isRequired,
  isType: PropTypes.string.isRequired
}

export default TableTotalComponent
