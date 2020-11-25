import React, { useMemo, useState,useEffect,useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import 'styles/pages/productStyle.css'
import { FaImage,FaPlusCircle, FaTrash } from "react-icons/fa";
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { readerImg } from 'utils/functions'
import { API_URL } from 'utils/constants'
import ScanEanModal from 'components/modals/ScanEanModal'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ModalCostDetailProduct from 'components/modals/ModalCostDetailProduct'
import Select from 'react-select';
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image,
  Card,
  Modal
} from 'react-bootstrap'

const FormProductSale = (props) => {

  const [dataProduct,setDataStore] = useState({
    name_product: '',
    cost: '',
    code_ean: '',
    description: '',
    is_neto: true,
    id_category: [],
    is_auto_sale: false,
    img_product: '',
    method_sale: 1,
    price:'',
    qr_image:'',
    sticker_color: '#9c7901',
    detailCost: [],
    pack: '',
    categoryNames: ''
  })


  const [dataDetailHandle, setDataDetailHandle] = useState(false) //  variable para guardar temporalmente la data del detalle de los costos
  const [isShowModalCost, setIsShowModalCost] = useState(false)
  const [isOpenScan, setIsOpenScan] = useState(false)
  const [config, setConfig] = useState([])
  const [category, setCategory] = useState([])
  const [validate, setValidate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [imgProduct, setImgProduct] = useState('')
  const [galleryImg, setGalleryImg] = useState([])
  const [htmlImgGallery, setHtmlImgGallery] = useState('')
  const [htmlImgGalleryUpdate, setHtmlImgGalleryUpdate] = useState('')
  const [textButton, setTextButton] = useState('Guardar')
  const [isSubmit, setIsSubmit] = useState(false)
  const [galleryFromUpdate, setGalleryFromUpdate] = useState([])
  const [isShowPackField, setIsShowPackField] = useState(false)
  const [ imgComponent, setImgComponent ] = useState(
    <Image src={  require('../assets/img/utils/empty_logo.jpg') }
      id="imagen_logo" style={{ width: '80px' }} roundedCircle />
  )
  const [imgShow,setImgShow] = useState(
    <Image src={  require('../assets/img/utils/empty_logo.jpg') }
      id="img_show" style={{ width: '80px' }} roundedCircle />
  )

  const inputRef = useRef(null)

  useEffect(() => {
    fetchData()
    return () => {
      cleanForm()
    }
  },[])

  useEffect(() => {

    displayGalleryImg()

  },[galleryImg])

  const onChange = async e => {

    if(e.target.name === "method_sale"){
      if(e.target.value == 2){
        setIsShowPackField(true)
      }else{
        setIsShowPackField(false)
      }
      await setDataStore({...dataProduct, [e.target.name] : e.target.value})
    }else if(e.target.name === "is_neto" || e.target.name === "is_auto_sale"){
      let val = e.target.value === "true" ? true : false
      await setDataStore({...dataProduct, [e.target.name] : val})
    }else{
      await setDataStore({...dataProduct, [e.target.name] : e.target.value})
    }
  }

  const onChangeSelect = val => {
    setDataStore({...dataProduct, id_category : val})
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL+'category'),
      axios.get(API_URL+'config_general')
    ]


    Promise.all(promise).then(result => {

      if(result[0].data){
        setCategory(result[0].data)
      }else{
        toast.warning('Debe realizar su configuración general')
      }

      setConfig(result[1].data)

    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error,contacte con soporte')
      }
    })
  }

  const onSubmit = async () => {

    const form = inputRef.current;
    if (form.checkValidity() === false) {
      setValidate(true);
      return
    }

    let formData = new FormData()

    let objectNew = Object.assign({},dataProduct,{
      detailCost: dataProduct.detailCost.concat(dataDetailHandle)
    })

    Object.keys(objectNew).forEach((v,i) => {
      if(v === 'img_product'){
        if(imgProduct){
          formData.append(v,imgProduct)
        }
      }else if( v === 'id_category'){
        let name_categories = ""
        dataProduct[v].forEach((item, i) => {
          formData.append('id_category',item.value)
          name_categories+= item.label+","
        });
        name_categories = name_categories.substring(0,name_categories.length - 1)
        formData.append('name_categories',name_categories)
      }else{
        formData.append(v,dataProduct[v])

      }
    })

    setTextButton('Guardando Datos, Espere por favor...')
    setIsSubmit(true)

    axios.post(API_URL+'product',formData).then(result => {

      if(objectNew.detailCost.length > 0){
        axios.put(API_URL+'product_detail_cost/'+result.data.id,objectNew).then(resultDetail => {

        }).catch(err => {
          console.log(err)
          if(err.response){
            toast.error(err.response.data.message)
          }else{
            toast.error('Error guardando el detalle de costos, contacte con soporte')
          }
        })
      }

      if(galleryImg.length > 0){

        setTextButton('Guardando Galeria de Imagenes...')

        let formDataGallery = new FormData()
        Object.keys(galleryImg).forEach((v,i) => {
          formDataGallery.append('gallery',galleryImg[v])
        })
        formDataGallery.append('id_product',result.data.id)

        axios.post(API_URL+'product_gallery',formDataGallery).then(result => {

          toast.success('Producto Creado')
          setTextButton('Guardar')
          setIsSubmit(false)
          props.handleSubmitProduct(Object.assign({},result.data))
          cleanForm()
        }).catch(err => {
          console.log(err);
          setTextButton('Guardar')
          setIsSubmit(false)
          const { response } = err
          if(response){
            toast.error(response.data.message)
          }else{
            toast.error('Error, contacte con soporte')
          }

        })

      }else{
        toast.success('Producto Creado')
        setTextButton('Guardar')
        setIsSubmit(false)
        props.handleSubmitProduct(Object.assign({},result.data))
        cleanForm()
      }

    }).catch(err => {
      console.log(err);
      setTextButton('Guardar')
      setIsSubmit(false)
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })


  }

  const cleanForm = () => {

    setDataStore({
      name_product: '',
      cost: '',
      code_ean: '',
      description: '',
      is_neto: '',
      id_category: '',
      is_auto_sale: '',
      img_product: '',
      method_sale: '',
      price:'',
      qr_image:'',
      sticker_color: '#9c7901',
      detailCost: [],
      pack : ''
    })

    setImgProduct(null)
    setImgShow(null)
    setGalleryImg([])
    setHtmlImgGallery('')
    setHtmlImgGalleryUpdate('')

    document.getElementById('imagen_logo').src = require('../assets/img/utils/empty_logo.jpg')

    setImgShow(
      <Image src={  require('../assets/img/utils/empty_logo.jpg') }
        id="img_show" style={{ width: '80px' }} roundedCircle />
    )

    document.getElementById('code_ean').setAttribute('readonly',true)

  }

  const pickLogo = () => {
    document.getElementById('file_product').click()
  }

  const readImgProduct = e => {

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here
      document.getElementById('imagen_logo').src = event.target.result

      setImgShow(
        <Image src={ event.target.result }
          id="img_show" style={{ width: '100%',height: '100%' }} thumbnail />
      )

      setImgProduct(file)

    };

    reader.readAsDataURL(file);
  }

  const displayInputGallery = () => {
    document.getElementById('galleryImg').click()
  }

  const displayGalleryImg = async () => {

    let file = ""
    let count = 0
     let groupHtml = await Promise.all(Object.keys(galleryImg).map( async (v,i) => {

        file = galleryImg[v]
        let img64  = await readerImg(file)

        return(
          <Col sm={12} md={12} lg={12} xs={12} key={i} className="paddingColGallery">
            <Image src={img64}
            id="imagen_logo" style={{ width: '80%', height: '80%' }} rounded  />
            <br/><br/>
            <Button size="sm" variant="dark" title="Eliminar" onClick={() => removeImgFromGallery(v) } className="buttonTrashGallery"><FaTrash /></Button>
          </Col>
        )
     }))

    setHtmlImgGallery(groupHtml)
  }

  const galleryImgHandle = e => {
    setGalleryImg(e.target.files)
  }

  const removeImgFromGallery = index => {
    let objectGallery = Object.assign({},galleryImg)
    delete objectGallery[index]
    setGalleryImg(objectGallery)
  }

  const confirmDeleteRegisterGallery = id => {
    axios.delete(API_URL+'product_gallery/'+id).then(result => {
      let galleryFilter = galleryFromUpdate.filter(v => v.id !== id)
      setGalleryFromUpdate(galleryFilter)
      toast.success('Imagen de la Galeria Eliminada')
    }).catch(err => {
     	 if(err.response){
         toast.error(err.response.data.message)
       }else{
         toast.error('Error contacte con soporte')
       }
    })
  }

  const unlockEanInput = () => {
    document.getElementById('code_ean').removeAttribute('readonly')
  }

  const scannEan = () => {
    document.getElementById('code_ean').setAttribute('readonly',true)
    setIsOpenScan(true)
  }

  const catchCodeHandle = data => {
    setIsOpenScan(false)
  }

  const handleModalCost = () => {
    setIsShowModalCost(prev => {
      return !prev
    })
  }

  const handleCostDetailValues = data => {
    setDataDetailHandle(data)
    setIsShowModalCost(false)
  }

  const handleRemoveFromUpdate = data => {
    let productNew = Object.assign({},dataProduct,{
      detailCost: dataProduct.detailCost.filter(v => v.id !== data.id)
    })

    setDataStore(productNew)
  }

  return (
    <Container>
      <Form onSubmit={() => {}} noValidate validated={validate} ref={inputRef}>
        <Row className="justify-content-center align-items-center">
          <Col sm={7} md={7} lg={7} xs={12} className="">
            <Row className="align-items-center">
              <Col sm={6} md={6} lg={6} xs={12}>
                <Button size="sm" onClick={pickLogo} variant="success" block="true" size="sm">
                  Escoger Imagen Producto <FaImage />
                </Button>
                <input type="file" id="file_product" style={{display: 'none'}} onChange={readImgProduct} />
              </Col>
              <Col sm={6} md={6} lg={6} xs={12} className="text-center">
                {imgComponent}
              </Col>
            </Row>
            <br/>
            <Row>
              <InputField
                {...props.inputNameProduct}
                handleChange={onChange}
                value={dataProduct.name_product}
                placeholder="Nombre del Producto"
              />
              <InputField
                {...props.inputPrice}
                handleChange={onChange}
                value={dataProduct.price}
              />
              <Form.Group className={'col-md-4 col-sm-4 col-lg-4'}>
                <Form.Label className="fontBold">Categorías</Form.Label>
                <Select
                  value={dataProduct.id_category}
                  onChange={onChangeSelect}
                  isMulti={true}
                  options={category.map((v,i) => {
                    return {value: v.id, label: v.name_category}
                  })}
                />
              </Form.Group>
            </Row>
            <Row>
              <InputField
                {...props.inputDescription}
                handleChange={onChange}
                value={dataProduct.description}
              />
              <InputField
                {...props.inputCodeEan}
                handleChange={onChange}
                value={dataProduct.code_ean}
              />
              <InputField
                {...props.inputCost}
                handleChange={onChange}
                value={dataProduct.cost}
              />
            </Row>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" variant='dark' size="sm" onClick={unlockEanInput} block={true}>Escribir EAN</Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" variant='dark' size="sm" onClick={scannEan} block={true}>Scannear EAN</Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" variant="secondary" size="sm" onClick={handleModalCost} block={true}>Añadir Detalle de Costos</Button>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col sm={6} md={6} lg={6} xs={12}>
                <label className="form-control-label">Es Neto</label>
                <br/>
                <Row>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <label className="checkbox-inline">
                      Si &nbsp;&nbsp;&nbsp;
                      <input type="checkbox" name="is_neto" checked={dataProduct.is_neto ? true : false} value={true} onChange={onChange} />
                    </label>
                  </Col>
                  <Col sm={6} md={6} lg={6} xs={12}>
                    <label className="checkbox-inline">
                      No &nbsp;&nbsp;&nbsp;
                      <input type="checkbox" name="is_neto" checked={dataProduct.is_neto ? false : true} value={false} onChange={onChange}/>
                    </label>
                  </Col>
                </Row>
              </Col>
              <Col sm={6} md={6} lg={6} xs={12}>
                <label className="form-control-label">Es Auto Venta</label>
                <br/>
                  <Row>
                    <Col sm={6} md={6} lg={6} xs={12}>
                      <label className="checkbox-inline">
                        Si &nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="is_auto_sale" checked={dataProduct.is_auto_sale ? true : false} value={true} onChange={onChange} />
                      </label>
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={12}>
                      <label className="checkbox-inline">
                        No &nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="is_auto_sale" checked={dataProduct.is_auto_sale ? false : true} value={false} onChange={onChange} />
                      </label>
                    </Col>
                  </Row>
              </Col>
            </Row>
            <Row>
              <InputField
                {...props.inputSticker}
                handleChange={onChange}
                value={dataProduct.sticker_color}
              />
              <InputField
                {...props.inputMethodSale}
                handleChange={onChange}
                value={dataProduct.method_sale}
              >
                <option value=''>--Seleccione--</option>
                <option value={1}>Unidad</option>
                <option value={2}>Mayorista</option>
                <option value={3}>(Kilo, Litros, Metros, Entre Otros...)</option>
              </InputField>
              {isShowPackField ? (
                <InputField
                  {...props.inputPack}
                  handleChange={onChange}
                  value={dataProduct.pack}
                  />
              ) : ''}
            </Row>
            <Row className="justify-content-center">
              <Col md={6} sm={6} lg={6}>
                <Button size="sm" type="button" onClick={onSubmit} disabled={isSubmit} variant="primary" block={true}>{ textButton }</Button>
              </Col>
            </Row>
          </Col>
          <Col sm={3} md={3} lg={3} xs={12} className="containerDiv divGallery">
            {dataProduct.img_product && !imgProduct ? (
              <div className="d-flex align-items-center justify-content-center divTitleShowImg">
                <Image src={API_URL+'images/product/principal/'+dataProduct.img_product} thumbnail style={{width: '100%', height: '100%'}}/>
              </div>
            ) : imgProduct && imgShow ? (
              <div className="d-flex align-items-center justify-content-center divTitleShowImg">
                {imgShow}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center divTitleShow">
                { dataProduct.name_product }
              </div>
            )}

            <div className="divDescriptionShow d-flex align-items-center" style={{ backgroundColor: dataProduct.sticker_color ? dataProduct.sticker_color : '#9c7901'}}>
              { dataProduct.name_product }
              <br/>
              { config ? config.simbolo_moneda : '$' } { dataProduct.price }
            </div>
            <br/>
            <Row className="justify-content-center">
              <Col sm={12} md={12} lg={12} xs={12}>
                <Button size="sm" variant="secondary" onClick={displayInputGallery} block="true">Galeria <FaImage /></Button>
                <input type="file" id="galleryImg" style={{display: 'none'}} multiple={true} accept=".jpg, .png, .jpeg" onChange={galleryImgHandle} />
              </Col>
            </Row>
            <br/>
            <Row>
              {htmlImgGallery}
            </Row>
            <Row>
              {htmlImgGalleryUpdate}
            </Row>
          </Col>
        </Row>
      </Form>
      <ScanEanModal
        show={isOpenScan}
        onHide={()=> setIsOpenScan(false)}
        catchCode={catchCodeHandle}
      />
      <ModalCostDetailProduct
        isShow={isShowModalCost}
        onHide={handleModalCost}
        handleCostValues={handleCostDetailValues}
        dataUpdate={dataProduct.detailCost}
        handleRemoveFromUpdate={handleRemoveFromUpdate}
      />
    </Container>
  )
}


FormProductSale.defaultProps ={
  inputNameProduct: {
    type: 'text',
    required: true,
    name: 'name_product',
    label : 'Nombre',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCodeEan: {
    type: 'text',
    required: false,
    readonly: true,
    name: 'code_ean',
    label : 'Codigo EAN',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputIsNeto: {
    type: 'select',
    required: true,
    name: 'is_neto',
    label : 'Es Neto',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDescription: {
    type: 'textarea',
    required: false,
    name: 'description',
    label : 'Descripción',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputAutoSale: {
    type: 'select',
    required: true,
    name: 'is_auto_sale',
    label : 'Auto Venta',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputMethodSale: {
    type: 'select',
    required: true,
    name: 'method_sale',
    label : 'Método de Venta',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputPrice: {
    type: 'number',
    required: true,
    name: 'price',
    label : 'Precio',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCost: {
    type: 'number',
    required: false,
    name: 'cost',
    label : 'Costo',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputSticker: {
    type: 'color',
    required: true,
    name: 'sticker_color',
    label : 'color de la Etiqueta',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCategory: {
    type: 'select',
    multiple: true,
    required: false,
    name: 'id_category',
    label : 'Categoria',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputPack: {
    type: 'number',
    required: false,
    name: 'pack',
    label : 'Pack',
    placeholder: 'Ingrese la cantidad de venta',
    cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
}

export default FormProductSale
