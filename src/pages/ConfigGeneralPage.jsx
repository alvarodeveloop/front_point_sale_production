import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { connect } from 'react-redux'
import { API_URL } from 'utils/constants'
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ModalConfirmDataDeleteConfigGeneral from 'components/ModalConfirmDataDeleteConfigGeneral'

const ConfigGeneralPage = (props) => {

  const [config,setConfig] = useState({
    simbolo_moneda: '',
    active_price_decimals: '',
    close_session: ''
  })

  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    fechData()
  },[props.id_enterprise])

  const fechData = () => {
      axios.get(API_URL+'config_general').then(result => {
        if(result.data){
          setConfig({
            simbolo_moneda: result.data.simbolo_moneda,
            active_price_decimals: result.data.active_price_decimals,
            close_session: result.data.close_session,
          })
        }

      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          console.log(err)
          toast.error('Error contacte con soporte')
        }
      })
  }

  const createConfigGeneral = () => {
    props.history.push('/config/config_general_form')
  }

  const updateConfigGeneral = () => {
    props.history.push('/config/config_general_form/'+ JSON.parse(localStorage.getItem('user')).id_parent )
  }

  const modalConfirmDataDelete = () => {
    setIsOpenModal(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h4 className="title_principal">Configuración General</h4>
          <hr/>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={6} sm={6} lg={6} xs={6}>
          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: 'rgb(218,236,242)', color: 'black'}}>
                <th className="text-center">Simbolo Moneda</th>
                <th className="text-center">Precios Decimales</th>
                <th className="text-center">Cerrar Sesión</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{config.simbolo_moneda}</td>
                <td>{config.active_price_decimals}</td>
                <td>{config.close_session}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Button size="sm" variant="danger" block="true" onClick={modalConfirmDataDelete}>Eliminar Datos <FaTrash /></Button>
          <br/>
          {config.simbolo_moneda ? (
            <Button size="sm" variant="primary" block="true" onClick={updateConfigGeneral}>
              Modificar Configuración General <FaEdit />
            </Button>
          ) : (
            <React.Fragment>
              <Button size="sm" variant="primary" block="true" onClick={createConfigGeneral}>
                Crear Configuración General  <FaPlusCircle />
              </Button>
              <br/>
              <p className="text-center" style={{color: 'darkred', fontWeight: 'bold'}}>(No posee configuración y debe crearla)</p>
            </React.Fragment>
          )}
        </Col>
      </Row>
      <ModalConfirmDataDeleteConfigGeneral
        show={isOpenModal}
        onHide={handleClose}
        handleClose={handleClose}
      />
    </Container>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

ConfigGeneralPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(ConfigGeneralPage)
