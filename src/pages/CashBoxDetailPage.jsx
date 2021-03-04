import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Image, Badge, Modal } from 'react-bootstrap';
import LoadingComponent from "components/LoadingComponent";
import { API_URL, ARRAY_COLORS } from 'utils/constants';
import axios from 'axios';
import layoutHelpers from 'shared/layouts/helpers';
import { Doughnut } from 'react-chartjs-2';
import Table from 'components/Table';
import * as moment from 'moment-timezone';
import { showPriceWithDecimals } from 'utils/functions';
import { connect } from 'react-redux'
import ModalDetailSale from "components/modals/ModalDetailSale"
import InputField from 'components/input/InputComponent'
import { FaSearch, FaOutdent, FaPowerOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'styles/components/modalComponents.css'

let dataDonuts = {
  labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		hoverBackgroundColor: []
	}]
}

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

let saleColumns = [];

let initialAmountsColumns = [];

function CashBoxDetailPage(props) {
  const [objectStates, setObjectStates] = useState({
    isLoading : true,
    cashObject : null,
    redraw : false,
    countType : [],
    sumType : [],
    sales : [],
    isOpenDetailSale : false,
    saleDataOption : {},
    initialAmounts : [],
    isOpenModalInitialAmounts : false
  })
  console.log("Aqui manaoo");
  useEffect(() => {
    fetchData();
    layoutHelpers.toggleCollapsed()
    return () =>{
      layoutHelpers.toggleCollapsed()
    }
  },[])

  useEffect(() => {
    if(objectStates.countType.length) handleStadistics();
  },[objectStates.countType])

  saleColumns = useMemo(() => {
    return [
      {
        Header: 'Referencia',
        accessor: 'ref',
      },
      {
        Header: 'Cliente',
        accessor: props1 => props1.client ? [props1.client.name_client+' '+props1.client.data_document] : [],

      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: props1 => {
          return (
            <span>
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{ showPriceWithDecimals(props.configGeneral,props1.cell.row.original.total) } 
            </span>
          )
        }
      },
      {
        Header: 'Pago',
        accessor: 'payment',
        Cell: props1 => {
          return (
            <span>
              {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{ showPriceWithDecimals(props.configGeneral,props1.cell.row.original.payment) } 
            </span>
          )
        }
      },
      {
        Header: 'Status',
        accessor: props1 => [props1.status === 2 ? 'En Espera' : 'Pagado'],
        Cell : props1 => {
          const {original} = props1.cell.row
          if(original.status === 2){
            return (<Badge variant="danger" className="font-badge">En espera</Badge>)
          }else{
            return (<Badge variant="success" className="font-badge">Pagado</Badge>)
          }
        }
      },
      {
        Header: 'Fecha',
        accessor: props1 => [moment(props1.createdAt).format('DD-MM-YYYY')],
      },
      {
        Header: 'Acciones',
        Cell: props1 =>{
          const original = props1.cell.row.original
          return (<Button variant="primary" block={true} size="sm" type="button" onClick={() => seeDetails(original)}>Detalle</Button>)
        }
      }
    ]
  },[])

  initialAmountsColumns = useMemo(() => {
    return [
      {
        Header : "Usuario",
        accessor: props1 => [props1.user.name+" "+props1.user.rut],
        Cell : props1 => {
          const original = props1.cell.row.original;
          return (
            <span>
              {original.user.name}<br/>Rut: {original.user.rut}
            </span>
          )
        }
      },
      {
        Header : "Monto",
        accessor: "amount",
        Cell: props1 => {
          const original = props1.cell.row.original;
          return (<Badge variant="danger" className="font-badge">
            {props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{showPriceWithDecimals(props.configGeneral,original.amount)}
          </Badge>)
        }
      },
      {
        Header : "Fecha",
        accessor: "fecha",
      },
    ]
  }, [])

  const fetchData = async (dateIniParam = false, dateEndParam = false) => {
    try {
      const id = props.match.params.id;
      let objectPost = {
        id,
        dateIni : dateIniParam ? dateIniParam : moment().tz("America/Santiago").format("YYYY-MM-DD"),
        dateEnd : dateEndParam ? dateEndParam : moment().tz("America/Santiago").format("YYYY-MM-DD"),
      }
      let result = await axios.post(API_URL+"cash_register_detail",objectPost);
      setObjectStates(currentData => {
        return Object.assign({},currentData, { 
          isLoading : false, 
          cashObject: result.data.detail,
          countType: result.data.countType,
          sumType: result.data.sumType,
          sales : result.data.sales,
          initialAmounts : result.data.initialAmounts
        })
      })
    } catch (error) {
      props.tokenExpired(error)
    }
  }
  const handleStadistics = () => {
    dataDonuts.labels = []
    dataDonuts.datasets[0].data = []
    dataDonuts.datasets[0].backgroundColor = []
    dataDonuts.datasets[0].hoverBackgroundColor = []

    objectStates.countType.forEach((v, i) => {
      dataDonuts.labels.push(v.label)
      dataDonuts.datasets[0].data.push(parseFloat(v.total))
      dataDonuts.datasets[0].backgroundColor.push(ARRAY_COLORS[i])
      dataDonuts.datasets[0].hoverBackgroundColor.push(ARRAY_COLORS[i])
    });

    setObjectStates(currentData => Object.assign({},currentData,{redraw : true}));
    setTimeout(function () {
      setObjectStates(currentData => Object.assign({},currentData,{redraw : false}));
    }, 1500);
  }

  const seeDetails = data => {
    setObjectStates(currentState => Object.assign({},currentState, { saleDataOption : data, isOpenDetailSale : true}));
  }

  const onHideModalDetailHandler = () => {
    setObjectStates(currentState => Object.assign({},currentState, {isOpenDetailSale : false}));
  }

  const searchByFilter = () => {
    let dateIni = document.getElementById("dateIni").value;
    let dateEnd = document.getElementById("dateEnd").value;
    if(!dateIni || !dateEnd){
      toast.info("Por favor establezca una fecha de inicio y una fecha tope");
      return
    }
    setObjectStates(currentState => Object.assign({},currentState,{isLoading : true}));
    fetchData(dateIni,dateEnd)
  }

  const goBack = () => {
    props.history.goBack();
  }

  const modalInitialAmountsHandler = () =>{
    setObjectStates(currentState => Object.assign({},currentState, {isOpenModalInitialAmounts : !currentState.isOpenModalInitialAmounts} ))
  }

  const closeCashBoxHandler = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿desea realmente cerrar esta caja?</p>
            <button className="button-alert"
              onClick={() => {
                confirmCloseCashBoxHandler();
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

  const confirmCloseCashBoxHandler = () => {
    setObjectStates(currentState => Object.assign({},currentState,{isLoading : true}))
    let objectPost = { 
      id_cash_register : props.match.params.id,
      state: false
    }
    axios.post(API_URL+"cash_register_open_close",objectPost).then(result => {
      toast.success("Caja cerrada con éxito");
      setObjectStates(currentState => Object.assign({},currentState,{isLoading : false}))
      setTimeout(() => {
        goBack()
      },1500)
    }).catch(err => {
      setObjectStates(currentState => Object.assign({},currentState,{isLoading : false}))
      props.tokenExpired(err)
    })
  }

  return (
    <>
      {objectStates.isLoading ? (
        <LoadingComponent />
      ) : (    
        <Row className="">
          <Col sm={5} md={3} lg={3} xl={3} xs={12}>
            <Row>
              <Col>
                <Button block={true} size="sm" type="button" onClick={goBack} variant="secondary">Atras <FaOutdent /></Button>
              </Col>
              {objectStates.cashObject && objectStates.cashObject.status && (
                <Col>
                  <Button block={true} size="sm" type="button" onClick={closeCashBoxHandler} variant="danger">Cerrar Caja <FaPowerOff /></Button>
                </Col>
              )}
            </Row>
            <br/>
            <Row>
              <Col className="text-center">
                <h5 style={{color: 'rgb(180, 55, 33)'}}>CAJA N° {objectStates.cashObject ? objectStates.cashObject.nro_caja : ""}</h5>
                <Image src={require('../assets/img/caja_registradora.jpg')} style={{width: '40%'}}/><br/>
                Estado : {objectStates.cashObject ? objectStates.cashObject.status ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>) : ""}
              </Col>
            </Row>
            <br/>
            {objectStates.initialAmounts.length ? (
              <Row>
                <Col className="text-center">
                  {objectStates.initialAmounts.length === 1 ? (
                    <p>Saldo inicial de hoy : 
                      <Badge style={{ backgroundColor : "#767a05", marginLeft: "10px",color: "white"}} className="font-badge">
                        {props.configGeneral ? props.configGeneral.simbolo_moneda : ""} {showPriceWithDecimals(props.configGeneral,objectStates.initialAmounts[0].amount)}
                      </Badge>
                    </p>
                  ) : (
                    <Button size="sm" variant="secondary" type="button" onClick={modalInitialAmountsHandler}>Ver saldos iniciales en el rango de fecha seleccionado</Button>
                  )}
                </Col>
              </Row>
            ) : ""}
            <hr/>
            <Row>
              <Col style={{height: "200px"}}>
                <Doughnut data={dataDonuts} redraw={objectStates.redraw} options={optionsBar} />
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col>
                <p className="text-danger text-center">*Por defecto se muestran los datos del día actual</p>
              </Col>
            </Row>
          </Col>
          <Col sm={7} md={9} lg={9} xl={9} xs={12} style={{borderLeft: "1px solid lightgray"}}>
            <Row>
              <Col>
              <h5>Efectivo : <Badge variant="danger" className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{objectStates.sumType.length && objectStates.sumType[0] ?showPriceWithDecimals(props.configGeneral,objectStates.sumType[0].total) : 0 }</Badge> </h5>
              </Col>
              <Col>
                <h5>Tarjeta de Debito : <Badge variant="danger" className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{objectStates.sumType.length && objectStates.sumType[1] ? showPriceWithDecimals(props.configGeneral,objectStates.sumType[1].total) : 0 }</Badge> </h5>
              </Col>
              <Col>
              <h5>Tarjeta de Crédito : <Badge variant="danger" className="font-badge">{props.configGeneral ? props.configGeneral.simbolo_moneda : ""}{objectStates.sumType.length && objectStates.sumType[2] ? showPriceWithDecimals(props.configGeneral,objectStates.sumType[2].total) : 0 }</Badge></h5>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <InputField
                  type="date"
                  name="dateIni"
                  required={false}
                  cols="col-sm-12 col-md-12 col-lg-12 col-xs-12"
                  messageErrors={[]}
                  label="Fecha desde"
                  handleChange={() => {}} 
                />  
              </Col>
              <Col>
                <InputField
                  type="date"
                  name="dateEnd"
                  required={false}
                  cols="col-sm-12 col-md-12 col-lg-12 col-xs-12"
                  messageErrors={[]}
                  label="Fecha hasta"
                  handleChange={() => {}} 
                />
              </Col>
              <Col>
                <br/>
                <Button type="button" size="sm" variant="secondary" onClick={searchByFilter} block={true}>Buscar ventas <FaSearch /></Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table data={objectStates.sales} columns={saleColumns} />
              </Col>
            </Row>
          </Col>
          {props.configGeneral && props.configStore && (
            <ModalDetailSale
              isShow={objectStates.isOpenDetailSale}
              onHide={onHideModalDetailHandler}
              config={props.configGeneral}
              configStore={props.configStore}
              dataSale={objectStates.saleDataOption}
            />
          )}
          <Modal
            show={objectStates.isOpenModalInitialAmounts}
            onHide={modalInitialAmountsHandler}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="header_dark">
              <Modal.Title id="contained-modal-title-vcenter">
                Montos iniciales por fechas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table data={objectStates.initialAmounts} columns={initialAmountsColumns} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" type="button" onClick={modalInitialAmountsHandler}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      )}
    </>
  )
}

CashBoxDetailPage.propTypes = {

}

function mapStateToProps(state){
  return {
    configGeneral : state.configs.config,
    configStore : state.configs.configStore,
    id_branch_office : state.enterpriseSucursal.id_branch_office
  }
}

export default connect(mapStateToProps,{})(CashBoxDetailPage)

