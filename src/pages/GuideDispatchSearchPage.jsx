import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Badge,
  Modal
} from 'react-bootstrap'
import Table from 'components/Table'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { showPriceWithDecimals } from 'utils/functions'
import { FaPlusCircle } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import layoutHelpers from 'shared/layouts/helpers'
import * as moment from 'moment-timezone'
import 'styles/components/modalComponents.css'
import { connect } from 'react-redux'
import ModalInvoiceActions from 'components/modals/ModalInvoiceActions'
import { confirmAlert } from 'react-confirm-alert'; // Import
import StadisticsInvoiceComponent from 'components/StadisticsInvoiceComponent'
import LoadingComponent from 'components/LoadingComponent'
import ModalDetailsInvoice from 'components/modals/ModalDetailsInvoice';
let cotizacionColumns = null

const GuideDispatchSearchPage = props => {

  const [displayLoading, setDisplayLoading] = useState(true)
  const [invoiceData, setInvoiceData] = useState([])
  const [cotizationDetail, setCotizationDetail] = useState({})
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
  const [redraw, setRedraw] = useState(false)
  const [statusCotization, setStatusCotization] = useState({})
  const [displayFilter,setDisplayFilter] = useState(1)
  const [dataForm, setDataForm] = useState({
    date_desde : '',
    date_hasta: '',
    type : 1
  })
  const [invoiceAction,setInvoiceAction] = useState({})
  const [isOpenModalAction,setIsOpenModalAction] = useState(false)

  useMemo(() => {
    cotizacionColumns = [
        {
          Header: 'Referencia',
          accessor: 'ref',
          Cell: props1 => {
            const {original} = props1.cell.row
            return (
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para acceder a las acciones de la guía</Tooltip>}>
                <Button variant="link" block={true} type="button" size="sm" onClick={() => onHideModalAction(original)}>{ original.ref }</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header: 'Ref Cotización',
          accessor: 'ref_cotizacion',
        },
        {
          Header: 'Rut Cliente',
          accessor: 'rut_client',
        },
        {
          Header: 'Razón Social',
          accessor: 'business_name_client',
          Cell: props1 => {
            const {original} = props1.cell.row
            return(
              <OverlayTrigger placement={'right'} overlay={
              <Tooltip id="tooltip-disabled2">
                <ul className="list-group">
                  <li className="list-group-item"><b>Contacto</b> {original.name_contact ? original.name_contact : 'No posee'}</li>
                  <li className="list-group-item"><b>Ciudad</b> {original.city_client ? original.city_client : 'No posee'}</li>
                  <li className="list-group-item"><b>Comuna</b> {original.comuna_client ? original.comuna_client : 'No posee'}</li>
                  <li className="list-group-item"><b>Comuna</b> {original.address_client ? original.address_client : 'No posee'}</li>
                  <li className="list-group-item"><b>Comentario: </b> {original.comment}</li>
                </ul>
              </Tooltip>}>
                <Button variant="link" size="sm" block={true} type="button">{original.business_name_client}</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header: 'Fecha-Emisión',
          accessor: props1 => [moment(props1.date_issue_invoice).tz('America/Santiago').format('DD-MM-YYYY')],
        },
        {
          Header: 'Status',
          accessor: props1 => {
            if(props1.status == 1){
              return (<Badge variant="secondary" className="font-badge">Pendiente</Badge>)
            }else if(props1.status == 2){
              return (<Badge variant="secondary" className="font-badge">Vencida</Badge>)
            }else if(props1.status == 3){
              return (<Badge variant="secondary" className="font-badge">Pagada</Badge>)
            }else{
              return (<Badge variant="secondary" className="font-badge">Anulada</Badge>)
            }
          },
        },
        {
          Header: 'Total Productos',
          accessor: 'total_product',
          Cell: props1 => {
            const original = props1.cell.row.original;  
            return (
              <OverlayTrigger placement={'left'} overlay={
                <Tooltip id={"tooltip-total_pagar"+original.id}>
                  <ul className="list-group">
                    {original.products.map((v,i) => (
                      <li className="list-group-item" key={i}>
                        <b>Producto</b>: {v.name_product}<br/>
                        <b>Precio</b> : {props.configGeneral ? props.configGeneral.simbolo_moneda : ""} {showPriceWithDecimals(props.configGeneral,original.total_with_iva ? v.price : v.total)}<br/>
                        <b>Cantidad</b>: {v.quantity}</li>
                    ))}
                  </ul>
                </Tooltip>}>
                  <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                    {props.configGeneral.simbolo_moneda+showPriceWithDecimals(props.configGeneral,original.total_product)}
                  </Badge>
              </OverlayTrigger>
            )
          }
        },
        {
          Header: 'Total gastos',
          accessor: 'total_gastos',
          Cell: props1 => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.total_gastos)}
              </Badge>
            )
          }
        },
        {
          Header: 'Total Iva',
          accessor: 'total_iva',
          Cell: props1 => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.total_iva)}
              </Badge>
            )
          }
        },
        {
          Header: 'Total Balance',
          accessor: 'total_balance',
          Cell: props1 => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {props.configGeneral.simbolo_moneda}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.total_balance)}
              </Badge>
            )
          }
        },
        {
          Header: 'Abonado',
          accessor: 'total_bond',
          Cell: props1 => {
            return (
              <Badge variant="danger" className="font-badge">
                {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.total_bond)}
              </Badge>

            )
          }
        },
        {
          Header: 'Saldo Deudor',
          accessor: 'debit_balance',
          Cell: props1 => {
            return (
              <Badge variant="danger" className="font-badge">
                {props.configGeneral ? props.configGeneral.simbolo_moneda : ''}{showPriceWithDecimals(props.configGeneral,props1.cell.row.original.debit_balance)}
              </Badge>

            )
          }
        },
        {
          Header: 'Productos Pagados',
          Cell: props1 => {
            const original = props1.cell.row.original
            if(original.is_products_paid){
              return (
                <Badge variant="success" className="font-badge">
                  {original.total_quantity_products_paid}/{original.total_quantity_products}
                </Badge>
              )
            }else{
              return (
                <Badge variant="danger" className="font-badge">
                  {original.total_quantity_products_paid}/{original.total_quantity_products}
                </Badge>
              )
            }
          }
        },
        {
          Header: 'Acciones',
          Cell: props1 => {
            const { original } = props1.cell.row
            return (
              <Button variant="primary" block={true} type="button" size="sm" onClick={() => onHideModalAction(original)}>Acciones</Button>
            )
          }
        }
    ]
  },[])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return () =>{
      cotizacionColumns = null
      layoutHelpers.toggleCollapsed()
    }
  },[])

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useEffect(() => {
    if(redraw){
      handleDataDonutSsStatus()
    }
  },[redraw])

  const onHideModalAction = (originalCoti = false) => {
    if(!isOpenModalAction && originalCoti){
      setInvoiceAction(originalCoti)
    }
    setIsOpenModalAction(!isOpenModalAction)
  }

  const handleDataDonutSsStatus = () => {
    setTimeout(function () {
      setRedraw(false)
    }, 2000);
  }

  const handleStadistics = () => {
    let objectPost = Object.assign({},dataForm)
    setDisplayFilter(3)
     axios.post(API_URL+'guide_stadistics',objectPost).then(result => {
      setStatusCotization({...statusCotization,statusesBonds: result.data.statusesBonds, statuses : result.data.statuses, bondsByMonth: result.data.bondsByMonth, invoiceByYear: result.data.invoiceByYear, totalByStatus: result.data.totalByStatus})
      setTimeout(function () {
        setRedraw(true)
        setDisplayFilter(1)
      }, 1000);
     }).catch(err => {
       setDisplayFilter(1)
       props.tokenExpired(err)
     })
  }

  const handleDisplayFilter = filter => {
    if(filter == 3){
      setDataForm({date_desde: '', date_hasta: ''})
    }
    setDisplayFilter(filter)
  }

  const fetchData = () => {

    let objectPost = Object.assign({},dataForm)
    let promises = [
      axios.get(API_URL+'guide'),
      axios.post(API_URL+'invoice_stadistics',objectPost),
    ]
    Promise.all(promises).then(result => {
      setInvoiceData(result[0].data)
      setStatusCotization({...statusCotization, statusesBonds: result[1].data.statusesBonds, statuses : result[1].data.statuses, bondsByMonth: result[1].data.bondsByMonth, invoiceByYear: result[1].data.invoiceByYear, totalByStatus: result[1].data.totalByStatus})
      setTimeout(function () {
        setRedraw(true)
      }, 1000);
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const goToInvoice = id  => {
    props.history.replace('/guide/guide_invoice/'+id)
  }

  const printInvoice = original => {
    toast.info('Cargando documento, espere por favor')
    window.open(original.name_pdf,"_blank")
  }

  const handleModalDetail = () => {
    setIsOpenModalDetail(!isOpenModalDetail)
  }

  const displayMehotdSale = method => {
    method = parseInt(method)
    if(method === 1){
      return "Unidad"
    }else if(method === 2){
      return "Mayorista"
    }else{
      return "(Litros, Kg, Etc..)"
    }
  }

  const seeDetailCotization = data => {
    setCotizationDetail(data)
    handleModalDetail()
  }

  const anulateInvoice = datos => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente anular este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmAnulateInvoice(datos.id);
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

  const confirmAnulateInvoice = id => {
    toast.info('Anulando factura, esto podría tardar unos segundos... espere por favor')
    setDisplayLoading(true)
    axios.put(API_URL+'guide_status/'+id).then(result => {
        toast.success('Guía anulada con éxito')
        setInvoiceAction({...invoiceAction,status: 4})
        fetchData()
     }).catch(err => {
      setDisplayLoading(false)
       props.tokenExpired(err)
    })
  }

  const goToForm = () => {
    props.history.replace('/guide/guide_create')
  }

  return (

    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Tabla de Guías</h4>
          <Button block={true} variant="success" onClick={goToForm} size="sm">Nueva Guía <FaPlusCircle /></Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center title_principal">
          <h4>Total Guías Realizadas</h4>
          <Badge variant="danger">{invoiceData.length}</Badge>
        </Col>
      </Row>
      <hr/>
      {displayLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <StadisticsInvoiceComponent
            setDataForm={setDataForm}
            dataForm={dataForm}
            redraw={redraw}
            statusCotization={statusCotization}
            handleDisplayFilter={handleDisplayFilter}
            handleStadistics={handleStadistics}
            displayFilter={displayFilter}
            configGeneral={props.configGeneral}
          />
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Table columns={cotizacionColumns} data={invoiceData}/>
            </Col>
          </Row>
        </>
      )}
      <ModalDetailsInvoice
        isOpenModalDetail={isOpenModalDetail}
        handleModalDetail={handleModalDetail}
        cotizationDetail={cotizationDetail}
        configGeneral={props.configGeneral} 
        isGuide={true}
      />
      <ModalInvoiceActions
        isShow={isOpenModalAction}
        onHide={onHideModalAction}
        cotization={invoiceAction}
        printInvoice={printInvoice}
        goToInvoice={goToInvoice}
        anulateInvoice={anulateInvoice}
        seeDetailCotization={seeDetailCotization}
        isGuide={true}
      />
    </Container>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    configGeneral: state.configs.config,
    configStore: state.configs.configStore
  }
}

GuideDispatchSearchPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configGeneral: PropTypes.object,
  configStore : PropTypes.object,
}

export default connect(mapStateToProps,{})(GuideDispatchSearchPage)
