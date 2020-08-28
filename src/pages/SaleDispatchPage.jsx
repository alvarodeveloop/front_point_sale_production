import React, {useState,useMemo,useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Badge,
  Form
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import
import { formatNumber } from 'utils/functions'
import ModalSolvedSale from 'components/modals/ModalSolvedSale'
import ModalDetailSale from 'components/modals/ModalDetailSale'
import * as moment from 'moment-timezone'
import { showPriceWithDecimals } from 'utils/functions'
import InputField from 'components/input/InputComponent'
import 'styles/components/modalComponents.css'
import {Doughnut} from 'react-chartjs-2';
import { ARRAY_COLORS } from 'utils/constants'

let saleColumns = []

let optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  },
  hover: {
    animationDuration: 0
  },
  responsiveAnimationDuration: 0,
}

let data_donut_ss_status = {
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
};

const SaleDispatchPage = (props) => {

  const [sales,setSales] = useState([])
  const [isOpenSolvedSale,setIsOpenSolvedSale] = useState(false)
  const [saleDataOption, setSaleDataOption] = useState({})
  const [isOpenDetailSale,setIsOpenDetailSale] = useState(false)
  const [isOpenStatusDispatch,setIsOpenStatusDispatch] = useState(false)
  const [formStatus,setFormStatus] = useState({
    status_dispatch: '',
    description_dispatch: '',
    dispatch : {}
  })
  const [validated, setValidated] = useState(false)
  const [redraw,setRedraw] = useState(false)
  const [stadistics,setStadistics] = useState([])

  useEffect(() =>{
    fetchData()
    return () =>{
      saleColumns = []
      resetChartData()
    }
  },[])

  useEffect(() => {
    handleDataDonutSsStatus()
    setTimeout(function () {
      setRedraw(false)
    }, 2000);
  },[stadistics])

  useMemo(() =>{
    saleColumns = [
        {
          Header: 'Referencia',
          accessor: 'ref',
          Cell: props1 => {
            const original = props1.cell.row.original
            return (
              <Button variant="link" size="sm" onClick={() => openModalStatusDispatch(original) }>{original.ref}</Button>
            )
          }
        },
        {
          Header: 'Cliente',
          accessor: props1 => props.client ? [props1.client.name_client+' '+props1.client.data_document] : [],

        },
        {
          Header: 'Total',
          accessor: 'total',
          Cell: props1 => {
            return showPriceWithDecimals(props1.config,props1.cell.row.original.total)
          }
        },
        {
          Header: 'Status de Entrega',
          accessor: props1 => {
            if(props1.status_dispatch == 1){
              return ['Sin entregar']
            }else if(props1.status_dispatch == 2){
              return ['Entregado']
            }else if(props1.status_dispatch == 3){
              return ['Se llevo sin recepción']
            }else if(props1.status_dispatch == 4){
              return ['Retiro en Local']
            }else if(props1.status_dispatch == 5){
              return ['Anulado']
            }else{
              return ['Otro']
            }
          },
          Cell: props1 => {

            const original = props1.cell.row.original
            let val_status = ''
            if(original.status_dispatch == 1){
              val_status = 'Sin entregar'
            }else if(original.status_dispatch == 2){
              val_status = 'Entregado'
            }else if(original.status_dispatch == 3){
              val_status = 'Se llevo sin recepción'
            }else if(original.status_dispatch == 4){
              val_status = 'Retiro en Local'
            }else if(original.status_dispatch == 5){
              val_status = 'Anulado'
            }else{
              val_status = 'Otro'
            }

            if(original.status_dispatch >= 5){
              return (
                <React.Fragment>
                  <Badge variant="danger" className="font_badge">{val_status}</Badge>
                  <br/>
                  <b>Motivo:</b> {original.description_dispatch}
                </React.Fragment>
              )
            }else{
              return (<Badge variant="danger" className="font_badge">{val_status}</Badge>)
            }
          }
        },
        {
          Header: 'Status de Pago',
          accessor: props1 => {
            if(props1.status_payment_dispatch == 1){
              return ['En espera']
            }else if(props1.status_payment_dispatch == 2){
              return ['Pedido Guardado']
            }else if(props1.status_payment_dispatch == 3){
              return ['Pagado']
            }else if(props1.status_payment_dispatch == 4){
              return ['Anulado']
            }
          },
          Cell: props1 => {
            const original = props1.cell.row.original
            let val = ''
            if(original.status_payment_dispatch == 1){
              val = 'En espera'
            }else if(original.status_payment_dispatch == 2){
              val = 'Pedido Guardado'
            }else if(original.status_payment_dispatch == 3){
              val = 'Pagado'
            }else if(original.status_payment_dispatch == 4){
              val = 'Anulado'
            }
            return ( <Badge variant="secondary" className="font_badge">{val}</Badge>)
          }
        },
        {
          Header: 'Fecha',
          accessor: props1 => [props.createdAt],
          Cell: props1 =>{
            return moment(props1.cell.row.original.createdAt).format('DD-MM-YYYY HH:II:SS')
          }
        },
        {
          Header: 'Acciones',
          Cell: props1 =>{
            const { original } = props1.cell.row
            return(
              <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
                <Dropdown.Item onClick={() => openModalStatusDispatch(original) } >Cambiar Status de Entrega</Dropdown.Item>
                {
                  original.status_dispatch != 5 && original.status_payment_dispatch != 3 ? (
                    <Dropdown.Item onClick={() => solvedSale(original)} >Pagar Despacho</Dropdown.Item>
                  ) : ''
                }
                {
                  original.status_dispatch != 5 && original.status_payment_dispatch == 1 ? (
                      <Dropdown.Item onClick={() => storageDispatch(original)} >Guardar Despacho</Dropdown.Item>
                  ) : ''
                }
                {
                  original.status_payment_dispatch == 3 ? (
                      <Dropdown.Item onClick={() => printInvoice(original)} >Imprimir Factura</Dropdown.Item>
                  ) : ''
                }
              </DropdownButton>
            )
          }
        }
      ]
  })

  const handleDataDonutSsStatus = () => {

    stadistics.forEach((v, i) => {
      data_donut_ss_status.labels.push(v.name)
      data_donut_ss_status.datasets[0].data.push(parseFloat(v.total))
      data_donut_ss_status.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      data_donut_ss_status.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    setTimeout(function () {
      setRedraw(true)
    }, 500);

  }

  const  storageDispatch = data => {
    axios.put(API_URL+'sale_storage_dispatch/'+data.id).then(result =>{
      toast.success('Despacho Guardado')
      resetChartData()
      fetchData()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const openModalStatusDispatch = (data) => {
    handleOnHideFormStatus()
    setFormStatus({...formStatus, dispatch: data})
  }

  const onChangeStatusDispatch = e => {
    if(parseInt(e.target.value,10) < 5){
      setFormStatus({...formStatus, [e.target.name] : e.target.value, description_dispatch: ''})
    }else{
      setFormStatus({...formStatus, [e.target.name] : e.target.value})
    }
  }

  const printInvoice = datos => {
    window.open('/invoicePrintPage/'+datos.id,'_blank')
  }

  const solvedSale = data => {
    setSaleDataOption(data)
    setIsOpenSolvedSale(true)
  }

  const seeDetails = data => {
    setSaleDataOption(data)
    setIsOpenDetailSale(true)
  }

  const anulateSale = data => {

  }

  const fetchData = () => {
    let promise = [
      axios.get(API_URL+'sale_by_dispatch'),
      axios.get(API_URL+'sale_dispatch_stadistics'),
    ]
    Promise.all(promise).then(result => {
      setSales(result[0].data)
      setStadistics(result[1].data.delivery)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleOnhideSaleFiao = () => {
    setIsOpenSolvedSale(false)
    fetchData()
  }

  const handleOnHideFormStatus = () => {
    setIsOpenStatusDispatch(!isOpenStatusDispatch)
  }

  const handleSubmitStatus = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},formStatus)

    axios.put(API_URL+'sale_dispatch_status_delivery/'+data.dispatch.id,data).then(result => {
      toast.success('Status Modificado')
      cleanFormStatusDelivery()
      handleOnHideFormStatus()
      resetChartData()
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

  const cleanFormStatusDelivery = () => {
    setFormStatus({
      status_dispatch: '',
      description_dispatch: '',
      dispatch: {}
    })
  }

  const resetChartData = () => {
    data_donut_ss_status = {
      labels: [],
    	datasets: [{
    		data: [],
    		backgroundColor: [],
    		hoverBackgroundColor: []
    	}]
    }

  }

  return (
    <Container>
      <Row>
        <Col sm={6} md={6} lg={6}></Col>
        <Col sm={6} md={6} lg={6}>
          <h5>Totales por Status de Entrega</h5>
        </Col>
      </Row>
      <Row>
        <Col sm={4} md={4} lg={4}>
          <h4 className="title_principal">Tabla de Despachos</h4>
        </Col>
        <Col sm={8} md={8} lg={8}>
          <Doughnut data={data_donut_ss_status} redraw={redraw} options={optionsBar}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDiv">
          <Table columns={saleColumns} data={sales} />
        </Col>
      </Row>
      <ModalSolvedSale
        isShow={isOpenSolvedSale}
        onHide={handleOnhideSaleFiao}
        config={props.config}
        configStore={props.configStore}
        dataToPay={saleDataOption}
        isDispatch={true}
      />
      <ModalDetailSale
        isShow={isOpenDetailSale}
        onHide={() => setIsOpenDetailSale(false) }
        config={props.config}
        configStore={props.configStore}
        dataSale={saleDataOption}
      />
      <Modal
        show={isOpenStatusDispatch}
        onHide={handleOnHideFormStatus}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Cambiar Status del Despacho {Object.keys(formStatus.dispatch).length > 0 ? formStatus.dispatch.ref : ''}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitStatus} noValidate validated={validated}>
          <Modal.Body>
            <Row className="justify-content-center">
              <InputField
                type="select"
                name="status_dispatch"
                required={true}
                label="Status del Despacho"
                cols="col-md-6 col-sm-6 col-lg-6"
                value={formStatus.status_dispatch}
                handleChange={onChangeStatusDispatch}
                messageErrors={[
                  'Requerido*'
                ]}
              >
                <option value=''>--Seleccione--</option>
                <option value='1'>Sin Entregar</option>
                <option value='2'>Entregado</option>
                <option value='3'>Se llevo sin Recepción</option>
                <option value='4'>Retiro  en el Local</option>
                <option value='5'>Anulado</option>
                <option value='6'>Otro</option>
              </InputField>
            </Row>
            {
              formStatus.status_dispatch == 6 || formStatus.status_dispatch == 5 ? (
                <Row className="justify-content-center">
                  <InputField
                    type="textarea"
                    name="description_dispatch"
                    required={true}
                    label="Ingrese una Descripción o Motivo"
                    cols="col-md-6 col-sm-6 col-lg-6"
                    value={formStatus.description_dispatch}
                    handleChange={onChangeStatusDispatch}
                    messageErrors={[]}
                    />
                </Row>
              ) : ''
            }

          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="primary" type="submit">Guardar</Button>
            <Button size="sm" variant="danger" onClick={handleOnHideFormStatus}>Cerrar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

SaleDispatchPage.defaultProps = {
 config: JSON.parse(localStorage.getItem('configGeneral')),
 configStore: JSON.parse(localStorage.getItem('configStore')),
}

export default SaleDispatchPage
