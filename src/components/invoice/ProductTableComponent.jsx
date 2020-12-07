import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import TableProductsCotization from 'components/TableProductsCotization'
import InputField from 'components/input/InputComponent'
import {FaPlusCircle} from 'react-icons/fa'

const ProductTableComponent = (props) => {
  return (
    <Row className="">
      <Col sm={12} md={12} lg={12}>
        <Row className="">
          <Col sm={12} md={12} lg={12} xs={12}>
            <h4 className="title_principal text-center">Tabla de Productos</h4>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <Row>
              <Col sm={12} md={12} lg={12} className="text-center">
                <b>Configuración para los productos</b>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Form.Group>
                  <Form.Check
                    name="total_with_iva"
                    type={'radio'}
                    id={`radio-3`}
                    label={`Con Iva`}
                    value={true}
                    checked={props.cotizationData.total_with_iva}
                    onChange={props.onChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={4} md={4} lg={4} className="text-right">
                <Form.Group>
                  <Form.Check
                    name="total_with_iva"
                    type={'radio'}
                    id={`radio-4`}
                    label={`Solo totales`}
                    value={false}
                    checked={!props.cotizationData.total_with_iva}
                    onChange={props.onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <Row>
              <InputField
                type='select'
                label='Listado de Productos'
                name='price_list'
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols='col-md-12 col-lg-12 col-sm-12'
                value={props.cotizationData.price_list}
                handleChange={props.onChange}
              >
                <option value="">--Seleccione--</option>
              </InputField>
            </Row>
          </Col>
        </Row>
        <TableProductsCotization
          setDetailProducts={props.setDetailProducts}
          detailProducts={props.detailProducts}
          isShowIva={props.cotizationData.total_with_iva}
          setGastosDetail={props.setGastosDetail}
        />
        <Row className="justify-content-center">
          <Col sm={1} md={1} lg={1}>
            <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Producto a la Cotización</Tooltip>}>
              <DropdownButton size="sm" variant="danger" id={'dropdown_product'} title={(<FaPlusCircle />)} className="button_product">
                <Dropdown.Item onClick={() => props.setIsShowModalProduct(true) }>Agregar Producto desde Inventario</Dropdown.Item>
                <Dropdown.Item onClick={() => props.addNewProductIrregular(true)}>Agregar producto irregular con precio neto </Dropdown.Item>
                <Dropdown.Item onClick={() => props.addNewProductIrregular(false)}>Agregar producto irregular con iva</Dropdown.Item>
              </DropdownButton>
            </OverlayTrigger>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ProductTableComponent.propTypes = {
  setDetailProducts: PropTypes.func.isRequired,
  detailProducts: PropTypes.array.isRequired,
  cotizationData: PropTypes.object.isRequired,
  setIsShowModalProduct: PropTypes.func.isRequired,
  addNewProductIrregular: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setGastosDetail: PropTypes.func.isRequired,
}

export default ProductTableComponent
