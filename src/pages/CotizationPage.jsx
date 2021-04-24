import React from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const CotizationPage = (props) => {
  return (
    <ContainerFormInvoice {...props} type="cotizacion" />
  )
}

export default CotizationPage;
