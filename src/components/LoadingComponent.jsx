import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'
import Loader from 'react-loader-spinner'

export default function LoadingComponent(props) {
    return (
        <Row className="justify-content-center align-items-center" style={{height: "500px"}}>
            <Col className="text-center">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={props.size ? props.size : 150}
                    width={props.size ? props.size : 150}
                />
                <br/>
                {props.text ? props.text :  "Cargando..."}
            </Col>
        </Row>
    )
}

LoadingComponent.propTypes = {
    size: PropTypes.number,
    text: PropTypes.string,
}
