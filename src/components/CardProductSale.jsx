import React, { useEffect , useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateProduct, } from 'actions/cart'
import {
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'styles/components/cardProductSale.css'
import { showPriceWithDecimals } from 'utils/functions'
import { FaTrash } from 'react-icons/fa'

const CardProductSale = (props) => {

  const [cantidadValue, setCantidadValue] = useState()
  const [isUpdateCantidad, setIsUpdateCantidad] = useState(false)
  const [isUpdatePrice, setIsUpdatePrice] = useState(false)
  const [priceValue, setPriceValue] = useState('')
  const quantityInput = useRef(null)
  const quantityPrice = useRef(null)

  useEffect(() => {
    setPriceValue(props.product.price)
    setCantidadValue(props.product.cantidad)
  },[props.product.price,props.product.cantidad])

  const handleChangeCantidad = e => {
    setCantidadValue(e.target.value)
  }

  const handleChangePrice = e => {
    setPriceValue(e.target.value)
  }

  const handleModalDescription = product => {
    props.handleModalDescription(product)
  }

  const handleQuantityProduct = () => {
    setIsUpdateCantidad(!isUpdateCantidad)
    setTimeout(() => {
      quantityInput.current.focus()
    }, 300)
  }

  const handlePriceProduct = () => {
    setIsUpdatePrice(!isUpdatePrice)
    setTimeout(() => {
      quantityPrice.current.focus()
    },300)
  }

  const setUpdate = e => {
    if(e.keyCode === 13){

      let productToAdd = Object.assign({},props.product)
      let productRegistered = props.sale.rooms[props.sale.idCartSelected].carts.registered.find(v => v.id === productToAdd.id)

      if(productRegistered){
        if(props.configStore.handle_stock){
          if( cantidadValue >  productToAdd.inventary[0].stock ){
            toast.error('No existe cantidad en el inventario para satisfacer el pedido')
            setCantidadValue(productRegistered.cantidad)
            setIsUpdateCantidad(false)
            setIsUpdatePrice(false)
          }else{
            props.updateProduct({
              cantidad: cantidadValue ? cantidadValue : 0,
              price: priceValue,
              name_product: productToAdd.name_product,
              id_product: productToAdd.id,
              typeProduct: props.isRegistered ? 'registered' : 'not_registered',
              configStore: props.configStore
            })
            setIsUpdateCantidad(false)
            setIsUpdatePrice(false)
          }
        }else{
          props.updateProduct({
            cantidad: cantidadValue ? cantidadValue : 0,
            price: priceValue,
            name_product: productToAdd.name_product,
            id_product: productToAdd.id,
            typeProduct: props.isRegistered ? 'registered' : 'not_registered',
            configStore: props.configStore
          })
          setIsUpdateCantidad(false)
          setIsUpdatePrice(false)
        }
      }else{
        props.updateProduct({
          cantidad: cantidadValue ? cantidadValue : 0,
          price: priceValue,
          name_product: productToAdd.name_product,
          id_product: productToAdd.id,
          typeProduct: props.isRegistered ? 'registered' : 'not_registered',
          configStore: props.configStore
        })

        setIsUpdateCantidad(false)
        setIsUpdatePrice(false)
      }
    }
  }

  const removeProduct = () => {
    props.removeProduct({
      product: Object.assign({},props.product),
      typeProduct: props.isRegistered ? 'registered' : 'not_registered'
    })
  }

  return (
    <Card className="separationCard">
      <Card.Header>
        <Row className="justify-content-center">
          <Col sm={2} md={2} lg={2}>
            <h6 className="text-center">Cantidad</h6>
            <br/>
            <input ref={quantityInput} style={{display: isUpdateCantidad ? 'block' : 'none' }} id="input_quantity" type="number" className="form-control" placeholder="Presione enter para enviar" onKeyUp={setUpdate} value={cantidadValue} onChange={handleChangeCantidad} />
            {isUpdateCantidad ? '': (
              <h6 className="text-center">{props.product.cantidad}</h6>
            )}
          </Col>
          <Col sm={2} md={2} lg={2}>
            <h6 className="text-center">Nombre</h6>
            <br/>
            <h6 className="text-center">{props.product.name_product}</h6>
          </Col>
          <Col sm={2} md={2} lg={2}>
            <h6 className="text-center">Precio</h6>
            <br/>
            <input ref={quantityPrice} style={{ display: isUpdatePrice ? 'block' : 'none' }} type="number" step="any" className="form-control" placeholder="Presione enter para enviar" onKeyUp={setUpdate} value={priceValue} onChange={handleChangePrice} />
              {isUpdatePrice ? '' : (
                <h6 className="text-center">{ props.config.simbolo_moneda }{showPriceWithDecimals(props.config,props.product.price)}</h6>
              )}
          </Col>
          <Col sm={2} md={2} lg={2}>
            <h6 className="text-center">Total</h6>
            <br/>
            <h6 className="text-center">{ props.config.simbolo_moneda }{showPriceWithDecimals(props.config,props.product.price * props.product.cantidad)}</h6>
          </Col>
          <Col sm={2} md={2} lg={2}>
            <h6 className="text-center">Remover</h6>
            <br/>
            <Button size="sm" size="sm" variant="danger" onClick={removeProduct} block={true}><FaTrash /></Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row className="justify-content-center">
          <Col sm={2} md={2} lg={2} xs={6}>
            <Button size="sm" size="sm"  block="true" onClick={handleQuantityProduct}>
              Cantidad
            </Button>
          </Col>
          <Col sm={2} md={2} lg={2} xs={6}>
            <Button size="sm" size="sm"  block="true" onClick={handlePriceProduct}>
              Precio
            </Button>
          </Col>
          <Col sm={2} md={2} lg={2} xs={6}>
            <Button size="sm" size="sm"  block="true" onClick={() => handleModalDescription(props.product) } >
              Descripción
            </Button>
          </Col>,
          <Col sm={2} md={2} lg={2} xs={6}>
            <Button size="sm" size="sm"  block="true" onClick={() =>  props.handleModalRecharge(props.product,props.isRegistered)}>
              Recargo
            </Button>
          </Col>
          <Col sm={2} md={2} lg={2} xs={6}>
            <Button size="sm" size="sm"  block="true" onClick={() => props.handleModalDiscount(props.product,props.isRegistered) }>
              Descuento
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

CardProductSale.propTypes = {
  product: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  handleModalDescription: PropTypes.func.isRequired,
  handleModalDiscount: PropTypes.func.isRequired,
  configStore: PropTypes.object.isRequired,
  config : PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    sale: state.sale.sale
  }
}

function mapDispatchToProps(){
  return{
    updateProduct,
  }
}
export default connect(mapStateToProps,mapDispatchToProps())(CardProductSale)
