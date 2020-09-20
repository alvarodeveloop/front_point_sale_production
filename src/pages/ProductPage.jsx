import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Image,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import { productColumns } from 'utils/columns/inventario'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'styles/components/modalComponents.css'
import 'styles/pages/productStyle.css'
import CategoyPage from 'pages/CategoryPage'


const ProductPage = (props) => {

  const [product,setProduct] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [productDetail, setProductDetail] = useState({})

  useEffect(() => {
    fetchData()
  },[])

  useMemo(() => {

    if(productColumns.length > 5){
      productColumns.pop()
    }

    productColumns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
            <Dropdown.Item onClick={() => seeAllInformation(props.cell.row.original)}>Ver Detalle</Dropdown.Item>
            <Dropdown.Item onClick={() => modifyRegister(id)}>Modificar</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
          </DropdownButton>
        )
      }
    })

  },[])

  const deleteRegister = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(id);
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

  const seeAllInformation = data => {
    setProductDetail({
      code_ean: data.code_ean,
      description: data.description,
      is_neto: data.is_neto_format,
      is_auto_sale: data.is_auto_sale_format,
      sticker_color: data.sticker_color,
      qr_image: data.qr_image,
      img_product: data.img_product,
      gallery: data.gallery,
      detailCost: data.cost_details,
      pack: data.pack
    })

    setIsOpen(true)
  }

  const confirmDeleteRegister = id => {
    axios.delete(API_URL+'product/'+id).then(result => {
      toast.success('Registro eliminado con éxito')
      fetchData()
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const modifyRegister = id => {
    props.history.replace('/product/form/'+btoa(id))
  }

  const fetchData = () => {

    const promises = [
      axios.get(API_URL+'product'),
    ]

    Promise.all(promises).then(result => {
      setProduct(result[0].data)
    }).catch(err => {
      const { response } = err
      console.log(err,response)
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToForm = () => {
    props.history.replace('/product/form')
  }

  const createRepresent = data => {
    props.history.replace('/product/represent/'+data.id)
  }

  const onHide = () => {
    setIsOpen(false)
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <br/>
          <h4 className="title_principal">Tabla Productos</h4>
          <hr/>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Row>
            <Col sm={6} md={6} lg={6} xs={12}>
              <Button variant="success" block={true} size="sm" onClick={goToForm}>Crear Producto <FaPlusCircle /></Button>
            </Col>
            <Col sm={6} md={6} lg={6} xs={12} className="text-right">
              <h5>Total Productos: <Badge variant="danger" className="title_badge">{product.length}</Badge></h5>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Table columns={productColumns} data={product} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        show={isOpen}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="font-title">Detalles del Producto</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {Object.keys(productDetail).length > 0 ? (
            <ul className="list-group text-center">
              <li className="list-group-item"><b>Codigo EAN:&nbsp;&nbsp;</b> {productDetail.code_ean}</li>
              <li className="list-group-item"><b>Descripción:&nbsp;&nbsp;</b> {productDetail.description}</li>
              <li className="list-group-item"><b>¿Es Neto?:&nbsp;&nbsp;</b> {productDetail.is_neto}</li>
              <li className="list-group-item"><b>¿Es auto venta?:&nbsp;&nbsp;</b> {productDetail.is_auto_sale}</li>
              {productDetail.pack ? (
                <li className="list-group-item"><b>Pack de Venta:&nbsp;&nbsp;</b> {productDetail.pack}</li>
              ) : ''}
              {productDetail.img_product ? (
                <li className="list-group-item"><b>Imagen del Producto:</b><br/> <Image src={API_URL+'images/product/principal/'+productDetail.img_product} thumbnail style={{width: '30%'}} /></li>
              ) : (
                <li className="list-group-item"><b>Sin imagen de Presentación</b></li>
              )}
              <li className="list-group-item"><b>Qr Imagen:</b>
                <br/>
                <Row className="justify-content-center">
                  <Col sm={6} md={6} lg={6} className="text-center">
                    <Image src={API_URL+'images/product/qr/'+productDetail.qr_image} thumbnail style={{width: '80%'}}/>
                  </Col>
                </Row>
              </li>
            </ul>
          ) : ''}
          <br/>
            {Object.keys(productDetail).length > 0 && productDetail.detailCost.length > 0 ? (
              <React.Fragment>
                <h4 className="text-center">Detalle de Costos</h4>
                <ul className="list-group text-center">
                  {productDetail.detailCost.map((v,i) => (
                    <li className="list-group-item" key={i}><b>Detalle:</b>&nbsp;&nbsp;{v.detail},&nbsp;&nbsp;<b>Costo:</b>&nbsp;&nbsp;{v.cost} </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : ''}
          <br/>
          {productDetail.gallery && productDetail.gallery.length > 0 ? (
            <Row>
              <Col sm={12} md={12} lg={12} xs={12}>
                <h1 className="text-center font-title">Galería de Imagénes</h1>
              </Col>
              <div className="clearfix"></div>
              <br/><br/>
              {
                productDetail.gallery.map((v,i) => (
                  <Col sm={4} md={4} lg={4} xs={4} key={i} className="paddingColGallery">
                    <a href={API_URL+'images/product/gallery/'+v.filename} target="_blank">
                      <Image src={API_URL+'images/product/gallery/'+v.filename}
                        id={'imagen_logo'+v.filename} style={{ width: '85%', height: '230px' }} rounded  />
                    </a>
                  </Col>
                ))
              }
            </Row>
          ): ''}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  )
}

ProductPage.propTypes = {

}

export default ProductPage
