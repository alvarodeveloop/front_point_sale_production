import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Badge} from 'react-bootstrap'
import styled from 'styled-components'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import LoadingComponent from 'components/LoadingComponent'
import axios from "axios"
import {API_URL} from 'utils/constants'
import { toast } from 'react-toastify'

const Styles = styled.div`

  .containerDiv{
    height: 700px;
  }

  .bg_white{
    background-color: white;
    height: 400px;
    margin-top: 80px;
  }

`

export default function PaymentViewComponent(props) {

  const [objectState, setObjectState] = useState({
    isLoading : true,
    plan : null,
    enterprise : null,
    invoice : null
  })
  
  useEffect(() => {
    fetchData()
  },[])

  const fetchData = () =>{
    axios.get(API_URL+"payment_pending_invoice/"+props.enterpriseSucursal.id_enterprise).then(result => {
      setObjectState(currentData => Object.assign({},currentData, {
        plan : result.data.plan,
        enterprise :  result.data.enterprise,
        invoice : result.data,
        isLoading: false
      }))
    }).catch(err => {
      setObjectState(currentData => Object.assign({},currentData, {isLoading: false}))
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        console.log(err)
        toast.error("Ha ocurrido un error, contacte con soporte")
      }
    })
  }

  const paymentPlan = () => {
    setObjectState(currentData => Object.assign({},currentData, {isLoading: true}))
    axios.post(API_URL+"payment_plan").then(result => {
      //setIsLoading(false)
      window.location.replace(result.data.url+"?token="+result.data.token)
    }).catch(err => {
      setObjectState(currentData => Object.assign({},currentData, {isLoading: false}))
      console.log(err)
    })
  }

  return (
    <Styles>
      <Container className="containerDiv animate__animated animate__zoomIn">
        <Row className="bg_white align-items-center">
          {objectState.isLoading ? (
            <Col>
              <LoadingComponent text="cargando..." />
            </Col>
          ) : (
            <Col>
              <Row className="justify-content-center">
                <Col>
                  <h4 className="title_principal text-center">Renovación de Plan {objectState.plan ? objectState.name : ""}</h4>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <p>Su empresa ya caduco el tiempo de uso de su plan, por favor renueve su plan para seguir disfrutando del servicio.</p>
                  <p className=""><Badge variant="danger" className="font-badge">${objectState.invoice ? objectState.invoice.amount : ""}</Badge></p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                  <br/>
                  <Button onClick={paymentPlan} className="animate__animated animate__fadeInLeft" variant="primary" block={true} type="button" size="sm">Pagar Plan <FaMoneyCheckAlt /></Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container> 
    </Styles>
  )
}
