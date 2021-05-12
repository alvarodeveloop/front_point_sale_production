import React from 'react'
import ContainerBondComponent from 'components/invoice/ContainerBondComponent';
 
export default function BillBondsPage(props) {
  return (
    <ContainerBondComponent type="boleta" {...props} />
  )
}
