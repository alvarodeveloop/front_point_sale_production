import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Tab,
  Tabs,
  Badge
} from 'react-bootstrap'
import {
  FaRegFileExcel
} from 'react-icons/fa'
import axios from 'axios'
import InputField from 'components/input/InputComponent'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { formatNumber, s2ab } from 'utils/functions'
import * as moment from 'moment-timezone'
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'
import Table from 'components/Table'
import TooltipComponent from 'components/TooltipComponent'
import TableEarningExpensiveComponent from 'components/TableEarningExpensiveComponent'
import LoadingComponent from 'components/LoadingComponent'
let columns_account = []

const ReportDetailCenterCoste = props => {

  const [dataDetailCenterCoste,setDataDetailCenterCoste] = useState(null)
  const [dataModalEarningExpensive,setDataModalEarningExpensive] = useState(null)
  const [years, setYears] = useState([])
  const [yearCombo, setYearCombo] = useState('')
  const [isOpenModal,setIsOpenModal] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)


  useEffect(() => {
    handleFetchData()
    return () => {
      columns_account = []
    }
  },[])

  useMemo(() => {
    columns_account = [
      {
        Header: 'CENTROS',
        accessor: 'center_coste_name'
      },
      {
        Header: 'MES 1',
        accessor: 'mes1',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes1 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,1)} variant="link"><Badge variant="danger">{ formatNumber(original.mes1,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes1,2,',','.')
          }
        }
      },
      {
        Header: 'MES 2',
        accessor: 'mes2',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes2 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,2)} variant="link"><Badge variant="danger">{ formatNumber(original.mes2,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes2,2,',','.')
          }
        }
      },
      {
        Header: 'MES 3',
        accessor: 'mes3',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes3 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,3)} variant="link"><Badge variant="danger">{ formatNumber(original.mes3,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes3,2,',','.')
          }
        }
      },
      {
        Header: 'MES 4',
        accessor: 'mes4',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes4 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,4)} variant="link"><Badge variant="danger">{ formatNumber(original.mes4,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes4,2,',','.')
          }
        }
      },
      {
        Header: 'MES 5',
        accessor: 'mes5',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes5 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,5)} variant="link"><Badge variant="danger">{ formatNumber(original.mes5,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes5,2,',','.')
          }
        }
      },
      {
        Header: 'MES 6',
        accessor: 'mes6',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes6 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,6)} variant="link"><Badge variant="danger">{ formatNumber(original.mes6,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes6,2,',','.')
          }
        }
      },
      {
        Header: 'MES 7',
        accessor: 'mes7',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes7 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,7)} variant="link"><Badge variant="danger">{ formatNumber(original.mes7,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes7,2,',','.')
          }
        }
      },
      {
        Header: 'MES 8',
        accessor: 'mes8',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes8 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,8)} variant="link"><Badge variant="danger">{ formatNumber(original.mes8,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes8,2,',','.')
          }
        }
      },
      {
        Header: 'MES 9',
        accessor: 'mes9',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes9 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,9)} variant="link"><Badge variant="danger">{ formatNumber(original.mes9,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes9,2,',','.')
          }
        }
      },
      {
        Header: 'MES 10',
        accessor: 'mes10',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes10 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,10)} variant="link"><Badge variant="danger">{ formatNumber(original.mes10,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes10,2,',','.')
          }
        }
      },
      {
        Header: 'MES 11',
        accessor: 'mes11',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes11 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,11)} variant="link"><Badge variant="danger">{ formatNumber(original.mes11,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes11,2,',','.')
          }
        }
      },
      {
        Header: 'MES 12',
        accessor: 'mes12',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes12 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,12)} variant="link"><Badge variant="danger">{ formatNumber(original.mes12,2,',','.') }</Badge></Button>
              </TooltipComponent>
            )
          }else{
            return formatNumber(original.mes12,2,',','.')
          }
        }
      },
      {
        Header: 'TOTALES',
        accessor: 'total',
        Cell: props1 => {
          return (
            <Badge style={{backgroundColor: 'rgb(36, 49, 94)', color: 'white'}}>{ formatNumber(props1.cell.row.original.total,2,',','.') }</Badge>
          )
        }
      },
    ]
  },[])

  const handleChange = e => {
    let val = e.target.value
    setYearCombo(val)
    handleGetDataDetail(val)
  }

  const handleDisplayData = (dataOriginal,month) => {

    let yearValueTemporal = document.getElementById('year').value
    let route = API_URL+'flow_cash_data_detail_center_coste_earning_expensive/'+dataOriginal.id+'/'+month+'/'+yearValueTemporal
    toast.info('Cargando datos, espere mientras abre la modal')
    setDisplayLoading(true)
    axios.get(route).then(result => {
      setDataModalEarningExpensive(result.data)
      handleIsOpenModal()
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleExportDataExcel = () => {

    if(!dataDetailCenterCoste){
      toast.error('Error, no hay datos para realizar el excel')
    }else{
      let wb = xlsx.utils.book_new()
      let bodyTable = [['','Mes1','Mes2','Mes3','Mes4','Mes5','Mes6','Mes7','Mes8','Mes9','Mes10','Mes11','Mes12','Totales']]

      wb.Props = {
        Title: "Reporte Detallado de Centro de Costos",
        Subject: "Exportación de Data",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Reporte Detallado");

      bodyTable.push(['Total Ingresos'].concat(dataDetailCenterCoste.total_ingreso.map(v => formatNumber(v,2,',','.'))))

      dataDetailCenterCoste.ingresos.forEach((v,i) => {
        bodyTable.push([
          v.center_coste_name,
          formatNumber(parseFloat(v.mes1),2,',','.'),
          formatNumber(parseFloat(v.mes2),2,',','.'),
          formatNumber(parseFloat(v.mes3),2,',','.'),
          formatNumber(parseFloat(v.mes4),2,',','.'),
          formatNumber(parseFloat(v.mes5),2,',','.'),
          formatNumber(parseFloat(v.mes6),2,',','.'),
          formatNumber(parseFloat(v.mes7),2,',','.'),
          formatNumber(parseFloat(v.mes8),2,',','.'),
          formatNumber(parseFloat(v.mes9),2,',','.'),
          formatNumber(parseFloat(v.mes10),2,',','.'),
          formatNumber(parseFloat(v.mes11),2,',','.'),
          formatNumber(parseFloat(v.mes12),2,',','.'),
          formatNumber(parseFloat(v.total),2,',','.'),
        ])
      })

      bodyTable.push([])
      bodyTable.push(['Total Egresos'].concat(dataDetailCenterCoste.total_egreso.map(v => formatNumber(v,2,',','.'))))

      dataDetailCenterCoste.egresos.forEach((v,i) => {

        bodyTable.push([
            v.center_coste_name,
            formatNumber(parseFloat(v.mes1),2,',','.'),
            formatNumber(parseFloat(v.mes2),2,',','.'),
            formatNumber(parseFloat(v.mes3),2,',','.'),
            formatNumber(parseFloat(v.mes4),2,',','.'),
            formatNumber(parseFloat(v.mes5),2,',','.'),
            formatNumber(parseFloat(v.mes6),2,',','.'),
            formatNumber(parseFloat(v.mes7),2,',','.'),
            formatNumber(parseFloat(v.mes8),2,',','.'),
            formatNumber(parseFloat(v.mes9),2,',','.'),
            formatNumber(parseFloat(v.mes10),2,',','.'),
            formatNumber(parseFloat(v.mes11),2,',','.'),
            formatNumber(parseFloat(v.mes12),2,',','.'),
            formatNumber(parseFloat(v.total),2,',','.')
        ])
      })

      bodyTable.push([])
      let ingresoEgresoArray = dataDetailCenterCoste.ingreso_menos_egreso.map(v => formatNumber(v,2,',','.'))
      ingresoEgresoArray.unshift('Ingresos - Egresos')
      let totalesArray = dataDetailCenterCoste.total_final.map(v => formatNumber(v,2,',','.'))
      totalesArray.unshift('Saldo Final de Caja')

      bodyTable.push(ingresoEgresoArray)
      bodyTable.push(totalesArray)

      var ws = xlsx.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Reporte Detallado"] = ws;
      var wbout = xlsx.write(wb, {bookType:'xlsx',  type: 'binary'});
      let datos = s2ab(wbout)
      saveAs(new Blob([datos],{type:"application/octet-stream"}), 'Reporte Detallado de Centro de Costos'+moment().format('DD-MM-YYYY')+'.xlsx')
    }

  }

 const handleFetchData = () => {

   axios.get(API_URL+'flow_cash_get_years').then(result => {

     setYears(result.data)
     if(result.data.length > 0){
       setYearCombo(result.data[0].year)
       handleGetDataDetail(result.data[0].year)
     }
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

 const handleGetDataDetail = yearValue => {
  setDisplayLoading(true)
   axios.get(API_URL+'flow_cash_data_detail_center_coste/'+yearValue).then(result => {
     setDataDetailCenterCoste(result.data)
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

 const handleIsOpenModal = () => {
   setIsOpenModal(!isOpenModal)
 }

  return (
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (
        <Container className="containerDiv">
          <br/>
          <Row className="justify-content-center">
            <InputField
              {...props.inputSelect}
              handleChange={handleChange}
              value={yearCombo}
            >
              <option value="">--Seleccione--</option>
              {years.map((v,i) => (
                <option key={i} value={v.year}>{v.year}</option>
              ))}
            </InputField>
            <Col sm={4} md={4} lg={4} xs={6}>
              <br/>
              <Button size="sm" variant="success" block={true} onClick={handleExportDataExcel}>Exportar a Excel <FaRegFileExcel /></Button>
            </Col>
          </Row>
          <hr/>
          {
            dataDetailCenterCoste ? (
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Row>
                    <Col sm={12} md={12} lg={12} className="table-responsive">
                      <h4 className="title_principal">Ingresos</h4>
                      <Table data={dataDetailCenterCoste.ingresos} columns={columns_account} />
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col sm={12} md={12} lg={12} className="table-responsive">
                      <h4 className="title_principal">Egresos</h4>
                      <Table data={dataDetailCenterCoste.egresos} columns={columns_account} />
                    </Col>
                  </Row>
                </Col>
              </Row>


            ) : (
              <Row className="justify-content-center">
                <Col sm={12} md={12} lg={12}>
                  <h4 className="text-center">Sin Ingresos o Egresos que Mostrar...</h4>
                </Col>
              </Row>
            )
          }
          <Modal
            show={isOpenModal}
            onHide={handleIsOpenModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton style={{backgroundColor: 'black', color: 'white'}}>
              <Modal.Title id="contained-modal-title-vcenter">
                Ingresos y Egresos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="earnings" id="uncontrolled-tab-example">
                <Tab eventKey="earnings" title="Ingresos">
                  {dataModalEarningExpensive ? (
                    <TableEarningExpensiveComponent data={dataModalEarningExpensive.ingresos} isAccount={false} isReport={true} />
                  ) : ''}
                </Tab>
                <Tab eventKey="expensives" title="Egresos">
                  {dataModalEarningExpensive ? (
                    <TableEarningExpensiveComponent data={dataModalEarningExpensive.egresos} isAccount={false} isReport={true} />
                  ) : '' }
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleIsOpenModal}>cerrar</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  )
}

ReportDetailCenterCoste.defaultProps = {
  inputSelect : {
    type: 'select',
    required: true,
    name: 'year',
    label : 'Año del reporte',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  }
}

export default ReportDetailCenterCoste
