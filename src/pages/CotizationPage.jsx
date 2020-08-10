import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'
import { API_URL, FRONT_URL } from 'utils/constants'
import { FaShareAltSquare,FaLocationArrow, FaPlusCircle, FaMailBulk, FaTrashAlt } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
import Table from 'components/Table'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import FormClientModal from 'components/modals/FormClientModal'
import ModalCotizacionProduct from 'components/modals/ModalCotizacionProduct'
import ModalGastosCotizacion from 'components/modals/ModalGastosCotizacion'
import { showPriceWithDecimals } from 'utils/functions'

import { ColumnsCotization, GastosCotizacion } from 'utils/columns/cotization'
import ModalClientCotizacion from 'components/modals/ModalClientCotizacion'

let DetailCotizacion = null

const CotizationPage = (props) => {

  const [clients,setClients] = useState([])
  const [clientDetail,setClientDetail] = useState({})
  const [detailProducts, setDetailProducts] = useState([])
  const [isShowModalClient, setIsShowModalClient] = useState(false)
  const [isShowModalGastos, setIsShowModalGastos] = useState(false)
  const [isShowModalProduct, setIsShowModalProduct] = useState(false)
  const [products,setProducts] = useState([])
  const [resetValueClient,setResetValueClient] = useState(false)
  const [gastosDetail,setGastosDetail] = useState([])
  const [openModalClientMail,setOpenModalClientMail] = useState(false)
  const [disableButtons,setDisableButton] = useState(false)
  const [commentCotizacion, setCommentCotizacion] = useState('')

  useEffect(() => {
    fetchClients()
    fetchProducts()
    if(props.match.params.id){
      fetchDataUpdate()
    }
    return () => {
      DetailCotizacion = null
    }
  },[])

  useMemo(() => {

    DetailCotizacion = [
      {
        Header: 'Producto',
        accessor: 'name_product'
      },
      {
        Header: 'Precio',
        accessor: v => {

          if(v.is_neto){
            return [showPriceWithDecimals(props.configGeneral,v.price)]
          }else{
            let tax =  (v.price * props.configStore.tax) / 100
            let new_price = v.price + tax
            return [showPriceWithDecimals(props.configGeneral,new_price)]
          }

        }
      },
      {
        Header: 'Cantidad',
        accessor: 'quantity'
      },
      {
        Header: 'Total',
        accessor: v =>{
          if(v.is_neto){
            return [showPriceWithDecimals(props.configGeneral,v.price * v.quantity)]
          }else{
            let tax =  (v.price * props.configStore.tax) / 100
            let new_price = v.price + tax
            return [showPriceWithDecimals(props.configGeneral,new_price * v.quantity)]
          }
        }
      },
      {
        Header: 'Acciones',
        Cell: props => {
          const id = props.cell.row.original
          return(
            <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeItemDetail(props.cell.row.original) }>Remover</Button>
          )
        }
      }
    ]

    if(GastosCotizacion.length > 2){
      GastosCotizacion.pop()
    }

    GastosCotizacion.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <Button size="sm" size="sm" variant="primary" block={true} onClick={() => removeGastoDetail(props.cell.row.original) }>Remover</Button>
        )
      }
    })

  },[])

  const clearData = () => {
    setDetailProducts([])
    setGastosDetail([])
    setClientDetail({})
    setResetValueClient(true)
    setTimeout(() => {
      setResetValueClient(false)
    },300)
  }

  const fetchDataUpdate = () => {
    axios.get(API_URL+'cotizacion/'+props.match.params.id).then(result => {
      setGastosDetail(result.data.gastos)
      let productsArray = []
      result.data.products_not_registered.forEach((item, i) => {
        productsArray.push(item)
      });

      result.data.products.forEach((item, i) => {
        item.products.quantity = item.quantity
        productsArray.push(item.products)
      });

      setDetailProducts(productsArray)
      setClientDetail(client => {
        return result.data.client ? result.data.client : {}
      })

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToDashboard = () => {
      props.history.replace('/quotitation/search_quotitation')
  }

  const goToFacturation = () => {
      props.history.replace('/facturation/dashboard')
  }

  const submitData = type => {

    let object_post = {
      comment: commentCotizacion,
      products: Object.assign({},detailProducts),
      gastos: Object.assign({},gastosDetail),
      client: Object.assign({},clientDetail),
      status: type,
    }
    setDisableButton(true)
    if(props.match.params.id){
      axios.put(API_URL+'cotizacion/'+props.match.params.id,object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setDisableButton(false)
        clearData()
        if(type === 4){
          goToFacturation()
        }else{
          goToDashboard()
        }
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'cotizacion',object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setDisableButton(false)
        clearData()
        if(type === 4){
          goToFacturation()
        }
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }

  }

  const copyLinkOfCotizacion = () => {

    navigator.clipboard.writeText("http://localhost:3000/quotitation/create_quotitation").then(function() {
      toast.success('Url Copiada y Guardando...')
      submitData(2)
    }, function() {
      console.log('error')
    });

  }

  const displayTotalProduct = () => {
    let total = 0

    detailProducts.forEach((item, i) => {
      if(item.not_registered){
        if(item.tax_additional){
          if(!item.is_neto){
            let tax = (item.price * props.configStore.tax ) /100
            total+= (item.unit_price_with_tax + tax) * item.quantity
          }else{
            total+= item.unit_price_with_tax * item.quantity
          }
        }else{
          total+= item.price * item.quantity
        }
      }else{
        if(!item.is_neto){
          let tax = (item.price * props.configStore.tax ) /100
          total+= (item.price + tax) * item.quantity
        }else{
          total+= item.price * item.quantity
        }
      }
    });

    return total
  }

  const displayTotalGastos = () => {
    let total = 0
    gastosDetail.forEach((item, i) => {
      total += parseFloat(item.amount)
    });

    return total
  }

  const displayTotalTotal = () => {
    let total_product = displayTotalProduct()
    let total_gastos  = displayTotalGastos()
    return total_product - total_gastos
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

  const fetchProducts = () => {
    axios.get(API_URL+'product').then(result => {
      setProducts(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleClientSubmit = data => {
    // funcion para manejar el envio de correos a los clientes con la cotización
    let object_post = {
      comment: commentCotizacion,
      products: Object.assign({},detailProducts),
      gastos: Object.assign({},gastosDetail),
      client: Object.assign({},clientDetail),
      client_mail: data,
      status: 3,
    }

    setDisableButton(true)
    if(props.match.params.id){
      axios.put(API_URL+'cotizacion/'+props.match.params.id,object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setOpenModalClientMail(false)
        setDisableButton(false)
        clearData()
        goToDashboard()
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'cotizacion',object_post).then(result => {
        toast.success('Operación realizada con éxito')
        setOpenModalClientMail(false)
        setDisableButton(false)
        clearData()
      }).catch(err => {
        clearData()
        setDisableButton(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const handleCommentCotizacion = e => {
      setCommentCotizacion(e.target.value)
  }

  const handleGastoSubmit = data => {
    // funcion para manejar el submit de los gastos y agglos a la tabla de gastos
    setGastosDetail([...gastosDetail,data])
  }
  const handleHideModalClient = () => {
    setIsShowModalClient(false)
    fetchClients()
  }

  const handleHideModalProduct = () => {
    setIsShowModalProduct(false)
  }

  const handleResetValueClient = () => {
    setResetValueClient(!resetValueClient)
  }

  const handleSelectClient = data => {
    let data_document = data.split('-')[1]
    let client = clients.find(v => v.data_document === data_document)
    setClientDetail(client)
  }

  const handleSelectProduct = product => {
    // metodo para manejar la escogencia del producto en la modal de productos para el detalle de la cotizacion
    setDetailProducts([...detailProducts, product])
    setIsShowModalProduct(false)
  }

  const removeCLient = () => {
    setClientDetail({})
    handleResetValueClient()
  }

  const removeItemDetail = data => {
    setDetailProducts(detail => {
      return detail.filter(v => v.name_product !== data.name_product)
    })
  }

  const removeGastoDetail = data => {
    setGastosDetail(gastos =>{
     return gastos.filter(v => v.description !== data.description)
    })
  }

  const saveCotizacion = type => {
    //
    if(type === 1 && !!clientDetail){
      toast.error('Debe seleccionar al menos 1 cliente')
      return false
    }
    submitData(type)
  }



  return (
    <Container className="containerDiv">
      <Row>
        <Col sm={4} md={4} lg={4}>
          <h4 className="text-center">Cliente</h4>
          {Object.keys(clientDetail).length > 0 ? (
            <React.Fragment>
              <ul className="list-group">
                <li className="list-group-item"><b>Nombre:</b> {clientDetail.name_client} <br/><b>Tipo de Documento:</b> {clientDetail.type_document}</li>
                <li className="list-group-item"><b>Documento:</b> {clientDetail.data_document} <br/> <b>Teléfono:</b> {clientDetail.phone}</li>
              </ul>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <br/>
              <h5 className="text-center">No hay cliente seleccionado</h5>
            </React.Fragment>
          )}
        </Col>
        <Col sm={4} md={4} lg={4}>
          <AutoCompleteClientComponent
            items={clients}
            returnValue={handleSelectClient}
            handleResetValueClient={handleResetValueClient}
            resetValue={resetValueClient}
          />
          <br/>
          {Object.keys(clientDetail).length > 0 ? (
            <Row>
              <Col sm={12} md={12} lg={12} className="text-center">
                <Button size="sm" size="sm" variant="danger text-center" onClick={removeCLient}><FaTrashAlt /></Button>
              </Col>
            </Row>
          ) : ''}
        </Col>
        <Col sm={4} md={4} lg={4}>
          <Button size="sm" size="sm" variant="secondary" block={true} onClick={() => setIsShowModalClient(true)}>Crear Cliente</Button>
        </Col>
      </Row>
      <br/><br/>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={6} xs={12}>
          <Button size="sm" size="sm" variant="info" block={true} onClick={() => setIsShowModalProduct(true)}>Agregar Producto a la Cotización</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Table data={detailProducts} columns={DetailCotizacion} />
        </Col>
      </Row>
      <hr/>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={6} xs={12}>
          <Button size="sm" size="sm" variant="info" block={true} onClick={() => setIsShowModalGastos(true)}>Agregar Gastos a la Cotización</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Table data={gastosDetail} columns={GastosCotizacion} />
        </Col>
      </Row>
      <br/><br/>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h3 className="text-center">Resumen y Totales</h3>
          <br/>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">Productos</th>
                <th className="text-center">Gastos</th>
                <th className="text-center">Balance Total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{showPriceWithDecimals(props.configGeneral,displayTotalProduct())}</td>
                <td>{showPriceWithDecimals(props.configGeneral,displayTotalGastos())}</td>
                <td>{showPriceWithDecimals(props.configGeneral,displayTotalTotal())}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <label for="">Comentario de la cotización (Opcional)</label>
          <textarea rows={3} className="form-control" onChange={handleCommentCotizacion} value={commentCotizacion} />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(1)}>{disableButtons ? 'Guardando...' : 'Guardar y Enviar por Mail'} <FaMailBulk /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(4)}>{disableButtons ? 'Guardando...' : 'Guardar y Facturar'} <MdPrint /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button size="sm" size="sm" variant="primary" disabled={disableButtons} block={true} onClick={() => saveCotizacion(2)}>{disableButtons ? 'Guardando...' : 'Guardar'} <FaLocationArrow /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <DropdownButton size="sm" id={'drop'} title={disableButtons ? 'Guardando' : "Compartir"}  className="dropdown_block" disabled={disableButtons}>
            <Dropdown.Item onClick={() => setOpenModalClientMail(true) }>Enviar por Mail</Dropdown.Item>
            <Dropdown.Item onClick={ copyLinkOfCotizacion } >Copiar Link</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    <FormClientModal
      isShow={isShowModalClient}
      onHide={handleHideModalClient}
    />
    <ModalCotizacionProduct
      isShow={isShowModalProduct}
      onHide={handleHideModalProduct}
      products={products}
      handleSelectProduct={handleSelectProduct}
    />
    <ModalGastosCotizacion
      isShow={isShowModalGastos}
      onHide={() => setIsShowModalGastos(false)}
      handleGastoSubmit={handleGastoSubmit}
    />
    <ModalClientCotizacion
        clients={clients}
        isShow={openModalClientMail}
        onHide={() => setOpenModalClientMail(false)}
        handleClientSubmit={handleClientSubmit}
    />
    </Container>
  )
}
CotizationPage.defaultProps = {
  configStore : JSON.parse(localStorage.getItem('configStore')),
  configGeneral: JSON.parse(localStorage.getItem('configGeneral'))
}

export default CotizationPage
