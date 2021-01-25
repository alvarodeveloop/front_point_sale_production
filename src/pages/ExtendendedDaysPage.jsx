import React, {useEffect,useState,useMemo,useRef} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {Container,Row,Col,Button,Dropdown,DropdownButton,Form,Badge} from 'react-bootstrap'
import LoadingComponent from 'components/LoadingComponent'
import Table from 'components/Table'
import InputFieldRef from 'components/input/InputComponentRef'
import { toast } from 'react-toastify'

let enterpriseColumns = []

export default function ExtendendedDaysPage(props) {

  const [enterprises,setEnterprises] = useState([])
  const [displaySection,setDisplaySection] = useState(1)
  const [isLoading,setIsLoading] = useState(true)
  const [dataUpdate,setDataUpdate] = useState({
    enterprise : {},
    type: false // false para test days y true para expired days
  })
  const [validated,setValidated] = useState(false)
  const inputRef = useRef(null)
  
  useEffect(() => {
    fetchData()
  },[])

  enterpriseColumns = useMemo(() => {
    return [
      {
        Header : "Empresa",
        accessor: "bussines_name"
      },
      {
        Header : "Rut",
        accessor: "rut"
      },
      {
        Header : "Email",
        accessor: "email_enterprise"
      },
      {
        Header : "Fono",
        accessor: "phone"
      },
      {
        Header : "Dias Prueba",
        accessor: "extra_days_test",
        Cell : props1 => {

          return (<Badge variant="danger" className="font-badge">{props1.cell.row.original.extra_days_test}</Badge>)
        }
      },
      {
        Header : "Dias Expiración",
        accessor: "extra_days_expire",
        Cell : props1 => {

          return (<Badge variant="danger" className="font-badge">{props1.cell.row.original.extra_days_expire}</Badge>)
        }
      },
      {
        Header : "Acción",
        accessor: "",
        Cell : props1 => {
          const original = props1.cell.row.original
          return (
            <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione"  block="true">
              <Dropdown.Item onClick={() => addDays(original,false)}>Agregar dias de prueba</Dropdown.Item>
              <Dropdown.Item onClick={() => addDays(original,true)}>Agregar dias de plazo de vencimiento</Dropdown.Item>
            </DropdownButton>
          )
        }
      },
    ] 
  },[])

  const fetchData = () =>{
    axios.get(API_URL+"enterprise_all").then(result => {
      setEnterprises(result.data)
      setIsLoading(false)
    }).catch(err => { 
      setIsLoading(false)
      props.tokenExpired(err)
    })
  }

  const addDays = (data,type) => {
    setDataUpdate({
      enterprise : data,
      type
    })
    setDisplaySection(2)
    setTimeout(() => {
      inputRef.current.focus()
    },400)
  }

  const onChange = e => {
    e.persist()
    setDataUpdate(oldData => {
      return {
        enterprise : Object.assign({},oldData.enterprise, {
          days: e.target.value
        }),
        type: oldData.type
      }
    })
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }

    let data = Object.assign({},dataUpdate)
    setIsLoading(true)

    axios.put(API_URL+"enterprise_extra_days/"+data.enterprise.id,data).then(result => {
      toast.success("Dias agregados con éxito")
      setDisplaySection(1)
      fetchData()
    }).catch(err => {
      props.tokenExpired(err)
    })

  }

  return (
    <Container fluid>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Row>
            <Col sm={6} md={6} lg={6} xs={12}>
              <h4 className="title_principal">Empresas Registradas</h4>
            </Col>
            <Col sm={6} md={6} lg={6} xs={12} className="text-right">
              <h5>Total Empresas: <Badge variant="danger" className="title_badge">{enterprises.length}</Badge></h5>
            </Col>
          </Row>
          {displaySection === 1 ? (
            <Row>
              <Col>
                <Table data={enterprises} columns={enterpriseColumns}/>
              </Col>
            </Row>
          ) : (
            <Form onSubmit={onSubmit} noValidated validated={validated}>
              <Row className="justify-content-center">
                <InputFieldRef
                  ref={inputRef}
                  type='number'
                  label='Modificar Cantidad de dias'
                  name='days'
                  required={true}
                  messageErrors={[
                    'Requerido*'
                  ]}
                  cols='col-md-6 col-lg-6 col-sm-6 col-xs-12'
                  value={dataUpdate.enterprise.days}
                  handleChange={onChange}
                />
              </Row>
              <Row className="justify-content-center">
                <Col sm={4} md={4} lg={4} xs={12} xl={4}>
                  <Button variant="primary" block={true} size="sm" type="submit">Enviar</Button>
                </Col>
              </Row>
            </Form>
          )}
        </>
      )}
    </Container>
  )
}
