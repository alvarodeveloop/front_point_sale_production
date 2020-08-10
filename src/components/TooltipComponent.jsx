import React from 'react'
import PropTypes from 'prop-types'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const TooltipComponent = props => {
  return (
    <OverlayTrigger placement={props.location ? props.location : 'top'} overlay={<Tooltip id="tooltip-disabled">{ props.title }</Tooltip>}>
      { props.children }
    </OverlayTrigger>

  )
}

TooltipComponent.propsTypes = {
  location: PropTypes.string,
  title : PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
}

export default TooltipComponent
