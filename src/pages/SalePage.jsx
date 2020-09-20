import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Row,
  Col,
  Container,
  Button,
  Image,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import { FaSearch, FaList, FaRegImages, FaPlusCircle, FaTrash, FaTrashAlt, FaShoppingCart } from 'react-icons/fa'
import SquareProductComponent from 'components/SquareProductComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import TableProductComponent from 'components/TableProductComponent'
import FormClientModal from 'components/modals/FormClientModal'
import ScanEanModal from 'components/modals/ScanEanModal'
import ScanQrModal from 'components/modals/ScanQrModal'
import FormProductModal from 'components/modals/FormProductModal'
import ModalProductsNotRegistered from 'components/modals/ModalProductsNotRegistered'
import AutoCompleteComponent from 'components/AutoCompleteComponent'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdPersonAdd } from 'react-icons/md';
import { AiOutlineQrcode, AiFillTag, AiOutlineBarcode } from "react-icons/ai";
import QuaggaScanner from 'components/QuaggaScanner'

const SalePage = (props) => {

  const [categorys,setCategorys] = useState([])
  const [clients,setClients] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalEan, setIsShowModalEan] = useState(false)
  const [isShowModalQr, setIsShowModalQr] = useState(false)
  const [isShowModaNotRegistered, setIsShowModalNotRegistered] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)

  const [products,setProducts] = useState([]) // los productos más vendidos y que son filtrados por categorias
  const [productsBackup,setProductsBackup] = useState([])
  const [productsAll,setProductsAll] = useState([]) // Todos los Productos para ser filtrados por el autocomplete
  const [resetValueClient,setResetValueClient] = useState(false)
  const [showList,setShowList] = useState(false)
  const [isEanScaner, setIsEanScaner] = useState(false)

  useEffect(() => {
    fetchProductsMostSolds()
    fetchCategorys()
    fetchClients()
    fetchAllProductsAdviable()
  },[])

  useEffect(() => {
    if(props.sale.rooms.length !== 1){
      toast.success('Proceso Completado')
    }
  },[props.sale.rooms.length])

  const catchBarCodeEan = codeBar => {
    axios.get(API_URL+'productByCodeBar/'+codeBar).then(result => {
      setIsShowModalEan(false)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const catchQr = codeQr => {
    console.log(codeQr)
  }

  const fetchAllProductsAdviable = () => {
    axios.get(API_URL+'productByCategory/todos').then(result => {
      setProductsAll(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const fetchClients = () => {
    axios.get(API_URL+'client').then(result => {
      setClients(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const fetchCategorys = () => {
    axios.get(API_URL+'category').then(result => {
      setCategorys(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }

    })
  }

  const fetchProductsMostSolds = () => {
    let promise = [
      axios.get(API_URL+'productByCategory/mas_vendidos'),
    ]
    Promise.all(promise).then(async result => {
      setProducts(result[0].data)
      setProductsBackup(result[0].data)
        //props.history.replace('/config/config_store')
    }).catch(err => {
      if(err.response){
        if(err.response.data.message === "Debe hacer la configuración de empresa para continuar"){
          props.history.replace('/config/config_store')
        }else{
          toast.error(err.response.data.message)
        }
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleAddToCart = data => {

    let productToAdd = Object.assign({},data)
    let productRegistered = props.sale.rooms[props.sale.idCartSelected].carts.registered.find(v => v.id === data.id)

    if(productRegistered){
      if(props.configStore.handle_stock){
        if(productToAdd.method_sale === 2){
          if( (productRegistered.cantidad + productToAdd.pack) >  productToAdd.inventary[0].stock ){
            toast.error('No existe cantidad en el inventario para satisfacer el pedido')
          }else{
            props.addProduct({product: productToAdd, configStore: props.configStore })
            toast.success('Proceso Completado')
          }
        }else{
          if( (productRegistered.cantidad + 1) >  productToAdd.inventary[0].stock ){
            toast.error('No existe cantidad en el inventario para satisfacer el pedido')
          }else{
            props.addProduct({product: productToAdd, configStore: props.configStore })
            toast.success('Proceso Completado')
          }
        }
      }else{
        props.addProduct({product: productToAdd, configStore: props.configStore })
        toast.success('Proceso Completado')
      }
    }else{
      if(props.configStore.handle_stock){
        if(productToAdd.method_sale === 2){
          // si es producto mayorista
          if(productRegistered){
            // si el producto esta registrado
            if( (productRegistered.cantidad + productToAdd.pack) >  productToAdd.inventary[0].stock ){
              toast.error('No existe cantidad en el inventario para satisfacer el pedido')
            }else{
              props.addProduct({product: productToAdd, configStore: props.configStore })
              toast.success('Proceso Completado')
            }
          }else{
            // si el producto es mayorista pero no esta registrado
            if( productToAdd.pack >  productToAdd.inventary[0].stock ){
              toast.error('No existe cantidad en el inventario para satisfacer el pedido')
            }else{
              props.addProduct({product: productToAdd, configStore: props.configStore })
              toast.success('Proceso Completado')
            }
          }
        }else{
          //si no es mayorista y se maneja inventario
          if(productRegistered){
            // si el producto esta registrado
            if( (productRegistered.cantidad + 1) >  productToAdd.inventary[0].stock ){
              toast.error('No existe cantidad en el inventario para satisfacer el pedido')
            }else{
              props.addProduct({product: productToAdd, configStore: props.configStore })
              toast.success('Proceso Completado')
            }
          }else{
            // si el producto no es mayorista y no esta registrado
              props.addProduct({product: productToAdd, configStore: props.configStore })
              toast.success('Proceso Completado')
          }
        }
      }else{
        props.addProduct({product: productToAdd, configStore: props.configStore })
        toast.success('Proceso Completado')
      }
    }
  }

  const handleAddProductNotRegistered = data => {
    handleOnHideModals('not_registered')
    props.addProductNotRegistered({ product: Object.assign({},data), configStore: props.configStore  })
    toast.success('Proceso Completado')
  }

  const handleChangeCategoryProduct = e => {
    searchByCategory(e.target.value)
  }

  const handleOnHideModals = type => {
    switch (type) {
      case 'qr':
        setIsShowModalQr(false)
      break;
      case 'ean':
        setIsShowModalEan(false)
      break;
      case 'client':
        setIsShowModalClient(false)
        fetchClients()
      break;
      case 'not_registered':
        setIsShowModalNotRegistered(false)
      break;
      case 'product':
        setIsShowModalProduct(false)
      break;
    }
  }

  const handleClientRemove = e => {
      props.deleteBuyer()
      setResetValueClient(true)
  }

  const handleOpenModals = (type)=> {
    switch (type) {
      case 'qr':
        setIsShowModalQr(true)
      break;
      case 'ean':
        setIsShowModalEan(true)
      break;
      case 'client':
        setIsShowModalClient(true)
      break;
      case 'not_registered':
        setIsShowModalNotRegistered(true)
      break;
      case 'product':
        setIsShowModalProduct(true)
      break;
    }
  }

  const handleRegisterNewProduct = () => {
      handleOnHideModals('product')
      let category = document.getElementById('select_category').value
      searchByCategory(category)
  }

  const handleResetValueClient = () => {
    setResetValueClient(false)
  }

  const handleSelectClient = data => {
    let data_document = data.split('-')[1]
    let client = clients.find(v => v.data_document === data_document)
    props.setBuyer(client)
  }

  const handleSelectProduct = data => {
    let product = productsAll.find(v => v.name_product === data)
    setProducts([product])
  }

  const handleShowAllCategories = () => {
    searchByCategory('todos')
  }

  const handleShowProducts = () => {
    setShowList(state => !state)
  }

  const searchByCategory = category => {
    if(category){
      axios.get(API_URL+'productByCategory/'+category).then(result => {
        setProducts(result.data)
        setProductsBackup(result.data)
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  return (
  <Container fluid='true'>
    <Row>
      <Col sm={4} md={4} lg={4} xs={4}  style={{borderRadius:'15px',boxShadow:'10px 5px 5px lightgray', padding: '20px'}}>
        <Row className="justify-content-center">
          <Col sm={8} md={8} lg={8}>
            <AutoCompleteClientComponent
            items={clients}
            returnValue={handleSelectClient}
            handleResetValueClient={handleResetValueClient}
            resetValue={resetValueClient}
            />
          </Col>
          <Col sm={2} md={2} lg={2} xs={2}>
            <a href="javascript:void(0)" onClick={() => handleOpenModals('client')}>
              <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled2">Agregar Cliente</Tooltip>}>
                <MdPersonAdd size="2.5em" />
              </OverlayTrigger>
            </a>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <br/>
            <ul className="">
              { Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0 ? (
                <React.Fragment>
                  <p>
                    <b>Nombre:&nbsp;</b>{props.sale.rooms[props.sale.idCartSelected].client.name_client}
                    <br/>
                    <b>N°:</b>&nbsp;{props.sale.rooms[props.sale.idCartSelected].client.data_document}
                      &nbsp;&nbsp;&nbsp;
                      <a style={{color: 'red'}} href="javascript:void(0)" onClick={handleClientRemove}>
                        <FaTrashAlt />
                      </a>
                    </p>
                  </React.Fragment>
                ) : (
                  <h6 className="text-center">Sin cliente de compra</h6>
                )
              }
            </ul>
          </Col>
        </Row>
        <hr/>
        <Row className="justify-content-center">
          <Col sm={10} md={10} lg={10}>
            <div style={{width: '100%',position: 'relative', zIndex: '1000'}}>
              <AutoCompleteComponent
                items={productsAll}
                keyName='name_product'
                returnValue={handleSelectProduct}
                showAllCategories={handleShowAllCategories}
                titleTooltip="Buscar Producto"
                />
            </div>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={3} md={3} lg={3} xs={3} >
            <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Buscar Producto por Qr</Tooltip>}>
              <Button size="sm" size="sm" variant="secondary" block="true" onClick={() => handleOpenModals('qr')} >
                <AiOutlineQrcode size='1.3em'/>
              </Button>
            </OverlayTrigger>
          </Col>
          <Col sm={3} md={3} lg={3} xs={3}>
            <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Buscar Producto por EAN</Tooltip>}>
              <Button size="sm" size="sm" variant="secondary" block="true" onClick={() => {setIsEanScaner(true) /*handleOpenModals('ean')*/ } }>
                <AiOutlineBarcode size='1.3em'/>
              </Button>
            </OverlayTrigger>
          </Col>
          <Col sm={3} md={3} lg={3} xs={3}>
            <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Vender Producto no Registrado</Tooltip>}>
            <Button size="sm" size="sm" variant="secondary" block="true" onClick={() => handleOpenModals('not_registered')}>
              <AiFillTag size='1.3em' />
            </Button>
            </OverlayTrigger>
          </Col>
          <Col sm={3} md={3} lg={3} xs={3}>
            {showList ? (
              <React.Fragment>
                <OverlayTrigger placement={'button'} overlay={<Tooltip id="tooltip-disabled">Mostar por Tableros</Tooltip>}>
                <Button size="sm" size="sm" variant="secondary" block="true" onClick={handleShowProducts}>
                  <FaRegImages size='1.3em'/>
                </Button>
                </OverlayTrigger>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Mostar como Lista</Tooltip>}>
                <Button size="sm" size="sm" variant="secondary" block="true" onClick={handleShowProducts}>
                  <FaList size='1.3em'/>
                </Button>
                </OverlayTrigger>
              </React.Fragment>
            )}
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Button size="sm" size="sm" variant="primary" block="true" size="sm" onClick={() => props.addCart()}>Agregar &nbsp;&nbsp;<FaShoppingCart/></Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <DropdownButton size="sm" id={'cart_button_quantity'} title="Cambiar de Carrito"  block="true" variant="primary" className="dropdown_block" drop={'up'}>
              {props.sale.rooms.map((v,i) => (
                <Dropdown.Item onClick={ () => props.changeCartId(i) } key={i}>Carrito N° { i + 1 }</Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <br/>
        {props.showProductAndTotal()}
        <br/>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Button size="sm" size="sm" variant="danger" block="true" onClick={() => props.handleChangeView(2) } style={{color:'black'}}>Ver Detalle del &nbsp;&nbsp;<FaShoppingCart/></Button>
          </Col>
        </Row>
      </Col>
      {
        !isEanScaner ? (
          <Col sm={8} md={8} lg={8} xs={8} style={{ border: '1px solid white', borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
            <Row className="justify-content-center">
              <Col sm={7} md={7} lg={7} xs={7}>
                <select className="form-control" onChange={handleChangeCategoryProduct} defaultValue="mas_vendidos" id="select_category">
                  <option value='todos'>Todos</option>
                  <option value='mas_vendidos'>Más Vendidos</option>
                  {categorys.map((v,i) => (
                    <option key={i} value={v.id}>{v.name_category}</option>
                  ))}
                </select>
              </Col>
              <Col sm={4} md={4} lg={4} xs={4}>
                <label className="form-control-label">Seleccione por Categoria</label>
              </Col>
              <Col sm={12} md={12} lg={12} xs={12} onClick={() => handleOpenModals('product')}>
                <br/>
                <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Nuevo Producto</Tooltip>}>
                  <Button size="sm" block={true} size="sm" variant="success">Agregar Producto &nbsp;&nbsp;<FaPlusCircle /></Button>
                </OverlayTrigger>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={12} md={12} lg={12} style={{overflow:'auto' , height:'100%', maxHeight:'520px'}}>
                {showList ? (
                  <TableProductComponent data={products} addToCart={handleAddToCart} configStore={props.configStore} config={props.config} />
                ) : (
                  <Row style={{ overflowY: 'auto'}}>
                    {products.map((v,i) => (
                      <Col sm={3} md={3} lg={3} xs={3} key={i} onClick={() => handleAddToCart(v)} className="separatedBlockProducts">
                        <SquareProductComponent
                          product={v}
                          config={props.config}
                          configStore={props.configStore}
                          />
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        ) : (
          <Col sm={8} md={8} lg={8} style={{ border: '1px solid white', borderRadius:'15px',boxShadow:'10px 5px 5px lightgray'}}>
            <Row className="justify-content-center">
              <Col sm={6} md={6} lg={6}>
                <Button variant="danger" block={true} type="button" size="sm" onClick={() => { setIsEanScaner(false) } }>Mostrar Productos</Button>
              </Col>
            </Row>
            <br/>
            <br/>
            <Row className="justify-content-center">
              <Col sm={7} md={7} lg={7}>
                <QuaggaScanner catchCode={catchBarCodeEan}/>
              </Col>
            </Row>
          </Col>
        )
      }

    </Row>
      <FormClientModal
        isShow={isShowModalClient}
        onHide={() => handleOnHideModals('client')}
      />
      <ScanEanModal
        show={isShowModalEan}
        onHide={() => handleOnHideModals('ean')}
        catchCode={catchBarCodeEan}
      />
      <ScanQrModal
        show={isShowModalQr}
        onHide={() => handleOnHideModals('qr')}
        catchQrCode={catchQr}
      />
      <FormProductModal
        show={isShowModalProduct}
        onHide={() => handleOnHideModals('product')}
        handleSubmitProduct={handleRegisterNewProduct}
        {...props}
      />
      <ModalProductsNotRegistered
        isShow={isShowModaNotRegistered}
        onHide={() => handleOnHideModals('not_registered')}
        handleAddProduct={handleAddProductNotRegistered}
      />
    </Container>
  )

}

SalePage.propTypes = {
  addCart: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  removeCart: PropTypes.func.isRequired,
  setBuyer: PropTypes.func.isRequired,
  sale: PropTypes.object.isRequired,
  changeCartId: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  addProductNotRegistered: PropTypes.func.isRequired,
  configStore: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  showIndexCart: PropTypes.func.isRequired,
  deleteBuyer: PropTypes.func.isRequired
}

export default SalePage
