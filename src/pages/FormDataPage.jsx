import React, {useState} from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/input/InputComponent'
import axios from 'axios'
import {API_URL} from 'utils/constants'
import {toast} from 'react-toastify'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'


const FormDataPage = (props) => {

  const [galleryImg,setGalleryImg] = useState([])

  const onSubmit = async e => {

    const form = e.currentTarget;

    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return
    }


    let formDataGallery = new FormData()

    Object.keys(galleryImg).forEach((v,i) => {
      formDataGallery.append('gallery',galleryImg[v])
    })

    //formDataGallery.append('id_product',1)
    formDataGallery.append('categories','2')
    formDataGallery.append('name','moto')
    formDataGallery.append('description','description')
    formDataGallery.append('price',3000)
    formDataGallery.append('time_for_preparation',120)


    axios.post(API_URL+'product',formDataGallery).then(result => {

    }).catch(err => {
      const { response } = err
      if(response){
        toast.error(response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  const galleryImgHandle = e => {
    setGalleryImg(e.target.files)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <input type="file" id="galleryImg" multiple={true} accept=".jpg, .png, .jpeg" onChange={galleryImgHandle} />
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Button type="submit" variant="danger" block={true}>Enviar</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormDataPage
