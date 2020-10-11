import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Badge,
  Accordion,
  Card,
  Modal
} from 'react-bootstrap'
import Table from 'components/Table'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { showPriceWithDecimals } from 'utils/functions'
import { FaPlusCircle, FaChartLine } from "react-icons/fa";
import FileSaver from 'file-saver'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import layoutHelpers from 'shared/layouts/helpers'
import * as moment from 'moment-timezone'
import { formatNumber } from 'utils/functions'
import 'styles/components/modalComponents.css'
let cotizacionColumns = null

const CotizacionSearchPage = props => {

  const [cotizacionData, setCotizacionData] = useState([])
  const [cotizationDetail, setCotizationDetail] = useState({})
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)

  useMemo(() => {
    cotizacionColumns = [
        {
          Header: 'Referencia',
          accessor: 'ref',
          Cell: props1 => {
            const {original} = props1.cell.row
            if(original.status < 3){
              return (
                <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para modificar</Tooltip>}>
                  <Button size="sm" variant="link" block={true} onClick={() => updateCotizacion(original.id)}>{ original.ref } </Button>
                </OverlayTrigger>
              )
            }else{
              return original.ref
            }
          }
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
                  <li className="list-group-item"><b>Vendedor: </b> {original.name_seller}</li>
                  <li className="list-group-item"><b>Fono del Vendedor: </b> {original.phone_seller ? original.phone_seller : 'No posee'}</li>
                  <li className="list-group-item"><b>Contacto</b> {original.name_contact ? original.name_contact : 'No posee'}</li>
                  <li className="list-group-item"><b>Fono del Contacto: </b> {original.phone_contact}</li>
                  <li className="list-group-item"><b>Comentario: </b> {original.comment}</li>
                </ul>
              </Tooltip>}>
                <Button variant="link" size="sm" block={true} type="button">{original.business_name_client}</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header: 'Tipo',
          accessor: props1 => props1.type_effect == 1 ? ['Afecta'] : ['Excento'],
        },
        {
          Header: 'Fecha-Emisión',
          accessor: props1 => [moment(props1.date_issue).format('DD-MM-YYYY')],
        },
        {
          Header: 'Fecha Vencimiento',
          accessor: props1 => [moment(props1.date_expiration).format('DD-MM-YYYY')],
        },
        {
          Header: 'Status',
          accessor: props1 => props1.status === 1 ? ['Pendiente'] : props1.status === 2 ? ['Aprobado'] : props1.status === 3 ? ['Facturado'] : ['Anulada'] ,
          Cell: props1 => {
            const { original } = props1.cell.row
            if(original.status === 1){
              return (
                <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para cambiar el Status</Tooltip>}>
                  <Button variant="secondary" block={true} size="sm" onClick={() => changeStatus(original.id,2)}>Pendiente</Button>
                </OverlayTrigger>
              )
            }else if(original.status === 2){
              return (
                <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para cambiar el Status</Tooltip>}>
                  <Button variant="secondary" block={true} size="sm" onClick={() => changeStatus(original.id,1)}>Aprobada</Button>
                </OverlayTrigger>
              )
            }else if(original.status === 3){
              return (<Badge variant="primary" className="font-badge">Facturada</Badge>)
            }else{
              return (<Badge variant="danger" className="font-badge">Anulada</Badge>)
            }
          }
        },
        {
          Header: 'Total Productos',
          accessor: 'total_product',
          Cell: props => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_product)}
              </Badge>

            )
          }
        },
        {
          Header: 'Total gastos',
          accessor: 'total_gastos',
          Cell: props => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_gastos)}
              </Badge>
            )
          }
        },
        {
          Header: 'Total Iva',
          accessor: 'total_iva',
          Cell: props => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_iva)}
              </Badge>
            )
          }
        },
        {
          Header: 'Total Balance',
          accessor: 'total_balance',
          Cell: props => {
            return (
              <Badge variant="info" className="font-badge" style={{backgroundColor: "rgb(198, 196, 54)", color: "white"}}>
                {showPriceWithDecimals(props.configGeneral,props.cell.row.original.total_balance)}
              </Badge>
            )
          }
        },
        {
          Header: 'Acciones',
          Cell: props => {
            const { original } = props.cell.row
            if(original.status === 1){
              return (
                <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => updateCotizacion(original.id)}>Modificar</Dropdown.Item>
                  <Dropdown.Item onClick={() => seeDetailCotization(original)}>Ver detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(original.id,2)}>Aprobar</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(original.id,4)}>Anular</Dropdown.Item>
                </DropdownButton>
              )
            }else if(original.status === 2){
              return (
                <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => updateCotizacion(original.id)}>Modificar</Dropdown.Item>
                  <Dropdown.Item onClick={() => seeDetailCotization(original)}>Ver Detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => goToFacturation(original.id)}>Facturar</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(original.id,1)}>Pendiente</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(original.id,4)}>Anular</Dropdown.Item>
                </DropdownButton>
              )
            }else if(original.status === 3){
              return (
                <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => seeDetailCotization(original)}>Ver detalle</Dropdown.Item>
                  <Dropdown.Item onClick={() => {}}>Imprimir</Dropdown.Item>
                </DropdownButton>
              )
            }else{
              return (
                <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
                  <Dropdown.Item onClick={() => seeDetailCotization(original)}>Ver detalle</Dropdown.Item>
                </DropdownButton>
              )
            }
          }
        }
    ]
  },[])

  useEffect(() => {
    fetchData()
    layoutHelpers.toggleCollapsed()
    return () =>{
      cotizacionColumns = null
      layoutHelpers.toggleCollapsed()
    }
  },[])

  const fetchData = () => {
    axios.get(API_URL+'cotizacion').then(result => {
      setCotizacionData(result.data)
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const updateCotizacion = id => {
    props.history.replace('/quotitation/create_quotitation/'+id)
  }

  const deleteCotizacion = id => {
    axios.delete(API_URL+'cotizacion/'+id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.messsage)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const goToForm = () => {
    props.history.replace('/quotitation/create_quotitation')
  }

  const printCotizacion = id => {
    axios.get(API_URL+'cotizacion_print/'+id,{
      responseType: 'blob'
    }).then(result => {
      FileSaver.saveAs(result.data,'test.pdf')
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const changeStatus = (id,status) => {
   let objectStatus = {
     status
   }
   axios.put(API_URL+'cotizacion_status/'+id,objectStatus).then(result => {
    toast.success('Status Cambiado')
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

  const goToFacturation = id => {
    props.history.replace('/quotitation/invoicing/'+id)
  }

  return (

    <Container fluid>
      <Row>
        <Col sm={6} md={6} lg={6} className="text-center">
          <h4 className="title_principal">Tabla de Cotizaciones</h4>
          <Button block={true} variant="success" onClick={goToForm} size="sm">Nueva Cotización <FaPlusCircle /></Button>
        </Col>
        <Col sm={6} md={6} lg={6} className="text-center title_principal">
          <h4>Total Cotizaciones Realizadas</h4>
          <Badge variant="danger">{cotizacionData.length}</Badge>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12}>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" className="header_card">
                <b>Estadísticas</b> <FaChartLine />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12}>
          <Table columns={cotizacionColumns} data={cotizacionData}/>
        </Col>
      </Row>
      <Modal
        show={isOpenModalDetail}
        onHide={handleModalDetail}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton className="header_dark">
          <Modal.Title id="contained-modal-title-vcenter">
            Detalles de la Cotización N° {Object.keys(cotizationDetail).length > 0 ? cotizationDetail.ref : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">Datos del Registrador</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Rut</th>
                    <th className="text-center">Dirección</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">País</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{cotizationDetail.business_name_transmitter}</td>
                      <td>{cotizationDetail.rut_transmitter}</td>
                      <td>{cotizationDetail.address_transmitter}</td>
                      <td>{cotizationDetail.email_transmitter}</td>
                      <td>{cotizationDetail.phone_transmitter}</td>
                      <td>{cotizationDetail.country_transmitter}</td>
                    </tr>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">Datos del Cliente</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Razon Social / Nombre</th>
                    <th className="text-center">Rut</th>
                    <th className="text-center">Dirección</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{cotizationDetail.business_name_client}</td>
                      <td>{cotizationDetail.rut_client}</td>
                      <td>{cotizationDetail.address_client}</td>
                    </tr>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">Datos del Contacto</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">Email</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{cotizationDetail.name_contact}</td>
                      <td>{cotizationDetail.phone_contact}</td>
                      <td>{cotizationDetail.email_contact}</td>
                    </tr>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal text-center">Datos del Vendedor</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Fono</th>
                    <th className="text-center">Email</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <tr>
                      <td>{cotizationDetail.name_seller}</td>
                      <td>{cotizationDetail.phone_seller}</td>
                      <td>{cotizationDetail.email_seller}</td>
                    </tr>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12} className="table-responsive">
              <h4 className="title_principal text-center">Productos de la Cotización</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Categoria</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Descripción</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Descuento</th>
                    <th className="text-center">Método de Venta</th>
                    <th className="text-center">Neto</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <React.Fragment>
                      {cotizationDetail.products.map((v,i) => (
                        <tr>
                          <td>{v.category}</td>
                          <td>{v.name_product}</td>
                          <td>{v.description}</td>
                          <td>{v.quantity}</td>
                          <td>{formatNumber(v.price,2,',','.')}</td>
                          <td>{v.discount}</td>
                          <td>{displayMehotdSale(v.method_sale)}</td>
                          <td>{v.is_neto ? 'Neto' : "Iva"}</td>
                          <td><Badge variant="danger" className="font-badge">{formatNumber(v.total,2,',','.')}</Badge></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12} className="">
              <h4 className="title_principal text-center">Gastos de la Cotización</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Descripción</th>
                    <th className="text-center">Monto</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <React.Fragment>
                      {cotizationDetail.gastos.map((v,i) => (
                        <tr>
                          <td>{v.description}</td>
                          <td><Badge variant="danger" className="font-badge">{formatNumber(v.amount,2,',','.')}</Badge></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          {Object.keys(cotizationDetail).length > 0 && cotizationDetail.referencias.length > 0 ? (
            <Row>
              <Col sm={12} md={12} lg={12} className="">
                <h4 className="title_principal text-center">Referencias de la Cotización</h4>
                <br/>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Tipo de Documento</th>
                      <th className="text-center">Referencia Cotiz.</th>
                      <th className="text-center">Ind</th>
                      <th className="text-center">Fecha Ref.</th>
                      <th className="text-center">Razón de Referencia</th>
                      <th className="text-center">Tipo de Código</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {Object.keys(cotizationDetail).length > 0 ? (
                      <React.Fragment>
                        {cotizationDetail.referencias.map((v,i) => (
                          <tr>
                            <td>{v.type_document}</td>
                            <td>{v.ref_cotizacion}</td>
                            <td>{v.ind}</td>
                            <td>{v.date_ref ? moment(v.date_ref).tz('America/Santiago').format('DD-MM-YYYY') : ''}</td>
                            <td>{v.reason_ref}</td>
                            <td>{v.type_code}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ) : ''}
                  </tbody>
                </table>
              </Col>
            </Row>
          ) : ''}
          <Row>
            <Col sm={12} md={12} lg={12} className="">
              <h4 className="title_principal text-center">Totales</h4>
              <br/>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Total Neto</th>
                    <th className="text-center">Total Iva</th>
                    <th className="text-center">Total Gastos</th>
                    <th className="text-center">Total Balance</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(cotizationDetail).length > 0 ? (
                    <tr>
                      <td><Badge variant="danger" className="font-badge">{formatNumber(cotizationDetail.total_product,2,',','.')}</Badge></td>
                      <td><Badge variant="danger" className="font-badge">{formatNumber(cotizationDetail.total_iva,2,',','.')}</Badge></td>
                      <td><Badge variant="danger" className="font-badge">{formatNumber(cotizationDetail.total_gastos,2,',','.')}</Badge></td>
                      <td><Badge variant="danger" className="font-badge">{formatNumber(cotizationDetail.total_balance,2,',','.')}</Badge></td>
                    </tr>
                  ) : ''}
                </tbody>
              </table>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12}>
              {Object.keys(cotizationDetail).length > 0 ? (
                <h5>Mostrar solo los Totales: <Badge variant="primary" className="font-badge">{cotizationDetail.total_with_iva ? 'No' : "Si"}</Badge></h5>
              ) : ''}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="secondary" onClick={handleModalDetail}>cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

CotizacionSearchPage.defaultProps = {
  configGeneral: JSON.parse(localStorage.getItem('configGeneral')),
}

export default CotizacionSearchPage
