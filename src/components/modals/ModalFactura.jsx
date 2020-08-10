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
import './css/modalFactura50.css'
import { API_URL } from 'utils/constants'
import * as moment from 'moment-timezone'
import { showPriceWithDecimals } from 'utils/functions'
import axios from 'axios'
import FileSaver from 'file-saver';

let iva_value = ""
let iva_total = 0
let neto_total = 0
let total_total = 0


const ModalFactura = (props) => {

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
      let result = ( ( product.price * product.cantidad ) * props.configStore.tax ) / 100
      iva_total += result
      return showPriceWithDecimals(props.config,result)
    }
  }

  const displayTotal = (product) =>{
    let neto_result = 0
    if(product.is_neto || product.is_neto === undefined){
      neto_result += product.cantidad * product.price
      neto_total += neto_result
      total_total += neto_result
      return showPriceWithDecimals(props.config,neto_result)
    }else{
      neto_result = product.cantidad * product.price
      neto_total += neto_result
      let iva_result = ( (product.price * product.cantidad) * props.configStore.tax ) / 100
      iva_total += iva_result
      total_total += neto_result + iva_result
      return showPriceWithDecimals(props.config,neto_result + iva_result)
    }
  }

  const invoicePayment = () => {

    const objectX = Object.assign({},{},{
      configStore: props.configStore,
      sale: props.sale,
      config: props.config
    })

    axios.post(API_URL+'invoiceSale',objectX,{
      responseType: 'blob'
    }).then(result => {
      FileSaver.saveAs(result.data, 'test.pdf');
    }).catch(err => {
      console.log(err)
    })
  }

  const handlePrintInvoice = () =>{
    window.open('/invoicePrintPage/'+props.lastSale.id)
  }

  const handleHide = () =>{
    props.onHide()
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Pre Factura de la Compra
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col sm={4} md={4} lg={4} xs={12} className="text-center">
            <Image src={API_URL+'images/store/logo/'+props.configStore.logo}
              style={{ width: '70%'}}
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
          <Col sm={8} md={8} lg={8} xs={8} className="div_client">
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Señor(es)</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {props.sale.client ? (
                  <h6>{ props.sale.client.name_client }</h6>
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
                {props.sale.client ? (
                  <React.Fragment>
                    <h6>{ props.sale.client.type_document }</h6>
                    <h6>{ props.sale.client.data_document }</h6>
                  </React.Fragment>
                ) : ''}
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Dirección</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {props.sale.client ? (
                  <h6>{ props.sale.client.address }</h6>
                ) : '' }
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6} lg={6} xs={6}>
                <h6>Teléfono</h6>
              </Col>
              <Col sm={6} md={6} lg={6} xs={6}>
                {props.sale.client ? (
                  <h6>{ props.sale.client.phone }</h6>
                ) : '' }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={8} md={8} lg={8} xs={8} className="div_client">
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
                {props.sale.carts.registered.map((v,i) =>{

                  iva_value = calculateIva(v)

                  return(
                    <tr key={i}>
                      <td>{ v.name_product }</td>
                      <td>{ props.config.simbolo_moneda }{ showPriceWithDecimals(props.config,v.price) }</td>
                      <td>{ v.cantidad }</td>
                      <td>{ v.is_neto ? '' : props.config.simbolo_moneda }{ iva_value }</td>
                      <td>{ props.config.simbolo_moneda }{ displayTotal(v) } </td>
                    </tr>
                  )
                })}

                {props.sale.carts.not_registered.map((v,i) =>{

                  return(
                    <tr key={i}>
                      <td>{ v.name_product }</td>
                      <td>{ props.config.simbolo_moneda }{ showPriceWithDecimals(props.config,v.price) }</td>
                      <td>{ v.cantidad }</td>
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
          <Col sm={8} md={8} lg={8} xs={8} className="div_client">
            <table className="table">
              <tbody className="">
                <tr>
                  <td>Monto Neto:</td>
                  <td>{ showPriceWithDecimals(props.config,props.sale.totales.neto) }</td>
                </tr>
                <tr>
                  <td>Tax{ props.configStore.tax } :</td>
                  <td>{ showPriceWithDecimals(props.config,props.sale.totales.tax) }</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>{ showPriceWithDecimals(props.config,props.sale.totales.total) }</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={8} md={8} lg={8} xs={8} className="div_client">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="text-center rowTable">ACUSE DE RECIBO</td>
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
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" type="button" onClick={handlePrintInvoice}>Imprimir</Button>
        <Button size="sm" variant="secondary" type="button" onClick={invoicePayment}>Generar Pdf</Button>
        <Button size="sm" onClick={handleHide}>Finalizar</Button>
      </Modal.Footer>
  </Modal>
  )
}

ModalFactura.propTypes = {
  configStore: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired,
  lastSale: PropTypes.object.isRequired
}

export default ModalFactura
