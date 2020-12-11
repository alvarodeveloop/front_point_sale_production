import React from 'react'
import PropTypes from 'prop-types'
import {showPriceWithDecimals} from 'utils/functions'
import {
  Row,
  Col,
  Button,
  Accordion,
  Card
} from 'react-bootstrap'
import Table from 'components/Table'
import { FaPlusCircle, FaMoneyBill } from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const GastosComponent = (props) => {

  const removeGastoDetail = data => {
    props.setGastosDetail(gastos =>{
     return gastos.filter(v => v.description !== data.description)
    })
  }

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="4" className="header_card">
          <b>Gastos</b> <FaMoneyBill /> ( hacer click para desplegar campos )
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <Row className="">
              <Col sm={12} md={12} lg={12} xs={12}>
                <h4 className="title_principal text-center">Tabla de Gastos</h4>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Table data={props.gastosDetail} columns={[
                    {
                      Header: 'Descripción',
                      accessor: 'description'
                    },
                    {
                      Header: 'Monto',
                      accessor: 'amount',
                      Cell: props1 => {
                        return showPriceWithDecimals(props.configGeneral,props1.cell.row.original.amount)
                      }
                    },
                    {
                      Header: 'Acciones',
                      Cell: props1 => {
                        const id = props1.cell.row.original.id
                        return(
                          <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props1.cell.row.original) }>Remover</Button>
                        )
                      }
                    }
                  ]} />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm={1} md={1} lg={1}>
                  <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Agregar Gastos a la Cotización</Tooltip>}>
                    <Button className="button_product_base" size="sm" variant="danger" block={true} onClick={() => props.setIsShowModalGastos(true)}><FaPlusCircle /></Button>
                  </OverlayTrigger>
                </Col>
              </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

GastosComponent.propTypes = {
  gastosDetail : PropTypes.array.isRequired,
  setGastosDetail: PropTypes.func.isRequired,
  configGeneral : PropTypes.object.isRequired,
  setIsShowModalGastos: PropTypes.func.isRequired,
}

export default GastosComponent
