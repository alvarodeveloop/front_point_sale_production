import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Accordion,
  Card,
  Col,
  Button,
  Form
} from 'react-bootstrap'
import {FaSearch, FaPlusCircle, FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa'
import InputField from 'components/input/InputComponent'
import AutoCompleteClientComponent from 'components/AutoCompleteClientComponent'
import {toast} from 'react-toastify'
import axios from 'axios'
import {formatRut} from 'utils/functions'
import {API_URL,API_FACTURACION} from 'utils/constants'
import LoadingComponent from 'components/LoadingComponent'
import { arrayCotizacion,arraySaleNote, arrayBoleta, arrayGuide,arrayInvoice } from 'utils/constants';


const ClientInvoiceComponet = (props) => {

  const [rutFacturacionClientSearch, setRutFacturacionClientSearch] = useState('')
  const [resetValueClient,setResetValueClient] = useState(false)
  const [clientDetail,setClientDetail] = useState({})
  const [readonlyRut,setReadonlyRut] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(false)
  let arrayInvoiceMerge = [...arraySaleNote,...arrayInvoice]; 

  useEffect(() => {
    if(props.cotizationData.searchReceptorDefault){
      searchClientByApiFacturacionInvoice(props.cotizationData.rut_client)
    }
  },[props.cotizationData.searchReceptorDefault])

  useEffect(() => {

  },[])


  const onChange = e => {
    if(e.target.name === "type_api" || e.target.name === "total_with_iva" || e.target.name === "type_effect" || e.target.name === "type_invoicing"){
      let val = e.target.value === "false" ? false : true
      props.setCotizationData({...props.cotizationData, [e.target.name] : val})
    }else if(e.target.name === "rut_transmitter" || e.target.name === "rut_client"){
      props.setCotizationData({...props.cotizationData, [e.target.name] : formatRut(e.target.value)})
    }else{
      props.setCotizationData({...props.cotizationData, [e.target.name] : e.target.value})
    }
  }

  const handleChangeRutFacturacionInput = e => {
    setRutFacturacionClientSearch(formatRut(e.target.value))
  }

  const searchClientByApiFacturacion = async (rut = false) =>{
    // para buscar receptores simple
     let val = !rut ? rutFacturacionClientSearch : rut
     if(val){
       toast.info('Buscando Receptor, espere por favor')
       setDisplayLoading(true)
        if(arrayGuide.includes(props.isType)){
          try {
            let receptor = await axios.get(API_URL+'search_receptor_guide/'+props.cotizationData.facturaId+"/"+val)
            if(!receptor.data.error){
              props.setCotizationData(oldData => {
                return Object.assign({},oldData,{
                  rut_client: receptor.data.receptor.rut+"-"+receptor.data.receptor.dv,
                  business_name_client: receptor.data.receptor.razon_social,
                  address_client_array: receptor.data.receptor.direcciones[0],
                  address_client: receptor.data.receptor.direccion_seleccionada,
                  comuna_client: receptor.data.receptor.comuna_seleccionada,
                  city_client: receptor.data.receptor.ciudad_seleccionada,
                  spin_client_array: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor : [receptor.data.girosReceptor],
                  spin_client: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor[0].nombre : receptor.data.girosReceptor.nombre,
                  type_buy_client_array: Array.isArray(receptor.data.TipoDeCompra) ? receptor.data.TipoDeCompra : [receptor.data.TipoDeCompra] ,
                  type_buy_client: receptor.data.receptor.tipoDeCompraId.toString(),
                })
              })
              setReadonlyRut(true)
            }
            setDisplayLoading(false)
          } catch (error) {
            setDisplayLoading(false)
            if(error.response){
              toast.error(error.response.data.message)
            }else{
              console.log(error);
              toast.error('Error, contacte con soporte')
            }
          }
        }else{
          try {
            let receptor = await axios.get(API_URL+'search_receptor/'+val.split('-')[0]+'/'+val.split('-')[1])
            if(receptor.data){
              props.setCotizationData(oldData => {
                return Object.assign({},oldData,{
                  rut_client : receptor.data.rut +"-"+receptor.data.dv,
                  business_name_client: receptor.data.razon_social,
                  address_client: receptor.data.direccion_seleccionada,
                  comuna_client : receptor.data.comuna_seleccionada,
                  city_client : receptor.data.ciudad_seleccionada,
                  address_client_array: receptor.data.direcciones[0]
                })
              })
              setReadonlyRut(true)
            }
            setDisplayLoading(false)
          } catch (error) {
            setDisplayLoading(false)
            if(error.response){
              toast.error(error.response.data.message)
            }else{
              console.log(error);
              toast.error('Error, contacte con soporte')
            }
          }
        }
     }else{
       toast.info("Debe ingresar un rut para realizar la busqueda")
     }
  }

  const searchClientByApiFacturacionInvoice = async (rut = false) =>{
    // para buscar receptores a la factura o la nota de venta
    let val = !rut ? rutFacturacionClientSearch : rut
    try {
      if(val){
        if(props.isType === "facturacion"){
          setDisplayLoading(true)
          toast.info('Buscando Receptor, espere por favor')
  
          if(props.cotizationData.type_invoicing === true){

            let result = await axios.get(API_URL+'get_client_invoice/'+props.cotizationData.facturaId+'/'+val.split('-')[0]+'/'+val.split('-')[1])
            let girosReceptor = API_FACTURACION ? result.data.girosReceptor : {"id":1,"nombre":"ACTIVIDADES DE CONSULTORIA DE INFORMATIC"}
            let tipo_compra = API_FACTURACION ? result.data.TipoDeCompra : {"id":1,"valor":"1","nombre":"Del Giro"}
  
            props.setCotizationData(oldData1 => {
              let object_return = Object.assign({},oldData1,{
                rut_client : result.data.receptor.rut +"-"+result.data.receptor.dv,
                business_name_client: result.data.receptor.razon_social,
                address_client: result.data.receptor.direccion_seleccionada,
                address_client_array : result.data.receptor.direcciones[0],
                comuna_client : result.data.receptor.comuna_seleccionada,
                city_client : result.data.receptor.ciudad_seleccionada,
                type_buy_client: result.data.receptor.tipoDeCompraId.toString(),
                type_buy_client_array: Array.isArray(tipo_compra) ? tipo_compra : [tipo_compra],
                spin_client_array : Array.isArray(girosReceptor) ? girosReceptor : [girosReceptor],
                spin_client: Array.isArray(result.data.girosReceptor) ? result.data.girosReceptor[0].nombre :  result.data.girosReceptor.nombre,
              })
  
              return object_return
            })
            setReadonlyRut(true)
            setDisplayLoading(false)
  
          }else{
            let receptor = await axios.get(API_URL+"get_receptor_invoice_excenta/"+props.cotizationData.facturaId+"/"+val)
            props.setCotizationData(oldData => {
              let objectReturn = Object.assign({},oldData,{
                rut_client : receptor.data.receptor.rut +"-"+ receptor.data.receptor.dv,
                business_name_client: receptor.data.receptor.razon_social,
                address_client_array: receptor.data.receptor.direcciones[0],
                address_client: receptor.data.receptor.direccion_seleccionada,
                comuna_client: receptor.data.receptor.comuna_seleccionada,
                city_client: receptor.data.receptor.ciudad_seleccionada,
                spin_client: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor[0].nombre : receptor.data.girosReceptor.nombre,
                spin_client_array: Array.isArray(receptor.data.girosReceptor) ? receptor.data.girosReceptor : [receptor.data.girosReceptor],
                name_contact : receptor.data.receptor.contacto,
                type_buy_client : receptor.data.receptor.tipoDeCompraId.toString(),
                type_buy_client_array : Array.isArray(receptor.data.TipoDeCompra) ? receptor.data.TipoDeCompra : [receptor.data.TipoDeCompra],
              })
              return objectReturn
            })
            setReadonlyRut(true)
            setDisplayLoading(false)
          }
        }else{
          // si es nota de venta
          if(arraySaleNote.includes(props.isType)){
            searchClientByApiFacturacion(val)
          }
        }
      }
    } catch (error) {
      setDisplayLoading(false)
      toast.error("ha ocurrido un error buscando el receptor, intente de nuevo por favor")
    }
  }

  const handleSelectClient = data => {
    let id = data.split('/')[1];
    let lookForClient;
    if(id.indexOf("-") !== -1){
      id = id.split("-");
      lookForClient = props.clients.find(v => v.data_document === id[0] && v.dv.toString() === id[1]);
    }else{
      lookForClient = props.clients.find(v => v.data_document === id);
    }
    if(lookForClient){
      props.setCotizationData(currentData => {
        
        return Object.assign({},currentData,{
          rut_client: Array.isArray(id) ? id.join("-") : id,
          business_name_client: lookForClient.bussines_name ? lookForClient.bussines_name : lookForClient.name_client,
          address_client: lookForClient.address,
          city_client: lookForClient.city,
          comuna_client: lookForClient.comuna
        })
      })
    }

    /*if(arrayCotizacion.includes(props.isType) || arraySaleNote.includes(props.isType)
      searchClientByApiFacturacion(data_document)
    }else{
      if(props.cotizationData.type_invoicing){
        searchClientByApiFacturacionInvoice(data_document)
      }else{

      }
    }*/
  }

  const handleResetValueClient = () => {
    setResetValueClient(!resetValueClient)
  }

  const removeCLient = () => {
    setClientDetail({})
    handleResetValueClient()
    props.setCotizationData({...props.cotizationData, rut_client : '', business_name_client: '', address_client: '', city_client: '', comuna_client : '', spin_client: '', actividad_economica_client: '' })
  }

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1" className="header_card">
        <b>Datos para la Emisión</b> <FaUser /> (hacer click para desplegar campos)
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        {displayLoading ? (
          <LoadingComponent size={75} text="buscando receptor" />
        ) : (
          <>
            {arrayCotizacion.includes(props.isType) || arrayBoleta.includes(props.isType) || arrayGuide.includes(props.isType)  ? (
              <Card.Body>
                <Row>
                  <Col sm={4} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <h5 className="title_principal">Api a utilizar</h5>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={'radio'}
                            id={`radio-2`}
                            label={`Sii`}
                            value={true}
                            checked={props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={'radio'}
                            id={`radio-1`}
                            label={`Aidy`}
                            value={false}
                            checked={!props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  {props.cotizationData.type_api ? (
                    <Col sm={4} md={4} lg={4}>
                      <Form.Label className="fontBold">Rut</Form.Label>
                      <Form.Group className={"divContainerFlex"}>
                        <Form.Control
                          style={{flexGrow:2}}
                          type='text'
                          label='Rut'
                          id="rut_client_facturacion"
                          name='rut_client_facturacion_search'
                          required={false}
                          placeholder="rut del cliente"
                          cols='col-md-12 col-lg-12 col-sm-12'
                          className="form-control-sm"
                          onChange={handleChangeRutFacturacionInput}
                          value={rutFacturacionClientSearch}
                          />
                        <Button variant="secondary" size="sm" onClick={() => searchClientByApiFacturacion()}><FaSearch /></Button>
                        </Form.Group>
                    </Col>
                  ) : (
                    <Col sm={4} md={4} lg={4}>
                      <label>Rut</label>
                      <AutoCompleteClientComponent
                        items={props.clients}
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
                  )}
                  <Col sm={4} md={4} lg={4}>
                    <br/>
                    <Button size="sm" size="sm" variant="danger" block={true} onClick={() => props.setIsShowModalClient(true)}>Crear Cliente <FaPlusCircle /></Button>
                  </Col>
                </Row>
                <Row>
                  <InputField
                    type='text'
                    label='Rut'
                    name='rut_client'
                    readonly={readonlyRut}
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.rut_client}
                    handleChange={onChange}
                    />
                  <InputField
                    type='text'
                    label='Razón Social'
                    name='business_name_client'
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.business_name_client}
                    handleChange={onChange}
                    />
                  {props.cotizationData.address_client_array.length > 0 ? (
                    <InputField
                      type='select'
                      label='Dirección'
                      name='address_client'
                      required={arrayGuide.includes(props.isType)  ? true : false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    >
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.address_client_array.map((v,i) => (
                        <option value={v} key={i}>{v}</option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type='text'
                      label='Dirección'
                      name='address_client'
                      required={arrayGuide.includes(props.isType)  ? true : false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.address_client}
                      handleChange={onChange}
                    />
                  )}
                </Row>
                <Row>
                  <InputField
                    type='text'
                    label='Ciudad'
                    name='city_client'
                    required={arrayGuide.includes(props.isType)  ? true : false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.city_client}
                    handleChange={onChange}
                  />
                  <InputField
                    type='text'
                    label='Comuna'
                    name='comuna_client'
                    required={arrayGuide.includes(props.isType)  ? true : false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.comuna_client}
                    handleChange={onChange}
                  />
                  {arrayGuide.includes(props.isType)  ? (
                    <React.Fragment>
                      <InputField
                        type='text'
                        label='Contacto'
                        name='name_contact'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.name_contact}
                        handleChange={onChange}
                        />
                    </React.Fragment>
                  ) : ''}
                </Row>
                {arrayGuide.includes(props.isType)  ? (
                  <Row>
                    {props.cotizationData.spin_client_array.length > 0 ? (
                      <InputField
                        type='select'
                        label='Giro'
                        name='spin_client'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.spin_client}
                        handleChange={onChange}
                      >
                        <option value="">--Seleccione--</option>
                        {props.cotizationData.spin_client_array.map((v,i) => (
                          <option value={v.nombre} key={i}>{v.nombre}</option>
                        ))}
                      </InputField>
                    ) : (
                      <InputField
                        type='text'
                        label='Giro'
                        name='spin_client'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.spin_client}
                        handleChange={onChange}
                      />
                    )}
                    {props.cotizationData.type_buy_client_array.length > 0 ? (
                      <InputField
                        type='select'
                        label='Tipo de Compra'
                        name='type_buy_client'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.type_buy_client}
                        handleChange={onChange}
                      >
                        <option value="">--Seleccione--</option>
                        {props.cotizationData.type_buy_client_array.map((v,i) => (
                          <option value={v.valor} key={i}>{v.nombre}</option>
                        ))}
                      </InputField>
                    ) : (
                      <InputField
                        type='text'
                        label='Tipo de Compra'
                        name='type_buy_client'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.type_buy_client}
                        handleChange={onChange}
                      />
                      )}
                  </Row>
                ) : ''}
                {!arrayBoleta.includes(props.isType) && !arrayGuide.includes(props.type) ? (
                  <React.Fragment>
                    <br/>
                    <Row>
                      <Col sm={8} md={8} lg={8}>
                        <h4 className="title_principal">Contactos Asignados al Receptor</h4>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="secondary" block={true} size="sm" type="button" onClick={props.handleModalContacts}>Contactos <FaUsers /> <FaPlusCircle /></Button>
                      </Col>
                    </Row>
                    <Row>
                      <InputField
                        type='text'
                        label='Nombre Contacto'
                        name='name_contact'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.name_contact}
                        handleChange={onChange}
                      />
                      <InputField
                        type='text'
                        label='Fono'
                        name='phone_contact'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.phone_contact}
                        handleChange={onChange}
                        />
                      <InputField
                        type='email'
                        label='Email'
                        name='email_contact'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.email_contact}
                        handleChange={onChange}
                        />
                    </Row>
                    <Row>
                      <Col sm={8} md={8} lg={8}>
                        <h4 className="title_principal">Vendedor Asignado</h4>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <Button variant="secondary" block={true} size="sm" type="button" onClick={props.handleModalSeller}>Vendedores <FaUsers /> <FaPlusCircle /></Button>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <InputField
                        type='text'
                        label='Nombre Vendedor'
                        name='name_seller'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.name_seller}
                        handleChange={onChange}
                        />
                      <InputField
                        type='text'
                        label='Fono Vendedor'
                        name='phone_seller'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.phone_seller}
                        handleChange={onChange}
                        />
                      <InputField
                        type='email'
                        label='Email Vendedor'
                        name='email_seller'
                        required={false}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.email_seller}
                        handleChange={onChange}
                        />
                    </Row>
                  </React.Fragment>
                ) : ''}
              </Card.Body>
            ) : arrayInvoiceMerge.includes(props.isType) ? (
              <Card.Body>
                <Row>
                  <Col sm={4} md={4} lg={4}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <h5 className="title_principal">Api a utilizar</h5>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={'radio'}
                            id={`radio-2`}
                            label={`Sii`}
                            value={true}
                            checked={props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} md={6} lg={6}>
                        <Form.Group>
                          <Form.Check
                            name="type_api"
                            type={'radio'}
                            id={`radio-1`}
                            label={`Aidy`}
                            value={false}
                            checked={!props.cotizationData.type_api}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  {props.cotizationData.type_api ? (
                    <Col sm={4} md={4} lg={4}>
                      <Form.Label className="fontBold">Rut</Form.Label>
                      <Form.Group className={"divContainerFlex"}>
                        <Form.Control
                          style={{flexGrow:2}}
                          type='text'
                          label='Rut'
                          id="rut_client_facturacion"
                          name='rut_client_facturacion_search'
                          required={false}
                          placeholder="rut del cliente"
                          cols='col-md-12 col-lg-12 col-sm-12'
                          className="form-control-sm"
                          onChange={handleChangeRutFacturacionInput}
                          value={rutFacturacionClientSearch}
                        />
                      <Button variant="secondary" size="sm" onClick={() => searchClientByApiFacturacionInvoice()}><FaSearch /></Button>
                      </Form.Group>
                    </Col>
                  ) : (
                    <Col sm={4} md={4} lg={4}>
                      <label>Rut</label>
                      <AutoCompleteClientComponent
                        items={props.clients}
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
                  )}
                  <Col sm={4} md={4} lg={4}>
                    <br/>
                    <Button size="sm" size="sm" variant="danger" block={true} onClick={() => props.setIsShowModalClient(true)}>Crear Cliente <FaPlusCircle /></Button>
                  </Col>
                </Row>
                <Row>
                  <InputField
                  type='text'
                  label='Rut'
                  name='rut_client'
                  readonly={readonlyRut}
                  required={arraySaleNote.includes(props.isType) ? false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.rut_client}
                  handleChange={onChange}
                  />
                <InputField
                    type='text'
                    label='Razón Social'
                    name='business_name_client'
                    required={arraySaleNote.includes(props.isType) ? false : true}
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.business_name_client}
                    handleChange={onChange}
                  />
                {props.cotizationData.address_client_array.length > 0 ? (
                  <InputField
                    type='select'
                    label='Direccion'
                    name='address_client'
                    required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType) ? true : false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.address_client}
                    handleChange={onChange}
                  >
                    {props.cotizationData.address_client_array.map((v,i) => (
                      <option value={v} key={i}>{v}</option>
                    ))}
                  </InputField>
                ) : (
                  <InputField
                    type='text'
                    label={'Direccion'}
                    name='address_client'
                    required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType) ? true : false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.address_client}
                    handleChange={onChange}
                  />
                )}
                </Row>
                <Row>
                  <InputField
                  type='text'
                  label='Ciudad'
                  name='city_client'
                  required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType) ? true : false}
                  messageErrors={[

                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.city_client}
                  handleChange={onChange}
                  />
                <InputField
                    type='text'
                    label='Comuna'
                    name='comuna_client'
                    required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType) ? true : false}
                    messageErrors={[
                    'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.comuna_client}
                    handleChange={onChange}
                  />
                  {props.cotizationData.spin_client_array.length > 0 ? (
                    <InputField
                      type='select'
                      label='Giro'
                      name='spin_client'
                      required={true}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.spin_client}
                      handleChange={onChange}
                      >
                      <option value="">--Seleccione--</option>
                      {props.cotizationData.spin_client_array.map((v,i) => (
                        <option value={v.nombre} key={i}>{v.nombre}</option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      type='text'
                      label='Giro'
                      name='spin_client'
                      required={!props.cotizationData.type_invoicing && !arraySaleNote.includes(props.isType) ? true : false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={props.cotizationData.spin_client}
                      handleChange={onChange}
                    />
                    )}
                </Row>
                <Row>
                  {props.cotizationData.type_buy_client_array.length > 0 ? (
                      <InputField
                        type='select'
                        label='Tipo de Compra'
                        name='type_buy_client'
                        placeholder={props.cotizationData.type_invoicing ? "opcional" : ""}
                        required={props.cotizationData.type_invoicing && arraySaleNote.includes(props.isType) ? false : true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.type_buy_client}
                        handleChange={onChange}
                      >
                        <option value="">--Seleccione--</option>
                        {props.cotizationData.type_buy_client_array.map( (v,i) => (
                          <option value={v.valor.toString()} key={i}>{v.nombre}</option>
                        ))}
                      </InputField>
                    ): (
                      <InputField
                        type='text'
                        label='Tipo de Compra'
                        name='type_buy_client'
                        placeholder={props.cotizationData.type_invoicing ? "opcional" : ""}
                        required={props.cotizationData.type_invoicing && arraySaleNote.includes(props.isType) ? false : true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-4 col-lg-4 col-sm-4'
                        value={props.cotizationData.type_buy_client}
                        handleChange={onChange}
                      />
                     )}
                </Row>
                <Row>
                  <Col sm={8} md={8} lg={8}>
                    <h4 className="title_principal">Contactos Asignados al Receptor</h4>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="secondary" block={true} size="sm" type="button" onClick={props.handleModalContacts}>Contactos <FaUsers /> <FaPlusCircle /></Button>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <InputField
                  type='text'
                  label='Nombre Contacto'
                  name='name_contact'
                  required={arraySaleNote.includes(props.isType) ? false : true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.name_contact}
                  handleChange={onChange}
                  />
                  <InputField
                  type='text'
                  label='Fono'
                  name='phone_contact'
                  required={false}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.phone_contact}
                  handleChange={onChange}
                  />
                  <InputField
                  type='email'
                  label='Email'
                  name='email_contact'
                  required={false}
                  messageErrors={[
                    'Requerido*, ','Formato Email*'
                  ]}
                  cols='col-md-4 col-lg-4 col-sm-4'
                  value={props.cotizationData.email_contact}
                  handleChange={onChange}
                  />
                </Row>
                <Row>
                  <Col sm={8} md={8} lg={8}>
                    <h4 className="title_principal">Vendedor Asignado</h4>
                  </Col>
                  <Col sm={4} md={4} lg={4}>
                    <Button variant="secondary" block={true} size="sm" type="button" onClick={props.handleModalSeller}>Vendedores <FaUsers /> <FaPlusCircle /></Button>
                  </Col>
                </Row>
                <br/>
                  <Row>
                    <InputField
                    type='text'
                    label='Nombre Vendedor'
                    name='name_seller'
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.name_seller}
                    handleChange={onChange}
                    />
                    <InputField
                    type='text'
                    label='Fono Vendedor'
                    name='phone_seller'
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.phone_seller}
                    handleChange={onChange}
                    />
                    <InputField
                    type='email'
                    label='Email Vendedor'
                    name='email_seller'
                    required={false}
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={props.cotizationData.email_seller}
                    handleChange={onChange}
                    />
                  </Row>
              </Card.Body>
            ) : ''}
          </>
        )}
      </Accordion.Collapse>
    </Card>
  )
}

ClientInvoiceComponet.propTypes = {
  isType : PropTypes.string.isRequired,
  cotizationData : PropTypes.object.isRequired,
  setCotizationData : PropTypes.func.isRequired,
  setIsShowModalClient: PropTypes.func.isRequired,
  handleModalSeller: PropTypes.func.isRequired,
  handleModalContacts: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  onChange : PropTypes.func.isRequired,
}

export default ClientInvoiceComponet
