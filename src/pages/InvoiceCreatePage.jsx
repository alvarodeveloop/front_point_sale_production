import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const InvoiceCreatePage = props => {

  return (
    <ContainerFormInvoice {...props} type="facturacion" />
  )
}

export default InvoiceCreatePage;
