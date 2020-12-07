import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Modal,
  Button,
  Dropdown,
  DropdownButton,
  Form
} from 'react-bootstrap'

import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import InputField from 'components/input/InputComponent'
import FormProductSale from 'components/FormProductSale'
let table_inventary = null

const ModalCotizacionProduct = (props) => {

  const [showSection, setShowSection] = useState(false)
  const [cantidadProduct,setCantidadProduct] = useState('')
  const [productChoice,setProductChoice] = useState(null)
  const [validateForm, setValidateForm] = useState(false)
  const inputRefQuantity = useRef('')

  useMemo(() => {
    table_inventary = [
      {
        Header: 'Producto',
        accessor: 'name_product',
      },
      {
        Header: 'Precio',
        accessor: 'price'
      },
      {
        Header: 'Acciones',
        Cell: props => {
          const id = props.cell.row.original.id
          return (
            <Button size="sm" variant="primary" block={true} onClick={() => selectProduct(props.cell.row.original)}>Agregar</Button>
          )
        }
      }
    ]
  },[])

  const cleanData = () => {
    setProductChoice(null)
    setShowSection(false)
    setCantidadProduct('')
  }

  const finishSelectProduct = () => {
    if(cantidadProduct){
      let objectProduct = Object.assign({},productChoice)
      objectProduct.quantity = cantidadProduct
      let name_categories = ""
      objectProduct.categories.forEach((v,i) => {
        name_categories+= v.categories.name_category+","
      })
      name_categories = name_categories.substring(0,name_categories.length - 1)
      objectProduct.name_categories = name_categories
      props.handleSelectProduct(objectProduct)
      cleanData()
    }else{
      toast.error('La cantidad no puede estar vacia')
    }

  }

  const handleHide = () => {
    cleanData()
    props.onHide()
  }

  const handleSubmit = productCreate => {
    props.handleSelectProduct(productCreate)
  }

  const selectProduct = data => {
    setProductChoice(Object.assign({},data))
    setShowSection(true)
    setTimeout(() => {
      if(inputRefQuantity.current){
        inputRefQuantity.current.focus()
      }
    },300)
  }

  const onChange = e => {
    e.persist()
    setCantidadProduct(e.target.value)
  }

  const onChangeKey = e => {
    if(e.keyCode == 13){
      finishSelectProduct()
    }
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop='static'
    >
      <Modal.Header closeButton={true} style={{ backgroundColor: 'black', color: 'white'}}>
        <Modal.Title id="contained-modal-title-vcenter">
           Productos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12} md={12} lg={12} xs={12} className="">
            <Tabs defaultActiveKey="inventary" id="uncontrolled-tab-example">
              <Tab eventKey="inventary" title="Inventario">
                {!showSection ? (
                  <Table data={props.products} columns={table_inventary} />
                ) : (
                  <React.Fragment>
                    <br/><br/>
                    <Row className="justify-content-center">
                      <Col sm={6} md={6} lg={6}>
                        <label className="form-control-label">Cantidad</label>
                        <input ref={inputRefQuantity} onChange={onChange} className="form-control" value={cantidadProduct} onKeyUp={onChangeKey} />
                      </Col>
                    </Row>
                    <br/><br/>
                    <Row className="justify-content-center">
                      <Col sm={6} md={6} lg={6}>
                        <Button size="sm" variant="primary" block={true} onClick={finishSelectProduct}>Aceptar</Button>
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
              </Tab>
              <Tab eventKey="new" title="Nuevo Producto">
                <br/>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <FormProductSale {...props} handleSubmitProduct={handleSubmit} isInventary={false} />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={handleHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalCotizacionProduct.propTypes = {
  handleSelectProduct: PropTypes.func.isRequired,
  handleSelectProductNotRegistered: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired
}

ModalCotizacionProduct.defaultProps = {
  inputNameProduct : {
    type: 'text',
    required: false,
    name: 'name_product',
    label : 'Nombre Producto',
    messageErrors: [
      //'Requerido*'
    ],
    cols:"col-sm-5 col-md-5 col-lg-5 col-xs-5"
  },
  inputTaxAditional : {
    type: 'select',
    required: false,
    name: 'tax_additional',
    label : 'Impuesto Adicional',
    messageErrors: [
      //'Requerido*'
    ],
    cols:"col-sm-5 col-md-5 col-lg-5 col-xs-5"
  },
  inputQuantity: {
    type: 'number',
    required: true,
    name: 'quantity',
    label : 'Cantidad',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputUnity:{
    type: 'select',
    required: true,
    name: 'unity',
    label : 'Metódo de Venta',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputConcept:{
    type: 'textarea',
    required: true,
    name: 'concept',
    label : 'Concepto',
    rows: 2,
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputDescription:{
    type: 'textarea',
    required: false,
    name: 'description',
    label : 'Descripción',
    rows: 2,
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputUnitPrice:{
    type: 'number',
    required: true,
    name: 'price',
    label : 'Precio Unitario',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputUnitPriceTax:{
    type: 'number',
    required: false,
    name: 'unit_price_with_tax',
    label : 'Precio Unitario con Impuesto',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    readonly: true
  },
  inputAmountDiscountRecharge:{
    type: 'number',
    required: false,
    name: 'amount_discount_recharge',
    label : 'Monto Recargo o Descuento',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputTypeDiscountRecharge:{
    type: 'select',
    required: false,
    name: 'type_discount_recharge',
    label : 'Tipo de Descuento o Recargo',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputAmountDiscountRecharge:{
    type: 'number',
    required: false,
    name: 'amount_discount_recharge',
    label : 'Monto Recargo o Descuento',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"
  },
  inputPriceTotal:{
    type: 'number',
    required: false,
    name: 'price_total',
    label : 'Precio Total',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    readonly:true
  },
  inputPriceTotalTax:{
    type: 'number',
    required: false,
    name: 'price_total_with_tax',
    label : 'Precio Total con Impuesto',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    readonly:true
  },
  inputTypeAmountRechargeDiscount:{
    type: 'select',
    required: false,
    name: 'type_amount_discount_recharge',
    label : 'Tipo de Acción',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
  },
  inputTypeRechargeDiscount:{
    type: 'select',
    required: false,
    name: 'type_discount_recharge',
    label : 'Porcetaje o Fijo',
    messageErrors: [

    ],
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
  },
}

export default ModalCotizacionProduct
