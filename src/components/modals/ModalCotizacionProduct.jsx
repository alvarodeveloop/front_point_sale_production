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
let table_inventary = null

const ModalCotizacionProduct = (props) => {

  const [showSection, setShowSection] = useState(false)
  const [cantidadProduct,setCantidadProduct] = useState('')
  const [productChoice,setProductChoice] = useState(null)
  const [productNew, setProductNew] = useState({
    name_product: '',
    is_neto: true,
    tax_additional: '',
    quantity: '',
    unity: 1,
    concept: '',
    description: '',
    price: '',
    unit_price_with_tax: '',
    amount_discount_recharge: '',
    type_discount_recharge: '',
    type_amount_discount_recharge: '',
    price_total: '',
    price_backup_unit : '',
    price_total_with_tax:'',
    not_registered: true,
  })
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

  const calculatePriceWithTax = data => {

    let calculo = parseFloat(data.price) * data.quantity
    let tax_extra = (parseFloat(data.price) * parseFloat(data.tax_additional)) / 100
    let calculo_with_tax = calculo + tax_extra
    return {
        total_price_unit_with_tax : tax_extra + parseFloat(data.price),
        total_price : calculo,
        total_price_with_tax : calculo_with_tax
    }
  }

  const calculateDiscountOrRecharge = data => {
    let price_new = null
    if(data.type_amount_discount_recharge === "Descuento"){
      price_new = data.type_discount_recharge === "Porcentaje" ? parseFloat(data.price) - ((parseFloat(data.price) * parseFloat(data.amount_discount_recharge)) / 100)  : parseFloat(data.price) - parseFloat(data.amount_discount_recharge)
    }else{
      price_new = data.type_discount_recharge === "Porcentaje" ? parseFloat(data.price) + ((parseFloat(data.price) * parseFloat(data.amount_discount_recharge)) / 100)  : parseFloat(data.price) + parseFloat(data.amount_discount_recharge)
    }

    if(data.tax_additional){

      let calculo = parseFloat(price_new) * data.quantity
      let tax_extra = (parseFloat(price_new) * parseFloat(data.tax_additional)) / 100
      let calculo_with_tax = calculo + tax_extra

      return {
        price_new,
        total_price_unit_with_tax : tax_extra + parseFloat(price_new),
        total_price : calculo,
        total_price_with_tax : calculo_with_tax
      }

    }else{
      return{
        price_new,
        total_price : parseFloat(price_new) * data.quantity,
        total_price_unit_with_tax: data.total_price_unit_with_tax,
        total_price_with_tax: data.total_price_with_tax
      }
    }
  }

  const cleanData = () => {
    setProductNew({
      name_product: '',
      is_neto: true,
      tax_additional: '',
      quantity: '',
      unity: 1,
      concept: '',
      description: '',
      price: '',
      unit_price_with_tax: '',
      amount_discount_recharge: '',
      type_discount_recharge: '',
      type_amount_discount_recharge: '',
      price_total: '',
      price_backup_unit : '',
      price_total_with_tax:'',
      not_registered: true,
    })

    setProductChoice(null)
    setShowSection(false)
    setCantidadProduct('')
  }

  const finishSelectProduct = () => {
    if(cantidadProduct){
      productChoice.quantity = cantidadProduct
      props.handleSelectProduct(productChoice)
      cleanData()
    }else{
      toast.error('La cantidad no puede estar vacia')
    }

  }

  const handleHide = () => {
    cleanData()
    props.onHide()
  }

  const handleSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidateForm(true);
      return
    }
    props.handleSelectProduct(Object.assign({},productNew))
    cleanData()
    setValidateForm(false)
  }

  const onChange = e => {
    setCantidadProduct(e.target.value)
  }

  const onChangeNewProduct = e => {
    e.persist()
    let productCopy = Object.assign({},productNew)
    let total_price_unit_with_tax = productCopy.unit_price_with_tax
    let total_price = productCopy.total_price
    let total_price_with_tax = productCopy.total_price_with_tax
    let price_backup_unit = productCopy.price

    if(e.target.name === 'quantity'){
      if(productNew.price){
        if(productNew.tax_additional){

          productCopy.quantity = e.target.value
          let result = calculatePriceWithTax(productCopy)
          total_price_unit_with_tax = result.total_price_unit_with_tax
          total_price = result.total_price
          total_price_with_tax =  result.total_price_with_tax
        }else{
          let calculo = parseFloat(productCopy.price) * e.target.value
          total_price = calculo
        }
      }
    }

    if(e.target.name === 'price'){
      if(productCopy.quantity){
        if(productCopy.tax_additional){
          productCopy.price = e.target.value
          let result = calculatePriceWithTax(productCopy)
          total_price_unit_with_tax = result.total_price_unit_with_tax
          total_price = result.total_price
          total_price_with_tax =  result.total_price_with_tax

        }else{
          let calculo = parseFloat(e.target.value) * productCopy.quantity
          total_price = calculo
        }
      }else if(productCopy.tax_additional){
        let tax_extra = (parseFloat(e.target.value) * parseFloat(productCopy.tax_additional)) / 100
        total_price_unit_with_tax = tax_extra + parseFloat(e.target.value)
      }
      productCopy.price_backup_unit = e.target.value
    }


    if(e.target.name === "type_amount_discount_recharge" && productCopy.amount_discount_recharge && productCopy.type_discount_recharge){

      productCopy.type_amount_discount_recharge = e.target.value
      let result = calculateDiscountOrRecharge(productCopy)
      total_price_unit_with_tax = result.total_price_unit_with_tax
      total_price = result.total_price
      total_price_with_tax = result.price_total_with_tax
      productCopy.price = result.price_new

    }else if(e.target.name === "amount_discount_recharge" && productCopy.type_amount_discount_recharge && productCopy.type_discount_recharge){

      productCopy.amount_discount_recharge = e.target.value
      let result = calculateDiscountOrRecharge(productCopy)
      total_price_unit_with_tax = result.total_price_unit_with_tax
      total_price = result.total_price
      total_price_with_tax = result.price_total_with_tax
      productCopy.price = result.price_new

    }else if(e.target.name === "type_discount_recharge" && productCopy.type_amount_discount_recharge && productCopy.amount_discount_recharge){

      productCopy.type_discount_recharge = e.target.value
      let result = calculateDiscountOrRecharge(productCopy)
      total_price_unit_with_tax = result.total_price_unit_with_tax
      total_price = result.total_price
      total_price_with_tax = result.price_total_with_tax
      productCopy.price = result.price_new
    }

    if(e.target.name === "concept"){
      if(e.target.value.length > 15){
        e.target.value  = e.target.value.substring(0,e.target.value.length - 1)
      }
    }

    productCopy.unit_price_with_tax = total_price_unit_with_tax
    productCopy.price_total = total_price
    productCopy.price_total_with_tax = total_price_with_tax
    productCopy[e.target.name] = e.target.value

    setProductNew(productCopy)
  }

  const removeDiscountOrRecharge = () => {

    let productCopy = Object.assign({},productNew)

    productCopy.price = productCopy.price_backup_unit
    let result = calculatePriceWithTax(productCopy)
    productCopy.unit_price_with_tax = result.total_price_unit_with_tax
    productCopy.price_total = result.total_price
    productCopy.price_total_with_tax =  result.total_price_with_tax
    productCopy.type_amount_discount_recharge = ""
    productCopy.amount_discount_recharge = ""
    productCopy.type_discount_recharge = ""
    setProductNew(productCopy)

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
        <Container>
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
                          <input ref={inputRefQuantity} onChange={onChange} className="form-control" value={cantidadProduct} />
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
                  <Container>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <Form onSubmit={handleSubmit} noValidate validated={validateForm}>
                          <br/>
                          <Row>
                            <Col sm={12} md={12} lg={12}>
                              <label className="form-control-label">Es Neto?</label>
                            </Col>
                            <Col sm={1} md={1} lg={1}>
                              <label className="checkbox-inline">
                                <input type="radio" value={false} checked={!productNew.is_neto} name="is_neto" onChange={onChangeNewProduct} />
                                No
                              </label>
                            </Col>
                            <Col sm={1} md={1} lg={1}>
                              <label className="checkbox-inline">
                                <input type="radio" value={true} checked={productNew.is_neto} name="is_neto" onChange={onChangeNewProduct} />
                                Si
                              </label>
                            </Col>
                            <InputField
                              {...props.inputNameProduct}
                              value={productNew.name_product}
                              handleChange={onChangeNewProduct}
                            />
                            <InputField
                              {...props.inputTaxAditional}
                              handleChange={onChangeNewProduct}
                              value={productNew.tax_additional}
                            >
                              <option value=''>--Seleccione</option>
                            </InputField>
                          </Row>
                          <Row>
                            <InputField
                              {...props.inputQuantity}
                              handleChange={onChangeNewProduct}
                              value={productNew.quantity}
                            />
                            <InputField
                              {...props.inputUnity}
                              handleChange={onChangeNewProduct}
                              value={productNew.unity}
                            >
                              <option value={1}>Unidad</option>
                              <option value={2}>Mayorista</option>
                              <option value={3}>(Kilos,Litros,Metros,Entre Otros...)</option>
                            </InputField>
                            <InputField
                              {...props.inputConcept}
                              handleChange={onChangeNewProduct}
                              value={productNew.concept}
                            />
                          </Row>
                          <Row>
                            <InputField
                              {...props.inputDescription}
                              handleChange={onChangeNewProduct}
                              value={productNew.description}
                            />
                            <InputField
                              {...props.inputUnitPrice}
                              handleChange={onChangeNewProduct}
                              value={productNew.price}
                            />
                            <InputField
                              {...props.inputUnitPriceTax}
                              handleChange={onChangeNewProduct}
                              value={productNew.unit_price_with_tax}
                            />
                          </Row>
                          <Row>
                            <Col sm={12} md={12} lg={12}>
                              <h4 className="text-center">Descuentos y Recargos</h4>
                              <br/>
                            </Col>
                          </Row>
                          <Row>
                            <InputField
                              {...props.inputTypeAmountRechargeDiscount}
                              handleChange={onChangeNewProduct}
                              value={productNew.type_amount_discount_recharge}
                            >
                              <option value=''>--Seleccione--</option>
                              <option value='Descuento'>Descuento</option>
                              <option value='Recargo'>Recargo</option>

                            </InputField>
                            <InputField
                              {...props.inputAmountDiscountRecharge}
                              handleChange={onChangeNewProduct}
                              value={productNew.amount_discount_recharge}
                            />
                            <InputField
                              {...props.inputTypeRechargeDiscount}
                              handleChange={onChangeNewProduct}
                              value={productNew.type_discount_recharge}
                            >
                              <option value=''>--Seleccione--</option>
                              <option value='Fijo'>Fijo</option>
                              <option vale='Porcentaje'>Porcentaje</option>
                            </InputField>
                          </Row>
                          <Row className="justify-content-center">
                            <InputField
                              {...props.inputPriceTotal}
                              handleChange={onChangeNewProduct}
                              value={productNew.price_total}
                            />
                            <InputField
                              {...props.inputPriceTotalTax}
                              handleChange={onChangeNewProduct}
                              value={productNew.price_total_with_tax}
                            />
                          </Row>
                          <Row className="justify-content-center">
                            <Col sm={4} md={4} lg={4}>
                              <Button size="sm" type="submit" variant="primary" block={true}>Enviar</Button>
                            </Col>
                            <Col sm={4} md={4} lg={4}>
                              <Button size="sm" type="button" variant="danger" block={true} onClick={removeDiscountOrRecharge} >Remover Descuento o Recargo</Button>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleHide}>Cerrar</Button>
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
    label : 'Unidad',
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
