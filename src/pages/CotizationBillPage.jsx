import React  from 'react'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const CotizationBillPage = (props) => {

  return (
    <ContainerFormInvoice {...props} type="boletaByCotizacion" />
  )
}

export default CotizationBillPage;
