import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap'
import Table from 'components/Table'
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
import LoadingComponent from 'components/LoadingComponent'

let valueIncrementTotal = 0

const FlowCashReportGeneralPage = (props) => {

  const [years, setYears] = useState([])
  const [yearSelect, setYearSelect] = useState('')
  const [dataGeneral, setDataGeneral] = useState(null)
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    handleFetchData()
  },[])


  const handleChange = e => {
    setYearSelect(e.target.value)
    handleGetDataGeneral(e.target.value)
  }

  const handleFetchData = () => {

    axios.get(API_URL+'flow_cash_get_years').then(result => {
      setYears(result.data)

      if(result.data.length > 0){
        setYearSelect(result.data[0].year)
        handleGetDataGeneral(result.data[0].year)
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleGetDataGeneral = yearValue => {
    setDisplayLoading(true)
    axios.get(API_URL+'flow_cash_data_general/'+yearValue).then(result => {
      setDataGeneral(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const exportToExcel = () => {
    if(!dataGeneral){
      toast.error('Error, no hay datos para realizar el excel')
    }else{
      let wb = xlsx.utils.book_new()
      let bodyTable = [['','Mes1','Mes2','Mes3','Mes4','Mes5','Mes6','Mes7','Mes8','Mes9','Mes10','Mes11','Mes12','Totales']]

      wb.Props = {
        Title: "Reporte de General",
        Subject: "Exportación de Data",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Reporte General");
      let ingresoArray = dataGeneral.ingresos.map(v => formatNumber(v.total,2,',','.'))
      ingresoArray.unshift('Ingresos')
      let egresoArray = dataGeneral.egresos.map(v => formatNumber(v.total,2,',','.'))
      egresoArray.unshift('Egresos')
      let ingresoEgresoArray = dataGeneral.ingresoMenosEgreso.map(v => formatNumber(v,2,',','.'))
      ingresoEgresoArray.unshift('Ingresos - Egresos')
      let totalesArray = dataGeneral.totales.map(v => formatNumber(v,2,',','.'))
      totalesArray.unshift('Saldo Final de Caja')

      bodyTable.push(ingresoArray)
      bodyTable.push(egresoArray)
      bodyTable.push(ingresoEgresoArray)
      bodyTable.push(totalesArray)

      var ws = xlsx.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Reporte General"] = ws;
      var wbout = xlsx.write(wb, {bookType:'xlsx',  type: 'binary'});
      let datos = s2ab(wbout)
      saveAs(new Blob([datos],{type:"application/octet-stream"}), 'Reporte General'+moment().format('DD-MM-YYYY')+'.xlsx')
    }

  }

  return (
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (
        <Container className="containerDiv">
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal">Reporte General de Caja</h4>
            </Col>
          </Row>
          <hr/>
          <Row className="justify-content-center">
            <InputField
              {...props.inputSelect}
              handleChange={handleChange}
              value={yearSelect}
            >
              <option value=''>--Seleccione--</option>
              {years.map((v,i) => (
                <option key={i} value={v.year}>{v.year}</option>
              ))}
            </InputField>
            <Col sm={4} md={4} lg={4} xs={6}>
              <br/>
              <Button size="sm" variant="success" block={true} onClick={exportToExcel}>Exportar a Excel <FaRegFileExcel /></Button>
            </Col>
          </Row>
          <br/>
          {
            dataGeneral ? (

              <Row>
                <Col sm={12} md={12} lg={12} className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr style={{ backgroundColor: 'rgb(28, 33, 93)', color: 'white'}}>
                        <th className="text-center"></th>
                        <th className="text-center">Mes1</th>
                        <th className="text-center">Mes2</th>
                        <th className="text-center">Mes 3</th>
                        <th className="text-center">Mes 4</th>
                        <th className="text-center">Mes 5</th>
                        <th className="text-center">Mes 6</th>
                        <th className="text-center">Mes 7</th>
                        <th className="text-center">Mes 8</th>
                        <th className="text-center">Mes 9</th>
                        <th className="text-center">Mes 10</th>
                        <th className="text-center">Mes 11</th>
                        <th className="text-center">Mes 12</th>
                        <th className="text-center">Totales</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">

                      <tr>
                        <td><b>Total Ingreso</b></td>
                        {
                          dataGeneral.ingresos.map((v,i) => (
                            <td key={i}>{formatNumber(v.total,2,',','.')}</td>
                          ))
                        }
                      </tr>
                      <tr>
                        <td><b>Total Egreso</b></td>
                          {
                            dataGeneral.egresos.map((v,i) => (
                              <td key={i}>{formatNumber(v.total,2,',','.')}</td>
                            ))
                          }
                      </tr>
                      <tr>
                        <td><b>Ingresos - Egresos</b></td>
                          {
                            dataGeneral.ingresoMenosEgreso.map((v,i) => (
                              <td key={i}>{formatNumber(v,2,',','.')}</td>
                            ))
                          }
                      </tr>
                      <tr style={{ backgroundColor : 'rgb(244, 240, 194)', color: 'rgb(19, 20, 20)' }}>
                        <td><b>Saldo Final de Caja</b></td>
                        {
                          dataGeneral.totales.map((v,i) => (
                            <td key={i}>{formatNumber(v,2,',','.')}</td>
                          ))
                        }
                      </tr>
                    </tbody>
                  </table>
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
        </Container>
      )}
    </>
  )
}

FlowCashReportGeneralPage.defaultProps = {
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

export default FlowCashReportGeneralPage
