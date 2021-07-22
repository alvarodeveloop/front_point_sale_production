import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Badge,
  Modal,
  Form
} from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import ModalStockInventary from 'components/modals/ModalStockInventary'
import ModalHistoryInventary from 'components/modals/ModalHistoryInventary'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux'
import LoadingComponent from 'components/LoadingComponent'
import InputFieldRef from 'components/input/InputComponentRef'
import { toast } from 'react-toastify'
import 'styles/pages/inventary.scss'

let inventaryColumns = []
let count = 0;
const InventaryTab = (props) => {

  const [inventary, setInventary] = useState([])
  const [isOpenStock, setIsOpenStock] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [product, setProduct] = useState({})
  const [costs, setCosts] = useState([])
  const [providers, setProviders] = useState([])
  const [displayLoading, setDisplayLoading] = useState(true)
  const [displayLoadingModal, setDisplayLoadingModal] = useState(false);
  const [isOpenModalJustify, setIsOpenModalJustify] = useState(false)
  const [validated, setValidated] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      count = 0;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.id_branch_office])

  useEffect(() => {
    if (count !== 0) {
      fetchData(false);
    } else {
      count++;
    }
  }, [props.dispatchFetchRequest]);

  useMemo(() => {

    inventaryColumns = [
      {
        Header: 'Nombre Producto',
        accessor: props1 => props1.products.name_product
      },
      {
        Header: 'Categoría',
        accessor: props1 => props1.products.categories.map(v => v.categories ? v.categories.name_category : ''),
        Cell: props1 => {
          const { original } = props1.cell.row
          if (original.products.categories.length > 1) {
            return (
              <OverlayTrigger placement={'right'} overlay={
                <Tooltip id={"tooltip-right"}>
                  <ul className="list-group">
                    {original.products.categories.map((v, i) => (
                      <li key={i} className="list-group-item">{v.categories ? v.categories.name_category : ''}</li>
                    ))}
                  </ul>
                </Tooltip>
              }>
                <Button sm="sm" type="button" variant="link" block={true}>Categorias</Button>
              </OverlayTrigger>
            )
          } else {
            if (original.products.categories.length > 0) {
              return original.products.categories[0].categories.name_category
            } else {
              return ''
            }
          }
        }
      },
      {
        Header: 'Stock Mínimo',
        accessor: 'minimun_stock',
        Cell: props1 => {
          const stock = props1.cell.row.original.minimun_stock
          return (<Badge variant="danger" className="font-badge">{stock}</Badge>)
        }
      },
      {
        Header: 'Stock Actual',
        accessor: 'stock',
        Cell: props1 => {
          const stock = props1.cell.row.original.stock
          return (<Badge variant="danger" className="font-badge">{stock}</Badge>)
        }
      },
      {
        Header: 'Estado',
        accessor: 'estado',
        Cell: props1 => {

          if (props1.cell.row.original.estado === "Normal") {
            return (
              <Badge variant="success" className="font-badge">
                {props1.cell.row.original.estado}
              </Badge>
            )
          } else {
            return (
              <Badge variant="danger" className="font-badge">
                {props1.cell.row.original.estado}
              </Badge>
            )
          }
        }
      },
      {
        Header: 'Acciones',
        Cell: props1 => {
          const id = props1.cell.row.original.id
          return (
            <DropdownButton size="sm" id={'drop' + id} title="Seleccione" drop={"left"} block="true">
              <Dropdown.Item onClick={() => handleUpdateStock(props1.cell.row.original)}>Entrada y Salida de Stock</Dropdown.Item>
              <Dropdown.Item onClick={() => justifyStockHandler(props1.cell.row.original)}>Ajustar Inventario</Dropdown.Item>
              <Dropdown.Item onClick={() => showHistoryModal(props1.cell.row.original)}>Ver Historial</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]

  }, [])

  const handleUpdateStock = productData => {
    setProduct(productData)
    setTimeout(function () {
      setIsOpenStock(true)
    }, 300);
  }

  const fetchData = (providers = true) => {
    if (!displayLoading) {
      setDisplayLoading(true);
    }
    let promises = [
      axios.get(API_URL + 'inventary')
    ]
    if (providers) {
      promises.push(
        axios.get(API_URL + 'provider')
      );
    }
    Promise.all(promises).then(result => {
      setInventary(result[0].data)
      if (providers) {
        setProviders(result[1].data)
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleOnHideModalStock = () => {
    setIsOpenStock(false)
  }

  const showHistoryModal = data => {
    setCosts(data)
    handleOnHideModalHistory()
  }

  const handleOnHideModalHistory = () => {
    setIsOpenHistory(!isOpenHistory)
  }

  const handleSubmit = () => {
    setIsOpenStock(false)
    setIsOpenHistory(false)
    setProduct({})
    fetchData(false);
  }

  const justifyStockHandler = (data = false) => {
    setIsOpenModalJustify(!isOpenModalJustify);
    if (data) {
      console.log("aqui menor");
      setProduct(data);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 500)
    }
  }

  const onSubmitJustifyStockHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let stock = document.getElementById("stockJustify").value;
    let objectPut = Object.assign({}, product, {
      stock
    })
    setDisplayLoadingModal(true)
    axios.put(API_URL + "inventary_justify/" + product.id, objectPut).then(result => {
      toast.success("Stock ajustado con éxito");
      setDisplayLoadingModal(false);
      justifyStockHandler(false);
      setProduct({});
      fetchData(false);
    }).catch(err => {
      setDisplayLoadingModal(false)
      props.tokenExpired(err)
    })
  }

  return (
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (

        <Container>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <br />
              <h4 className="title_principal d-none d-md-block">Tabla Inventario</h4>
            </Col>
            <Col sm={12} md={6} lg={6} className="aligmentProductQuantityTitle">
              <br />
              <h4 className="title_principal d-none d-md-block">Cantidad Productos: <Badge variant="danger" className="font-badge">{inventary.length}</Badge></h4>
              <h5 className="title_principal d-block d-md-none">Cantidad Productos: <Badge variant="danger" className="font-badge">{inventary.length}</Badge></h5>
            </Col>
            <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
              <hr />
              <Table columns={inventaryColumns} data={inventary} />
            </Col>
          </Row>
          <Modal
            show={isOpenModalJustify}
            onHide={() => justifyStockHandler()}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="header_dark">
              <Modal.Title id="contained-modal-title-vcenter">
                Ajustar el Stock del Producto {Object.keys(product).length ? product.products.name_product : ""}
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmitJustifyStockHandler} noValidate validated={validated}>
              {displayLoadingModal ? (
                <Modal.Body>
                  <LoadingComponent />
                </Modal.Body>
              ) : (
                <Modal.Body>
                  <Row className="justify-content-center">
                    <InputFieldRef
                      ref={inputRef}
                      type="number"
                      required={true}
                      name="stockJustify"
                      handleChange={() => { }}
                      label="Stock"
                      messageErrors={[
                        "Requerido"
                      ]}
                      cols="col-sm-10 col-md-8 col-lg-8 col-xl-8 col-xs-12"
                    />
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={6} md={4} lg={4} xl={4} xs={12}>
                      <Button variant="danger" block={true} type="submit" size="sm">Enviar</Button>
                    </Col>
                  </Row>
                </Modal.Body>
              )}
            </Form>
            <Modal.Footer>
              <Button variant="secondary" type="button" onClick={() => justifyStockHandler()}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
          <ModalStockInventary
            isShow={isOpenStock}
            onHide={handleOnHideModalStock}
            product={product}
            handleSubmitStock={handleSubmit}
            providers={providers}
          />
          <ModalHistoryInventary
            isShow={isOpenHistory}
            onHide={handleOnHideModalHistory}
            costs={costs}
            fetchData={fetchData}
            handleSubmitStock={handleSubmit}
            providers={providers}
            configGeneral={props.configGeneral}
          />
        </Container>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    id_enterprise: state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config
  }
}

InventaryTab.propTypes = {
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise: PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
  dispatchFetchRequest: PropTypes.bool,
}

export default connect(mapStateToProps, {})(InventaryTab)
