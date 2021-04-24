import React from 'react'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const BillPage = (props) => {
  return (
    <ContainerFormInvoice {...props} type="boleta" />
  )
}

export default BillPage;
