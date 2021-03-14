import React from 'react'
import PropTypes from 'prop-types'
import 'styles/components/modalComponents.css'
import {Modal,Row,Col,Button} from 'react-bootstrap'
import {FaEdit,FaEye,FaFilePdf,FaFileInvoice,FaBan,FaSync} from 'react-icons/fa'
import LoadingComponent from 'components/LoadingComponent'

const ModalActionCotization = (props) => {

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
      {props.displayLoadingModal ? (
        <Modal.Body>
          <LoadingComponent />
        </Modal.Body>  
      ) : (
        <Modal.Body>
          {props.cotization.status === 1 ? (
            <React.Fragment>
              <h5 className="title_principal">Acciones generales</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.updateCotizacion(props.cotization.id)} block={true}>Modificar Cotización <FaEdit /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacion(props.cotization.id)} block={true}>Imprimir <FaFilePdf /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacionNew(props.cotization.id)} block={true}>Imprimir nuevo pdf <FaFilePdf /></Button>
                </Col>
              </Row>
              <br/>
              <h5 className="title_principal">Status de la Cotización</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.changeStatus(props.cotization.id,2)} block={true}>Aprobar Cotización <FaSync /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.anulateCotization(props.cotization.id,props.cotization.status)} block={true}>Anular cotización <FaBan /></Button>
                </Col>
              </Row>
            </React.Fragment>
          ) : props.cotization.status === 2 ? (
            <React.Fragment>
              <h5 className="title_principal">Acciones generales</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.updateCotizacion(props.cotization.id)} block={true}>Modificar Cotización <FaEdit /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacion(props.cotization.id)} block={true}>Imprimir <FaFilePdf /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacionNew(props.cotization.id)} block={true}>Imprimir nuevo pdf <FaFilePdf /></Button>
                </Col>
              </Row>
              <br/>
              <h5 className="title_principal">Documentos de la Cotización</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToFacturation(props.cotization.id)} block={true}>Facturar <FaFileInvoice /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToNoteSale(props.cotization.id)} block={true}>Nota de venta <FaFileInvoice /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToBillOfSale(props.cotization.id)} block={true}>Boleta <FaFileInvoice /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.goToGuideDispatch(props.cotization.id)} block={true}>Guía de Despacho <FaFileInvoice /></Button>
                </Col>
              </Row>
              <br/>
              <h5 className="title_principal">Status de la Cotización</h5>
              <hr/>
              <Row className="justify-content-center">
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.changeStatus(props.cotization.id,1)} block={true}>Pasar a Pendiente <FaSync /></Button>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.anulateCotization(props.cotization.id,props.cotization.status)} block={true}>Anular cotización <FaBan /></Button>
                </Col>
              </Row>
            </React.Fragment>
          ) : props.cotization.status >= 3 && props.cotization.status < 7 ? (
            <React.Fragment>
              <Row>
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye /></Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacion(props.cotization.id)} block={true}>Imprimir <FaFilePdf /></Button>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Button size="sm" variant="secondary" type="button" onClick={(e) => props.printCotizacionNew(props.cotization.id)} block={true}>Imprimir nuevo pdf <FaFilePdf /></Button>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <Row className="justify-content-center">
              <Col sm={3} md={3} lg={3}>
                <Button size="sm" variant="secondary" type="button" onClick={(e) => props.seeDetailCotization(props.cotization)} block={true}>Ver Detalle <FaEye/></Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="danger" size="md" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalActionCotization.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  cotization: PropTypes.object.isRequired,
  updateCotizacion: PropTypes.func.isRequired,
  seeDetailCotization: PropTypes.func.isRequired,
  printCotizacion: PropTypes.func.isRequired,
  printCotizacionNew: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  anulateCotization: PropTypes.func.isRequired,
  goToFacturation: PropTypes.func.isRequired,
  goToNoteSale: PropTypes.func.isRequired,
  goToBillOfSale: PropTypes.func.isRequired,
  goToGuideDispatch: PropTypes.func.isRequired,
  displayLoadingModal : PropTypes.bool,
}

export default ModalActionCotization
