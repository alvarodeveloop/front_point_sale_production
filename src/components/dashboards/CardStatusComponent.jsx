import React from 'react'
import PropTypes from 'prop-types'
import {Col,Card} from 'react-bootstrap'

const CardStatusComponent = (props) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className={props.styleInline+" display-4 "+"text-"+props.colorFont}></div>
            <div className="ml-3">
              <div className="text-muted small">{props.title}</div>
              <div className="text-large">{props.value}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

CardStatusComponent.propTypes = {
  styleInline : PropTypes.string.isRequired,
  colorFont : PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default CardStatusComponent
