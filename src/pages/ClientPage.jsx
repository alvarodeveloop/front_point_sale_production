import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  Badge,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import {s2ab} from 'utils/functions'
import Table from 'components/Table'
import FormClientModal from 'components/modals/FormClientModal'
import { confirmAlert } from 'react-confirm-alert'; // Import
import {FaFileExcel, FaPlusCircle} from 'react-icons/fa'
import layoutHelpers from 'shared/layouts/helpers'
import LoadingComponent from 'components/LoadingComponent'
import * as XLSX from "xlsx";
import * as moment from "moment-timezone";
import FileSaver from 'file-saver'

import { connect } from 'react-redux'

let columns_client = []

const ClientPage = (props) => {

  const [clients, setClients] = useState([])
  const [clientUpdate, setClientUpdate] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useEffect(() => {
    layoutHelpers.toggleCollapsed()
    return() => {
      layoutHelpers.toggleCollapsed()
      columns_client = []
    }
  },[])

  useMemo(() => {
    columns_client = [
        {
          Header:'Nombre',
          accessor: 'name_client',
          Cell: props1 => {
            const {original} = props1.cell.row
            return(
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled2">Hacer click para modificar al cliente</Tooltip>}>
                <Button variant="link" block={true} type="button" size="sm" onClick={() => modifyRegister(original)}>{ original.name_client }</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header:'Razón Social',
          accessor: 'bussines_name'
        },
        {
          Header:'Email',
          accessor: 'email'
        },
        {
          Header:'Teléfono',
          accessor: 'phone'
        },
        {
          Header:'Dirección',
          accessor: props1 => [props1.city+" "+props1.comuna+" "+props1.address],
          Cell : props1 => {
            const original = props1.cell.row.original;
            return (
              <OverlayTrigger placement={'right'} overlay={
                <Tooltip id={"tooltip-right"}>
                  <ul className="list-group">
                      <li className="list-group-item"><b>Ciudad</b>: {original.city}</li>
                      <li className="list-group-item"><b>Comuna</b>: {original.comuna}</li>
                      <li className="list-group-item"><b>Dirección</b>: {original.address}</li>
                  </ul>
                </Tooltip>
              }>
                <Button sm="sm" type="button" variant="link" block={true}>Dirección</Button>
              </OverlayTrigger>
            )
          }
        },
        {
          Header:'Id',
          accessor: props1 => [props1.type_document+' '+props1.data_document+""],
          Cell : props1 => {
            const original = props1.cell.row.original;
            return (<span>
                    {original.type_document} 
                    <br/>
                    {original.data_document}{original.type_document === "Rut" ? "-"+original.dv : ""}
                </span>)
          }
        },
        {
          Header: 'Acciones',
          Cell: props1 => {
            const id = props1.cell.row.original.id
            return(
              <DropdownButton size="sm" id={'drop'+id} title="Seleccione" drop="left"  block="true">
                <Dropdown.Item onClick={() => modifyRegister(props1.cell.row.original)}>Modificar</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
              </DropdownButton>
            )
          }
        }
    ]
  },[])

  const fetchData = () => {
    axios.get(API_URL+'client').then(result => {
      setClients(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const handleModalHide = (create = false) => {
    setIsOpenModal(!isOpenModal)
    if(clientUpdate){
      setClientUpdate(null)
      fetchData()
    }else if(create){
      fetchData()
    }
  }

  const modifyRegister = data => {
    setClientUpdate(data)
    handleModalHide()
  }

  const deleteRegister = id => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(id);
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

  const confirmDeleteRegister = id => {
    setDisplayLoading(true)
    axios.delete(API_URL+'client/'+id).then(result => {
      toast.success('Proceso completado')
      fetchData()
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const importClientsHandlder = () => {
    document.getElementById("input_hidden").click()
  }

  const onChangeFileInputHandler = e => {
    setDisplayLoading(true)
    let f = e.target.files[0]
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {header:0});
        handleRequestExcel(data)
    };
    reader.readAsBinaryString(f);
  }

  const handleRequestExcel = (data) => {
    axios.post(API_URL+"uploadClientExcel",data).then(result => {
      setDisplayLoading(false);
      toast.success("Números de clientes importados con éxito: "+result.data.cantidad);
      fetchData();
    }).catch(err => {
      setDisplayLoading(false);
      if(err.response){
        toast.error(err.response.data.message);
      }else{
        console.log(err);
        toast.error("Error, contacte con soporte");
      }
    })
  }

  const downloadExcelUploadTemplate = () => {
    window.open(API_URL+"documents/client/upload_client.xlsx","_blank");
  }

  const exportClientsHandler = () => {
    if(!clients.length){
      toast.error('Error, no hay datos para realizar el excel')
    }else{
      let enterprise = props.enterpriseSucursal.enterprises.find(v => v.id == props.id_enterprise);
      let brachOffice = props.enterpriseSucursal.branchOffices.find(v => v.id == props.id_branch_office);
      
      let wb = XLSX.utils.book_new()
      let bodyTable = [['Tipo documento','Número documento','Nombre cliente','Razon social','Email','Teléfono','Dirección','Ciudad','Comuna','Giro','Observación','Actividad Económica']]
      let nameTitle  = `Clientes de la empresa (${enterprise.bussines_name}) - Sucursal (${brachOffice.name})`;
      wb.Props = {
        Title: nameTitle,
        Subject: "Exportación de Clientes",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Clientes");

      clients.forEach((item, i) => {
        let number_document = item.type_document === "Rut" ? item.data_document+"-"+item.dv : item.data_document;
        bodyTable.push([
          item.type_document,
          number_document,
          item.name_client,
          item.bussines_name,
          item.email,
          item.phone,
          item.address,
          item.city,
          item.comuna,
          item.spin,
          item.actividad_economica,
        ])
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Clientes"] = ws;
      var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      let datos = s2ab(wbout)
      FileSaver.saveAs(new Blob([datos],{type:"application/octet-stream"}), nameTitle+"/"+moment().format('DD-MM-YYYY')+'.xlsx')
    }

  }

  return (
    <>
      {displayLoading ? (
        <Container>
          <LoadingComponent />
        </Container>
      ) : (
        <Container fluid={true}>
          <Row className="">
            <Col sm={6} md={6} lg={6}>
              <h4 className="title_principal">Tabla de Clientes</h4>
            </Col>
            <Col sm={6} md={6} lg={6} className="text-center">
              <h4 className="title_principal">Total Clientes</h4>
              <Badge variant="danger">{clients.length}</Badge>
            </Col>
          </Row>
          <Row>
            <Col sm={3} md={3} lg={3}>
              <Button variant="success" block={true} size="sm" onClick={handleModalHide} type="button">Crear Cliente <FaPlusCircle /></Button>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <DropdownButton size="sm" id={'drop_excel'} variant="success" title={(<span>Acciones de Excel <FaFileExcel /></span>)} drop="down"  style={{width: "100%"}}>
                <Dropdown.Item onClick={downloadExcelUploadTemplate}>Descargar plantilla para importar</Dropdown.Item>
                <Dropdown.Item onClick={importClientsHandlder}>Importar Clientes</Dropdown.Item>
                <Dropdown.Item onClick={exportClientsHandler}>Exportar Clientes</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <input type="file" id="input_hidden" accept=".xlsx, .xls" onChange={onChangeFileInputHandler} style={{display : "none"}} />
            </Col>
          </Row>
          <Row className="">
            <Col sm={12} md={12} lg={12}>
              <Table data={clients} columns={columns_client} />
            </Col>
          </Row>
          <FormClientModal
            isShow={isOpenModal}
            onHide={handleModalHide}
            dataModify={clientUpdate}
          />
        </Container>
      )}
    </>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    enterpriseSucursal: state.enterpriseSucursal
  }
}

ClientPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  enterpriseSucursal : PropTypes.object,
}

export default connect(mapStateToProps,{})(ClientPage)
