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
  Form
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import InputField from 'components/input/InputComponent'
import { API_URL } from 'utils/constants'
import { categoryColumns } from 'utils/columns/category'
import Table from 'components/Table'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux'



const CategoryPage = (props) => {

  const [validate,setValidate] = useState(false)
  const [isUpdate,setIsUpdate] = useState(false)
  const [category,setCategory] = useState([])
  const [dataCategory,setDataCategory] = useState({
    name_category: '',
  })

  useEffect(() => {
    fetchData()
  },[props.id_branch_office])

  useMemo(() => {

    if(categoryColumns.length > 1){
      categoryColumns.pop()
    }

    categoryColumns.push({
      Header: 'Acciones',
      Cell: props => {
        const id = props.cell.row.original.id
        return(
          <DropdownButton size="sm" id={'drop'+props.cell.row.original.id} title="Seleccione"  block="true">
            <Dropdown.Item onClick={() => modifyRegister(props.cell.row.original)}>Modificar</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteRegister(id)}>Eliminar</Dropdown.Item>
          </DropdownButton>
        )
      }
    })

  },[])

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
    axios.delete(API_URL+'category/'+id).then(result => {
      toast.success('Registro eliminado con éxito')
      fetchData()
    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const modifyRegister = data => {

    const objectModify = Object.assign({},dataCategory,{
      name_category: data.name_category,
      id: data.id
    })
    setIsUpdate(true)
    setDataCategory(objectModify)
    document.getElementById('name_category').focus()
  }

  const fetchData = () => {
    axios.get(API_URL+'category').then(result => {
      setCategory(result.data)
    }).catch(err => {
      const { response } = err
      console.log(err,response)
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  // ========== SECCION FORMULARIO =========================
  const onChange = async e => {
    await setDataCategory({...dataCategory, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {

    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      return
    }

    let data = Object.assign({},dataCategory)

    if(isUpdate){
      axios.put(API_URL+'category/'+data.id,data).then(result => {
        toast.success('Categoria Modificada')
        cleanForm()
        fetchData()
      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }else{
      axios.post(API_URL+'category',data).then(result => {
        toast.success('Categoria Creada')
        fetchData()
        cleanForm()
      }).catch(err => {
        const { response } = err
        if(response){
          toast.error(response.data.message)
        }else{
          toast.error('Error, contacte con soporte')
        }
      })
    }
  }

  const cleanForm = () => {
    setIsUpdate(false)
    setValidate(false)
    setDataCategory({
      name_category: '',
    })
  }

  const cancelUpdate = () => {
    cleanForm()
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={12} lg={12} xs={12} className="containerDivSeparated">
          <br/>
          <h4 className="text-center title_principal">Formulario De Categorias</h4>
          <br/>
          <Form onSubmit={onSubmit} noValidate validated={validate}>
            <Row className="justify-content-center">
              <InputField
                {...props.inputName}
                handleChange={onChange}
                value={dataCategory.name_category}
              />
            </Row>
            <Row className="justify-content-center">
              <Col sm={6} md={6} lg={6} xs={6}>
                <Button size="sm" type="submit" variant="primary" block="true">Guardar <FaPlusCircle /></Button>
              </Col>
            </Row>
            {isUpdate ? (
              <Row className="justify-content-center">
                <Col sm={6} md={6} lg={6} xs={6}>
                  <br/>
                  <Button size="sm" type="button" onClick={cancelUpdate} variant="secondary" block="true">Cancelar Modificación</Button>
                </Col>
              </Row>
            ) : ''}

          </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} xs={12} className="containerDivSeparated">
          <Table columns={categoryColumns} data={category} />
        </Col>
      </Row>
    </Container>
  )
}

CategoryPage.defaultProps = {
  inputName: {
    type: 'text',
    required: true,
    name: 'name_category',
    label : 'Nombre Categoria',
    messageErrors: [
      'Requerido*'
    ],
    cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"
  }
}

function mapStateToProps(state){
  return {
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

CategoryPage.propTypes ={
  id_branch_office: PropTypes.string.isRequired,
  id_enterprise : PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{})(CategoryPage)
