import React, {useState,useEffect} from 'react'
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
import ModalCotizacionProduct from 'components/modals/ModalCotizacionProduct'

const ProductTableComponent = (props) => {

  const [isShowModalProduct,setIsShowModalProduct] = useState(false)
  useEffect(() => {
    document.querySelector(".button_product > button").className = document.querySelector(".button_product > button").className.replace('dropdown-toggle','')
  },[])

  const addNewProductIrregular = type => {
    props.setDetailProducts([...props.detailProducts, {
      category: '',
      name_product: '',
      description: '',
      quantity: '',
      price: '',
      discount: '',
      method_sale: "1",
      total: '',
      is_neto: type,
      discount_stock: false
    }])
  }

  const handleHideModalProduct = () => {
    setIsShowModalProduct(false)
  }

  const handleSelectProduct = product => {
    // metodo para manejar la escogencia del producto en la modal de productos para el detalle de la cotizacion
    if(!product.quantity) product.quantity = 1
    if(!product.category){
      product.category = ""
      if(Array.isArray(product.categories)){
        product.categories.forEach((item, i) => {
          product.category+= item.name_category
        });
      }
    }
    product.discount_stock = true
    product.id_product = product.id
    if(product.inventary && Array.isArray(product.inventary) && product.inventary[0].inventary_cost.length){
      props.setGastosDetail(oldData => {
        return [...oldData, {description: product.name_product, amount: product.inventary[0].inventary_cost[0].cost, id_product: product.id}]
      })
      props.setDetailProducts([...props.detailProducts, product])
    }else{
      props.setDetailProducts([...props.detailProducts, product])
    }
    setIsShowModalProduct(false)
  }

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
            </Row>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
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
          {/*
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
          */}
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
                <Dropdown.Item onClick={() => setIsShowModalProduct(true) }>Agregar Producto desde Inventario</Dropdown.Item>
                <Dropdown.Item onClick={() => addNewProductIrregular(true)}>Agregar producto (valor neto) </Dropdown.Item>
                <Dropdown.Item onClick={() => addNewProductIrregular(false)}>Agregar producto (valor con iva)</Dropdown.Item>
              </DropdownButton>
            </OverlayTrigger>
          </Col>
        </Row>
      </Col>
      <Col sm={12} md={12} lg={12}>
        <ModalCotizacionProduct
          isShow={isShowModalProduct}
          onHide={handleHideModalProduct}
          products={props.products}
          handleSelectProduct={handleSelectProduct}
          handleSelectProductNotRegistered={() => {}}
          {...props}
        />
      </Col>
    </Row>
  )
}

ProductTableComponent.propTypes = {
  setDetailProducts: PropTypes.func.isRequired,
  detailProducts: PropTypes.array.isRequired,
  cotizationData: PropTypes.object.isRequired,
  setIsShowModalProduct: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setGastosDetail: PropTypes.func.isRequired,
  handleSelectProduct: PropTypes.func.isRequired
}

export default ProductTableComponent
