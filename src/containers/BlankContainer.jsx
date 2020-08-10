import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
const BlankContainer = (props) => {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default BlankContainer
