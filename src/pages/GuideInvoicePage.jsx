import React from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const GuideInvoicePage = (props) => {

  return (
    <ContainerFormInvoice {...props} type="invoiceByGuide" /> 
  )
}

export default GuideInvoicePage;
