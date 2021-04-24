import React from 'react'
import PropTypes from 'prop-types'
import ContainerFormInvoice from 'components/invoice/ContainerFormInvoice';

const CotizationSaleNotePage = (props) => {

  

    /*setDisableButton(true)
    //setDisplayLoading(true)
    axios.put(API_URL+'cotizacion_facturar/'+props.match.params.id,object_post).then(result => {
      toast.success('Nota de venta realizada con éxito')
      setDisableButton(false)
      handleModalInvoice()
      clearData()
      toast.info('Generando pdf de la cotización, espere por favor...')
      axios.get(API_URL+'cotizacion_print/'+props.match.params.id+'/0').then(result => {
        //setDisplayLoading(false)
        window.open(API_URL+'documents/cotizacion/files_pdf/'+result.data.name)
        setTimeout( () => {
          goToDashboard()
        }, 1500);
      }).catch(err => {
        //setDisplayLoading(false)
        props.tokenExpired(err)
      })

    }).catch(err => {
      setDisableButton(false)
      //setDisplayLoading(false)
      props.tokenExpired(err)
    })

  }*/

  

  return (
    <ContainerFormInvoice {...props} type="saleNoteByCotizacion" />
  )
}

export default CotizationSaleNotePage;
