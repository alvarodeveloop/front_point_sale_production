import React from 'react'
import PropTypes from 'prop-types'
import 'styles/pages/productStyle.css'
import {
  Image,
  Row,
  Col
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import { showPriceWithDecimals } from 'utils/functions'

const SquareProductComponent = (props) => {

  const calculateIvaAndNeto = (price,iva) => {
    if(!props.product.is_neto){
      price = parseFloat(price)
      iva = parseFloat(iva)
      let percentaje = (iva * price) / 100;
      let total = price + percentaje
      return showPriceWithDecimals(props.config,total)
    }else{
      price = parseFloat(price)
      return showPriceWithDecimals(props.config,price)
    }
  }

  return (
    <div style={{width: '100%', border: '0px solid white', borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
      {props.product.img_product ? (
        <div className="d-flex align-items-center justify-content-center divTitleShowImg">
          <Image src={API_URL+'images/product/principal/'+props.product.img_product} thumbnail style={{width: '100%', height: '100%', maxHeight:'70px',maxWidth:'120px',borderTopRightRadius:'15px',borderTopLeftRadius:'15px'}}/>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center divTitleShow" style={{borderTopRightRadius:'15px',borderTopLeftRadius:'15px', height:'70px'}}>
          { props.product.name_product }
        </div>
      )}

      <div className="divDescriptionShow" style={{borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px', backgroundColor: props.product.sticker_color ? props.product.sticker_color : '#9c7901'}}>
        {props.product.img_product ? (
          <React.Fragment>
            { props.product.name_product }
            <br/>
          </React.Fragment>
        ) : ''}
        <Row className="d-flex align-items-center">
          <Col sm={12} md={12} lg={12}>
            { props.config ? props.config.simbolo_moneda : '$' } { calculateIvaAndNeto(props.product.price,props.configStore.tax) } { props.config ? props.config.simbolo_moneda : '$' }
          </Col>
        </Row>
      </div>
    </div>
  )
}

SquareProductComponent.propTypes = {
  product: PropTypes.object.isRequired,
  config: PropTypes.object,
  configStore: PropTypes.object.isRequired,
}

export default SquareProductComponent
