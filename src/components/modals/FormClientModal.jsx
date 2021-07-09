
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import { FaUserCircle, FaSave, FaSearch } from 'react-icons/fa';
import { API_URL } from 'utils/constants'
import 'styles/components/modalComponents.scss';
import axios from 'axios'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { formatRut } from 'utils/functions'
import LoadingComponent from 'components/LoadingComponent'

const FormClientModal = (props) => {

  const [globalState, setGlobalState] = useState({
    validate: false,
    displayLoading: false,
    readonly: false,
    client: {
      name_client: '',
      email: '',
      type_document: 'Rut',
      data_document: '',
      phone: '',
      address: '',
      addressArray: [],
      observation: '',
      picture: '',
      city: '',
      bussines_name: "",
      comuna: '',
      spin: '',
      spinArray: [],
      purchase_type: "",
      purchaseTypeArray: []
    }
  });

  const inputRef = useRef(null)

  useEffect(() => {
    if (props.dataModify) {
      let updateClient = Object.assign({}, props.dataModify)
      setGlobalState(currentState => {
        return Object.assign({}, currentState, {
          client: {
            ...currentState.client,
            name_client: updateClient.name_client,
            email: updateClient.email,
            type_document: updateClient.type_document,
            data_document: updateClient.data_document + "-" + updateClient.dv,
            phone: updateClient.phone,
            address: updateClient.address,
            observation: updateClient.observation,
            picture: updateClient.picture,
            city: updateClient.city,
            bussines_name: updateClient.bussines_name,
            comuna: updateClient.comuna,
            spin: updateClient.spin,
            purchase_type: updateClient.purchase_type,
            addressArray: updateClient.addresses.length ? updateClient.addresses.map(v => {
              return {
                address: {
                  value: v.value,
                  text: v.text
                },
                commune: v.commune,
                city: v.city
              }
            }) : [],
            purchaseTypeArray: updateClient.purchaseTypes,
            spinArray: updateClient.spins,
            id: updateClient.id
          },
          readonly: updateClient.addresses.length ? true : false
        })
      })
    }
  }, [props.dataModify])

  const handleOnChange = e => {
    e.persist();
    if (e.target.name === "type_document") {
      let client_rut = e.target.value === "Rut" ? formatRut(Object.assign({}, globalState.client).data_document) : Object.assign({}, globalState.client).data_document.replace(/-/g, '')
      setGlobalState({
        ...globalState, client: {
          ...globalState.client,
          [e.target.name]: e.target.value, data_document: client_rut
        }
      });
    } else if (e.target.name === "data_document" && globalState.client.type_document === "Rut") {
      setGlobalState({
        ...globalState, client: {
          ...globalState.client,
          [e.target.name]: formatRut(e.target.value)
        }
      });
    } else if (e.target.name === "address") {
      let addressSelected = globalState.client.addressArray.length ? globalState.client.addressArray.find(v => v.address.value === e.target.value) : "";
      setGlobalState({
        ...globalState,
        client: {
          ...globalState.client,
          [e.target.name]: e.target.value,
          city: addressSelected ? addressSelected.city : globalState.client.addressArray.length ? "" : globalState.client.city,
          comuna: addressSelected ? addressSelected.commune : globalState.client.addressArray.length ? "" : globalState.client.commune,
        }
      });
    } else {
      setGlobalState({
        ...globalState,
        client: {
          ...globalState.client,
          [e.target.name]: e.target.value,
        }
      });
    }
  }

  const onSubmit = () => {

    const form = inputRef.current

    if (form.checkValidity() === false) {
      setGlobalState({ ...globalState, validate: true });
      return
    }

    const dataSend = Object.assign({}, globalState.client)
    setGlobalState({ ...globalState, displayLoading: true });
    if (props.dataModify) {
      axios.put(API_URL + 'client/' + dataSend.id, dataSend).then(result => {
        toast.success('Cliente Modificado')
        handleOnHide()
      }).catch(err => {
        setGlobalState({ ...globalState, displayLoading: false });
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error, contacte con soporte')
        }
      })
    } else {
      axios.post(API_URL + 'client', globalState.client).then(result => {
        toast.success('Cliente Registrado')
        handleOnHide(true)
      }).catch(err => {
        setGlobalState({ ...globalState, displayLoading: false });
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Error, contacte con soporte')
        }
      })
    }

  }

  const handleOnHide = (create = false) => {

    setGlobalState(currentState => {
      return Object.assign({}, currentState, {
        client: {
          name_client: '',
          email: '',
          type_document: 'Rut',
          data_document: '',
          phone: '',
          address: '',
          addressArray: [],
          observation: '',
          picture: '',
          city: '',
          bussines_name: "",
          comuna: '',
          spin: '',
          spinArray: [],
          purchase_type: "",
          purchaseTypeArray: [],
          id: ""
        },
        validate: false,
        readonly: false,
        displayLoading: false
      })
    })
    props.onHide(create)
  }

  const searchClient = async () => {
    if (globalState.client.data_document) {
      setGlobalState({ ...globalState, displayLoading: true });
      try {
        let rut = Object.assign({}, globalState.client).data_document;
        let dv = rut.split('-')[1];
        rut = rut.split("-")[0];
        let result = await axios.post(API_URL + "search_user_simple", {
          isRequest: true,
          rut,
          dv
        }
        );

        const receiver = result.data.receiver;
        setGlobalState(currentState => {
          return Object.assign({}, currentState, {
            client: {
              ...currentState.client,
              rut: rut + "-" + dv,
              bussines_name: receiver.businessName,
              address: receiver.addresses && receiver.addresses.length ? receiver.addresses[0].address.value : "",
              addressArray: receiver.addresses && receiver.addresses.length ? receiver.addresses : "",
              comuna: receiver.addresses && receiver.addresses.length ? receiver.addresses[0].commune : "",
              city: receiver.addresses && receiver.addresses.length ? receiver.addresses[0].city : "",
              spin: receiver.concept && receiver.concept.length ? receiver.concept[0].value : currentState.spin,
              spinArray: receiver.concept && receiver.concept.length ? receiver.concept : [],
              purchase_type: receiver.purchaseType && receiver.purchaseType.length ? receiver.purchaseType[0].value : "",
              purchaseTypeArray: receiver.purchaseType && receiver.purchaseType.length ? receiver.purchaseType : [],
              name_client: currentState.name ? currentState.name_client : receiver.businessName,
            },
            displayLoading: false,
            readonly: receiver.addresses && receiver.addresses.length ? true : false
          })
        })
      } catch (error) {
        setGlobalState({ ...globalState, displayLoading: false });
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          console.log(error);
          toast.error("Error, contacte con soporte");
        }
      }

    } else {
      toast.info("Introduzca un rut para buscar los datos del cliente");
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
          Formulario de Clientes <FaUserCircle />
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => { }} noValidate validated={globalState.validate} ref={inputRef}>
        {globalState.displayLoading ? (
          <Modal.Body>
            <LoadingComponent />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Row>
              <Col sm={12} md={12} lg={12} xs={12}>
                <Row>
                  <InputField
                    {...props.inputTypeDocument}
                    handleChange={handleOnChange}
                    value={globalState.client.type_document}
                  >
                    <option value=''>--Seleccione--</option>
                    <option value={'Rut'}>Rut</option>
                    <option value={'Id'}>Id</option>
                    <option value={'Nro pasaporte'}>N° pasaporte</option>
                  </InputField>
                  <InputField
                    {...props.inputDataDocument}
                    handleChange={handleOnChange}
                    value={globalState.client.data_document}
                  />
                  {globalState.client.type_document === "Rut" ? (
                    <Col sm={4} md={4} lg={4}>
                      <br />
                      <Button block={true} variant="secondary" type="button" size="sm" onClick={searchClient}>Buscar cliente <FaSearch /></Button>
                    </Col>
                  ) : ""}
                </Row>
                <Row>
                  <InputField
                    {...props.inputName}
                    handleChange={handleOnChange}
                    value={globalState.client.name_client}
                  />
                  <InputField
                    type="text"
                    required={false}
                    cols="col-md-4 col-sm-4 col-lg-4 col-xs-6"
                    handleChange={handleOnChange}
                    value={globalState.client.bussines_name}
                    name="bussines_name"
                    label="Razon Social"
                    placeholder="opcional"
                    messageErrors={[]}
                  />
                </Row>
                <Row>
                  <InputField
                    {...props.inputEmail}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={globalState.client.email}
                  />
                  <InputField
                    {...props.inputPhone}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={globalState.client.phone}
                  />
                  {globalState.client.addressArray.length ? (
                    <InputField
                      type="select"
                      label="Dirección"
                      name="address"
                      required={false}
                      messageErrors={["Requerido*"]}
                      cols="col-md-4 col-lg-4 col-sm-4"
                      value={globalState.client.address}
                      handleChange={handleOnChange}
                    >
                      {globalState.client.addressArray.map((v, i) => (
                        <option key={"addressKey" + i} value={v.address.value}>{v.address.text}</option>
                      ))}
                    </InputField>
                  ) : (
                    <InputField
                      {...props.inputAddress}
                      placeholder="opcional"
                      handleChange={handleOnChange}
                      value={globalState.client.address}
                    />
                  )}
                </Row>
                <Row>
                  <InputField
                    type='text'
                    label='Ciudad'
                    name='city'
                    required={false}
                    readonly={globalState.readonly}
                    placeholder="opcional"
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={globalState.client.city}
                    handleChange={handleOnChange}
                  />
                  <InputField
                    type='text'
                    label='Comuna'
                    name='comuna'
                    required={false}
                    readonly={globalState.readonly}
                    placeholder="opcional"
                    messageErrors={[
                      'Requerido*'
                    ]}
                    cols='col-md-4 col-lg-4 col-sm-4'
                    value={globalState.client.comuna}
                    handleChange={handleOnChange}
                  />
                  {globalState.client.spinArray.length ? (
                    <InputField
                      type='select'
                      label='Giro'
                      name='spin'
                      required={false}
                      placeholder="opcional"
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={globalState.client.spin}
                      handleChange={handleOnChange}
                    >
                      {globalState.client.spinArray.map((v, i) => (
                        <option value={v.value} key={"spinArray" + i}>{v.text}</option>
                      ))}
                    </InputField>
                  ) : (

                    <InputField
                      type='text'
                      label='Giro'
                      name='spin'
                      required={false}
                      placeholder="opcional"
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={globalState.client.spin}
                      handleChange={handleOnChange}
                    />
                  )}
                </Row>
                <Row>
                  <InputField
                    {...props.inputObservation}
                    handleChange={handleOnChange}
                    placeholder="opcional"
                    value={globalState.client.observation}
                  />
                  {globalState.client.purchaseTypeArray.length ? (
                    <InputField
                      type='select'
                      label='Tipo de Compra'
                      placeholder="opcional"
                      name='purchase_type'
                      required={false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={globalState.client.purchase_type}
                      handleChange={handleOnChange}
                    >
                      {globalState.client.purchaseTypeArray.map((v, i) => (
                        <option value={v.value} key={"purchaseType" + i}>{v.text}</option>
                      ))}
                    </InputField>
                  ) : (

                    <InputField
                      type='text'
                      label='Tipo de Compra'
                      placeholder="opcional"
                      name='purchase_type'
                      required={false}
                      messageErrors={[
                        'Requerido*'
                      ]}
                      cols='col-md-4 col-lg-4 col-sm-4'
                      value={globalState.client.purchase_type}
                      handleChange={handleOnChange}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button size="md" variant="danger" type="button" onClick={onSubmit}>Guardar</Button>
          <Button size="md" variant="secondary" onClick={handleOnHide}>Cerrar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

FormClientModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  dataModify: PropTypes.object,
}

FormClientModal.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name_client',
    label: 'Nombre Cliente',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputEmail: {
    type: 'email',
    required: false,
    name: 'email',
    label: 'Email',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*, ', 'Formato Tipo Email*'
    ],
  },
  inputPhone: {
    type: 'number',
    required: false,
    name: 'phone',
    label: 'Teléfono',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [],
  },
  inputAddress: {
    type: 'text',
    required: false,
    name: 'address',
    label: 'Dirección',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",

    messageErrors: [],
  },
  inputTypeDocument: {
    type: 'select',
    required: false,
    name: 'type_document',
    label: 'Tipo de Documento',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    messageErrors: [
      'Requerido*'
    ],
  },
  inputDataDocument: {
    type: 'text',
    required: false,
    name: 'data_document',
    label: 'Información Identidad',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    placeholder: 'Introduzca su rut, id o su n° de pasaporte',
    messageErrors: [
      'Requerido*'
    ],
  },
  inputObservation: {
    type: 'textarea',
    required: false,
    name: 'observation',
    label: 'Observación',
    cols: "col-sm-4 col-md-4 col-lg-4 col-xs-6",
    rows: 2,
    messageErrors: [],
  },

}

export default FormClientModal
