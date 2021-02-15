import React from 'react'
import PropTypes from 'prop-types'
import 'styles/components/modalComponents.css'
import {Modal,Row,Col,Button} from 'react-bootstrap'
import {FaEye,FaFilePdf,FaBan,FaFileInvoice} from 'react-icons/fa'
import LoadingComponent from 'components/LoadingComponent'

const ModalInvoiceActions = (props) => {
  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Acciones Disponibles
        </Modal.Title>
      </Modal.Header>
      {props.isLoading ? (
        <Modal.Body>
          <LoadingComponent />
        </Modal.Body>
      ) : (
        <Modal.Body>
          {props.cotization.status >= 1 && props.cotization.status <= 3 ? (
            <React.Fragment>
              <h5 className="title_principal">Acciones generales</h5>
              <hr/>
              {props.isInvoice ? (
                <Row className="justify-content-center">
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToBond(props.cotization)} block={true}>Pagos <FaFilePdf /></Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printInvoice(props.cotization)} block={true}>Ver factura pdf <FaFilePdf /></Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.noteCredit(props.cotization)} block={true}>Nota de crédito o Debito <FaFilePdf /></Button>
                  </Col>
                </Row>
              ) : props.isGuide ? (
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToInvoice(props.cotization.id)} block={true}>Facturar <FaFileInvoice /></Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printInvoice(props.cotization)} block={true}>Ver factura pdf <FaFilePdf /></Button>
                  </Col>
                </Row>
              ) : (
                <Row className="justify-content-center">
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToBond(props.cotization)} block={true}>Pagos <FaFilePdf /></Button>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printInvoice(props.cotization)} block={true}>Ver factura pdf <FaFilePdf /></Button>
                  </Col>
                  {props.cotization.type == 2 ? (
                    <Col sm={3} md={3} lg={3}>
                      <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printInvoice(props.cotization,3)} block={true}>Generar nueva factura pdf <FaFilePdf /></Button>
                    </Col>
                  ) : ''}
                </Row>
              )}
              <br/>
              {props.cotization.status != 2 ? (
                <Row className="justify-content-center">
                  <Col sm={12} md={12} lg={12}>
                    <h5 className="title_principal">Anular Documento</h5>
                    <hr/>
                  </Col>
                  <Col sm={3} md={3} lg={3}>
                    <Button size="sm" variant="secondary" type="button" onClick={(e) => props.anulateInvoice(props.cotization)} block={true}>Anular Documento <FaBan /></Button>
                  </Col>
                </Row>
              ) : ''}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h5 className="title_principal">Acciones generales</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printInvoice(props.cotization)} block={true}>Ver factura pdf <FaFilePdf /></Button>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="danger" size="md" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalInvoiceActions.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  cotization: PropTypes.object.isRequired,
  printInvoice: PropTypes.func.isRequired,
  goToBond: PropTypes.func,
  noteCredit: PropTypes.func,
  anulateInvoice: PropTypes.func.isRequired,
  seeDetailCotization: PropTypes.func.isRequired,
  goToInvoice: PropTypes.func,
  isInvoice: PropTypes.bool,
  isGuide: PropTypes.bool,
  isLoading : PropTypes.bool,
}

export default ModalInvoiceActions
