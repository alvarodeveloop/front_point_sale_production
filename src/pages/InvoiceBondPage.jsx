import React, {useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {API_URL} from 'utils/constants'
import 'styles/components/modalComponents.css'
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
  Image
} from 'react-bootstrap'
import InvoiceBondComponent from 'components/InvoiceBondComponent'
import axios from 'axios'
import { toast } from 'react-toastify'
import {FaPlusCircle, FaRegFileCode , FaRegFilePdf} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'
import * as moment from 'moment-timezone'
import { confirmAlert } from 'react-confirm-alert'; // Import

import {showPriceWithDecimals, s2ab} from 'utils/functions'
import * as xlsx from 'xlsx'
import Table from 'components/Table'
import FileSaver from 'file-saver'

let bondColumns = []

const InvoiceBondPage = (props) => {
  const [invoice,setInvoice] = useState(null)
  const [bonds, setBonds] = useState([])
  const [typeBond, setTypeBond] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [validated, setValidated] = useState(false)
  const [formBond, setFormBond] = useState({
    notify_client: false,
    amount: "",
    id_type_bond: "",
    detail: "",
    date_payment_bond: moment().tz('America/Santiago').format('YYYY-MM-DD')
  })
  const [displayLoading, setDisplayLoading] = useState(false)

  let count = 0
  let id_branch = null

  useEffect(() => {
    if(count === 0){
      id_branch = props.id_branch_office
      count++
      fetchData()
    }else{
      if(id_branch !== props.id_branch_office){
        setTimeout(function () {
          props.history.replace('/invoice/invoice_search')
        }, 1500);
      }else{
        count++
        fetchData()
      }
    }
  },[props.id_branch_office])

  useEffect(() => {
    if(!props.configStore || !props.configGeneral){
      if(!props.configStore){
        toast.error('Debe hacer su configuración de tienda o seleccionar una sucursal para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
      }else if(!props.configGeneral){
        toast.error('Debe hacer su configuración general para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
      }
    }else{
      let config_general = props.configGeneral
      if(!config_general.is_syncronized){
        toast.error('Su cuenta no esta sincronizada con el SII, complete su configuración general para usar este módulo')
        setTimeout(function () {
          props.history.replace('/dashboard')
        }, 3000);
        return
      }
      fetchTypeBond()
    }
  },[])

  useMemo(() => {
    bondColumns = [
      {
        Header: 'Fecha',
        accessor: props1 => [moment(props1.date_payment_bond).format('DD-MM-YYYY')],
      },
      {
        Header: 'Detalle',
        accessor: 'detail',
      },
      {
        Header: 'Tipo de Abono',
        accessor: props1 => [props1.type_bond.name],
      },
      {
        Header: 'Monto',
        accessor: props1 => [showPriceWithDecimals(props.configGeneral,props1.amount)],
        Cell : props1 => {
          return <Badge variant="danger" className="font-badge">{props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.amount)}</Badge>
        }
      },
      {
        Header: 'Acciones',
        Cell: props1 => {
          const original = props1.cell.row.original
          return(
            <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
              <Dropdown.Item onClick={() => modifyRegisterBond(original)}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => deleteRegisterBond(original)}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  },[])

  const fetchData = () => {
    const id = props.match.params.id
    const promise = [
      axios.get(API_URL+'invoice/'+id),
    ]
    Promise.all(promise).then(result => {
      setInvoice(result[0].data)
      setBonds(result[0].data.bonds)
    }).catch(err => {
       if(err.response){
         toast.error(err.response.data.message)
       }else{
         console.log(err);
         toast.error('Error, contacte con soporte')
       }
    })
  }

  const fetchTypeBond = () => {
    axios.get(API_URL+'type_bond').then(result => {
        setTypeBond(result.data)
      }).catch(err => {
         if(err.response){
           toast.error(err.response.data.message)
         }else{
           console.log(err);
           toast.error('Error, contacte con soporte')
         }
    })
  }

  const handleSubmitBold = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let objectPost = Object.assign({},formBond,{
      id_invoice: props.match.params.id
    })

    if(objectPost.id){
      axios.put(API_URL+'invoice_bonds/'+objectPost.id,objectPost).then(result => {
        toast.success('Abono modificado con éxito')
        handleModalBond()
        fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'invoice_bonds',objectPost).then(result => {
        toast.success('Abono agregado con éxito')
        handleModalBond()
        fetchData()
      }).catch(err => {
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const handleModalBond = () => {
    if(isShow){
      setFormBond({
        notify_client: false,
        amount: "",
        id_type_bond: "",
        detail: "",
        date_payment_bond: moment().tz('America/Santiago').format('YYYY-MM-DD')
      })
    }
    setIsShow(!isShow)

  }

  const onChange = e => {
    setFormBond({...formBond, [e.target.name] : e.target.name === "notify_client" ? e.target.checked : e.target.value})
  }

  const modifyRegisterBond = datos => {
    setFormBond({
      notify_client: datos.notify_client,
      amount: datos.amount,
      id_type_bond: datos.id_type_bond,
      detail: datos.detail,
      date_payment_bond: moment(datos.date_payment_bond).tz('America/Santiago').format('YYYY-MM-DD'),
      id: datos.id
    })

    handleModalBond()
  }

  const deleteRegisterBond = datos => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(datos.id);
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

  const confirmDeleteRegister = id  => {
    axios.delete(API_URL+'invoice_bonds/'+id).then(result => {
     toast.success('Abono eliminado con éxito')
     fetchData()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const exportToExcel = () => {

    if(bonds.length < 1){
      toast.error('Error, no hay abonos para realizar el excel')
    }else{
      setDisplayLoading(true)
      let wb = xlsx.utils.book_new()
      let bodyTable = [['Fecha','Detalle','Tipo de Abono','Monto']]

      wb.Props = {
        Title: "Pagos abonados de la factura "+invoice.ref,
        Subject: "Exportación de Data",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Pagos");

      bonds.forEach((item, i) => {
        bodyTable.push([
          moment(item.date_payment_bond).format('DD-MM-YYYY'),
          item.detail,
          item.type_bond.name,
          showPriceWithDecimals(props.configGeneral,item.amount)
        ])
      });

      var ws = xlsx.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Pagos"] = ws;
      var wbout = xlsx.write(wb, {bookType:'xlsx',  type: 'binary'});
      let datos = s2ab(wbout)
      FileSaver.saveAs(new Blob([datos],{type:"application/octet-stream"}), 'Abonos de la factura '+invoice.ref+" fecha: "+moment().tz('America/Santiago').format('DD-MM-YYYY')+'.xlsx')
      setDisplayLoading(false)
    }

  }

  const exportToPdf = () => {
    if(bonds.length > 0){
      setDisplayLoading(true)
      axios.get(API_URL+'print_invoice_bonds/'+props.match.params.id,{
        responseType: 'blob'
      }).then(result => {
        FileSaver.saveAs(result.data,'Informe de los pagos de la factura: '+invoice.ref+' fecha: '+moment().tz('America/Santiago').format('DD-MM-YYYY')+".pdf")
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        if(err.response){
          toast.error(err.response.data.message)
        }else{
          console.log(err);
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      toast.error('No hay pagos para realizar el informe')
    }
  }

  const goToInvoice = () => {
    props.history.replace('/invoice/invoice_search')
  }

  const printInvoice = () => {
    setDisplayLoading(true)
    axios.get(API_URL+'invoice_print/'+props.match.params.id+"/0",).then(result => {
      window.open(API_URL+'documents/invoice/files_pdf/'+result.data.name)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err);
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={7} md={7} lg={7}>
          <h4 className="title_principal">Historial de Pagos de la Factura {invoice  ? (<Badge variant="danger" className="font-badge">{invoice.ref}</Badge>) : ''}</h4>
        </Col>
        <Col sm={5} md={5} lg={5}>
          <Button variant="primary" block={true} type="button" onClick={goToInvoice} size="sm">Volver a las Facturas</Button>
        </Col>
      </Row>
      <InvoiceBondComponent
        invoice={invoice}
        configGeneral={props.configGeneral}
        configStore={props.configStore}
      />
      <br/>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <Button variant="success" block={true} type="button" onClick={exportToExcel} size="sm">Exportar a Excel <FaRegFileCode /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button variant="success" block={true} type="button" onClick={handleModalBond} size="sm">Agregar Abono <FaPlusCircle /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button variant="success" block={true} type="button" onClick={exportToPdf} size="sm">Exportar a Pdf <FaRegFilePdf /></Button>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button variant="success" block={true} type="button" onClick={printInvoice} size="sm">Imprimir Factura <FaRegFilePdf /></Button>
        </Col>
      </Row>
      {displayLoading ? (
        <Row>
          <Col sm={12} md={12} lg={12} className="text-center">
            <br/>
            <Image src={require('../assets/img/loading.gif')} width="30" />
            <br/>
            Cargando Documento...
          </Col>
        </Row>
      ) : ''}
      <Row>
        <Col sm={12} md={12} lg={12}>
          <br/>
          <Table columns={bondColumns} data={bonds} />
        </Col>
      </Row>

      <Modal
        show={isShow}
        onHide={handleModalBond}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar Abono $
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitBold} noValidate validated={validated}>
          <Modal.Body>
            <Row>
              <InputField
               type='date'
               label='Fecha del Pago'
               name='date_payment_bond'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={formBond.date_payment_bond}
               handleChange={onChange}
              />
             <InputField
              type='select'
              label='Tipo de Abono'
              name='id_type_bond'
              required={true}
              messageErrors={[
              'Requerido*'
              ]}
              cols='col-md-4 col-lg-4 col-sm-4'
              value={formBond.id_type_bond}
              handleChange={onChange}
              >
              <option value="">--Seleccione--</option>
              {typeBond.map((v,i) => (
                <option value={v.id} key={i}>{v.name}</option>
              ))}
            </InputField>
              <InputField
               type='number'
               step="any"
               label='Monto'
               name='amount'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={formBond.amount}
               handleChange={onChange}
               />
            </Row>
            <Row>
              <InputField
               type='text'
               label='Detalle'
               name='detail'
               required={true}
               messageErrors={[
               'Requerido*'
               ]}
               cols='col-md-4 col-lg-4 col-sm-4'
               value={formBond.detail}
               handleChange={onChange}
               />
              <Col sm={4} md={4} lg={4}>
                <br/>
                <Form.Group>
                  <Form.Check
                    name="notify_client"
                    type={'checkbox'}
                    id={`checkbox-1`}
                    label={`Notificar al Cliente`}
                    checked={formBond.notify_client}
                    onChange={onChange}
                    />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button size="md" type="submit" variant="primary"  disabled={disableButton}>Enviar</Button>
            <Button size="md" variant="secondary" onClick={handleModalBond} disabled={disableButton}>cerrar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}


function mapStateToProps(state){
  return {
    id_branch_office: state.enterpriseSucursal.id_branch_office,
    configGeneral : state.configs.config,
    configStore: state.configs.configStore
  }
}

export default connect(mapStateToProps,{})(InvoiceBondPage)
