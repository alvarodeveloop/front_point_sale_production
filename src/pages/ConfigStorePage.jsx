import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import {FaCogs, FaPlusCircle, FaEdit } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Image
} from 'react-bootstrap'
import { API_URL } from 'utils/constants'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'; // Import
import LoadingComponent from 'components/LoadingComponent'
import styled from 'styled-components'

const Styles = styled.div`

  .melon_y_melames{
    background-color: rgb(244, 240, 194);
    border: 1px solid rgb(109, 111, 27);
    color: black
  }
`

const ConfigStorePage = (props) => {

  const [dataStore,setDataStore] = useState({
    logo: '',
    name_store: '',
    country: '',
    city: '',
    phone: '',
    whatssap: '',
    address: '',
    email: '',
    header_text: '',
    foot_page_text: '',
    ref: '',
    client_data_foot_page: false,
    rut: '',
    comuna: '',
  })
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  const fetchData = () => {
    axios.get(API_URL+'config_store').then(result => {
      if(result.data){

        setDataStore({
          logo: result.data.logo,
          name_store: result.data.name_store,
          rut : result.data.rut,
          country: result.data.pais,
          city: result.data.city,
          phone: result.data.phone,
          whatssap: result.data.whatssap,
          address: result.data.address,
          email: result.data.email,
          tax: result.data.tax,
          handle_stock: result.data.handle_stock,
          header_text: result.data.header_text,
          foot_page_text: result.data.foot_page_text,
          ref: result.data.ref,
          client_data_foot_page: result.data.client_data_foot_page,
          comuna : result.data.comuna
        })
      }
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  const createConfig = () => {
    props.history.replace('/config/config_store_form')
  }

  const updateConfig = () => {
    props.history.replace('/config/config_store_form/'+btoa('update'))
  }

  return (
    <Styles>
      <>
        {displayLoading ? (
          <Container>
            <LoadingComponent />
          </Container>
        ) : (
            <Container>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <h4 className="title_principal">Configuración Tienda</h4>
                  <hr/>
                </Col>
              </Row>
              <br/>
              <Row className="justify-content-md-center">
                <Col
                  sm={{
                    span: 6,
                  }}
                  md={{
                    span: 6,
                  }}
                  lg={{
                    span: 6,
                  }}
                  xs={12}
                  className="containerDivSeparated"
                  >
                  {dataStore.name_store ? (
                    <Button size="sm" onClick={updateConfig} variant="primary" block={true}>Modificar Configuración <FaEdit /></Button>
                  ) : (
                    <Button size="sm" onClick={createConfig} variant="primary" block={true}>Crear Configuración <FaCogs /></Button>
                  )}
                </Col>
              </Row>
              <br/><br/>
              <Row className="justify-content-center">
                <Col sm={5} lg={5} md={5} xs={12} className="containerDivSeparated">
                  <h4 className="text-center font-title">Datos de la Sucursal</h4>
                  <br/>
                  <ul className="list-group">
                    <li className="list-group-item melon_y_melames"><b>País: </b> <br/> { dataStore.country.nombre }</li>
                    <li className="list-group-item melon_y_melames"><b>Ciudad: </b> <br/> { dataStore.city }</li>
                    <li className="list-group-item melon_y_melames"><b>Comuna: </b> <br/> { dataStore.comuna }</li>
                    <li className="list-group-item melon_y_melames"><b>Tax:</b> <br/> { dataStore.tax }</li>
                    <li className="list-group-item melon_y_melames"><b>Maneja Stock:</b> <br/> { dataStore.handle_stock ? 'Si' : 'No' }</li>
                </ul>
              </Col>
            </Row>
          </Container>
        )}
      </>
    </Styles>
  )
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

ConfigStorePage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(ConfigStorePage)
