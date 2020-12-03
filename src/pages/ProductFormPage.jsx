import React, { useMemo, useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import layoutHelpers from 'shared/layouts/helpers'
import FormProductSale from 'components/FormProductSale'

const ProductFormPage = (props) => {

  useEffect(() => {
    if(localStorage.getItem('configStore')){
      layoutHelpers.toggleCollapsed()
      return () => {
        layoutHelpers.toggleCollapsed()
      }
    }else{
      toast.error('Error, debe hacer su configuración de empresa')
      props.history.replace('/config/config_store')
    }
  },[])

  return (
    <FormProductSale
      {...props}
      handleSubmitProduct={() => {}}
      isInventary={true}
    />
  )
}


export default ProductFormPage
