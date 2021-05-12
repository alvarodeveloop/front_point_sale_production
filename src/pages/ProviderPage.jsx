import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';
import FileSaver from 'file-saver';
import { s2ab } from 'utils/functions';

import 'styles/components/modalComponents.css'
import { FaUser, FaFileExcel } from 'react-icons/fa'
import { connect } from 'react-redux'
import LoadingComponent from 'components/LoadingComponent'

const ProviderPage = (props) => {

  const [provider,setProvider] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [directionRegister,setDirectionRegister] = useState('');
  const [displayLoading, setDisplayLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchData(true);
  },[props.id_enterprise]);

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
  };

  const confirmDeleteRegister = id => {
    setDisplayLoading(true)
    axios.delete(API_URL+'provider/'+id).then(result => {
      toast.success('Registro eliminado con éxito');
      fetchData();
    }).catch(err => {
      setDisplayLoading(false);
      props.tokenExpired(err);
    });
  };

  const modifyRegister = id => {
    props.history.replace('/provider/form/'+btoa(id))
  }

  const fetchData = (country = false) => {
    let promiseArray = [
      axios.get(API_URL+'provider'),
    ];

    if(country) promiseArray.push(axios.get(API_URL+'country'));

    Promise.all(promiseArray).then(result => {
      setProvider(result[0].data);
      if(country){
        setCountries(result[1].data);
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const goToForm = () => {
    props.history.replace('/provider/form')
  }

  const createRepresent = data => {
    props.history.replace('/provider/represent/'+data.id)
  }

  const onHide = () => {
    setIsOpen(false)
  }

  const donwloandExcel = async () => {
    window.open(API_URL+"documents/providers/cargar_proveedores.xlsx",'_blank') 
    let msgInfo = (
      <>
        <span>Debe llenar el excel con los datos y después cargar el archivo en la opción de cargar o editar proveedores</span>
        <br/><br/>
        <ul>
          <li>El campo razon social</li>
          <li>EL campo tipo identificación</li>
          <li>EL campo Id</li>
        </ul>
        <span style={{marginTop: "-10px"}}>Son requeridos</span> <br/>
        <span>Si el tipo de identificación es rut debe ingresar el id con el guión para separar el dv</span>
      </>
    );
    toast.info(msgInfo,{
      autoClose: 15000,
    });
  }

  const displayInputFile = () => {
    document.getElementById('input-file-create').click()
  }

  const uploadCreateExcel = e => {
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
        handleRequestCreateExcel(data)
    };
    reader.readAsBinaryString(f);
  }

  const handleRequestCreateExcel = data => {
    axios.post(API_URL+"provider_excel",{data}).then(result => {
      toast.success("Registros importados con éxito : "+result.data.positivo+"\n registros no importados : "+result.data.negativo);
      fetchData();
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    });    
  };

  const displayInputUpload = () =>{
    document.getElementById('input-file-update').click();
  };

  const uploadEditExcel = (e) => {
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
        handleRequestEditExcel(data)
    };
    reader.readAsBinaryString(f);
  };

  const handleRequestEditExcel = data => {
    axios.put(API_URL+"provider_excel_edit",{data}).then(result => {
      toast.success("Registros editados con éxito : "+result.data.positivo+"\n registros no editados : "+result.data.negativo)
      fetchData(true);
    }).catch(err => {
      console.log(err,"aqui el error");
      setDisplayLoading(false)
      props.tokenExpired(err)
    });    
  };

  const exportDataExcel = () => {

    if(!provider.length){
      toast.error('Error, no hay datos para realizar el excel')
    }else{
      let wb = XLSX.utils.book_new()
      let nameTitle  = `Proveedores la empresa (${props.configGeneral.enterprise.bussines_name})`;

      let bodyTable = [['Razón social',"Nombre fantasía",'Tipo de identificación','Id','País','Ciudad','Comuna','Giro','Teléfono','Dirección']];
      wb.Props = {
        Title: nameTitle,
        Subject: "Exportación de Proveedores",
        Author: 'Aidy tecnology',
        CreatedDate: moment().format('YYYY-MM-DD')
      };
      wb.SheetNames.push("Proveedores");

      provider.forEach((item, i) => {
        
        let stringCountry = countries.find(v1 => v1.id === item.id_country).nombre;
        let typeId = item.type_id === 1 ? "Rut" : "Identificación Fiscal";

        bodyTable.push([
          item.social_razon,
          item.name_fantasy,
          typeId,
          item.rut_provider,
          stringCountry,
          item.city,
          item.comuna,
          item.spin,
          item.phone,
          item.address,
        ])
      });

      var ws = XLSX.utils.aoa_to_sheet(bodyTable);
      wb.Sheets["Proveedores"] = ws;
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
        <Container>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h4 className="title_principal">Proveedores</h4>
              <hr/>
            </Col>
            <Col sm={3} md={3} lg={3} className="">
              <Button size="sm" title="Crear Proveedor" onClick={goToForm} variant="success" block={true}>Crear Proveedor <FaPlusCircle /></Button>
            </Col>
            <Col sm={3} md={3} lg={3} className="">
              <DropdownButton size="sm" id={'dropExcel'} title={(<span>Operaciones Excel <FaFileExcel /></span>)} variant="success"  block="true">
                <Dropdown.Item onClick={donwloandExcel}>Descargar plantilla excel</Dropdown.Item>
                <Dropdown.Item onClick={exportDataExcel}>Exportar data</Dropdown.Item>
                <Dropdown.Item onClick={displayInputFile}>Cargar Proveedores</Dropdown.Item>
                <Dropdown.Item onClick={displayInputUpload}>Modificar Proveedores</Dropdown.Item>
              </DropdownButton>
              <input type="file" style={{display: "none"}} id="input-file-create" onChange={uploadCreateExcel} />
              <input type="file" style={{display: "none"}} id="input-file-update" onChange={uploadEditExcel} />
            </Col>
            <Col sm={6} md={6} lg={6} xs={12} className="text-right">
              <h5 className="title_principal">Total Proveedores: <Badge variant="danger" className="font_badge">{provider.length}</Badge></h5>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <Table columns={[
                {
                  Header: 'Razón Social',
                  accessor: 'social_razon',
                  Cell: props1 => {
                    return (
                      <OverlayTrigger placement={'right'} overlay={
                        <Tooltip id={"tooltip-right"}>
                          <ul className="list-group">
                            <li className="list-group-item text-center"><b>Pais:</b> {props1.cell.row.original.pais.nombre}</li>
                            <li className="list-group-item text-center"><b>Ciudad:</b>  {props1.cell.row.original.city}</li>
                            <li className="list-group-item text-center"><b>Comuna:</b>  {props1.cell.row.original.comuna}</li>
                            <li className="list-group-item text-center"><b>Detalles:</b>  {props1.cell.row.original.address}</li>
                          </ul>
                        </Tooltip>
                      }>
                        <Button size="sm" type="button" block={true} variant="link" onClick={() => modifyRegister(props1.cell.row.original.id)}>{props1.cell.row.original.social_razon}</Button>
                      </OverlayTrigger>
                    )
                  }
                },
                {
                  Header: 'Rut',
                  accessor: 'rut_provider',
                },
                {
                  Header: 'Teléfono',
                  accessor: 'phone',
                },
                {
                  Header: 'Spin',
                  accessor: 'spin',
                },
                {
                  Header: 'Acciones',
                  Cell: props => {
                    const id = props.cell.row.original.id
                    return(
                      <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} drop="left" title="Seleccione"  block="true">
                        <Dropdown.Item onClick={() => createRepresent(props.cell.row.original)}>Crear Representante</Dropdown.Item>
                        <Dropdown.Item onClick={() => modifyRegister(id)}>Modificar</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
                      </DropdownButton>
                    )
                  }
                }
              ]} data={provider} />
            </Col>
          </Row>
          <Modal
            show={isOpen}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            handleClose={onHide}
          >
            <Modal.Header closeButton className="header_dark">
              <Modal.Title id="contained-modal-title-vcenter">
                Dirección del Registro <FaUser />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {directionRegister}
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
          </Modal>

        </Container>
      )}
    </>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
    configGeneral : state.configs.config
  }
}

ProviderPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
  configGeneral : PropTypes.object,
}

export default connect(mapStateToProps,{})(ProviderPage)
