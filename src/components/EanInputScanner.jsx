import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import InputField from './input/InputComponent';
import PropTypes from 'prop-types';

export default function EanInputScanner(props) {
    return (
        <Col sm={8} md={8} lg={8} style={{ border: '1px solid white', borderRadius: '15px', boxShadow: '10px 5px 5px lightgray' }}>
            <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Row className="justify-content-center">
                    { /* <QuaggaScanner catchCode={catchBarCodeEan}/> */}
                    <InputField
                        type="text"
                        name="eanCatchInput"
                        readonly={props.readonly}
                        handleKeyUp={props.onChangeEanInputHandler}
                        cols="col-md-7 col-sm-7 col-lg-7 col-xs-12 col-xl-7"
                        messageErrors={[]}
                    />
                </Row>
                <Row>
                    <Col>
                        <p className="text-danger text-center">Escanee el código Ean de su producto con la pistola</p>
                    </Col>
                </Row>
                {props.displaySectionHandler ? (
                    <Row className="justify-content-center">
                        <Col sm={6} md={6} lg={6}>
                            <Button variant="link" className="text-danger" block={true} type="button" size="sm" onClick={props.displayEanSectionHandler}>Mostrar Productos</Button>
                        </Col>
                    </Row>
                ) : ""}
            </div>
        </Col>
    )
}

EanInputScanner.propTypes = {
    readonly: PropTypes.bool,
    onChangeEanInputHandler: PropTypes.func,
    displayEanSectionHandler: PropTypes.func,
    displaySectionHandler: PropTypes.bool,
}