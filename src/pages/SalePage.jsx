import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Row,
  Col,
  Container,
  Button,
  DropdownButton,
  Dropdown,
  Modal
} from 'react-bootstrap'
import { FaList, FaRegImages, FaPlusCircle, FaTrashAlt, FaShoppingCart } from 'react-icons/fa'
import SquareProductComponent from 'components/SquareProductComponent'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import TableProductComponent from 'components/TableProductComponent'
import FormClientModal from 'components/modals/FormClientModal'
import ScanQrModal from 'components/modals/ScanQrModal'
import FormProductModal from 'components/modals/FormProductModal'
import ModalProductsNotRegistered from 'components/modals/ModalProductsNotRegistered'
import AutoCompleteComponent from 'components/AutoCompleteComponent'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import InputField from 'components/input/InputComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdPersonAdd } from 'react-icons/md';
import { AiOutlineQrcode, AiFillTag, AiOutlineBarcode } from "react-icons/ai";
//import QuaggaScanner from 'components/QuaggaScanner'
import LoadingComponent from 'components/LoadingComponent';
import EanInputScanner from "components/EanInputScanner";

let count = 0;
let countEan = 0;
let productAddTemporally = null;

const SalePage = (props) => {

  const [categorys, setCategorys] = useState([])
  const [clients, setClients] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalEan, setIsShowModalEan] = useState(false)
  const [isShowModalQr, setIsShowModalQr] = useState(false)
  const [isShowModaNotRegistered, setIsShowModalNotRegistered] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)

  const [products, setProducts] = useState([]) // los productos más vendidos y que son filtrados por categorias
  const [productsBackup, setProductsBackup] = useState([])
  const [productsAll, setProductsAll] = useState([]) // Todos los Productos para ser filtrados por el autocomplete
  const [resetValueClient, setResetValueClient] = useState(false)
  const [showList, setShowList] = useState(false)
  const [isEanScaner, setIsEanScaner] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)
  const [isOpenModalMeasurement, setIsOpenModalMeasurement] = useState(false);

  count++;

  useEffect(() => {
    fetchData(true);
    return () => {
      count = 0;
    }
  }, [])

  useEffect(() => {
    if (props.sale.rooms.length !== 1 && count > 1) {
      toast.success('Proceso Completado')
    }
  }, [props.sale.rooms.length])

  const catchBarCodeEan = codeBar => {
    axios.get(API_URL + 'productByCodeBar/' + codeBar).then(result => {

      setIsShowModalEan(false)
    }).catch(err => {
      props.tokenExpired(err)
    })
  }

  const fetchData = async (isBeggining = false) => {
    let promises = [];
    if (!displayLoading) {
      setDisplayLoading(true);
    }
    if (!isBeggining) {
      promises.push(axios.get(API_URL + 'client'));
    } else {
      promises = [
        axios.get(API_URL + 'client'),
        axios.get(API_URL + 'category'),
        axios.get(API_URL + 'productByCategory/todos/0'),
        axios.get(API_URL + "listProduct"),
      ];
    }
    try {
      let results = await Promise.all(promises);
      setClients(results[0].data)
      if (isBeggining) {
        setCategorys(results[1].data);
        setProductsAll(results[2].data);
        setProducts(results[2].data);
        setProductsBackup(results[2].data);
        setListProducts(results[3].data);
      }
      setDisplayLoading(false)
    } catch (error) {
      setDisplayLoading(false)
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Error, contacte con soporte");
      }
    }
  }

  const catchQr = codeQr => {
    let idProduct = codeQr.text.split(",")[1].split(":")[1];
    let product = productsAll.find(v => v.id == idProduct);
    handleAddToCart(product);
  }

  const handleAddToCart = data => {

    let productToAdd = Object.assign({}, data)
    let productRegistered = props.sale.rooms[props.sale.idCartSelected].carts.registered.find(v => v.id === data.id)

    if (productRegistered) {
      if (props.configStore.handle_stock) {
        if (productToAdd.method_sale === 3) {
          handleOpenModalMeasurement(productToAdd);
        } else {
          props.addProduct({ product: productToAdd, configStore: props.configStore })
          toast.success('Proceso Completado')
        }
      } else {
        props.addProduct({ product: productToAdd, configStore: props.configStore })
        toast.success('Proceso Completado')
      }
    } else {
      if (props.configStore.handle_stock) {
        if (productToAdd.method_sale === 3) {
          handleOpenModalMeasurement(productToAdd);
        } else {
          if (productRegistered) {
            props.addProduct({ product: productToAdd, configStore: props.configStore })
            toast.success('Proceso Completado')
          } else {
            props.addProduct({ product: productToAdd, configStore: props.configStore })
            toast.success('Proceso Completado')
          }
        }
      } else {
        props.addProduct({ product: productToAdd, configStore: props.configStore })
        toast.success('Proceso Completado')
      }
    }
  }

  const handleAddProductNotRegistered = data => {
    handleOnHideModals('not_registered')
    props.addProductNotRegistered({ product: Object.assign({}, data), configStore: props.configStore })
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
        fetchData()
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

  const handleOpenModals = (type) => {
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
    let data_document = data.split('/');
    let client = clients.find(v => {
      if (data_document.length > 1) {
        if (data_document[1].indexOf("-") !== -1) {
          return v.data_document + "-" + v.dv === data_document[1];
        } else {
          return v.data_document === data_document[1];
        }

      } else {
        return v.name_client === data_document[0];
      }

    })
    props.setBuyer(client)
  }

  const handleSelectProduct = data => {
    let product = productsAll.find(v => v.name_product === data);
    setProducts([product]);
  }

  const resetProductsHandler = () => {
    setProducts(productsBackup);
  }

  const handleShowProducts = () => {
    setShowList(state => !state)
  }

  const searchByCategory = category => {
    setDisplayLoading(true);
    if (category) {
      let listP = document.getElementById("select_list_product").value;
      axios.get(API_URL + 'productByCategory/' + category + "/" + listP).then(result => {
        setProducts(result.data);
        setProductsBackup(result.data);
        setDisplayLoading(false);
      }).catch(err => {
        setDisplayLoading(false);
        props.tokenExpired(err)
      })
    }
  }

  const listProductHandler = (e) => {
    setDisplayLoading(true);
    axios.get(API_URL + 'productByCategory/todos/' + e.target.value).then(results => {
      setProductsAll(results.data);
      setProducts(results.data);
      setProductsBackup(results.data);
      setDisplayLoading(false);
    }).catch(err => {
      setDisplayLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
        toast.error("Ha ocurrido un error, contacte con soporte");
      }
    })
  }

  const onChangeEanInputHandler = e => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      if (value) {
        let product = productsAll.find(v => v.code_ean === value);
        if (product) {
          handleAddToCart(product);
          document.getElementById("eanCatchInput").value = "";
        } else {
          toast.info("No se encuentran productos con ese código Ean");
          document.getElementById("eanCatchInput").value = "";
        }
      }
    }
  }

  const displayEanSectionHandler = () => {
    if (!isEanScaner) {
      setTimeout(() => {
        document.getElementById("eanCatchInput").focus();
      }, 500)
    }
    setIsEanScaner(!isEanScaner);
  }

  const addCartMeasurementProduct = () => {
    let value = document.getElementById("measurement_quantity").value;
    if (!value) return toast.error("Debe introducir una cantidad para continuar");
    productAddTemporally.quantityMeasurement = parseFloat(value);
    props.addProduct({ product: productAddTemporally, configStore: props.configStore });
    toast.success("Producto agregado con éxito");
    productAddTemporally = null;
    handleOpenModalMeasurement();
  }

  const handleOpenModalMeasurement = (productMeasurement = false) => {
    if (!isOpenModalMeasurement) {
      productAddTemporally = productMeasurement;
      setTimeout(() => {
        document.getElementById("measurement_quantity").focus();
      }, 500)
    }
    setIsOpenModalMeasurement(!isOpenModalMeasurement);
  }
  return (
    <Container fluid='true'>
      <Row>
        <Col sm={4} md={4} lg={4} xs={4} style={{ borderRadius: '15px', boxShadow: '10px 5px 5px lightgray', padding: '20px' }}>
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
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <br />
              <ul className="">
                {props.sale.rooms[props.sale.idCartSelected].client && Object.keys(props.sale.rooms[props.sale.idCartSelected].client).length > 0 ? (
                  <React.Fragment>
                    <p className="text-center">
                      <b>Nombre:&nbsp;</b>{props.sale.rooms[props.sale.idCartSelected].client.name_client}
                      <br />
                      {props.sale.rooms[props.sale.idCartSelected].client.data_document && props.sale.rooms[props.sale.idCartSelected].client.dv ? (
                        <>
                          <b>N°:</b>&nbsp;{props.sale.rooms[props.sale.idCartSelected].client.data_document + "-" + props.sale.rooms[props.sale.idCartSelected].client.dv}
                        </>
                      ) : props.sale.rooms[props.sale.idCartSelected].client.data_document ? (
                        <>
                          <b>N°:</b>&nbsp;{props.sale.rooms[props.sale.idCartSelected].client.data_document}
                        </>
                      ) : ""}
                      &nbsp;&nbsp;&nbsp;
                      <a style={{ color: 'red' }} href="javascript:void(0)" onClick={handleClientRemove}>
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
          <hr />
          <Row className="justify-content-center">
            <Col sm={10} md={10} lg={10}>
              <AutoCompleteComponent
                items={productsAll}
                keyName='name_product'
                returnValue={handleSelectProduct}
                showAllCategories={resetProductsHandler}
                titleTooltip="Buscar Producto"
              />
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            {/*<Col sm={3} md={3} lg={3} xs={3} >
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Buscar Producto por Qr</Tooltip>}>
                <Button size="sm" size="sm" variant="secondary" block="true" onClick={() => handleOpenModals('qr')} >
                  <AiOutlineQrcode size='1.3em' />
                </Button>
              </OverlayTrigger>
              </Col>*/}
            <Col sm={3} md={3} lg={3} xs={3}>
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Buscar Producto por EAN</Tooltip>}>
                <Button size="sm" size="sm" variant="secondary" block="true" onClick={displayEanSectionHandler}>
                  <AiOutlineBarcode size='1.3em' />
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
                      <FaRegImages size='1.3em' />
                    </Button>
                  </OverlayTrigger>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Mostar como Lista</Tooltip>}>
                    <Button size="sm" size="sm" variant="secondary" block="true" onClick={handleShowProducts}>
                      <FaList size='1.3em' />
                    </Button>
                  </OverlayTrigger>
                </React.Fragment>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Button size="sm" size="sm" variant="primary" block="true" size="sm" onClick={() => props.addCart()}>Agregar &nbsp;&nbsp;<FaShoppingCart /></Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <DropdownButton size="sm" id={'cart_button_quantity'} title="Cambiar de Carrito" block="true" variant="primary" className="dropdown_block" drop={'up'}>
                {props.sale.rooms.map((v, i) => (
                  <Dropdown.Item onClick={() => props.changeCartId(i)} key={i}>Carrito N° {i + 1}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <br />
          {props.showProductAndTotal()}
          <br />
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Button size="sm" size="sm" variant="danger" block="true" onClick={() => props.handleChangeView(2)} style={{ color: 'black' }}>Ver Detalle del &nbsp;&nbsp;<FaShoppingCart /></Button>
            </Col>
          </Row>
        </Col>
        {
          !isEanScaner ? (
            <Col sm={8} md={8} lg={8} xs={8} style={{ border: '1px solid white', borderRadius: '15px', boxShadow: '10px 5px 5px lightgray' }}>
              <Row className="justify-content-center" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <label className="form-control-label">Seleccione por Categoria</label>
                  <select className="form-control" onChange={handleChangeCategoryProduct} defaultValue="mas_vendidos" id="select_category">
                    <option value='todos'>Todos</option>
                    {categorys.map((v, i) => (
                      <option key={i} value={v.id}>{v.name_category}</option>
                    ))}
                  </select>
                </Col>
                <Col sm={6} md={6} lg={6} xs={6}>
                  <label className="form-control-label">Lista de Productos</label>
                  <select className="form-control" onChange={listProductHandler} id="select_list_product">
                    <option value='0'>-- Default --</option>
                    {listProducts.map((v, i) => (
                      <option key={i} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xs={12} onClick={() => handleOpenModals('product')}>
                  <br />
                  <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">Nuevo Producto</Tooltip>}>
                    <Button size="sm" block={true} size="sm" variant="success">Agregar Producto &nbsp;&nbsp;<FaPlusCircle /></Button>
                  </OverlayTrigger>
                </Col>
              </Row>
              <hr />
              {displayLoading ? (
                <LoadingComponent />
              ) : (
                <Row>
                  <Col sm={12} md={12} lg={12} style={{ overflow: 'auto', height: '100%', maxHeight: '520px' }}>
                    {showList ? (
                      <TableProductComponent data={products} addToCart={handleAddToCart} configStore={props.configStore} config={props.config} />
                    ) : (
                      <Row style={{ overflowY: 'auto' }}>
                        {products.map((v, i) => (
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
              )}
            </Col>
          ) : (
            <EanInputScanner
              readonly={false}
              onChangeEanInputHandler={onChangeEanInputHandler}
              displayEanSectionHandler={displayEanSectionHandler}
              displaySectionHandler={true}
            />
          )
        }
      </Row>
      <Modal
        show={isOpenModalMeasurement}
        onHide={handleOpenModalMeasurement}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Introduzca la cantidad de medida del producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <InputField
              type="number"
              step="any"
              label="Cantidad"
              name="measurement_quantity"
              messageErrors={[]}
              cols="col-sm-6 col-md-6 col-lg-6 col-xl-6"
              handleChange={() => { }}
              handleKeyUp={(e) => { if (e.keyCode === 13) document.getElementById("btnMeasurement").click(); }}
            />
          </Row>
          <Row className="justify-content-center">
            <Col sm={4} md={4} lg={4} xl={4}>
              <Button variant="danger" id="btnMeasurement" block={true} onClick={addCartMeasurementProduct} size="sm" type="button">Agregar al Carro <FaShoppingCart /></Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOpenModalMeasurement}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <FormClientModal
        isShow={isShowModalClient}
        onHide={() => handleOnHideModals('client')}
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
