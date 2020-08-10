import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import{
  Row,
  Col,
  Container,
  Image
} from 'react-bootstrap'
import 'components/modals/css/modalFactura50.css'
import { showPriceWithDecimals } from 'utils/functions'
import { API_URL } from 'utils/constants'
import * as moment from 'moment-timezone'
import axios from 'axios'
import { toast } from 'react-toastify';

let iva_value = ""
let iva_total = 0
let neto_total = 0
let total_total = 0

const InvoicePrintPage = (props) => {

  const [sale,setSale] = useState(null)

  useEffect( ()=> {
    fetchData()
  },[])

  const fetchData = () => {

    let id_sale = props.match.params.id

    axios.get(API_URL+"sale/"+id_sale).then(result =>{
      setSale(result.data)
      setTimeout(() =>{
        window.print()
      },500)
    }).catch(err =>{
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const printTypeDocument = type => {
    switch (type) {
      case 1:
        return( <span>'Rut'</span> )
      break;
      case 2:
        return( <span>'Id'</span> )
      break;
      case 3:
        return( <span>'N° Documento'</span> )
      break;
    default:

    }
  }

  const calculateIva = product => {
    if(product.is_neto || product.is_neto === undefined ){
      return ( <span>Excento</span> )
    }else{
      let result = ( ( product.price * product.quantity ) * props.configStore.tax ) / 100
      iva_total += result
      return showPriceWithDecimals(props.config,result)
    }
  }

  const displayTotal = (product) =>{
    let neto_result = 0
    if(product.is_neto || product.is_neto === undefined){
      neto_result += product.quantity * product.price
      neto_total += neto_result
      total_total += neto_result
      return showPriceWithDecimals(props.config,neto_result)
    }else{
      neto_result = product.quantity * product.price
      neto_total += neto_result
      let iva_result = ( (product.price * product.quantity) * props.configStore.tax ) / 100
      iva_total += iva_result
      total_total += neto_result + iva_result
      return showPriceWithDecimals(props.config,neto_result + iva_result)
    }
  }
  if(sale){
    return (
      <Container>
        <Row className="justify-content-center">
          <Col sm={4} md={4} lg={4} xs={12} className="text-center">
            <Image src={API_URL+'images/store/logo/'+props.configStore.logo}
              style={{ width: '40%'}}
            />
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-center text-center">
          <Col sm={4} md={4} lg={4} xs={12}>
            <h4>{ props.configStore.name_store }</h4>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col sm={4} md={4} lg={4} xs={12}>
            <h4>{ props.configStore.address }</h4>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col sm={4} md={4} lg={4} xs={12}>
            <h4>Fono: { props.configStore.phone }</h4>
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} xs={6} className="div_client">
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Señor(es)</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {sale.client ? (
                  <h6>{ sale.client.name_client }</h6>
                ) : ''}
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Fecha: </h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                { moment.tz('America/Santiago').format('DD-MM-YYYY') }
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Rut</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {sale.client ? (
                  <React.Fragment>
                    <h6>{ sale.client.type_document }</h6>
                    <h6>{ sale.client.data_document }</h6>
                  </React.Fragment>
                ) : ''}
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Dirección</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {sale.client ? (
                  <h6>{ sale.client.address }</h6>
                ) : '' }
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Teléfono</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {sale.client ? (
                  <h6>{ sale.client.phone }</h6>
                ) : '' }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} xs={6} className="div_client">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center bgThead">Producto</th>
                  <th className="text-center bgThead">Precio.U</th>
                  <th className="text-center bgThead">Cantidad</th>
                  <th className="text-center bgThead">Iva</th>
                  <th className="text-center bgThead">Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {
                  sale.products.map((v,i) =>{

                    iva_value = calculateIva(v)

                    return(
                      <tr key={i}>
                        <td>{ v.product.name_product }</td>
                        <td>{ props.config.simbolo_moneda }{ showPriceWithDecimals(props.config,v.price) }</td>
                        <td>{ v.quantity }</td>
                        <td>{ v.product.is_neto ? '' : props.config.simbolo_moneda }{ iva_value }</td>
                        <td>{ props.config.simbolo_moneda }{ displayTotal(v) } </td>
                      </tr>
                    )
                  })
                }


                {sale.products_not_registered.map((v,i) =>{

                  return(
                    <tr key={i}>
                      <td>{ v.name_product }</td>
                      <td>{ props.config.simbolo_moneda }{ showPriceWithDecimals(props.config,v.price) }</td>
                      <td>{ v.quantity }</td>
                      <td>Excento</td>
                      <td>{ props.config.simbolo_moneda }{ displayTotal(v) } </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} xs={6} className="div_client">
            <table className="table">
              <tbody className="">
                <tr>
                  <td>Monto Neto:</td>
                  <td>{ showPriceWithDecimals(props.config,sale.sub_total) }</td>
                </tr>
                <tr>
                  <td>Tax{ props.configStore.tax } :</td>
                  <td>{ showPriceWithDecimals(props.config,sale.tax) }</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>{ showPriceWithDecimals(props.config,sale.total) }</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={6} xs={6} className="div_client">
            <table className="rowTable" border="1">
              <tbody>
                <tr>
                  <td className="text-center">ACUSE DE RECIBO</td>
                </tr>
                <tr>
                  <td>Nombre:</td>
                </tr>
                <tr>
                  <td>Rut:</td>
                </tr>
                <tr>
                  <td>Fecha:</td>
                </tr>
                <tr>
                  <td>Recinto:</td>
                </tr>
                <tr>
                  <td>Firma:</td>
                </tr>
                <tr>
                  <td>
                    El acuse de recibo que se declara en esteacto,
                    de acuerdo a lo dispuesto en la letra b)del artículo 4º y la letra c)
                    del artículo 5º de laley 19.983,
                    acredita que la entrega demercadería(s)
                    o servicio(s) prestado(s) ha(n)sido recibo(s)
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    )
  }else{
    return(
      <h1>Sin datos de factura</h1>
    )
  }

}

InvoicePrintPage.propTypes = {
  config: PropTypes.object.isRequired,
  configStore: PropTypes.object.isRequired,
}

InvoicePrintPage.defaultProps = {
  config: JSON.parse(localStorage.getItem('configGeneral')),
  configStore: JSON.parse(localStorage.getItem('configStore')),
}


export default InvoicePrintPage
