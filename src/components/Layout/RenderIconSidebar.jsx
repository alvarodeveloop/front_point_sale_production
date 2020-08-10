import React from 'react'
import PropTypes from 'prop-types'
import { FaGithub,FaUserCircle, FaClipboardList, FaCogs, FaBookOpen, FaStoreAlt, FaCashRegister, FaUsers } from 'react-icons/fa';

const IconSidebar = props => {
  switch (props.icon) {
    case 'FaUserCircle':
      return(
        <FaUserCircle className={props.class} />
      )
    break;
    case 'FaUserCircle':
      return(
        <FaUserCircle className={props.class} />
      )
    break;
    case 'FaClipboardList':
      return(
        <FaClipboardList className={props.class} />
      )
    break;
    case 'FaCogs':
      return(
        <FaCogs className={props.class} />
      )
    break;
    case 'FaBookOpen':
      return(
        <FaBookOpen className={props.class} />
      )
    break;
    case 'FaStoreAlt':
      return(
        <FaStoreAlt className={props.class} />
      )
    break;
    case 'FaCashRegister':
      return(
        <FaCashRegister className={props.class} />
      )
    break;
    case 'FaUsers':
      return(
        <FaUsers className={props.class} />
      )
    break;
    default:
    return(
      <FaGithub className={props.class} />
    )
    break;
  }
}

export default IconSidebar
