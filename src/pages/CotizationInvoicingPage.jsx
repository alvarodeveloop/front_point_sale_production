import React from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';


const CotizationInvoicingPage = (props) => {
  
  return (
    <ContainerFormInvoice {...props} type="facturacionByCotizacion" />    
  )
}

export default CotizationInvoicingPage;
