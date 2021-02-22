import React, {useState, useEffect, useRef, useMemo} from 'react'
import { connect } from 'react-redux'
import { Form, Container, Row, Col, Button, Badge } from 'react-bootstrap'
import axios from 'axios';
import { API_URL } from 'utils/constants'
import InputFieldRef from 'components/input/InputComponentRef'
import { toast } from 'react-toastify';
import LoadingComponent from 'components/LoadingComponent'
import Table from 'components/Table'
import { FaTrash } from 'react-icons/fa'
import { showPriceWithDecimals } from 'utils/functions';

let id_branch = localStorage.getItem("id_branch_office");
let listColumns = []

export const ProductListDetailPage = (props) => {

  const [objectList, setObjectList] = useState(null);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [listDetails, setListDetails] = useState([]);
  const [newDetailList, setNewDetailList] = useState([])
  const [products, setProducts] = useState([]);
  const [configStore, setConfigStore] = useState({tax: 19})
  const [dataForm, setDataForm] = useState({
    id_product : "",
    price : ""
  })
  const [validated, setValidated] = useState(false)
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  useEffect(() => {
    if(id_branch != props.id_branch_office){
      toast.error("Esta lista no pertenece a esta sucursal");
      setTimeout(() => {
        props.history.replace("/product/listProduct");
      },1500)
    }else{
      fetchData(true);
    }
  },[props.id_branch_office])

  listColumns = useMemo(() => {
    return [
      {
        Header : "Producto",
        accessor : props1 => [props1.products.name_product]
      },
      {
        Header : "Precio",
        accessor : props1 => [props1.price],
        Cell : props1 => {
          return <span>{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.price)}{props.configGeneral ? props.configGeneral.simbolo_moneda : "" }</span>
        }
      },
      {
        Header : "Precio con iva",
        accessor : props1 => [ (( parseFloat(props1.price) * parseFloat(configStore.tax)) / 100) + parseFloat(props1.price)],
        Cell : props1 => {
          const { original } = props1.cell.row
          return (<Badge variant="danger" className="font-badge">{showPriceWithDecimals(props.configGeneral,(( parseFloat(original.price) * parseFloat(configStore.tax)) / 100) + parseFloat(original.price),2,",",".")} {props.configGeneral ? props.configGeneral.simbolo_moneda : "" }</Badge>)
        }
      },
      {
        Header : "Acciones",
        Cell : props1 => {
          const { original } = props1.cell.row
          return <Button variant="danger" size="sm" onClick={() => removeProductDetailHandler(original)}><FaTrash /></Button>
        }
      }
    ]
  },[])

  const fetchData = (type = false) => {
    
    let promises = [
      axios.get(API_URL+"listProduct/"+props.match.params.id),
    ]

    if(type){
      promises.push(
        axios.get(API_URL+"product"),
      )
      promises.push(
        axios.get(API_URL+"config_store"),
      )
    }

    Promise.all(promises).then(result => {
      setObjectList(result[0].data)
      setListDetails(result[0].data.details)
      if(type){
        setProducts(result[1].data)
        setConfigStore(result[2].data)
      }
      setDisplayLoading(false)    
    }).catch(err =>{
      props.tokenExpired(err)
      setDisplayLoading(false)    
    })
  }

  const onChangeHandler = e => {
    e.persist();
    setDataForm({...dataForm, [e.target.name] : e.target.value});
    if(e.target.name === "id_product"){
      let prod = products.find(v => v.id == e.target.value)
      setDataForm({...dataForm, [e.target.name] : e.target.value, price: prod.price})
      inputRef1.current.focus()
    }else{
      setDataForm({...dataForm, [e.target.name] : e.target.value})
    }
  }

  const onSubmitHandler = e => {
    
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let selectOption = document.getElementById("id_product")
    let element;
    for(let i = 0; i < selectOption.options.length; i++) {
      if(selectOption.options[i].value === selectOption.value){
        element  = selectOption.options[i]
      }
    }
    
    let objectDetailNew = {
      id_product_list : objectList.id,
      id_product : dataForm.id_product,
      price : dataForm.price,
      products : products[element.attributes.dataindex.value]
    }
    setListDetails(currentData => [...currentData,objectDetailNew])
    clearData()
  }
  
  const removeProductDetailHandler = dataRemove => {
    setListDetails(currentData => currentData.filter(v => parseInt(v.id_product) !== parseInt(dataRemove.id_product) ))
  }
  
  const confirmSubmitHandler = () => {
    setDisplayLoading(true)
    let arrayPut = [...listDetails];
    let objectPut = {
      detailProducts : arrayPut
    }
    axios.put(API_URL+"listProductDetail/"+props.match.params.id,objectPut).then(result => {
      toast.success("Lista modificada con éxito");
      setTimeout(() => {
        goBack();
      },1500)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const goBack = () => {
    props.history.replace("/product/listProduct");
  }
  const clearData = () => {
    setDataForm({
      id_product: "",
      price : ""
    });
    setValidated(false);
    inputRef.current.focus()
  }

  return (
    <Container fluid>
      {
        displayLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Row>
              <Col>
                <h4 className="title_principal">Detalle de la lista <span style={{textDecoration:"underline",textTransform: "uppercase"}}>{objectList ? objectList.name : ""}</span></h4>
              </Col>
              <Col>
                <h4 className="title_principal text-right">Total de productos <Badge variant="danger" className="font-badge">{listDetails.length}</Badge></h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <Form onSubmit={onSubmitHandler} noValidate validated={validated}>
                  <Row className="justify-content-center">
                    <InputFieldRef
                      ref={inputRef}
                      type="select"
                      name="id_product"
                      label="Producto"
                      value={dataForm.id_product}
                      handleChange={onChangeHandler}
                      required={true}
                      cols="col-md-4 col-sm-4 col-lg-4 col-xl-4"
                      messageErrors={[
                        "Requerido"
                      ]}
                    >
                      <option value="">--Seleccione--</option>
                      {products.map((v,i) => <option key={i} value={v.id} dataindex={i}>{v.name_product}</option>)}
                    </InputFieldRef>
                    <InputFieldRef
                      ref={inputRef1}
                      type="number"
                      name="price"
                      label="Precio"
                      value={dataForm.price}
                      required={true}
                      handleChange={onChangeHandler}
                      cols="col-md-4 col-sm-4 col-lg-4 col-xl-4"
                      messageErrors={[
                        "Requerido"
                      ]}
                    />
                  </Row>
                  <Row>
                    <Col className="text-center text-danger">
                      *El botón de agregar es para agregar el item a la tabla y el confirmar para almacenar en la base de datos.
                    </Col>
                  </Row>
                  <br/>
                  <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                      <Button variant="secondary" type="button" block={true} size="sm" onClick={goBack}>Volver</Button>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                      <Button variant="danger" type="submit" block={true} size="sm">Agregar</Button>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                      <Button variant="secondary" type="button" block={true} size="sm" onClick={confirmSubmitHandler}>Confirmar</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Table data={listDetails} columns={listColumns} />
              </Col>
            </Row>
          </>
        )
      }
    </Container>
  )
}

ProductListDetailPage.propTypes = {
  
}

const mapStateToProps = (state) => ({
  id_branch_office : state.enterpriseSucursal.id_branch_office,
  id_enterprise : state.enterpriseSucursal.id_enterprise,
  configGeneral : state.configs.config,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListDetailPage)
