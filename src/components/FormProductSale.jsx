import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import 'styles/pages/productStyle.scss'
import { FaImage, FaPlusCircle, FaTrash } from "react-icons/fa";
import InputField from 'components/input/InputComponent'
import { toast } from 'react-toastify'
import { readerImg } from 'utils/functions'
import { API_URL } from 'utils/constants'
import ScanEanModal from 'components/modals/ScanEanModal'
import Select from 'react-select';
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image,
  Card,
  Carousel,
  Accordion,
} from 'react-bootstrap'

const FormProductSale = (props) => {

  const [dataProduct, setDataProduct] = useState({
    name_product: '',
    code_ean: '',
    description: '',
    is_neto: false,
    id_category: [],
    is_auto_sale: false,
    img_product: '',
    method_sale: 1,
    price: '',
    qr_image: '',
    sticker_color: '#9c7901',
    detailCost: [],
    pack: '',
    categoryNames: '',
    minimun_stock: 10,
    quantity: '',
    cost: '',
    cost_details: '',
    id_product_detail: "",
    id_provider: []
  })


  const [dataDetailHandle, setDataDetailHandle] = useState(false) //  variable para guardar temporalmente la data del detalle de los costos
  const [isOpenScan, setIsOpenScan] = useState(false)
  const [config, setConfig] = useState([])
  const [category, setCategory] = useState([])
  const [validate, setValidate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [imgProduct, setImgProduct] = useState('')
  const [galleryImg, setGalleryImg] = useState({})
  const [indexCarrousel, setIndexCarrousel] = useState(0)
  const [galleryImgUpdate, setGalleryImgUpdate] = useState({})
  const [htmlImgGallery, setHtmlImgGallery] = useState('')
  const [textButton, setTextButton] = useState('Guardar')
  const [isSubmit, setIsSubmit] = useState(false)
  const [products, setProducts] = useState([]);
  const [galleryFromUpdate, setGalleryFromUpdate] = useState([])
  const [isShowPackField, setIsShowPackField] = useState(false)
  const [imgComponent, setImgComponent] = useState(
    <Image src={require('../assets/img/utils/empty_logo.jpg')}
      id="imagen_logo" style={{ width: '100px' }} roundedCircle />
  )
  const [inventarySection, setInventarySection] = useState(false)
  const [providers, setProviders] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    fetchData()
    return () => {
      cleanForm()
    }
  }, [])

  useEffect(() => {
    displayGalleryImg()
  }, [galleryImg, galleryImgUpdate])

  const onChange = async e => {

    if (e.target.name === "method_sale") {
      let val_pack = ''
      if (e.target.value == 2) {
        setIsShowPackField(true)
      } else {
        setIsShowPackField(false)
      }
      setDataProduct({ ...dataProduct, [e.target.name]: e.target.value })
    } else if (e.target.name === "is_neto" || e.target.name === "is_auto_sale") {
      let val = e.target.value === "true" ? true : false
      setDataProduct({ ...dataProduct, [e.target.name]: val })
    } else {
      setDataProduct({ ...dataProduct, [e.target.name]: e.target.value })
    }
  }

  const onChangeSelect = val => {
    setDataProduct({ ...dataProduct, id_category: val })
  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL + 'category'),
      axios.get(API_URL + 'config_general'),
      axios.get(API_URL + 'provider'),
      axios.get(API_URL + 'product'),
    ]

    if (props.match.params.id) {
      if (props.isInventary) {
        promise.push(
          axios.get(API_URL + 'product/' + atob(props.match.params.id))
        )
      } else {
        promise.push(
          axios.get(API_URL + 'product/' + props.match.params.id)
        )
      }
    }
    Promise.all(promise).then(result => {

      if (result[0].data) {
        setCategory(result[0].data)
      } else {
        toast.warning('Debe realizar su configuración general')
      }
      setConfig(result[1].data)
      setProviders(result[2].data)
      setProducts(result[3].data);
      if (result.length > 4) {
        if (props.isInventary) {
          setDataProduct({
            name_product: result[4].data.name_product,
            code_ean: result[4].data.code_ean,
            description: result[4].data.description,
            is_neto: result[4].data.is_neto,
            id_category: result[4].data.categories.map(v => { return { value: v.categories.id, label: v.categories.name_category } }),
            is_auto_sale: result[4].data.is_auto_sale,
            img_product: result[4].data.img_product,
            method_sale: result[4].data.method_sale,
            price: result[4].data.price,
            qr_image: result[4].data.qr_image,
            sticker_color: result[4].data.sticker_color,
            detailCost: result[4].data.cost_details,
            pack: result[4].data.pack,
            id_product_detail: result[4].data.id_product_detail,
            minimun_stock: result[4].data.inventary[0].minimun_stock,
          })

          if (result[4].data.method_sale == 2) {
            setIsShowPackField(true)
          }
          setIsUpdate(true)

          if (result[4].data.img_product) {
            setImgComponent(
              <Image src={API_URL + 'images/product/principal/' + result[4].data.img_product}
                id="imagen_logo" style={{ width: '80px' }} thumbnail />
            )
          }

          if (result[4].data.gallery.length > 0) {
            setGalleryImgUpdate(result[4].data.gallery)
          }
        }

      }

    }).catch(err => {
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        console.log(err)
        toast.error('Error,contacte con soporte')
      }
    })
  }


  const onSubmit = async () => {

    try {
      const form = inputRef.current;
      if (form.checkValidity() === false) {
        setValidate(true);
        return
      }

      let formData = new FormData()

      let objectNew = Object.assign({}, dataProduct, {
        detailCost: dataProduct.detailCost.concat(dataDetailHandle)
      })

      Object.keys(objectNew).forEach((v, i) => {
        if (v === 'img_product') {
          if (imgProduct) {
            formData.append(v, imgProduct)
          }
        } else if (v === 'id_category') {
          let name_categories = ""
          if (dataProduct[v]) {
            dataProduct[v].forEach((item, i) => {
              formData.append('id_category', item.value)
              name_categories += item.label + ","
            });
          }
          name_categories = name_categories.substring(0, name_categories.length - 1)
          formData.append('name_categories', name_categories)
        } else {
          formData.append(v, dataProduct[v])
        }
      })

      setTextButton('Guardando Datos, Espere por favor...')
      setIsSubmit(true)
      if (isUpdate) {
        let route_param = props.isInventary ? atob(props.match.params.id) : props.match.params.id
        let result = await axios.put(API_URL + 'product/' + route_param, formData)

        setTextButton('Trabajando en galeria de imagénes...')

        let formDataGallery = new FormData()
        Object.keys(galleryImg).forEach((v, i) => {
          formDataGallery.append('gallery', galleryImg[v])
        })
        Object.keys(galleryImgUpdate).forEach((v, i) => {
          formDataGallery.append('galleryUpdate', galleryImgUpdate[v].filename)
        })
        await axios.put(API_URL + 'update_gallery/' + route_param, formDataGallery)
        toast.success('Producto Modificado')

        setTimeout(() => {
          if (props.isInventary) {
            goToTable()
          } else {
            props.handleSubmitProduct(Object.assign({}, result.data))
          }
        }, 1500)

      } else {
        let result = await axios.post(API_URL + 'product', formData)

        if (Object.keys(galleryImg).length > 0) {

          setTextButton('Guardando Galeria de Imagenes...')

          let formDataGallery = new FormData()
          Object.keys(galleryImg).forEach((v, i) => {
            formDataGallery.append('gallery', galleryImg[v])
          })
          formDataGallery.append('id_product', result.data.id)
          await axios.post(API_URL + 'product_gallery', formDataGallery)
          toast.success('Producto Creado')
          setTextButton('Guardar')
          setIsSubmit(false)
          setIsShowPackField(false)
          cleanForm()
        } else {
          toast.success('Producto Creado')
          setTextButton('Guardar')
          setIsSubmit(false)
          setIsShowPackField(false)
          cleanForm()
        }
        setTimeout(function () {
          if (props.isInventary) {
            goToTable()
          } else {
            props.handleSubmitProduct(Object.assign({}, result.data))
          }
        }, 1500);
      }
    } catch (err) {
      setTextButton('Guardar')
      setIsSubmit(false)
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    }
  }

  const cleanForm = () => {

    setDataProduct({
      name_product: '',
      cost: '',
      code_ean: '',
      description: '',
      is_neto: '',
      id_category: '',
      is_auto_sale: '',
      img_product: '',
      method_sale: '',
      price: '',
      qr_image: '',
      sticker_color: '#9c7901',
      detailCost: [],
      pack: '',
      categoryNames: '',
      minimun_stock: 0
    })

    setImgProduct(null)
    setImgComponent(null)
    setGalleryImg({})
    setHtmlImgGallery('')

    setImgComponent(
      <Image src={require('../assets/img/utils/empty_logo.jpg')}
        id="img_show" style={{ width: '80px' }} roundedCircle />
    )

    //document.getElementById('code_ean').setAttribute('readonly',true)

  }

  const pickLogo = () => {
    document.getElementById('file_product').click()
  }

  const readImgProduct = e => {

    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = event => {
      // The file's text will be printed here

      setImgComponent(
        <Image src={event.target.result}
          id="img_show" style={{ width: '80%' }} roundedCircle />
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
    let groupHtml = await Promise.all(Object.keys(galleryImg).map(async (v, i) => {
      file = galleryImg[v]
      let img64 = await readerImg(file)
      return (
        <Carousel.Item key={i}>
          <img
            className="d-block"
            src={img64}
            alt="First slide"
            style={{ height: "300px", width: "100%" }}
          />
          <Carousel.Caption>
            <Row className="justify-content-center">
              <Col sm={5} md={5} lg={5}>
                <Button size="sm" variant="dark" title="Eliminar" onClick={() => removeImgFromGallery(v, false)} className="buttonTrashGallery">Eliminar <FaTrash /></Button>
              </Col>
            </Row>
          </Carousel.Caption>
        </Carousel.Item>
      )
    }))

    let groupHtmlUpdate = await Promise.all(Object.keys(galleryImgUpdate).map(async (v, i) => {
      file = galleryImgUpdate[v]
      return (
        <Carousel.Item key={i + "-update"}>
          <img
            className="d-block"
            src={API_URL + 'images/product/gallery/' + file.filename}
            alt="First slide"
            style={{ height: "300px", width: "100%" }}
          />
          <Carousel.Caption>
            <Row className="justify-content-center">
              <Col sm={5} md={5} lg={5}>
                <Button size="sm" variant="dark" title="Eliminar" onClick={() => removeImgFromGallery(v, true)} className="buttonTrashGallery">Eliminar <FaTrash /></Button>
              </Col>
            </Row>
          </Carousel.Caption>
        </Carousel.Item>
      )
    }))


    setHtmlImgGallery([...groupHtml, ...groupHtmlUpdate])
  }

  const handleSelectCarrousel = (selectedIndex, e) => {
    setIndexCarrousel(selectedIndex)
  }

  const galleryImgHandle = e => {
    setGalleryImg(Object.assign({}, galleryImg, e.target.files))
  }

  const removeImgFromGallery = (index, type) => {
    if (type) {
      let objectGallery = Object.assign({}, galleryImgUpdate)
      delete objectGallery[index]
      setGalleryImgUpdate(objectGallery)
      setIndexCarrousel(0)
    } else {
      let objectGallery = Object.assign({}, galleryImg)
      delete objectGallery[index]
      setGalleryImg(objectGallery)
      setIndexCarrousel(0)
    }
  }

  const unlockEanInput = () => {
    document.getElementById('code_ean').removeAttribute('readonly')
  }

  const scannEan = () => {
    document.getElementById('code_ean').setAttribute('readonly', true)
    setIsOpenScan(true)
  }

  const catchCodeHandle = data => {
    setIsOpenScan(false)
  }

  const goToTable = () => {
    props.history.replace('/inventary')
  }

  const showInventariSection = () => {
    if (!inventarySection) {
      if (!dataProduct.name_product || !dataProduct.price) {
        setValidate(true)
        return
      } else {
        if (validate) {
          setValidate(false)
        }
      }
    }
    setInventarySection(!inventarySection)
  }

  const onChangeSelectProvider = val => {
    setDataProduct({ ...dataProduct, id_provider: val })
  }

  return (
    <Container fluid={true}>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">{isUpdate ? "Modifcar producto en el invetario" : "Crear producto en el inventario"}</h4>
        </Col>
      </Row>
      <Form onSubmit={() => { }} noValidate validated={validate} ref={inputRef}>
        {inventarySection ? (
          <>
            <Row>
              <InputField
                type="number"
                label="Cantidad"
                name="quantity"
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={dataProduct.quantity}
                handleChange={onChange}
              />
              <InputField
                type="text"
                label="Detalle Costo"
                name="detail"
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={dataProduct.detail}
                handleChange={onChange}
              />
              <InputField
                type="number"
                step="any"
                label="Costo"
                name="cost"
                required={false}
                messageErrors={[
                  'Requerido*'
                ]}
                cols="col-md-4 col-lg-4 col-sm-4"
                value={dataProduct.cost}
                handleChange={onChange}
              />
            </Row>
            <Row>
              <Form.Group className={'col-md-4 col-sm-4 col-lg-4'}>
                <Form.Label className="fontBold">Proveedores</Form.Label>
                <Select
                  value={dataProduct.id_provider}
                  onChange={onChangeSelectProvider}
                  isMulti={true}
                  options={providers.map((v, i) => {
                    return { value: v.id, label: v.social_razon }
                  })}
                />
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" type="button" onClick={onSubmit} disabled={isSubmit} variant="danger" block={true}>{textButton} <FaPlusCircle /> </Button>
              </Col>
              <Col sm={4} md={4} lg={4}>
                <Button size="sm" type="button" onClick={showInventariSection} variant="secondary" block={true}>Atrás</Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row className="">
            <Col sm={12} md={12} lg={12} xs={12} className="">
              <Row className="justify-content-center align-items-center">
                <Col sm={4} md={4} lg={4} xs={12}>
                  <br />
                  <Button size="sm" onClick={pickLogo} variant="success" block="true" size="sm">
                    Escoger Imagen Producto <FaImage />
                  </Button>
                  <input type="file" id="file_product" style={{ display: 'none' }} onChange={readImgProduct} />
                </Col>
                <Col sm={4} md={4} lg={4} xs={12} className="text-center">
                  {imgComponent}
                </Col>
              </Row>
              <br />
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
                <Form.Group className={props.isInventary ? 'col-md-4 col-sm-4 col-lg-4' : 'col-md-3 col-sm-3 col-lg-3'}>
                  <Form.Label className="fontBold">Categorías</Form.Label>
                  <Select
                    value={dataProduct.id_category}
                    onChange={onChangeSelect}
                    isMulti={true}
                    options={category.map((v, i) => {
                      return { value: v.id, label: v.name_category }
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
              </Row>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                    <b>Datos de Personalización</b> (hacer click para desplegar campos)
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <InputField
                          {...props.inputCodeEan}
                          handleChange={onChange}
                          value={dataProduct.code_ean}
                        />
                        <Col sm={4} md={4} lg={4}>
                          <br />
                          <Button size="sm" variant='dark' size="sm" onClick={unlockEanInput} block={true}>Escribir EAN</Button>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                          <br />
                          <Button size="sm" variant='dark' size="sm" onClick={scannEan} block={true}>Scannear EAN</Button>
                        </Col>
                      </Row>
                      <br />
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
                          <>
                            <InputField
                              {...props.inputPack}
                              handleChange={onChange}
                              value={dataProduct.pack}
                            />
                            <InputField
                              label="producto"
                              type="select"
                              name="id_product_detail"
                              required={true}
                              messageErrors={[
                                "requerido"
                              ]}
                              cols="col-md-4 col-sm-4 col-xl-4 col-lg-4"
                              value={dataProduct.id_product_detail}
                              handleChange={onChange}
                            >
                              <option value="">--Seleccione--</option>
                              {products.map((v, i) => (
                                <option value={v.id} key={i}>{v.name_product}</option>
                              ))}
                            </InputField>
                          </>
                        ) : ''}
                        <InputField
                          type='number'
                          label='Stock minimo'
                          name='minimun_stock'
                          required={false}
                          messageErrors={[
                            ''
                          ]}
                          cols='col-md-4 col-lg-4 col-sm-4'
                          value={dataProduct.minimun_stock}
                          handleChange={onChange}
                        />
                      </Row>
                      <Row className="justify-content-center">
                        <Col sm={6} md={6} lg={6} xs={12}>
                          <Button size="sm" variant="secondary" onClick={displayInputGallery} block="true">Imagénes de Galeria <FaImage /></Button>
                          <input type="file" id="galleryImg" style={{ display: 'none' }} multiple={true} accept=".jpg, .png, .jpeg" onChange={galleryImgHandle} />
                        </Col>
                      </Row>
                      <br />
                      <Row className="justify-content-center">
                        <Col sm={8} md={8} lg={8}>
                          <Carousel activeIndex={indexCarrousel} onSelect={handleSelectCarrousel}>
                            {htmlImgGallery}
                          </Carousel>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <br />
              {
                !isUpdate ? (
                  <Row className="justify-content-center">
                    {props.isInventary && (
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="danger" size="sm" onClick={onSubmit} block={true}>Guardar <FaPlusCircle /></Button>
                      </Col>
                    )}
                    <Col sm={4} md={4} lg={4}>
                      <Button variant={props.isInventary ? "secondary" : "danger"} size="sm" onClick={showInventariSection} block={true}>Datos de Inventario</Button>
                    </Col>
                  </Row>
                ) : (
                  <Row className="justify-content-center">
                    <Col md={4} sm={4} lg={4}>
                      <Button size="sm" type="button" onClick={onSubmit} disabled={isSubmit} variant="danger" block={true}>{textButton} <FaPlusCircle /> </Button>
                    </Col>
                    {props.isInventary ? (
                      <Col md={4} sm={4} lg={4}>
                        <Button size="sm" type="button" onClick={goToTable} variant="secondary" block={true}>Volver</Button>
                      </Col>
                    ) : ''}
                  </Row>
                )
              }
            </Col>
          </Row>
        )}
      </Form>
      <ScanEanModal
        show={isOpenScan}
        onHide={() => setIsOpenScan(false)}
        catchCode={catchCodeHandle}
      />
    </Container>
  )
}


FormProductSale.defaultProps = {
  inputNameProduct: {
    type: 'text',
    required: true,
    name: 'name_product',
    label: 'Nombre',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCodeEan: {
    type: 'text',
    required: false,
    readonly: true,
    name: 'code_ean',
    label: 'Codigo EAN',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputIsNeto: {
    type: 'select',
    required: true,
    name: 'is_neto',
    label: 'Es Neto',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDescription: {
    type: 'textarea',
    required: false,
    name: 'description',
    label: 'Descripción (opcional)',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputAutoSale: {
    type: 'select',
    required: true,
    name: 'is_auto_sale',
    label: 'Auto Venta',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputMethodSale: {
    type: 'select',
    required: true,
    name: 'method_sale',
    label: 'Método de Venta',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputPrice: {
    type: 'number',
    required: true,
    name: 'price',
    label: 'Precio',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputSticker: {
    type: 'color',
    required: true,
    name: 'sticker_color',
    label: 'color de la Etiqueta',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputCategory: {
    type: 'select',
    multiple: true,
    required: false,
    name: 'id_category',
    label: 'Categoria',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputPack: {
    type: 'number',
    required: false,
    name: 'pack',
    label: 'Pack',
    placeholder: 'Ingrese la cantidad de venta',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-4",
    step: 'any',
    messageErrors: [
      'Requerido*'
    ],
  },
}

FormProductSale.propTypes = {
  handleSubmitProduct: PropTypes.func,
  isInventary: PropTypes.bool,
}

export default FormProductSale
