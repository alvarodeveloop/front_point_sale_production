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
  Form,
  Badge
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { API_URL } from 'utils/constants'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux'
import LoadingComponent from 'components/LoadingComponent'

let videoColumns = [];
const VideoTutorialPage = (props) => {

  const [validate,setValidate] = useState(false)
  const [isUpdate,setIsUpdate] = useState(false)
  const [videos,setVideos] = useState([])
  const [dataVideos,setDataVideos] = useState({
    name: '',
    description: '',
    link: '',
    id: "",
  })
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  let videoColumns = useMemo(() => {
    return [
      {
        Header: "Video",
        accessor: "name",
      },
      {
        Header: "Descripción",
        accessor: "description",
      },
      {
        Header: "Link",
        accessor: "link",
        Cell: props1 => {
          const original = props1.cell.row.original;
          return (<a href={original.link} target="_blank">{original.link}</a>);
        }
      },
      {
        Header: "Acciones",
        Cell : props1 =>{
          const original = props1.cell.row.original;
          return (
            <DropdownButton size="sm" id={'drop'+original.id} title="Seleccione" drop="left" block="true">
              <Dropdown.Item onClick={() => {updateVideo(original)}}>Modificar</Dropdown.Item>
              <Dropdown.Item onClick={() => {destroyVideo(original)}}>Eliminar</Dropdown.Item>
            </DropdownButton>
          )
        }
      }
    ]
  },[])

  const destroyVideo = videoTutorial => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-edit'>
            <h1>¿Esta seguro?</h1>
            <p className="font-alert">¿Desea realmente borrar este registro?</p>
            <button className="button-alert"
              onClick={() => {
                confirmDeleteRegister(videoTutorial.id);
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
    axios.delete(API_URL+'videoTutorial/'+id).then(result => {
      toast.success('Registro eliminado con éxito')
      setVideos(currentData => currentData.filter(v => +v.id !== +id));
      setDisplayLoading(false);
    }).catch(err => {
      props.tokenExpired(err)
    })
  }

  const updateVideo = data => {
    setDataVideos(currentData => {
      return Object.assign({},currentData,{
        name: data.name,
        description: data.description,
        link: data.link,
        id: data.id
      })
    })
    document.getElementById('name').focus();
  }

  const fetchData = () => {
    axios.get(API_URL+'videoTutorial').then(result => {
      setVideos(result.data)
      setDisplayLoading(false)
    }).catch(err => {
      setDisplayLoading(false)
      props.tokenExpired(err)
    })
  }

  // ========== SECCION FORMULARIO =========================
  const onChange = async e => {
    setDataVideos({...dataVideos, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    let data = Object.assign({},dataVideos)
    setDisplayLoading(true)
    if(data.id){
      axios.put(API_URL+'videoTutorial/'+data.id,data).then(result => {
        toast.success('Video Modificado')
        cleanForm()
        setVideos(currentData => {
          return currentData.map(v => {
            if( +v.id === data.id){
              v = result.data;
            }
            return v;
          })
        })
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
      })
    }else{
      axios.post(API_URL+'videoTutorial',data).then(result => {
        toast.success('Video Creado')
        setVideos(currentData => {
          currentData.push(result.data)
          return currentData;
        });

        cleanForm()
        setDisplayLoading(false)
      }).catch(err => {
        setDisplayLoading(false)
        props.tokenExpired(err)
      })
    }
  }

  const cleanForm = () => {
    setValidate(false)
    setDataVideos({
      name: '',
      link: '',
      description: '',
      id: '',
    });
  }

  const cancelUpdate = () => {
    cleanForm()
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
            <Col>
              <h4 className="title_principal">Videos Tutoriales</h4>
            </Col>
          </Row>
          <hr/>
          <Row className="justify-content-center">
            <Col sm={12} md={12} lg={12} xs={12} className="containerDivSeparated">
              <Form onSubmit={onSubmit} noValidate validated={validate}>
                <Row className="justify-content-center">
                  <InputField
                    type="text"
                    name="name"
                    label="Nombre video"
                    required={true}
                    cols="col-4"
                    messageErrors={[
                      "Requerido"
                    ]}
                    handleChange={onChange}
                    value={dataVideos.name}
                  />
                  <InputField
                    type="text"
                    name="description"
                    label="Descripción"
                    required={true}
                    cols="col-4"
                    messageErrors={[
                      "Requerido"
                    ]}
                    handleChange={onChange}
                    value={dataVideos.description}
                  />
                  <InputField
                    type="text"
                    name="link"
                    label="Link"
                    required={true}
                    cols="col-4"
                    messageErrors={[
                      "Requerido"
                    ]}
                    handleChange={onChange}
                    value={dataVideos.link}
                  />
                </Row>
                <Row className="justify-content-center">
                  <Col sm={4} md={4} lg={4} xs={4}>
                    <Button size="sm" type="submit" variant="danger" block="true">Guardar <FaPlusCircle /></Button>
                  </Col>
                  {dataVideos.id ? (
                    <Col sm={4} md={4} lg={4} xs={4}>
                      <Button size="sm" type="button" onClick={cancelUpdate} variant="secondary" block="true">Cancelar Modificación</Button>
                    </Col>
                  ) : ''}
                </Row>
              </Form>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12} className="containerDivSeparated">
              <Table columns={videoColumns} data={videos} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

VideoTutorialPage.defaultProps = {
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
  }
}

VideoTutorialPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(VideoTutorialPage)
