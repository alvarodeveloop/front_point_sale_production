import React, { useEffect,useState,useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal,Row,Col,Button,Form,Badge } from 'react-bootstrap'
import { FaTrash,FaFileContract } from 'react-icons/fa'
import InputField from 'components/input/InputComponent'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {toast} from 'react-toastify'
import { showPriceWithDecimals } from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent'

const ModalCreditNoteComponent = (props) => {

  const [isLoading, setIsloading] = useState(false)

  const [dataForm,setDataForm] = useState({
    type_operation : null,
    type_note : null,
    products : [],
    sectionDisplay : 1,
    cotization : {},
    reason_ref: "",
  })
  const [validate,setValidate] = useState(false)
  const [copyProductsVariable, setCopyProductsVariable] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if(props.isShow){
      let objectCopy = Object.assign({},props.invoiceObject)
      let prod = [...objectCopy.products]
      setDataForm({...dataForm, products: prod, cotization: objectCopy})
      setCopyProductsVariable(prod)
    }else{
      props.invoiceObject.products = copyProductsVariable
      setDataForm({
        type_operation : null,
        type_note : null,
        products : [],
        sectionDisplay : 1,
        cotization : {},
        reason_ref: "",
      })
    }
  },[props.isShow])

  const handleOnHide = () => {
    props.onHide()
  }

  const onSubmit = typeSubmit => {

    const form = inputRef.current
    if (form.checkValidity() === false) {
      setValidate(true);
      return
    }
    const dataSend = Object.assign({},dataForm,{
      typeSubmit
    })
    setIsloading(true)
    axios.post(API_URL+'invoice_note_credit',dataSend).then(result => {
      toast.success(`Nota de ${!dataSend.type_operation ? "Débito" : "Crédito"} realizada con éxito`);
      setIsloading(false)
      props.fetchData()
      result.data.forEach((v,i) => {
        window.open(v.pdf_public_url,"_blank")
      })
      setTimeout(function () {
        props.onHide()
      }, 1000);
    }).catch(err => {
      setIsloading(false)
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
    })
  }

  const onChange = e => {
    e.persist()
    if(e.target.name === "reason_ref"){
      setDataForm({...dataForm, [e.target.name] : e.target.value})
    }else if(e.target.name === "type_note"){
      let val = e.target.value === "true" ? true : false
      setDataForm({...dataForm, [e.target.name] : val, sectionDisplay: 2})
    }else if(e.target.name === "type_operation"){
      let val = e.target.value === "true" ? true : false
      setDataForm({...dataForm, [e.target.name] : val, sectionDisplay: val ? 4 : 3})
    }
  }

  const getBackSection = () => {
    setDataForm({...dataForm, sectionDisplay: dataForm.sectionDisplay - 1 > 0 ? dataForm.sectionDisplay - 1 : dataForm.sectionDisplay})
  }

  const onChangeProduct = (e,pos) => {
    let productUpdate = [...dataForm.products]
    productUpdate[pos][e.target.name] = e.target.value
    setDataForm({...dataForm, products: productUpdate})
  }

  const removeProduct = position => {
    let array_copy = [...dataForm.products]
    array_copy.splice(position,1)
    setDataForm({...dataForm, products: array_copy})
  }

  const determinatedMethodSale = method => {
    if(method == 1){
      return 'Unidad'
    }else if(method == 2){
      return 'Mayorista'
    }else{
      return 'Litros, Kg, Etc...'
    }
  }

  return (
    <Modal
      show={props.isShow}
      onHide={handleOnHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header_dark">
        <Modal.Title id="contained-modal-title-vcenter">
          Nota para la factura { Object.keys(dataForm.cotization).length > 0 ? dataForm.cotization.ref ? dataForm.cotization.ref : '' : '' } <FaFileContract/>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => {}} noValidate validated={validate} ref={inputRef}>
      {
        isLoading ? (
          <Modal.Body>
            <LoadingComponent />
          </Modal.Body>
        ) : (
          <Modal.Body>
            {dataForm.sectionDisplay == 1 ? (
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4}>
                  <Row>
                    <Col sm={12} md={12} lg={12} className="text-center">
                      <b>Tipo de Nota</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} md={6} lg={6}>
                      <Form.Group>
                        <Form.Check
                          name="type_note"
                          type={'radio'}
                          id={`radio-5`}
                          label={`Crédito`}
                          value={true}
                          checked={dataForm.type_note === true}
                          required={true}
                          onChange={onChange}
                          />
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6} className="text-right">
                      <Form.Group>
                        <Form.Check
                          name="type_note"
                          type={'radio'}
                          id={`radio-6`}
                          label={`Debito`}
                          value={false}
                          required={true}
                          checked={dataForm.type_note === false}
                          onChange={onChange}
                          />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : dataForm.sectionDisplay == 2 ? (
              <>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12} className="text-center">
                        <b>Tipo de Operación</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_operation"
                            type={'radio'}
                            id={`radio-5`}
                            label={`Anulación`}
                            value={true}
                            checked={dataForm.type_operation === true}
                            required={true}
                            onChange={onChange}
                            />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6} className="text-right">
                        <Form.Group>
                          <Form.Check
                            name="type_operation"
                            type={'radio'}
                            id={`radio-6`}
                            label={`Parcial`}
                            value={false}
                            required={true}
                            checked={dataForm.type_operation === false}
                            onChange={onChange}
                            />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <Button variant="danger" block={true} size="sm" type="button" onClick={getBackSection}>Ir atras</Button>
                  </Col>
                </Row>
              </>
            ) : dataForm.sectionDisplay === 3 ? (
              <React.Fragment>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <h4 className="title_principal text-center">Modificar Productos para la nota</h4>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr style={{backgroundColor: 'rgb(218,236,242)', fontWeight: 'bold'}}>
                          <th className="text-center">Categoria</th>
                          <th className="text-center">Producto</th>
                          <th className="text-center">Precio</th>
                          <th className="text-center">Método de Venta</th>
                          <th className="text-center">Inventariable</th>
                          <th className="text-center">Stock Inventario</th>
                          <th className="text-center">Cantidad</th>
                          <th className="text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {dataForm.products.map((v,i) => (
                          <tr key={i}>
                            <td><br/>{v.category}</td>
                            <td><br/>{v.name_product}</td>
                            <td>
                              <InputField
                                type='text'
                                id={"price-"+i}
                                name='price'
                                required={true}
                                messageErrors={[
                                  'Requerido*'
                                ]}
                                cols='col-md-12 col-lg-12 col-sm-12'
                                value={dataForm.products[i].price}
                                handleChange={(e) => onChangeProduct(e,i)}
                                />
                            </td>
                            <td><br/>{determinatedMethodSale(v.method_sale)}</td>
                            <td><br/>{v.id_product ? (<Badge variant="primary" className="font-badge">Si</Badge>) : (<Badge variant="secondary" className="font-badge">No</Badge>)}</td>
                            <td><br/>{v.id_product ? v.products ?  Array.isArray(v.products.inventary) ? v.products.inventary[0].stock :  v.products.inventary.stock :  v.inventary ? v.inventary[0].stock : 'Sin Stock' : 'Sin Stock'}</td>
                            <td>
                              <InputField
                                type='text'
                                id={"quantity-"+i}
                                name='quantity'
                                required={true}
                                messageErrors={[
                                  'Requerido*'
                                ]}
                                cols='col-md-12 col-lg-12 col-sm-12'
                                value={dataForm.products[i].quantity}
                                handleChange={(e) => onChangeProduct(e,i)}
                                />
                            </td>
                            <td>
                              <br/>
                              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id={"tooltip-modal-credit-"+i}>Remover producto de la nota</Tooltip>}>
                                <Button variant="danger" block={true} size="sm" onClick={() => removeProduct(i)}><FaTrash /></Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <InputField
                  type='text'
                  label='Razón de Referencia'
                  name='reason_ref'
                  required={true}
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={dataForm.reason_ref}
                  handleChange={onChange}
                  />
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="primary" onClick={() => onSubmit(1)} block={true} size="sm" type="button">Guardar y afectar inventario</Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="primary" onClick={() => onSubmit(2)} block={true} size="sm" type="button">Guardar</Button>
                  </Col>
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <Button variant="danger" block={true} size="sm" type="button" onClick={getBackSection}>Ir atras</Button>
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <h4 className="title_principal text-center">Modificar Productos para la nota</h4>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr style={{backgroundColor: 'rgb(218,236,242)', fontWeight: 'bold'}}>
                          <th className="text-center">Categoria</th>
                          <th className="text-center">Producto</th>
                          <th className="text-center">Precio</th>
                          <th className="text-center">Método de Venta</th>
                          <th className="text-center">Inventariable</th>
                          <th className="text-center">Stock Inventario</th>
                          <th className="text-center">Cantidad</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {dataForm.products.map((v,i) => (
                          <tr key={i}>
                            <td>{v.category}</td>
                            <td>{v.name_product}</td>
                            <td>{showPriceWithDecimals(props.configGeneral,v.price)}</td>
                            <td>{determinatedMethodSale(v.method_sale)}</td>
                            <td>{v.id_product ? (<Badge variant="primary" className="font-badge">Si</Badge>) : (<Badge variant="secondary" className="font-badge">No</Badge>)}</td>
                            <td>{v.id_product ? v.products ?  Array.isArray(v.products.inventary) ? v.products.inventary[0].stock :  v.products.inventary.stock :  v.inventary ? v.inventary[0].stock : 'Sin Stock' : 'Sin Stock'}</td>
                            <td>{v.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <InputField
                  type='text'
                  label='Razón de Referencia'
                  name='reason_ref'
                  required={true}
                  messageErrors={[
                  'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={dataForm.reason_ref}
                  handleChange={onChange}
                  />
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="primary" onClick={() => onSubmit(1)} block={true} size="sm" type="button">Guardar y afectar inventario</Button>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="primary" onClick={() => onSubmit(2)} block={true} size="sm" type="button">Guardar</Button>
                  </Col>
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <Button variant="danger" block={true} size="sm" type="button" onClick={getBackSection}>Ir atras</Button>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </Modal.Body>
        )}
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={handleOnHide}>Cerrar</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModalCreditNoteComponent.propTypes = {
  onHide: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  invoiceObject : PropTypes.object.isRequired,
  configGeneral : PropTypes.object,
}

export default ModalCreditNoteComponent
