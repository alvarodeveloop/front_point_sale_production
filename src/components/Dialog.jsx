import React from 'react'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DialogConfirm = (props) => {
  return (
    
  )
}

DialogConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel : PropTypes.func.isRequired,
}
export default DialogConfirm
