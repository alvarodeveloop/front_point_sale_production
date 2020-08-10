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
  Tabs
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
let columns_account = []

const ReportDetailAccount = props => {

  const [dataDetailAccount,setDataDetailAccount] = useState(null)
  const [dataModalEarningExpensive,setDataModalEarningExpensive] = useState(null)
  const [years, setYears] = useState([])
  const [yearCombo, setYearCombo] = useState(null)
  const [isOpenModal,setIsOpenModal] = useState(false)


  useEffect(() => {
    handleFetchData()
    return () => {
      columns_account = []
    }
  },[])

  useMemo(() => {
    columns_account = [
      {
        Header: 'Cuenta',
        accessor: 'account_name'
      },
      {
        Header: 'Mes 1',
        accessor: 'mes1',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes1 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,1)} variant="link" style={{color: 'red'}}>{ original.mes1 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes1
          }
        }
      },
      {
        Header: 'Mes 2',
        accessor: 'mes2',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes2 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,2)} variant="link" style={{color: 'red'}}>{ original.mes2 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes2
          }
        }
      },
      {
        Header: 'Mes 3',
        accessor: 'mes3',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes3 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,3)} variant="link" style={{color: 'red'}}>{ original.mes3 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes3
          }
        }
      },
      {
        Header: 'Mes 4',
        accessor: 'mes4',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes4 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,4)} variant="link" style={{color: 'red'}}>{ original.mes4 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes4
          }
        }
      },
      {
        Header: 'Mes 5',
        accessor: 'mes5',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes5 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,5)} variant="link" style={{color: 'red'}}>{ original.mes5 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes5
          }
        }
      },
      {
        Header: 'Mes 6',
        accessor: 'mes6',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes6 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,6)} variant="link" style={{color: 'red'}}>{ original.mes6 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes6
          }
        }
      },
      {
        Header: 'Mes 7',
        accessor: 'mes7',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes7 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,7)} variant="link" style={{color: 'red'}}>{ original.mes7 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes7
          }
        }
      },
      {
        Header: 'Mes 8',
        accessor: 'mes8',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes8 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,8)} variant="link" style={{color: 'red'}}>{ original.mes8 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes8
          }
        }
      },
      {
        Header: 'Mes 9',
        accessor: 'mes9',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes9 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,9)} variant="link" style={{color: 'red'}}>{ original.mes9 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes9
          }
        }
      },
      {
        Header: 'Mes 10',
        accessor: 'mes10',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes10 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,10)} variant="link" style={{color: 'red'}}>{ original.mes10 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes10
          }
        }
      },
      {
        Header: 'Mes 11',
        accessor: 'mes11',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes11 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,11)} variant="link" style={{color: 'red'}}>{ original.mes11 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes11
          }
        }
      },
      {
        Header: 'Mes 12',
        accessor: 'mes12',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.mes12 > 0){
            let word = original.type ? 'ingreso' : 'egresos'
            return(
              <TooltipComponent title={"Hacer click para ver los "+word+" del mes"}>
                <Button size="sm" onClick={() => handleDisplayData(original,12)} variant="link" style={{color: 'red'}}>{ original.mes12 }</Button>
              </TooltipComponent>
            )
          }else{
            return original.mes12
          }
        }
      },
      {
        Header: 'Totales',
        accessor: 'total',
        Cell: props1 => {
          return (
            <span style={{ color : 'blue'}}>{ props1.cell.row.original.total }</span>
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
    let route = API_URL+'flow_cash_data_detail_account_earning_expensive/'+dataOriginal.id+'/'+month+'/'+yearValueTemporal
    toast.info('Cargando datos, espere mientras abre la modal')
    axios.get(route).then(result => {
      setDataModalEarningExpensive(result.data)
      console.log(result.data,'aqui');
      handleIsOpenModal()
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const handleExportDataExcel = () => {

    if(!dataDetailAccount){
      toast.error('Error, no hay datos para realizar el excel')
    }else{
      let wb = xlsx.utils.book_new()
      let bodyTable = [['','Mes1','Mes2','Mes3','Mes4','Mes5','Mes6','Mes7','Mes8','Mes9','Mes10','Mes11','Mes12','Totales']]

      wb.Props = {
        Title: "Reporte de Detallado de Cuentas",
        Subject: "Exportación de Data",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Reporte Detallado");

      bodyTable.push(['Total Ingresos'].concat(dataDetailAccount.total_ingreso.map(v => formatNumber(v,2,',','.'))))

      dataDetailAccount.ingresos.forEach((v,i) => {
        bodyTable.push([
          v.account_name,
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
      bodyTable.push(['Total Egresos'].concat(dataDetailAccount.total_egreso.map(v => formatNumber(v,2,',','.'))))

      dataDetailAccount.egresos.forEach((v,i) => {

        bodyTable.push([
            v.account_name,
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
      let ingresoEgresoArray = dataDetailAccount.ingreso_menos_egreso.map(v => formatNumber(v,2,',','.'))
      ingresoEgresoArray.unshift('Ingresos - Egresos')
      let totalesArray = dataDetailAccount.total_final.map(v => formatNumber(v,2,',','.'))
      totalesArray.unshift('Saldo Final de Caja')

      bodyTable.push(ingresoEgresoArray)
      bodyTable.push(totalesArray)

      var ws = xlsx.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Reporte Detallado"] = ws;
      var wbout = xlsx.write(wb, {bookType:'xlsx',  type: 'binary'});
      let datos = s2ab(wbout)
      saveAs(new Blob([datos],{type:"application/octet-stream"}), 'Reporte Detallado de Cuentas'+moment().format('DD-MM-YYYY')+'.xlsx')

    }

  }

 const handleFetchData = () => {

   axios.get(API_URL+'flow_cash_get_years').then(result => {

     setYears(result.data)
     if(result.data.length > 0){
       setYearCombo(result.data[0].year)
       handleGetDataDetail(result.data[0].year)
     }
   }).catch(err => {
     if(err.response){
       toast.error(err.response.data.message)
     }else{
       console.log(err);
       toast.error('Error, contacte con soporte')
     }
   })
 }

 const handleGetDataDetail = yearValue => {

   axios.get(API_URL+'flow_cash_data_detail_account/'+yearValue).then(result => {
     setDataDetailAccount(result.data)
   }).catch(err => {
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
    <Container className="containerDiv">
      <Row className="justify-content-center">
        <InputField
          {...props.inputSelect}
          handleChange={handleChange}
          value={yearCombo}
        >
          <option value={2021}>2021</option>
          {years.map((v,i) => (
            <option key={i} value={v.year}>{v.year}</option>
          ))}
        </InputField>
        <Col sm={4} md={4} lg={4} xs={6}>
          <br/>
          <Button size="sm" variant="success" block={true} onClick={handleExportDataExcel}>Exportar a Excel <FaRegFileExcel /></Button>
        </Col>
      </Row>
      {
        dataDetailAccount ? (
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Row>
                <Col sm={12} md={12} lg={12} className="table-responsive">
                  <h4>Ingresos</h4>
                  <Table data={dataDetailAccount.ingresos} columns={columns_account} />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col sm={12} md={12} lg={12} className="table-responsive">
                  <h4>Egresos</h4>
                  <Table data={dataDetailAccount.egresos} columns={columns_account} />
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
                <TableEarningExpensiveComponent data={dataModalEarningExpensive.ingresos} isAccount={true} isReport={true} />
              ) : ''}
            </Tab>
            <Tab eventKey="expensives" title="Egresos">
              {dataModalEarningExpensive ? (
                <TableEarningExpensiveComponent data={dataModalEarningExpensive.egresos} isAccount={true} isReport={true} />
              ) : '' }
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleIsOpenModal}>cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

ReportDetailAccount.defaultProps = {
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

export default ReportDetailAccount
