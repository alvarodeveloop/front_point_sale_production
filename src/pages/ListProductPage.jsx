import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { OverlayTrigger, Tooltip, Modal, Form, Badge, Container, Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import LoadingComponent from 'components/LoadingComponent';
import Table from 'components/Table';
import axios from 'axios';
import { API_URL } from 'utils/constants'
import InputFieldRef from 'components/input/InputComponentRef'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux'
import { showPriceWithDecimals, formatNumber } from 'utils/functions'
import 'styles/components/modalComponents.scss'

let listColumns = [];
let productArrayCopy = []; // array para limpiar la data cuando haga post y los productos vuelvan a ser los productos originales
let productArrayCopy2 = []; // arreglo para modificar los precios y usarlos en el forEach del post

const ListProductPage = (props) => {
  const [listData, setListData] = useState([]);
  const [displayLoading, setDisplayLoading] = useState(true)
  const [validate, setValidated] = useState(false)
  const [products, setProducts] = useState([])
  const [productsDetail, setProductsDetail] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [configStore, setConfigStore] = useState({ tax: 19 })
  const [dataForm, setDataForm] = useState({
    name: "",
    status: true,
    id: ""
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (!displayLoading) {
      setDisplayLoading(true)
    }
    fetchData(true);
  }, [props.id_branch_office, props.id_enterprise])

  listColumns = useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Estado",
        accessor: props1 => props1.status ? ["Activa"] : ["Desactivada"]
      },
      {
        Header: "Cantidad Productos",
        accesor: props1 => [props1.details.length],
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <OverlayTrigger placement={'right'} overlay={
              <Tooltip id="tooltip-disabled2">
                {original.details.map((v, i) => (
                  <ul className="list-group">
                    <li className="list-group-item">
                      <b>Producto: </b>
                      {v.products.name_product}
                      <br />
                      <b>Precio: </b>{v.price}
                    </li>
                  </ul>
                ))}
              </Tooltip>}>
              <Badge variant="danger" className="font-badge">{original.details.length}</Badge>
            </OverlayTrigger>
          )
        }
      },
      {
        Header: "Acciones",
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <DropdownButton size="sm" id={'drop' + original.id} title="Seleccione" drop="left" block="true">
              <Dropdown.Item onClick={() => { updateListHandler(original) }}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => { addDetailHandler(original) }}>Agregar Detalles</Dropdown.Item>
              <Dropdown.Item onClick={() => { destroyListHandler(original) }}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  }, [])

  let productColumns = useMemo(() => {
    return [
      {
        Header: "Producto",
        accessor: "name_product"
      },
      {
        Header: "Precio",
        accessor: props1 => [props1.price],
        Cell: props1 => {
          const original = props1.cell.row.original;
          let price1 = original.price
          return (
            <input
              className="form-control text-center"
              type="text"
              value={price1}
              onChange={(e) => onChangePriceTableHandler(props1.row.id, e, original.id)} />
          )
        }
      },
      {
        Header: "Precio con iva",
        accessor: props1 => [((parseFloat(props1.price) * parseFloat(configStore.tax)) / 100) + parseFloat(props1.price)],
        Cell: props1 => {
          const { original } = props1.cell.row
          return (<Badge variant="danger" className="font-badge">{showPriceWithDecimals(props.configGeneral, ((parseFloat(original.price) * parseFloat(configStore.tax)) / 100) + parseFloat(original.price), 2, ",", ".")} {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}</Badge>)
        }
      },
      {
        Header: "Seleccionar",
        Cell: props1 => {
          const { original } = props1.cell.row
          return (
            <div>
              <label className="form-check">
                <input onChange={onChangeProductDetailHadler} className="form-check-input" type="checkbox" value={original.id} checked={productsDetail.find(v => v.id_product === original.id)} />
              </label>
            </div>
          )
        }

      }
    ];
  }, [productsDetail])


  const fetchData = (type = false) => {
    let promises = [
      axios.get(API_URL + "listProduct"),
    ]
    if (type) {
      promises.push(
        axios.get(API_URL + "product"),
        axios.get(API_URL + "config_store"),
      )
    }
    Promise.all(promises).then(result => {
      setListData(result[0].data);
      if (type) {
        setProducts(result[1].data);
        productArrayCopy = result[1].data;
        productArrayCopy2 = result[1].data;
        setConfigStore(result[2].data)
      }
      setDisplayLoading(false);
    }).catch(err => {
      setDisplayLoading(false);
      props.tokenExpired(err);
    })
  }

  const updateListHandler = (data) => {
    setDataForm({ ...dataForm, name: data.name, status: data.status, id: data.id })
    inputRef.current.focus()
  }

  const addDetailHandler = (data) => {
    props.history.replace("/product/listProduct/" + data.id)
  }

  const destroyListHandler = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDestroyHandler(data.id);
                onClose();
              }}
            >
              Si, Aceptar
            </button>
            <button className="button-alert" onClick={onClose}>No</button>
          </div>
        );
      }
    });
  }

  const confirmDestroyHandler = (id) => {
    setDisplayLoading(true)
    axios.delete(API_URL + "listProduct/" + id).then(result => {
      toast.success(`Lista eliminada con éxito`);
      setListData(currentData => currentData.filter(v => v.id != id));
      setDisplayLoading(false)
    }).catch(err => {
      props.tokenExpired(err)
      setDisplayLoading(false)
    })
  }

  const onChangeHandler = e => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.name === "status" ? e.target.checked : e.target.value })
  }

  const onSubmitHanldle = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    if (dataForm.id) {
      confirmSubmitHandler();
    } else {
      onHideModalHandler();
    }
  }

  const confirmSubmitHandler = () => {

    let objectPost = Object.assign({}, dataForm, {
      productsList: productsDetail.map(v => {
        v.price = products[v.index].price;
        return v;
      })
    })

    let route = objectPost.id ? API_URL + "listProduct/" + objectPost.id : API_URL + "listProduct";
    let promise = objectPost.id ? axios.put(route, objectPost) : axios.post(route, objectPost);
    promise.then(result => {
      toast.success(`Lista ${objectPost.id ? "modificada" : "creada"} con éxito`);
      if (objectPost.id) {
        cancelEdition();
      } else {
        clearData();
      }
      fetchData();
      setDisplayLoading(false)
    }).catch(err => {
      props.tokenExpired(err)
      setDisplayLoading(false)
    })
  }

  const clearData = () => {
    setDataForm({
      name: "",
      status: true,
      id: ""
    })
    setProductsDetail([])
    setProducts(productArrayCopy)
    onHideModalHandler()
    inputRef.current.focus();
  }

  const cancelEdition = () => {
    setDataForm({
      name: "",
      status: true,
      id: ""
    })
    inputRef.current.focus();
  }

  const selectAllProductsHandler = type => {
    if (type) {
      let arrayId = [];
      products.forEach((v, i) => arrayId.push({ id_product: parseInt(v.id), price: v.price, index: i }));
      setProductsDetail(arrayId)
    } else {
      setProductsDetail([])
    }
  }

  const onChangePriceTableHandler = (index, e, id) => {
    let val = e.target.value.replace(/[^0-9 .]/g, "");
    setProducts(currentData => {
      let currentArray = [...currentData]
      currentArray[index].price = val
      return currentArray
    })
  }

  const onChangeProductDetailHadler = e => {
    e.persist()
    if (e.target.checked) {
      let product;
      productArrayCopy.forEach((v, i) => {
        if (v.id == e.target.value) {
          product = { id_product: parseInt(e.target.value), price: v.price, index: i }
        }
      });
      setProductsDetail(currentData => [...currentData, product]);
    } else {
      setProductsDetail(currentData => currentData.filter(v => v.id_product !== parseInt(e.target.value)));
    }
  }

  const onHideModalHandler = () => {
    setIsShowModal(!isShowModal);
  }

  return (
    <Container fluid>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <Row>
          <Col>
            <Row>
              <Col className="text-center">
                <h4 className="title_principal">Lista de Productos</h4>
              </Col>
              <Col className="text-center">
                <h4 className="title_principal">Total Listas <Badge variant="danger" className="font-badge">{listData.length}</Badge></h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={onSubmitHanldle} noValidate validated={validate}>
                  <Row className="justify-content-center">
                    <InputFieldRef
                      type="text"
                      name="name"
                      ref={inputRef}
                      label="Nombre de la lista"
                      required={true}
                      value={dataForm.name}
                      handleChange={onChangeHandler}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols="col-md-4 col-sm-4 col-lg-4"
                    />
                    <Col sm={4} md={4} lg={4}>
                      <Row>
                        <Col className="text-center">
                          <Form.Label>Status</Form.Label>
                        </Col>
                      </Row>
                      <Form.Group className="text-center">
                        <Form.Check
                          name="status"
                          type={'checkbox'}
                          id={`radio-5`}
                          label={"Activo"}
                          required={false}
                          checked={dataForm.status}
                          onChange={onChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={4} md={4} lg={4}>
                      <Button variant="danger" block={true} size="sm" type="submit">{dataForm.id ? "Modificar Lista" : "Crear Lista"} <FaSave /></Button>
                    </Col>
                    {dataForm.id ? (
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="secondary" block={true} size="sm" type="button" onClick={cancelEdition}>Cancelar Edición</Button>
                      </Col>
                    ) : ""}
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table columns={listColumns} data={listData} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Modal
        show={isShowModal}
        onHide={onHideModalHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Productos disponibles para la lista
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <Col sm={4} md={4} lg={4} xl={4}>
              <Button block={true} variant="primary" size="sm" onClick={() => selectAllProductsHandler(true)}>Seleccionar todos</Button>
            </Col>
            <Col sm={4} md={4} lg={4} xl={4}>
              <Button block={true} variant="secondary" size="sm" onClick={() => selectAllProductsHandler(false)}>Deseleccionar todos</Button>
            </Col>
            <Col sm={4} md={4} lg={4} xl={4}>
              <Button variant="danger" size="sm" block={true} type="button" onClick={confirmSubmitHandler}>Guardar</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table columns={productColumns} data={products} pageSizeHandler={[500, 1000]} />
            </Col>
          </Row>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="md" onClick={onHideModalHandler}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  id_branch_office: state.enterpriseSucursal.id_branch_office,
  id_enterprise: state.enterpriseSucursal.id_enterprise,
  configGeneral: state.configs.config
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListProductPage)