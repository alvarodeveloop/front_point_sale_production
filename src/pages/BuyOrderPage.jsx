import React from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const BuyOrderPage = (props) => {
  return (
    <ContainerFormInvoice {...props} type="buyOrder" />
  )
}

export default BuyOrderPage;
