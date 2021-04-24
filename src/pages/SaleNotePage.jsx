import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const SaleNotePage = (props) => {

  return (
    <ContainerFormInvoice {...props} type="saleNote" />
  )
}

export default SaleNotePage;
